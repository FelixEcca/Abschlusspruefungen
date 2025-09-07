import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  outcomes: number[] // Werte
  probs: number[] // Wahrscheinlichkeiten (Brüche in Zehnteln / Zwölfteln)
}

function normalizeTo1(arr: number[]) {
  const s = arr.reduce((a, b) => a + b, 0)
  return arr.map(v => v / s)
}

export const exercise4905: Exercise<DATA> = {
  title: 'Erwartungswert berechnen',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 3,

  generator(rng) {
    const outcomes = [
      rng.randomIntBetween(-3, 3),
      rng.randomIntBetween(1, 6),
      rng.randomIntBetween(2, 8),
    ]
    let raw = [
      rng.randomIntBetween(1, 5),
      rng.randomIntBetween(1, 5),
      rng.randomIntBetween(1, 5),
    ]
    const probs = normalizeTo1(raw)
    return { outcomes, probs }
  },

  originalData: { outcomes: [-1, 2, 5], probs: [0.2, 0.3, 0.5] },

  task({ data }) {
    const { outcomes, probs } = data
    return (
      <>
        <p>
          Ein Zufallsversuch hat die Ausgänge{' '}
          {outcomes.map((v, i) => (
            <span key={i}>
              <InlineMath math={`${pp(v)}`} />
              {i < outcomes.length - 1 ? ', ' : ''}
            </span>
          ))}{' '}
          mit den zugehörigen Wahrscheinlichkeiten{' '}
          {probs.map((p, i) => (
            <span key={i}>
              <InlineMath math={`${pp(p)}`} />
              {i < probs.length - 1 ? ', ' : ''}
            </span>
          ))}
          . Bestimme den Erwartungswert <InlineMath math="E(X)" />.
        </p>
      </>
    )
  },

  solution({ data }) {
    const { outcomes, probs } = data
    const E = outcomes.reduce((s, x, i) => s + x * probs[i], 0)
    return (
      <>
        <p>
          <b>Formel → Einsetzen → Ergebnis</b>
        </p>
        <InlineMath math={`E(X)=\\sum x_i\\cdot P(x_i)`} />
        <br />
        <InlineMath
          math={`E(X)=${outcomes
            .map((x, i) => `${pp(x)}\\cdot ${pp(probs[i])}`)
            .join('+')}=${pp(E)}`}
        />
      </>
    )
  },
}
