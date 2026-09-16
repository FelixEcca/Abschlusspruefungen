import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type Context = 'loadingRamp' | 'frameBrace' | 'liftingCable' | 'machineBracket'

interface DATA {
  context: Context
  angle: number
  knownLength: number
}

function radians(degrees: number) {
  return (degrees * Math.PI) / 180
}

function TrigSketch({
  data,
  solved = false,
}: {
  data: DATA
  solved?: boolean
}) {
  const angle = data.angle
  const length = data.knownLength / 2
  let adjacent = 'Ankathete'
  let opposite = 'Gegenkathete'
  let hypotenuse = 'Hypotenuse'

  if (data.context === 'loadingRamp') {
    const height = length * Math.tan(radians(angle))
    adjacent = `l = ${pp(length)} m`
    opposite = solved ? `h ≈ ${pp(height)} m` : 'h = ?'
    hypotenuse = 'Rampe'
  } else if (data.context === 'frameBrace') {
    const brace = length / Math.sin(radians(angle))
    opposite = `h = ${pp(length)} m`
    hypotenuse = solved ? `c ≈ ${pp(brace)} m` : 'c = ?'
  } else if (data.context === 'liftingCable') {
    const height = length * Math.sin(radians(angle))
    hypotenuse = `c = ${pp(length)} m`
    opposite = solved ? `h ≈ ${pp(height)} m` : 'h = ?'
  } else {
    const projection = length * Math.cos(radians(angle))
    hypotenuse = `c = ${pp(length)} m`
    adjacent = solved ? `x ≈ ${pp(projection)} m` : 'x = ?'
  }

  return (
    <svg
      viewBox="0 0 440 240"
      className="mx-auto my-4 w-full max-w-[420px]"
      role="img"
      aria-label="Mathematische Skizze der technischen Situation"
    >
      <path
        d="M 38 185 L 320 185 L 320 38 Z"
        fill="#eef5ff"
        stroke="#1e3a5f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M 296 185 L 296 161 L 320 161"
        fill="none"
        stroke="#1e3a5f"
        strokeWidth="2"
      />
      <path
        d="M 82 185 A 44 44 0 0 0 77 163"
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
      />
      {solved && (
        <>
          <text x="79" y="174" fontSize="15" fill="#1d4ed8">{angle}°</text>
          <text x="140" y="213" fontSize="15" fill="#15803d">{adjacent}</text>
          <text x="324" y="120" fontSize="15" fill="#15803d">{opposite}</text>
          <text x="155" y="93" fontSize="15" fill="#15803d" transform="rotate(-28 155 93)">{hypotenuse}</text>
        </>
      )}
      <text x="145" y="234" fontSize="12" fill="#52647a">
        Skizze nicht maßstäblich
      </text>
    </svg>
  )
}

function contextContent(data: DATA) {
  const angle = data.angle
  const length = data.knownLength / 2

  if (data.context === 'loadingRamp') {
    const height = length * Math.tan(radians(angle))
    return {
      situation: `Eine mobile Verladerampe steigt unter ${angle}° an. Ihre waagerechte Ausladung beträgt ${pp(length)} m. Berechnen Sie die erreichbare Höhe h.`,
      assignment: 'Ankathete: waagerechte Ausladung; Gegenkathete: Höhe h',
      formula:
        '\\tan(\\alpha)=\\frac{h}{l}\\quad\\Rightarrow\\quad h=l\\cdot\\tan(\\alpha)',
      calculation: `h=${pp(length)}\\,\\mathrm{m}\\cdot\\tan(${angle}^\\circ)\\approx${pp(height)}\\,\\mathrm{m}`,
      result: `Die Rampe erreicht eine Höhe von ungefähr ${pp(height)} m.`,
    }
  }

  if (data.context === 'frameBrace') {
    const brace = length / Math.sin(radians(angle))
    return {
      situation: `Eine Diagonalstrebe verbindet zwei Punkte mit einem Höhenunterschied von ${pp(length)} m. Die Strebe bildet mit der Waagerechten einen Winkel von ${angle}°. Berechnen Sie ihre erforderliche Länge c.`,
      assignment: 'Gegenkathete: Höhenunterschied; Hypotenuse: Strebe c',
      formula:
        '\\sin(\\alpha)=\\frac{h}{c}\\quad\\Rightarrow\\quad c=\\frac{h}{\\sin(\\alpha)}',
      calculation: `c=\\frac{${pp(length)}\\,\\mathrm{m}}{\\sin(${angle}^\\circ)}\\approx${pp(brace)}\\,\\mathrm{m}`,
      result: `Die Strebe muss ungefähr ${pp(brace)} m lang sein.`,
    }
  }

  if (data.context === 'liftingCable') {
    const height = length * Math.sin(radians(angle))
    return {
      situation: `Ein gespanntes Hebeseil ist ${pp(length)} m lang und bildet mit dem Boden einen Winkel von ${angle}°. Bestimmen Sie den vertikalen Höhenanteil h.`,
      assignment: 'Hypotenuse: Seil; Gegenkathete: vertikaler Höhenanteil h',
      formula:
        '\\sin(\\alpha)=\\frac{h}{c}\\quad\\Rightarrow\\quad h=c\\cdot\\sin(\\alpha)',
      calculation: `h=${pp(length)}\\,\\mathrm{m}\\cdot\\sin(${angle}^\\circ)\\approx${pp(height)}\\,\\mathrm{m}`,
      result: `Der vertikale Höhenanteil beträgt ungefähr ${pp(height)} m.`,
    }
  }

  const projection = length * Math.cos(radians(angle))
  return {
    situation: `Eine schräge Maschinenkonsole ist ${pp(length)} m lang und um ${angle}° gegen die Waagerechte geneigt. Berechnen Sie ihre waagerechte Projektion x.`,
    assignment: 'Hypotenuse: Konsole; Ankathete: waagerechte Projektion x',
    formula:
      '\\cos(\\alpha)=\\frac{x}{c}\\quad\\Rightarrow\\quad x=c\\cdot\\cos(\\alpha)',
    calculation: `x=${pp(length)}\\,\\mathrm{m}\\cdot\\cos(${angle}^\\circ)\\approx${pp(projection)}\\,\\mathrm{m}`,
    result: `Die waagerechte Projektion beträgt ungefähr ${pp(projection)} m.`,
  }
}

export const exercise13019: Exercise<DATA> = {
  title: 'Trigonometrie in technischen Konstruktionen',
  source: 'Vorbereitungskurs Meister · Geometrie und Trigonometrie',
  useCalculator: true,
  duration: 9,
  generator(rng) {
    return {
      context: rng.randomItemFromArray<Context>([
        'loadingRamp',
        'frameBrace',
        'liftingCable',
        'machineBracket',
      ]),
      angle: rng.randomItemFromArray([20, 25, 30, 35, 40, 45, 50, 60]),
      knownLength: rng.randomIntBetween(3, 16),
    }
  },
  originalData: {
    context: 'frameBrace',
    angle: 35,
    knownLength: 6,
  },
  constraint({ data }) {
    return data.angle > 0 && data.angle < 90 && data.knownLength > 0
  },
  intro({ data }) {
    return <p>{contextContent(data).situation}</p>
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <TrigSketch data={data} />
            <p>
              Übertragen Sie die technische Situation in das rechtwinklige
              Dreieck. Kennzeichnen Sie bekannte und gesuchte Größen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <TrigSketch data={data} solved />
            <p>{contextContent(data).assignment}</p>
          </>
        )
      },
    },
    {
      points: 4,
      task() {
        return (
          <p>
            Wählen Sie eine geeignete Winkelfunktion, stellen Sie diese nach der
            gesuchten Länge um und berechnen Sie das Ergebnis. Achten Sie am
            Taschenrechner auf den Gradmodus <strong>DEG</strong>.
          </p>
        )
      },
      solution({ data }) {
        const content = contextContent(data)
        return (
          <>
            <BlockMath math={content.formula} />
            <BlockMath math={content.calculation} />
            <p>{content.result}</p>
          </>
        )
      },
    },
  ],
}
