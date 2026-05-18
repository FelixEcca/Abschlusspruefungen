// exercise9553.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  divisor: number
  quotient: number
  dividend: number
}

export const exercise9553: Exercise<DATA> = {
  title: 'Schriftliches Dividieren',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const divisor = rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 9, 12])
    const quotient = rng.randomIntBetween(12, 250)
    const dividend = divisor * quotient

    return { divisor, quotient, dividend }
  },

  originalData: {
    divisor: 6,
    quotient: 48,
    dividend: 288,
  },

  constraint({ data }) {
    return data.dividend % data.divisor === 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie schriftlich:</p>
        <InlineMath math={`${data.dividend}:${data.divisor}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Teile Schritt für Schritt von links nach rechts.</p>
        <p>Kontrolle: Ergebnis mal Divisor ergibt wieder die Startzahl.</p>
        <InlineMath
          math={`${data.dividend}:${data.divisor}=${data.quotient}`}
        />
        <br />
        <InlineMath
          math={`${data.quotient}\\cdot ${data.divisor}=${data.dividend}`}
        />
        <p>
          Ergebnis: <b>{data.quotient}</b>
        </p>
      </>
    )
  },
}
