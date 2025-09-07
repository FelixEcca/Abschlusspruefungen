import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  h: number
  k: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise4000: Exercise<DATA> = {
  title: 'Scheitelpunkt ablesen',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 2,

  generator(rng) {
    const aAbs = rng.randomItemFromArray([0.5, 1, 1.5])
    const a = rng.randomItemFromArray([-1, 1]) * aAbs
    const h = rng.randomIntBetween(-6, 6)
    const k = rng.randomIntBetween(-6, 6)
    return { a, h, k }
  },

  originalData: {
    a: 1,
    h: -2,
    k: 1,
  },

  constraint() {
    return true
  },

  task({ data }) {
    const { a, h, k } = data

    const xs: number[] = []
    for (let x = h - 6; x <= h + 6; x += 0.1) xs.push(+x.toFixed(1))
    const points = xs
      .map(x => {
        const y = a * (x - h) * (x - h) + k
        return `${toX(x)},${toY(y)}`
      })
      .join(' ')

    return (
      <>
        <p>
          Lies den <b>Scheitelpunkt</b> <InlineMath math="S(x\,|\,y)" /> der
          Parabel aus dem Koordinatensystem ab.
        </p>

        <svg viewBox="0 0 328 328" className="max-w-full">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
          />
          <circle cx={toX(h)} cy={toY(k)} r="3.5" fill="#DC2626" />
        </svg>
      </>
    )
  },

  solution({ data }) {
    const { h, k } = data
    return (
      <>
        <p>
          <InlineMath math={`S(${h}\\,|\\,${k})`} />
        </p>
      </>
    )
  },
}
