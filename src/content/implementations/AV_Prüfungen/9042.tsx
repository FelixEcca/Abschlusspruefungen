// exercise9042.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'papageien' | 'kaninchen' | 'hamster' | 'meerschweinchen'

interface DATA {
  kontext: Kontext
  count: number
  widthM: number
  depthCm: number
  heightM: number
  minPerAnimal: number
  volume: number
  needed: number
  enough: boolean
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getAnimal(data: DATA) {
  if (data.kontext === 'kaninchen') return 'Kaninchen'
  if (data.kontext === 'hamster') return 'Hamster'
  if (data.kontext === 'meerschweinchen') return 'Meerschweinchen'
  return 'Papageien'
}

export const exercise9042: Exercise<DATA> = {
  title: 'Teil 2: Volumen prüfen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'papageien',
      'kaninchen',
      'hamster',
      'meerschweinchen',
    ])

    const count = rng.randomItemFromArray([2, 3, 4])
    const widthM = rng.randomItemFromArray([1.2, 1.5, 1.8, 2])
    const depthCm = rng.randomItemFromArray([60, 80, 100, 120])
    const heightM = rng.randomItemFromArray([1.2, 1.5, 2, 2.2])
    const minPerAnimal = rng.randomItemFromArray([0.5, 1, 1.5, 2])

    const volume = round2(widthM * (depthCm / 100) * heightM)
    const needed = round2(count * minPerAnimal)
    const enough = volume >= needed

    return {
      kontext,
      count,
      widthM,
      depthCm,
      heightM,
      minPerAnimal,
      volume,
      needed,
      enough,
    }
  },

  originalData: {
    kontext: 'papageien',
    count: 2,
    widthM: 1.5,
    depthCm: 80,
    heightM: 2.2,
    minPerAnimal: 2,
    volume: 2.64,
    needed: 4,
    enough: false,
  },

  constraint({ data }) {
    return data.volume > 0
  },

  task({ data }) {
    const animal = getAnimal(data)

    return (
      <>
        <p>
          Ein Kunde möchte {data.count} {animal} zusammen in einem Käfig halten.
        </p>
        <p>
          Der Käfig ist {pp(data.widthM)} m breit, {data.depthCm} cm tief und{' '}
          {pp(data.heightM)} m hoch.
        </p>
        <p>Ein Tier braucht mindestens {pp(data.minPerAnimal)} m³ Platz.</p>
        <p>Berechnen Sie, ob der Käfig groß genug ist.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird die Tiefe in Meter umgerechnet:</p>
        <InlineMath
          math={`${data.depthCm}\\,cm=${pp(data.depthCm / 100)}\\,m`}
        />

        <p>Dann wird das Volumen berechnet:</p>
        <InlineMath
          math={`V=${pp(data.widthM)}\\cdot ${pp(data.depthCm / 100)}\\cdot ${pp(
            data.heightM,
          )}=${pp(data.volume)}\\,m^3`}
        />

        <p>Benötigter Platz:</p>
        <InlineMath
          math={`${data.count}\\cdot ${pp(data.minPerAnimal)}=${pp(
            data.needed,
          )}\\,m^3`}
        />

        <p>
          Ergebnis:{' '}
          <b>
            {data.enough
              ? 'Der Käfig ist groß genug.'
              : 'Der Käfig ist nicht groß genug.'}
          </b>
        </p>
      </>
    )
  },
}
