import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target1 = 'v' | 'a' | 't'

interface DATA {
  // gemeinsame Gegebenheiten für beide Teilaufgaben
  a: number // m/s^2
  t: number // s
  v: number // m/s  (v = a * t)
  s: number // m    (s = 1/2 a t^2)
  target1: Target1 // in Teilaufgabe 1 gesuchte Größe
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise7001: Exercise<DATA> = {
  title: 'Beschleunigte Bewegung',
  source: 'Mechanik',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // "Schöne" SI-Werte wählen
    const a = rng.randomIntBetween(1, 4) // m/s^2
    const t = rng.randomIntBetween(2, 10) // s
    const v = a * t // m/s
    const s = 0.5 * a * t * t // m

    const target1: Target1 = rng.randomItemFromArray(['v', 'a', 't'])

    return { a, t, v, s, target1 }
  },

  originalData: {
    a: 2,
    t: 6,
    v: 12, // 2*6
    s: 36, // 0.5*2*6^2 = 36
    target1: 't',
  },

  constraint({ data }) {
    // triviale/unsinnige Fälle vermeiden
    if (data.a <= 0 || data.t <= 0) return false
    // interne Konsistenz (Toleranz)
    if (Math.abs(data.v - data.a * data.t) > 1e-9) return false
    return true
  },

  intro() {
    return null
  },

  tasks: [
    // Teil 1: v = a t  (gesucht: v ODER a ODER t)
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        const unitV = '\\tfrac{\\mathrm m}{\\mathrm s}'
        const unitA = '\\tfrac{\\mathrm m}{\\mathrm s^{2}}'
        const unitT = '\\mathrm s'

        // Gegebenen-Block mit Kästchen für die gesuchte Größe
        const givenList = (
          <>
            {data.target1 === 'v' ? null : (
              <li>
                <InlineMath math={`v = ${pp(data.v)}\\;${unitV}`} />
              </li>
            )}

            {data.target1 === 'a' ? null : (
              <li>
                <InlineMath math={`a = ${pp(data.a)}\\;${unitA}`} />
              </li>
            )}

            {data.target1 === 't' ? null : (
              <li>
                <InlineMath math={`t = ${pp(data.t)}\\;${unitT}`} />
              </li>
            )}
          </>
        )

        const ask =
          data.target1 === 'v' ? (
            <>
              Bestimme die Geschwindigkeit <InlineMath math="v" />.
            </>
          ) : data.target1 === 'a' ? (
            <>
              Bestimme die Beschleunigung <InlineMath math="a" />.
            </>
          ) : (
            <>
              Bestimme die Zeit <InlineMath math="t" />.
            </>
          )

        return (
          <>
            <p>Ein Auto beschleunigt gleichförmig aus dem Stand.</p>
            <p>{ask}</p>
            <p>Gegeben:</p>
            <ul className="list-disc ml-6">{givenList}</ul>
            <p>
              Formel:&nbsp;
              <InlineMath math={`v=a\\cdot\\,t`} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const unitV = '\\tfrac{\\mathrm m}{\\mathrm s}'
        const unitA = '\\tfrac{\\mathrm m}{\\mathrm s^{2}}'
        const unitT = '\\mathrm s'

        if (data.target1 === 'v') {
          const val = round2(data.a * data.t)
          return (
            <>
              <InlineMath math={`v=a\\cdot\\,t`} />
              <p>
                Setze die bekannten Werte ein und berechne{' '}
                <InlineMath math="v" />.
              </p>
              <InlineMath
                math={`v=${pp(data.a)}\\,${unitA}\\cdot ${pp(data.t)}\\,${unitT}`}
              />
              <br />
              <InlineMath math={`v=${pp(val)}\\,${unitV}`} />
              <p>
                Das Auto beschleunigt auf die Geschwindigkeit{' '}
                <InlineMath math={`v=${pp(val)}\\,${unitV}`} />.
              </p>
            </>
          )
        }

        if (data.target1 === 'a') {
          const val = round2(data.v / data.t)
          return (
            <>
              <p>
                Setze die bekannten Werte ein und forme nach{' '}
                <InlineMath math="a" /> um.
              </p>
              <InlineMath math={`v=a\\cdot\\,t`} />
              <br />
              <InlineMath
                math={`${pp(data.v)}\\,${unitV}=a\\cdot\\,${pp(data.t)}\\,${unitT}\\quad |:{${pp(data.t)}\\,${unitT}}`}
              />

              <br />
              <InlineMath
                math={`a=\\tfrac{${pp(data.v)}\\,${unitV}}{${pp(data.t)}\\,${unitT}}`}
              />
              <br />
              <InlineMath math={`a=${pp(val)}\\,${unitA}`} />
              <p>
                Die Beschleunigung des Autos beträgt{' '}
                <InlineMath math={`a=${pp(val)}\\,${unitA}`} />.
              </p>
            </>
          )
        }

        // data.target1 === 't'
        const val = round2(data.v / data.a)
        return (
          <>
            <p>
              Setze die bekannten Werte ein und forme nach{' '}
              <InlineMath math="t" /> um.
            </p>
            <InlineMath math={`v=a\\cdot\\,t`} />
            <br />
            <InlineMath
              math={`${pp(data.v)}\\,${unitV}=${pp(data.a)}\\,${unitA}\\cdot\\,t \\quad |:{${pp(data.a)}\\,${unitA}}`}
            />
            <br />

            <InlineMath
              math={`t=\\tfrac{${pp(data.v)}\\,${unitV}}{${pp(data.a)}\\,${unitA}}`}
            />
            <br />
            <InlineMath math={`t=${pp(val)}\\,${unitT}`} />
            <p>
              Die Zeit in der das Auto beschleunigt hat, beträgt{' '}
              <InlineMath math={`t=${pp(val)}\\,${unitT}`} />.
            </p>
          </>
        )
      },
    },

    // Teil 2: s = 1/2 a t^2  (gesucht: NUR s)
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        const unitA = '\\tfrac{\\mathrm m}{\\mathrm s^{2}}'
        const unitT = '\\mathrm s'

        return (
          <>
            <p>
              Bestimme die zurückgelegte Strecke <InlineMath math="s" /> während
              dieser Beschleunigung.
            </p>
            <p>
              Formel:&nbsp;
              <InlineMath math={`s=\\tfrac12\\cdot a\\cdot t^{2}`} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const val = round2(0.5 * data.a * data.t * data.t)
        return (
          <>
            <p>
              Setze die bekannten Werte ein und berechne <InlineMath math="s" />
              .
            </p>
            <InlineMath math={`s=\\tfrac12\\cdot a\\cdot t^{2}`} />
            <br />
            <InlineMath
              math={`s=\\tfrac12\\cdot ${pp(data.a)}\\,\\tfrac{\\mathrm m}{\\mathrm s^{2}}\\cdot (${pp(data.t)}\\,\\mathrm s)^{2}`}
            />
            <br />
            <InlineMath math={`s=${pp(val)}\\,\\mathrm m`} />
            <p>
              Während der Beschleunigung legt das Auto die Strecke{' '}
              <InlineMath math={`s=${pp(val)}\\,\\mathrm m`} /> zurück.
            </p>
          </>
        )
      },
    },
  ],
}
