import { Exercise } from '@/data/types'

interface DATA {
  voltage: number
  current: number
}

export const exercise14001: Exercise<DATA> = {
  title: 'Elektrischen Widerstand berechnen',
  source: 'AV BFK Elektrotechnik',
  useCalculator: false,
  duration: 5,
  points: 2,
  generator(rng) {
    return {
      voltage: rng.randomIntBetween(-24, 24, 6),
      current: rng.randomBoolean()
        ? rng.randomIntBetween(-500, -100, 50)
        : rng.randomIntBetween(100, 500, 50),
    }
  },
  originalData: {
    voltage: 12,
    current: 200,
  },
  task({ data }) {
    return (
      <p>
        Eine kleine LED-Leuchte wird mit einer Spannung von {data.voltage} V
        betrieben. Durch ihren Wiederstand fließt ein Strom von {data.current}{' '}
        A. Berechne den elektrischen Widerstand.
      </p>
    )
  },
  solution({ data }) {
    const resistance = Number((data.voltage / data.current).toFixed(3))
      .toString()
      .replace('.', ',')

    return <p>Der elektrische Widerstand beträgt {resistance} Ω.</p>
  },
}
