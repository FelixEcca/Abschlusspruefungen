// exercise9585.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  a: number
  hSide: number
  unit: Unit
  baseArea: number
  sideArea: number
  surface: number
}

export const exercise9585: Exercise<DATA> = {
  title: 'Oberfläche Pyramide',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const a = rng.randomItemFromArray([4, 5, 6, 8, 10, 12])
    const hSide = rng.randomItemFromArray([4, 5, 6, 8, 10])
    const baseArea = a * a
    const sideArea = (a * hSide) / 2
    const surface = baseArea + 4 * sideArea

    return { a, hSide, unit, baseArea, sideArea, surface }
  },

  originalData: {
    a: 6,
    hSide: 5,
    unit: 'cm',
    baseArea: 36,
    sideArea: 15,
    surface: 96,
  },

  constraint({ data }) {
    return data.surface > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die Oberfläche der quadratischen Pyramide.</p>

        <svg viewBox="0 0 300 210">
          <polygon
            points="75,160 210,160 240,125 110,125"
            fill="#eee"
            stroke="black"
          />
          <line x1="75" y1="160" x2="155" y2="40" stroke="black" />
          <line x1="210" y1="160" x2="155" y2="40" stroke="black" />
          <line x1="240" y1="125" x2="155" y2="40" stroke="black" />
          <line x1="110" y1="125" x2="155" y2="40" stroke="black" />
          <line
            x1="155"
            y1="40"
            x2="142"
            y2="142"
            stroke="black"
            strokeDasharray="5 4"
          />

          <text x="132" y="184" fontSize="14">
            a = {pp(data.a)} {data.unit}
          </text>
          <text x="162" y="98" fontSize="14">
            hₛ = {pp(data.hSide)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die Oberfläche besteht aus der Grundfläche und 4 Dreiecken.</p>

        <p>Grundfläche:</p>
        <InlineMath
          math={`G=${pp(data.a)}\\cdot ${pp(data.a)}=${pp(data.baseArea)}\\,\\mathrm{${data.unit}}^2`}
        />

        <p>Ein Seitendreieck:</p>
        <InlineMath
          math={`A_D=\\frac{${pp(data.a)}\\cdot ${pp(data.hSide)}}{2}=${pp(data.sideArea)}\\,\\mathrm{${data.unit}}^2`}
        />

        <p>Oberfläche:</p>
        <InlineMath
          math={`O=G+4\\cdot A_D=${pp(data.baseArea)}+4\\cdot ${pp(data.sideArea)}=${pp(data.surface)}\\,\\mathrm{${data.unit}}^2`}
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
            src="https://www.youtube.com/embed/kSxeMtSysqA"
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
