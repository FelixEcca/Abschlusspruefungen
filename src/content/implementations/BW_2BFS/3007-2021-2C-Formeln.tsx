import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'

interface DATA {
  order: Array<number>
  item1: number
  item2: number
  item0: number
}
const prompts = [
  'Stellen Sie die Formel für den Oberflächeninhalt einer Kugel nach dem Radius um.',
  'Stellen Sie die Formel für die Fläche eines Kreises nach dem Radius um.',
  'Stellen Sie die Formel für das Volumen einer Kugel nach dem Radius um.',
]
const richtig = [
  'Wird der Radius einer Kugel verdreifacht, verneunfacht sich ihr Oberflächeninhalt.',
  'Wird der Radius einer Kugel verdoppelt, vervierfacht sich ihr Oberflächeninhalt.',
  'Wird der Radius einer Kugel verdoppelt, verachtfacht sich ihr Volumen.',
]
const richtig2 = [
  'Richtig. Setzt man den dreifachen Radius in O = 4 · π · r² ein, erhält man den Faktor (3r)² = 9r². Also das Neunfache.',
  'Richtig. Setzt man den doppelten Radius in A = π · r² ein, erhält man den Faktor (2r)² = 4r². Also das Vierfache.',
  'Richtig. Setzt man den doppelten Radius in V = 4/3 · π · r³ ein, erhält man den Faktor (2r)³ = 8r³. Also das Achtfache.',
]
const falsch = [
  'Wird der Radius einer Kugel verdoppelt, vervierfacht sich ihr Volumen.',
  'Wird der Radius einer Kugel verdoppelt, verdoppelt sich ihr Volumen.',
  'Wird der Radius einer Kugel verdoppelt, verdoppelt sich ihr Oberflächeninhalt.',
]
const falsch2 = [
  'Falsch. Setzt man den doppelten Radius in V = 4/3 · π · r³ ein, erhält man den Faktor (2r)³ = 8r³. Also das Achtfache.',
  'Falsch. Setzt man den doppelten Radius in V = 4/3 · π · r³ ein, erhält man den Faktor (2r)³ = 8r³. Also das Achtfache.',
  'Falsch. Setzt man den doppelten Radius in O = 4 · π · r² ein, erhält man den Faktor (2r)² = 4r². Also das Vierfache.',
]

export const exercise3007: Exercise<DATA> = {
  title: 'Formeln',
  source: '2021 Wahlteil Aufgabe 2C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      order: rng.shuffleArray([0, 1]),
      item1: rng.randomIntBetween(0, 2),
      item2: rng.randomIntBetween(0, 2),
      item0: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { order: [0, 1], item1: 0, item2: 0, item0: 0 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>{prompts[data.item0]}</p>
          </>
        )
      },
      solution({ data }) {
        const prompts = [
          'Stellen Sie die Formel für den Oberflächeninhalt einer Kugel nach dem Radius um.',
          'Stellen Sie die Formel für die Fläche eines Kreises nach dem Radius um.',
          'Stellen Sie die Formel für das Volumen einer Kugel nach dem Radius um.',
        ]
        return (
          <>
            {data.item0 == 0 && (
              <>
                <p>
                  Die Formel für den Oberflächeninhalt eines Kreises lautet:
                </p>
                <p>O = 4 · π · r²</p>
                <p>Umgestellt nach r:</p>
                <p>r = {buildSqrt(<>{buildInlineFrac('O', <>4 · π</>)}</>)}</p>
              </>
            )}
            {data.item0 == 1 && (
              <>
                <p>Die Formel für die Fläche eines Kreises lautet:</p>
                <p>A = π · r²</p>
                <p>Umgestellt nach r:</p>
                <p>r = {buildSqrt(<>{buildInlineFrac('A', <>π</>)}</>)}</p>
              </>
            )}
            {data.item0 == 2 && (
              <>
                <p> Die Formel für das Volumen einer Kugel lautet:</p>
                <p>V = {buildInlineFrac(4, 3)} · π · r³</p>
                <p>Umgestellt nach r:</p>
                <p>
                  r ={' '}
                  {buildSqrt(<>{buildInlineFrac('3 · V', <>4 · π</>)}</>, 3)},
                </p>
              </>
            )}
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const listItems = [
          <li key="1">{richtig[data.item1]}</li>,
          <li key="2">{falsch[data.item1]}</li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <ol>{shuffledItems}</ol>
          </>
        )
      },
      solution({ data }) {
        const listItems = [
          <li key="1">{richtig2[data.item1]}</li>,
          <li key="2">{falsch2[data.item1]}</li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <ol>{shuffledItems}</ol>
          </>
        )
      },
    },
  ],
}
