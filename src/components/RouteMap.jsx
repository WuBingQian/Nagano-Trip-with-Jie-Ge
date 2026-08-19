import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { days } from '../data/itinerary.js'

export default function RouteMap() {
  const ref = useRef(null)

  useEffect(() => {
    const map = L.map(ref.current, { scrollWheelZoom: false })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map)

    const all = []
    days.forEach((day) => {
      const pts = day.stops.filter((s) => s.coords).map((s) => s.coords)
      L.polyline(pts, {
        color: day.color,
        weight: 3,
        opacity: 0.85,
        dashArray: day.number === 3 ? '6 6' : null,
      }).addTo(map)
      day.stops
        .filter((s) => s.coords)
        .forEach((s, i) => {
          L.marker(s.coords, {
            icon: L.divIcon({
              className: 'map-pin',
              html: `<span style="background:${day.color}">${day.number}.${i + 1}</span>`,
              iconSize: [30, 22],
              iconAnchor: [15, 11],
            }),
          })
            .addTo(map)
            .bindPopup(`<b>${s.name}</b><br>${s.time}`)
        })
      all.push(...pts)
    })
    map.fitBounds(L.latLngBounds(all).pad(0.1))
    return () => map.remove()
  }, [])

  return (
    <section className="section" id="map" aria-label="Route map">
      <h2 className="section-title">Route Map</h2>
      <p className="section-sub">
        Day 1 <span className="swatch" style={{ background: '#f0b464' }} /> ·
        Day 2 <span className="swatch" style={{ background: '#a490c2' }} /> ·
        Day 3 <span className="swatch" style={{ background: '#7a8dd9' }} />
      </p>
      <div className="route-map" ref={ref} />
    </section>
  )
}
