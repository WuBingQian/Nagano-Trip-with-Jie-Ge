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

export default function Expenses() {
  const [rows, setRows] = useState(load)
  const [desc, setDesc] = useState('')
  const [amt, setAmt] = useState('')
  const [payer, setPayer] = useState('me')

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(rows))
  }, [rows])

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
        </>
      )}
    </section>
  )
}
