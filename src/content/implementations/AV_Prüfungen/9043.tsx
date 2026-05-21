// exercise9043.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  roomL: number
  roomW: number
  kitchenL: number
  kitchenW: number
  price: number
  areaRoom: number
  areaKitchen: number
  areaFloor: number
  total: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9043: Exercise<DATA> = {
  title: 'Teil 2: Bodenbelag',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const roomL = rng.randomItemFromArray([6, 7, 8])
    const roomW = rng.randomItemFromArray([3, 4, 5])

    const kitchenL = rng.randomItemFromArray([1.5, 2, 2.5])
    const kitchenW = rng.randomItemFromArray([1, 1.5, 2])

    const price = rng.randomItemFromArray([12.8, 13.8, 15.5, 18.2])

    const areaRoom = roomL * roomW
    const areaKitchen = kitchenL * kitchenW
    const areaFloor = areaRoom - areaKitchen
    const total = round2(areaFloor * price)

    return {
      roomL,
      roomW,
      kitchenL,
      kitchenW,
      price,
      areaRoom,
      areaKitchen,
      areaFloor,
      total,
    }
  },

  originalData: {
    roomL: 7,
    roomW: 3,
    kitchenL: 2.5,
    kitchenW: 1.5,
    price: 13.8,
    areaRoom: 21,
    areaKitchen: 3.75,
    areaFloor: 17.25,
    total: 238.05,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Der Grundriss eines Partyraums ist dargestellt.</p>

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
        </svg>

        <p>Der Boden kostet {pp(data.price)} € pro Quadratmeter.</p>

        <p>Im Bereich der Küchenzeile muss kein Boden verlegt werden.</p>

        <p>Berechnen Sie die Kosten für den Bodenbelag.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Fläche des ganzen Raums:</p>

        <InlineMath
          math={`${data.roomL}\\cdot ${data.roomW}=${pp(data.areaRoom)}\\,m^2`}
        />

        <p>Fläche der Küchenzeile:</p>

        <InlineMath
          math={`${pp(data.kitchenL)}\\cdot ${pp(
            data.kitchenW,
          )}=${pp(data.areaKitchen)}\\,m^2`}
        />

        <p>Benötigte Bodenfläche:</p>

        <InlineMath
          math={`${pp(data.areaRoom)}-${pp(data.areaKitchen)}=${pp(
            data.areaFloor,
          )}\\,m^2`}
        />

        <p>Kosten berechnen:</p>

        <InlineMath
          math={`${pp(data.areaFloor)}\\cdot ${pp(data.price)}=${pp(
            data.total,
          )}\\,€`}
        />
      </>
    )
  },
}
