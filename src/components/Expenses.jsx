import { useEffect, useState } from 'react'

const KEY = 'nagano-expenses-v1'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

const yen = (n) => `¥${Math.round(n).toLocaleString('ja-JP')}`

// Share/import expenses between phones via a #exp= URL fragment —
// no backend, the data travels inside the link itself.
const encodeRows = (rows) =>
  btoa(
    unescape(
      encodeURIComponent(
        JSON.stringify(rows.map((r) => [r.desc, r.amt, r.payer])),
      ),
    ),
  )

const decodeRows = (hash) => {
  try {
    const raw = JSON.parse(decodeURIComponent(escape(atob(hash))))
    return raw.map(([desc, amt, payer], i) => ({
      id: Date.now() + i,
      desc: String(desc),
      amt: Number(amt),
      payer: payer === 'jie' ? 'jie' : 'me',
    }))
  } catch {
    return null
  }
}

export default function Expenses() {
  const [rows, setRows] = useState(load)
  const [desc, setDesc] = useState('')
  const [amt, setAmt] = useState('')
  const [payer, setPayer] = useState('me')
  const [shared, setShared] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(rows))
  }, [rows])

  useEffect(() => {
    const m = window.location.hash.match(/#exp=([A-Za-z0-9+/=]+)/)
    if (m) {
      const imported = decodeRows(m[1])
      if (imported?.length) setShared(imported)
    }
  }, [])

  const importShared = () => {
    setRows(shared)
    setShared(null)
    history.replaceState(null, '', window.location.pathname)
  }

  const copyShareLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#exp=${encodeRows(rows)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      prompt('Copy this link:', url)
    }
  }

  const add = (e) => {
    e.preventDefault()
    const value = parseFloat(amt)
    if (!desc.trim() || !isFinite(value) || value <= 0) return
    setRows([...rows, { id: Date.now(), desc: desc.trim(), amt: value, payer }])
    setDesc('')
    setAmt('')
  }

  const paidMe = rows.filter((r) => r.payer === 'me').reduce((s, r) => s + r.amt, 0)
  const paidJie = rows.filter((r) => r.payer === 'jie').reduce((s, r) => s + r.amt, 0)
  const diff = (paidMe - paidJie) / 2
  const balance =
    rows.length === 0
      ? null
      : Math.abs(diff) < 1
        ? 'All square! 🤝'
        : diff > 0
          ? `Jie Ge owes you ${yen(diff)}`
          : `You owe Jie Ge ${yen(-diff)}`

  return (
    <section className="section" id="expenses" aria-label="Expense tracker">
      <h2 className="section-title">Expense Split</h2>
      <p className="section-sub">
        Saved on this device only — tolls, fuel, food, the lot.
      </p>
      {shared && (
        <div className="exp-import">
          <span>
            🔗 This link carries {shared.length} shared expense
            {shared.length > 1 ? 's' : ''} — import them? (replaces your
            current list)
          </span>
          <button className="exp-add" onClick={importShared}>
            Import
          </button>
          <button className="exp-dismiss" onClick={() => setShared(null)}>
            Dismiss
          </button>
        </div>
      )}
      <form className="exp-form" onSubmit={add}>
        <input
          className="exp-input"
          placeholder="What was it? (tolls, ramen…)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          aria-label="Expense description"
        />
        <input
          className="exp-input exp-amt"
          placeholder="¥"
          type="number"
          min="1"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          aria-label="Amount in yen"
        />
        <select
          className="exp-input exp-payer"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          aria-label="Who paid"
        >
          <option value="me">I paid</option>
          <option value="jie">Jie Ge paid</option>
        </select>
        <button className="exp-add" type="submit">
          Add
        </button>
      </form>
      {rows.length > 0 && (
        <>
          <ul className="exp-list">
            {rows.map((r) => (
              <li key={r.id} className="exp-row">
                <span className="exp-desc">{r.desc}</span>
                <span className="exp-who">
                  {r.payer === 'me' ? 'You' : 'Jie Ge'}
                </span>
                <span className="exp-val">{yen(r.amt)}</span>
                <button
                  className="exp-del"
                  onClick={() => setRows(rows.filter((x) => x.id !== r.id))}
                  aria-label={`Delete ${r.desc}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <p className="exp-total">
            Total {yen(paidMe + paidJie)} · You {yen(paidMe)} · Jie Ge{' '}
            {yen(paidJie)}
          </p>
          <p className="exp-balance">{balance}</p>
          <button className="exp-share" onClick={copyShareLink}>
            {copied ? '✅ Link copied!' : '🔗 Copy share link for Jie Ge'}
          </button>
        </>
      )}
    </section>
  )
}
