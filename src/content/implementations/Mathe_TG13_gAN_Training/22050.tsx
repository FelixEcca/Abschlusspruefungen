import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  denominator: number
  unit: number
  variant: number
}
export const exercise22050: Exercise<DATA> = {
  title: 'Fairen Einsatz, Auszahlung und Gewinn auseinanderhalten',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      denominator: rng.randomIntBetween(2, 6),
      unit: rng.randomIntBetween(1, 5),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { denominator: 4, unit: 2, variant: 0 },
  task({ data }) {
    return (
      <>
        <p>
          Bei einem Glücksspiel tritt der Gewinnfall mit Wahrscheinlichkeit{' '}
          <InlineMath math={frac(1, data.denominator)} /> ein. Sonst ist die
          Auszahlung 0 €.
        </p>
        <p>
          {data.variant === 0 ? (
            <>
              Im Gewinnfall werden {data.denominator * data.unit} € ausgezahlt.
              Welcher Einsatz macht das Spiel fair?
            </>
          ) : data.variant === 1 ? (
            <>
              Der Einsatz beträgt {data.unit} €. Wie hoch muss die Auszahlung im
              Gewinnfall für ein faires Spiel sein?
            </>
          ) : (
            <>
              Der Einsatz beträgt {data.unit + 1} €, die Auszahlung im
              Gewinnfall {data.denominator * data.unit} €. Berechnen Sie den
              mittleren Spielergewinn. Ist das Spiel fair?
            </>
          )}
        </p>
      </>
    )
  },
  solution({ data }) {
    return data.variant === 1 ? (
      <>
        <p>
          Fair bedeutet: mittlere Auszahlung gleich Einsatz. Für die gesuchte
          Auszahlung A gilt{' '}
          <InlineMath
            math={String.raw`\frac1{${data.denominator}}A=${data.unit}\Rightarrow A=${data.denominator * data.unit}`}
          />{' '}
          Euro.
        </p>
      </>
    ) : (
      <>
        <p>
          Die mittlere Auszahlung ist{' '}
          <InlineMath
            math={String.raw`E(A)=\frac1{${data.denominator}}\cdot${data.denominator * data.unit}=${data.unit}`}
          />{' '}
          Euro.
        </p>
        <p>
          {data.variant === 0 ? (
            <>
              Der faire Einsatz beträgt deshalb {data.unit} €. Dann ist der
              mittlere Spielergewinn null.
            </>
          ) : (
            <>
              Der mittlere Spielergewinn beträgt{' '}
              <InlineMath
                math={String.raw`E(G)=${data.unit}-${data.unit + 1}=-1`}
              />{' '}
              Euro. Das Spiel ist für den Spieler nicht fair; der Veranstalter
              gewinnt im Mittel 1 € pro Spiel.
            </>
          )}
        </p>
      </>
    )
  },
}
