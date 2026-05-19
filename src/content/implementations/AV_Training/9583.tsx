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
          <rect
            x="95"
            y="45"
            width="140"
            height="80"
            fill="#ddd"
            stroke="black"
          />
          <rect
            x="55"
            y="75"
            width="140"
            height="80"
            fill="#eee"
            stroke="black"
          />

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
    const f1 = data.a * data.b
    const f2 = data.a * data.b
    const f3 = data.a * data.c
    const f4 = data.a * data.c
    const f5 = data.b * data.c
    const f6 = data.b * data.c

    return (
      <>
        <p>Der Quader hat 6 Flächen. Jede Fläche wird einzeln berechnet:</p>
        <svg viewBox="0 0 420 250" className="my-2 w-full max-w-xl">
          <rect
            x="125"
            y="35"
            width="160"
            height="95"
            fill="#e5e7eb"
            stroke="black"
          />
          <rect
            x="80"
            y="75"
            width="160"
            height="95"
            fill="#f3f4f6"
            stroke="black"
          />

          <line x1="80" y1="75" x2="125" y2="35" stroke="black" />
          <line x1="240" y1="75" x2="285" y2="35" stroke="black" />
          <line x1="240" y1="170" x2="285" y2="130" stroke="black" />
          <line x1="285" y1="35" x2="285" y2="130" stroke="black" />

          <line
            x1="80"
            y1="170"
            x2="125"
            y2="130"
            stroke="black"
            strokeDasharray="4 3"
          />
          <line
            x1="125"
            y1="130"
            x2="285"
            y2="130"
            stroke="black"
            strokeDasharray="4 3"
          />
          <line
            x1="125"
            y1="35"
            x2="125"
            y2="130"
            stroke="black"
            strokeDasharray="4 3"
          />
        </svg>
        <p>Dann werden alle 6 Flächen addiert:</p>
        <InlineMath
          math={`O=${pp(f1)}+${pp(f2)}+${pp(f3)}+${pp(f4)}+${pp(f5)}+${pp(f6)}=${pp(data.surface)}\\,\\mathrm{${data.unit}}^2`}
        />
        <p>
          Die Oberfläche beträgt{' '}
          <b>
            {pp(data.surface)} {data.unit}²
          </b>
          .
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/G4AsydQwZPE"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
