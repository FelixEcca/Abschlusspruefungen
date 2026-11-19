import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
interface DATA {
  k: number
  q: number
  matrix?: [number, number, number, number]
  first?: [number, number]
  second?: [number, number]
}
function values(d: DATA) {
  return {
    m: d.matrix ?? [2, -1, 5, -3],
    u: d.first ?? [3 * d.k, 5 * d.k],
    v: d.second ?? [d.k, 2 * d.k],
  }
}
export const exercise21105: Exercise<DATA> = {
  title: 'Matrizen: Inverse, Linearität und Matrixgleichung (Auswahl I)',
  source: '2023 Pflichtteil Aufgabe 3 – Matrizen I',
  useCalculator: false,
  duration: 18,
  generator(rng) {
    const a = rng.randomIntBetween(-3, 3),
      b = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3]),
      sign = rng.randomItemFromArray([-1, 1])
    return {
      k: rng.randomIntBetween(1, 3),
      q: rng.randomIntBetween(2, 7),
      matrix: [1, a, b, a * b + sign] as [number, number, number, number],
      first: [rng.randomIntBetween(-6, 6), rng.randomIntBetween(-6, 6)] as [
        number,
        number,
      ],
      second: [rng.randomIntBetween(-6, 6), rng.randomIntBetween(-6, 6)] as [
        number,
        number,
      ],
    }
  },
  originalData: { k: 1, q: 2 },
  intro: () => null,
  tasks: [
    {
      points: 3,
      task: ({ data }) => {
        const {
          m: [a, b, c, d],
        } = values(data)
        return (
          <p>
            Bestimmen Sie die Inverse zu{' '}
            <InlineMath
              math={String.raw`A=${data.k}\begin{pmatrix}${a}&${b}\\${c}&${d}\end{pmatrix}`}
            />
            .
          </p>
        )
      },
      solution: ({ data }) => {
        const {
            m: [a, b, c, d],
          } = values(data),
          det = a * d - b * c
        return (
          <>
            <p>
              Die unskalierte Matrix hat Determinante{' '}
              <InlineMath
                math={String.raw`\Delta=(${a})(${d})-(${b})(${c})=${det}\ne0`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`A^{-1}=\frac1{${data.k}}\cdot\frac1{${det}}\begin{pmatrix}${d}&${-b}\\${-c}&${a}\end{pmatrix}`}
              />
              . Die Diagonaleinträge werden vertauscht und die
              Nebendiagonaleinträge wechseln das Vorzeichen.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task: ({ data }) => {
        const { u, v } = values(data)
        return (
          <p>
            Es gilt{' '}
            <InlineMath
              math={String.raw`B\binom10=\binom{${u[0]}}{${u[1]}},\quad B\binom0{-1}=\binom{${v[0]}}{${v[1]}}`}
            />
            . Zeigen Sie:{' '}
            <InlineMath
              math={String.raw`B\binom1{-1}=\binom{${u[0] + v[0]}}{${u[1] + v[1]}}`}
            />
            .
          </p>
        )
      },
      solution: ({ data }) => {
        const { u, v } = values(data)
        return (
          <p>
            Wegen der Linearität{' '}
            <InlineMath
              math={String.raw`B\left(\binom10+\binom0{-1}\right)=B\binom10+B\binom0{-1}=\binom{${u[0] + v[0]}}{${u[1] + v[1]}}`}
            />
            .
          </p>
        )
      },
    },
    {
      points: 2,
      task: ({ data }) => (
        <p>
          C ist invertierbar, E die Einheitsmatrix gleichen Formats. Lösen Sie
          nach X: <InlineMath math={String.raw`C(X-E)+X=X-${data.q}C`} />.
        </p>
      ),
      solution: ({ data }) => (
        <>
          <p>
            Ausmultiplizieren und X abziehen:{' '}
            <InlineMath
              math={String.raw`CX-C=-${data.q}C\Rightarrow CX=${1 - data.q}C`}
            />
            .
          </p>
          <p>
            Von links mit C⁻¹ multiplizieren ergibt{' '}
            <InlineMath math={String.raw`X=${1 - data.q}E`} />.
          </p>
        </>
      ),
    },
  ],
}
