import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  weights: number[] // Proportional zu Sektorgröße
  payouts: number[] // Gewinn/Verlust pro Feld
}

function sum(a: number[]) {
  return a.reduce((s, v) => s + v, 0)
}

export const exercise4905: Exercise<DATA> = {
  title: 'Erwartungswert',
  source: 'Training',
  useCalculator: false,
  duration: 10,
  points: 4,

  generator(rng) {
    const n = rng.randomIntBetween(3, 6) // Anzahl Sektoren
    const weights = Array.from({ length: n }, () => rng.randomIntBetween(1, 4)) // Feldgrößen
    // Payouts gemischt (kleine Verluste, kleine/seltene Gewinne)
    const basePay = [-2, -1, 0, 1, 2, 3, 5]
    const payouts = Array.from({ length: n }, () =>
      rng.randomItemFromArray(basePay),
    )
    return { weights, payouts }
  },

  originalData: {
    weights: [1, 2, 1, 3, 2],
    payouts: [-1, 0, 2, 3, -2],
  },

  constraint() {
    return true
  },

  task({ data }) {
    const { weights, payouts } = data
    const totalW = sum(weights)

    // SVG Glücksrad
    const cx = 80,
      cy = 80,
      r = 60
    let start = -Math.PI / 2
    const arcs = weights.map(w => {
      const angle = (w / totalW) * Math.PI * 2
      const end = start + angle
      const large = angle > Math.PI ? 1 : 0
      const x1 = cx + r * Math.cos(start)
      const y1 = cy + r * Math.sin(start)
      const x2 = cx + r * Math.cos(end)
      const y2 = cy + r * Math.sin(end)
      const mid = start + angle / 2
      const mx = cx + r * 0.6 * Math.cos(mid)
      const my = cy + r * 0.6 * Math.sin(mid)
      start = end
      return {
        path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`,
        mx,
        my,
      }
    })

    return (
      <>
        <p>
          Ein Glücksrad mit unterschiedlich großen Feldern wird einmal gedreht.
          Die Tabelle zeigt die Auszahlungen pro Feld. Bestimme den
          Erwartungswert <InlineMath math="E" /> des Spiels.
        </p>

        {/* Skizze */}
        <svg viewBox="0 0 200 160" className="border rounded my-2">
          <circle cx="80" cy="80" r="62" fill="none" stroke="black" />
          {arcs.map((a, i) => (
            <g key={i}>
              <path d={a.path} fill="rgba(100,100,255,0.15)" stroke="black" />
              <text
                x={a.mx}
                y={a.my}
                fontSize="10"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {payouts[i]}
              </text>
            </g>
          ))}
          {/* Zeiger */}
          <polygon points="145,80 170,74 170,86" fill="crimson" />
        </svg>

        {/* Tabelle */}
        <div className="overflow-auto">
          <table className="min-w-[280px] text-sm border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-1">Feld</th>
                {payouts.map((_, i) => (
                  <th key={i} className="border px-2 py-1 text-right">
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Auszahlung </td>
                {payouts.map((v, i) => (
                  <td key={i} className="border px-2 py-1 text-right">
                    {v}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-2 py-1">Wahrscheinlichkeit </td>
                {weights.map((w, i) => (
                  <td key={i} className="border px-2 py-1 text-right">
                    <InlineMath math={`\\tfrac{${w}}{${totalW}}`} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },

  solution({ data }) {
    const { weights, payouts } = data
    const totalW = sum(weights)
    const probs = weights.map(w => w / totalW)
    const E = payouts.reduce((s, x, i) => s + x * probs[i], 0)
    return (
      <>
        <InlineMath
          math={`E=${payouts
            .map(
              (x, i) =>
                `${pp(x, 'embrace_neg')}\\cdot\\tfrac{${weights[i]}}{${totalW}}`,
            )
            .join('+')}\\;=\\;${pp(Math.round(E * 100) / 100)}`}
        />
        <p className="text-sm text-gray-600 mt-2">
          Ein positiver Erwartungswert begünstigt den Spieler, negativer das
          Spiel (Bank).
        </p>
      </>
    )
  },
}
