import { useEffect, useRef, useState } from 'react'
import { trip, days } from './data/itinerary.js'

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
        ✦ Nagano · Aug 21–23
      </a>
      <div className="navbar-links">
        {days.map((d) => (
          <a key={d.id} className="navbar-link" href={`#${d.id}`}>
            Day {d.number}
          </a>
        ))}
        <ThemeToggle />
      </div>
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
  // Layered mountain silhouettes along the hero's lower edge
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

function Hero() {
  return (
    <header className="hero" id="top">
      <Stars />
      <div className="hero-inner">
        <p className="hero-kicker">A Photography Road Trip</p>
        <h1 className="hero-title">{trip.title}</h1>
        <p className="hero-subtitle">{trip.subtitle}</p>
        <p className="hero-dates">
          <span aria-hidden="true">📅</span>
          {trip.dates}
        </p>
        <div className="gear-card">
          <p className="gear-heading">In the bag</p>
          <ul className="gear-list">
            {trip.gear.map((g) => (
              <li key={g.label} className="gear-item">
                <span className="gear-label">{g.label}</span>
                <span className="gear-value">{g.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <HeroRidge />
    </header>
  )
}

function Stop({ stop }) {
  // Prefer the real photograph; fall back to the bundled illustration
  // if the remote image ever fails to load.
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

  return (
    <li className={`stop stop-${stop.type}`} ref={ref}>
      <span className="stop-marker" aria-hidden="true">
        {stop.icon}
      </span>
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
          <p className="stop-time">{stop.time}</p>
          <h3 className="stop-name">{stop.name}</h3>
          {stop.subname && <p className="stop-subname">{stop.subname}</p>}
          <p className="stop-description">{stop.description}</p>
          {stop.tips && (
            <p className="stop-tips">
              <span className="stop-tips-label">📸 Shot notes</span>
              {stop.tips}
            </p>
          )}
          {stop.map && (
            <p className="stop-actions">
              <a
                className="map-link"
                href={stop.map}
                target="_blank"
                rel="noreferrer"
              >
                <span aria-hidden="true">📍</span> Open in Google Maps
              </a>
            </p>
          )}
        </div>
      </article>
    </li>
  )
}

function Day({ day }) {
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
      <ol className="timeline">
        {day.stops.map((stop) => (
          <Stop key={stop.name} stop={stop} />
        ))}
      </ol>
    </section>
  )
}

export default function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <main className="days">
        {days.map((day) => (
          <Day key={day.id} day={day} />
        ))}
      </main>
      <footer className="footer">
        <p className="footer-line">✦ ✦ ✦</p>
        <p>
          Shot on Sony A7V · Sigma 24-70mm f/2.8 — see you under the stars,
          Jie Ge
        </p>
        <p className="footer-small">
          Location photos via Wikimedia Commons · Built with React + Vite
        </p>
      </footer>
    </>
  )
}
