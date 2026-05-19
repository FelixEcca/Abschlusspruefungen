// exercise9583.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  a: number
  b: number
  c: number
  unit: Unit
  surface: number
}

export const exercise9583: Exercise<DATA> = {
  title: 'Oberfläche Quader',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const a = rng.randomItemFromArray([4, 5, 6, 8, 10, 12])
    const b = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const c = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const surface = 2 * (a * b + a * c + b * c)
    return { a, b, c, unit, surface }
  },

  originalData: {
    a: 8,
    b: 5,
    c: 3,
    unit: 'cm',
    surface: 158,
  },

  constraint({ data }) {
    return data.surface > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die Oberfläche des Quaders.</p>

        <svg viewBox="0 0 300 200">
          <rect x="55" y="75" width="140" height="80" fill="#eee" stroke="black" />
          <rect x="95" y="45" width="140" height="80" fill="#ddd" stroke="black" />
          <line x1="55" y1="75" x2="95" y2="45" stroke="black" />
          <line x1="195" y1="75" x2="235" y2="45" stroke="black" />
          <line x1="195" y1="155" x2="235" y2="125" stroke="black" />
          <line x1="235" y1="45" x2="235" y2="125" stroke="black" />

          <text x="120" y="178" fontSize="14">
            a = {pp(data.a)} {data.unit}
          </text>
          <text x="22" y="118" fontSize="14">
            b = {pp(data.b)} {data.unit}
          </text>
          <text x="220" y="165" fontSize="14">
            c = {pp(data.c)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    const ab = data.a * data.b
    const ac = data.a * data.c
    const bc = data.b * data.c

    return (
      <>
        <p>Ein Quader hat jeweils zwei gleiche Flächen.</p>
        <InlineMath math={`O=2\\cdot(a\\cdot b+a\\cdot c+b\\cdot c)`} />
        <p>Einsetzen:</p>
        <InlineMath
          math={`O=2\\cdot(${pp(data.a)}\\cdot ${pp(data.b)}+${pp(data.a)}\\cdot ${pp(data.c)}+${pp(data.b)}\\cdot ${pp(data.c)})`}
        />
        <br />
        <InlineMath
          math={`O=2\\cdot(${pp(ab)}+${pp(ac)}+${pp(bc)})=${pp(data.surface)}\\,\\mathrm{${data.unit}}^2`}
        />
        <p>
          Die Oberfläche beträgt <b>{pp(data.surface)} {data.unit}²</b>.
        </p>
      </>
    )
  },
}