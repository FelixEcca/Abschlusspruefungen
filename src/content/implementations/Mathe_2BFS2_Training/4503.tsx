import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4503 {
  a: number
  b: number
  x: number
  direct: boolean
}

export const exercise4503: Exercise<D4503> = {
  title: 'Dreisatz',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 3,
  generator(rng) {
    const a = rng.randomIntBetween(3, 12) // Menge 1
    const b = rng.randomIntBetween(20, 60) // Preis 1
    const x = rng.randomIntBetween(5, 25) // Menge 2
    const direct = rng.randomBoolean() // direkt proportional oder umgekehrt
    return { a, b, x, direct }
  },
  originalData: { a: 10, b: 40, x: 25, direct: true },
  constraint({ data }) {
    return data.a != data.x
  },
  task({ data }) {
    const { a, b, x } = data
    return (
      <p>
        {data.direct ? (
          <>
            Für {a} kg Obst zahlt man {b} €. Wie viel kostet {x} kg?
          </>
        ) : (
          <>
            {a} Arbeiter brauchen {b} Stunden für einen Job. Wie viele Stunden
            brauchen {x} Arbeiter?
          </>
        )}
      </p>
    )
  },
  solution({ data }) {
    const { a, b, x, direct } = data
    const y = direct ? (b / a) * x : (b * a) / x
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          '',
          `${data.direct ? `${pp(y)} ~€` : `${pp(y)} ~Stunden`}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
