// exercise9533.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  r: number
  h: number
  v: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9533: Exercise<DATA> = {
  title: 'Zylinder Volumen',
  source: 'Geometrie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const r = rng.randomItemFromArray([3, 4, 5, 10, 15, 20])
    const h = rng.randomItemFromArray([10, 12, 15, 20, 50, 100])
    const v = round2(Math.PI * r * r * h)

    return { r, h, v }
  },

  originalData: {
    r: 5,
    h: 20,
    v: 1570.8,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Zylinder hat einen Radius von {data.r} cm und eine Höhe von{' '}
          {data.h} cm.
        </p>

        <svg viewBox="0 0 320 220" className="my-2 w-full max-w-sm">
          <ellipse
            cx="160"
            cy="55"
            rx="70"
            ry="20"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="90"
            y1="55"
            x2="90"
            y2="165"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="230"
            y1="55"
            x2="230"
            y2="165"
            stroke="black"
            strokeWidth="2"
          />
          <ellipse
            cx="160"
            cy="165"
            rx="70"
            ry="20"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          <line
            x1="160"
            y1="55"
            x2="230"
            y2="55"
            stroke="black"
            strokeWidth="2"
          />
          <text x="196" y="46" fontSize="14" textAnchor="middle">
            r = {data.r} cm
          </text>

          <line
            x1="250"
            y1="55"
            x2="250"
            y2="165"
            stroke="black"
            strokeWidth="1.5"
          />
          <line
            x1="244"
            y1="55"
            x2="256"
            y2="55"
            stroke="black"
            strokeWidth="1.5"
          />
          <line
            x1="244"
            y1="165"
            x2="256"
            y2="165"
            stroke="black"
            strokeWidth="1.5"
          />
          <text x="242" y="114" fontSize="14">
            h = {data.h} cm
          </text>
        </svg>

        <p>Berechnen Sie das Volumen.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Einsetzen:</p>
        <InlineMath
          math={`V=\\pi\\cdot ${data.r}^2\\cdot ${data.h}\\approx ${pp(
            data.v,
          )}\\,\\mathrm{cm}^3`}
        />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/JmTtpD7Q8jo"
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
