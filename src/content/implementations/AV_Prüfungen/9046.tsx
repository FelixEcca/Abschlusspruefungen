// exercise9046.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  total: number
  a: number
  b: number
  c: number
  d: number
  e: number
}

export const exercise9046: Exercise<DATA> = {
  title: 'Teil 2: Obstsalat',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    return {
      total: rng.randomItemFromArray([2, 3, 4, 5]),
      a: rng.randomIntBetween(1, 3),
      b: rng.randomIntBetween(2, 5),
      c: 1,
      d: 1,
      e: rng.randomIntBetween(2, 4),
    }
  },

  originalData: {
    total: 3,
    a: 2,
    b: 4,
    c: 1,
    d: 1,
    e: 2,
  },

  constraint({ data }) {
    return data.a + data.b + data.c + data.d + data.e > 0
  },

  task({ data }) {
    return (
      <>
        <p>Für einen Obstsalat werden gemischt:</p>

        <p>
          Pfirsiche: {data.a} Teile
          <br />
          Kiwis: {data.b} Teile
          <br />
          Bananen: {data.c} Teil
          <br />
          Weintrauben: {data.d} Teil
          <br />
          Äpfel: {data.e} Teile
        </p>

        <p>Insgesamt werden {data.total} kg Obstsalat geplant.</p>

        <p>Berechnen Sie die Mengen der Zutaten.</p>
      </>
    )
  },

  solution({ data }) {
    const sum = data.a + data.b + data.c + data.d + data.e

    return (
      <>
        <p>Alle Teile zusammen:</p>

        <InlineMath
          math={`${data.a}+${data.b}+${data.c}+${data.d}+${data.e}=${sum}`}
        />

        <p>Berechnung der Mengen:</p>

        <InlineMath
          math={`${data.total}\\cdot\\frac{${data.a}}{${sum}}=${pp(
            (data.total * data.a) / sum,
          )}\\,kg`}
        />
        <br />

        <InlineMath
          math={`${data.total}\\cdot\\frac{${data.b}}{${sum}}=${pp(
            (data.total * data.b) / sum,
          )}\\,kg`}
        />
        <br />

        <InlineMath
          math={`${data.total}\\cdot\\frac{${data.c}}{${sum}}=${pp(
            (data.total * data.c) / sum,
          )}\\,kg`}
        />
      </>
    )
  },
}
