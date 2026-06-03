// exercise9044.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  roomL: number
  roomW: number
  kitchenL: number
  kitchenW: number
  door: number
  perimeter: number
  result: number
}

export const exercise9044: Exercise<DATA> = {
  title: 'Teil 2: Fußbodenleisten',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const roomL = rng.randomItemFromArray([6, 7, 8])
    const roomW = rng.randomItemFromArray([3, 4, 5])

    const kitchenL = rng.randomItemFromArray([1.5, 2, 2.5])
    const kitchenW = rng.randomItemFromArray([1, 1.5, 2])

    const door = rng.randomItemFromArray([0.8, 0.9, 1])

    const perimeter = 2 * roomL + 2 * roomW
    const result = perimeter - kitchenL - kitchenW - door

    return {
      roomL,
      roomW,
      kitchenL,
      kitchenW,
      door,
      perimeter,
      result,
    }
  },

  originalData: {
    roomL: 7,
    roomW: 3,
    kitchenL: 2.5,
    kitchenW: 1.5,
    door: 0.9,
    perimeter: 20,
    result: 15.1,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    return (
      <>
        <svg viewBox="0 0 420 220">
          <rect
            x="40"
            y="50"
            width="300"
            height="120"
            fill="#ccc"
            stroke="black"
          />

          <rect
            x="40"
            y="50"
            width="110"
            height="60"
            fill="white"
            stroke="black"
          />

          <text x="55" y="85" fontSize="14">
            Küchenzeile
          </text>

          <text x="155" y="190" fontSize="14">
            {data.roomL} m
          </text>

          <text x="350" y="120" fontSize="14">
            {data.roomW} m
          </text>

          <text x="75" y="40" fontSize="14">
            {pp(data.kitchenL)} m
          </text>

          <text x="10" y="90" fontSize="14">
            {pp(data.kitchenW)} m
          </text>
          <line x1="340" y1="80" x2="340" y2="110" stroke="black" />
          <line x1="340" y1="110" x2="310" y2="110" stroke="black" />
          <path d="M 340 80 A 30 30 0 0 0 310 110" fill="none" stroke="black" />
        </svg>
        <p>
          Im Raum sollen an den Wänden entlang Fußbodenleisten verlegt werden.
        </p>

        <p>Keine Leisten werden an der Küchenzeile und an der Tür verlegt.</p>

        <p>
          Der Raum ist {pp(data.roomL)} m lang und {pp(data.roomW)} m breit.
        </p>

        <p>
          Die Küchenzeile ist {pp(data.kitchenL)} m lang und {pp(data.kitchenW)}{' '}
          m breit.
        </p>

        <p>Die Tür ist {pp(data.door)} m breit.</p>

        <p>Berechnen Sie, wie viele Meter Fußbodenleisten benötigt werden.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Umfang des Raums:</p>

        <InlineMath
          math={`2\\cdot ${pp(data.roomL)}+2\\cdot ${pp(data.roomW)}=${pp(data.perimeter)}\\,m`}
        />

        <p>Küchenzeile und Tür werden abgezogen:</p>

        <InlineMath
          math={`${pp(data.perimeter)}-${pp(data.kitchenL)}-${pp(data.kitchenW)}-${pp(data.door)}=${pp(data.result)}\\,m`}
        />

        <p>
          Es werden <b>{pp(data.result)} m</b> Fußbodenleisten benötigt.
        </p>
      </>
    )
  },
}
