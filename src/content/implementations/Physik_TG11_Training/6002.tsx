import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Scenario = 'elastic' | 'inelastic' | 'recoil'
type TargetElastic = 'v1f' | 'v2f'
type TargetInelastic = 'u' | 'v1' | 'v2'
type TargetRecoil = 'vGun'

interface DATA {
  scenario: Scenario

  // gemeinsam
  m1: number
  m2: number

  // vor dem Stoß
  v1: number
  v2: number

  // nach dem Stoß
  v1f?: number
  v2f?: number
  u?: number
  vGun?: number

  targetElastic?: TargetElastic
  targetInelastic?: TargetInelastic
  targetRecoil?: TargetRecoil
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6002: Exercise<DATA> = {
  title: 'Impulserhaltung bei Stößen',
  source: 'Impuls',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const scenario: Scenario = rng.randomItemFromArray([
      'elastic',
      'inelastic',
      'recoil',
    ])

    if (scenario === 'elastic') {
      const m = rng.randomIntBetween(1, 5)
      const v1 = rng.randomIntBetween(2, 6)
      const v2 = -rng.randomIntBetween(1, 4) // entgegenkommend
      const targetElastic: TargetElastic = rng.randomItemFromArray([
        'v1f',
        'v2f',
      ])

      const v1f = v2 // Tausch
      const v2f = v1

      return {
        scenario,
        m1: m,
        m2: m,
        v1,
        v2,
        v1f,
        v2f,
        targetElastic,
      }
    }

    if (scenario === 'inelastic') {
      // vollständig unelastisch
      const m1 = rng.randomIntBetween(1, 5)
      const m2 = rng.randomIntBetween(2, 7)
      const v2 = rng.randomIntBetween(-2, 2) // evtl. ruhend
      const u = rng.randomIntBetween(1, 5) // gemeinsame Geschwindigkeit nachher

      const targetInelastic: TargetInelastic = rng.randomItemFromArray([
        'u',
        'v1',
        'v2',
      ])

      let v1: number
      let v2Used = v2
      if (targetInelastic === 'u') {
        // wähle v1 direkt
        v1 = rng.randomIntBetween(2, 8)
      } else if (targetInelastic === 'v1') {
        // bestimme v1 aus Impulserhaltung
        // m1 v1 + m2 v2 = (m1 + m2) u
        v1 = ((m1 + m2) * u - m2 * v2Used) / m1
        v1 = round2(v1)
      } else {
        // target v2: bestimme v2 aus Gleichung
        v1 = rng.randomIntBetween(2, 8)
        v2Used = ((m1 + m2) * u - m1 * v1) / m2
        v2Used = round2(v2Used)
      }

      return {
        scenario,
        m1,
        m2,
        v1,
        v2: v2Used,
        u,
        targetInelastic,
      }
    }

    // scenario === 'recoil'
    const mGun = rng.randomIntBetween(3, 6) // kg
    const mBullet = rng.randomIntBetween(5, 15) / 1000 // kg
    const vBullet = rng.randomIntBetween(300, 600) // m/s
    const vGun = -round2((mBullet * vBullet) / mGun) // Rückstoßgeschwindigkeit

    return {
      scenario,
      m1: mGun,
      m2: mBullet,
      v1: 0, // Gewehr ruht
      v2: 0, // Kugel ruht
      vGun,
      v2f: vBullet,
      targetRecoil: 'vGun',
    }
  },

  originalData: {
    scenario: 'inelastic',
    m1: 2,
    m2: 3,
    v1: 4,
    v2: 0,
    u: 1.6,
    targetInelastic: 'u',
  },

  constraint({ data }) {
    return data.m1 > 0 && data.m2 > 0
  },

  task({ data }) {
    const unitM = '\\mathrm{kg}'
    const unitV = '\\tfrac{\\mathrm m}{\\mathrm s}'

    if (data.scenario === 'elastic') {
      const askV1 = data.targetElastic === 'v1f'
      const v1fDisp = askV1 ? '\\square' : pp(data.v1f!)
      const v2fDisp = askV1 ? pp(data.v2f!) : '\\square'

      return (
        <>
          <p>
            Zwei gleich schwere Wagen stoßen auf einer Luftkissenbahn frontal
            zusammen. Der Stoß ist elastisch. Vor dem Stoß bewegen sie sich mit
            folgenden Geschwindigkeiten:
          </p>
          <ul className="list-disc ml-6">
            <li>
              <InlineMath math={`m_1 = m_2 = ${pp(data.m1)}\\,${unitM}`} />
            </li>
            <li>
              <InlineMath
                math={`v_{1} = ${pp(
                  data.v1,
                )}\\,${unitV},\\; v_{2} = ${pp(data.v2)}\\,${unitV}`}
              />
            </li>
            <li>
              <InlineMath
                math={`v'_{1} = ${v1fDisp}\\,${unitV},\\; v'_{2} = ${v2fDisp}\\,${unitV}`}
              />
            </li>
          </ul>
          <p>
            Bestimme die fehlende Endgeschwindigkeit nach dem Stoß mithilfe der
            Impulserhaltung.
          </p>
        </>
      )
    }

    if (data.scenario === 'inelastic') {
      const ask = data.targetInelastic
      const uDisp = ask === 'u' ? '\\square' : pp(data.u!)
      const v1Disp = ask === 'v1' ? '\\square' : pp(data.v1)
      const v2Disp = ask === 'v2' ? '\\square' : pp(data.v2)

      return (
        <>
          <p>
            Zwei Wagen stoßen auf einer Luftkissenbahn zusammen und bleiben nach
            dem Stoß aneinander hängen. Die Bewegung findet geradlinig statt.
          </p>
          <ul className="list-disc ml-6">
            <li>
              <InlineMath
                math={`m_1 = ${pp(data.m1)}\\,${unitM},\\; m_2 = ${pp(
                  data.m2,
                )}\\,${unitM}`}
              />
            </li>
            <li>
              <InlineMath
                math={`v_{1} = ${v1Disp}\\,${unitV},\\; v_{2} = ${v2Disp}\\,${unitV}`}
              />
            </li>
            <li>
              <InlineMath math={`u = ${uDisp}\\,${unitV}`} />
            </li>
          </ul>
          <p>
            Bestimme die fehlende Geschwindigkeit mithilfe des
            Impulserhaltungssatzes.
          </p>
        </>
      )
    }

    // recoil
    return (
      <>
        <p>
          Ein Gewehr mit der Masse{' '}
          <InlineMath
            math={`m_\\text{Gewehr} = ${pp(data.m1)}\\,\\mathrm{kg}`}
          />{' '}
          verschießt eine Kugel der Masse{' '}
          <InlineMath
            math={`m_\\text{Kugel} = ${pp(data.m2)}\\,\\mathrm{kg}`}
          />
          . Vor dem Schuss ist alles in Ruhe.
        </p>
        <p>
          Nach dem Schuss verlässt die Kugel das Gewehr mit einer
          Geschwindigkeit{' '}
          <InlineMath
            math={`v_\\text{Kugel} = ${pp(
              data.v2f!,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
          .
        </p>
        <p>
          Bestimme die Rückstoßgeschwindigkeit{' '}
          <InlineMath math={`v_\\text{Gewehr}`} /> des Gewehrs.
        </p>
      </>
    )
  },

  solution({ data }) {
    const unitM = '\\mathrm{kg}'
    const unitV = '\\tfrac{\\mathrm m}{\\mathrm s}'

    if (data.scenario === 'elastic') {
      const v1f = data.v2
      const v2f = data.v1
      const askV1 = data.targetElastic === 'v1f'

      if (askV1) {
        return (
          <>
            <p>Bei einem elastischen Stoß gleicher Massen werden die</p>
            <p>Geschwindigkeiten vertauscht.</p>
            <InlineMath math={`v'_{1} = v_{2} = ${pp(v1f)}\\,${unitV}`} />
            <br></br>
            <InlineMath math={`v'_{2} = v_{1} = ${pp(v2f)}\\,${unitV}`} />
          </>
        )
      }
      return (
        <>
          <p>Bei einem elastischen Stoß gleicher Massen werden die</p>
          <p>Geschwindigkeiten vertauscht.</p>
          <InlineMath math={`v'_{2} = v_{1} = ${pp(v2f)}\\,${unitV}`} />
          <br></br>
          <InlineMath math={`v'_{1} = v_{2} = ${pp(v2f)}\\,${unitV}`} />
        </>
      )
    }

    if (data.scenario === 'inelastic') {
      const m1 = data.m1
      const m2 = data.m2
      const u = data.u!
      const v1 = data.v1
      const v2 = data.v2

      if (data.targetInelastic === 'u') {
        const uCalc = round2((m1 * v1 + m2 * v2) / (m1 + m2))
        return (
          <>
            <InlineMath
              math={`m_1\\cdot v_1 + m_2\\cdot v_2 = (m_1+m_2)\\cdot u`}
            />
            <br />
            <InlineMath
              math={`${pp(m1)}\\,${unitM}\\cdot ${pp(
                v1,
              )}\\,${unitV} + ${pp(m2)}\\,${unitM}\\cdot ${pp(
                v2,
              )}\\,${unitV} = (${pp(m1)}+${pp(m2)})\\,${unitM}\\cdot u`}
            />
            <br />
            <InlineMath math={`u = ${pp(uCalc)}\\,${unitV}`} />
          </>
        )
      }

      if (data.targetInelastic === 'v1') {
        const v1Calc = round2(((m1 + m2) * u - m2 * v2) / m1)
        return (
          <>
            <p>Für den unelastischen Stoß gilt:</p>
            <InlineMath
              math={`m_1\\cdot v_1 + m_2\\cdot v_2 = (m_1+m_2)\\cdot u`}
            />
            <p>Setze die bekannten Werte ein und stelle die Gleichung um:</p>
            <InlineMath
              math={`${pp(m1)}\\,${unitM}\\cdot v_1 + ${pp(
                m2,
              )}\\,${unitM}\\cdot ${pp(v2)}\\,${unitV} = (${pp(m1)}+${pp(
                m2,
              )})\\,${unitM}\\cdot ${pp(u)}\\,${unitV}`}
            />
            <br />
            <InlineMath math={`v_1 = ${pp(v1Calc)}\\,${unitV}`} />
          </>
        )
      }

      // target v2
      const v2Calc = round2(((m1 + m2) * u - m1 * v1) / m2)
      return (
        <>
          <p>Für den unelastischen Stoß gilt:</p>
          <InlineMath
            math={`m_1\\cdot v_1 + m_2\\cdot v_2 = (m_1+m_2)\\cdot u`}
          />
          <p>Setze die bekannten Werte ein und stelle die Gleichung um:</p>
          <InlineMath
            math={`${pp(m1)}\\,${unitM}\\cdot ${pp(v1)}\\,${unitV} + ${pp(
              m2,
            )}\\,${unitM}\\cdot v_2 = (${pp(m1)}+${pp(
              m2,
            )})\\,${unitM}\\cdot ${pp(u)}\\,${unitV}`}
          />
          <br />
          <InlineMath math={`v_2 = ${pp(v2Calc)}\\,${unitV}`} />
        </>
      )
    }

    // recoil
    const vGun = data.vGun!
    return (
      <>
        <p>Vor dem Schuss ist der Gesamtimpuls null.</p>
        <InlineMath
          math={`0 = m_\\text{Gewehr}\\cdot v_\\text{Gewehr} + m_\\text{Kugel}\\cdot v_\\text{Kugel}`}
        />
        <br />
        <InlineMath
          math={`0 = ${pp(data.m1)}\\,${unitM}\\cdot v_\\text{Gewehr} + ${pp(
            data.m2,
          )}\\,${unitM}\\cdot ${pp(data.v2f!)}\\,${unitV}`}
        />
        <br />
        <InlineMath
          math={`v_\\text{Gewehr} = -\\tfrac{${pp(
            data.m2,
          )}\\,${unitM}\\cdot ${pp(
            data.v2f!,
          )}\\,${unitV}}{${pp(data.m1)}\\,${unitM}} = ${pp(vGun)}\\,${unitV}`}
        />
        <p>
          Die negative Geschwindigkeit gibt an, dass sich das Gewehr in die
          entgegengesetzte Richtung zur Kugel bewegt.
        </p>
      </>
    )
  },
}
