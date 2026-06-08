// exercise6016.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  v: number
  thrust: number
  deltaT: number
  fuelPerSecond: number
  fuelTotal: number
  burnTime: number
  rocketMassT: number
  rocketMassKg: number
  weightForce: number
  acceleration: number
  effectiveAcceleration: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6016: Exercise<DATA> = {
  title: 'Raketenphysik',
  source: 'Kraftstoß',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const v = rng.randomItemFromArray([1500, 1800, 2000, 2200, 2500])
    const thrust = rng.randomItemFromArray([120000, 160000, 200000, 250000])
    const deltaT = 1
    const fuelPerSecond = round2((thrust * deltaT) / v)

    const fuelTotal = rng.randomItemFromArray([3000, 4000, 5000, 6000])
    const burnTime = round2(fuelTotal / fuelPerSecond)

    const rocketMassT = rng.randomItemFromArray([8, 10, 12, 15])
    const rocketMassKg = rocketMassT * 1000
    const weightForce = round2(rocketMassKg * 9.81)
    const acceleration = round2(thrust / rocketMassKg)
    const effectiveAcceleration = round2((thrust - weightForce) / rocketMassKg)

    return {
      v,
      thrust,
      deltaT,
      fuelPerSecond,
      fuelTotal,
      burnTime,
      rocketMassT,
      rocketMassKg,
      weightForce,
      acceleration,
      effectiveAcceleration,
    }
  },

  originalData: {
    v: 2000,
    thrust: 200000,
    deltaT: 1,
    fuelPerSecond: 100,
    fuelTotal: 5000,
    burnTime: 50,
    rocketMassT: 10,
    rocketMassKg: 10000,
    weightForce: 98100,
    acceleration: 20,
    effectiveAcceleration: 10.19,
  },

  constraint({ data }) {
    return data.v > 0 && data.thrust > 0 && data.rocketMassKg > 0
  },

  intro({ data }) {
    return (
      <>
        <p>
          Die Rakete nutzt zum Beispiel eine chemische Reaktion von Treibstoff
          und Sauerstoff. Die heißen Gase werden nach unten ausgestoßen.
        </p>
        <p>
          Aus einer Rakete strömen Gase mit einer Geschwindigkeit von{' '}
          <InlineMath
            math={`v=${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />{' '}
          aus.
        </p>

        <svg viewBox="0 0 328 220">
          <image
            href="/content/TG11_Physik/Rakete.png"
            width="328"
            height="220"
          />
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 10,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Die Schubkraft soll{' '}
            <InlineMath math={`F=${pp(data.thrust)}\\,\\mathrm N`} /> betragen.
            Berechnen Sie, wie groß die Masse des Treibstoffes sein muss, die
            pro Sekunde verbrannt wird.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Für den Kraftstoß gilt:</p>
            <InlineMath math={`F=\\frac{\\Delta p}{\\Delta t}`} />
            <br />
            <InlineMath math={`\\Delta p=m\\cdot v`} />
            <p>Damit gilt für die Masse:</p>
            <InlineMath math={`m=\\frac{F\\cdot\\Delta t}{v}`} />
            <p>
              Einsetzen mit{' '}
              <InlineMath math={`\\Delta t=${pp(data.deltaT)}\\,\\mathrm s`} />:
            </p>
            <InlineMath
              math={`m=\\frac{${pp(data.thrust)}\\,\\mathrm N\\cdot ${pp(
                data.deltaT,
              )}\\,\\mathrm s}{${pp(
                data.v,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}}`}
            />
            <br />
            <InlineMath math={`m=${pp(data.fuelPerSecond)}\\,\\mathrm{kg}`} />
            <p>
              Pro Sekunde müssen also{' '}
              <InlineMath math={`${pp(data.fuelPerSecond)}\\,\\mathrm{kg}`} />{' '}
              Treibstoff verbrannt werden, um die Schubkraft aufzubringen.
            </p>{' '}
          </>
        )
      },
    },
    {
      points: 8,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Berechnen Sie, wie lange es dauert,{' '}
            <InlineMath math={`m=${pp(data.fuelTotal)}\\,\\mathrm{kg}`} />{' '}
            Treibstoff zu verbrennen.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Pro Sekunde werden verbrannt:</p>
            <InlineMath math={`${pp(data.fuelPerSecond)}\\,\\mathrm{kg}`} />

            <p>Die Brenndauer ist:</p>
            <InlineMath
              math={`t=\\frac{${pp(data.fuelTotal)}\\,\\mathrm{kg}}{${pp(
                data.fuelPerSecond,
              )}\\,\\tfrac{\\mathrm{kg}}{\\mathrm s}}`}
            />
            <br />
            <InlineMath math={`t=${pp(data.burnTime)}\\,\\mathrm s`} />
          </>
        )
      },
    },
    {
      points: 8,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Die Rakete hat vollgetankt eine Masse von{' '}
            <InlineMath math={`m=${pp(data.rocketMassT)}\\,\\mathrm t`} />.
            Berechnen Sie ihre Gewichtskraft.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Zuerst wird die Masse in kg umgerechnet:</p>
            <InlineMath
              math={`${pp(data.rocketMassT)}\\,\\mathrm t=${pp(
                data.rocketMassKg,
              )}\\,\\mathrm{kg}`}
            />

            <p>Die Gewichtskraft ist:</p>
            <InlineMath math={`F_G=m\\cdot g`} />
            <br />
            <InlineMath
              math={`F_G=${pp(
                data.rocketMassKg,
              )}\\,\\mathrm{kg}\\cdot 9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
            <br />
            <InlineMath
              math={`F_G\\approx ${pp(data.weightForce)}\\,\\mathrm N`}
            />
          </>
        )
      },
    },
    {
      points: 8,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Berechnen Sie, mit welcher Beschleunigung die Rakete durch die
            Schubkraft <InlineMath math={`F=${pp(data.thrust)}\\,\\mathrm N`} />{' '}
            abhebt.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Mit dem Bewegungsgesetz gilt:</p>
            <InlineMath math={`F=m\\cdot a`} />
            <br />
            <InlineMath math={`a=\\frac{F}{m}`} />

            <p>Einsetzen:</p>
            <InlineMath
              math={`a=\\frac{${pp(data.thrust)}\\,\\mathrm N}{${pp(
                data.rocketMassKg,
              )}\\,\\mathrm{kg}}`}
            />
            <br />
            <InlineMath
              math={`a=${pp(
                data.acceleration,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
          </>
        )
      },
    },
  ],
}
