import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { PrismSketch } from './diagrams'
import { coord, vec, frac } from './math'
interface DATA {
  k: number
  width?: number
  depth?: number
  height?: number
}
function size(d: DATA) {
  return {
    a: d.width ?? 2 * d.k,
    b: d.depth ?? 2 * d.k,
    h: d.height ?? 2 * d.k,
  }
}
export const exercise21104: Exercise<DATA> = {
  title: 'Vektorgeometrie: Prisma und Geraden (Auswahl II)',
  source: '2023 Pflichtteil Aufgabe 3 – Vektorgeometrie II',
  useCalculator: false,
  duration: 18,
  generator: rng => ({
    k: 1,
    width: 2 * rng.randomIntBetween(1, 5),
    depth: 2 * rng.randomIntBetween(1, 5),
    height: rng.randomIntBetween(2, 8),
  }),
  originalData: { k: 1 },
  intro: ({ data }) => {
    const { a, b, h } = size(data)
    return (
      <>
        <p>
          Gegeben sind{' '}
          <InlineMath
            math={String.raw`A(${a}\mid0\mid0),\ B(${a}\mid${b}\mid0),\ C(0\mid${b}\mid0),\ D(${a}\mid0\mid${h})`}
          />{' '}
          eines Prismas mit Grundfläche ABC und senkrechten Kanten AD, BE und
          CF.
        </p>
        <PrismSketch />
      </>
    )
  },
  tasks: [
    {
      points: 2,
      task: () => (
        <p>
          Zeigen Sie, dass ABC rechtwinklig ist, und berechnen Sie das Volumen.
        </p>
      ),
      solution: ({ data }) => {
        const { a, b, h } = size(data)
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`\overrightarrow{BA}=${vec([0, -b, 0])},\quad\overrightarrow{BC}=${vec([-a, 0, 0])}`}
              />
              . Das Skalarprodukt ist null.
            </p>
            <p>
              <InlineMath
                math={String.raw`G=\tfrac12\cdot${a}\cdot${b}=${(a * b) / 2},\quad V=G\cdot${h}=${(a * b * h) / 2}`}
              />
              .
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task: ({ data }) => {
        const { a, b, h } = size(data)
        return (
          <p>
            Die Gerade{' '}
            <InlineMath
              math={String.raw`g:\vec x=${vec([a / 2, b, 0])}+s${vec([a / 2, -b, h])}`}
            />{' '}
            enthält einen Eckpunkt und den Mittelpunkt einer Kante. Bestimmen
            Sie beide Punkte.
          </p>
        )
      },
      solution: ({ data }) => {
        const { a, b, h } = size(data)
        return (
          <p>
            Für s=0: <InlineMath math={String.raw`(${coord([a / 2, b, 0])})`} />
            , der Mittelpunkt von BC. Für s=1:{' '}
            <InlineMath math={String.raw`(${coord([a, 0, h])})=D`} />.
          </p>
        )
      },
    },
    {
      points: 3,
      task: ({ data }) => {
        const { a, b, h } = size(data)
        return (
          <p>
            Untersuchen Sie, ob sich g und{' '}
            <InlineMath
              math={String.raw`h:\vec x=${vec([a, b / 2, 0])}+r${vec([-a, b / 2, h])}`}
            />{' '}
            schneiden.
          </p>
        )
      },
      solution: ({ data }) => {
        const { a, b, h } = size(data)
        return (
          <>
            <p>
              Gleichsetzen und die drei Koordinatengleichungen durch die
              jeweiligen Längen teilen liefert{' '}
              <InlineMath
                math={String.raw`\tfrac12+\tfrac12s=1-r,\quad 1-s=\tfrac12+\tfrac12r,\quad s=r`}
              />
              .
            </p>
            <p>
              Damit folgt s=r=⅓. Der gemeinsame Punkt ist{' '}
              <InlineMath
                math={String.raw`S(${frac(2 * a, 3)}\mid${frac(2 * b, 3)}\mid${frac(h, 3)})`}
              />
              .
            </p>
          </>
        )
      },
    },
  ],
}
