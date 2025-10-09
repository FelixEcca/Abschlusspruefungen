// ==========================================
// 4B (3062) – Parabel p1 und weitere p2
// ==========================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // p1: y = a1 x^2 + b1 x (wie im Original mit a1=2, b1=4, c1=0)
  a1: number
  b1: number
  // p2: wahlweise Normalparabel transformiert (zwei Varianten)
  mode: 'scheitel' | 'achsform'
  // Scheitelform-Parameter (falls mode=scheitel): y = ±(x-h)^2 + k
  s_a: number
  s_h: number
  s_k: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise3062: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2022 Wahlteil Aufgabe 4B',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    // p1 random, aber schön ganzzahlig (Original: a1=2, b1=4)
    const a1 = rng.randomItemFromArray([1, 2, 3])
    const b1 = rng.randomItemFromArray([2, 4, 6])
    const mode = rng.randomItemFromArray(['scheitel', 'achsform'] as const)
    // p2-Parameter (scheitel)
    const s_a = rng.randomItemFromArray([1, -1])
    const s_h = rng.randomIntBetween(-2, 2)
    const s_k = rng.randomIntBetween(-2, 3)
    return { a1, b1, mode, s_a, s_h, s_k }
  },

  // Originaldaten: p1 = 2x^2 + 4x ; p2 = -x^2 + 1
  originalData: { a1: 2, b1: 4, mode: 'scheitel', s_a: -1, s_h: 0, s_k: 1 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <div className="space-y-1">
        <p>
          <b>p₁:</b>{' '}
          <InlineMath
            math={`y=${pp(data.a1)}x^{2}${pp(data.b1, 'merge_op')}x`}
          />
        </p>
        <p>
          <b>p₂:</b> wird als Variation der Normalparabel beschrieben.
        </p>
      </div>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>1.</b> Berechnen Sie die Schnittpunkte von{' '}
            <InlineMath math="p_1" /> mit den Koordinatenachsen.
          </p>
        )
      },
      solution({ data }) {
        // y=0: x(ax+b)=0 -> x1=0, x2=-b/a ; y-Achse bei x=0 -> y=0 (hier gleicher Punkt)
        const x1 = 0
        const x2 = -data.b1 / data.a1
        return (
          <ul className="list-disc ml-6">
            <li>
              x-Achse: <InlineMath math={`(0\\mid 0)`} />,{' '}
              <InlineMath math={`(${pp(x2)}\\mid 0)`} />
            </li>
            <li>
              y-Achse: <InlineMath math={`(0\\mid 0)`} />
            </li>
          </ul>
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>2.</b> Zeichnen Sie <InlineMath math="p_1" /> in ein
            Koordinatensystem.
          </p>
        )
      },
      solution({ data }) {
        const xs: number[] = []
        for (let x = -6; x <= 6; x += 0.1) xs.push(+x.toFixed(1))
        const path = xs
          .map(x => `${toX(x)},${toY(data.a1 * x * x + data.b1 * x)}`)
          .join(' ')
        return (
          <svg
            viewBox="0 0 328 328"
            width="328"
            height="328"
            className="border rounded"
          >
            <image
              href="/content/BW_2BFS/ksgroßmitachsen.png"
              width="328"
              height="328"
            />
            <polyline
              points={path}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>3.</b> <InlineMath math="p_2" /> hat die Gleichung{' '}
            <InlineMath math="y=-x^2+1" /> (Original). Beschreiben Sie, wie sie
            aus der Normalparabel entsteht.
          </p>
        )
      },
      solution({ data }) {
        // Für die Originaldaten:
        if (
          data.mode === 'scheitel' &&
          data.s_a === -1 &&
          data.s_h === 0 &&
          data.s_k === 1
        ) {
          return (
            <p>
              Spiegelung an der x-Achse (<InlineMath math="a=-1" />) und
              Verschiebung um <InlineMath math="1" /> nach oben.
            </p>
          )
        }
        // Generische Variante
        return (
          <p>
            <InlineMath
              math={`y=${data.s_a === 1 ? '' : data.s_a}(x${pp(-data.s_h, 'merge_op')})^{2}${pp(data.s_k, 'merge_op')}`}
            />
            :{` `}
            {data.s_a === -1 ? 'Spiegelung an der x-Achse, ' : ''}
            {data.s_h !== 0
              ? `Verschiebung um ${pp(data.s_h)} in x-Richtung, `
              : ''}
            {data.s_k !== 0
              ? `Verschiebung um ${pp(data.s_k)} in y-Richtung.`
              : 'keine y-Verschiebung.'}
          </p>
        )
      },
    },
  ],
}
