// exercise9556.tsx
import { Exercise } from '@/data/types'

type Figure =
  | 'rechteck'
  | 'quadrat'
  | 'dreieck'
  | 'kreis'
  | 'trapez'
  | 'parallelogramm'

interface DATA {
  figure: Figure
}

function label(figure: Figure) {
  if (figure === 'rechteck') return 'Rechteck'
  if (figure === 'quadrat') return 'Quadrat'
  if (figure === 'dreieck') return 'Dreieck'
  if (figure === 'kreis') return 'Kreis'
  if (figure === 'trapez') return 'Trapez'
  return 'Parallelogramm'
}

export const exercise9556: Exercise<DATA> = {
  title: 'Figuren benennen',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const figure: Figure = rng.randomItemFromArray([
      'rechteck',
      'quadrat',
      'dreieck',
      'kreis',
      'trapez',
      'parallelogramm',
    ])
    return { figure }
  },

  originalData: { figure: 'rechteck' },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Benennen Sie die dargestellte Figur.</p>

        <svg viewBox="0 0 328 180">
          {data.figure === 'rechteck' && (
            <rect
              x="70"
              y="50"
              width="180"
              height="80"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          )}

          {data.figure === 'quadrat' && (
            <rect
              x="105"
              y="35"
              width="110"
              height="110"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          )}

          {data.figure === 'dreieck' && (
            <polygon
              points="70,135 250,135 160,35"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          )}

          {data.figure === 'kreis' && (
            <circle
              cx="164"
              cy="90"
              r="60"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          )}

          {data.figure === 'trapez' && (
            <polygon
              points="90,135 240,135 205,50 125,50"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          )}

          {data.figure === 'parallelogramm' && (
            <polygon
              points="90,135 230,135 260,50 120,50"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          )}
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <p>
        Die Figur heißt <b>{label(data.figure)}</b>.
      </p>
    )
  },
}
