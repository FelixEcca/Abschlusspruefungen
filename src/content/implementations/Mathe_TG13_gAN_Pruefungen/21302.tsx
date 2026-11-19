import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { TriangleSketch } from './diagrams'
import { Vec, add, sub, mul, dot, coord, vec, orthogonalPairs } from './math'
interface DATA {
  s: number
  c?: Vec
  u?: Vec
  v?: Vec
}
function geometry(d: DATA) {
  const c = d.c ?? [3 + d.s, -2, 4],
    u = d.u ?? [2, 1, -2],
    v = d.v ?? [6, 4, 8]
  return { c, u, v, a: add(c, u), b: add(c, v) }
}
export const exercise21302: Exercise<DATA> = {
  title: 'Lineare Algebra: Rechtwinkliges Dreieck und Parallelogramm',
  source: '2025 Pflichtteil Aufgabe 3',
  useCalculator: false,
  duration: 12,
  generator(rng) {
    const p = rng.randomItemFromArray(orthogonalPairs)
    return {
      s: 0,
      c: [
        rng.randomIntBetween(-5, 5),
        rng.randomIntBetween(-5, 5),
        rng.randomIntBetween(-5, 5),
      ] as Vec,
      u: mul(p.u, rng.randomIntBetween(1, 3)),
      v: mul(p.v, rng.randomIntBetween(1, 3)),
    }
  },
  originalData: { s: 0 },
  intro: ({ data }) => {
    const { a, b, c } = geometry(data)
    return (
      <p>
        Die Punkte{' '}
        <InlineMath
          math={String.raw`A(${coord(a)}),\ B(${coord(b)}),\ C(${coord(c)})`}
        />{' '}
        bilden das Dreieck ABC.
      </p>
    )
  },
  tasks: [
    {
      points: 2,
      task: () => (
        <p>Weisen Sie nach, dass ABC bei C einen rechten Winkel besitzt.</p>
      ),
      solution: ({ data }) => {
        const { u, v } = geometry(data)
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`\overrightarrow{CA}=${vec(u)},\quad\overrightarrow{CB}=${vec(v)}`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`\overrightarrow{CA}\cdot\overrightarrow{CB}=${dot(u, v)}`}
              />
              . Beide Seitenvektoren sind von null verschieden und orthogonal.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: () => (
        <>
          <TriangleSketch />
          <p>
            Erweitern Sie die Skizze um einen Punkt P, sodass A, B, C und P ein
            Parallelogramm bilden. Bestimmen Sie mögliche Koordinaten von P so,
            dass dieses Parallelogramm kein Rechteck ist.
          </p>
        </>
      ),
      solution: ({ data }) => {
        const { a, b, c, u, v } = geometry(data)
        return (
          <>
            <TriangleSketch parallelogram />
            <p>
              Zum Parallelogramm ABPC ergänzt man{' '}
              <InlineMath
                math={String.raw`P=B+C-A=(${coord(sub(add(b, c), a))})`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`\overrightarrow{AB}\cdot\overrightarrow{AC}=${vec(sub(v, u))}\cdot${vec(mul(u, -1))}=${dot(u, u)}\ne0`}
              />
              . Dieses Parallelogramm ist kein Rechteck.
            </p>
          </>
        )
      },
    },
  ],
}
