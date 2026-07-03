// exercise9557.tsx
import { Exercise } from '@/data/types'

type Figure = 'rechteck' | 'quadrat' | 'trapez' | 'parallelogramm'

interface DATA {
  figure: Figure
}

function name(figure: Figure) {
  if (figure === 'rechteck') return 'Rechteck'
  if (figure === 'quadrat') return 'Quadrat'
  if (figure === 'trapez') return 'Trapez'
  return 'Parallelogramm'
}

function solutionText(figure: Figure) {
  if (figure === 'rechteck') {
    return (
      <>
        <p>Ein Rechteck hat vier rechte Winkel.</p>
        <p>Gegenüberliegende Seiten sind gleich lang.</p>
      </>
    )
  }

  if (figure === 'quadrat') {
    return (
      <>
        <p>Ein Quadrat hat vier rechte Winkel.</p>
        <p>Alle vier Seiten sind gleich lang.</p>
      </>
    )
  }

  if (figure === 'trapez') {
    return (
      <>
        <p>Ein Trapez hat vier Seiten.</p>
        <p>Mindestens zwei gegenüberliegende Seiten sind parallel.</p>
      </>
    )
  }

  return (
    <>
      <p>Ein Parallelogramm hat vier Seiten.</p>
      <p>Gegenüberliegende Seiten sind parallel und gleich lang.</p>
    </>
  )
}

function figureSketch(figure: Figure) {
  return (
    <svg viewBox="0 0 320 180" className="my-2 w-full max-w-sm">
      {figure === 'rechteck' && (
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

      {figure === 'quadrat' && (
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

      {figure === 'trapez' && (
        <polygon
          points="90,135 240,135 205,50 125,50"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      )}

      {figure === 'parallelogramm' && (
        <polygon
          points="90,135 230,135 260,50 120,50"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      )}
    </svg>
  )
}

export const exercise9557: Exercise<DATA> = {
  title: 'Eigenschaften von Figuren',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const figure: Figure = rng.randomItemFromArray([
      'rechteck',
      'quadrat',
      'trapez',
      'parallelogramm',
    ])
    return { figure }
  },

  originalData: { figure: 'quadrat' },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Nennen Sie die Eigenschaften der Figur.</p>
        <p>
          Figur: <b>{name(data.figure)}</b>
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        {figureSketch(data.figure)}
        {solutionText(data.figure)}
      </>
    )
  },
}
