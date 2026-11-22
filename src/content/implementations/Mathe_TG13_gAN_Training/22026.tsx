import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  variant: number
}

export const exercise22026: Exercise<DATA> = {
  title: 'Eine vorgegebene Stammfunktion überprüfen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 5),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { a: 2, variant: 1 },
  task({ data }) {
    return (
      <>
        <p>
          Weisen Sie durch Ableiten nach, dass F eine Stammfunktion von f ist.
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`F(x)=${data.a}(x-1)e^x,\quad f(x)=${data.a}xe^x`
                : String.raw`F(x)=${data.a}(-x\cos x+\sin x),\quad f(x)=${data.a}x\sin x`
            }
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Verwenden Sie im Produkt die Produktregel. Entscheidend ist, ob am
          Ende genau f(x) entsteht.
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`F'(x)=${data.a}(e^x+(x-1)e^x)=${data.a}xe^x=f(x)`
                : String.raw`F'(x)=${data.a}(-\cos x+x\sin x+\cos x)=${data.a}x\sin x=f(x)`
            }
          />
        </p>
        <p>
          Damit ist die Behauptung nachgewiesen. Ein einzelner übereinstimmender
          Funktionswert würde als Nachweis nicht ausreichen.
        </p>
      </>
    )
  },
}
