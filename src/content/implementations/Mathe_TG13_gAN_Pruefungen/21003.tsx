import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { Vec, add, sub, mul, dot, coord, vec, orthogonalPairs } from './math'
interface DATA {
  t: number
  area: number
  u?: Vec
  v?: Vec
  my?: number
  mz?: number
}
function geometry(d: DATA) {
  const u = d.u ?? [1, 2, -2],
    v = d.v ?? [2, 0, 1],
    m: Vec = [3.5 + d.t, d.my ?? 4, d.mz ?? 1.5]
  return { u, v, m, a: sub(m, mul(add(u, v), 0.5)) }
}
export const exercise21003: Exercise<DATA> = {
  title: 'Vektorgeometrie: Rechteck und Flächenstreckung (Auswahl I)',
  source: '2022 Pflichtteil Aufgabe 3 – Auswahl I',
  useCalculator: false,
  duration: 18,
  generator(rng) {
    const p = rng.randomItemFromArray(orthogonalPairs)
    return {
      t: rng.randomIntBetween(-5, 5),
      area: rng.randomItemFromArray([2, 3, 5, 7, 9]),
      u: mul(p.u, rng.randomIntBetween(1, 3)),
      v: mul(p.v, rng.randomIntBetween(1, 3)),
      my: rng.randomIntBetween(-5, 5),
      mz: rng.randomIntBetween(-5, 5),
    }
  },
  originalData: { t: 0, area: 5 },
  intro: ({ data }) => {
    const { u, v } = geometry(data)
    return (
      <p>
        Für das Viereck ABCD gilt{' '}
        <InlineMath
          math={String.raw`\overrightarrow{AB}=${vec(u)},\quad\overrightarrow{BC}=${vec(v)},\quad\overrightarrow{CD}=${vec(mul(u, -1))}`}
        />
        .
      </p>
    )
  },
  tasks: [
    {
      points: 3,
      task: () => (
        <p>
          Bestimmen Sie den Vektor DA und weisen Sie nach, dass das Viereck ein
          Rechteck ist.
        </p>
      ),
      solution: ({ data }) => {
        const { u, v } = geometry(data)
        return (
          <>
            <p>
              Die Seitenvektoren bilden einen geschlossenen Umlauf:{' '}
              <InlineMath
                math={String.raw`\overrightarrow{DA}=-(\overrightarrow{AB}+\overrightarrow{BC}+\overrightarrow{CD})=${vec(mul(v, -1))}`}
              />
              .
            </p>
            <p>
              Gegenüberliegende Seiten sind parallel und gleich lang. Außerdem{' '}
              <InlineMath
                math={String.raw`\overrightarrow{AB}\cdot\overrightarrow{BC}=${dot(u, v)}`}
              />
              . Daher ist das Parallelogramm ein Rechteck.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task: ({ data }) => (
        <p>
          Berechnen Sie A, wenn sich die Diagonalen in{' '}
          <InlineMath math={String.raw`M(${coord(geometry(data).m)})`} />{' '}
          schneiden.
        </p>
      ),
      solution: ({ data }) => {
        const { u, v, a } = geometry(data)
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`\overrightarrow{AC}=\overrightarrow{AB}+\overrightarrow{BC}=${vec(add(u, v))}`}
              />
              . Die Diagonalen halbieren sich.
            </p>
            <p>
              <InlineMath
                math={String.raw`A=M-\tfrac12\overrightarrow{AC}=(${coord(a)})`}
              />
              .
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task: ({ data }) => (
        <p>
          Durch Streckung wird der Flächeninhalt um Faktor {data.area}{' '}
          vergrößert. Die Seitenverhältnisse bleiben gleich. Berechnen Sie eine
          neue Seitenlänge.
        </p>
      ),
      solution: ({ data }) => {
        const { u, v } = geometry(data)
        return (
          <p>
            Der Längenfaktor ist{' '}
            <InlineMath math={String.raw`\sqrt{${data.area}}`} />. Aus{' '}
            <InlineMath math={String.raw`|AB|=\sqrt{${dot(u, u)}}`} /> folgt als
            neue Seitenlänge{' '}
            <InlineMath math={String.raw`\sqrt{${dot(u, u) * data.area}}`} />;
            die andere beträgt{' '}
            <InlineMath math={String.raw`\sqrt{${dot(v, v) * data.area}}`} />.
          </p>
        )
      },
    },
  ],
}
