import { Exercise } from '@/data/types'

interface DATA {
  minutes1: number
  irons: number
  pieces1: number
  minutes2: number
  pieces2: number
}

export const exercise9055: Exercise<DATA> = {
  title: 'Teil 1: Waffeln backen',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const minutes1 = rng.randomItemFromArray([3, 4, 5, 6])
    const irons = rng.randomItemFromArray([2, 3, 4])
    const pieces1 = rng.randomItemFromArray([6, 8, 12, 15, 18])
    const minutes2 = rng.randomItemFromArray([7, 8, 10, 12])
    const pieces2 = (pieces1 / minutes1) * minutes2
    return { minutes1, irons, pieces1, minutes2, pieces2 }
  },

  originalData: {
    minutes1: 4,
    irons: 3,
    pieces1: 12,
    minutes2: 7,
    pieces2: 21,
  },

  constraint({ data }) {
    return Number.isInteger(data.pieces2)
  },

  task({ data }) {
    return (
      <>
        <p>
          In {data.minutes1} Minuten können Sie mit {data.irons} Waffeleisen{' '}
          {data.pieces1} Waffeln backen.
        </p>
        <p>
          Berechnen Sie, wie viele Waffeln Sie in {data.minutes2} Minuten backen
          können.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Berechne mit dem Dreisatz:</p>

        <svg viewBox="0 0 328 185">
          <image
            href="/content/AV_Prüfungen/Dreisatz.PNG"
            height="185"
            width="328"
          />
          <text x="120" y="12" fontSize="15" textAnchor="middle">
            Minuten
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            Waffeln
          </text>
          {/* obere Zeile */}
          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {data.minutes1}
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {data.pieces1}
          </text>

          {/* mittlere Zeile */}
          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {data.pieces1 / data.minutes1}
          </text>

          {/* untere Zeile */}
          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {data.minutes2}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {data.pieces2}
          </text>

          {/* Rechenpfeile links */}
          <text x="24" y="72" fontSize="14">
            : {data.minutes1}
          </text>
          <text x="22" y="123" fontSize="14">
            · {data.minutes2}
          </text>

          {/* Rechenpfeile rechts */}
          <text x="286" y="72" fontSize="14">
            : {data.minutes1}
          </text>
          <text x="284" y="123" fontSize="14">
            · {data.minutes2}
          </text>
        </svg>
      </>
    )
  },
}
