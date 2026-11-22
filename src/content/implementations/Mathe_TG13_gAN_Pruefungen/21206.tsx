import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { Vec, add, sub, mul, coord, vec, dot } from './math'

interface DATA {
  support: Vec
  direction: Vec
  t: number
  normal: Vec
}

export const exercise21206: Exercise<DATA> = {
  title: 'Lineare Algebra: Lotfußpunkt und gleichschenkliges Dreieck',
  source: '2024 Teil A Aufgabe 5 – Auswahl II',
  useCalculator: false,
  duration: 12,
  generator(rng) {
    const rotation = rng.randomIntBetween(0, 2),
      k = rng.randomIntBetween(1, 3)
    const rotate = (v: Vec): Vec => [
      v[rotation],
      v[(rotation + 1) % 3],
      v[(rotation + 2) % 3],
    ]
    return {
      support: [
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
      ],
      direction: rotate([2, -1, 2]),
      t: rng.randomIntBetween(-2, 2),
      normal: mul(rotate([-4, -4, 2]), k),
    }
  },
  originalData: {
    support: [0, 1, 2],
    direction: [2, -1, 2],
    t: 1,
    normal: [-4, -4, 2],
  },
  intro: ({ data: d }) => {
    const a = add(d.support, mul(d.direction, d.t)),
      q = add(a, d.normal)
    return (
      <p>
        Gegeben sind die Gerade{' '}
        <InlineMath
          math={String.raw`g:\ \vec x=${vec(d.support)}+r${vec(d.direction)},\quad r\in\mathbb R`}
        />{' '}
        und der Punkt <InlineMath math={`A(${coord(a)})`} /> auf dieser Geraden.
        Der Punkt <InlineMath math={`Q(${coord(q)})`} /> liegt nicht auf g.
      </p>
    )
  },
  tasks: [
    {
      points: 2,
      task: () => (
        <p>
          Weisen Sie nach, dass{' '}
          <InlineMath math={String.raw`|\overrightarrow{QA}|`} /> dem Abstand
          von Q zur Geraden g entspricht.
        </p>
      ),
      solution: ({ data: d }) => (
        <>
          <p>
            A liegt auf g. Außerdem gilt{' '}
            <InlineMath
              math={String.raw`\overrightarrow{AQ}\cdot\vec u=${vec(d.normal)}\cdot${vec(d.direction)}=${dot(d.normal, d.direction)}`}
            />
            . AQ steht also senkrecht auf g. A ist der Lotfußpunkt und die Länge
            von QA der gesuchte Abstand.
          </p>
          <p>
            <InlineMath
              math={String.raw`d(Q,g)=\sqrt{${dot(d.normal, d.normal)}}=${Math.sqrt(dot(d.normal, d.normal))}`}
            />
            .
          </p>
        </>
      ),
    },
    {
      points: 3,
      task: () => (
        <p>
          Bestimmen Sie die Koordinaten eines Punkts B auf g, der zusammen mit A
          und Q ein gleichschenkliges Dreieck bildet.
        </p>
      ),
      solution: ({ data: d }) => {
        const a = add(d.support, mul(d.direction, d.t)),
          factor = Math.sqrt(
            dot(d.normal, d.normal) / dot(d.direction, d.direction),
          ),
          b = add(a, mul(d.direction, factor))
        return (
          <>
            <p>
              Weil AQ senkrecht auf g steht, wählen wir{' '}
              <InlineMath math="|AB|=|AQ|" />. Der Richtungsvektor von g hat die
              Länge{' '}
              <InlineMath
                math={String.raw`\sqrt{${dot(d.direction, d.direction)}}=3`}
              />
              . Daher ist zum Beispiel
            </p>
            <p>
              <InlineMath
                math={String.raw`B=A+${factor}\vec u=${vec(a)}+${factor}${vec(d.direction)}=${vec(b)}`}
              />{' '}
              geeignet. B liegt auf g und{' '}
              <InlineMath
                math={`|AB|=${Math.sqrt(dot(d.normal, d.normal))}=|AQ|`}
              />
              . Auch der Punkt{' '}
              <InlineMath
                math={`B'(${coord(sub(a, mul(d.direction, factor)))})`}
              />{' '}
              ist möglich.
            </p>
          </>
        )
      },
    },
  ],
}
