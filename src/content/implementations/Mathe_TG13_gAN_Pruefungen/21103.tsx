import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { Vec, add, mul, coord, vec } from './math'
interface DATA {
  s: number
  b?: Vec
  direction?: Vec
  factor?: number
  offset?: Vec
  parallel?: number
}
function geometry(d: DATA) {
  const b = d.b ?? [2 + d.s, -1, 0],
    v = d.direction ?? [-1, 1, 2],
    factor = d.factor ?? 4,
    offset = d.offset ?? [1, 0, 0]
  return {
    b,
    v,
    factor,
    a: add(b, v),
    c: add(b, mul(v, factor)),
    h: add(b, offset),
    parallel: d.parallel ?? 1,
  }
}
export const exercise21103: Exercise<DATA> = {
  title: 'Vektorgeometrie: Parallele Geraden und orthogonale Ebene (Auswahl I)',
  source: '2023 Pflichtteil Aufgabe 3 – Vektorgeometrie I',
  useCalculator: false,
  duration: 18,
  generator: rng => ({
    s: 0,
    b: [
      rng.randomIntBetween(-5, 5),
      rng.randomIntBetween(-5, 5),
      rng.randomIntBetween(-5, 5),
    ] as Vec,
    direction: rng.randomItemFromArray<Vec>([
      [-1, 1, 2],
      [2, -1, 3],
      [1, 2, -1],
      [-2, 3, 1],
    ]),
    factor: rng.randomIntBetween(3, 7),
    offset: [rng.randomIntBetween(1, 4), 0, 0] as Vec,
    parallel: rng.randomItemFromArray([-3, -1, 2, 4]),
  }),
  originalData: { s: 0 },
  intro: ({ data }) => {
    const { a, b, c } = geometry(data)
    return (
      <p>
        Gegeben sind{' '}
        <InlineMath
          math={String.raw`A(${coord(a)}),\ B(${coord(b)}),\ C(${coord(c)})`}
        />
        . Die Gerade g enthält B und C.
      </p>
    )
  },
  tasks: [
    {
      points: 4,
      task: ({ data }) => (
        <p>
          Zeigen Sie, dass A auf g liegt. Begründen Sie, dass A{' '}
          {geometry(data).factor - 1}-mal so weit von C entfernt ist wie von B.
        </p>
      ),
      solution: ({ data }) => {
        const { b, v, factor } = geometry(data)
        return (
          <>
            <p>
              <InlineMath math={String.raw`g:\vec x=${vec(b)}+r${vec(v)}`} />.
              Für r=1 erhält man A, für{' '}
              <InlineMath math={String.raw`r=${factor}`} /> erhält man C.
            </p>
            <p>
              <InlineMath
                math={String.raw`\overrightarrow{AC}=${factor - 1}\vec v,\quad\overrightarrow{AB}=-\vec v`}
              />
              . Daher <InlineMath math={String.raw`|AC|=${factor - 1}|AB|`} />.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task: ({ data }) => {
        const { h, v, parallel } = geometry(data)
        return (
          <p>
            Gegeben ist{' '}
            <InlineMath
              math={String.raw`h:\vec x=${vec(h)}+t${vec(mul(v, parallel))}`}
            />
            . Zeigen Sie, dass h parallel, aber nicht identisch zu g ist.
          </p>
        )
      },
      solution: ({ data }) => {
        const { parallel } = geometry(data)
        return (
          <p>
            Der Richtungsvektor von h ist das {parallel}-Fache des
            Richtungsvektors von g. Die Differenz der Stützvektoren hat nur in
            der ersten Komponente einen Wert ungleich null; sie ist kein
            Vielfaches des Richtungsvektors von g. Daher sind die Geraden echt
            parallel.
          </p>
        )
      },
    },
    {
      points: 1,
      task: () => (
        <p>Geben Sie eine Gleichung einer Ebene an, die orthogonal zu h ist.</p>
      ),
      solution: ({ data }) => {
        const { v } = geometry(data)
        return (
          <p>
            Der Richtungsvektor von h dient als Normalenvektor. Zum Beispiel{' '}
            <InlineMath
              math={String.raw`E:\ ${v[0]}x_1+(${v[1]})x_2+(${v[2]})x_3=0`}
            />
            .
          </p>
        )
      },
    },
  ],
}
