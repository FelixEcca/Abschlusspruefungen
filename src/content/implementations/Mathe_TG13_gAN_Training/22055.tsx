import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  red: number
  blue: number
  variant: number
}
export const exercise22055: Exercise<DATA> = {
  title: 'Typische Wahrscheinlichkeitsfehler prüfen und korrigieren',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    const red = rng.randomIntBetween(1, 4)
    return {
      red,
      blue: red + rng.randomIntBetween(1, 3),
      variant: rng.randomIntBetween(0, 3),
    }
  },
  originalData: { red: 2, blue: 3, variant: 0 },
  task({ data }) {
    const n = data.red + data.blue
    return (
      <>
        <p>Finden und korrigieren Sie den Fehler.</p>
        {data.variant === 0 ? (
          <p>
            Bei zwei Ziehungen mit Zurücklegen aus {data.red} roten und{' '}
            {data.blue} blauen Kugeln rechnet jemand für zweimal rot:{' '}
            <InlineMath
              math={String.raw`P(RR)=\frac{${data.red}}{${n}}+\frac{${data.red}}{${n}}`}
            />
            .
          </p>
        ) : data.variant === 1 ? (
          <p>
            Bei zwei Ziehungen ohne Zurücklegen aus {data.red} roten und{' '}
            {data.blue} blauen Kugeln wird gerechnet:{' '}
            <InlineMath
              math={String.raw`P(RR)=\frac{${data.red}}{${n}}\cdot\frac{${data.red}}{${n}}`}
            />
            .
          </p>
        ) : data.variant === 2 ? (
          <p>
            Bei zwei Ziehungen mit Zurücklegen aus {data.red} roten und{' '}
            {data.blue} blauen Kugeln wird für „mindestens einmal rot“
            gerechnet:{' '}
            <InlineMath
              math={String.raw`P=1-\left(\frac{${data.red}}{${n}}\right)^2`}
            />
            .
          </p>
        ) : (
          <p>
            Beim fairen Würfel wird behauptet:{' '}
            <InlineMath
              math={String.raw`P(\text{gerade oder größer als 3})=\frac36+\frac36=1`}
            />
            .
          </p>
        )}
      </>
    )
  },
  solution({ data }) {
    const n = data.red + data.blue
    return (
      <>
        <p>
          {
            [
              'Entlang eines Pfads werden Wahrscheinlichkeiten multipliziert, nicht addiert.',
              'Nach der ersten roten Kugel sind sowohl die rote Anzahl als auch die Gesamtanzahl um 1 kleiner.',
              'Das Gegenereignis ist kein einziges Mal rot, also zweimal blau.',
              'Die Ergebnisse 4 und 6 gehören zu beiden Ereignissen und wurden doppelt gezählt.',
            ][data.variant]
          }
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`P(RR)=${frac(data.red ** 2, n ** 2)}`
                : data.variant === 1
                  ? String.raw`P(RR)=\frac{${data.red}}{${n}}\cdot\frac{${data.red - 1}}{${n - 1}}=${frac(data.red * (data.red - 1), n * (n - 1))}`
                  : data.variant === 2
                    ? String.raw`P=1-\left(\frac{${data.blue}}{${n}}\right)^2=${frac(n ** 2 - data.blue ** 2, n ** 2)}`
                    : String.raw`P=\frac{3+3-2}6=\frac23`
            }
          />
        </p>
      </>
    )
  },
}
