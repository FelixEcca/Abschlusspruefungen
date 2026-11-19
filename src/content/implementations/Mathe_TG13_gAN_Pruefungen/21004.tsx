import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { Vec, add, sub, mul, dot, coord, vec, frac } from './math'
interface DATA {
  s: number
  dy?: number
  dz?: number
  cx?: number
  y?: number
  z?: number
  ratio?: number
}
function geometry(d: DATA) {
  const dy = d.dy ?? 2,
    dz = d.dz ?? 1,
    cx = d.cx ?? 2,
    a: Vec = [d.s, d.y ?? -2, d.z ?? 2],
    v: Vec = [0, 3 * dy, 3 * dz],
    m = add(a, mul(v, 0.5)),
    normal: Vec = [cx, dz, -dy]
  return {
    a,
    v,
    b: add(a, v),
    m,
    c: add(m, normal),
    normal,
    ratio: d.ratio ?? 2,
  }
}
export const exercise21004: Exercise<DATA> = {
  title: 'Vektorgeometrie: Gerade und Punktabstand (Auswahl II)',
  source: '2022 Pflichtteil Aufgabe 3 – Auswahl II',
  useCalculator: false,
  duration: 18,
  generator: rng => ({
    s: rng.randomItemFromArray([-4, -2, -1, 1, 2, 3, 5]),
    dy: rng.randomIntBetween(1, 4),
    dz: rng.randomItemFromArray([-3, -1, 1, 2, 4]),
    cx: rng.randomIntBetween(1, 5),
    y: rng.randomIntBetween(-5, 5),
    z: rng.randomIntBetween(-5, 5),
    ratio: rng.randomIntBetween(2, 5),
  }),
  originalData: { s: 2 },
  intro: ({ data }) => {
    const { a, b } = geometry(data)
    return (
      <p>
        Die Gerade g geht durch{' '}
        <InlineMath math={String.raw`A(${coord(a)}),\quad B(${coord(b)})`} />.
      </p>
    )
  },
  tasks: [
    {
      points: 2,
      task: () => (
        <p>
          Begründen Sie, dass g parallel zur x₂x₃-Ebene ist, aber nicht in ihr
          liegt.
        </p>
      ),
      solution: ({ data }) => {
        const { a, v } = geometry(data)
        return (
          <p>
            <InlineMath math={String.raw`g:\vec x=${vec(a)}+t${vec(v)}`} />. Die
            erste Koordinate ist konstant {data.s} und ungleich null. Der
            Richtungsvektor ist parallel zur Ebene x₁=0.
          </p>
        )
      },
    },
    {
      points: 2,
      task: ({ data }) => (
        <p>
          Bestimmen Sie einen Punkt P auf g mit dem Streckenverhältnis AP : BP ={' '}
          {geometry(data).ratio} : 1.
        </p>
      ),
      solution: ({ data }) => {
        const { a, v, ratio } = geometry(data),
          p = add(a, mul(v, ratio / (ratio + 1)))
        return (
          <>
            <p>
              Ein innerer Teilpunkt entsteht mit{' '}
              <InlineMath
                math={String.raw`P=A+${frac(ratio, ratio + 1)}(B-A)`}
              />
              .
            </p>
            <p>
              <InlineMath math={String.raw`P(${coord(p)})`} />. Da{' '}
              <InlineMath
                math={String.raw`|AP|=${frac(ratio, ratio + 1)}|AB|,\quad |BP|=${frac(1, ratio + 1)}|AB|`}
              />
              , ist das Verhältnis erfüllt.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: ({ data }) => {
        const { c, m } = geometry(data)
        return (
          <p>
            Gegeben sind{' '}
            <InlineMath
              math={String.raw`C(${coord(c)}),\quad M(${coord(m)})`}
            />
            . M liegt auf g. Weisen Sie nach, dass AB und MC orthogonal sind,
            und berechnen Sie den Abstand von C zu g.
          </p>
        )
      },
      solution: ({ data }) => {
        const { v, normal } = geometry(data)
        return (
          <>
            <p>
              M ist der Mittelpunkt von AB.{' '}
              <InlineMath
                math={String.raw`\overrightarrow{AB}\cdot\overrightarrow{MC}=${vec(v)}\cdot${vec(normal)}=0`}
              />
              .
            </p>
            <p>
              M ist deshalb der Lotfußpunkt.{' '}
              <InlineMath
                math={String.raw`d(C,g)=|MC|=\sqrt{${dot(normal, normal)}}`}
              />
              .
            </p>
          </>
        )
      },
    },
  ],
}
