import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  kind: 'shift' | 'vertex'
  c: number
  h: number
  k: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise4007: Exercise<DATA> = {
  title: 'Parabel skizzieren',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 3,

  generator(rng) {
    const kind = rng.randomItemFromArray<'shift' | 'vertex'>([
      'shift',
      'vertex',
    ])
    const c = rng.randomIntBetween(-6, 6)
    const h = rng.randomIntBetween(-6, 6)
    const k = rng.randomIntBetween(-6, 6)
    return { kind, c, h, k }
  },

  originalData: { kind: 'shift', c: 2, h: -1, k: 1 },
constraint({ data }) {
    
    return (
      data.c!=0 && data.h!=0 && data.k!=0 && data.h!=data.k && Math.abs(data.c)<=5 && Math.abs(data.h)<=5 && Math.abs(data.k)<=5
    )
  },
  task({ data }) {
    const { kind, c, h, k } = data
    const term =
      kind === 'shift'
        ? `y=x^{2} ${pp(c, 'merge_op')}`
        : `y=(x${pp(-h, 'merge_op')})^{2} ${pp(k, 'merge_op')}`

    return (
      <>
        <p>
          Skizziere die Parabel <InlineMath math={term} /> in das
          Koordinatensystem.
        </p>
        <svg viewBox="0 0 328 328" className="border rounded">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
        </svg>
      </>
    )
  },

  solution({ data }) {
    const { kind, c, h, k } = data

    // Punkte zum Zeichnen:
    const xs: number[] = []
    for (let x = -5; x <= 5; x += 0.2) xs.push(+x.toFixed(1))
    const path = xs
      .map(x => {
        const y = kind === 'shift' ? x * x + c : (x - h) * (x - h) + k
        return `${toX(x)},${toY(y)}`
      })
      .join(' ')

    return (
      <>
        <p>
          <b>Skizze</b>
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
        </svg>
      </>
    )
  },
}
