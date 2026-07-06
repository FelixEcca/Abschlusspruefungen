import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

// y = a·x^2 + c
type Parab = { a: number; c: number; name: string }
// Sichtbares Kurvenlabel (K₁…K₄) für die Zeichnung
type LabeledParab = Parab & { label: string }

interface DATA {
  // Teil a)
  curves: LabeledParab[] // gezeichnete Parabeln mit Labels
  equations: Parab[] // dieselben Parabeln in zufälliger Reihenfolge (Namen p1…p4)
  mapping: Record<string, string> // Lösung: p? -> K?

  // Teil b) Parabel in Scheitelform und Aussagen
  a_b: number
  h_b: number
  k_b: number // p(x) = a_b (x - h_b)^2 + k_b
  statements: { text: React.ReactNode; truth: boolean }[]
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

// Pfadpunkte einer Parabel
function pathParabola(a: number, cOrH: number, k?: number) {
  // Wenn k angegeben ist: a(x-h)^2 + k, sonst a x^2 + c
  const h = k !== undefined ? cOrH : 0
  const c = k !== undefined ? k : cOrH
  const pts: string[] = []
  for (let x = -6; x <= 6; x += 0.1) {
    const y = k !== undefined ? a * (x - h) * (x - h) + c : a * x * x + c
    pts.push(`${toX(x)},${toY(y)}`)
  }
  return pts.join(' ')
}

function shuffle<T>(arr: T[], rng: any): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = rng.randomIntBetween(0, i)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const exercise3103: Exercise<DATA> = {
  title: 'Parabeln zuordnen',
  source: '2023 Pflichtteil Aufgabe 1D',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    // -------- Teil a) vier Parabeln vom Typ y = a x^2 + c
    const Aset = [-2, -1, 0.5, 2]
    const Cset = [-1, 1, 2, 3]
    const aVals = shuffle(Aset, rng)
    const cVals = shuffle(Cset, rng)
    const base: Parab[] = Array.from({ length: 4 }, (_, i) => ({
      a: aVals[i],
      c: cVals[i],
      name: `p${i + 1}`,
    }))

    const labels = ['K₁', 'K₂', 'K₃', 'K₄']
    const curves: LabeledParab[] = base.map((p, i) => ({
      ...p,
      label: labels[i],
    }))

    // Zufällige Reihenfolge der Gleichungen (Zuordnungsaufgabe)
    const equations = shuffle(
      base.map(p => ({ ...p })),
      rng,
    )

    // Lösungstabelle p? -> K?
    const mapping: Record<string, string> = {}
    equations.forEach(eq => {
      const idx = base.findIndex(b => b.a === eq.a && b.c === eq.c)
      mapping[eq.name] = labels[idx]
    })

    // -------- Teil b) zufällige Parabel y = a (x - h)^2 + k und Aussagen
    const a_b = rng.randomItemFromArray([1, -1, 0.5, 2])
    const h_b = rng.randomIntBetween(-2, 2)
    const k_b = rng.randomIntBetween(-1, 3)

    const pool = [
      {
        mk: () => ({
          text: (
            <>
              Die Parabel schneidet die <InlineMath math="x" />
              -Achse nicht.
            </>
          ),
          truth: a_b > 0 ? k_b > 0 : k_b < 0,
        }),
      },
      {
        mk: () => {
          const y0 = a_b * (0 - h_b) * (0 - h_b) + k_b
          return {
            text: (
              <>
                Der Schnittpunkt mit der <InlineMath math="y" />
                -Achse liegt bei (
                <InlineMath math="0" /> | <InlineMath math={`${y0}`} />
                ).
              </>
            ),
            truth: true,
          }
        },
      },
      {
        mk: () => ({
          text: (
            <>
              Bei <InlineMath math={`x=${h_b}`} /> und{' '}
              <InlineMath math={`y=${k_b}`} /> liegt der Scheitelpunkt.
            </>
          ),
          truth: true,
        }),
      },
      {
        mk: () => ({
          text: (
            <>
              Die Parabel ist achsensymmetrisch zur Geraden{' '}
              <InlineMath math={`x=${h_b}`} />.
            </>
          ),
          truth: true,
        }),
      },
      {
        mk: () => ({
          text: <>Die Parabel öffnet sich nach oben.</>,
          truth: a_b > 0,
        }),
      },
      {
        mk: () => ({
          text: (
            <>
              Der Scheitelpunkt liegt auf der <InlineMath math="x" />
              -Achse.
            </>
          ),
          truth: k_b === 0,
        }),
      },
    ]
    const statements = shuffle(pool, rng)
      .slice(0, 4)
      .map(s => s.mk())

    return { curves, equations, mapping, a_b, h_b, k_b, statements }
  },
  originalData: {
    curves: [
      { a: -2, c: 2, name: 'p1', label: 'K₁' },
      { a: 2, c: -1, name: 'p2', label: 'K₂' },
      { a: -2, c: -1, name: 'p3', label: 'K₃' },
      { a: 0.5, c: 2, name: 'p4', label: 'K₄' },
    ],
    equations: [
      { a: -2, c: 2, name: 'p1' },
      { a: 2, c: -1, name: 'p2' },
      { a: -2, c: -1, name: 'p3' },
      { a: 0.5, c: 2, name: 'p4' },
    ],
    mapping: { p1: 'K₃', p2: 'K₄', p3: 'K₁', p4: 'K₂' },
    a_b: 1,
    h_b: -1,
    k_b: 2,
    statements: [
      {
        text: (
          <>
            Die Parabel schneidet die <InlineMath math="x" />
            -Achse nicht.
          </>
        ),
        truth: true,
      },
      {
        text: (
          <>
            Der Schnittpunkt mit der <InlineMath math="y" />
            -Achse liegt bei (
            <InlineMath math="3" /> | <InlineMath math="0" />
            ).
          </>
        ),
        truth: false,
      },
      {
        text: (
          <>
            Bei <InlineMath math="x=1" /> und <InlineMath math="y=2" /> liegt
            der Scheitelpunkt.
          </>
        ),
        truth: false,
      },
      {
        text: (
          <>
            Die Parabel ist achsensymmetrisch zur Geraden{' '}
            <InlineMath math="x=-1" />.
          </>
        ),
        truth: true,
      },
    ],
  },
  constraint({ data }) {
    // vermeiden, dass die Scheitelachse x=0 ist und k=0, damit die Aussagen abwechslungsreich sind
    return data.h_b !== 0 && data.k_b !== 0
  },
  intro() {
    return null
  },
  tasks: [
    // a) Zuordnung
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Ordnen Sie jeder sichtbaren Parabel im Koordinatensystem die
              passende Gleichung zu. Notieren Sie dazu für jede Gleichung den
              Kurvennamen <InlineMath math="K_1" /> – <InlineMath math="K_4" />.
            </p>

            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              {data.curves.map((p, i) => {
                const color = ['#000000', '#2E7D32', '#1565C0', '#E65100'][i]
                // Labelposition (etwas seitlich vom Scheitel (0,c))
                const lx = 2.2
                const ly = p.c + (p.a > 0 ? 1.4 : -1.4)
                return (
                  <>
                    <polyline
                      key={`curve-${i}`}
                      points={pathParabola(p.a, p.c)}
                      stroke={color}
                      strokeWidth="2"
                      fill="none"
                    />
                    <text x={toX(lx)} y={toY(ly)} fontSize={16} stroke={color}>
                      {p.label}
                    </text>
                  </>
                )
              })}
            </svg>

            <p>Gleichungen:</p>
            <ul>
              {data.equations.map(eq => (
                <li key={eq.name}>
                  <InlineMath
                    math={`${eq.name}:\\; y = ${eq.a}x^{2} ${
                      eq.c >= 0 ? '+' : ''
                    } ${eq.c}`}
                  />
                </li>
              ))}
            </ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Lösung der Zuordnung (Gleichung → Kurvenname):</p>
            <ul>
              {data.equations.map(eq => (
                <li key={`sol-${eq.name}`}>
                  <b>{eq.name}</b> → <b>{data.mapping[eq.name]}</b>
                </li>
              ))}
            </ul>
          </>
        )
      },
    },

    // b) Aussagen zu einer Parabel in Scheitelform
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            <p>
              Gegeben ist die Parabel
              <br />
              <InlineMath
                math={`p:\\; y = ${pp(data.a_b)}(x${pp(
                  -data.h_b,
                  'merge_op',
                )})^{2} ${data.k_b >= 0 ? '+' : ''} ${data.k_b}`}
              />
              . Entscheiden Sie bei jeder Aussage, ob sie richtig oder falsch
              ist, und begründen Sie kurz.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <ol>
              {data.statements.map((s, i) => (
                <li key={`st-${i}`}>{s.text}</li>
              ))}
            </ol>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Wahrheitswerte zu den obigen Aussagen:</p>
            <ol>
              {data.statements.map((s, i) => (
                <li key={`solb-${i}`}>
                  {s.text} — <b>{s.truth ? 'richtig' : 'falsch'}</b>
                </li>
              ))}
            </ol>
          </>
        )
      },
    },
  ],
}
