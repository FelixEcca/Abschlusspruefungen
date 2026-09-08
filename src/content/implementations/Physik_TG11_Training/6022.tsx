import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Scenario = 'scooter' | 'elevator' | 'cart' | 'train'

interface DATA {
  scenario: Scenario
  a: number
  t: number
  v: number
  s: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function scenarioText(scenario: Scenario) {
  if (scenario === 'scooter') return 'Ein E-Scooter fährt aus dem Stand los.'
  if (scenario === 'elevator') return 'Ein Aufzug beschleunigt beim Anfahren gleichmäßig nach oben.'
  if (scenario === 'cart') return 'Ein Wagen auf einer Versuchsbahn wird aus dem Stand gleichmäßig beschleunigt.'
  return 'Ein Zug beschleunigt beim Verlassen eines Bahnhofs gleichmäßig.'
}

export const exercise6022: Exercise<DATA> = {
  title: 'Gleichmäßig beschleunigte Bewegung aus der Ruhe',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const scenario: Scenario = rng.randomItemFromArray([
      'scooter',
      'elevator',
      'cart',
      'train',
    ])
    const a = rng.randomItemFromArray([0.4, 0.6, 0.8, 1.2, 1.5, 2])
    const t = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12])
    const v = round2(a * t)
    const s = round2(0.5 * a * t * t)

    return { scenario, a, t, v, s }
  },

  originalData: {
    scenario: 'cart',
    a: 1.2,
    t: 5,
    v: 6,
    s: 15,
  },

  constraint({ data }) {
    return data.a > 0 && data.t > 0 && data.v > 0 && data.s > 0
  },

  intro({ data }) {
    return (
      <>
        <p>{scenarioText(data.scenario)}</p>
        <p>
          Die Anfangsgeschwindigkeit beträgt{' '}
          <InlineMath math={`v_0 = 0\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />.
          Die Beschleunigung beträgt{' '}
          <InlineMath
            math={`a = ${pp(data.a)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
          />
          .
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
      task({ data }) {
        return (
          <p>
            Berechne die Geschwindigkeit nach{' '}
            <InlineMath math={`${pp(data.t)}\\,\\mathrm s`} />.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Bei einer Bewegung aus der Ruhe gilt:</p>
            <InlineMath math={`v = a\\cdot t`} />
            <br />
            <InlineMath
              math={`v = ${pp(data.a)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot ${pp(
                data.t,
              )}\\,\\mathrm s`}
            />
            <br />
            <InlineMath
              math={`v = ${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />
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
        return (
          <p>
            Berechne die zurückgelegte Strecke nach{' '}
            <InlineMath math={`${pp(data.t)}\\,\\mathrm s`} />.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Für die Strecke bei Start aus der Ruhe gilt:</p>
            <InlineMath math={`s = \\tfrac{1}{2}\\cdot a\\cdot t^2`} />
            <br />
            <InlineMath
              math={`s = \\tfrac{1}{2}\\cdot ${pp(
                data.a,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot (${pp(
                data.t,
              )}\\,\\mathrm s)^2`}
            />
            <br />
            <InlineMath math={`s = ${pp(data.s)}\\,\\mathrm m`} />
          </>
        )
      },
    },
  ],
}
