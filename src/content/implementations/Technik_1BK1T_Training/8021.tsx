import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, unit } from './motion-helpers'

const m = (math: string) => <InlineMath math={math} />
const n = (value: number, u: string) => `${pp(value)}\\,${unit(u)}`
const result = (symbol: string, value: number, u: string) => (
  <p>
    <strong>
      {m(
        `${symbol}${Math.abs(round2(value) - value) < 1e-9 ? '=' : '\\approx'}${n(round2(value), u)}`,
      )}
    </strong>
  </p>
)

const contexts = [
  'Zwei Kugeln verlassen gleichzeitig eine Wurfmaschine.',
  'Zwei Prüfkörper starten gleichzeitig am Rand eines Prüfstands.',
  'Zwei Modellbälle starten gleichzeitig auf Höhe eines Podests.',
  'Zwei Metallkugeln starten gleichzeitig an einer Tischkante.',
]
const g = 9.81
const questions = [
  {
    q: 'Vergleichen Sie die y-Positionen beider Körper in jeder Aufnahme. Begründen Sie, welcher Körper zuerst auf dem Boden ankommt.',
    a: 'Beide haben zu jedem Aufnahmezeitpunkt dieselbe Fallstrecke. Ihre vertikalen Anfangsgeschwindigkeiten sind null, und beide haben dieselbe Fallbeschleunigung. Die horizontale Bewegung verändert die Fallzeit nicht; beide treffen gleichzeitig auf.',
  },
  {
    q: 'Warum sind die horizontalen Abstände der blauen Punkte gleich groß, während ihre vertikalen Abstände zunehmen?',
    a: 'Die Bilder entstehen in gleichen Zeitabständen. Horizontal ist die Geschwindigkeit konstant, daher sind die Abstände gleich. Vertikal nimmt die Geschwindigkeit wegen der Fallbeschleunigung zu, daher werden die Abstände größer.',
  },
  {
    q: 'Die horizontale Startgeschwindigkeit wird verdoppelt. Wie ändern sich bei unveränderter Höhe die Punktabstände, die Flugzeit und die Wurfweite?',
    a: 'Die horizontalen Punktabstände und die Wurfweite verdoppeln sich. Die vertikalen Punktabstände und die Flugzeit bleiben gleich, weil die vertikale Bewegung unverändert ist.',
  },
  {
    q: 'Für eine neue Aufnahme halbiert man nur den zeitlichen Abstand zwischen den Bildern. Wie verändert sich das Stroboskopbild, und ändert sich die Flugbahn?',
    a: 'Auf derselben unveränderten Flugbahn liegen mehr Aufnahmepunkte. Die horizontalen Abstände aufeinanderfolgender Punkte halbieren sich. Auch die vertikalen Abstände werden kleiner, bleiben aber von Aufnahme zu Aufnahme zunehmend. Die Bewegung selbst und die Flugzeit ändern sich nicht.',
  },
  {
    q: 'Eine Person behauptet: „Die blauen Punkte liegen immer weiter auseinander, also nimmt auch die horizontale Geschwindigkeit zu.“ Beurteilen Sie mithilfe des Bildes.',
    a: 'Die Aussage ist falsch. Nur die vertikalen Abstände wachsen. Die horizontalen Abstände bleiben bei gleichen Zeitabständen konstant, also bleibt auch die horizontale Geschwindigkeit konstant. Der Betrag der Gesamtgeschwindigkeit nimmt durch die wachsende vertikale Komponente zu.',
  },
  {
    q: 'Der horizontal gestartete Körper hat eine größere Masse als der fallengelassene Körper. Ändert das ohne Luftwiderstand den Vergleich ihrer Fallstrecken?',
    a: 'Nein. Die Fallbeschleunigung ist für beide gleich und unabhängig von ihrer Masse. Bei gleicher vertikaler Anfangsgeschwindigkeit haben sie nach derselben Zeit dieselbe Fallstrecke.',
  },
]
interface DATA {
  question: number
  context: number
  v0: number
  dt: number
}
function Strobe({ data, solved = false }: { data: DATA; solved?: boolean }) {
  const end = 4 * data.dt,
    fall = (g * end ** 2) / 2,
    distance = data.v0 * end
  const sx = (x: number) => 54 + (300 * x) / (distance * 1.16)
  const sy = (y: number) => 35 + (166 * y) / (fall * 1.16)
  const velocityScale = 26 / Math.max(data.v0, g * end)
  const vxLength = data.v0 * velocityScale
  const vxHead = Math.min(5, vxLength / 2)
  const frames = Array.from({ length: 5 }, (_, i) => {
    const t = i * data.dt
    return { x: data.v0 * t, y: (g * t * t) / 2, t }
  })
  const ground = sy(fall)
  return (
    <svg
      viewBox="0 0 400 224"
      className="my-4 block w-full max-w-lg"
      role="img"
      aria-label="Stroboskopbild: freier Fall und horizontaler Wurf bei gleichen Zeitabständen"
    >
      <rect x={54} y={35} width={300} height={166} fill="white" />
      <path
        d={`M54,35H368m-7,-4l7,4l-7,4 M54,35V211m-4,-7l4,7l4,-7`}
        fill="none"
        stroke="#172033"
        strokeWidth={1.5}
      />
      <text x={375} y={40} fontSize={14}>
        x
      </text>
      <text x={62} y={214} fontSize={14}>
        y
      </text>
      <line x1={54} x2={354} y1={ground} y2={ground} stroke="#64748b" />
      <text x={354} y={ground + 15} textAnchor="end" fontSize={12}>
        Boden
      </text>
      {frames.map(({ x, y, t }, i) => {
        const vyLength = g * t * velocityScale
        const vyHead = Math.min(5, vyLength / 2)
        return (
          <g key={i}>
            <line
              x1={54}
              y1={sy(y)}
              x2={sx(x)}
              y2={sy(y)}
              stroke="#a5b4c5"
              strokeDasharray="4 4"
            />
            {i > 0 && <circle cx={54} cy={sy(y)} r={4} fill="#13765d" />}
            <circle cx={sx(x)} cy={sy(y)} r={4} fill="#2563eb" />
            {solved && i < 4 && (
              <>
                <path
                  d={`M${sx(x)},${sy(y)}h${vxLength}m-${vxHead},-3l${vxHead},3l-${vxHead},3`}
                  fill="none"
                  stroke="#a44913"
                  strokeWidth={1.5}
                />
                {i > 0 && (
                  <path
                    d={`M${sx(x)},${sy(y)}v${vyLength}m-3,-${vyHead}l3,${vyHead}l3,-${vyHead}`}
                    fill="none"
                    stroke="#a44913"
                    strokeWidth={1.5}
                  />
                )}
              </>
            )}
          </g>
        )
      })}
      <text x={61} y={24} fontSize={12}>
        Start
      </text>
    </svg>
  )
}
export const exercise8021: Exercise<DATA> = {
  title: 'Horizontalen Wurf am Stroboskopbild deuten',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 10,
  generator: rng => ({
    question: rng.randomIntBetween(0, questions.length - 1),
    context: rng.randomIntBetween(0, contexts.length - 1),
    v0: rng.randomItemFromArray([2, 3, 4, 5]),
    dt: rng.randomItemFromArray([0.1, 0.15, 0.2, 0.25]),
  }),
  originalData: { question: 0, context: 0, v0: 3, dt: 0.2 },
  constraint: ({ data }) =>
    Number.isInteger(data.question) &&
    !!questions[data.question] &&
    !!contexts[data.context] &&
    [data.v0, data.dt].every(Number.isFinite) &&
    data.v0 > 0 &&
    data.dt > 0,
  intro({ data }) {
    return (
      <>
        <p>
          {contexts[data.context]} Ein Körper wird aus der Ruhe fallen gelassen
          (grün), der andere horizontal mit {m(`v_0=${n(data.v0, 'm/s')}`)}{' '}
          gestartet (blau). Der erste Punkt ist der gemeinsame Start. Zwischen
          zwei Aufnahmen liegen jeweils {m(n(data.dt, 's'))}. Es gilt{' '}
          {m(`g=${n(g, 'm/s^2')}`)}; Luftwiderstand wird vernachlässigt.
        </p>
        <Strobe data={data} />
      </>
    )
  },
  tasks: [
    {
      points: 4,
      task: ({ data }) => <p>{questions[data.question].q}</p>,
      solution: ({ data }) => <p>{questions[data.question].a}</p>,
    },
    {
      points: 5,
      task: () => (
        <p>
          Skizzieren Sie an den ersten vier blauen Punkten die
          Geschwindigkeitskomponenten. Berechnen Sie beide Komponenten beim
          dritten Punkt, wenn der Startpunkt als erster Punkt zählt.
        </p>
      ),
      solution({ data }) {
        const t = 2 * data.dt
        return (
          <>
            <Strobe data={data} solved />
            <p>
              Die waagerechten Pfeile bleiben gleich lang. Die Pfeile nach unten
              werden länger, weil {m('v_y(t)=g\\cdot t')} gilt. Beim Start fehlt
              der Pfeil nach unten.
            </p>
            <p>{m(`t=2\\cdot${n(data.dt, 's')}=${n(t, 's')}`)}</p>
            {result('v_x=v_0', data.v0, 'm/s')}
            <p>{m(`v_y(t)=${n(g, 'm/s^2')}\\cdot${n(t, 's')}`)}</p>
            {result('v_y(t)', g * t, 'm/s')}
          </>
        )
      },
    },
  ],
}
