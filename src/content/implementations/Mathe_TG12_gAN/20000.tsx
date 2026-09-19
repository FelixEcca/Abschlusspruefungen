import { Exercise } from '@/data/types'

type Change = 'louder' | 'quieter' | 'higher' | 'lower'

interface DATA {
  change: Change
  baseAmplitude: number
  changedAmplitude: number
  basePeriod: number
  changedPeriod: number
}

const graph = {
  left: 38,
  top: 18,
  width: 300,
  height: 170,
  midY: 102,
  xMax: 12,
}

function xToSvg(x: number) {
  return graph.left + (x / graph.xMax) * graph.width
}

function curvePoints(amplitude: number, period: number) {
  const points: string[] = []
  for (let x = 0; x <= graph.xMax; x += 0.08) {
    const y = graph.midY - amplitude * Math.sin((2 * Math.PI * x) / period)
    points.push(`${xToSvg(x)},${y}`)
  }
  return points.join(' ')
}

function Graph({ data }: { data: DATA }) {
  return (
    <svg viewBox="0 0 380 240" className="my-4 max-w-xl">
      <rect
        x={graph.left}
        y={graph.top}
        width={graph.width}
        height={graph.height}
        fill="#ffffff"
        stroke="#cbd5e1"
      />
      {Array.from({ length: 7 }, (_, index) => index * 2).map(t => (
        <g key={t}>
          <line
            x1={xToSvg(t)}
            y1={graph.top}
            x2={xToSvg(t)}
            y2={graph.top + graph.height}
            stroke="#e2e8f0"
          />
          <text x={xToSvg(t)} y="210" fontSize="11" textAnchor="middle">
            {t}
          </text>
        </g>
      ))}
      {[42, 72, 102, 132, 162].map(y => (
        <line
          key={y}
          x1={graph.left}
          y1={y}
          x2={graph.left + graph.width}
          y2={y}
          stroke={y === graph.midY ? '#64748b' : '#e2e8f0'}
          strokeWidth={y === graph.midY ? 1.5 : 1}
        />
      ))}
      <line
        x1={graph.left}
        y1={graph.midY}
        x2={graph.left + graph.width + 18}
        y2={graph.midY}
        stroke="#334155"
      />
      <line
        x1={graph.left}
        y1={graph.top + graph.height}
        x2={graph.left}
        y2={graph.top - 10}
        stroke="#334155"
      />
      <text x="348" y={graph.midY - 5} fontSize="12">
        t
      </text>
      <text x="14" y="24" fontSize="12">
        Auslenkung
      </text>
      <polyline
        points={curvePoints(data.baseAmplitude, data.basePeriod)}
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
      />
      <polyline
        points={curvePoints(data.changedAmplitude, data.changedPeriod)}
        fill="none"
        stroke="#f97316"
        strokeWidth="3"
      />
      <g transform="translate(55 222)">
        <line x1="0" y1="0" x2="24" y2="0" stroke="#2563eb" strokeWidth="3" />
        <text x="31" y="4" fontSize="12">
          Originalton
        </text>
        <line x1="120" y1="0" x2="144" y2="0" stroke="#f97316" strokeWidth="3" />
        <text x="151" y="4" fontSize="12">
          veränderter Ton
        </text>
      </g>
    </svg>
  )
}

export const exercise20000: Exercise<DATA> = {
  title: 'Oszillogramm einer Tonveränderung deuten',
  source: 'TG12 gAN',
  useCalculator: false,
  duration: 10,
  points: 10,
  generator(rng) {
    const change = rng.randomItemFromArray<Change>([
      'louder',
      'quieter',
      'higher',
      'lower',
    ])
    return {
      change,
      baseAmplitude: 38,
      changedAmplitude:
        change === 'louder' ? 58 : change === 'quieter' ? 24 : 38,
      basePeriod: 4,
      changedPeriod: change === 'higher' ? 2.8 : change === 'lower' ? 6 : 4,
    }
  },
  originalData: {
    change: 'higher',
    baseAmplitude: 38,
    changedAmplitude: 38,
    basePeriod: 4,
    changedPeriod: 2.8,
  },
  task({ data }) {
    return (
      <>
        <p>
          Das blaue Oszillogramm zeigt einen Originalton. Danach wurde der Ton
          verändert. Die orange Kurve zeigt den veränderten Ton.
        </p>
        <Graph data={data} />
        <p>
          Entscheiden Sie: Ist der Ton lauter, leiser, höher oder tiefer
          geworden? Begründen Sie mit Amplitude und Periodenlänge.
        </p>
      </>
    )
  },
  solution({ data }) {
    const isAmplitudeChange = data.changedAmplitude !== data.baseAmplitude
    return (
      <>
        <p>
          Für die Lautstärke betrachtet man die Amplitude. Für die Tonhöhe
          betrachtet man die Periodenlänge.
        </p>
        <Graph data={data} />
        {isAmplitudeChange ? (
          <>
            <p>
              Die Periodenlänge bleibt gleich. Deshalb bleibt die Tonhöhe gleich.
            </p>
            {data.changedAmplitude > data.baseAmplitude ? (
              <p>
                Die orange Kurve hat eine größere Amplitude. Der Ton ist{' '}
                <b>lauter</b> geworden.
              </p>
            ) : (
              <p>
                Die orange Kurve hat eine kleinere Amplitude. Der Ton ist{' '}
                <b>leiser</b> geworden.
              </p>
            )}
          </>
        ) : (
          <>
            <p>
              Die Amplitude bleibt gleich. Deshalb bleibt die Lautstärke gleich.
            </p>
            {data.changedPeriod < data.basePeriod ? (
              <p>
                Die orange Kurve hat eine kleinere Periodenlänge. Sie schwingt
                schneller. Der Ton ist <b>höher</b> geworden.
              </p>
            ) : (
              <p>
                Die orange Kurve hat eine größere Periodenlänge. Sie schwingt
                langsamer. Der Ton ist <b>tiefer</b> geworden.
              </p>
            )}
          </>
        )}
      </>
    )
  },
}
