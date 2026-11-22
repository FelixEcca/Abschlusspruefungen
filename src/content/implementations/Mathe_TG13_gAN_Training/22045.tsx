import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  n: number
  denominator: number
  variant: number
}
export const exercise22045: Exercise<DATA> = {
  title: 'Eine Binomialverteilung erkennen und ihre Parameter benennen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      n: rng.randomIntBetween(3, 8),
      denominator: rng.randomItemFromArray([2, 3, 4]),
      variant: rng.randomIntBetween(0, 3),
    }
  },
  originalData: { n: 5, denominator: 3, variant: 0 },
  task({ data }) {
    const text = [
      `Eine Kugel wird ${data.n}-mal mit Zurücklegen gezogen. Vor jedem Zug wird gemischt. Der Anteil roter Kugeln ist 1/${data.denominator}. X zählt die roten Kugeln.`,
      `Aus einer Urne mit gleich vielen roten und blauen Kugeln wird ${data.n}-mal ohne Zurücklegen gezogen. Es sind mehr als ${data.n} Kugeln vorhanden. X zählt die roten Kugeln.`,
      `Ein Glücksrad wird bis zum ersten Treffer gedreht, höchstens aber ${data.n}-mal. X zählt die Anzahl der Drehungen.`,
      `Es wird ${data.n}-mal unabhängig gedreht. Abwechselnd beträgt die Trefferwahrscheinlichkeit 1/2 und 1/3. X zählt die Treffer.`,
    ][data.variant]
    return (
      <>
        <p>{text}</p>
        <p>
          Ist X binomialverteilt? Begründen Sie. Geben Sie gegebenenfalls n und
          p an.
        </p>
      </>
    )
  },
  solution({ data }) {
    return data.variant === 0 ? (
      <>
        <p>
          Ja: Die Zahl der Versuche steht fest, sie sind unabhängig, es gibt die
          beiden Kategorien rot und nicht rot, und p bleibt gleich.
        </p>
        <p>
          <InlineMath
            math={String.raw`X\sim B(${data.n};${frac(1, data.denominator)})`}
          />
          .
        </p>
      </>
    ) : (
      <p>
        Nein.{' '}
        {
          [
            '',
            'Ohne Zurücklegen ändert sich die Trefferwahrscheinlichkeit; die Ziehungen sind nicht unabhängig.',
            'Die Zahl der Versuche ist nicht fest, und X zählt hier die Versuchszahl statt Treffer in einer festen Zahl von Versuchen.',
            'Die Trefferwahrscheinlichkeit ist nicht in allen Versuchen gleich.',
          ][data.variant]
        }
      </p>
    )
  },
}
