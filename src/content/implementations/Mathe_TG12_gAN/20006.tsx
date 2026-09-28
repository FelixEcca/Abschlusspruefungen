import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface SineData {
  amplitude: number
  midline: number
  periodPi: number
  phasePi: number
  reflected: boolean
}

interface DATA {
  describe: SineData
  determine: SineData
}

const chart = {
  left: 58,
  top: 22,
  width: 520,
  height: 270,
  xMin: -2,
  xMax: 4,
  yMin: -5,
  yMax: 5,
}

const describeVariants: SineData[] = [
  { amplitude: 2, midline: 1, periodPi: 2, phasePi: 0.5, reflected: false },
  { amplitude: 1.5, midline: -1, periodPi: 1, phasePi: 0, reflected: true },
  { amplitude: 0.5, midline: 2, periodPi: 4, phasePi: -1, reflected: false },
  { amplitude: 3, midline: 0, periodPi: 2, phasePi: 1, reflected: true },
]

const determineVariants: SineData[] = [
  { amplitude: 2, midline: 1, periodPi: 2, phasePi: 0.5, reflected: false },
  { amplitude: 1.5, midline: -1, periodPi: 1, phasePi: -0.5, reflected: false },
  { amplitude: 3, midline: 0, periodPi: 4, phasePi: -1, reflected: false },
  { amplitude: 1, midline: 2, periodPi: 2, phasePi: -1, reflected: false },
]

export const exercise20006: Exercise<DATA> = {
  title: 'Sinuskurven transformieren und Funktionsterm bestimmen',
  source: 'TG12 gAN',
  useCalculator: false,
  duration: 18,
  generator(rng) {
    return {
      describe: rng.randomItemFromArray(describeVariants),
      determine: rng.randomItemFromArray(determineVariants),
    }
  },
  originalData: {
    describe: describeVariants[0],
    determine: determineVariants[1],
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 8,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Der dargestellte Graph ist aus der Grundfunktion{' '}
              <InlineMath math={'g(x)=\\sin(x)'} /> entstanden. Beschreiben Sie
              alle durchgeführten Transformationen möglichst genau.
            </p>
            <SineChart data={data.describe} id="task-describe" />
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <SineChart data={data.describe} id="solution-describe" />
            <TransformationList data={data.describe} />
            <p className="mt-4">
              Ein passender Funktionsterm lautet{' '}
              <b>
                <InlineMath math={functionTerm(data.describe)} />
              </b>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 10,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Bestimmen Sie zum folgenden Graphen einen Funktionsterm in der
              Form
            </p>
            <p className="my-2 text-center">
              <InlineMath math={'f(x)=a\\cdot\\sin(b(x-c))+d'} />.
            </p>
            <p>
              Dokumentieren Sie, wie Sie Mittellinie, Amplitude, Periodenlänge
              und Verschiebung bestimmen.
            </p>
            <SineChart data={data.determine} id="task-determine" />
          </>
        )
      },
      solution({ data }) {
        const maximum = data.determine.midline + data.determine.amplitude
        const minimum = data.determine.midline - data.determine.amplitude

        return (
          <>
            <SineChart
              data={data.determine}
              id="solution-determine"
              showAnalysis
            />
            <ol className="list-decimal space-y-3 pl-6">
              <li>
                <b>Mittellinie:</b> Der größte Funktionswert ist{' '}
                {formatNumber(maximum)}, der kleinste ist{' '}
                {formatNumber(minimum)}. Damit gilt{' '}
                <InlineMath
                  math={`d=\\frac{${numberLatex(maximum)}+(${numberLatex(minimum)})}{2}=${numberLatex(data.determine.midline)}`}
                />
                .
              </li>
              <li>
                <b>Amplitude:</b>{' '}
                <InlineMath
                  math={`a=\\frac{${numberLatex(maximum)}-(${numberLatex(minimum)})}{2}=${numberLatex(data.determine.amplitude)}`}
                />
                .
              </li>
              <li>
                <b>Periodenlänge:</b> Der Graph wiederholt sich nach{' '}
                <InlineMath math={`p=${piLatex(data.determine.periodPi)}`} />.
                Deshalb ist{' '}
                <InlineMath
                  math={`b=\\frac{2\\pi}{p}=${frequencyLatex(data.determine)}`}
                />
                .
              </li>
              <li>
                <b>Verschiebung:</b> Der Graph schneidet seine Mittellinie bei{' '}
                <InlineMath math={`x=${piLatex(data.determine.phasePi)}`} /> mit
                positiver Steigung. Daher gilt{' '}
                <InlineMath math={`c=${piLatex(data.determine.phasePi)}`} />.
              </li>
              <li>
                <b>Einsetzen:</b>{' '}
                <InlineMath math={functionTerm(data.determine)} />.
              </li>
            </ol>
          </>
        )
      },
    },
  ],
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? `${value}` : `${value}`.replace('.', ',')
}

function numberLatex(value: number) {
  return Number.isInteger(value) ? `${value}` : `${value}`.replace('.', '{,}')
}

function piLatex(value: number) {
  if (value === 0) return '0'

  const sign = value < 0 ? '-' : ''
  const absolute = Math.abs(value)
  if (absolute === 0.5) return `${sign}\\frac{\\pi}{2}`
  if (absolute === 1) return `${sign}\\pi`
  if (Number.isInteger(absolute)) return `${sign}${absolute}\\pi`
  return `${sign}${numberLatex(absolute)}\\pi`
}

function piText(halfSteps: number) {
  if (halfSteps === 0) return '0'

  const sign = halfSteps < 0 ? '-' : ''
  const absolute = Math.abs(halfSteps)
  if (absolute === 1) return `${sign}π/2`
  if (absolute === 2) return `${sign}π`
  if (absolute % 2 === 0) return `${sign}${absolute / 2}π`
  return `${sign}${absolute}π/2`
}

function frequency(data: SineData) {
  return 2 / data.periodPi
}

function frequencyLatex(data: SineData) {
  const value = frequency(data)
  if (value === 0.5) return '\\frac{1}{2}'
  return numberLatex(value)
}

function phaseExpression(data: SineData) {
  if (data.phasePi === 0) return 'x'
  if (data.phasePi > 0) return `x-${piLatex(data.phasePi)}`
  return `x+${piLatex(Math.abs(data.phasePi))}`
}

function functionTerm(data: SineData) {
  const signedAmplitude = data.reflected ? -data.amplitude : data.amplitude
  let coefficient = numberLatex(signedAmplitude)
  if (signedAmplitude === 1) coefficient = ''
  if (signedAmplitude === -1) coefficient = '-'

  const b = frequency(data)
  const argument =
    b === 1
      ? phaseExpression(data)
      : `${frequencyLatex(data)}\\left(${phaseExpression(data)}\\right)`
  const verticalShift =
    data.midline === 0
      ? ''
      : data.midline > 0
        ? `+${numberLatex(data.midline)}`
        : numberLatex(data.midline)

  return `f(x)=${coefficient}\\sin\\left(${argument}\\right)${verticalShift}`
}

function xToSvg(xPi: number) {
  return (
    chart.left + ((xPi - chart.xMin) / (chart.xMax - chart.xMin)) * chart.width
  )
}

function yToSvg(y: number) {
  return (
    chart.top + ((chart.yMax - y) / (chart.yMax - chart.yMin)) * chart.height
  )
}

function sineValue(data: SineData, xPi: number) {
  const sign = data.reflected ? -1 : 1
  const angle = frequency(data) * (xPi - data.phasePi) * Math.PI
  return data.midline + sign * data.amplitude * Math.sin(angle)
}

function sinePoints(data: SineData) {
  const result: string[] = []
  for (let xPi = chart.xMin; xPi <= chart.xMax; xPi += 0.015) {
    result.push(`${xToSvg(xPi)},${yToSvg(sineValue(data, xPi))}`)
  }
  return result.join(' ')
}

function SineChart({
  data,
  id,
  showAnalysis = false,
}: {
  data: SineData
  id: string
  showAnalysis?: boolean
}) {
  const maximum = data.midline + data.amplitude
  const amplitudeX = data.phasePi + data.periodPi / 4
  const periodStart = data.phasePi
  const periodEnd = data.phasePi + data.periodPi
  const periodY = -4.45

  return (
    <svg
      viewBox="0 0 630 340"
      className="my-4 w-full max-w-3xl"
      role="img"
      aria-label="Koordinatensystem mit einer transformierten Sinuskurve"
    >
      <defs>
        <clipPath id={`sine-chart-${id}`}>
          <rect
            x={chart.left}
            y={chart.top}
            width={chart.width}
            height={chart.height}
          />
        </clipPath>
      </defs>
      <rect
        x={chart.left}
        y={chart.top}
        width={chart.width}
        height={chart.height}
        fill="#ffffff"
        stroke="#cbd5e1"
      />

      {Array.from({ length: 13 }, (_, index) => index - 4).map(halfStep => {
        const xPi = halfStep / 2
        return (
          <g key={`x-${halfStep}`}>
            <line
              x1={xToSvg(xPi)}
              y1={chart.top}
              x2={xToSvg(xPi)}
              y2={chart.top + chart.height}
              stroke={halfStep === 0 ? '#64748b' : '#e2e8f0'}
              strokeWidth={halfStep === 0 ? '1.8' : '1'}
            />
            <text
              x={xToSvg(xPi)}
              y={chart.top + chart.height + 18}
              fontSize="10"
              textAnchor="middle"
              fill="#334155"
            >
              {piText(halfStep)}
            </text>
          </g>
        )
      })}

      {Array.from({ length: 11 }, (_, index) => chart.yMin + index).map(y => (
        <g key={`y-${y}`}>
          <line
            x1={chart.left}
            y1={yToSvg(y)}
            x2={chart.left + chart.width}
            y2={yToSvg(y)}
            stroke={y === 0 ? '#64748b' : '#e2e8f0'}
            strokeWidth={y === 0 ? '1.8' : '1'}
          />
          <text
            x={chart.left - 10}
            y={yToSvg(y) + 4}
            fontSize="11"
            textAnchor="end"
            fill="#334155"
          >
            {y}
          </text>
        </g>
      ))}

      <line
        x1={chart.left}
        y1={yToSvg(0)}
        x2={chart.left + chart.width + 13}
        y2={yToSvg(0)}
        stroke="#172033"
        strokeWidth="2"
      />
      <path
        d={`M${chart.left + chart.width + 13} ${yToSvg(0)}l-8 -5v10z`}
        fill="#172033"
      />
      <line
        x1={xToSvg(0)}
        y1={chart.top + chart.height}
        x2={xToSvg(0)}
        y2={chart.top - 10}
        stroke="#172033"
        strokeWidth="2"
      />
      <path d={`M${xToSvg(0)} ${chart.top - 10}l-5 8h10z`} fill="#172033" />
      <text
        x={chart.left + chart.width + 24}
        y={yToSvg(0) + 5}
        fontSize="16"
        fontWeight="700"
      >
        x
      </text>
      <text x={xToSvg(0) + 8} y={chart.top - 9} fontSize="16" fontWeight="700">
        y
      </text>

      <polyline
        points={sinePoints(data)}
        fill="none"
        stroke="#2563eb"
        strokeWidth="3.5"
        strokeLinejoin="round"
        clipPath={`url(#sine-chart-${id})`}
      />

      {showAnalysis ? (
        <>
          <line
            x1={chart.left}
            y1={yToSvg(data.midline)}
            x2={chart.left + chart.width}
            y2={yToSvg(data.midline)}
            stroke="#f97316"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
          <text
            x={chart.left + chart.width - 8}
            y={yToSvg(data.midline) - 7}
            fontSize="12"
            textAnchor="end"
            fill="#c2410c"
          >
            Mittellinie
          </text>

          <line
            x1={xToSvg(amplitudeX)}
            y1={yToSvg(data.midline)}
            x2={xToSvg(amplitudeX)}
            y2={yToSvg(maximum)}
            stroke="#16a34a"
            strokeWidth="3"
          />
          <circle
            cx={xToSvg(amplitudeX)}
            cy={yToSvg(maximum)}
            r="4"
            fill="#16a34a"
          />
          <text
            x={xToSvg(amplitudeX) + 8}
            y={(yToSvg(data.midline) + yToSvg(maximum)) / 2}
            fontSize="12"
            fill="#166534"
          >
            Amplitude
          </text>

          <circle
            cx={xToSvg(data.phasePi)}
            cy={yToSvg(data.midline)}
            r="4.5"
            fill="#7c3aed"
          />
          <text
            x={xToSvg(data.phasePi) + 7}
            y={yToSvg(data.midline) + 17}
            fontSize="12"
            fill="#6d28d9"
          >
            Start bei c
          </text>

          <line
            x1={xToSvg(periodStart)}
            y1={yToSvg(periodY)}
            x2={xToSvg(periodEnd)}
            y2={yToSvg(periodY)}
            stroke="#dc2626"
            strokeWidth="2.5"
          />
          <path
            d={`M${xToSvg(periodStart)} ${yToSvg(periodY)}l8 -5v10z`}
            fill="#dc2626"
          />
          <path
            d={`M${xToSvg(periodEnd)} ${yToSvg(periodY)}l-8 -5v10z`}
            fill="#dc2626"
          />
          <text
            x={(xToSvg(periodStart) + xToSvg(periodEnd)) / 2}
            y={yToSvg(periodY) - 8}
            fontSize="12"
            textAnchor="middle"
            fill="#991b1b"
          >
            Periodenlänge T
          </text>
        </>
      ) : null}
    </svg>
  )
}

function TransformationList({ data }: { data: SineData }) {
  const b = frequency(data)

  return (
    <ol className="list-decimal space-y-2 pl-6">
      {b > 1 ? (
        <li>
          Der Graph wird in x-Richtung mit dem Faktor{' '}
          <InlineMath math={`\\frac{1}{${frequencyLatex(data)}}`} /> gestaucht.
          Dadurch beträgt die Periodenlänge{' '}
          <InlineMath math={piLatex(data.periodPi)} />.
        </li>
      ) : b < 1 ? (
        <li>
          Der Graph wird in x-Richtung mit dem Faktor{' '}
          <InlineMath math={numberLatex(1 / b)} /> gestreckt. Dadurch beträgt
          die Periodenlänge <InlineMath math={piLatex(data.periodPi)} />.
        </li>
      ) : (
        <li>
          In x-Richtung findet keine Streckung oder Stauchung statt. Die
          Periodenlänge bleibt <InlineMath math={'2\\pi'} />.
        </li>
      )}

      {data.phasePi > 0 ? (
        <li>
          Der Graph wird um <InlineMath math={piLatex(data.phasePi)} /> nach
          rechts verschoben.
        </li>
      ) : data.phasePi < 0 ? (
        <li>
          Der Graph wird um{' '}
          <InlineMath math={piLatex(Math.abs(data.phasePi))} /> nach links
          verschoben.
        </li>
      ) : (
        <li>In x-Richtung findet keine Verschiebung statt.</li>
      )}

      {data.reflected ? (
        <li>Der Graph wird an der x-Achse gespiegelt.</li>
      ) : null}

      {data.amplitude > 1 ? (
        <li>
          Der Graph wird in y-Richtung mit dem Faktor{' '}
          {formatNumber(data.amplitude)} gestreckt.
        </li>
      ) : data.amplitude < 1 ? (
        <li>
          Der Graph wird in y-Richtung mit dem Faktor{' '}
          {formatNumber(data.amplitude)} gestaucht.
        </li>
      ) : (
        <li>In y-Richtung findet keine Streckung oder Stauchung statt.</li>
      )}

      {data.midline > 0 ? (
        <li>
          Der Graph wird um {formatNumber(data.midline)} nach oben verschoben.
        </li>
      ) : data.midline < 0 ? (
        <li>
          Der Graph wird um {formatNumber(Math.abs(data.midline))} nach unten
          verschoben.
        </li>
      ) : (
        <li>In y-Richtung findet keine Verschiebung statt.</li>
      )}
    </ol>
  )
}
