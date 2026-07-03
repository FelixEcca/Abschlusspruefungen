// exercise9584.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  r: number
  h: number
  unit: Unit
  surface: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9584: Exercise<DATA> = {
  title: 'Oberfläche Zylinder',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const h = rng.randomItemFromArray([5, 6, 8, 10, 12, 15])
    const surface = round2(2 * Math.PI * r * r + 2 * Math.PI * r * h)

    return { r, h, unit, surface }
  },

  originalData: {
    r: 4,
    h: 10,
    unit: 'cm',
    surface: 351.86,
  },

  constraint({ data }) {
    return data.surface > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die Oberfläche des Zylinders.</p>

        <svg viewBox="0 0 260 210">
          <rect
            x="70"
            y="55"
            width="120"
            height="100"
            fill="#eee"
            stroke="black"
          />
          <ellipse
            cx="130"
            cy="55"
            rx="60"
            ry="20"
            fill="#ddd"
            stroke="black"
          />

          <ellipse
            cx="130"
            cy="155"
            rx="60"
            ry="20"
            fill="#eee"
            stroke="black"
          />

          <line x1="130" y1="55" x2="190" y2="55" stroke="black" />
          <text x="150" y="48" fontSize="14">
            r = {pp(data.r)} {data.unit}
          </text>
          <text x="198" y="110" fontSize="14">
            h = {pp(data.h)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    const top = round2(Math.PI * data.r * data.r)
    const bottom = round2(Math.PI * data.r * data.r)
    const mantle = round2(2 * Math.PI * data.r * data.h)

    return (
      <>
        <p>
          Die Oberfläche besteht aus oberer Kreisfläche, unterer Kreisfläche und
          Mantelfläche.
        </p>
        <svg viewBox="0 0 360 250" className="my-2 w-full max-w-lg">
          <rect
            x="120"
            y="60"
            width="120"
            height="110"
            fill="#f3f4f6"
            stroke="black"
          />
          <ellipse
            cx="180"
            cy="60"
            rx="60"
            ry="20"
            fill="#e5e7eb"
            stroke="black"
          />
          <ellipse
            cx="180"
            cy="170"
            rx="60"
            ry="20"
            fill="#f3f4f6"
            stroke="black"
          />

          <text x="32" y="48" fontSize="13">
            A1 (oben) = {pp(top)} {data.unit}²
          </text>
          <text x="32" y="67" fontSize="13">
            A2 (unten) = {pp(bottom)} {data.unit}²
          </text>
          <text x="32" y="86" fontSize="13">
            A3 (Mantel) = {pp(mantle)} {data.unit}²
          </text>
        </svg>
        <p>1) Obere Kreisfläche:</p>
        <InlineMath
          math={`A_1=\\pi\\cdot ${pp(data.r)}^2\\approx ${pp(top)}\\,\\mathrm{${data.unit}}^2`}
        />
        <p>2) Untere Kreisfläche:</p>
        <InlineMath
          math={`A_2=\\pi\\cdot ${pp(data.r)}^2\\approx ${pp(bottom)}\\,\\mathrm{${data.unit}}^2`}
        />
        <p>3) Mantelfläche:</p>
        <InlineMath
          math={`A_3=2\\cdot \\pi\\cdot ${pp(data.r)}\\cdot ${pp(data.h)}\\approx ${pp(mantle)}\\,\\mathrm{${data.unit}}^2`}
        />
        <p>4) Alles addieren:</p>
        <InlineMath
          math={`O=A_1+A_2+A_3=${pp(top)}+${pp(bottom)}+${pp(mantle)}=${pp(data.surface)}\\,\\mathrm{${data.unit}}^2`}
        />
        <p>
          Die Oberfläche beträgt ungefähr{' '}
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
            src="https://www.youtube.com/embed/O-VmGO6I61w"
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
