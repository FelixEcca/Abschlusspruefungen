import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { ReflectionSketch } from './diagrams'
import { coord } from './math'

interface DATA {
  x: number
  y: number
  z: number
}

export const exercise21204: Exercise<DATA> = {
  title: 'Lineare Algebra: Spiegelung an einer Koordinatenebene',
  source: '2024 Teil A Aufgabe 4 – Auswahl II',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    x: -rng.randomIntBetween(1, 4),
    y: rng.randomIntBetween(-3, 4),
    z: rng.randomIntBetween(1, 5),
  }),
  originalData: { x: -1, y: 2, z: 4 },
  intro: ({ data }) => (
    <p>
      Der Punkt <InlineMath math={`A(${coord([data.x, data.y, data.z])})`} />{' '}
      wird an der <InlineMath math="x_2x_3" />
      -Ebene gespiegelt. Der gespiegelte Punkt wird mit A′ bezeichnet.
    </p>
  ),
  tasks: [
    {
      points: 2,
      task: () => (
        <p>
          Zeichnen Sie A und A′ in ein geeignetes räumliches Koordinatensystem
          ein.
        </p>
      ),
      solution: ({ data }) => (
        <>
          <p>
            Bei dieser Spiegelung ändert nur die erste Koordinate ihr
            Vorzeichen:{' '}
            <InlineMath math={`A'(${coord([-data.x, data.y, data.z])})`} />.
          </p>
          <ReflectionSketch {...data} />
        </>
      ),
    },
    {
      points: 3,
      task: () => (
        <p>
          P ist ein beliebiger Punkt auf der <InlineMath math="x_2" />
          -Achse. Begründen Sie, dass P genauso weit von A wie von A′ entfernt
          ist.
        </p>
      ),
      solution: ({ data }) => (
        <>
          <p>
            Jeder solche Punkt hat die Form{' '}
            <InlineMath
              math={String.raw`P(0\mid t\mid0),\quad t\in\mathbb R`}
            />
            . Mit der Abstandsformel gilt:
          </p>
          <p>
            <InlineMath
              math={String.raw`|PA|^2=(${data.x})^2+(${data.y}-t)^2+(${data.z})^2=(${-data.x})^2+(${data.y}-t)^2+(${data.z})^2=|PA'|^2`}
            />
            .
          </p>
          <p>
            Die erste Koordinate wird quadriert; ihr Vorzeichen spielt deshalb
            keine Rolle. Somit stimmen auch die Abstände überein. Geometrisch
            liegt P in der Spiegelungsebene.
          </p>
        </>
      ),
    },
  ],
}
