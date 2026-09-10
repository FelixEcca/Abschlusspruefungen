import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Relation = 'one' | 'none' | 'infinite'

interface DATA {
  relation: Relation
}

function equations(relation: Relation) {
  if (relation === 'one') return ['y=2x-1', 'y=-x+5']
  if (relation === 'none') return ['y=2x+1', 'y=2x-3']
  return ['y=2x-4', '2y=4x-8']
}

export const exercise10028: Exercise<DATA> = {
  title: 'LGS zeichnerisch deuten',
  source: '3BKGD1',
  useCalculator: false,
  duration: 10,
  points: 10,
  generator(rng) {
    return { relation: rng.randomItemFromArray<Relation>(['one', 'none', 'infinite']) }
  },
  originalData: { relation: 'one' },
  task({ data }) {
    const [first, second] = equations(data.relation)
    return (
      <>
        <p>
          Deuten Sie das lineare Gleichungssystem zeichnerisch, ohne es
          vollständig zu lösen.
        </p>
        <p>
          <InlineMath math={first} /> und <InlineMath math={second} />
        </p>
        <p>
          Entscheiden Sie: Gibt es genau eine Lösung, keine Lösung oder
          unendlich viele Lösungen?
        </p>
      </>
    )
  },
  solution({ data }) {
    const [first, second] = equations(data.relation)
    return (
      <>
        <p>
          Jede Gleichung beschreibt eine Gerade. Entscheidend sind Steigung und
          y-Achsenabschnitt.
        </p>
        <p>
          Erste Gerade: <InlineMath math={first} />
        </p>
        <p>
          Zweite Gerade: <InlineMath math={second} />
        </p>
        {data.relation === 'one' && (
          <p>
            Die Steigungen sind verschieden. Die Geraden schneiden sich genau
            einmal. Das LGS hat <b>genau eine Lösung</b>.
          </p>
        )}
        {data.relation === 'none' && (
          <p>
            Die Steigungen sind gleich, aber die y-Achsenabschnitte sind
            verschieden. Die Geraden sind parallel. Das LGS hat{' '}
            <b>keine Lösung</b>.
          </p>
        )}
        {data.relation === 'infinite' && (
          <p>
            Die zweite Gleichung beschreibt dieselbe Gerade wie die erste. Das
            LGS hat <b>unendlich viele Lösungen</b>.
          </p>
        )}
      </>
    )
  },
}
