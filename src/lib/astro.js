import * as SunCalc from 'suncalc'

// All display times are Japan Standard Time regardless of viewer timezone.
export const fmtJST = (d) =>
  d instanceof Date && !isNaN(d)
    ? d.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tokyo',
      })
    : '—'

export function sunTimes(isoDate, lat, lon) {
  const noon = new Date(`${isoDate}T12:00:00+09:00`)
  const t = SunCalc.getTimes(noon, lat, lon)
  return {
    sunrise: t.sunrise,
    sunset: t.sunset,
    goldenHour: t.goldenHour, // evening golden hour start
    night: t.night, // astronomical darkness start
  }
}

const PHASES = [
  [0.03, '🌑 New moon'],
  [0.22, '🌒 Waxing crescent'],
  [0.28, '🌓 First quarter'],
  [0.47, '🌔 Waxing gibbous'],
  [0.53, '🌕 Full moon'],
  [0.72, '🌖 Waning gibbous'],
  [0.78, '🌗 Last quarter'],
  [0.97, '🌘 Waning crescent'],
  [1.01, '🌑 New moon'],
]

export function moonInfo(isoDate, lat, lon) {
  const noon = new Date(`${isoDate}T12:00:00+09:00`)
  const midnight = new Date(`${isoDate}T00:00:00+09:00`)
  const illum = SunCalc.getMoonIllumination(noon)
  const times = SunCalc.getMoonTimes(midnight, lat, lon)
  const phase = PHASES.find(([limit]) => illum.phase <= limit)?.[1] ?? '🌙 Moon'
  const pct = Math.round(illum.fraction * 100)
  let verdict
  if (illum.fraction < 0.25)
    verdict = 'Excellent — near-moonless dark sky for the Milky Way.'
  else if (illum.fraction < 0.5)
    verdict = 'Good — some moonlight; shoot while the moon is below the horizon.'
  else
    verdict =
      'Bright moon — plan the session before moonrise or after moonset.'
  return { phase, pct, rise: times.rise, set: times.set, verdict }
}
