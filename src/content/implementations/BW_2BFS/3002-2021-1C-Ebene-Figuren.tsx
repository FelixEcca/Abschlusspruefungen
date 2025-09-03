import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

/* ==================== Typen ==================== */
type Pt = [number, number]
type Figure = {
  id: 'A' | 'B' | 'C' | 'D'
  pts: Pt[]
  isRightTriangle?: boolean
}
type SymType = 'axis' | 'point'

interface DATA {
  figures: Figure[]
  congruentPair: ['A' | 'B' | 'C' | 'D', 'A' | 'B' | 'C' | 'D']
  rightId: 'A' | 'B' | 'C' | 'D'
  symType: SymType
}

/* ==================== Utils ==================== */
const centroid = (pts: Pt[]): Pt => {
  let a = 0,
    cx = 0,
    cy = 0
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i],
      [x2, y2] = pts[(i + 1) % pts.length]
    const cross = x1 * y2 - x2 * y1
    a += cross
    cx += (x1 + x2) * cross
    cy += (y1 + y2) * cross
  }
  a *= 0.5
  if (Math.abs(a) < 1e-6) {
    const sx = pts.reduce((s, p) => s + p[0], 0),
      sy = pts.reduce((s, p) => s + p[1], 0)
    return [sx / pts.length, sy / pts.length]
  }
  return [cx / (6 * a), cy / (6 * a)]
}

const transform = (
  pts: Pt[],
  o: {
    rot?: 0 | 90 | 180 | 270
    reflectX?: boolean
    translate?: Pt
    scale?: number
  },
): Pt[] => {
  const rot = o.rot ?? 0,
    s = o.scale ?? 1,
    t = o.translate ?? [0, 0]
  return pts.map(([x0, y0]) => {
    let x = x0,
      y = y0
    if (rot === 90) {
      const xx = -y
      y = x
      x = xx
    } else if (rot === 180) {
      x = -x
      y = -y
    } else if (rot === 270) {
      const xx = y
      y = -x
      x = xx
    }
    if (o.reflectX) x = -x
    x *= s
    y *= s
    return [x + t[0], y + t[1]]
  })
}

const toPath = (pts: Pt[]) => pts.map(p => p.join(',')).join(' ')

const makeR = (rng: any) => {
  const raw = () =>
    typeof rng === 'function'
      ? rng()
      : typeof rng?.next === 'function'
        ? rng.next()
        : typeof rng?.random === 'function'
          ? rng.random()
          : typeof rng?.float === 'function'
            ? rng.float()
            : Math.random()
  const float = (min = 0, max = 1) => raw() * (max - min) + min
  const int = (min: number, max: number) => Math.floor(float(min, max + 1))
  const pick = <T,>(arr: T[]) => arr[int(0, arr.length - 1)]
  const bool = () => int(0, 1) === 1
  return { float, int, pick, bool }
}

/* ==================== Vorlagen & Layout ==================== */
const trapezoidTemplate: Pt[] = [
  [0, 2],
  [6, 2],
  [5, 0.5],
  [2, 0.5],
  [0, 2],
]
const templates: Pt[][] = [
  trapezoidTemplate,
  [
    [0, 0],
    [3, 0],
    [3, 1],
    [1, 1],
    [1, 3],
    [0, 3],
  ], // Haken
  [
    [0, 1],
    [2, 0],
    [4, 1],
    [2, 3],
  ], // Drachen
  [
    [0, 0],
    [4, 0],
    [4, -1],
    [6, 1],
    [4, 3],
    [4, 2],
    [0, 2],
  ], // Pfeil
]
const makeRightTri = (a: number, b: number): Pt[] => [
  [0, 0],
  [a, 0],
  [0, b],
]

const SLOT_W = 140,
  SLOT_H = 140
const anchors: Pt[] = [
  [24, 24],
  [164, 24],
  [24, 164],
  [164, 164],
] // A,B,C,D

const place = (slotIdx: number, pts: Pt[]) => {
  const [ax, ay] = anchors[slotIdx]
  const xs = pts.map(p => p[0]),
    ys = pts.map(p => p[1])
  const bbx = Math.min(...xs),
    bbx2 = Math.max(...xs)
  const bby = Math.min(...ys),
    bby2 = Math.max(...ys)
  const dx = ax + (SLOT_W - (bbx2 - bbx)) / 2 - bbx
  const dy = ay + (SLOT_H - (bby2 - bby)) / 2 - bby
  return transform(pts, { translate: [dx, dy] })
}

/* ==================== Exercise ==================== */
export const exercise3002: Exercise<DATA> = {
  title: 'Ebene Figuren',
  source: '2021 Pflichtteil Aufgabe 1C',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const R = makeR(rng)

    // etwas größer
    const unit = R.int(12, 16)

    // Basis fürs kongruente Paar
    const baseIndex = R.int(0, templates.length - 1)
    const base = templates[baseIndex]
    const scale = R.float(1.15, 1.4)
    const baseScaled = base.map(
      ([x, y]) => [x * unit * scale, y * unit * scale] as Pt,
    )

    // Symmetrie-Typ für das Paar
    const symType: SymType = R.bool() ? 'axis' : 'point'
    const rotA = R.pick([0, 90, 180, 270] as const)
    let rotB: 0 | 90 | 180 | 270
    let reflectB = false
    if (symType === 'axis') {
      rotB = rotA
      reflectB = true
    } else {
      const m = { 0: 180, 90: 270, 180: 0, 270: 90 } as const
      rotB = m[rotA]
    }

    // --- zufällige Slotwahl (Labels sind fix: 0=A,1=B,2=C,3=D) ---
    const allPairs: [number, number][] = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3],
    ]
    const pairSlots = R.pick(allPairs)
    const free = [0, 1, 2, 3].filter(s => !pairSlots.includes(s))
    const triSlot = R.pick(free)
    const lastSlot = free.find(s => s !== triSlot)!

    // --- Polygone erzeugen ---
    const slotPolys: Pt[][] = new Array(4)
    slotPolys[pairSlots[0]] = place(
      pairSlots[0],
      transform(baseScaled, { rot: rotA }),
    )
    slotPolys[pairSlots[1]] = place(
      pairSlots[1],
      transform(baseScaled, { rot: rotB, reflectX: reflectB }),
    )

    // rechtwinkliges Dreieck
    const tri = transform(
      makeRightTri(R.int(3, 6) * unit, R.int(3, 6) * unit),
      {
        rot: R.pick([0, 90, 180, 270] as const),
      },
    )
    slotPolys[triSlot] = place(triSlot, tri)

    // vierte Figur (andere Vorlage, einheitlich skaliert)
    let otherIndex = baseIndex
    while (otherIndex === baseIndex) otherIndex = R.int(0, templates.length - 1)
    const otherScale = R.float(1.0, 1.3)
    const otherScaled = templates[otherIndex].map(
      ([x, y]) => [x * unit * otherScale, y * unit * otherScale] as Pt,
    )
    slotPolys[lastSlot] = place(
      lastSlot,
      transform(otherScaled, {
        rot: R.pick([0, 90, 180, 270] as const),
        reflectX: R.bool(),
      }),
    )

    // Labels sind fest A–D je Slot
    const figures: Figure[] = [0, 1, 2, 3].map(i => ({
      id: (['A', 'B', 'C', 'D'] as const)[i],
      pts: slotPolys[i],
      isRightTriangle: i === triSlot,
    }))

    const congruentPair = [
      (['A', 'B', 'C', 'D'] as const)[pairSlots[0]],
      (['A', 'B', 'C', 'D'] as const)[pairSlots[1]],
    ].sort() as DATA['congruentPair']

    const rightId = (['A', 'B', 'C', 'D'] as const)[triSlot]

    return { figures, congruentPair, rightId, symType }
  },

  /* ======= Statische ORIGINAL-DATEN (NICHT vom Generator befüllt) ======= */
  originalData: {
    figures: [
      {
        id: 'A',
        pts: [
          [25.2, 126.2],
          [151.4, 126.2],
          [100.9, 65],
        ],
        isRightTriangle: true,
      },
      {
        id: 'B',
        pts: [
          [201.9, 50.5],
          [277.5, 50.5],
          [254.0, 88],
        ],
      },
      {
        id: 'C',
        pts: [
          [127.5, 176.4],
          [76.6, 226.4],

          [76.6, 302.4],
          [127.5, 302.4],
        ],
      },
      {
        id: 'D',
        pts: [
          [226.6, 276],
          [277.5, 227.1],
          [277.5, 151.4],
          [226.6, 151.4],
        ],
      },
    ],
    congruentPair: ['C', 'D'],
    rightId: 'A',
    symType: 'point',
  },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <>
        <svg viewBox="0 0 328 328" width="328" height="328">
          <image href="/content/BW_2BFS/Blanko.png" height="328" width="328" />
          {data.figures.map(f => (
            <g key={f.id}>
              <polygon
                points={toPath(f.pts)}
                fill="none"
                stroke="black"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={centroid(f.pts)[0]}
                y={centroid(f.pts)[1]}
                fontSize={16}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {f.id}
              </text>
            </g>
          ))}
        </svg>
      </>
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
            Begründen Sie, welche der Figuren <InlineMath math={`A`} /> bis{' '}
            <InlineMath math={`D`} /> kongruent sind.
          </p>
        )
      },
      solution({ data }) {
        const [p1, p2] = data.congruentPair
        return (
          <p>
            Kongruent sind <InlineMath math={`${p1}`} /> und{' '}
            <InlineMath math={`${p2}`} />. Wenn man sie aufeinanderlegt, passen
            sie genau übereinander. (Beide haben die gleiche Form und Größe.)
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
            Zwei Figuren sind symmetrisch zueinander. Kennzeichnen Sie die
            Symmetrie in geeigneter Weise auf einer Zeichnung.
          </p>
        )
      },
      solution({ data }) {
        const [id1, id2] = data.congruentPair
        const f1 = data.figures.find(f => f.id === id1)!,
          f2 = data.figures.find(f => f.id === id2)!
        const c1 = centroid(f1.pts),
          c2 = centroid(f2.pts)
        const P = f1.pts[0]
        const mid: Pt = [(c1[0] + c2[0]) / 2, (c1[1] + c2[1]) / 2]
        const Pprime: Pt =
          data.symType === 'axis'
            ? ([2 * mid[0] - P[0], P[1]] as Pt)
            : ([2 * mid[0] - P[0], 2 * mid[1] - P[1]] as Pt)
        const H: Pt = data.symType === 'axis' ? ([mid[0], P[1]] as Pt) : mid

        return (
          <>
            <p>
              <InlineMath math={`${id1}`} /> und <InlineMath math={`${id2}`} />{' '}
              sind{' '}
              {data.symType === 'axis'
                ? 'achsensymmetrisch'
                : 'punktsymmetrisch'}
              .{' '}
              {data.symType === 'axis' ? (
                <p>
                  Die Grafik zeigt wie ein Spiegelpunkt{' '}
                  <InlineMath math={`P`} /> an der gestrichelten Achse
                  gespiegelt wird.
                </p>
              ) : (
                <p>
                  Die Grafik zeigt wie ein Spiegelpunkt{' '}
                  <InlineMath math={`P`} /> punktsymmetrisch gespiegelt wird.
                </p>
              )}
            </p>

            <svg viewBox="0 0 328 328" width="328" height="328">
              <defs>
                <marker
                  id="arrowEnd"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="10"
                  markerHeight="10"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path d="M0,0 L10,5 L0,10 Z" fill="black" stroke="none" />
                </marker>
              </defs>

              {data.figures.map(f => (
                <g key={f.id}>
                  <polygon
                    points={toPath(f.pts)}
                    fill="none"
                    stroke="black"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={centroid(f.pts)[0]}
                    y={centroid(f.pts)[1]}
                    fontSize={16}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {f.id}
                  </text>
                </g>
              ))}

              {data.symType === 'axis' ? (
                <line
                  x1={mid[0]}
                  y1={0}
                  x2={mid[0]}
                  y2={328}
                  stroke="gray"
                  strokeDasharray="6 4"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                />
              ) : (
                <circle
                  cx={mid[0]}
                  cy={mid[1]}
                  r={4}
                  fill="none"
                  stroke="gray"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                />
              )}

              <line
                x1={P[0]}
                y1={P[1]}
                x2={H[0]}
                y2={H[1]}
                stroke="black"
                strokeWidth={2}
                markerEnd="url(#arrowEnd)"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={H[0]}
                y1={H[1]}
                x2={Pprime[0]}
                y2={Pprime[1]}
                stroke="black"
                strokeWidth={2}
                markerEnd="url(#arrowEnd)"
                vectorEffect="non-scaling-stroke"
              />

              <circle cx={P[0]} cy={P[1]} r={3} fill="black" />
              <circle cx={Pprime[0]} cy={Pprime[1]} r={3} fill="black" />
            </svg>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Beschreiben Sie, wie Sie ohne Geodreieck überprüfen können, ob es
            sich bei dem Dreieck {data.rightId} um ein rechtwinkliges Dreieck
            handelt.
          </p>
        )
      },
      solution({ data }) {
        return (
          <p>
            Die längste Seite des Dreiecks wird als Durchmesser eines
            Thaleskreises verwendet. Zeichne also einen Thaleskreis und
            überprüfe ob der dritte Punkt auf dem Kreis liegt. Wenn ja, ist das
            Dreieck rechtwinklig.
          </p>
        )
      },
    },
  ],
}
