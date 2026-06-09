// exercise5119.tsx
import { Exercise } from '@/data/types'

type GraphType = 'wachstum' | 'zerfall' | 'beschraenkt'

interface DATA {
  graphType: GraphType
}

function getLabel(type: GraphType) {
  if (type === 'wachstum') return 'exponentielles Wachstum'
  if (type === 'zerfall') return 'exponentieller Zerfall'
  return 'beschränktes Wachstum'
}

export const exercise5119: Exercise<DATA> = {
  title: 'Wachstumsart erkennen',
  source: 'Exponentialfunktionen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const graphType: GraphType = rng.randomItemFromArray([
      'wachstum',
      'zerfall',
      'beschraenkt',
    ])

    return { graphType }
  },

  originalData: {
    graphType: 'wachstum',
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Entscheiden Sie, welche Wachstumsart der Graph zeigt: exponentielles
          Wachstum, exponentieller Zerfall oder beschränktes Wachstum.
        </p>

        <svg viewBox="0 0 360 260">
          {/* Achsen */}
          <line x1="40" y1="220" x2="330" y2="220" stroke="black" />
          <line x1="55" y1="220" x2="55" y2="25" stroke="black" />

          {/* Pfeile */}
          <polygon points="330,220 318,215 318,225" fill="black" />
          <polygon points="55,25 50,37 60,37" fill="black" />

          {/* Achsenbeschriftung */}
          <text x="335" y="225" fontSize="12">
            x
          </text>
          <text x="28" y="25" fontSize="12">
            y
          </text>

          {data.graphType === 'wachstum' && (
            <path
              d="M 55 205 C 115 202, 175 175, 300 45"
              fill="none"
              stroke="black"
              strokeWidth="3"
            />
          )}

          {data.graphType === 'zerfall' && (
            <>
              <path
                d="M 55 45 C 105 90, 180 160, 305 198"
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
            </>
          )}

          {data.graphType === 'beschraenkt' && (
            <>
              <path
                d="M 55 210 C 110 155, 185 100, 305 78"
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
            </>
          )}
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Der Graph zeigt:</p>
        <p>
          <b>{getLabel(data.graphType)}</b>
        </p>

        {data.graphType === 'wachstum' && (
          <p>Der Graph steigt immer schneller an.</p>
        )}

        {data.graphType === 'zerfall' && (
          <p>Der Graph fällt und nähert sich einer waagrechten Grenze.</p>
        )}

        {data.graphType === 'beschraenkt' && (
          <p>Der Graph steigt und nähert sich einer oberen Grenze.</p>
        )}
      </>
    )
  },
}
