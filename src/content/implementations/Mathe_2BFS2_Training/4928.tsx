// exercise4928.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  n: number
  h: number
  k: number
  v: number
  shift: number
  order: number[]
}

function toX(x: number) {
  return 167 + x * ((94.5 * 2) / 10)
}

function toY(y: number) {
  return 163 - y * ((94.5 * 2) / 10)
}

function fValue(a: number, n: number, h: number, k: number, v: number, x: number) {
  return a * Math.pow(x - h, n) + v * (x - h) + k
}

function dValue(a: number, n: number, h: number, v: number, x: number) {
  return a * n * Math.pow(x - h, n - 1) + v
}

function polyline(pointsFn: (x: number) => number) {
  const pts: string[] = []
  for (let x = -8; x <= 8; x += 0.1) {
    const y = pointsFn(x)
    if (y >= -9.5 && y <= 9.5) pts.push(`${toX(x)},${toY(y)}`)
  }
  return pts.join(' ')
}

function SmallGraph(props: { points: string }) {
  return (
    <svg viewBox="0 0 328 328">
      <image
        href="/content/BW_2BFS/ksgroßmitachsen.png"
        height="328"
        width="328"
      />
      <polyline points={props.points} fill="none" stroke="black" strokeWidth="2" />
    </svg>
  )
}

export const exercise4928: Exercise<DATA> = {
  title: 'Steigungsfunktion erkennen',
  source: 'Ableitung',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const n = rng.randomIntBetween(2, 4)
    const a = rng.randomItemFromArray([-1, -0.75, -0.5, 0.5, 0.75, 1])
    const h = rng.randomItemFromArray([-2, -1, 0, 1, 2])
    const k = rng.randomIntBetween(-3, 3)
    const v = rng.randomItemFromArray([-2, -1, 0, 1, 2])
    const shift = rng.randomItemFromArray([-2, -1, 1, 2])
    const order = rng.shuffleArray([0, 1, 2])

    return { a, n, h, k, v, shift, order }
  },

  originalData: {
    a: 0.5,
    n: 3,
    h: 1,
    k: -2,
    v: -1,
    shift: 2,
    order: [0, 1, 2],
  },

  constraint({ data }) {
    return data.a !== 0 && data.n >= 2
  },

  task({ data }) {
    const fPts = polyline(x =>
      fValue(data.a, data.n, data.h, data.k, data.v, x),
    )

    const correct = polyline(x => dValue(data.a, data.n, data.h, data.v, x))
    const mirrored = polyline(x => -dValue(data.a, data.n, data.h, data.v, x))
    const shifted = polyline(
      x => dValue(data.a, data.n, data.h, data.v, x) + data.shift,
    )

    const graphs = [
      <SmallGraph key="correct" points={correct} />,
      <SmallGraph key="mirrored" points={mirrored} />,
      <SmallGraph key="shifted" points={shifted} />,
    ]

    const shuffled = data.order.map(i => graphs[i])

    return (
      <>
        <p>
          Gegeben ist das Schaubild einer Funktion <InlineMath math="f" />.
          Entscheiden Sie, welches Bild die passende Steigungsfunktion{' '}
          <InlineMath math="f'" /> zeigt.
        </p>

        <svg viewBox="0 0 328 328">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline points={fPts} fill="none" stroke="black" strokeWidth="2" />
        </svg>

        <p>Bild 1</p>
        {shuffled[0]}

        <p>Bild 2</p>
        {shuffled[1]}

        <p>Bild 3</p>
        {shuffled[2]}
      </>
    )
  },

  solution({ data }) {
    const correctIndex = data.order.indexOf(0) + 1

    return (
      <>
        <p>
          Die richtige Steigungsfunktion ist in <b>Bild {correctIndex}</b>{' '}
          dargestellt.
        </p>
      </>
    )
  },
}