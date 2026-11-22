import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, matrix } from './math'

interface DATA {
  k: number
  s: number
  scale: number
  q: number
}
export const exercise22083: Exercise<DATA> = {
  title: 'Eine inverse Matrix bestimmen und eine Matrixgleichung lösen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      k: rng.randomIntBetween(1, 3),
      s: rng.randomIntBetween(-2, 3),
      scale: rng.randomIntBetween(1, 3),
      q: rng.randomIntBetween(2, 5),
    }
  },
  originalData: { k: 1, s: 1, scale: 1, q: 2 },
  task({ data }) {
    const a = [
      [data.scale, data.scale * data.k],
      [data.scale * data.s, data.scale * (1 + data.k * data.s)],
    ]
    return (
      <>
        <p>
          Bestimmen Sie A⁻¹. Lösen Sie anschließend die Matrixgleichung nach X
          auf. I ist die 2×2-Einheitsmatrix.
        </p>
        <p>
          <InlineMath
            math={String.raw`A=${matrix(a)},\quad A(X-I)+X=X-${data.q}A`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const adj = [
      [1 + data.k * data.s, -data.k],
      [-data.s, 1],
    ]
    return (
      <>
        <p>
          Die Determinante von A ist{' '}
          <InlineMath math={String.raw`${data.scale ** 2}\ne0`} />. Die Formel
          für die 2×2-Inverse ergibt
        </p>
        <p>
          <InlineMath
            math={String.raw`A^{-1}=${frac(1, data.scale)}${matrix(adj)}`}
          />
          .
        </p>
        <p>
          Für die Gleichung wird zunächst ausmultipliziert und auf beiden Seiten
          X subtrahiert:
        </p>
        <p>
          <InlineMath
            math={String.raw`AX-A=-${data.q}A\Rightarrow AX=${1 - data.q}A`}
          />
          .
        </p>
        <p>
          Multiplikation von links mit A⁻¹ liefert{' '}
          <InlineMath
            math={String.raw`X=${1 - data.q}I=${matrix([
              [1 - data.q, 0],
              [0, 1 - data.q],
            ])}`}
          />
          . Die Reihenfolge ist wichtig; Matrizen dürfen nicht beliebig
          vertauscht werden.
        </p>
      </>
    )
  },
}
