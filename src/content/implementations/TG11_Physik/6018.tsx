// exercise6018.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'steinwurf' | 'luftgewehr' | 'lawine'

interface DATA {
  kontext: Kontext

  m: number
  v: number
  h: number

  d: number
  s: number

  hStart: number
  hEnd: number
  deltaH: number

  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6018: Exercise<DATA> = {
  title: 'Energieerhaltung',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'steinwurf',
      'luftgewehr',
      'lawine',
    ])

    if (kontext === 'steinwurf') {
      const m = rng.randomItemFromArray([0.1, 0.2, 0.5, 1, 2])
      const v = rng.randomItemFromArray([8, 10, 12, 15, 18, 20])
      const h = round2((v * v) / (2 * 9.81))

      return {
        kontext,
        m,
        v,
        h,
        d: 0,
        s: 0,
        hStart: 0,
        hEnd: 0,
        deltaH: 0,
        result: h,
      }
    }

    if (kontext === 'luftgewehr') {
      const m = rng.randomItemFromArray([0.002, 0.003, 0.004, 0.005])
      const d = rng.randomItemFromArray([400, 600, 800, 1000, 1200])
      const s = rng.randomItemFromArray([0.04, 0.05, 0.06, 0.08])
      const v = round2(Math.sqrt((d * s * s) / m))

      return {
        kontext,
        m,
        v,
        h: 0,
        d,
        s,
        hStart: 0,
        hEnd: 0,
        deltaH: 0,
        result: v,
      }
    }

    const hStart = rng.randomItemFromArray([600, 800, 1000, 1200, 1500])
    const hEnd = rng.randomItemFromArray([200, 300, 400, 500])
    const deltaH = hStart - hEnd
    const v = round2(Math.sqrt(2 * 9.81 * deltaH))

    return {
      kontext,
      m: rng.randomItemFromArray([500, 800, 1000, 1500]),
      v,
      h: 0,
      d: 0,
      s: 0,
      hStart,
      hEnd,
      deltaH,
      result: v,
    }
  },

  originalData: {
    kontext: 'steinwurf',
    m: 0.5,
    v: 12,
    h: 7.34,
    d: 0,
    s: 0,
    hStart: 0,
    hEnd: 0,
    deltaH: 0,
    result: 7.34,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    if (data.kontext === 'steinwurf') {
      return (
        <>
          <p>
            Ein Stein mit der Masse{' '}
            <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} /> wird
            senkrecht nach oben geworfen.
          </p>
          <p>
            Beim Abwurf hat er die Geschwindigkeit{' '}
            <InlineMath
              math={`v=${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />
            .
          </p>
          <p>
            Berechnen Sie mithilfe der Energieerhaltung die maximale Höhe, die
            der Stein erreicht. Vernachlässigen Sie Luftreibung.
          </p>
        </>
      )
    }

    if (data.kontext === 'luftgewehr') {
      return (
        <>
          <p>
            Ein Luftgewehr enthält eine gespannte Feder mit der Federkonstante{' '}
            <InlineMath
              math={`D=${pp(data.d)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
            />
            .
          </p>
          <p>
            Die Feder ist um{' '}
            <InlineMath math={`s=${pp(data.s)}\\,\\mathrm m`} /> gespannt. Das
            Projektil hat die Masse{' '}
            <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} />.
          </p>
          <p>
            Berechnen Sie mithilfe der Energieerhaltung die Geschwindigkeit des
            Projektils. Vernachlässigen Sie Reibung.
          </p>
        </>
      )
    }

    return (
      <>
        <p>
          Eine Lawine löst sich in einer Höhe von{' '}
          <InlineMath math={`h_1=${pp(data.hStart)}\\,\\mathrm m`} />.
        </p>
        <p>
          Sie befindet sich später in einer Höhe von{' '}
          <InlineMath math={`h_2=${pp(data.hEnd)}\\,\\mathrm m`} />.
        </p>
        <p>
          Berechnen Sie mithilfe der Energieerhaltung die Geschwindigkeit der
          Lawine in dieser Höhe. Vernachlässigen Sie Reibung.
        </p>
      </>
    )
  },

  solution({ data }) {
    if (data.kontext === 'steinwurf') {
      return (
        <>
          <p>
            Die kinetische Energie wird vollständig in Lageenergie umgewandelt.
          </p>
          <InlineMath math={`E_\\mathrm{kin}=E_\\mathrm{pot}`} />
          <br />
          <InlineMath math={`\\frac12\\cdot m\\cdot v^2=m\\cdot g\\cdot h`} />

          <p>Die Masse kürzt sich heraus.</p>
          <InlineMath math={`\\frac12\\cdot v^2=g\\cdot h`} />
          <br />
          <InlineMath math={`h=\\frac{v^2}{2g}`} />

          <p>Einsetzen der Werte:</p>
          <InlineMath
            math={`h=\\frac{\\left(${pp(
              data.v,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\right)^2}{2\\cdot 9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}`}
          />
          <br />
          <InlineMath math={`h\\approx ${pp(data.result)}\\,\\mathrm m`} />
        </>
      )
    }

    if (data.kontext === 'luftgewehr') {
      return (
        <>
          <p>
            Die Spannenergie der Feder wird in kinetische Energie umgewandelt.
          </p>
          <InlineMath math={`E_\\mathrm{spann}=E_\\mathrm{kin}`} />
          <br />
          <InlineMath
            math={`\\frac12\\cdot D\\cdot s^2=\\frac12\\cdot m\\cdot v^2`}
          />

          <p>Nach der Geschwindigkeit umstellen:</p>
          <InlineMath math={`v=\\sqrt{\\frac{D\\cdot s^2}{m}}`} />

          <p>Einsetzen der Werte:</p>
          <InlineMath
            math={`v=\\sqrt{\\frac{${pp(
              data.d,
            )}\\,\\tfrac{\\mathrm N}{\\mathrm m}\\cdot \\left(${pp(
              data.s,
            )}\\,\\mathrm m\\right)^2}{${pp(data.m)}\\,\\mathrm{kg}}}`}
          />
          <br />
          <InlineMath
            math={`v\\approx ${pp(data.result)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
        </>
      )
    }

    return (
      <>
        <p>
          Die verlorene Lageenergie wird in kinetische Energie umgewandelt,
          wodurch die Geschwindigkeit größer wird.
        </p>
        <InlineMath
          math={`m\\cdot g\\cdot \\Delta h=\\frac12\\cdot m\\cdot \\Delta v^2`}
        />

        <p>Die Masse kürzt sich heraus.</p>
        <InlineMath math={`g\\cdot \\Delta h=\\frac12\\cdot \\Delta v^2`} />
        <br />
        <InlineMath math={`\\Delta v=\\sqrt{2\\cdot g\\cdot \\Delta h}`} />

        <p>Höhenunterschied:</p>
        <InlineMath
          math={`\\Delta h=${pp(data.hStart)}\\,\\mathrm m-${pp(
            data.hEnd,
          )}\\,\\mathrm m=${pp(data.deltaH)}\\,\\mathrm m`}
        />

        <p>Einsetzen der Werte:</p>
        <InlineMath
          math={`v=\\sqrt{2\\cdot 9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot ${pp(
            data.deltaH,
          )}\\,\\mathrm m}`}
        />
        <br />
        <InlineMath
          math={`v\\approx ${pp(data.result)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
        />
      </>
    )
  },
}
