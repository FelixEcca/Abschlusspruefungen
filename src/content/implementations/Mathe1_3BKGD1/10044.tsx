import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  c: number
  x: number
  y: number
}

export const exercise10044: Exercise<DATA> = {
  title: 'Punktprobe bei einer quadratischen Funktion durchführen',
  source: '3BKGD1',
  useCalculator: false,
  duration: 8,
  points: 8,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { a: 1, c: -4, x: 3, y: 5 },
      { a: -1, c: 6, x: 2, y: 1 },
      { a: 2, c: -3, x: -2, y: 5 },
      { a: -2, c: 8, x: -1, y: 7 },
    ])
  },
  originalData: { a: 1, c: -4, x: 3, y: 5 },
  task({ data }) {
    return (
      <p>
        Prüfen Sie, ob der Punkt <InlineMath math={`P(${data.x}|${data.y})`} />{' '}
        auf der Parabel <InlineMath math={`f(x)=${data.a}x^2${data.c >= 0 ? '+' : ''}${data.c}`} /> liegt.
      </p>
    )
  },
  solution({ data }) {
    const calculated = data.a * data.x ** 2 + data.c
    return (
      <>
        <p>Ich setze den x-Wert des Punktes in die Funktionsgleichung ein.</p>
        <p>
          <InlineMath
            math={`f(${data.x})=${data.a}\\cdot(${data.x})^2${data.c >= 0 ? '+' : ''}${data.c}=${calculated}`}
          />
        </p>
        <p>
          Der Punkt hat den y-Wert <InlineMath math={`${data.y}`} />.
        </p>
        {calculated === data.y ? (
          <p>Der Punkt liegt auf der Parabel.</p>
        ) : (
          <p>Der Punkt liegt nicht auf der Parabel.</p>
        )}
      </>
    )
  },
}
