import { useEffect, useRef, useState } from 'react'
import { trip, days, stats } from './data/itinerary.js'
import DayConditions from './components/DayConditions.jsx'
import RouteMap from './components/RouteMap.jsx'
import AstroToolkit from './components/AstroToolkit.jsx'
import Expenses from './components/Expenses.jsx'

export const AVATAR =
  'https://gbaike-image.cdn.bcebos.com/810a19d8bc3eb13533fa0830ad45bfd3fd1f4034eebf/810a19d8bc3eb13533fa0830ad45bfd3fd1f4034eebf_url?x-bce-process=image/format,f_auto/resize,m_lfit,w_400,limit_1'

// During Aug 21–23, 2026 (JST) the timeline highlights the current and
// upcoming stop based on each stop's scheduled start time.
function useNowNext() {
  const [state, setState] = useState({})
  useEffect(() => {
    const compute = () => {
      const now = Date.now()
      const first = Date.parse('2026-08-21T00:00:00+09:00')
      const last = Date.parse('2026-08-24T00:00:00+09:00')
      if (now < first || now >= last) return {}
      const ordered = days.flatMap((d) =>
        d.stops.filter((s) => s.start).map((s) => ({ name: s.name, t: Date.parse(s.start) })),
      )
      let current, next
      for (const s of ordered) {
        if (s.t <= now) current = s.name
        else if (!next) next = s.name
      }
      return { current, next }
    }
    setState(compute())
    const id = setInterval(() => setState(compute()), 60_000)
    return () => clearInterval(id)
  }, [])
  return state
}

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'dark',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

function NavBar() {
  return (
    <nav className="navbar" aria-label="Site">
      <a className="navbar-brand" href="#top">
        ✦ Nagano<span className="brand-dates"> · Aug 21–23</span>
      </a>
      <div className="navbar-links">
        {days.map((d) => (
          <a
            key={d.id}
            className="navbar-link"
            href={`#${d.id}`}
            aria-label={`Day ${d.number}`}
          >
            <span className="nav-full">Day {d.number}</span>
            <span className="nav-short">{d.number}</span>
          </a>
        ))}
        <a className="navbar-link" href="#map">
          <span className="nav-full">Map</span>
          <span className="nav-short">🗺️</span>
        </a>
        <a className="navbar-link" href="#tools">
          <span className="nav-full">Tools</span>
          <span className="nav-short">🔭</span>
        </a>
        <a className="navbar-link" href="#expenses">
          ¥
        </a>
      </div>
      <ThemeToggle />
    </nav>
  )
}

function Stars() {
  // Deterministic pseudo-random star field for the hero
  const stars = []
  let seed = 42
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  for (let i = 0; i < 110; i++) {
    stars.push({
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(rand() * 100).toFixed(2)}%`,
      size: rand() > 0.85 ? 2.5 : rand() > 0.5 ? 1.8 : 1.2,
      delay: `${(rand() * 6).toFixed(2)}s`,
    })
  }
  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
      <span className="shooting-star" />
    </div>
  )
}

function HeroRidge() {
  return (
    <svg
      className="hero-ridge"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 120 L0 78 L140 38 L260 84 L420 20 L560 88 L720 34 L880 92 L1040 28 L1200 80 L1330 48 L1440 90 L1440 120 Z"
        fill="var(--ridge-back)"
      />
      <path
        d="M0 120 L0 96 L180 66 L340 104 L520 58 L700 108 L900 62 L1100 106 L1280 76 L1440 108 L1440 120 Z"
        fill="var(--ridge-front)"
      />
    </svg>
  )
}

const GEAR_IMG = 'https://img1.kakaku.k-img.com/images/productimage/fullscale/K0001314788.jpg'

function Hero() {
  const [avatarOk, setAvatarOk] = useState(true)
  const [gearImgOk, setGearImgOk] = useState(true)
  return (
    <header className="hero" id="top">
      <Stars />
      <div className="hero-inner">
        {avatarOk && (
          <img
            className="hero-avatar"
            src={AVATAR}
            alt="Jie Ge"
            onError={() => setAvatarOk(false)}
          />
        )}
        <p className="hero-kicker">A Photography Road Trip</p>
        <h1 className="hero-title">{trip.title}</h1>
        <p className="hero-subtitle">{trip.subtitle}</p>
        <p className="hero-dates">
          <span aria-hidden="true">📅</span>
          {trip.dates}
        </p>
        <div className="gear-card">
          <p className="gear-heading">In the bag</p>
          {gearImgOk && (
            <img
              className="gear-photo"
              src={GEAR_IMG}
              alt="Camera gear"
              loading="lazy"
              onError={() => setGearImgOk(false)}
            />
          )}
          <ul className="gear-list">
            {trip.gear.map((g) => (
              <li key={g.label} className="gear-item">
                <span className="gear-label">{g.label}</span>
                <span className="gear-value">
                  {g.url ? (
                    <a href={g.url} target="_blank" rel="noreferrer">
                      {g.value} ↗
                    </a>
                  ) : (
                    g.value
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <HeroRidge />
    </header>
  )
}

function ShotList({ stop }) {
  const key = `shots:${stop.name}`
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? []
    } catch {
      return []
    }
  })

  const toggle = (i) => {
    const next = [...done]
    next[i] = !next[i]
    setDone(next)
    localStorage.setItem(key, JSON.stringify(next))
  }

  return (
    <div className="shotlist">
      <p className="shotlist-label">🎯 Shot list</p>
      <ul>
        {stop.shots.map((shot, i) => (
          <li key={shot}>
            <label className={done[i] ? 'shot done' : 'shot'}>
              <input
                type="checkbox"
                checked={!!done[i]}
                onChange={() => toggle(i)}
              />
              <span>{shot}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Stop({ stop, nowNext }) {
  const [photoFailed, setPhotoFailed] = useState(false)
  const usePhoto = stop.photo && !photoFailed
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const isNow = nowNext.current === stop.name
  const isNext = nowNext.next === stop.name

  return (
    <li
      className={`stop stop-${stop.type} ${isNow ? 'stop-now' : ''}`}
      ref={ref}
    >
      <span className="stop-marker" aria-hidden="true">
        {stop.icon}
      </span>
      {stop.leg && (
        <p className="stop-leg">
          {stop.leg.mode === 'walk' ? '🚶' : '🚗'} {stop.leg.label}
        </p>
      )}
      <article className="stop-card">
        {stop.image && (
          <figure className="stop-figure">
            <img
              className="stop-image"
              src={usePhoto ? stop.photo : stop.image}
              alt={stop.name}
              loading="lazy"
              onError={() => setPhotoFailed(true)}
            />
            {usePhoto && stop.credit && (
              <figcaption className="stop-credit">
                Photo:{' '}
                <a href={stop.credit} target="_blank" rel="noreferrer">
                  Wikimedia Commons
                </a>
              </figcaption>
            )}
          </figure>
        )}
        <div className="stop-body">
          <p className="stop-time">
            {stop.time}
            {isNow && <span className="live-chip now">▶ Now</span>}
            {isNext && <span className="live-chip next">Next</span>}
          </p>
          <h3 className="stop-name">{stop.name}</h3>
          {stop.subname && <p className="stop-subname">{stop.subname}</p>}
          <p className="stop-description">{stop.description}</p>
          {stop.tips && (
            <p className="stop-tips">
              <span className="stop-tips-label">📸 Shot notes</span>
              {stop.tips}
            </p>
          )}
          {stop.shots && <ShotList stop={stop} />}
          {(stop.map || stop.bortle) && (
            <p className="stop-actions">
              {stop.map && (
                <a
                  className="map-link"
                  href={stop.map}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden="true">📍</span> Google Maps
                </a>
              )}
              {stop.bortle && (
                <a
                  className="map-link bortle-link"
                  href={stop.bortle.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden="true">🔭</span> {stop.bortle.label}
                </a>
              )}
            </p>
          )}
        </div>
      </article>
    </li>
  )
}

function Day({ day, nowNext }) {
  return (
    <section className="day" id={day.id} aria-labelledby={`${day.id}-title`}>
      <header className="day-header">
        <span className="day-badge">Day {day.number}</span>
        <div>
          <h2 className="day-title" id={`${day.id}-title`}>
            {day.title}
          </h2>
          <p className="day-meta">
            {day.date} · {day.theme}
          </p>
        </div>
      </header>
      <DayConditions day={day} />
      <ol className="timeline">
        {day.stops.map((stop) => (
          <Stop key={stop.name} stop={stop} nowNext={nowNext} />
        ))}
      </ol>
    </section>
  )
}

function StatsBand() {
  return (
    <section className="stats-band" aria-label="Trip stats">
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </section>
  )
}

export default function App() {
  const nowNext = useNowNext()
  return (
    <>
      <NavBar />
      <Hero />
      <main className="days">
        {days.map((day) => (
          <Day key={day.id} day={day} nowNext={nowNext} />
        ))}
        <RouteMap />
        <AstroToolkit />
        <Expenses />
      </main>
      <StatsBand />
      <footer className="footer">
        <p className="footer-line">✦ ✦ ✦</p>
        <p>
          Shot on Sony A7V · Sigma 24-70mm f/2.8 · driven in a{' '}
          <a
            href="https://www3.nissan.co.jp/vehicles/new/note.html"
            target="_blank"
            rel="noreferrer"
          >
            Nissan Note e-POWER
          </a>{' '}
          — see you under the stars, Jie Ge
        </p>
        <p className="footer-small">
          Location photos via Wikimedia Commons · Map © OpenStreetMap · Works
          offline once visited
        </p>
      </footer>
    </>
  )
}
