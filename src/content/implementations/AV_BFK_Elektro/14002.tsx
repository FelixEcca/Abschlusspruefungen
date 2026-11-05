import { Exercise } from '@/data/types'
import { BlockMath, InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  spannung: number
  widerstand: number
}

export const exercise14002: Exercise<DATA> = {
  title: 'Stromstärke mit dem Ohmschen Gesetz berechnen',
  source: 'Training – BFK-E – Elektrizitätslehre',
  useCalculator: true,
  duration: 3,
  points: 2,

  generator(rng) {
    return {
      spannung: rng.randomIntBetween(11, 24) * 10,
      widerstand: rng.randomIntBetween(2, 6) * 10,
    }
  },

  originalData: {
    spannung: 230,
    widerstand: 40,
  },

  constraint({ data }) {
    return (
      data.spannung >= 110 &&
      data.spannung <= 240 &&
      data.spannung % 10 === 0 &&
      data.widerstand >= 20 &&
      data.widerstand <= 60 &&
      data.widerstand % 10 === 0
    )
  },

  task({ data }) {
    return (
      <>
        <p>
          Die Heizspirale eines Heizlüfters für{' '}
          <InlineMath math={`${data.spannung}\\,\\mathrm{V}`} /> hat einen
          Widerstand von{' '}
          <InlineMath math={`${data.widerstand}\\,\\Omega`} />.
        </p>

        <p>
          Berechne den Strom durch die Heizspirale. Gib das Ergebnis in
          Ampere an.
        </p>
      </>
    )
  },

  solution({ data }) {
    const strom = data.spannung / data.widerstand

    return (
      <>
        <p>
          <strong>1. Formel für das Ohmsche Gesetz</strong>
        </p>

        <BlockMath math="I=\\frac{U}{R}" />

        <p>
          <InlineMath math="I" /> ist die Stromstärke,{' '}
          <InlineMath math="U" /> die Spannung und{' '}
          <InlineMath math="R" /> der Widerstand.
        </p>

        <p>
          <strong>2. Werte einsetzen</strong>
        </p>

        <BlockMath
          math={`I=\\frac{${data.spannung}\\,\\mathrm{V}}{${data.widerstand}\\,\\Omega}`}
        />

        <p>
          <strong>3. Ergebnis berechnen</strong>
        </p>

        <BlockMath math={`I=${pp(strom)}\\,\\mathrm{A}`} />

        <p>
          <strong>Antwort:</strong> Durch die Heizspirale fließt ein Strom
          von <InlineMath math={`${pp(strom)}\\,\\mathrm{A}`} />.
        </p>
      </>
    )
  },
}