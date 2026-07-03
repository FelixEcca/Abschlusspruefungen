import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type PartBMode = 'mass' | 'acceleration'

interface DATA {
  a: number
  mRobert: number
  mPartner: number
  mGesamt: number
  f: number

  partBMode: PartBMode
  bForce: number
  bMass: number
  bAcceleration: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6013: Exercise<DATA> = {
  title: 'Bewegungsgesetz',
  source: 'Kraft',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const a = round2(rng.randomIntBetween(15, 40) / 10)
    const mRobert = rng.randomIntBetween(65, 95)
    const mPartner = rng.randomIntBetween(65, 95)
    const mGesamt = mRobert + mPartner
    const f = round2(mGesamt * a)

    const partBMode: PartBMode = rng.randomItemFromArray([
      'mass',
      'acceleration',
    ])

    const bMass = rng.randomIntBetween(130, 190)
    const bAcceleration = round2(rng.randomIntBetween(12, 35) / 10)
    const bForce = round2(bMass * bAcceleration)

    return {
      a,
      mRobert,
      mPartner,
      mGesamt,
      f,
      partBMode,
      bForce,
      bMass,
      bAcceleration,
    }
  },

  originalData: {
    a: 2.5,
    mRobert: 78,
    mPartner: 82,
    mGesamt: 160,
    f: 400,

    partBMode: 'acceleration',
    bForce: 480,
    bMass: 160,
    bAcceleration: 3,
  },

  constraint({ data }) {
    return (
      data.a > 0 &&
      data.mRobert > 0 &&
      data.mPartner > 0 &&
      data.bForce > 0 &&
      data.bMass > 0 &&
      data.bAcceleration > 0
    )
  },

  intro({ data }) {
    return (
      <>
        <p>
          Robert und sein Teamkollege fahren ein Rennen. Beim Start
          beschleunigen sie mit{' '}
          <InlineMath
            math={`a = ${pp(data.a)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
          />
          .
        </p>

        <p>
          Robert und sein Teamkollege haben jeweils die Massen{' '}
          <InlineMath
            math={`m_\\mathrm{Robert} = ${pp(data.mRobert)}\\,\\mathrm{kg}`}
          />{' '}
          und{' '}
          <InlineMath
            math={`m_\\mathrm{Teamkollege} = ${pp(
              data.mPartner,
            )}\\,\\mathrm{kg}`}
          />
          .
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

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie die erforderliche Kraft <InlineMath math={`F`} />.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Zuerst werden die beiden Massen addiert.</p>
            <InlineMath
              math={`m = m_\\mathrm{Robert} + m_\\mathrm{Teamkollege}`}
            />
            <br />
            <InlineMath
              math={`m = ${pp(data.mRobert)}\\,\\mathrm{kg} + ${pp(
                data.mPartner,
              )}\\,\\mathrm{kg}`}
            />
            <br />
            <InlineMath math={`m = ${pp(data.mGesamt)}\\,\\mathrm{kg}`} />

            <p>Dann wird das Bewegungsgesetz verwendet.</p>
            <InlineMath math={`F = m\\cdot a`} />
            <br />
            <InlineMath
              math={`F = ${pp(data.mGesamt)}\\,\\mathrm{kg}\\cdot ${pp(
                data.a,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
            <br />
            <InlineMath math={`F \\approx ${pp(data.f)}\\,\\mathrm N`} />
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        if (data.partBMode === 'mass') {
          return (
            <p>
              Bei einem zweiten Start wirkt eine Kraft von{' '}
              <InlineMath math={`F = ${pp(data.bForce)}\\,\\mathrm N`} />. Die
              Beschleunigung beträgt{' '}
              <InlineMath
                math={`a = ${pp(
                  data.bAcceleration,
                )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
              />
              . Berechnen Sie die gesamte Masse.
            </p>
          )
        }

        return (
          <p>
            Bei einem zweiten Start wirkt eine Kraft von{' '}
            <InlineMath math={`F = ${pp(data.bForce)}\\,\\mathrm N`} />. Die
            gesamte Masse beträgt{' '}
            <InlineMath math={`m = ${pp(data.bMass)}\\,\\mathrm{kg}`} />.
            Berechnen Sie die Beschleunigung.
          </p>
        )
      },
      solution({ data }) {
        if (data.partBMode === 'mass') {
          return (
            <>
              <p>Gesucht ist die Masse der beiden Fahrer.</p>
              <p>Das Bewegungsgesetz wird nach der Masse umgestellt.</p>

              <InlineMath math={`F=m\\cdot a`} />
              <br />
              <InlineMath math={`m=\\frac{F}{a}`} />
              <br />
              <InlineMath
                math={`m=\\frac{${pp(data.bForce)}\\,\\mathrm N}{${pp(
                  data.bAcceleration,
                )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}`}
              />
              <br />
              <InlineMath math={`m=${pp(data.bMass)}\\,\\mathrm{kg}`} />
            </>
          )
        }

        return (
          <>
            <p>Gesucht ist die Beschleunigung.</p>
            <p>Das Bewegungsgesetz wird nach der Beschleunigung umgestellt.</p>

            <InlineMath math={`F=m\\cdot a`} />
            <br />
            <InlineMath math={`a=\\frac{F}{m}`} />
            <br />
            <InlineMath
              math={`a=\\frac{${pp(data.bForce)}\\,\\mathrm N}{${pp(
                data.bMass,
              )}\\,\\mathrm{kg}}`}
            />
            <br />
            <InlineMath
              math={`a=${pp(
                data.bAcceleration,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
          </>
        )
      },
    },
  ],
}
