import { Exercise } from '@/data/types'

interface DATA {
  angles: number[]
  order: number[]
}

const angleBuckets = [
  [270],
  [260, 280],
  [250, 290],
  [240, 300],
  [210, 330],
  [0, 180, 360],
  [20, 30, 150, 160],
  [50, 60, 120, 130],
  [80, 90, 100],
]

function sineValue(angle: number) {
  return Math.sin((angle * Math.PI) / 180)
}

function referenceAngle(angle: number) {
  const normalized = ((angle % 360) + 360) % 360
  if (normalized <= 90) return normalized
  if (normalized <= 180) return 180 - normalized
  if (normalized <= 270) return normalized - 180
  return 360 - normalized
}

function quadrantText(angle: number) {
  const normalized = ((angle % 360) + 360) % 360
  if (normalized === 0 || normalized === 180) return 'auf der x-Achse'
  if (normalized === 90) return 'oben auf der y-Achse'
  if (normalized === 270) return 'unten auf der y-Achse'
  if (normalized < 90) return 'I. Quadrant'
  if (normalized < 180) return 'II. Quadrant'
  if (normalized < 270) return 'III. Quadrant'
  return 'IV. Quadrant'
}

function valueText(angle: number) {
  const normalized = ((angle % 360) + 360) % 360
  const reference = referenceAngle(angle)
  if (normalized === 90) return 'größter Wert: 1'
  if (normalized === 270) return 'kleinster Wert: -1'
  if (normalized === 0 || normalized === 180) return 'Wert: 0'
  if (normalized < 180) return `positiv, wie sin(${reference}°)`
  return `negativ, wie -sin(${reference}°)`
}

function sortedAngles(angles: number[]) {
  return [...angles].sort((a, b) => sineValue(a) - sineValue(b))
}

function CardTable({ data }: { data: DATA }) {
  return (
    <div className="my-4 grid max-w-lg grid-cols-3 gap-2">
      {data.order.map(index => {
        const angle = data.angles[index]
        return (
          <div
            key={angle}
            className="rounded border border-slate-300 bg-slate-50 px-3 py-2 text-center text-sm font-semibold shadow-sm"
          >
            {angle}°
          </div>
        )
      })}
    </div>
  )
}

function UnitCircleHint() {
  return (
    <svg viewBox="0 0 270 210" className="my-4 max-w-sm">
      <circle cx="120" cy="105" r="80" fill="#ffffff" stroke="#cbd5e1" />
      <line x1="25" y1="105" x2="215" y2="105" stroke="#334155" />
      <line x1="120" y1="10" x2="120" y2="200" stroke="#334155" />
      <text x="220" y="110" fontSize="12">
        0°
      </text>
      <text x="104" y="18" fontSize="12">
        90°
      </text>
      <text x="6" y="110" fontSize="12">
        180°
      </text>
      <text x="102" y="205" fontSize="12">
        270°
      </text>
      <text x="225" y="45" fontSize="12" fill="#166534">
        I: positiv
      </text>
      <text x="10" y="45" fontSize="12" fill="#166534">
        II: positiv
      </text>
      <text x="6" y="178" fontSize="12" fill="#991b1b">
        III: negativ
      </text>
      <text x="205" y="178" fontSize="12" fill="#991b1b">
        IV: negativ
      </text>
      <text x="78" y="105" fontSize="12" fill="#475569">
        sin = y-Wert
      </text>
    </svg>
  )
}

export const exercise20003: Exercise<DATA> = {
  title: 'Sinuswerte ohne Taschenrechner ordnen',
  source: 'TG12 gAN',
  useCalculator: false,
  duration: 12,
  points: 12,
  generator(rng) {
    const angles = angleBuckets.map(bucket => rng.randomItemFromArray(bucket))
    return {
      angles,
      order: rng.shuffleArray(angles.map((_angle, index) => index)),
    }
  },
  originalData: {
    angles: [270, 250, 240, 210, 180, 50, 120, 80, 90],
    order: [1, 6, 3, 5, 7, 0, 4, 8, 2],
  },
  task({ data }) {
    return (
      <>
        <p>
          Überlegen Sie, in welchem Quadranten des Einheitskreises sich die
          Winkel befinden. Ordnen Sie die Winkel nach aufsteigender Reihenfolge
          ihrer Sinuswerte.
        </p>
        <p>Verwenden Sie keinen Taschenrechner.</p>
        <CardTable data={data} />
      </>
    )
  },
  solution({ data }) {
    const ascending = sortedAngles(data.angles)
    return (
      <>
        <p>
          Der Sinuswert ist der y-Wert am Einheitskreis. Oben ist er positiv,
          unten negativ.
        </p>
        <UnitCircleHint />
        <table className="my-4 border-collapse text-sm">
          <thead>
            <tr>
              <th className="border px-3 py-1 text-left">Winkel</th>
              <th className="border px-3 py-1 text-left">Einordnung</th>
              <th className="border px-3 py-1 text-left">Vergleich</th>
            </tr>
          </thead>
          <tbody>
            {ascending.map(angle => {
              return (
                <tr key={angle}>
                  <td className="border px-3 py-1">{angle}°</td>
                  <td className="border px-3 py-1">{quadrantText(angle)}</td>
                  <td className="border px-3 py-1">{valueText(angle)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>
          Aufsteigend geordnet ergibt sich:{' '}
          <b>{ascending.map(angle => `${angle}°`).join(', ')}</b>.
        </p>
      </>
    )
  },
}
