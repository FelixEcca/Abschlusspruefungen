import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  mRobert: number
  mPartner: number
  mGesamt: number
  f: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6013: Exercise<DATA> = {
  title: 'Bewegunsgesetz',
  source: 'Kraft',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const a = round2(rng.randomIntBetween(15, 40) / 10) // 1,5 ... 4,0 m/s^2
    const mRobert = rng.randomIntBetween(65, 95) // kg
    const mPartner = rng.randomIntBetween(65, 95) // kg
    const mGesamt = mRobert + mPartner
    const f = round2(mGesamt * a)

    return { a, mRobert, mPartner, mGesamt, f }
  },

  originalData: {
    a: 2.5,
    mRobert: 78,
    mPartner: 82,
    mGesamt: 160,
    f: 400,
  },

  constraint({ data }) {
    return data.a > 0 && data.mRobert > 0 && data.mPartner > 0
  },

  task({ data }) {
    const { a, mRobert, mPartner } = data

    return (
      <>
        <p>
          Robert und sein Teamkollege fahren ein Rennen. Beim Start
          beschleunigen sie mit{' '}
          <InlineMath
            math={`a = ${pp(a)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
          />
          .
        </p>

        <p>
          Robert und sein Teamkollege haben jeweils die Massen{' '}
          <InlineMath
            math={`m_\\mathrm{Robert} = ${pp(mRobert)}\\,\\mathrm{kg}`}
          />{' '}
          und{' '}
          <InlineMath
            math={`m_\\mathrm{Teamkollege} = ${pp(mPartner)}\\,\\mathrm{kg}`}
          />
          .
        </p>
        <p>
          Berechnen Sie die erforderliche Kraft <InlineMath math={`F`} />.
        </p>
        <svg viewBox="0 0 328 200">
          <image
            href="/content/TG11_Physik/6013.jpeg"
            height="200"
            width="328"
          />
        </svg>
        <p style={{ fontSize: '0.575rem' }}>
          Bildquelle:
          https://www.morgenpost.de/sport/article216684563/Robert-Foerstemann-sattelt-um.html
        </p>
      </>
    )
  },

  solution({ data }) {
    const { a, mRobert, mPartner, mGesamt, f } = data

    return (
      <>
        <p>Zuerst werden die beiden Massen addiert.</p>
        <InlineMath math={`m = m_\\mathrm{Robert} + m_\\mathrm{Teamkollege}`} />
        <br />
        <InlineMath
          math={`m = ${pp(mRobert)}\\,\\mathrm{kg} + ${pp(
            mPartner,
          )}\\,\\mathrm{kg}`}
        />
        <br />
        <InlineMath math={`m = ${pp(mGesamt)}\\,\\mathrm{kg}`} />
        <br />
        <br />
        <p>Dann wird das Bewegungsgesetz verwendet.</p>
        <InlineMath math={'F = m\\cdot a'} />
        <br />
        <InlineMath
          math={`F = ${pp(mGesamt)}\\,\\mathrm{kg}\\cdot ${pp(
            a,
          )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
        />
        <br />
        <InlineMath math={`F \\approx ${pp(f)}\\,\\mathrm N`} />
      </>
    )
  },
}
