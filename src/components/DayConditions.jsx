import { useEffect, useState } from 'react'
import { sunTimes, moonInfo, fmtJST } from '../lib/astro.js'

const WMO_ICONS = [
  [0, '☀️'], [2, '🌤️'], [3, '☁️'], [48, '🌫️'], [57, '🌦️'],
  [67, '🌧️'], [77, '🌨️'], [82, '🌧️'], [86, '🌨️'], [99, '⛈️'],
]
const wmoIcon = (code) =>
  WMO_ICONS.find(([limit]) => code <= limit)?.[1] ?? '🌡️'

function useWeather(point, isoDate) {
  const [w, setW] = useState(null)
  useEffect(() => {
    if (!point) return
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${point.lat}&longitude=${point.lon}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,cloud_cover_mean` +
      `&timezone=Asia%2FTokyo&start_date=${isoDate}&end_date=${isoDate}`
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (!d.daily?.weather_code) return
        setW({
          code: d.daily.weather_code[0],
          tmax: Math.round(d.daily.temperature_2m_max?.[0]),
          tmin: Math.round(d.daily.temperature_2m_min?.[0]),
          rain: d.daily.precipitation_probability_max?.[0],
          cloud: Math.round(d.daily.cloud_cover_mean?.[0]),
        })
      })
      .catch(() => {})
  }, [point?.lat, point?.lon, isoDate])
  return w
}

export default function DayConditions({ day }) {
  const sun = sunTimes(day.isoDate, day.sunPoint.lat, day.sunPoint.lon)
  const moon = day.moonPoint
    ? moonInfo(day.isoDate, day.moonPoint.lat, day.moonPoint.lon)
    : null
  const w = useWeather(day.weatherPoint, day.isoDate)

  return (
    <div className="conditions">
      <div className="cond-strip">
        <span className="cond-chip" title="Sunrise">
          🌅 {fmtJST(sun.sunrise)}
        </span>
        <span className="cond-chip" title="Evening golden hour begins">
          ✨ Golden {fmtJST(sun.goldenHour)}
        </span>
        <span className="cond-chip" title="Sunset">
          🌇 {fmtJST(sun.sunset)}
        </span>
        {moon && (
          <span className="cond-chip" title="Astronomical darkness begins">
            🌌 Dark {fmtJST(sun.night)}
          </span>
        )}
        {w && (
          <span
            className="cond-chip cond-weather"
            title={`Forecast for ${day.weatherPoint.label}`}
          >
            {wmoIcon(w.code)} {w.tmin}–{w.tmax}°C · ☔ {w.rain}% · ☁️ {w.cloud}%
          </span>
        )}
      </div>
      {moon && (
        <div className="moon-panel">
          <p className="moon-headline">
            {moon.phase} · {moon.pct}% illuminated · rise{' '}
            {fmtJST(moon.rise)} / set {fmtJST(moon.set)}
          </p>
          <p className="moon-verdict">{moon.verdict}</p>
        </div>
      )}
      {day.planB && (
        <details className="planb">
          <summary>☔ Plan B for this day</summary>
          <p>{day.planB}</p>
        </details>
      )}
    </div>
  )
}
