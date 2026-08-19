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

// Altitude/azimuth of the galactic core (Sgr A*: RA 17h45.7m, Dec -29.0°)
// for aiming Milky Way compositions. Azimuth measured from north, clockwise.
const CORE_RA = (17 + 45.7 / 60) * 15 // degrees
const CORE_DEC = -29.0
const rad = Math.PI / 180

const COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']

export function galacticCore(date, lat, lon) {
  const d = (date.getTime() - Date.UTC(2000, 0, 1, 12)) / 86400000
  const gmst = (280.46061837 + 360.98564736629 * d) % 360
  const lst = (gmst + lon + 360) % 360
  const ha = ((lst - CORE_RA + 540) % 360) - 180
  const alt =
    Math.asin(
      Math.sin(CORE_DEC * rad) * Math.sin(lat * rad) +
        Math.cos(CORE_DEC * rad) * Math.cos(lat * rad) * Math.cos(ha * rad),
    ) / rad
  let az =
    Math.atan2(
      Math.sin(ha * rad),
      Math.cos(ha * rad) * Math.sin(lat * rad) -
        Math.tan(CORE_DEC * rad) * Math.cos(lat * rad),
    ) / rad
  az = (az + 180 + 360) % 360 // from north, clockwise
  const compass = COMPASS[Math.round(az / 22.5) % 16]
  return { az: Math.round(az), alt: Math.round(alt), compass }
}

// Great-circle distance in km between [lat, lon] pairs.
export function distanceKm([lat1, lon1], [lat2, lon2]) {
  const dLat = (lat2 - lat1) * rad
  const dLon = (lon2 - lon1) * rad
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
