// exercise9036.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'farbe' | 'saft' | 'futtermischung' | 'beton'

interface DATA {
  kontext: Kontext
  a: number
  b: number
  c: number
  total: number
  ra: number
  rb: number
  rc: number
}

export const exercise9036: Exercise<DATA> = {
  title: 'Teil 1: Anteile berechnen',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'farbe',
      'saft',
      'futtermischung',
      'beton',
    ])

    const a = rng.randomIntBetween(1, 4)
    const b = rng.randomIntBetween(2, 5)
    const c = rng.randomIntBetween(3, 6)

    const total = rng.randomItemFromArray([8, 12, 16, 20])

    const sum = a + b + c

    const ra = (total * a) / sum
    const rb = (total * b) / sum
    const rc = (total * c) / sum

    return { kontext, a, b, c, total, ra, rb, rc }
  },

  originalData: {
    kontext: 'farbe',
    a: 1,
    b: 3,
    c: 4,
    total: 16,
    ra: 2,
    rb: 6,
    rc: 8,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Eine Mischung besteht aus:
          <br />
          {data.a} Teil Weiß
          <br />
          {data.b} Teile Blau
          <br />
          {data.c} Teile Gelb
        </p>

        <p>Insgesamt werden {data.total} Liter benötigt.</p>

        <p>Berechnen Sie die einzelnen Mengen.</p>
      </>
    )
  },

  solution({ data }) {
    const sum = data.a + data.b + data.c

    return (
      <>
        <p>Alle Teile zusammen:</p>

        <InlineMath math={`${data.a}+${data.b}+${data.c}=${sum}`} />

        <p>Berechnung der einzelnen Anteile:</p>

        <InlineMath
          math={`${data.total}\\cdot\\frac{${data.a}}{${sum}}=${pp(data.ra)}`}
        />
        <br />

        <InlineMath
          math={`${data.total}\\cdot\\frac{${data.b}}{${sum}}=${pp(data.rb)}`}
        />
        <br />

        <InlineMath
          math={`${data.total}\\cdot\\frac{${data.c}}{${sum}}=${pp(data.rc)}`}
        />
      </>
    )
  },
}
