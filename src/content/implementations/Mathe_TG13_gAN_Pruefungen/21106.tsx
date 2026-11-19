import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { Vec, dot, vec } from './math'
interface DATA {
  k: number
  rows?: [Vec, Vec, Vec]
  solution?: Vec
  nullVector?: Vec
}
function system(d: DATA) {
  const rows = d.rows ?? [
      [2, -1, -5],
      [3, 1, -5],
      [0, -5, -5],
    ],
    x = d.solution ?? [1, 1, 1],
    n = d.nullVector ?? [2, -1, 1],
    b = rows.map(r => dot(r, x)) as Vec
  return {
    rows,
    x,
    n,
    b,
    matrix: String.raw`\begin{pmatrix}${rows.map(r => r.join('&')).join('\\\\')}\end{pmatrix}`,
  }
}
export const exercise21106: Exercise<DATA> = {
  title: 'Matrizen: Dimensionen und Lösungsmenge eines LGS (Auswahl II)',
  source: '2023 Pflichtteil Aufgabe 3 – Matrizen II',
  useCalculator: false,
  duration: 18,
  generator(rng) {
    const [a, b, c, d] = rng.randomItemFromArray([
        [2, -1, 3, 1],
        [1, 2, 2, 3],
        [3, 1, 1, -2],
        [-1, 2, 2, 1],
      ]),
      n: Vec = [
        rng.randomItemFromArray([-3, -2, -1, 1, 2, 3]),
        rng.randomItemFromArray([-2, -1, 1, 2]),
        1,
      ],
      r1: Vec = [a, b, -a * n[0] - b * n[1]],
      r2: Vec = [c, d, -c * n[0] - d * n[1]],
      s = rng.randomIntBetween(1, 3),
      t = rng.randomItemFromArray([-3, -2, 1, 2])
    return {
      k: rng.randomIntBetween(1, 3),
      rows: [r1, r2, r1.map((v, i) => s * v + t * r2[i]) as Vec] as [
        Vec,
        Vec,
        Vec,
      ],
      solution: [
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
      ] as Vec,
      nullVector: n,
    }
  },
  originalData: { k: 1 },
  intro: ({ data }) => {
    const { matrix, b } = system(data)
    return (
      <p>
        Gegeben sind{' '}
        <InlineMath
          math={String.raw`A=${data.k}${matrix},\quad \vec b=${vec(b.map(v => v * data.k) as Vec)}`}
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
          Geben Sie jeweils Zeilen- und Spaltenanzahl von{' '}
          <InlineMath math={String.raw`A^2`} /> und{' '}
          <InlineMath math={String.raw`\vec b^{\,T}A\vec b`} /> an.
        </p>
      ),
      solution: () => (
        <p>
          A² hat Format 3×3. Das zweite Produkt hat Format
          (1×3)·(3×3)·(3×1)=1×1.
        </p>
      ),
    },
    {
      points: 1,
      task: ({ data }) => (
        <p>
          Zeigen Sie, dass{' '}
          <InlineMath math={String.raw`\vec x=${vec(system(data).x)}`} /> eine
          Lösung von <InlineMath math={String.raw`A\vec x=\vec b`} /> ist.
        </p>
      ),
      solution: ({ data }) => {
        const { x, rows } = system(data)
        return (
          <>
            <p>
              Durch Multiplikation jeder Zeile mit dem angegebenen Vektor erhält
              man
            </p>
            <p>
              <InlineMath
                math={String.raw`A${vec(x)}=${vec(rows.map(r => data.k * dot(r, x)) as Vec)}=\vec b`}
              />
              .
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      task: () => (
        <p>
          Bestimmen Sie die Lösungsmenge von{' '}
          <InlineMath math={String.raw`A\vec x=\vec b`} />. Begründen Sie ohne
          weitere Rechnung, dass A keine Inverse besitzt.
        </p>
      ),
      solution: ({ data }) => {
        const { x, n, rows, b } = system(data),
          [[a, c, e], [f, g, h]] = rows
        return (
          <>
            <p>
              Nach Division durch {data.k} lauten die ersten beiden Gleichungen{' '}
              <InlineMath
                math={String.raw`${a}x_1+(${c})x_2+(${e})x_3=${b[0]},\quad ${f}x_1+(${g})x_2+(${h})x_3=${b[1]}`}
              />
              .
            </p>
            <p>
              Setze <InlineMath math={String.raw`x_3=${x[2]}+t`} />. Einsetzen
              und Lösen der beiden Gleichungen nach x₁ und x₂ ergibt{' '}
              <InlineMath
                math={String.raw`x_1=${x[0]}+(${n[0]})t,\quad x_2=${x[1]}+(${n[1]})t`}
              />
              . Die dritte Gleichung ist eine Linearkombination der ersten
              beiden und liefert keine weitere Bedingung.
            </p>
            <p>
              <InlineMath
                math={String.raw`L=\left\{${vec(x)}+t${vec(n)}:t\in\mathbb R\right\}`}
              />
              .
            </p>
            <p>
              Es gibt unendlich viele Lösungen. Eine invertierbare Matrix würde
              genau eine Lösung liefern, daher ist A nicht invertierbar.
            </p>
          </>
        )
      },
    },
  ],
}
