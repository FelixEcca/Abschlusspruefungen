// exercise9581.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  r: number
  unit: Unit
  volumeKugel: number
  volumeHalbkugel: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9581: Exercise<DATA> = {
  title: 'Volumen Kugel',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 10])

    const full = round2((4 / 3) * Math.PI * r * r * r)
    const half = round2(full / 2)

    return { r, unit, volumeKugel: full, volumeHalbkugel: half }
  },

  originalData: {
    r: 5,
    unit: 'cm',
    volumeKugel: 523.6,
    volumeHalbkugel: 261.8,
  },

  constraint({ data }) {
    return data.volumeKugel > 0 && data.volumeHalbkugel > 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie das Volumen der Kugel.</p>

            <svg viewBox="0 0 260 190">
              <circle cx="130" cy="95" r="65" fill="#eee" stroke="black" />
              <ellipse
                cx="130"
                cy="95"
                rx="65"
                ry="18"
                fill="none"
                stroke="black"
              />
              <line x1="130" y1="95" x2="195" y2="95" stroke="black" />

              <text x="150" y="88" fontSize="14">
                r = {pp(data.r)} {data.unit}
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Bei der Kugel gilt:</p>
            <InlineMath math="V=\frac{4}{3}\cdot \pi\cdot r^3" />
            <p>Einsetzen:</p>
            <InlineMath
              math={`V=\\frac{4}{3}\\cdot \\pi\\cdot ${pp(
                data.r,
              )}^3\\approx ${pp(data.volumeKugel)}\\,\\mathrm{${data.unit}}^3`}
            />

            <p>
              Das Volumen beträgt ungefähr{' '}
              <b>
                {pp(data.volumeKugel)} {data.unit}³
              </b>
              .
            </p>
            <h2>Erklärvideo</h2>
            <p>Hier gibt es noch ein Erklärungsvideo:</p>
            <div className="my-4">
              <iframe
                width="100%"
                height="220"
                src="https://www.youtube.com/embed/mZKwaKIDZ-k"
                title="Erklärungsvideo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded border"
              />
            </div>
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie das Volumen der Halbkugel.</p>

            <svg viewBox="0 0 260 190">
              <path
                d="M 65 105 A 65 65 0 0 1 195 105 L 65 105"
                fill="#eee"
                stroke="black"
              />
              <ellipse
                cx="130"
                cy="105"
                rx="65"
                ry="18"
                fill="none"
                stroke="black"
              />
              <line x1="130" y1="105" x2="195" y2="105" stroke="black" />

              <text x="150" y="98" fontSize="14">
                r = {pp(data.r)} {data.unit}
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Eine Halbkugel ist die Hälfte einer Kugel.</p>
            <InlineMath math="V=0,5\cdot \frac{4}{3}\cdot \pi\cdot r^3" />
            <p>Einsetzen:</p>
            <InlineMath
              math={`V=0,5\\cdot \\frac{4}{3}\\cdot \\pi\\cdot ${pp(
                data.r,
              )}^3\\approx ${pp(data.volumeHalbkugel)}\\,\\mathrm{${data.unit}}^3`}
            />

            <p>
              Das Volumen beträgt ungefähr{' '}
              <b>
                {pp(data.volumeHalbkugel)} {data.unit}³
              </b>
              .
            </p>
          </>
        )
      },
    },
  ],
}
