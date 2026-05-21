// exercise9047.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  gross: number
  socialPercent: number
  social: number
  tax: number
  net: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9047: Exercise<DATA> = {
  title: 'Teil 2: Nettogehalt',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const gross = rng.randomItemFromArray([1200, 1325, 1425, 1500, 1650])
    const socialPercent = rng.randomItemFromArray([18, 19, 20, 21])
    const tax = rng.randomItemFromArray([12.5, 18.41, 24.9])

    const social = round2((gross * socialPercent) / 100)
    const net = round2(gross - social - tax)

    return {
      gross,
      socialPercent,
      social,
      tax,
      net,
    }
  },

  originalData: {
    gross: 1425,
    socialPercent: 21,
    social: 299.25,
    tax: 18.41,
    net: 1107.34,
  },

  constraint({ data }) {
    return data.net > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          In Ihrer Ausbildung haben Sie ein monatliches Bruttogehalt von{' '}
          {pp(data.gross)} €.
        </p>

        <p>
          Zuerst werden {data.socialPercent} % Sozialversicherung abgezogen.
        </p>

        <p>Danach werden {pp(data.tax)} € Lohnsteuer abgezogen.</p>

        <p>Berechnen Sie das Nettogehalt.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Sozialversicherung berechnen:</p>

        <InlineMath
          math={`W=\\frac{${data.gross}\\cdot ${data.socialPercent}}{100}=${pp(
            data.social,
          )}`}
        />

        <p>Danach beide Beträge abziehen:</p>

        <InlineMath
          math={`${data.gross}-${pp(data.social)}-${pp(data.tax)}=${pp(
            data.net,
          )}`}
        />

        <p>
          Das Nettogehalt beträgt <b>{pp(data.net)} €</b>.
        </p>
      </>
    )
  },
}
