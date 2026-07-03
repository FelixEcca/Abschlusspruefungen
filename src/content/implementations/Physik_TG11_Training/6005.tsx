import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  v1: number // m/s
  s01: number // m
  tQuery: number // s

  v2: number // m/s
  s02: number // m
  tMeet: number // s
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6005: Exercise<DATA> = {
  title: 'Bewegungsgleichung',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // Auto 1
    const v1 = rng.randomIntBetween(8, 20) // m/s
    const s01 = rng.randomIntBetween(0, 40) * 5 // 0..200 m
    const tQuery = rng.randomIntBetween(10, 30) // s

    // Auto 2: so wählen, dass Treffzeit nett und positiv ist
    let v2 = v1
    let s02 = 0
    let tMeet = 0

    while (v2 === v1 || tMeet <= 0 || tMeet > 120 || s02 < 0 || s02 > 300) {
      v2 = rng.randomIntBetween(5, 25)
      if (v2 === v1) continue
      tMeet = rng.randomIntBetween(5, 40)
      // s1(t) = v1 t + s01, s2(t) = v2 t + s02  ⇒  s02 = s01 + (v1 - v2) t
      s02 = s01 + (v1 - v2) * tMeet
    }

    return {
      v1,
      s01,
      tQuery,
      v2,
      s02,
      tMeet,
    }
  },

  originalData: {
    v1: 15,
    s01: 50,
    tQuery: 18,
    v2: 10,
    s02: 80,
    tMeet: 6,
  },

  constraint({ data }) {
    return (
      data.v1 !== data.v2 && data.tMeet > 0 && data.s02 >= 0 && data.s02 <= 500
    )
  },

  intro({ data }) {
    return (
      <>
        <p>
          Ein Auto fährt auf einer langen, geraden Straße. Die Entfernung vom
          Startpunkt wird mit <InlineMath math="s" /> in Metern gemessen, die
          Zeit mit <InlineMath math="t" /> in Sekunden.
        </p>
        <p>
          Das erste Auto startet bei{' '}
          <InlineMath math={`s_0 = ${pp(data.s01)}\\,\\mathrm m`} /> und fährt
          mit der konstanten Geschwindigkeit{' '}
          <InlineMath
            math={`v_1 = ${pp(data.v1)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
          .
        </p>
      </>
    )
  },

  tasks: [
    // a) Bewegungsgleichung
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Stelle die Bewegungsgleichung <InlineMath math={`s_1`} /> des
              ersten Autos in der Form{' '}
              <InlineMath math={`s = v\\cdot t + s_0`} /> auf.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`s = v\\cdot t + s_0`} />
            <br />
            <InlineMath
              math={`s_1 = ${pp(
                data.v1,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot t + ${pp(
                data.s01,
              )}\\,\\mathrm m`}
            />
          </>
        )
      },
    },

    // b) Ort nach tQuery
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Wo befindet sich das erste Auto nach{' '}
              <InlineMath math={`${pp(data.tQuery)}\\,\\mathrm s`} />
              ? Berechne die Strecke <InlineMath math={`s_1`} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const s = round2(data.v1 * data.tQuery + data.s01)
        return (
          <>
            <InlineMath math={`s_1 = v_1\\cdot t + s_0`} />
            <br />
            <InlineMath
              math={`s_1 = ${pp(data.v1)}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot ${pp(
                data.tQuery,
              )}\\,\\mathrm s + ${pp(data.s01)}\\,\\mathrm m`}
            />
            <br />
            <InlineMath math={`s_1 = ${pp(s)}\\,\\mathrm m`} />
          </>
        )
      },
    },

    // c) Treffen zweier Autos
    {
      points: 14,
      intro({ data }) {
        return (
          <>
            <p>
              Ein zweites Auto fährt auf derselben Straße. Für seine Bewegung
              gilt:
            </p>
            <p>
              <InlineMath
                math={`s_2 = ${pp(
                  data.v2,
                )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot t + ${pp(
                  data.s02,
                )}\\,\\mathrm m`}
              />
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>Bestimme, nach welcher Zeit sich die beiden Autos treffen.</p>
          </>
        )
      },
      solution({ data }) {
        const t = data.tMeet
        const sMeet = round2(data.v1 * t + data.s01)
        return (
          <>
            <p>Setze die beiden Bewegungsgleichungen gleich:</p>
            <InlineMath
              math={`${pp(data.v1)}t + ${pp(data.s01)} = ${pp(
                data.v2,
              )}t + ${pp(data.s02)}`}
            />
            <br />
            <InlineMath
              math={`${pp(data.v1 - data.v2)}t = ${pp(data.s02 - data.s01)}`}
            />
            <br />
            <InlineMath math={`t = ${pp(t)}\\,\\mathrm s`} />
            <p className="mt-2">
              Die Autos treffen sich nach{' '}
              <InlineMath math={`${pp(t)}\\,\\mathrm s`} /> in der Entfernung{' '}
              <InlineMath math={`${pp(sMeet)}\\,\\mathrm m`} /> vom Startpunkt.
            </p>
          </>
        )
      },
    },
  ],
}
