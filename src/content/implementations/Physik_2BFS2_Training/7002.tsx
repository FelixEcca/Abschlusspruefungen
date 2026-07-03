import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target1 = 'v' | 't'

interface DATA {
  g: number // m/s^2
  t: number // s
  v: number // m/s  (v = g * t)
  s: number // m    (s = 1/2 * g * t^2)
  target1: Target1
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise7002: Exercise<DATA> = {
  title: 'Freier Fall',
  source: 'Mechanik',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // g leicht variieren: 9.81 oder 9.8
    const g = rng.randomItemFromArray([9.81, 9.8])
    const t = rng.randomIntBetween(1, 5) // s
    const v = g * t
    const s = 0.5 * g * t * t
    const target1: Target1 = rng.randomItemFromArray(['v', 't'])
    return { g, t, v: round2(v), s: round2(s), target1 }
  },

  originalData: {
    g: 9.81,
    t: 3,
    v: 29.43, // 9.81*3
    s: 44.15, // 0.5*9.81*3^2
    target1: 'v',
  },

  constraint({ data }) {
    if (data.g <= 0 || data.t <= 0) return false
    return true
  },

  intro() {
    return null
  },

  tasks: [
    // Teil 1: v = g t  (gesucht: v ODER t), g wird genannt
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            <p>
              Ein Stein befindet sich im freien Fall (Luftwiderstand wird
              vernachlässigt).
            </p>
          </>
        )
      },
      task({ data }) {
        const unitV = '\\tfrac{\\mathrm m}{\\mathrm s}'
        const unitT = '\\mathrm s'

        const ask =
          data.target1 === 'v' ? (
            <>
              Bestimme die Fallgeschwindigkeit <InlineMath math="v" />, wenn die
              Fallzeit <InlineMath math="t" /> bekannt ist.
            </>
          ) : (
            <>
              Bestimme die Fallzeit <InlineMath math="t" />, wenn die
              Fallgeschwindigkeit <InlineMath math="v" /> bekannt ist.
            </>
          )

        return (
          <>
            <p>{ask}</p>
            <p>Gegeben:</p>
            <ul className="list-disc ml-6">
              <li>
                <InlineMath
                  math={`g=${pp(data.g)}\\;\\tfrac{\\mathrm m}{\\mathrm s^{2}}`}
                />
              </li>

              {data.target1 === 'v' ? (
                <li>
                  <InlineMath math={`t=${pp(data.t)}\\;${unitT}`} />
                </li>
              ) : null}

              {data.target1 === 'v' ? null : (
                <li>
                  <InlineMath math={`v=${pp(data.v)}\\;${unitV}`} />
                </li>
              )}
            </ul>
            <p>
              Formel:&nbsp;
              <InlineMath math={`v=g\\cdot\\,t`} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const unitV = '\\tfrac{\\mathrm m}{\\mathrm s}'
        const unitT = '\\mathrm s'

        if (data.target1 === 'v') {
          const val = round2(data.g * data.t)
          return (
            <>
              <p>
                Setze die bekannten Werte ein und berechne{' '}
                <InlineMath math="v" />.
              </p>
              <InlineMath math={`v=g\\cdot\\,t`} />
              <br />
              <InlineMath
                math={`v=${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm s^{2}}\\cdot ${pp(data.t)}\\,${unitT}`}
              />
              <br />
              <InlineMath math={`v=${pp(val)}\\,${unitV}`} />
              <p>
                Während des freien Falls erreicht der Stein die Geschwindigkeit{' '}
                <InlineMath math={`v=${pp(val)}\\,${unitV}`} />.
              </p>
            </>
          )
        } else {
          const val = round2(data.v / data.g)
          return (
            <>
              <p>
                Setze die bekannten Werte ein und forme nach{' '}
                <InlineMath math="t" /> um.
              </p>
              <InlineMath math={`v=g\\cdot t`} />
              <br />
              <InlineMath
                math={`${pp(data.v)}\\,${unitV}= 9,81 \\tfrac{\\mathrm m}{\\mathrm s^{2}} \\cdot t\\quad |:\\,${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm s^{2}}`}
              />
              <br />
              <InlineMath
                math={`t=\\tfrac{${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm s^{2}}}`}
              />
              <br />
              <InlineMath math={`t=${pp(val)}\\,${unitT}`} />
              <p>
                Die Zeit, die der Stein fällt, beträgt{' '}
                <InlineMath math={`t=${pp(val)}\\,${unitT}`} />.
              </p>
            </>
          )
        }
      },
    },

    // Teil 2: s = 1/2 g t^2  (gesucht: NUR s)
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            <p>
              Eine Person lässt einen Stein in einen tiefen Brunnen fallen. Die
              Zeit bis zum Aufprall wird gemessen.
            </p>
          </>
        )
      },
      task({ data }) {
        const unitT = '\\mathrm s'
        return (
          <>
            <p>
              Bestimme die Tiefe des Brunnens <InlineMath math="s" />.
            </p>
            <p>Gegeben:</p>
            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`t=${pp(data.t)}\\;${unitT}`} />
              </li>
              <li>
                <InlineMath
                  math={`g=${pp(data.g)}\\;\\tfrac{\\mathrm m}{\\mathrm s^{2}}`}
                />
              </li>
            </ul>
            <p>
              Formel:&nbsp;
              <InlineMath math={`s=\\tfrac12\\cdot g\\cdot t^{2}`} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const val = round2(0.5 * data.g * data.t * data.t)
        return (
          <>
            <p>
              Setze die bekannten Werte ein und berechne <InlineMath math="s" />
              .
            </p>
            <InlineMath math={`s=\\tfrac12\\cdot g\\cdot  t^{2}`} />
            <br />
            <InlineMath
              math={`s=\\tfrac12\\cdot ${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm s^{2}}\\cdot (${pp(data.t)}\\,\\mathrm s)^{2}`}
            />
            <br />
            <InlineMath math={`s=${pp(val)}\\,\\mathrm m`} />
            <p>
              Der Brunnen ist <InlineMath math={`s=${pp(val)}\\,\\mathrm m`} />{' '}
              tief.
            </p>
          </>
        )
      },
    },
  ],
}
