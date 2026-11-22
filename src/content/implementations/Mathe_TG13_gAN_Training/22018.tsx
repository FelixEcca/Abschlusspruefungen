import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  power: number
  variant: number
}

export const exercise22018: Exercise<DATA> = {
  title: 'Die Produktregel an übersichtlichen Produkten anwenden',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 4),
      power: rng.randomIntBetween(1, 3),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { a: 2, power: 1, variant: 1 },
  task({ data }) {
    return (
      <>
        <p>Bestimmen Sie die erste Ableitung mit der Produktregel.</p>
        <p>
          <InlineMath
            math={String.raw`f(x)=${data.a}x^{${data.power}}${['e^x', '\\sin x', '\\cos x'][data.variant]}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const v = ['e^x', '\\sin x', '\\cos x'][data.variant],
      derivative = ['e^x', '\\cos x', '-\\sin x'][data.variant]
    return (
      <>
        <p>
          Ein Produkt wird nicht durch bloßes Multiplizieren der Ableitungen
          abgeleitet. Es gilt <InlineMath math={String.raw`(uv)'=u'v+uv'`} />.
        </p>
        <p>
          <InlineMath
            math={String.raw`f'(x)=${data.a * data.power}x^{${data.power - 1}}(${v})+${data.a}x^{${data.power}}(${derivative})`}
          />
        </p>
      </>
    )
  },
}
