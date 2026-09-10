import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  term: string
  wrong: string
  correct: string
  error: string
  firstStep: string
}

export const exercise10020: Exercise<DATA> = {
  title: 'Fehler in einer Termumformung finden und korrigieren',
  source: '3BKGD1',
  useCalculator: false,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      {
        term: '3(x+4)-2x',
        wrong: '3x+4-2x=x+4',
        correct: 'x+12',
        error: 'Die 4 in der Klammer wurde nicht mit 3 multipliziert.',
        firstStep: '3x+12-2x',
      },
      {
        term: '5a-2(3a-4)',
        wrong: '5a-6a-8=-a-8',
        correct: '-a+8',
        error: 'Beim Auflösen der Klammer wurde das Vorzeichen vor der 4 falsch übernommen.',
        firstStep: '5a-6a+8',
      },
      {
        term: '4(2y-3)+5y',
        wrong: '8y-3+5y=13y-3',
        correct: '13y-12',
        error: 'Die -3 in der Klammer wurde nicht mit 4 multipliziert.',
        firstStep: '8y-12+5y',
      },
    ])
  },
  originalData: {
    term: '3(x+4)-2x',
    wrong: '3x+4-2x=x+4',
    correct: 'x+12',
    error: 'Die 4 in der Klammer wurde nicht mit 3 multipliziert.',
    firstStep: '3x+12-2x',
  },
  task({ data }) {
    return (
      <>
        <p>
          Eine Schülerin formt den Term <InlineMath math={data.term} /> um.
        </p>
        <p>
          Ihre Lösung lautet: <InlineMath math={data.wrong} />
        </p>
        <p>
          Finden Sie den Fehler und geben Sie die korrekte Vereinfachung an.
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Der Fehler liegt beim Auflösen der Klammer.</p>
        <p>
          <b>Fehler:</b> {data.error}
        </p>
        <p>
          Richtig aufgelöst:{' '}
          <InlineMath math={`${data.term}=${data.firstStep}`} />
        </p>
        <p>
          Zusammenfassen:{' '}
          <InlineMath math={`${data.firstStep}=${data.correct}`} />
        </p>
        <p>
          Die korrekte Vereinfachung lautet <InlineMath math={data.correct} />.
        </p>
      </>
    )
  },
}
