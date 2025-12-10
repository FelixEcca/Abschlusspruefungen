import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type DiagramType = 'a' | 'v' | 's'
type MotionType = 'uniform' | 'accelerated' | 'decelerated'

interface Variant {
  diagram: DiagramType
  motion: MotionType
}

interface DATA {
  variant: number
}

const VARIANTS: Variant[] = [
  // a-t
  { diagram: 'a', motion: 'uniform' }, // a = 0
  { diagram: 'a', motion: 'accelerated' }, // a > 0
  { diagram: 'a', motion: 'decelerated' }, // a < 0
  // v-t
  { diagram: 'v', motion: 'uniform' }, // v = konst.
  { diagram: 'v', motion: 'accelerated' }, // v steigt
  { diagram: 'v', motion: 'decelerated' }, // v sinkt
  // s-t
  { diagram: 's', motion: 'uniform' }, // s linear
  { diagram: 's', motion: 'accelerated' }, // s gekrümmt steiler
  { diagram: 's', motion: 'decelerated' }, // s gekrümmt flacher
]

function renderDiagram(variant: Variant) {
  const w = 328
  const h = 200

  const axisColor = '#000'
  const curveColor = '#007ec1'

  const commonAxes = (
    <>
      {/* x-Achse (t) */}
      <line x1="40" y1="160" x2="300" y2="160" stroke={axisColor} />
      <polygon points="300,160 294,156 294,164" fill={axisColor} />
      <text x="305" y="165" fontSize="12">
        t
      </text>

      {/* y-Achse */}
      <line x1="40" y1="30" x2="40" y2="160" stroke={axisColor} />
      <polygon points="40,30 36,36 44,36" fill={axisColor} />
    </>
  )

  if (variant.diagram === 'a') {
    const label = 'a'
    let y: number
    if (variant.motion === 'uniform')
      y = 160 // a = 0
    else if (variant.motion === 'accelerated') y = 90
    else y = 210 - 90 // unterhalb der x-Achse

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="my-2">
        {commonAxes}
        <text x="20" y="35" fontSize="12">
          {label}
        </text>
        {/* Null-Linie */}
        <line
          x1="40"
          y1="160"
          x2="300"
          y2="160"
          stroke="#888"
          strokeDasharray="4 4"
        />
        {/* a-Linie */}
        <line
          x1="40"
          y1={y}
          x2="290"
          y2={y}
          stroke={curveColor}
          strokeWidth={3}
        />
      </svg>
    )
  }

  if (variant.diagram === 'v') {
    const label = 'v'

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="my-2">
        {commonAxes}
        <text x="20" y="35" fontSize="12">
          {label}
        </text>
        {variant.motion === 'uniform' && (
          <line
            x1="40"
            y1="90"
            x2="290"
            y2="90"
            stroke={curveColor}
            strokeWidth={3}
          />
        )}
        {variant.motion === 'accelerated' && (
          <line
            x1="40"
            y1="140"
            x2="290"
            y2="60"
            stroke={curveColor}
            strokeWidth={3}
          />
        )}
        {variant.motion === 'decelerated' && (
          <line
            x1="40"
            y1="60"
            x2="290"
            y2="140"
            stroke={curveColor}
            strokeWidth={3}
          />
        )}
      </svg>
    )
  }

  // s-t Diagramme
  const label = 's'
  // Skalierungsfunktion für Koordinatensysteme:
  function toX(n: number) {
    return 40 + n * ((94.5 * 2) / 10)
  }
  function toY(n: number) {
    return 160 - n * ((94.5 * 2) / 10)
  }

  //Funktion, die Punkte von Graphen anlegt
  function generateParabolaPoints(): string {
    let points = ''
    for (let x = 0; x <= 9; x += 0.1) {
      const y = 0.06 * x * x
      points += `${toX(x)},${toY(y)} `
    }
    return points.trim()
  }
  function generateDownwardParabolaPoints(): string {
    let points = ''
    for (let x = 0; x <= 9; x += 0.1) {
      const y = -0.06 * x * x + 6
      points += `${toX(x)},${toY(y)} `
    }
    return points.trim()
  }
  function generateUniformPoints(): string {
    let points = ''
    for (let x = 0; x <= 13; x += 0.1) {
      const y = 0.1 * x
      points += `${toX(x)},${toY(y)} `
    }
    return points.trim()
  }

  // Variable, die Funktion abruft:
  const parabolaPoints = generateParabolaPoints()
  const uniformPoints = generateUniformPoints()
  const downwardParabolaPoints = generateDownwardParabolaPoints()

  // Polyline für svg-Umgebung

  if (variant.motion === 'uniform') {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="my-2">
        {commonAxes}
        <text x="20" y="35" fontSize="12">
          {label}
        </text>
        <polyline
          points={uniformPoints}
          stroke="blue"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    )
  }

  if (variant.motion === 'accelerated') {
    // nach oben gekrümmte Kurve
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="my-2">
        {commonAxes}
        <text x="20" y="35" fontSize="12">
          {label}
        </text>
        <polyline
          points={parabolaPoints}
          stroke="blue"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    )
  }

  // decelerated: Kurve wird flacher
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="my-2">
      {commonAxes}
      <text x="20" y="35" fontSize="12">
        {label}
      </text>
      <polyline
        points={downwardParabolaPoints}
        stroke="blue"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}

function motionLabel(motion: MotionType) {
  if (motion === 'uniform') return 'gleichförmige Bewegung'
  if (motion === 'accelerated') return 'gleichmäßig beschleunigte Bewegung'
  return 'gleichmäßig verzögerte Bewegung'
}

export const exercise6007: Exercise<DATA> = {
  title: 'Bewegungsdiagramme',
  source: 'Kinematik',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const variant = rng.randomIntBetween(0, VARIANTS.length - 1)
    return { variant }
  },

  originalData: {
    variant: 3,
  },

  constraint({ data }) {
    return data.variant >= 0 && data.variant < VARIANTS.length
  },

  task({ data }) {
    const v = VARIANTS[data.variant]
    const diagLabel =
      v.diagram === 'a'
        ? 'a-t-Diagramm'
        : v.diagram === 'v'
          ? 'v-t-Diagramm'
          : 's-t-Diagramm'

    return (
      <>
        <p>
          Unten siehst du ein {diagLabel}. Die Bewegung findet nur in eine
          Richtung statt.
        </p>
        {renderDiagram(v)}
        <p className="mt-2">
          Entscheide, welche Bewegungsform dargestellt ist:
        </p>
        <ul className="list-disc ml-6">
          <li>gleichförmige Bewegung</li>
          <li>gleichmäßig beschleunigte Bewegung</li>
          <li>gleichmäßig verzögerte Bewegung</li>
        </ul>
      </>
    )
  },

  solution({ data }) {
    const v = VARIANTS[data.variant]
    return (
      <>
        <p>
          Im Diagramm ist eine <b>{motionLabel(v.motion)}</b> dargestellt.
        </p>
        {v.diagram === 'a' && (
          <p className="mt-1">
            Im a-t-Diagramm erkennt man: konstantes <InlineMath math="a" />{' '}
            bedeutet gleichmäßige Beschleunigung bzw. Verzögerung;{' '}
            <InlineMath math="a=0" /> entspricht einer gleichförmigen Bewegung.
          </p>
        )}
        {v.diagram === 'v' && (
          <p className="mt-1">
            Im v-t-Diagramm bedeutet eine waagerechte Linie gleichförmige
            Bewegung. Steigende Gerade: Beschleunigung, fallende Gerade:
            Verzögerung.
          </p>
        )}
        {v.diagram === 's' && (
          <p className="mt-1">
            Im s-t-Diagramm ist eine Gerade ein Hinweis auf gleichförmige
            Bewegung. Eine nach oben gekrümmte Kurve zeigt, dass die Strecke pro
            Zeit immer schneller zunimmt (Beschleunigung). Eine Kurve, die
            flacher wird, beschreibt eine Verzögerung.
          </p>
        )}
      </>
    )
  },
}
