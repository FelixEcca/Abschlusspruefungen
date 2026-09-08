import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Scenario = 'car' | 'bike' | 'tram'

interface DATA {
  scenario: Scenario
  vKmh: number
  v: number
  reactionTime: number
  deceleration: number
  reactionDistance: number
  brakingDistance: number
  stoppingDistance: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function scenarioText(scenario: Scenario) {
  if (scenario === 'bike') return 'Eine Radfahrerin muss plötzlich bremsen.'
  if (scenario === 'tram') return 'Eine Straßenbahn muss vor einer Haltestelle stark bremsen.'
  return 'Ein Auto muss plötzlich bremsen.'
}

export const exercise6023: Exercise<DATA> = {
  title: 'Reaktionsweg und Bremsweg',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const scenario: Scenario = rng.randomItemFromArray(['car', 'bike', 'tram'])
    const vKmh =
      scenario === 'bike'
        ? rng.randomItemFromArray([18, 21.6, 25.2, 28.8])
        : scenario === 'tram'
          ? rng.randomItemFromArray([28.8, 36, 43.2, 50.4])
          : rng.randomItemFromArray([36, 43.2, 54, 72, 90])
    const v = round2(vKmh / 3.6)
    const reactionTime = rng.randomItemFromArray([0.6, 0.8, 1, 1.2])
    const deceleration = rng.randomItemFromArray([2, 2.5, 3, 4, 5, 6])
    const reactionDistance = round2(v * reactionTime)
    const brakingDistance = round2((v * v) / (2 * deceleration))
    const stoppingDistance = round2(reactionDistance + brakingDistance)

    return {
      scenario,
      vKmh,
      v,
      reactionTime,
      deceleration,
      reactionDistance,
      brakingDistance,
      stoppingDistance,
    }
  },

  originalData: {
    scenario: 'car',
    vKmh: 54,
    v: 15,
    reactionTime: 1,
    deceleration: 5,
    reactionDistance: 15,
    brakingDistance: 22.5,
    stoppingDistance: 37.5,
  },

  constraint({ data }) {
    return (
      data.v > 0 &&
      data.reactionTime > 0 &&
      data.deceleration > 0 &&
      data.stoppingDistance > data.reactionDistance
    )
  },

  intro({ data }) {
    return (
      <>
        <p>{scenarioText(data.scenario)}</p>
        <p>
          Die Geschwindigkeit beträgt{' '}
          <InlineMath math={`${pp(data.vKmh)}\\,\\tfrac{\\mathrm{km}}{\\mathrm h}`} />
          . Die Reaktionszeit beträgt{' '}
          <InlineMath math={`${pp(data.reactionTime)}\\,\\mathrm s`} />. Beim
          Bremsen wirkt eine konstante Verzögerung von{' '}
          <InlineMath
            math={`${pp(data.deceleration)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
          />
          .
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 10,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Wandle die Geschwindigkeit in{' '}
            <InlineMath math={`\\tfrac{\\mathrm m}{\\mathrm s}`} /> um.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`v = \\tfrac{${pp(data.vKmh)}}{3{,}6}`} />
            <br />
            <InlineMath
              math={`v = ${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />
          </>
        )
      },
    },
    {
      points: 12,
      intro() {
        return null
      },
      task() {
        return <p>Berechne den Reaktionsweg.</p>
      },
      solution({ data }) {
        return (
          <>
            <p>Während der Reaktionszeit bewegt sich das Fahrzeug gleichförmig weiter:</p>
            <InlineMath math={`s_\\mathrm R = v\\cdot t_\\mathrm R`} />
            <br />
            <InlineMath
              math={`s_\\mathrm R = ${pp(
                data.v,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot ${pp(
                data.reactionTime,
              )}\\,\\mathrm s = ${pp(data.reactionDistance)}\\,\\mathrm m`}
            />
          </>
        )
      },
    },
    {
      points: 12,
      intro() {
        return null
      },
      task() {
        return <p>Berechne den Bremsweg.</p>
      },
      solution({ data }) {
        return (
          <>
            <p>Bei konstanter Verzögerung gilt:</p>
            <InlineMath math={`s_\\mathrm B = \\tfrac{v^2}{2a}`} />
            <br />
            <InlineMath
              math={`s_\\mathrm B = \\tfrac{(${pp(
                data.v,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s})^2}{2\\cdot ${pp(
                data.deceleration,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}`}
            />
            <br />
            <InlineMath math={`s_\\mathrm B \\approx ${pp(data.brakingDistance)}\\,\\mathrm m`} />
          </>
        )
      },
    },
    {
      points: 8,
      intro() {
        return null
      },
      task() {
        return <p>Berechne den gesamten Anhalteweg.</p>
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`s_\\mathrm A = s_\\mathrm R + s_\\mathrm B`} />
            <br />
            <InlineMath
              math={`s_\\mathrm A = ${pp(data.reactionDistance)}\\,\\mathrm m + ${pp(
                data.brakingDistance,
              )}\\,\\mathrm m = ${pp(data.stoppingDistance)}\\,\\mathrm m`}
            />
          </>
        )
      },
    },
  ],
}
