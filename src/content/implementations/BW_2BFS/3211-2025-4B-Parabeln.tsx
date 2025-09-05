import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type DATA = {
  // p1 in Scheitelform: y = a (x - h)^2 + k
  a: number
  h: number
  k: number

  // Verschiebung p1 -> p2: (x,y) -> (x+dx, y+dy) => h2 = h - dx, k2 = k + dy
  dx: number // nach links/rechts (+ nach rechts)
  dy: number // nach oben/unten (+ nach oben)
  h2: number
  k2: number

  // p3: y = x^2 + p x + q (mit reellen Nullstellen)
  p3_p: number
  p3_q: number
  xA: number
  xB: number

  // für Teil (3): drei Geraden
  g1: string // schneidet p1 zweimal
  g2: string // schneidet p1 einmal (Tangente am Scheitel)
  g3: string // schneidet p1 nicht
}

export const exercise3211: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2025 Wahlteil Aufgabe 4B',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // p1: "freundliche" Werte
    const a = 1 // Normalparabel-Öffnung (wie in Vorlage)
    const h = rng.randomIntBetween(1, 6)
    const k = rng.randomIntBetween(-6, 6)

    // Verschiebung p1 -> p2 (links/rechts, oben/unten)
    let dx = rng.randomIntBetween(-4, 4)
    if (dx === 0) dx = 3 // nicht 0, wie im Text
    let dy = rng.randomIntBetween(-3, 3)
    if (dy === 0) dy = 2

    // neue Scheitelkoordinaten: y = a(x - h - dx)^2 + (k + dy)
    const h2 = -(h - dx)
    const k2 = k + dy

    // p3: wähle zwei ganzzahlige Nullstellen und baue daraus
    let r1 = rng.randomIntBetween(-5, 4)
    let r2 = rng.randomIntBetween(r1 + 1, r1 + 6) // verschieden
    if (r2 === r1) r2 = r1 + 1
    const p3_p = -(r1 + r2)
    const p3_q = r1 * r2
    const xA = r1
    const xB = r2

    // Geraden: horizontal – je nach Öffnung oben/unten wählen
    const above = k + 2
    const on = k
    const below = k - 1
    const g1 = a > 0 ? `y=${pp(above)}` : `y=${pp(below)}`
    const g2 = `y=${pp(on)}`
    const g3 = a > 0 ? `y=${pp(below)}` : `y=${pp(above)}`

    return { a, h, k, dx, dy, h2, k2, p3_p, p3_q, xA, xB, g1, g2, g3 }
  },

  // Originaldaten (wie im Bild): p1 mit Scheitel S(2 | −1), Verschiebung: 3 nach links, 2 nach oben,
  // p3: y = x^2 + 10x + 24
  originalData: {
    a: 1,
    h: 2,
    k: -1,
    dx: -3, // "um 3 nach links" => dx = -3
    dy: 2, // "um 2 nach oben"
    h2: 2 - -3, // 5
    k2: -1 + 2, // 1
    p3_p: 10,
    p3_q: 24,
    xA: -6,
    xB: -4,
    g1: 'y=1', // schneidet p1 zweimal (über dem Minimum)
    g2: 'y=-1', // Tangente am Scheitel
    g3: 'y=-2', // kein Schnitt
  } as DATA,

  constraint({ data }) {
    // a ≠ 0, vernünftige Integerbereiche; p3 soll reelle Nullstellen haben
    const disc = (data.p3_p / 2) ** 2 - data.p3_q
    return (
      data.a !== 0 &&
      Number.isFinite(disc) &&
      disc >= 0 &&
      data.k !== 0 &&
      data.h !== 0
    )
  },

  intro({ data }) {
    // Zeichenfunktion für Parabel
    function toX(n: number) {
      return 167 + n * ((94.5 * 2) / 10)
    }
    function toY(n: number) {
      return 163 - n * ((94.5 * 2) / 10)
    }
    const ptsP1: string[] = []
    for (let x = -5; x <= 9.0001; x += 0.1) {
      const y = data.a * (x - data.h) ** 2 + data.k
      ptsP1.push(`${toX(x)},${toY(y)}`)
    }
    return (
      <div className="space-y-2">
        <p>
          Die Abbildung zeigt eine Parabel <InlineMath math="p_1" />.
        </p>
        <svg
          viewBox="0 0 328 328"
          width={328}
          height={328}
          className="border rounded"
        >
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            x="0"
            y="0"
            width="328"
            height="328"
          />
          <polyline
            points={ptsP1.join(' ')}
            fill="none"
            stroke="blue"
            strokeWidth={2}
          />
          {/* markiere den Scheitel S(h|k) */}
          <circle cx={toX(data.h)} cy={toY(data.k)} r={3} fill="black" />
          <text
            x={toX(data.h) + 10}
            y={toY(data.k) + 10}
            fontSize={12}
            textAnchor="start"
            stroke="black"
          >
            p₁
          </text>
        </svg>
      </div>
    )
  },

  tasks: [
    // 1) Scheitelform von p1
    {
      points: 10,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Geben Sie die Scheitelform der Parabelgleichung von{' '}
            <InlineMath math="p_1" /> an.
          </p>
        )
      },
      solution({ data }) {
        return (
          <BlockMath
            math={`p_1:\\; y = ${data.a === 1 ? '' : pp(data.a)}(x-${pp(data.h)})^{2} ${pp(data.k, 'merge_op')}`}
          />
        )
      },
    },

    // 2) p1 wird um dx nach links/rechts und dy nach oben/unten verschoben → p2
    {
      points: 10,
      intro({ data }) {
        const lr =
          data.dx < 0
            ? `${pp(Math.abs(data.dx))}\\text{ nach links}`
            : `${pp(data.dx)}\\text{ nach rechts}`
        const ud =
          data.dy < 0
            ? `${pp(Math.abs(data.dy))}\\text{ nach unten}`
            : `${pp(data.dy)}\\text{ nach oben}`
        return (
          <p>
            Die Parabel <InlineMath math="p_1" /> wird um{' '}
            {<InlineMath math={lr} />} und um {<InlineMath math={ud} />}{' '}
            verschoben. Dadurch entsteht eine neue Parabel{' '}
            <InlineMath math="p_2" />.
          </p>
        )
      },
      task() {
        return (
          <p>
            Geben Sie eine Gleichung von <InlineMath math="p_2" /> an.
          </p>
        )
      },
      solution({ data }) {
        const lr =
          data.dx < 0
            ? `${pp(Math.abs(data.dx))}\\text{ nach links}`
            : `${pp(data.dx)}\\text{ nach rechts}`
        const ud =
          data.dy < 0
            ? `${pp(Math.abs(data.dy))}\\text{ nach unten}`
            : `${pp(data.dy)}\\text{ nach oben}`
        // Verschiebung: x -> x - dx, y -> y - dy  ⇒ neue Scheitelform y = a (x - (h - dx))^2 + (k + dy)
        return (
          <>
            <p>
              Ausgehend von <InlineMath math={'p_1'} /> verschieben wir die
              Parabel um <InlineMath math={lr} /> und um{' '}
              <InlineMath math={ud} />.
            </p>
            <BlockMath
              math={String.raw`p_1:\; y = ${data.a === 1 ? '' : pp(data.a)}(x-${pp(data.h)})^{2} ${pp(data.k, 'merge_op')}`}
            />
            <BlockMath
              math={String.raw`p_2:\; y = ${data.a === 1 ? '' : pp(data.a)}\left(x-${pp(data.h)}\color{green}~{${data.dx < 0 ? '+' : '-'}${Math.abs(data.dx)}}\right)^{2} ${data.k === 0 ? '' : pp(data.k, 'merge_op')}~\color{green}{${data.dy < 0 ? '-' : '+'}${Math.abs(data.dy)}}`}
            />
            <BlockMath
              math={String.raw`=\, ${data.a === 1 ? '' : pp(data.a)}(x${pp(-data.h - data.dx, 'merge_op')})^{2} ${pp(data.k2, 'merge_op')}`}
            />
          </>
        )
      },
    },

    // 3) Gerade g1,g2,g3: zweimal / einmal / nicht
    {
      points: 10,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Bestimmen Sie jeweils eine mögliche Geradengleichung für{' '}
            <InlineMath math="g_1, g_2, g_3" />:
            <br />• <InlineMath math="g_1" /> schneidet{' '}
            <InlineMath math="p_1" /> zweimal.
            <br />• <InlineMath math="g_2" /> schneidet{' '}
            <InlineMath math="p_1" /> einmal.
            <br />• <InlineMath math="g_3" /> schneidet{' '}
            <InlineMath math="p_1" /> nicht.
          </p>
        )
      },
      solution({ data }) {
        return (
          <div className="space-y-1">
            <p>
              <InlineMath math={`g_1:\\; ${data.g1}`} /> (zwei Schnittpunkte)
            </p>
            <p>
              <InlineMath math={`g_2:\\; ${data.g2}`} /> (Berührt am Scheitel)
            </p>
            <p>
              <InlineMath math={`g_3:\\; ${data.g3}`} /> (kein Schnittpunkt)
            </p>
          </div>
        )
      },
    },

    // 4) Schnittpunkte p3 mit x-Achse
    {
      points: 12,
      intro({ data }) {
        return (
          <p>
            Gegeben ist die Parabel <InlineMath math="p_3" /> mit <br />
            <InlineMath
              math={`y = x^{2} ${pp(data.p3_p, 'merge_op')}x ${pp(data.p3_q, 'merge_op')}`}
            />
            .
          </p>
        )
      },
      task() {
        return (
          <p>
            Berechnen Sie die Koordinaten der Schnittpunkte von{' '}
            <InlineMath math="p_3" /> mit der x-Achse.
          </p>
        )
      },
      solution({ data }) {
        // pq-Formel: x^2 + p x + q = 0 ⇒ x = -p/2 ± √((p/2)^2 - q)
        const p = data.p3_p
        const q = data.p3_q
        const D = (p / 2) ** 2 - q
        const x1 = -p / 2 + Math.sqrt(D)
        const x2 = -p / 2 - Math.sqrt(D)
        return (
          <>
            <p>
              Setze die Gleichung der Parabel gleich 0 und löse mit der
              pq-Formel:
            </p>
            <BlockMath
              math={String.raw`
              \begin{aligned}
              0 &= x^{2} ${pp(p, 'merge_op')}x ${pp(q, 'merge_op')}\\[2pt]
              x_{1,2} &= -\frac{${pp(p, 'embrace_neg')}}{2}\ \pm\ \sqrt{\left(\frac{${pp(p)}}{2}\right)^{2} ${pp(-q, 'merge_op')}}\\[2pt]
              &= ${pp(-p / 2)} \ \pm\ \sqrt{${pp(D)}}\\
              &= ${pp(-p / 2)} \ \pm ${pp(Math.sqrt(D))}\\
              x_1&= ${pp(x1)}\\
              x_2&= ${pp(x2)}
              \end{aligned}
            `}
            />
            <p>
              Somit sind die Schnittpunkte:<br></br>
              <InlineMath
                math={`SP_1\\,(${pp(x1)}\\mid 0),\\quad SP_2\\,(${pp(x2)}\\mid 0)`}
              />
            </p>
          </>
        )
      },
    },
  ],
}
