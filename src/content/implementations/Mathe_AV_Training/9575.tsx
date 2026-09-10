// exercise9575.tsx
import { Exercise } from '@/data/types'

type Body = 'würfel' | 'quader' | 'zylinder' | 'kegel' | 'kugel' | 'pyramide'

interface DATA {
  body: Body
}

function getName(body: Body) {
  if (body === 'würfel') return 'Würfel'
  if (body === 'quader') return 'Quader'
  if (body === 'zylinder') return 'Zylinder'
  if (body === 'kegel') return 'Kegel'
  if (body === 'kugel') return 'Kugel'
  return 'Pyramide'
}

export const exercise9575: Exercise<DATA> = {
  title: 'Körper benennen',
  source: 'Körper und Volumen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const body: Body = rng.randomItemFromArray([
      'würfel',
      'quader',
      'zylinder',
      'kegel',
      'kugel',
      'pyramide',
    ])

    return { body }
  },

  originalData: {
    body: 'zylinder',
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Wie heißt dieser Körper?</p>

        {data.body === 'würfel' && (
          <svg viewBox="0 0 220 180">
            <rect
              x="80"
              y="30"
              width="80"
              height="80"
              fill="#ddd"
              stroke="black"
            />
            <rect
              x="50"
              y="50"
              width="80"
              height="80"
              fill="#eee"
              stroke="black"
            />

            <polygon
              points="130,50 130,130  160,110 160,30"
              fill="#ddd"
              stroke="black"
            />
            <polygon
              points="80,30 50,50  130,50 160,30"
              fill="#ddd"
              stroke="black"
            />
          </svg>
        )}

        {data.body === 'quader' && (
          <svg viewBox="0 0 260 180">
            <rect
              x="40"
              y="60"
              width="120"
              height="70"
              fill="#eee"
              stroke="black"
            />

            <polygon
              points="200,105 160,130  160,60 200,35"
              fill="#ddd"
              stroke="black"
            />
            <polygon
              points="80,35 40,60  160,60 200,35"
              fill="#ddd"
              stroke="black"
            />
          </svg>
        )}

        {data.body === 'zylinder' && (
          <svg viewBox="0 0 220 180">
            <rect
              x="60"
              y="45"
              width="100"
              height="90"
              fill="#eee"
              stroke="black"
            />
            <ellipse
              cx="110"
              cy="45"
              rx="50"
              ry="18"
              fill="#ddd"
              stroke="black"
            />
            <ellipse
              cx="110"
              cy="135"
              rx="50"
              ry="18"
              fill="#eee"
              stroke="black"
            />
          </svg>
        )}

        {data.body === 'kegel' && (
          <svg viewBox="0 0 220 180">
            <ellipse
              cx="110"
              cy="135"
              rx="55"
              ry="18"
              fill="#eee"
              stroke="black"
            />
            <line x1="55" y1="135" x2="110" y2="35" stroke="black" />
            <line x1="165" y1="135" x2="110" y2="35" stroke="black" />
          </svg>
        )}

        {data.body === 'kugel' && (
          <svg viewBox="0 0 220 180">
            <circle cx="110" cy="90" r="60" fill="#eee" stroke="black" />
            <ellipse
              cx="110"
              cy="90"
              rx="60"
              ry="18"
              fill="none"
              stroke="black"
            />
          </svg>
        )}

        {data.body === 'pyramide' && (
          <svg viewBox="0 0 220 180">
            <polygon
              points="60,130 160,130 110,50"
              fill="#eee"
              stroke="black"
            />
            <line x1="110" y1="50" x2="190" y2="110" stroke="black" />
            <line x1="160" y1="130" x2="190" y2="110" stroke="black" />
            <line x1="60" y1="130" x2="190" y2="110" stroke="black" />
          </svg>
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <p>
        Der Körper heißt <b>{getName(data.body)}</b>.
      </p>
    )
  },
}
