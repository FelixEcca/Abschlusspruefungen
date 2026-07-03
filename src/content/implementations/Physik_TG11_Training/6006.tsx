import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  vx: number // m/s
  h: number // m
  g: number // m/s²

  t: number // s
  vy: number // m/s (beim Aufprall)
  v: number // m/s (Resultierende)
  alpha: number // ° (Aufprallwinkel unter der Waagerechten)
  sx: number // m
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6006: Exercise<DATA> = {
  title: 'Waagerechter Wurf',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const g = 9.81
    const vx = rng.randomIntBetween(2, 8) // m/s
    const h = rng.randomIntBetween(8, 20) / 10 // 0.8..2.0 m

    const t = Math.sqrt((2 * h) / g)
    const vy = g * t
    const v = Math.sqrt(vx * vx + vy * vy)
    const alpha = (Math.atan(vy / vx) * 180) / Math.PI
    const sx = vx * t

    return {
      vx: round2(vx),
      h: round2(h),
      g,
      t: round2(t),
      vy: round2(vy),
      v: round2(v),
      alpha: round2(alpha),
      sx: round2(sx),
    }
  },

  originalData: {
    vx: 3,
    h: 1.2,
    g: 9.81,
    t: 0.49,
    vy: 4.81,
    v: 5.63,
    alpha: 58.0,
    sx: 1.47,
  },

  constraint({ data }) {
    return data.vx > 0 && data.h > 0
  },

  intro({ data }) {
    return (
      <>
        <p>
          Eine Kugel rollt waagerecht von einem Tisch. Ihre anfängliche
          waagerechte Geschwindigkeit beträgt{' '}
          <InlineMath
            math={`v_x = ${pp(data.vx)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
          . Die Tischhöhe beträgt{' '}
          <InlineMath math={`h = ${pp(data.h)}\\,\\mathrm m`} />. Die
          Erdbeschleunigung sei{' '}
          <InlineMath
            math={`g = ${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm{s}^2}`}
          />
          .
        </p>
        <svg viewBox="0 0 328 180" className="my-2">
          {/* Tisch */}
          <rect x="40" y="40" width="120" height="10" fill="#cccccc" />
          <rect x="140" y="50" width="20" height="90" fill="#cccccc" />
          {/* Kugel-Start */}
          <circle cx="80" cy="35" r="6" fill="#4da6ff" />
          {/* vx-Pfeil */}
          <line x1="86" y1="35" x2="120" y2="35" stroke="black" />
          <polygon points="120,35 114,32 114,38" fill="black" />
          <text x="95" y="25" fontSize="12">
            vₓ
          </text>
          {/* Flugbahn */}

          {/* Boden */}
          <line x1="30" y1="140" x2="300" y2="140" stroke="black" />
        </svg>
      </>
    )
  },

  tasks: [
    // a) vy
    {
      points: 10,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Berechne die Zeit <InlineMath math={`t`} />, die sich die Kugel im
              freien Fall befindet und die senkrechte Geschwindigkeit{' '}
              <InlineMath math={`v_y`} /> der Kugel beim Aufprall auf dem Boden.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Zuerst die Fallzeit <InlineMath math={`t`} />:{' '}
            </p>
            <p>Mit der Formel für die beschleunigte Bewegung gilt:</p>
            <InlineMath math={`s = \\tfrac{1}{2}g t²`} />
            <p>
              Setze die Höhe des Tisches und{' '}
              <InlineMath
                math={`g = 9,81\\,\\tfrac{\\mathrm m}{\\mathrm{s}^2}`}
              />{' '}
              ein und löse nach <InlineMath math={`t`} />:
            </p>
            <InlineMath
              math={`${pp(data.h)}\\,\\mathrm{m} = \\tfrac{1}{2}\\cdot  ${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm{s}^2} \\cdot t²\\quad | \\cdot \\tfrac{2}{${pp(data.g)}}`}
            />
            <br></br>
            <InlineMath
              math={`t² = \\tfrac{2\\cdot ${pp(data.h)}\\,\\mathrm{m}}{${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm{s}^2}}\\qquad\\qquad\\qquad | \\sqrt{}`}
            />
            <br></br>
            <InlineMath
              math={`t = \\sqrt{\\tfrac{2\\cdot ${pp(data.h)}\\,\\mathrm{m}}{${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm{s}^2}}}\\approx ${pp(data.t)}\\,\\mathrm s`}
            />
            <p className="mt-2">
              Dann gilt für die Geschwindigkeit im Fall nach unten:{' '}
              <InlineMath math={`v_y = g\\cdot t`} />.
            </p>
            <InlineMath
              math={`v_y = ${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm{s}^2}\\cdot ${pp(
                data.t,
              )}\\,\\mathrm s \\approx ${pp(
                data.vy,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />
          </>
        )
      },
    },

    // b) Aufprallwinkel
    {
      points: 10,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Bestimme den Aufprallwinkel.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Es gilt <InlineMath math={`\\tan\\alpha = \\tfrac{v_y}{v_x}`} />.
            </p>
            <InlineMath
              math={`\\alpha = \\arctan\\left(\\tfrac{${pp(
                data.vy,
              )}}{${pp(data.vx)}}\\right) \\approx ${pp(data.alpha)}^{\\circ}`}
            />
          </>
        )
      },
    },

    // c) Gesamtgeschwindigkeit
    {
      points: 10,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Berechne die Betrag der Gesamtgeschwindigkeit{' '}
              <InlineMath math={`v`} /> beim Aufprall.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Gesamtgeschwindigkeit ist:<br></br>{' '}
              <InlineMath math={`v = \\sqrt{v_x^2 + v_y^2}`} />.
            </p>
            <InlineMath
              math={`v = \\sqrt{${pp(
                data.vx,
              )}^2 + ${pp(data.vy)}^2}\\,\\tfrac{\\mathrm m}{\\mathrm s}
              \\approx ${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />
          </>
        )
      },
    },

    // d) Weite s_x
    {
      points: 12,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Wie weit entfernt vom Tisch landet die Kugel? Berechne die
              horizontale Weite <InlineMath math={`s_x`} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die horizontale Bewegung ist gleichförmig:{' '}
              <InlineMath math={`s_x = v_x\\cdot t`} />.
            </p>
            <InlineMath
              math={`s_x = ${pp(data.vx)}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot ${pp(
                data.t,
              )}\\,\\mathrm s \\approx ${pp(data.sx)}\\,\\mathrm m`}
            />
          </>
        )
      },
    },
  ],
}
