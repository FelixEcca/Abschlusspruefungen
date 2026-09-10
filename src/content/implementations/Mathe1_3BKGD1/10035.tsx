import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  m: number
  b: number
  x: number
  y: number
  fits: boolean
}

export const exercise10035: Exercise<DATA> = {
  title: 'Punktprobe bei einer linearen Funktion durchführen',
  source: '3BKGD1',
  useCalculator: false,
  duration: 8,
  points: 8,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { m: 2, b: -1, x: 4, y: 7, fits: true },
      { m: -3, b: 5, x: 2, y: -2, fits: false },
      { m: 4, b: 1, x: -1, y: -3, fits: true },
      { m: -2, b: -4, x: 3, y: -9, fits: false },
    ])
  },
  originalData: { m: 2, b: -1, x: 4, y: 7, fits: true },
  task({ data }) {
    return (
      <p>
        Prüfen Sie, ob der Punkt <InlineMath math={`P(${data.x}|${data.y})`} />{' '}
        auf dem Graphen der Funktion{' '}
        <InlineMath math={`f(x)=${data.m}x${data.b >= 0 ? '+' : ''}${data.b}`} /> liegt.
      </p>
    )
  },
  solution({ data }) {
    const calculated = data.m * data.x + data.b
    return (
      <>
        <p>Für die Punktprobe setze ich den x-Wert des Punktes in die Funktion ein.</p>
        <p>
          <InlineMath
            math={`f(${data.x})=${data.m}\\cdot${data.x}${data.b >= 0 ? '+' : ''}${data.b}=${calculated}`}
          />
        </p>
        <p>
          Der Punkt hat den y-Wert <InlineMath math={`${data.y}`} />.
        </p>
        {calculated === data.y ? (
          <p>
            Da <InlineMath math={`${calculated}=${data.y}`} /> gilt, liegt der
            Punkt auf dem Graphen.
          </p>
        ) : (
          <p>
            Da <InlineMath math={`${calculated}\\ne${data.y}`} /> gilt, liegt
            der Punkt nicht auf dem Graphen.
          </p>
        )}
      </>
    )
  },
}
