import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  ratioW: number
  ratioH: number
  diagonal: number
  context: string
}

export const exercise10060: Exercise<DATA> = {
  title: 'Seitenlängen aus Diagonale und Seitenverhältnis berechnen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 14,
  points: 14,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { ratioW: 16, ratioH: 9, diagonal: 40, context: 'Monitor' },
      { ratioW: 4, ratioH: 3, diagonal: 25, context: 'Tablet' },
      { ratioW: 16, ratioH: 10, diagonal: 34, context: 'Grafiktablett' },
      { ratioW: 21, ratioH: 9, diagonal: 55, context: 'Ultrawide-Display' },
    ])
  },
  originalData: { ratioW: 16, ratioH: 9, diagonal: 40, context: 'Monitor' },
  task({ data }) {
    return (
      <>
        <p>
          Ein {data.context} hat das Seitenverhältnis{' '}
          <b>
            {data.ratioW}:{data.ratioH}
          </b>{' '}
          und eine Diagonale von <b>{pp(data.diagonal)} cm</b>.
        </p>
        <p>Berechnen Sie Breite und Höhe des Displays.</p>
        <svg viewBox="0 0 320 190" className="my-3 max-w-sm">
          <rect x="45" y="35" width="230" height="125" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="3" />
          <line x1="45" y1="160" x2="275" y2="35" stroke="#dc2626" strokeWidth="3" />
          <text x="130" y="108" fontSize="13" fill="#991b1b">{pp(data.diagonal)} cm</text>
          <text x="125" y="180" fontSize="13">Breite ?</text>
          <text x="280" y="100" fontSize="13" transform="rotate(90 280 100)">Höhe ?</text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    const diagonalParts = Math.sqrt(data.ratioW ** 2 + data.ratioH ** 2)
    const factor = data.diagonal / diagonalParts
    const width = data.ratioW * factor
    const height = data.ratioH * factor
    return (
      <>
        <p>
          Beim Verhältnis {data.ratioW}:{data.ratioH} kann man die Breite als{' '}
          <InlineMath math={`${data.ratioW}x`} /> und die Höhe als{' '}
          <InlineMath math={`${data.ratioH}x`} /> schreiben.
        </p>
        <p>Mit der Diagonale entsteht ein rechtwinkliges Dreieck.</p>
        <p>
          <InlineMath
            math={`(${data.ratioW}x)^2+(${data.ratioH}x)^2=${pp(data.diagonal)}^2`}
          />
        </p>
        <p>
          <InlineMath
            math={`${data.ratioW ** 2}x^2+${data.ratioH ** 2}x^2=${data.diagonal ** 2}`}
          />
        </p>
        <p>
          <InlineMath
            math={`${data.ratioW ** 2 + data.ratioH ** 2}x^2=${data.diagonal ** 2}`}
          />
        </p>
        <p>
          <InlineMath
            math={`x=${pp(data.diagonal)}:\\sqrt{${data.ratioW ** 2 + data.ratioH ** 2}}\\approx${pp(factor)}`}
          />
        </p>
        <p>
          Breite:{' '}
          <InlineMath math={`${data.ratioW}\\cdot${pp(factor)}\\approx${pp(width)}\\,\\mathrm{cm}`} />
        </p>
        <p>
          Höhe:{' '}
          <InlineMath math={`${data.ratioH}\\cdot${pp(factor)}\\approx${pp(height)}\\,\\mathrm{cm}`} />
        </p>
        <p>
          Das Display ist etwa <b>{pp(width)} cm</b> breit und{' '}
          <b>{pp(height)} cm</b> hoch.
        </p>
      </>
    )
  },
}
