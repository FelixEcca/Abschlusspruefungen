import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  limit: number
  denominator: number
}
export const exercise22049: Exercise<DATA> = {
  title: 'Den Erwartungswert bei einer Abbruchregel berechnen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      limit: rng.randomIntBetween(2, 4),
      denominator: rng.randomItemFromArray([2, 3]),
    }
  },
  originalData: { limit: 3, denominator: 2 },
  task({ data }) {
    return (
      <>
        <p>
          Ein unabhängiger Versuch hat die Trefferwahrscheinlichkeit{' '}
          <InlineMath math={frac(1, data.denominator)} />. Beim ersten Treffer
          wird gestoppt, spätestens nach {data.limit} Versuchen. X zählt die
          Zahl der durchgeführten Versuche.
        </p>
        <p>
          Erstellen Sie die Verteilung von X und berechnen Sie, wie viele
          Versuche im Mittel durchgeführt werden.
        </p>
      </>
    )
  },
  solution({ data }) {
    const denominator = data.denominator ** (data.limit - 1),
      numerators = Array.from({ length: data.limit }, (_, i) =>
        i === data.limit - 1
          ? (data.denominator - 1) ** i
          : (data.denominator - 1) ** i *
            data.denominator ** (data.limit - i - 2),
      ),
      expected = numerators.reduce((s, n, i) => s + n * (i + 1), 0)
    return (
      <>
        <p>
          Für k vor der letzten Stufe muss der erste Treffer genau im k-ten
          Versuch eintreten. Die letzte Stufe wird bereits nach lauter
          vorherigen Nieten erreicht, unabhängig vom letzten Ergebnis.
        </p>
        <p>
          {numerators.map((n, i) => (
            <span key={i}>
              <InlineMath
                math={String.raw`P(X=${i + 1})=${frac(n, denominator)}`}
              />
              {i < data.limit - 1 ? '; ' : '.'}
            </span>
          ))}
        </p>
        <p>
          <InlineMath
            math={String.raw`E(X)=${numerators.map((n, i) => String.raw`${i + 1}\cdot${frac(n, denominator)}`).join('+')}=${frac(expected, denominator)}`}
          />
          .
        </p>
        <p>
          Der Erwartungswert muss keine ganze Zahl sein. Er beschreibt einen
          langfristigen Mittelwert, nicht ein mögliches einzelnes Spielergebnis.
        </p>
      </>
    )
  },
}
