import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { Vec, add, sub, mul, vec, coord, dot } from './math'

interface DATA {
  b: Vec
  direction: Vec
  normal: Vec
}

export const exercise21304: Exercise<DATA> = {
  title: 'Lineare Algebra: Punkt-Geraden-Abstand und weiterer Punkt',
  source: '2025 Teil A Aufgabe 4 – Auswahl II',
  useCalculator: false,
  duration: 12,
  generator(rng) {
    const rotation = rng.randomIntBetween(0, 2),
      rotate = (v: Vec): Vec => [
        v[rotation],
        v[(rotation + 1) % 3],
        v[(rotation + 2) % 3],
      ]
    return {
      b: [
        rng.randomIntBetween(-4, 4),
        rng.randomIntBetween(-4, 4),
        rng.randomIntBetween(-4, 4),
      ],
      direction: rotate([-2, 4, 3]),
      normal: mul(rotate([1, 2, -2]), rng.randomIntBetween(1, 3)),
    }
  },
  originalData: { b: [3, 0, -1], direction: [-2, 4, 3], normal: [1, 2, -2] },
  intro: ({ data: d }) => (
    <p>
      Gegeben sind die Punkte{' '}
      <InlineMath
        math={String.raw`A(${coord(add(d.b, d.normal))}),\quad B(${coord(d.b)})`}
      />{' '}
      und die Gerade{' '}
      <InlineMath
        math={String.raw`g:\ \vec x=${vec(d.b)}+r${vec(d.direction)},\quad r\in\mathbb R`}
      />
      .
    </p>
  ),
  tasks: [
    {
      points: 3,
      task: () => (
        <p>
          Zeigen Sie, dass der Abstand vom Punkt A zur Geraden g der Länge des
          Vektors <InlineMath math={String.raw`\overrightarrow{AB}`} />{' '}
          entspricht.
        </p>
      ),
      solution: ({ data: d }) => (
        <>
          <p>
            B liegt als Stützpunkt auf g. Der Vektor{' '}
            <InlineMath
              math={String.raw`\overrightarrow{AB}=${vec(mul(d.normal, -1))}`}
            />{' '}
            steht senkrecht auf dem Richtungsvektor, denn
          </p>
          <p>
            <InlineMath
              math={String.raw`\overrightarrow{AB}\cdot\vec u=${vec(mul(d.normal, -1))}\cdot${vec(d.direction)}=0`}
            />
            .
          </p>
          <p>
            Somit ist B der Lotfußpunkt. Daher gilt{' '}
            <InlineMath
              math={String.raw`d(A,g)=|\overrightarrow{AB}|=\sqrt{${dot(d.normal, d.normal)}}=${Math.sqrt(dot(d.normal, d.normal))}`}
            />
            .
          </p>
        </>
      ),
    },
    {
      points: 2,
      task: () => (
        <p>
          Ermitteln Sie die Koordinaten eines weiteren Punkts C, der den
          gleichen Abstand zur Geraden g hat wie A.
        </p>
      ),
      solution: ({ data: d }) => (
        <>
          <p>Eine Möglichkeit ist die Spiegelung von A am Lotfußpunkt B:</p>
          <p>
            <InlineMath
              math={String.raw`C=2B-A=B-\overrightarrow{BA}=${vec(sub(d.b, d.normal))}`}
            />
            .
          </p>
          <p>
            Damit ist <InlineMath math={`C(${coord(sub(d.b, d.normal))})`} />.
            BC ist entgegengesetzt zu BA, gleich lang und ebenfalls senkrecht
            auf g. C hat somit denselben Abstand und ist von A verschieden.
          </p>
        </>
      ),
    },
  ],
}
