// exercise3059.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  h: number
  k: number
  stretch: number
  shiftDown: number
  x1: number
  x2: number
  xs: number
}

export const exercise3059: Exercise<DATA> = {
  title: 'Parabeln',
  source: 'Prüfung 2022 / Aufgabe 3B',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const h = rng.randomItemFromArray([-3, -2, -1, 0, 1, 2])
    const k = rng.randomItemFromArray([1, 2, 3, 4])
    const stretch = rng.randomItemFromArray([2, 3, 4])
    const shiftDown = rng.randomItemFromArray([4, 5, 6, 7])
    const x1 = rng.randomItemFromArray([-4, -3, -2])
    const x2 = rng.randomItemFromArray([0, 1, 2])
    const xs = (x1 + x2) / 2

    return { h, k, stretch, shiftDown, x1, x2, xs }
  },

  originalData: {
    h: 1,
    k: 1,
    stretch: 3,
    shiftDown: 6,
    x1: -2,
    x2: 0,
    xs: -1,
  },

  constraint({ data }) {
    return data.x1 < data.x2
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 4,
      intro({ data }) {
        return (
          <>
            <p>
              Die Parabel p1 hat die Gleichung<br></br>{' '}
              <InlineMath
                math={`y = (x ${data.h < 0 ? '+' : '-'} ${pp(Math.abs(data.h))})^2 + ${pp(data.k)}`}
              />
              .
            </p>
          </>
        )
      },
      task() {
        return (
          <>
            <p>
              - Geben Sie die Koordinaten des Scheitelpunktes an.
              <br />- Zeichnen Sie die Parabel p1 im Bereich von x = −2 bis x =
              4.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`y = (x ${data.h < 0 ? '+' : '-'} ${pp(
                Math.abs(data.h),
              )})^2 + ${pp(data.k)}`}
            />
            <br />
            <p>Die Gleichung liegt in Scheitelform vor.</p>
            <InlineMath math={`S(${pp(data.h)}\\mid ${pp(data.k)})`} />
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return (
          <>
            <p>
              Die Parabel p2 entsteht aus der Normalparabel durch Streckung mit
              dem Faktor 3 und Verschiebung um 6 Längeneinheiten nach unten.
            </p>
          </>
        )
      },
      task() {
        return (
          <>
            <p>Geben Sie eine Gleichung von p2 an.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`y = ${pp(data.stretch)}x^2 - ${pp(data.shiftDown)}`}
            />
          </>
        )
      },
    },
    {
      points: 2,
      intro({ data }) {
        return (
          <>
            <p>
              Eine Parabel p3 schneidet die x-Achse bei{' '}
              <InlineMath math={`x_1 = ${pp(data.x1)}`} /> und{' '}
              <InlineMath math={`x_2 = ${pp(data.x2)}`} />.
            </p>
          </>
        )
      },
      task() {
        return (
          <>
            <p>
              Erläutern Sie, dass der Scheitelpunkt der Parabel die x-Koordinate
              xS = −1 haben muss.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die x-Koordinate des Scheitelpunktes liegt genau in der Mitte der
              beiden Nullstellen.
            </p>
            <InlineMath
              math={`x_S = \\frac{x_1 + x_2}{2} = \\frac{${pp(data.x1)} + ${pp(
                data.x2,
              )}}{2} = ${pp(data.xs)}`}
            />
          </>
        )
      },
    },
  ],
}
