import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 's' | 'v' | 't'
type Scenario = 'bike' | 'train' | 'conveyor' | 'robot'

interface DATA {
  scenario: Scenario
  target: Target
  s: number
  v: number
  t: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function scenarioText(scenario: Scenario) {
  if (scenario === 'bike') return 'Ein Fahrrad fährt mit konstanter Geschwindigkeit.'
  if (scenario === 'train') return 'Ein Zug fährt auf einem geraden Streckenabschnitt mit konstanter Geschwindigkeit.'
  if (scenario === 'conveyor') return 'Ein Förderband bewegt ein Werkstück mit konstanter Geschwindigkeit.'
  return 'Ein kleiner Roboter fährt mit konstanter Geschwindigkeit durch einen Raum.'
}

function targetText(target: Target) {
  if (target === 's') return <>Bestimme die Strecke <InlineMath math="s" />.</>
  if (target === 'v') return <>Bestimme die Geschwindigkeit <InlineMath math="v" />.</>
  return <>Bestimme die Zeit <InlineMath math="t" />.</>
}

export const exercise6020: Exercise<DATA> = {
  title: 'Gleichförmige Bewegung berechnen',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const scenario: Scenario = rng.randomItemFromArray([
      'bike',
      'train',
      'conveyor',
      'robot',
    ])
    const target: Target = rng.randomItemFromArray(['s', 'v', 't'])
    const v = rng.randomItemFromArray([1.2, 1.5, 2, 2.5, 3, 4, 5, 8, 12])
    const t = rng.randomItemFromArray([4, 5, 8, 10, 12, 15, 20, 30, 45])
    const s = round2(v * t)

    return { scenario, target, s, v, t }
  },

  originalData: {
    scenario: 'bike',
    target: 's',
    s: 60,
    v: 4,
    t: 15,
  },

  constraint({ data }) {
    return data.s > 0 && data.v > 0 && data.t > 0
  },

  task({ data }) {
    return (
      <>
        <p>{scenarioText(data.scenario)}</p>
        <p>{targetText(data.target)}</p>
        <ul className="list-disc ml-6">
          {data.target !== 's' && (
            <li>
              <InlineMath math={`s = ${pp(data.s)}\\,\\mathrm m`} />
            </li>
          )}
          {data.target !== 'v' && (
            <li>
              <InlineMath
                math={`v = ${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
              />
            </li>
          )}
          {data.target !== 't' && (
            <li>
              <InlineMath math={`t = ${pp(data.t)}\\,\\mathrm s`} />
            </li>
          )}
        </ul>
      </>
    )
  },

  solution({ data }) {
    if (data.target === 's') {
      return (
        <>
          <p>Für eine gleichförmige Bewegung gilt:</p>
          <InlineMath math={`s = v\\cdot t`} />
          <br />
          <InlineMath
            math={`s = ${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot ${pp(
              data.t,
            )}\\,\\mathrm s`}
          />
          <br />
          <InlineMath math={`s = ${pp(data.s)}\\,\\mathrm m`} />
        </>
      )
    }

    if (data.target === 'v') {
      return (
        <>
          <p>Stelle die Formel nach der Geschwindigkeit um:</p>
          <InlineMath math={`s = v\\cdot t`} />
          <br />
          <InlineMath math={`v = \\tfrac{s}{t}`} />
          <br />
          <InlineMath
            math={`v = \\tfrac{${pp(data.s)}\\,\\mathrm m}{${pp(
              data.t,
            )}\\,\\mathrm s} = ${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
        </>
      )
    }

    return (
      <>
        <p>Stelle die Formel nach der Zeit um:</p>
        <InlineMath math={`s = v\\cdot t`} />
        <br />
        <InlineMath math={`t = \\tfrac{s}{v}`} />
        <br />
        <InlineMath
          math={`t = \\tfrac{${pp(data.s)}\\,\\mathrm m}{${pp(
            data.v,
          )}\\,\\tfrac{\\mathrm m}{\\mathrm s}} = ${pp(data.t)}\\,\\mathrm s`}
        />
      </>
    )
  },
}
