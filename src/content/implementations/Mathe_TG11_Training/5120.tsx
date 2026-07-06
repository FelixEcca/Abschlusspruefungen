// exercise5120.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  q: number
  d: number
}

function f(x: number, data: DATA) {
  return data.a * Math.pow(data.q, x) + data.d
}

function xMap(x: number) {
  return 167 + x * ((94.5 * 2) / 10)
}

function yMap(y: number) {
  return 163 - y * ((94.5 * 2) / 10)
}

function graphPath(data: DATA) {
  const points = Array.from({ length: 161 }, (_, i) => {
    const x = -8 + i * 0.1
    const y = f(x, data)
    return `${i === 0 ? 'M' : 'L'} ${xMap(x)} ${yMap(y)}`
  })

  return points.join(' ')
}

export const exercise5120: Exercise<DATA> = {
  title: 'Asymptote ablesen',
  source: 'Exponentialfunktionen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const a = rng.randomItemFromArray([2, 3, 4, 5])
    const q = rng.randomItemFromArray([0.6, 0.7, 0.8, 1.2, 1.3])
    const d = rng.randomItemFromArray([-4, -3, -2, 2, 3, 4])

    return { a, q, d }
  },

  originalData: {
    a: 4,
    q: 0.7,
    d: 3,
  },

  constraint({ data }) {
    return data.q > 0 && data.q !== 1
  },

  task({ data }) {
    return (
      <>
        <p>
          Lesen Sie den Wert der waagrechten Asymptote <InlineMath math={`d`} />{' '}
          des Graphen ab.
        </p>

        <svg viewBox="0 0 328 328">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            width="328"
            height="328"
          />

          <path
            d={graphPath(data)}
            fill="none"
            stroke="black"
            strokeWidth="3"
          />
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`d=${pp(data.d)}`} />
      </>
    )
  },
}
