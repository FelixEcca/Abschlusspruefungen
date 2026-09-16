import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type ErrorType = 'noRoot' | 'addLengths' | 'wrongDirection'
type Context = 'frame' | 'plate' | 'support'

interface DATA {
  type: ErrorType
  context: Context
  tripleIndex: number
  scale: number
}

const triples = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
]

function contextName(context: Context) {
  if (context === 'plate') return 'einer rechteckigen Grundplatte'
  if (context === 'support') return 'einer rechtwinkligen Stützkonstruktion'
  return 'einem geschweißten Rechteckrahmen'
}

function PythagorasSketch({
  a,
  b,
  c,
  target,
  solved = false,
}: {
  a: number
  b: number
  c: number
  target: 'a' | 'c'
  solved?: boolean
}) {
  const labelA = target === 'a' && !solved ? 'a = ?' : `a = ${a} cm`
  const labelC = target === 'c' && !solved ? 'c = ?' : `c = ${c} cm`

  return (
    <svg
      viewBox="0 0 340 220"
      className="mx-auto my-4 w-full max-w-[380px]"
      role="img"
      aria-label="Rechtwinkliges Dreieck mit Seitenmaßen"
    >
      <path
        d="M 45 30 L 45 175 L 300 175 Z"
        fill="#eef5ff"
        stroke="#1e3a5f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M 45 151 L 69 151 L 69 175"
        fill="none"
        stroke="#1e3a5f"
        strokeWidth="2"
      />
      <text x="4" y="108" fontSize="16" fill="#172033">
        {labelA}
      </text>
      <text x="145" y="202" fontSize="16" fill="#172033">
        b = {b} cm
      </text>
      <text
        x="170"
        y="92"
        fontSize="16"
        fill={solved ? '#15803d' : '#1d4ed8'}
        transform="rotate(30 170 92)"
      >
        {labelC}
      </text>
      {solved && (
        <text x="205" y="42" fontSize="14" fill="#15803d">
          Hypotenuse
        </text>
      )}
    </svg>
  )
}

export const exercise13018: Exercise<DATA> = {
  title: 'Fehler beim Satz des Pythagoras finden',
  source: 'Vorbereitungskurs Meister · Geometrie und Trigonometrie',
  useCalculator: false,
  duration: 7,
  generator(rng) {
    return {
      type: rng.randomItemFromArray<ErrorType>([
        'noRoot',
        'addLengths',
        'wrongDirection',
      ]),
      context: rng.randomItemFromArray<Context>(['frame', 'plate', 'support']),
      tripleIndex: rng.randomIntBetween(0, triples.length - 1),
      scale: rng.randomIntBetween(1, 5),
    }
  },
  originalData: {
    type: 'noRoot',
    context: 'frame',
    tripleIndex: 0,
    scale: 4,
  },
  constraint({ data }) {
    return (
      data.scale > 0 &&
      data.tripleIndex >= 0 &&
      data.tripleIndex < triples.length
    )
  },
  intro({ data }) {
    const [baseA, baseB, baseC] = triples[data.tripleIndex]
    const a = baseA * data.scale
    const b = baseB * data.scale
    const c = baseC * data.scale
    if (data.type === 'wrongDirection') {
      return (
        <p>
          Bei {contextName(data.context)} sind die Diagonale c = {c} cm und eine
          Kathete b = {b} cm bekannt. Gesucht ist die zweite Kathete a.
        </p>
      )
    }
    return (
      <p>
        Bei {contextName(data.context)} sind die rechtwinklig
        zueinanderstehenden Seiten a = {a} cm und b = {b} cm bekannt. Gesucht
        ist die Diagonale c.
      </p>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        const [baseA, baseB, baseC] = triples[data.tripleIndex]
        const a = baseA * data.scale
        const b = baseB * data.scale
        const c = baseC * data.scale
        const wrong =
          data.type === 'noRoot'
            ? `c=${a}^2+${b}^2=${a ** 2 + b ** 2}\\,\\mathrm{cm}`
            : data.type === 'addLengths'
              ? `c=${a}+${b}=${a + b}\\,\\mathrm{cm}`
              : `a=\\sqrt{${c}^2+${b}^2}\\approx${pp(Math.sqrt(c ** 2 + b ** 2))}\\,\\mathrm{cm}`
        return (
          <>
            <PythagorasSketch
              a={a}
              b={b}
              c={c}
              target={data.type === 'wrongDirection' ? 'a' : 'c'}
            />
            <p>
              Prüfen Sie den folgenden Lösungsweg und benennen Sie den Fehler.
            </p>
            <BlockMath math={wrong} />
          </>
        )
      },
      solution({ data }) {
        if (data.type === 'noRoot') {
          return (
            <p>
              Der Ausdruck liefert <b>c²</b>, nicht c. Nach dem Addieren muss
              die Quadratwurzel gezogen werden.
            </p>
          )
        }
        if (data.type === 'addLengths') {
          return (
            <p>
              Der Satz des Pythagoras verknüpft die <b>Quadrate</b> der
              Seitenlängen. Die Katheten dürfen nicht direkt addiert werden.
            </p>
          )
        }
        return (
          <p>
            Die Hypotenuse c ist die längste Seite. Wird eine Kathete gesucht,
            muss das Quadrat der bekannten Kathete von c² subtrahiert werden.
          </p>
        )
      },
    },
    {
      points: 3,
      task() {
        return <p>Berichtigen Sie die Rechnung einschließlich Einheit.</p>
      },
      solution({ data }) {
        const [baseA, baseB, baseC] = triples[data.tripleIndex]
        const a = baseA * data.scale
        const b = baseB * data.scale
        const c = baseC * data.scale
        const corrected =
          data.type === 'wrongDirection'
            ? `a=\\sqrt{c^2-b^2}=\\sqrt{${c}^2-${b}^2}=${a}\\,\\mathrm{cm}`
            : `c=\\sqrt{a^2+b^2}=\\sqrt{${a}^2+${b}^2}=${c}\\,\\mathrm{cm}`
        return (
          <>
            <PythagorasSketch
              a={a}
              b={b}
              c={c}
              target={data.type === 'wrongDirection' ? 'a' : 'c'}
              solved
            />
            <BlockMath math={corrected} />
          </>
        )
      },
    },
  ],
}
