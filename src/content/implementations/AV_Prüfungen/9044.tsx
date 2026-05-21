// exercise9044.tsx
import { Exercise } from '@/data/types'
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
        <p>
          Im Raum sollen an den Wänden entlang Fußbodenleisten verlegt werden.
        </p>

        <p>Keine Leisten werden an der Küchenzeile und an der Tür verlegt.</p>

        <p>
          Der Raum ist {data.roomL} m lang und {data.roomW} m breit.
        </p>

        <p>
          Die Küchenzeile ist {data.kitchenL} m lang und {data.kitchenW} m
          breit.
        </p>

        <p>Die Tür ist {data.door} m breit.</p>

        <p>Berechnen Sie, wie viele Meter Fußbodenleisten benötigt werden.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Umfang des Raums:</p>

        <InlineMath
          math={`2\\cdot ${data.roomL}+2\\cdot ${data.roomW}=${data.perimeter}`}
        />

        <p>Küchenzeile und Tür werden abgezogen:</p>

        <InlineMath
          math={`${data.perimeter}-${data.kitchenL}-${data.kitchenW}-${data.door}=${data.result}`}
        />

        <p>
          Es werden <b>{data.result} m</b> Fußbodenleisten benötigt.
        </p>
      </>
    )
  },
}
