import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { coord, vec, add, sub, mul, Vec } from './math'

interface DATA {
  foot: Vec
  k: number
  variant: number
}
export const exercise22075: Exercise<DATA> = {
  title:
    'Einen Punkt mit gleichem Abstand oder ein gleichschenkliges Dreieck konstruieren',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      foot: [
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
      ],
      k: rng.randomIntBetween(1, 3),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { foot: [0, 0, 0], k: 1, variant: 1 },
  task({ data }) {
    const a = add(data.foot, mul([1, 2, 2], data.k))
    return (
      <>
        <p>
          <InlineMath
            math={String.raw`g:\vec x=${vec(data.foot)}+t${vec([2, -2, 1])},\quad A(${coord(a)}),\quad F(${coord(data.foot)})`}
          />
          . F ist der Lotfußpunkt von A auf g.
        </p>
        <p>
          {data.variant === 0
            ? 'Geben Sie einen weiteren Punkt C an, der denselben Abstand zu g hat wie A.'
            : 'Bestimmen Sie einen Punkt B auf g, sodass AFB ein gleichschenkliges Dreieck ist.'}{' '}
          Begründen Sie Ihre Wahl.
        </p>
      </>
    )
  },
  solution({ data }) {
    const n = mul([1, 2, 2], data.k),
      b = add(data.foot, mul([2, -2, 1], data.k)),
      c = sub(data.foot, n)
    return data.variant === 0 ? (
      <>
        <p>
          Spiegeln Sie A an F:{' '}
          <InlineMath math={String.raw`C=2F-A=${vec(c)}`} />.
        </p>
        <p>
          FC ist entgegengesetzt zu FA, gleich lang und ebenfalls senkrecht auf
          g. C ist von A verschieden und hat denselben Abstand{' '}
          <InlineMath math={String.raw`${3 * data.k}`} /> zu g.
        </p>
      </>
    ) : (
      <>
        <p>
          FA hat die Länge {3 * data.k}. Der Richtungsvektor von g hat die Länge
          3. Deshalb wählen wir
        </p>
        <p>
          <InlineMath
            math={String.raw`B=F+${data.k}${vec([2, -2, 1])}=${vec(b)}`}
          />
          .
        </p>
        <p>
          B liegt auf g und{' '}
          <InlineMath math={String.raw`|FB|=|FA|=${3 * data.k}`} />. Damit ist
          AFB gleichschenklig und wegen des Lotfußpunkts zugleich rechtwinklig.
        </p>
      </>
    )
  },
}
