// exercise9033.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  c: number
  m: number
  d: number
  e: number
  f: number
  g: number
  h: number
  i: number
  result: number
}

export const exercise9033: Exercise<DATA> = {
  title: 'Teil 1: Punkt vor Strich',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const c = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const firstBracket = rng.randomItemFromArray([20, 24, 30, 36, 40, 48, 60])
    const b = rng.randomIntBetween(10, 50)
    const a = b + firstBracket

    const e = rng.randomIntBetween(8, 35)
    const f = rng.randomItemFromArray([2, 3, 4])
    const multiplication = e * f

    const secondBracket = rng.randomItemFromArray([6, 10, 12, 15, 18, 20])
    const d = multiplication + secondBracket

    const m = rng.randomItemFromArray([3, 4, 5, 6, 7, 8])
    const g = rng.randomItemFromArray([2, 3, 4, 5])
    const h = rng.randomItemFromArray([2, 3, 4, 5, 6, 7])
    const i = rng.randomItemFromArray([2, 3, 4, 5, 6])

    const result = (a - b) / c - m - (d - e * f) + g + i * h

    return { a, b, c, m, d, e, f, g, h, i, result }
  },

  originalData: {
    a: 70,
    b: 30,
    c: 4,
    m: 5,
    d: 80,
    e: 35,
    f: 2,
    g: 4,
    h: 2,
    i: 3,
    result: 5,
  },

  constraint({ data }) {
    return Number.isInteger(data.result)
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>

        <InlineMath
          math={`(${data.a}-${data.b}):${data.c}-${data.m}-(${data.d}-${data.e}\\cdot${data.f})+${data.g}+${data.i}\\cdot${data.h}`}
        />
      </>
    )
  },

  solution({ data }) {
    const firstBracket = data.a - data.b
    const firstDivision = firstBracket / data.c
    const multiplication = data.e * data.f
    const secondBracket = data.d - multiplication
    const lastMultiplication = data.i * data.h
    const combinedConstant = -data.m + data.g + lastMultiplication

    return (
      <>
        <p>Die Rechnung wird schrittweise vereinfacht.</p>
        <p>
          Achte darauf, die Klammern zuerst zu berechnen und es gilt
          Punkt-vor-Strich.
        </p>

        <InlineMath
          math={`(${data.a}-${data.b}):${data.c}-${data.m}-(${data.d}-${data.e}\\cdot${data.f})+${data.g}+${data.i}\\cdot${data.h}`}
        />
        <br />
        <InlineMath
          math={`=(${firstBracket}):${data.c}-${data.m}-(${data.d}-${multiplication})+${data.g}+${lastMultiplication}`}
        />
        <br />
        <InlineMath
          math={`=${firstDivision}-${data.m}-${secondBracket}+${data.g}+${lastMultiplication}`}
        />

        <br />
        <InlineMath math={`=${data.result}`} />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zu Klammern:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/pDiC2fr-EhM"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
        <p>Hier gibt es noch ein Erklärungsvideo zu Punkt-vor-Strich:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/zEvWRs6BWos"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
