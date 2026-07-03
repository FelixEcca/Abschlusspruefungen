import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type DATA = {
  // Kreis
  D: number // Durchmesser [cm]
  r: number // Radius [cm]

  // Angaben aus der Figur
  PB: number // obere rechte Sehne PB [cm]
  angleA_low: number // Winkel unten links bei A [°] (z. B. 30/45/60)

  // Gesuchte Größen
  x: number // AQ [cm]
  y: number // AP [cm]
  alpha: number // ∠A im oberen Dreieck [°]
  beta: number // ∠B im unteren Dreieck [°]
}

export const exercise3207: Exercise<DATA> = {
  title: 'Figuren',
  source: '2025 Wahlteil Aufgabe 3A',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // Durchmesser (gerade, „schön“)
    const D = rng.randomItemFromArray([6, 8, 10, 12])
    const r = D / 2

    // Unten: Winkel bei A
    const angleA_low = rng.randomItemFromArray([30, 45, 60])

    // Oben: PB im Bereich 0.70..0.90 * D (Hundertstel)
    const PB =
      Math.round(
        rng.randomIntBetween(
          Math.round(0.7 * D * 100),
          Math.round(0.9 * D * 100),
        ),
      ) / 100

    // Unteres Thales-Dreieck AQB (Hypotenuse AB=D)
    const x = D * Math.cos((angleA_low * Math.PI) / 180)
    const beta = 90 - angleA_low

    // Oberes Thales-Dreieck APB (Hypotenuse AB=D)
    const y = Math.sqrt(Math.max(0, D * D - PB * PB))
    const alpha = (Math.asin(Math.min(1, PB / D)) * 180) / Math.PI

    return { D, r, PB, angleA_low, x, y, alpha, beta }
  },

  // Beispiel-Instanz (entspricht dem Originalstil)
  originalData: {
    D: 8,
    r: 4,
    PB: 6.93,
    angleA_low: 45,
    x: 8 / Math.SQRT2,
    y: Math.sqrt(64 - 6.93 * 6.93),
    alpha: (Math.asin(6.93 / 8) * 180) / Math.PI,
    beta: 45,
  } as DATA,

  constraint({ data }) {
    return (
      data.D > 0 &&
      Math.abs(data.r - data.D / 2) < 1e-9 &&
      data.PB > 0 &&
      data.PB < data.D &&
      data.angleA_low > 0 &&
      data.angleA_low < 90 &&
      isFinite(data.x) &&
      isFinite(data.y) &&
      data.y >= 0 &&
      isFinite(data.alpha) &&
      isFinite(data.beta)
    )
  },

  intro({ data }) {
    const W = 328,
      H = 200
    const cx = 164,
      cy = 100,
      R = 85

    // Durchmesser-Endpunkte (horizontal wie im Original)
    const A = { x: cx - R, y: cy }
    const B = { x: cx + R, y: cy }

    // Unteres Dreieck A–Q–B: Winkel bei A = angleA_low (unterhalb des Durchmessers)
    const theta = (data.angleA_low * Math.PI) / 180
    const vQx = Math.cos(-theta),
      vQy = Math.sin(-theta)
    const tQ = 2 * R * Math.cos(theta) // Schnittstrecke bis zum Kreisrand
    const Q = { x: A.x + tQ * vQx, y: A.y + tQ * vQy }

    // Oberes Dreieck A–P–B: |PB| vorgegeben (in cm); chord condition: 2R*sin(phi/2) (px) entspricht (PB/D)*2R
    // -> sin(phi/2) = PB/D  => phi = 2*asin(PB/D)
    const phi = 2 * Math.asin(Math.min(1, data.PB / data.D))
    const P = { x: cx + R * Math.cos(phi), y: cy + R * Math.sin(phi) }

    // Hilfsfunktionen
    const mid = (U: { x: number; y: number }, V: { x: number; y: number }) => ({
      x: (U.x + V.x) / 2,
      y: (U.y + V.y) / 2,
    })
    const mQB = mid(Q, B)
    const mAB = mid(A, B)
    const dir = (U: { x: number; y: number }, V: { x: number; y: number }) =>
      Math.atan2(V.y - U.y, V.x - U.x)
    const arcPath = (
      C: { x: number; y: number },
      r: number,
      a0: number,
      a1: number,
      sweep = 1,
    ) => {
      const x0 = C.x + r * Math.cos(a0),
        y0 = C.y + r * Math.sin(a0)
      const x1 = C.x + r * Math.cos(a1),
        y1 = C.y + r * Math.sin(a1)
      const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0
      return `M ${x0} ${y0} A ${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`
    }

    // Winkelbögen
    const alphaArc = arcPath(A, 16, 0, dir(A, P), 1) // α am Punkt A (oben)
    const betaArc = arcPath(B, 16, Math.PI, dir(B, P), 0) // β am Punkt B (oben)
    const lowArc = arcPath(A, 22, 0, -theta, 0)

    return (
      <div className="space-y-2">
        <p>
          Die Abbildung zeigt einen Kreis mit dem Mittelpunkt M und einem
          Durchmesser von 8 cm.
        </p>

        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
          {/* Kreis */}
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="black"
            strokeWidth={2}
          />
          {/* Durchmesser AB */}
          <line
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="black"
            strokeWidth={2}
          />
          {/* Mittelpunkt */}
          <circle cx={cx} cy={cy} r={2.5} fill="black" />
          <text
            x={cx}
            y={cy - 7}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            M
          </text>
          {/* Sehnen der beiden (Thales-)Dreiecke */}
          <line
            x1={A.x}
            y1={A.y}
            x2={P.x}
            y2={P.y}
            stroke="black"
            strokeWidth={2}
          />{' '}
          {/* y */}
          <line
            x1={P.x}
            y1={P.y}
            x2={B.x}
            y2={B.y}
            stroke="black"
            strokeWidth={2}
          />{' '}
          {/* PB */}
          <line
            x1={A.x}
            y1={A.y}
            x2={Q.x}
            y2={Q.y}
            stroke="black"
            strokeWidth={2}
          />{' '}
          {/* x */}
          <line
            x1={Q.x}
            y1={Q.y}
            x2={B.x}
            y2={B.y}
            stroke="black"
            strokeWidth={2}
          />
          {/* Längen-Labels */}
          <text
            x={mQB.x + 25}
            y={mQB.y - 15}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            {pp(Math.round(data.PB * 100) / 100)} cm
          </text>
          <text
            x={mAB.x}
            y={mAB.y + 16}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            {pp(Math.round(data.D * 100) / 100)} cm
          </text>
          <text
            x={(A.x + P.x) / 2 + 7}
            y={(A.y + P.y) / 2 + 1}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            x
          </text>
          <text
            x={(A.x + Q.x) / 2 + 15}
            y={(A.y + Q.y) / 2}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            y
          </text>
          {/* Winkelbögen & Beschriftungen */}
          <path d={alphaArc} fill="none" stroke="black" strokeWidth={2} />
          <text
            x={A.x + 30}
            y={A.y - 8}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            α
          </text>
          <path d={betaArc} fill="none" stroke="black" strokeWidth={2} />
          <text
            x={B.x - 25}
            y={B.y + 15}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            β
          </text>
          <path d={lowArc} fill="none" stroke="black" strokeWidth={2} />
          <text
            x={A.x + 27}
            y={A.y + 20}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            {pp(Math.round(data.angleA_low * 100) / 100)}°
          </text>
        </svg>
        <p>Die Skizze ist nicht maßstabsgetreu.</p>
      </div>
    )
  },

  tasks: [
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Begründen Sie, dass die beiden dargestellten Dreiecke rechtwinklig
            sind.
          </p>
        )
      },
      solution() {
        return (
          <p>
            Beide Dreiecke haben die Strecke mit den Endpunkten des Durchmessers
            als Hypotenuse. Da der Kreis mit dem Mittelpunkt M genau durch die
            Eckpunkte der Dreiecke verläuft, sind diese rechtwinklig
            (Thaleskreis).
          </p>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie folgende Größen:
            <br />• die Seitenlängen <InlineMath math="x" /> und{' '}
            <InlineMath math="y" /> und
            <br />• die Größen der Winkel α und β.
          </p>
        )
      },
      solution({ data }) {
        const xR = Math.round(data.x * 100) / 100
        const yR = Math.round(data.y * 100) / 100
        const alphaR = Math.round(data.alpha * 100) / 100
        const betaR = Math.round(data.beta * 100) / 100

        return (
          <div className="space-y-2">
            <p>
              Im oberen Dreieck lässt sich y mit dem Satz des Pythagoras
              berechnen:
            </p>
            <BlockMath
              math={String.raw`
              \begin{aligned}
              
             
              y&=\sqrt{${pp(Math.round(data.D * 100) / 100)}^{2}-${pp(Math.round(data.PB * 100) / 100)}^{2}}\\
                 &= ${pp(yR)}\,\text{cm},\\
              
              \end{aligned}
            `}
            />
            <p>
              Verwende die Winkelfunktion Kosinus, um im unteren Dreieck die
              Länge x zu berechnen.
            </p>
            <BlockMath
              math={String.raw`
              \begin{aligned}
               d=${pp(Math.round(data.D * 100) / 100)}\,\text{cm}&,\ \alpha=${pp(data.angleA_low)}^\circ\\
              \cos(\alpha)&=\dfrac{x}{d}\\
              \cos(${pp(data.angleA_low)}^\circ)&=\dfrac{x}{${pp(Math.round(data.D * 100) / 100)}}\\
              \cos(${pp(data.angleA_low)}^\circ)\cdot{${pp(Math.round(data.D * 100) / 100)}}&=x\\
              x&=${pp(xR)}\,\text{cm}.
              \end{aligned}
            `}
            />
          </div>
        )
      },
    },
  ],
}
