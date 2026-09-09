import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'componentsFromVAngle' | 'vFromComponents' | 'angleFromComponents'

interface DATA {
  mode: Mode
  v: number // Betrag der Geschwindigkeit
  vx: number
  vy: number
  alphaDeg: number // Winkel zwischen v und x-Achse in Grad
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6000: Exercise<DATA> = {
  title: 'Geschwindigkeit in mehreren Dimensionen',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray([
      'componentsFromVAngle',
      'vFromComponents',
      'angleFromComponents',
    ])

    // „schöne“ Winkel
    const possibleAngles = [15, 30, 37, 45, 53, 60, 75]

    if (mode === 'componentsFromVAngle') {
      const v = rng.randomIntBetween(5, 20) // m/s
      const alphaDeg = rng.randomItemFromArray(possibleAngles)
      const rad = (alphaDeg * Math.PI) / 180
      const vx = round2(v * Math.cos(rad))
      const vy = round2(v * Math.sin(rad))
      return { mode, v, vx, vy, alphaDeg }
    }

    if (mode === 'vFromComponents') {
      const vx = rng.randomIntBetween(2, 12)
      const vy = rng.randomIntBetween(2, 12)
      const v = round2(Math.sqrt(vx * vx + vy * vy))
      const alphaDeg = round2((Math.atan2(vy, vx) * 180) / Math.PI)
      return { mode, v, vx, vy, alphaDeg }
    }

    // mode === 'angleFromComponents'
    let vx = rng.randomIntBetween(2, 12)
    let vy = rng.randomIntBetween(2, 12)
    const v = round2(Math.sqrt(vx * vx + vy * vy))
    const alphaDeg = round2((Math.atan2(vy, vx) * 180) / Math.PI)
    return { mode, v, vx, vy, alphaDeg }
  },

  originalData: {
    mode: 'componentsFromVAngle',
    v: 10,
    alphaDeg: 37,
    vx: round2(10 * Math.cos((37 * Math.PI) / 180)),
    vy: round2(10 * Math.sin((37 * Math.PI) / 180)),
  },

  constraint({ data }) {
    // keine degenerierten Fälle
    return data.v > 0 && (data.vx !== 0 || data.vy !== 0)
  },

  task({ data }) {
    const { mode, v, vx, vy, alphaDeg } = data

    return (
      <>
        <p>Eine Kugel befindet sich im waagerechten Wurf.</p>
        <svg viewBox="0 0 328 140">
          <image
            href="/content/Physik_TG11/6000_3.png"
            height="140"
            width="328"
          />
        </svg>

        {mode === 'componentsFromVAngle' && (
          <>
            <p>Der Betrag der Geschwindigkeit und der Winkel sind gegeben:</p>
            <ul className="list-disc ml-6">
              <li>
                <InlineMath
                  math={`v = ${pp(v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
                />
              </li>
              <li>
                <InlineMath math={`\\alpha = ${pp(alphaDeg)}^{\\circ} `} />
              </li>
            </ul>
            <p>
              Berechne die Komponenten <InlineMath math={'v_x'} /> und{' '}
              <InlineMath math={'v_y'} />.
            </p>
          </>
        )}

        {mode === 'vFromComponents' && (
          <>
            <p>Die Komponenten der Geschwindigkeit sind gegeben:</p>
            <ul className="list-disc ml-6">
              <li>
                <InlineMath
                  math={`v_x = ${pp(vx)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
                />
              </li>
              <li>
                <InlineMath
                  math={`v_y = ${pp(vy)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
                />
              </li>
            </ul>
            <p>
              Bestimme den Betrag der Geschwindigkeit <InlineMath math={'v'} />.
            </p>
          </>
        )}

        {mode === 'angleFromComponents' && (
          <>
            <p>Die Komponenten der Geschwindigkeit sind gegeben:</p>
            <ul className="list-disc ml-6">
              <li>
                <InlineMath
                  math={`v_x = ${pp(vx)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
                />
              </li>
              <li>
                <InlineMath
                  math={`v_y = ${pp(vy)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
                />
              </li>
            </ul>
            <p>
              Bestimme denAufprallwinkel <InlineMath math={'\\alpha'} />{' '}
              zwischen <InlineMath math={'\\vec v'} /> und der Horizontalen.
            </p>
          </>
        )}
      </>
    )
  },

  solution({ data }) {
    const { mode, v, vx, vy, alphaDeg } = data

    if (mode === 'componentsFromVAngle') {
      const rad = (alphaDeg * Math.PI) / 180
      const vxCalc = round2(v * Math.cos(rad))
      const vyCalc = round2(v * Math.sin(rad))

      return (
        <>
          <InlineMath math={'cos(\\alpha) = \\frac{v_x}{v}\\quad |\\cdot v'} />
          <br />
          <InlineMath math={'v_x = v\\cdot \\cos(\\alpha)'} />
          <br />
          <InlineMath
            math={`v_x = ${pp(v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot\\cos(${pp(
              alphaDeg,
            )}^{\\circ})`}
          />
          <br />
          <InlineMath
            math={`v_x \\approx ${pp(vxCalc)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
          <br />
          <br />
          <InlineMath math={'sin(\\alpha) = \\frac{v_y}{v}\\quad |\\cdot v'} />
          <br />
          <InlineMath math={'v_y = v\\cdot \\sin(\\alpha)'} />
          <br />
          <InlineMath
            math={`v_y = ${pp(v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot\\sin(${pp(
              alphaDeg,
            )}^{\\circ})`}
          />
          <br />
          <InlineMath
            math={`v_y \\approx ${pp(vyCalc)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
        </>
      )
    }

    if (mode === 'vFromComponents') {
      const vCalc = round2(Math.sqrt(vx * vx + vy * vy))

      return (
        <>
          <svg viewBox="0 0 328 140">
            <image
              href="/content/Physik_TG11/6000_4.png"
              height="140"
              width="328"
            />
          </svg>
          <p>Im rechtwinkligen Dreieck gilt mit dem Satz des Pythagoras:</p>
          <InlineMath math={'v = \\sqrt{v_x^{2} + v_y^{2}}'} />
          <br />
          <InlineMath
            math={`v = \\sqrt{(${pp(vx)}\\,\\tfrac{\\mathrm m}{\\mathrm s})^{2} + (${pp(
              vy,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s})^{2}}`}
          />
          <br />
          <InlineMath
            math={`v \\approx ${pp(vCalc)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
        </>
      )
    }

    // angleFromComponents
    const alpha = round2((Math.atan2(vy, vx) * 180) / Math.PI)

    return (
      <>
        <p>
          Der Winkel liegt zwischen <InlineMath math={'\\vec v'} /> und der
          Horizontalen und steckt auch im rechtwinkligen Dreieck, siehe Skizze.
        </p>
        <svg viewBox="0 0 328 140">
          <image
            href="/content/Physik_TG11/6000_2.png"
            height="140"
            width="328"
          />
        </svg>
        <p>Im rechtwinkligen Dreieck gilt:</p>
        <InlineMath math={'\\tan\\alpha = \\tfrac{v_y}{v_x}'} />
        <br />
        <InlineMath math={`\\tan\\alpha = \\tfrac{${pp(vy)}}{${pp(vx)}}`} />
        <br />
        <InlineMath
          math={`\\alpha = \\arctan\\left(\\tfrac{${pp(
            vy,
          )}}{${pp(vx)}}\\right) \\approx ${pp(alpha)}^{\\circ}`}
        />
      </>
    )
  },
}
