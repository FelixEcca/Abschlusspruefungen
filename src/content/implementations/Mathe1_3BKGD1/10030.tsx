import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  percent: number
  base: number
  context: string
}

export const exercise10030: Exercise<DATA> = {
  title: 'Prozentrechenregel anwenden',
  source: '3BKGD1',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { percent: 15, base: 80, context: 'Rabatt auf Materialkosten' },
      { percent: 35, base: 240, context: 'Anteil einer Druckauflage' },
      { percent: 7, base: 650, context: 'Verschnitt beim Plotten' },
      { percent: 22, base: 150, context: 'Farbdeckung auf einer Fläche' },
    ])
  },
  originalData: { percent: 15, base: 80, context: 'Rabatt auf Materialkosten' },
  task({ data }) {
    return (
      <p>
        Berechnen Sie den Prozentwert: {data.context}. Gesucht sind{' '}
        <b>{data.percent} %</b> von <b>{data.base}</b>.
      </p>
    )
  },
  solution({ data }) {
    const result = (data.percent * data.base) / 100
    return (
      <>
        <p>
          Die Prozentrechenregel lautet:{' '}
          <InlineMath math="W=\frac{p}{100}\cdot G" />.
        </p>
        <p>
          Dabei ist <InlineMath math={`p=${data.percent}`} /> und{' '}
          <InlineMath math={`G=${data.base}`} />.
        </p>
        <p>
          Einsetzen:{' '}
          <InlineMath
            math={`W=\\frac{${data.percent}}{100}\\cdot${data.base}`}
          />
        </p>
        <p>
          Rechnen:{' '}
          <InlineMath math={`W=${pp(result)}`} />
        </p>
        <p>
          Der Prozentwert beträgt <b>{pp(result)}</b>.
        </p>
      </>
    )
  },
}
