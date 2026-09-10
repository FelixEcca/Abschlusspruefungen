import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  taskText: string
  wrong: string
  error: string
  correct: string
}

export const exercise10059: Exercise<DATA> = {
  title: 'Fehlerhafte Schülerlösung prüfen und verbessern',
  source: '3BKGD1',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      {
        taskText: 'Löse die Gleichung 3(x-2)=12.',
        wrong: '3x-2=12\\Rightarrow 3x=14\\Rightarrow x=\\frac{14}{3}',
        error: 'Beim Auflösen der Klammer wurde -2 nicht mit 3 multipliziert.',
        correct: '3x-6=12\\Rightarrow 3x=18\\Rightarrow x=6',
      },
      {
        taskText: 'Berechne 20 % von 150.',
        wrong: '20\\cdot150=3000',
        error: '20 % bedeutet 20 von 100. Es muss durch 100 geteilt werden.',
        correct: '\\frac{20}{100}\\cdot150=30',
      },
      {
        taskText: 'Berechne die Nullstelle von f(x)=2x-10.',
        wrong: '2x-10=0\\Rightarrow 2x=-10\\Rightarrow x=-5',
        error: 'Beim Umstellen muss 10 addiert werden, nicht -10 entstehen.',
        correct: '2x=10\\Rightarrow x=5',
      },
    ])
  },
  originalData: {
    taskText: 'Löse die Gleichung 3(x-2)=12.',
    wrong: '3x-2=12\\Rightarrow 3x=14\\Rightarrow x=\\frac{14}{3}',
    error: 'Beim Auflösen der Klammer wurde -2 nicht mit 3 multipliziert.',
    correct: '3x-6=12\\Rightarrow 3x=18\\Rightarrow x=6',
  },
  task({ data }) {
    return (
      <>
        <p>{data.taskText}</p>
        <p>
          Eine Schülerlösung lautet:{' '}
          <InlineMath math={data.wrong} />
        </p>
        <p>Prüfen Sie die Lösung, beschreiben Sie den Fehler und verbessern Sie sie.</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Die Schülerlösung ist nicht korrekt.</p>
        <p>
          <b>Fehler:</b> {data.error}
        </p>
        <p>
          Korrektur:{' '}
          <InlineMath math={data.correct} />
        </p>
      </>
    )
  },
}
