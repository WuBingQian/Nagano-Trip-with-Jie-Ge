import { useState } from 'react'

// Assumes a 33 MP full-frame sensor (~5.1 µm pixel pitch) at f/2.8.
const PITCH = 5.1
const APERTURE = 2.8
const FOCALS = [24, 28, 35, 50, 70]

const fmtShutter = (s) =>
  s >= 1 ? `${s.toFixed(1).replace(/\.0$/, '')} s` : `1/${Math.round(1 / s)} s`

const ND_ROWS = [
  ['1/125 s', '1/15 s', '1/2 s', '8 s'],
  ['1/60 s', '1/8 s', '1 s', '16 s'],
  ['1/30 s', '1/4 s', '2 s', '32 s'],
]

export default function AstroToolkit() {
  const [focal, setFocal] = useState(24)
  const rule500 = 500 / focal
  const npf = (35 * APERTURE + 30 * PITCH) / focal

  return (
    <section className="section" id="tools" aria-label="Astro toolkit">
      <h2 className="section-title">Astro Toolkit</h2>
      <p className="section-sub">
        Field math for the A7V + Sigma 24-70mm f/2.8
      </p>
      <div className="toolkit-grid">
        <div className="tool-card">
          <h3 className="tool-title">🌌 Max shutter before star trails</h3>
          <div className="focal-row" role="group" aria-label="Focal length">
            {FOCALS.map((f) => (
              <button
                key={f}
                className={`focal-btn ${f === focal ? 'active' : ''}`}
                onClick={() => setFocal(f)}
              >
                {f}mm
              </button>
            ))}
          </div>
          <dl className="tool-facts">
            <div>
              <dt>NPF rule (sharp)</dt>
              <dd>{fmtShutter(npf)}</dd>
            </div>
            <div>
              <dt>500 rule (relaxed)</dt>
              <dd>{fmtShutter(rule500)}</dd>
            </div>
            <div>
              <dt>Starting point</dt>
              <dd>f/2.8 · ISO 3200</dd>
            </div>
          </dl>
          <p className="tool-note">
            NPF assumes a 33 MP full-frame sensor at f/2.8. Nail focus on a
            bright star with magnified live view first.
          </p>
        </div>
        <div className="tool-card">
          <h3 className="tool-title">💧 Silky-water ND math (Shiraito)</h3>
          <table className="nd-table">
            <thead>
              <tr>
                <th>Base</th>
                <th>ND8</th>
                <th>ND64</th>
                <th>ND1000</th>
              </tr>
            </thead>
            <tbody>
              {ND_ROWS.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="tool-note">
            Aim for 0.5–2 s on the falls. Meter without the filter, then count
            stops. Tripod + 2 s self-timer, IBIS off.
          </p>
        </div>
      </div>
    </section>
  )
}
