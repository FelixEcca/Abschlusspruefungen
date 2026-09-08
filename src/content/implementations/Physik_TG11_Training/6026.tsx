import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  context: string
  s0: number
  v0: number
  a: number
  t: number
  additionalDistance: number
  position: number
  finalSpeed: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6026: Exercise<DATA> = {
  title: 'Beschleunigen mit Anfangswerten',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const context = rng.randomItemFromArray([
      'Ein Fahrrad rollt bereits leicht bergab und wird dann gleichmäßig schneller.',
      'Ein Lieferwagen fährt schon langsam und beschleunigt beim Einfahren auf eine Landstraße.',
      'Ein Zug bewegt sich bereits und beschleunigt nach einem langsamen Streckenabschnitt.',
      'Ein Wagen auf einer Versuchsbahn hat schon eine Anfangsgeschwindigkeit und wird weiter beschleunigt.',
    ])
    const s0 = rng.randomItemFromArray([5, 10, 15, 20, 30])
    const v0 = rng.randomItemFromArray([1, 1.5, 2, 2.5, 3])
    const a = rng.randomItemFromArray([0.4, 0.6, 0.8, 1, 1.2])
    const t = rng.randomItemFromArray([4, 5, 6, 8, 10])
    const additionalDistance = round2(v0 * t + 0.5 * a * t * t)
    const position = round2(s0 + additionalDistance)
    const finalSpeed = round2(v0 + a * t)
    return { context, s0, v0, a, t, additionalDistance, position, finalSpeed }
  },

  originalData: {
    context:
      'Ein Wagen auf einer Versuchsbahn hat schon eine Anfangsgeschwindigkeit und wird weiter beschleunigt.',
    s0: 10,
    v0: 2,
    a: 0.8,
    t: 5,
    additionalDistance: 20,
    position: 30,
    finalSpeed: 6,
  },

  constraint({ data }) {
    return (
      data.a > 0 &&
      data.t > 0 &&
      data.v0 > 0 &&
      data.position > data.s0 &&
      data.finalSpeed > data.v0
    )
  },

  intro({ data }) {
    return (
      <>
        <p>{data.context}</p>
        <p>
          Zu Beginn der Beobachtung befindet sich der Körper bereits bei{' '}
          <InlineMath math={`s_0=${pp(data.s0)}\\,\\mathrm m`} /> und hat die
          Anfangsgeschwindigkeit{' '}
          <InlineMath math={`v_0=${pp(data.v0)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />
          . Danach beschleunigt er gleichmäßig mit{' '}
          <InlineMath math={`a=${pp(data.a)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`} />.
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
            Für die Geschwindigkeit gilt:{' '}
            <InlineMath math={`v=v_0+a\\cdot t`} />. Berechne die
            Geschwindigkeit nach <InlineMath math={`${pp(data.t)}\\,\\mathrm s`} />.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`v=v_0+a\\cdot t`} />
            <br />
            <InlineMath
              math={`v=${pp(
                data.v0,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}+${pp(
                data.a,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot ${pp(
                data.t,
              )}\\,\\mathrm s=${pp(
                data.finalSpeed,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
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
          <>
            <p>
              Für den Ort bei gleichmäßiger Beschleunigung mit Anfangswerten
              gilt:
            </p>
            <p>
              <InlineMath math={`s=s_0+v_0\\cdot t+\\tfrac12\\cdot a\\cdot t^2`} />
            </p>
            <p>
              Berechne den Ort nach <InlineMath math={`${pp(data.t)}\\,\\mathrm s`} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`s=s_0+v_0\\cdot t+\\tfrac12\\cdot a\\cdot t^2`} />
            <br />
            <InlineMath
              math={`s=${pp(data.s0)}\\,\\mathrm m+${pp(
                data.v0,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot${pp(
                data.t,
              )}\\,\\mathrm s+\\tfrac12\\cdot${pp(
                data.a,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot(${pp(
                data.t,
              )}\\,\\mathrm s)^2`}
            />
            <br />
            <InlineMath
              math={`s=${pp(data.s0)}+${pp(data.additionalDistance)}=${pp(
                data.position,
              )}\\,\\mathrm m`}
            />
          </>
        )
      },
    },
  ],
}
