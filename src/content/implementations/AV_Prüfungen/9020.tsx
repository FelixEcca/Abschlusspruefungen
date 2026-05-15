// exercise9020.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  fenceLength: number
  slatsPerMeter: number
  boardLength: number
  slatLength: number
  slatsTotal: number
  slatsPerBoard: number
  boards: number
}

export const exercise9020: Exercise<DATA> = {
  title: 'Teil 2: Zaunlatten',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const fenceLength = rng.randomItemFromArray([20, 30, 40, 50, 60])
    const slatsPerMeter = rng.randomItemFromArray([3, 4, 5])
    const slatLength = rng.randomItemFromArray([0.6, 0.9, 1.2])
    const boardLength = rng.randomItemFromArray([2.4, 3.6, 4.8])
    const slatsPerBoard = Math.floor(boardLength / slatLength)
    const slatsTotal = fenceLength * slatsPerMeter
    const boards = Math.ceil(slatsTotal / slatsPerBoard)

    return {
      fenceLength,
      slatsPerMeter,
      boardLength,
      slatLength,
      slatsTotal,
      slatsPerBoard,
      boards,
    }
  },

  originalData: {
    fenceLength: 40,
    slatsPerMeter: 4,
    boardLength: 3.6,
    slatLength: 0.9,
    slatsTotal: 160,
    slatsPerBoard: 4,
    boards: 40,
  },

  constraint({ data }) {
    return data.slatsPerBoard > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          An einem {data.fenceLength} m langen Zaun werden die Zaunlatten
          erneuert. Dafür sind Holzbretter mit {data.boardLength} m Länge
          vorhanden.
        </p>
        <p>
          Für einen Meter Zaun braucht man {data.slatsPerMeter} neue Latten.
          Eine Zaunlatte ist {data.slatLength * 100} cm lang.
        </p>

        <svg viewBox="0 0 180 100">
          {Array.from({ length: 4 }, (_, i) => (
            <rect
              key={i}
              x={25 + i * 25}
              y="20"
              width="10"
              height="60"
              fill="#555"
            />
          ))}
          <line
            x1="15"
            y1="35"
            x2="130"
            y2="35"
            stroke="black"
            strokeWidth="3"
          />
          <line
            x1="15"
            y1="65"
            x2="130"
            y2="65"
            stroke="black"
            strokeWidth="3"
          />
          <text x="45" y="95" fontSize="12">
            1 m
          </text>
        </svg>

        <p>Berechnen Sie, wie viele Holzbretter zersägt werden müssen.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird die Anzahl der Latten berechnet.</p>
        <InlineMath
          math={`${data.fenceLength}\\cdot ${data.slatsPerMeter}=${data.slatsTotal}`}
        />
        <p>Dann wird berechnet, wie viele Latten aus einem Brett entstehen.</p>
        <InlineMath
          math={`${data.boardLength}:${data.slatLength}=${data.slatsPerBoard}`}
        />
        <p>Nun wird die benötigte Anzahl an Brettern berechnet.</p>
        <InlineMath
          math={`${data.slatsTotal}:${data.slatsPerBoard}=${data.boards}`}
        />
        <p>
          Es müssen <b>{data.boards} Holzbretter</b> zersägt werden.
        </p>
      </>
    )
  },
}
