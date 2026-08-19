import { useEffect, useState } from 'react'
import { galacticCore } from '../lib/astro.js'

// Hour-by-hour cloud cover for the shooting window (21:00–01:00 JST)
// plus a compass pointer to the galactic core at 23:30.
export default function NightPanel({ stop }) {
  const [hours, setHours] = useState(null)
  const [lat, lon] = stop.coords
  const startDate = stop.start.slice(0, 10)

  useEffect(() => {
    const end = new Date(Date.parse(`${startDate}T12:00:00+09:00`) + 86400000)
      .toISOString()
      .slice(0, 10)
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&hourly=cloud_cover&timezone=Asia%2FTokyo&start_date=${startDate}&end_date=${end}`
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (!d.hourly?.time) return
        // hourly arrays hold 24 entries per day; index = hour offset from
        // day-1 00:00, so 24 and 25 land on 00:00/01:00 of the next day.
        const wanted = [21, 22, 23, 24, 25]
        const picked = wanted.map((h) => ({
          label: `${String(h % 24).padStart(2, '0')}:00`,
          cloud: d.hourly.cloud_cover[h],
        }))
        if (picked.every((p) => p.cloud != null)) setHours(picked)
      })
      .catch(() => {})
  }, [lat, lon, startDate])

  const core = galacticCore(
    new Date(`${startDate}T23:30:00+09:00`),
    lat,
    lon,
  )

  const cloudClass = (c) => (c <= 25 ? 'good' : c <= 60 ? 'mid' : 'bad')

  return (
    <div className="night-panel">
      {hours && (
        <div className="cloud-strip" title="Forecast cloud cover, 21:00–01:00 JST">
          <span className="cloud-strip-label">☁️ Night clouds</span>
          {hours.map((h) => (
            <span key={h.label} className={`cloud-cell ${cloudClass(h.cloud)}`}>
              <b>{h.cloud}%</b>
              <small>{h.label}</small>
            </span>
          ))}
        </div>
      )}
      <div className="core-finder">
        <span
          className="core-compass"
          aria-hidden="true"
          style={{ '--az': `${core.az}deg` }}
        >
          <i className="core-n">N</i>
          <i className="core-arrow">➤</i>
        </span>
        <p className="core-text">
          <b>Galactic core finder:</b> at 23:30 the Milky Way core sits{' '}
          <b>
            {core.compass} (azimuth {core.az}°)
          </b>
          , {core.alt}° above the horizon — face {core.compass} across the pond
          for the reflection shot.
        </p>
      </div>
    </div>
  )
}
