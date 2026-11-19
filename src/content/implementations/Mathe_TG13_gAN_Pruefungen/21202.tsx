import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { Vec, add, sub, mul, dot, coord, vec, orthogonalPairs } from './math'
interface DATA {
  shift: number
  m?: Vec
  u?: Vec
  v?: Vec
  ratio?: number
}
function geometry(d: DATA) {
  const m = d.m ?? [5 + d.shift, 1, -1],
    u = d.u ?? [4, -2, -4],
    v = d.v ?? [-2, 4, -4]
  return {
    m,
    u,
    v,
    a: sub(m, u),
    b: add(m, u),
    c: add(m, v),
    ratio: d.ratio ?? 2,
  }
}
export const exercise21202: Exercise<DATA> = {
  title: 'Lineare Algebra: Mittelpunkt, Orthogonalität und Abstandsverhältnis',
  source: '2024 Pflichtteil Aufgabe 3',
  useCalculator: false,
  duration: 12,
  generator(rng) {
    const p = rng.randomItemFromArray(orthogonalPairs)
    return {
      shift: 0,
      m: [
        rng.randomIntBetween(-6, 6),
        rng.randomIntBetween(-6, 6),
        rng.randomIntBetween(-6, 6),
      ] as Vec,
      u: mul(p.u, rng.randomIntBetween(1, 3)),
      v: mul(p.v, 6),
      ratio: rng.randomIntBetween(2, 4),
    }
  },
  originalData: { shift: 0 },
  intro: ({ data }) => {
    const { a, b, c, m } = geometry(data)
    return (
      <p>
        Gegeben sind{' '}
        <InlineMath
          math={String.raw`A(${coord(a)}),\ B(${coord(b)}),\ C(${coord(c)}),\ M(${coord(m)})`}
        />
        .
      </p>
    )
  },
  tasks: [
    {
      points: 2,
      task: () => (
        <p>
          Weisen Sie nach: M ist der Mittelpunkt von AB; die Vektoren AM und MC
          schließen einen rechten Winkel ein.
        </p>
      ),
      solution: ({ data }) => {
        const { m, u, v } = geometry(data)
        return (
          <>
            <p>
              <InlineMath math={String.raw`\tfrac12(A+B)=(${coord(m)})=M`} />.
            </p>
            <p>
              <InlineMath
                math={String.raw`\overrightarrow{AM}=${vec(u)},\quad\overrightarrow{MC}=${vec(v)}`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`\overrightarrow{AM}\cdot\overrightarrow{MC}=${dot(u, v)}`}
              />
              . Beide Vektoren sind von null verschieden und orthogonal.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: ({ data }) => (
        <p>
          Bestimmen Sie einen Punkt, dessen Abstand von M das{' '}
          {geometry(data).ratio}-Fache seines Abstands von C beträgt.
        </p>
      ),
      solution: ({ data }) => {
        const { m, v, ratio } = geometry(data),
          p = add(m, mul(v, ratio / (ratio - 1)))
        return (
          <>
            <p>
              Wir wählen P auf der Geraden MC hinter C:{' '}
              <InlineMath
                math={String.raw`P=M+\frac{${ratio}}{${ratio - 1}}(C-M)`}
              />
              .
            </p>
            <p>
              <InlineMath math={String.raw`P(${coord(p)})`} />. Dann gilt{' '}
              <InlineMath
                math={String.raw`|MP|=\frac{${ratio}}{${ratio - 1}}|MC|,\quad |CP|=\frac1{${ratio - 1}}|MC|`}
              />
              , also das geforderte Verhältnis.
            </p>
          </>
        )
      },
    },
  ],
}
