import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  c: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise4008: Exercise<DATA> = {
  title: 'Parameter a und c aus dem Schaubild ablesen',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 4,

  generator(rng) {
    const a = rng.randomItemFromArray([0.5, 1, 2])
    const c = rng.randomIntBetween(-3, 3)
    return { a, c }
  },

  originalData: { a: 1, c: -1 },

  task({ data }) {
    // Zeichne die Parabel y = a x^2 + c
    const xs: number[] = []
    for (let x = -5; x <= 5; x += 0.2) xs.push(+x.toFixed(1))
    const path = xs
      .map(x => {
        const y = data.a * x * x + data.c
        return `${toX(x)},${toY(y)}`
      })
      .join(' ')

    return (
      <>
        <p>
          Lies aus dem Schaubild die Parameter <InlineMath math="a" /> und{' '}
          <InlineMath math="c" /> der Parabel <InlineMath math="y=a x^2 + c" />{' '}
          ab.
        </p>
        <svg viewBox="0 0 328 328" className="border rounded">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline
            points={path}
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Markierung y-Achsenabschnitt (0,c) */}
          <circle cx={toX(0)} cy={toY(data.c)} r="3" fill="blue" />
        </svg>
      </>
    )
  },

  solution({ data }) {
    // „a“ über Vergleich der Breite: z. B. Punkt (1, a + c) relativ zu c
    const y1 = data.a * 1 * 1 + data.c
    return (
      <>
        <p>
          <b>Antwort:</b>{' '}
          <InlineMath math={`a=${pp(data.a)},\\; c=${pp(data.c)}`} />
        </p>
        <p className="text-sm">
          Hinweis: <InlineMath math="c" /> ist der Schnittpunkt mit der y-Achse{' '}
          <InlineMath math="(0,c)" />. Für <InlineMath math="x=1" /> liegt die
          Parabel bei{' '}
          <InlineMath math={`y=a\\cdot 1^2 + c = a + c = ${pp(y1)}`} />, daraus
          erkennt man <InlineMath math="a" />.
        </p>
      </>
    )
  },
}
