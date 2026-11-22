import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, FunctionGraph } from './math'

interface DATA {
  a: number
  limit: number
}

export const exercise22037: Exercise<DATA> = {
  title: 'Schnittpunkte und Berührpunkte eines Sinusprodukts unterscheiden',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 4),
      limit: rng.randomItemFromArray([2, 3, 4, 5]),
    }
  },
  originalData: { a: 2, limit: 3 },
  task({ data }) {
    return (
      <>
        <p>
          Bestimmen Sie alle gemeinsamen Punkte von{' '}
          <InlineMath math={String.raw`f(x)=${data.a}x\sin x`} /> und der
          Geraden <InlineMath math={String.raw`y=${data.a}x`} /> im Intervall{' '}
          <InlineMath math={String.raw`[0;${data.limit}\pi]`} />. Welche
          gemeinsamen Punkte sind Berührpunkte?
        </p>
        <FunctionGraph
          fn={x => data.a * x * Math.sin(x)}
          xMin={0}
          xMax={data.limit * Math.PI}
          yMin={-data.a * data.limit * Math.PI}
          yMax={data.a * data.limit * Math.PI}
          xStep={Math.PI / 2}
          xTickLabel={x => {
            const halves = Math.round((2 * x) / Math.PI)
            return halves === 0
              ? '0'
              : halves === 1
                ? 'π/2'
                : halves === 2
                  ? 'π'
                  : halves % 2 === 0
                    ? String(halves / 2) + 'π'
                    : String(halves) + 'π/2'
          }}
          yStep={data.a * 2}
        />
      </>
    )
  },
  solution({ data }) {
    const ks = Array.from(
      { length: Math.floor((2 * data.limit - 1) / 4) + 1 },
      (_, k) => k,
    )
    return (
      <>
        <p>
          Ausklammern ergibt{' '}
          <InlineMath math={String.raw`${data.a}x(\sin x-1)=0`} />. Also ist x =
          0 oder sin x = 1.
        </p>
        <p>
          Im Intervall sind das{' '}
          <InlineMath
            math={String.raw`x=0,\quad ${ks.map(k => String.raw`\frac{${4 * k + 1}\pi}2`).join(',\\quad')}`}
          />
          . Die y-Koordinate ergibt sich jeweils aus y = {data.a}x.
        </p>
        <p>
          <InlineMath math={String.raw`f'(x)=${data.a}(\sin x+x\cos x)`} />. An
          den von null verschiedenen Schnittstellen ist die Ableitung {data.a},
          wie bei der Geraden. Diese {ks.length} Punkte sind Berührpunkte. Bei x
          = 0 ist die Ableitung 0 und damit verschieden von der Geradensteigung.
        </p>
      </>
    )
  },
}
