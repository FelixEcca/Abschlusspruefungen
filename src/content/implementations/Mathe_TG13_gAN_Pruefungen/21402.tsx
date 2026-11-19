import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { Vec, vec, coord, dot } from './math'
interface DATA {
  k: number
  h: number
  a?: Vec
  b?: Vec
}
function geometry(d: DATA) {
  const a = d.a ?? [8 * d.k, 6 * d.k, 0],
    b = d.b ?? [0, 0, 10 * d.k],
    length2 = dot(a, a)
  return { a, b, length2, area: length2 / 2, volume: (length2 * d.h) / 6 }
}
export const exercise21402: Exercise<DATA> = {
  title: 'Lineare Algebra: Rechtwinkliges Dreieck und Pyramidenhöhe',
  source: '2026 Pflichtteil Aufgabe 3',
  useCalculator: false,
  duration: 12,
  generator(rng) {
    const [x, y, z] = rng.randomItemFromArray([
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
      ]),
      k = rng.randomIntBetween(1, 3),
      sign = rng.randomItemFromArray([-1, 1]),
      axis = rng.randomIntBetween(0, 2)
    const a: Vec = [0, 0, 0],
      b: Vec = [0, 0, 0]
    a[(axis + 1) % 3] = x * k
    a[(axis + 2) % 3] = y * k * sign
    b[axis] = z * k
    return { k, h: 6 * rng.randomIntBetween(1, 4), a, b }
  },
  originalData: { k: 1, h: 6 },
  intro: ({ data }) => {
    const { a, b } = geometry(data)
    return (
      <p>
        Gegeben ist das gleichschenklige Dreieck OAB mit{' '}
        <InlineMath
          math={String.raw`O(0\mid0\mid0),\quad A(${coord(a)}),\quad B(${coord(b)})`}
        />
        .
      </p>
    )
  },
  tasks: [
    {
      points: 3,
      task: ({ data }) => (
        <p>
          Zeigen Sie, dass OAB in O rechtwinklig ist und beide Katheten die
          Länge {Math.sqrt(geometry(data).length2)} besitzen.
        </p>
      ),
      solution: ({ data }) => {
        const { a, b, length2 } = geometry(data)
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`\overrightarrow{OA}\cdot\overrightarrow{OB}=${vec(a)}\cdot${vec(b)}=0`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`|OA|=\sqrt{${length2}}=${Math.sqrt(length2)},\quad |OB|=\sqrt{${dot(b, b)}}=${Math.sqrt(length2)}`}
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
          Die Pyramide OABS hat das Volumen {geometry(data).volume} und erfüllt{' '}
          <InlineMath
            math={String.raw`\overrightarrow{OS}\cdot\overrightarrow{OA}=0,\quad\overrightarrow{OS}\cdot\overrightarrow{OB}=0`}
          />
          . Bestimmen Sie{' '}
          <InlineMath math={String.raw`|\overrightarrow{OS}|`} />.
        </p>
      ),
      solution: ({ data }) => {
        const { area, volume } = geometry(data)
        return (
          <>
            <p>
              OS steht auf den beiden unabhängigen Katheten und damit senkrecht
              auf der Grundfläche. Seine Länge ist die Pyramidenhöhe h.
            </p>
            <p>
              <InlineMath
                math={String.raw`G=${area},\quad V=\tfrac13Gh\quad\Rightarrow\quad |OS|=\frac{3V}{G}=\frac{3\cdot${volume}}{${area}}=${data.h}`}
              />
              .
            </p>
          </>
        )
      },
    },
  ],
}
