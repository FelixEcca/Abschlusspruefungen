// exercise4920.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  angleA: number
  hyp: number
  opp: number
  adj: number
  angleB: number
  hypB: number
  adjB: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise4920: Exercise<DATA> = {
  title: 'Sin, Cos und Tan anwenden',
  source: 'Trigonometrie',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    const angleA = rng.randomItemFromArray([30, 35, 40, 45, 50, 60])
    const hyp = rng.randomItemFromArray([6, 8, 10, 12])
    const opp = round2(hyp * Math.sin((angleA * Math.PI) / 180))
    const adj = round2(hyp * Math.cos((angleA * Math.PI) / 180))

    const angleB = rng.randomItemFromArray([25, 30, 35, 40, 45, 50])
    const hypB = rng.randomItemFromArray([5, 6, 8, 10])
    const adjB = round2(hypB * Math.cos((angleB * Math.PI) / 180))

    return { angleA, hyp, opp, adj, angleB, hypB, adjB }
  },
  originalData: {
    angleA: 30,
    hyp: 10,
    opp: 5,
    adj: 8.66,
    angleB: 37,
    hypB: 5,
    adjB: 3.99,
  },
  constraint({ data }) {
    return data.opp > 0 && data.adj > 0 && data.adjB > 0
  },
  task({ data }) {
    return (
      <>
        <p>a) Berechnen Sie die fehlende Seite mit Sin, Cos oder Tan.</p>

        <svg viewBox="0 0 328 160">
          <line
            x1="40"
            y1="120"
            x2="180"
            y2="120"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="180"
            y1="120"
            x2="140"
            y2="40"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="40"
            y1="120"
            x2="140"
            y2="40"
            stroke="black"
            strokeWidth="2"
          />
          <text x="58" y="112" fontSize="16">
            {data.angleA}°
          </text>
          <text x="92" y="138" fontSize="16">
            {data.hyp}
          </text>
          <text x="150" y="86" fontSize="16">
            a
          </text>
        </svg>

        <p>b) Berechnen Sie den markierten Winkel mit Sin, Cos oder Tan.</p>

        <svg viewBox="0 0 328 160">
          <line
            x1="40"
            y1="120"
            x2="180"
            y2="120"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="180"
            y1="120"
            x2="140"
            y2="40"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="40"
            y1="120"
            x2="140"
            y2="40"
            stroke="black"
            strokeWidth="2"
          />
          <text x="92" y="138" fontSize="16">
            {data.hypB}
          </text>
          <text x="150" y="86" fontSize="16">
            {data.adjB}
          </text>
          <text x="58" y="112" fontSize="16">
            α
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>a)</p>
        <InlineMath
          math={`\\sin(${data.angleA}^{\\circ}) = \\frac{a}{${data.hyp}}`}
        />
        <br />
        <InlineMath
          math={`a = ${data.hyp}\\cdot \\sin(${data.angleA}^{\\circ}) \\approx ${pp(
            data.opp,
          )}`}
        />

        <p>b)</p>
        <InlineMath
          math={`\\cos(\\alpha) = \\frac{${pp(data.adjB)}}{${data.hypB}}`}
        />
        <br />
        <InlineMath
          math={`\\alpha = \\arccos\\left(\\frac{${pp(data.adjB)}}{${data.hypB}}\\right) \\approx ${pp(
            data.angleB,
          )}^{\\circ}`}
        />
      </>
    )
  },
}
