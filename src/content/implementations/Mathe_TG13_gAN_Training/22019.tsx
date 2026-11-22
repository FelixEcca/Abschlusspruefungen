import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  k: number
  variant: number
}

export const exercise22019: Exercise<DATA> = {
  title: 'Typische Ableitungsfehler erkennen und korrigieren',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(2, 5),
      k: rng.randomIntBetween(2, 4),
      variant: rng.randomIntBetween(0, 3),
    }
  },
  originalData: { a: 3, k: 2, variant: 0 },
  task({ data }) {
    const given = [
      String.raw`f(x)=${data.a}x^2+${data.k},\quad f'(x)=${2 * data.a}x+${data.k}`,
      String.raw`f(x)=e^{${data.k}x},\quad f'(x)=e^{${data.k}x}`,
      String.raw`f(x)=${data.a}\cos x,\quad f'(x)=${data.a}\sin x`,
      String.raw`f(x)=xe^x,\quad f'(x)=e^x`,
    ][data.variant]
    return (
      <>
        <p>
          Die angegebene Ableitung ist falsch. Benennen Sie den Fehler und
          korrigieren Sie die Rechnung.
        </p>
        <p>
          <InlineMath math={given} />
        </p>
      </>
    )
  },
  solution({ data }) {
    const correct = [
      String.raw`f'(x)=${2 * data.a}x`,
      String.raw`f'(x)=${data.k}e^{${data.k}x}`,
      String.raw`f'(x)=-${data.a}\sin x`,
      String.raw`f'(x)=e^x+xe^x`,
    ][data.variant]
    return (
      <>
        <p>
          {
            [
              'Die Ableitung einer addierten Konstanten ist null.',
              'Bei der Kettenregel fehlt die innere Ableitung.',
              'Die Ableitung von cos ist −sin; das Minuszeichen fehlt.',
              'Die Produktregel hat zwei Summanden. Der zweite wurde weggelassen.',
            ][data.variant]
          }
        </p>
        <p>
          <InlineMath math={correct} />
        </p>
      </>
    )
  },
}
