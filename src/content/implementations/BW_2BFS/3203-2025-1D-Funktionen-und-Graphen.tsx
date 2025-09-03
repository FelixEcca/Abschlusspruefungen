// src/content/exercises/exercise3203.tsx
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'

/* kleine Helfer für saubere LaTeX-Strings */
const sign = (n: number) => (n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`)
const sx = (n: number) => (n === 1 ? '' : n === -1 ? '-' : String(n))

type Label = 'A' | 'B' | 'C' | 'D'

interface DATA {
  // Gleichungen:
  c1: number // (1) y = -x^2 + c1
  m2: number
  b2: number // (2) y = m2 x + b2
  s3: number
  k3: number // (3) y = (x + s3)^2 + k3

  // Distraktor (zufällig Linie oder Parabel)
  distractorType: 'line' | 'parabola'
  dm: number
  db: number // y = dm x + db
  da: number
  dc: number // y = da x^2 + dc

  // Reihenfolge der vier Schaubilder (A–D)
  order: Label[]

  // Anzeige (Koordinaten-Abbildung zum PNG)
  // Das Raster "ksgroßmitachsen.png" benutzen wir wie in deinen anderen Aufgaben
}

export const exercise3203: Exercise<DATA> = {
  title: 'Funktionen und Schaubilder',
  source: '2025 Pflichtteil Aufgabe 1D',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    // gut unterscheidbare Kurven wählen
    const c1 = rng.randomIntBetween(2, 5) // nach unten geöffnete Parabel nach oben verschoben
    const m2 = rng.randomIntBetween(-3, -1) // fallende Gerade
    const b2 = rng.randomIntBetween(2, 4)
    const s3 = rng.randomIntBetween(-4, -1) // Scheitel links der y-Achse
    const k3 = rng.randomIntBetween(-1, 1)

    const distractorType = rng.randomBoolean() ? 'line' : 'parabola'
    const dm = rng.randomIntBetween(1, 3)
    const db = rng.randomIntBetween(-2, 2)
    const da = rng.randomIntBetween(1, 1) * (rng.randomBoolean() ? 1 : -1)
    const dc = rng.randomIntBetween(2, 4)

    const order = rng.shuffleArray(['A', 'B', 'C', 'D'] as const) as Label[]

    return { c1, m2, b2, s3, k3, distractorType, dm, db, da, dc, order }
  },

  originalData: {
    c1: 3,
    m2: -1,
    b2: 3,
    s3: -3,
    k3: 0,
    distractorType: 'line',
    dm: 2,
    db: -2,
    da: 1,
    dc: 4,
    order: ['A', 'B', 'C', 'D'],
  },

  constraint() {
    return true
  },

  intro({ data }) {
    // Gleichungen fürs Statement
    const eq1 = String.raw`y=-x^2 ${sign(data.c1)}`
    const eq2 = String.raw`y=${sx(data.m2)}x ${sign(data.b2)}`
    const eq3 = String.raw`y=(x ${sign(data.s3)})^2 ${sign(data.k3)}`

    return (
      <>
        <p>
          Gegeben sind drei Gleichungen <InlineMath math="(1)\text{–}(3)" />{' '}
          sowie eine Abbildung mit vier Schaubildern{' '}
          <InlineMath math="A,B,C,D" />.
        </p>
        <ul className="list-disc ml-6">
          <li>
            <InlineMath math={`(1)\\; ${eq1}`} />
          </li>
          <li>
            <InlineMath math={`(2)\\; ${eq2}`} />
          </li>
          <li>
            <InlineMath math={`(3)\\; ${eq3}`} />
          </li>
        </ul>

        <GraphKS data={data} />
      </>
    )
  },

  tasks: [
    {
      points: 42,
      task(props: { data: DATA }) {
        return (
          <>
            <p>
              Ordnen Sie jeder Gleichung ihr passendes Schaubild zu und tragen
              Sie Ihr Ergebnis in die Tabelle ein.
            </p>
            <MappingTable />
          </>
        )
      },
      solution({ data }) {
        // Reihenfolge der Kurven in GraphKS:
        // index 0 → (1), index 1 → (2), index 2 → (3), index 3 → Distraktor
        const a = data.order[0],
          b = data.order[1],
          c = data.order[2]
        return (
          <>
            <p>Lösung der Zuordnungstabelle:</p>
            <BlockMath
              math={String.raw`\begin{array}{c|c|c|c}
\text{Gleichung} & (1) & (2) & (3)\\\hline
\text{Schaubild} & ${a} & ${b} & ${c}
\end{array}`}
            />
          </>
        )
      },
    },
    {
      points: 42,
      task() {
        return (
          <p>
            Eines der Schaubilder konnte nicht zugeordnet werden. Stellen Sie
            für dieses Schaubild eine Gleichung auf.
          </p>
        )
      },
      solution({ data }) {
        const txt =
          data.distractorType === 'line'
            ? String.raw`y=${sx(data.dm)}x ${sign(data.db)}`
            : String.raw`y=${data.da}\,x^2 ${sign(data.dc)}`
        return (
          <>
            <p>
              Das nicht zuordenbare Schaubild ist <b>{data.order[3]}</b>.
            </p>
            <BlockMath
              math={`\\text{Eine passende Gleichung ist:}\\quad ${txt}.`}
            />
          </>
        )
      },
    },
  ],
}

/* ========= Darstellung mit deinem PNG-Hintergrund ========= */

function GraphKS({ data }: { data: DATA }) {
  // Das bekannte Mapping für ksgroßmitachsen.png
  const toX = (n: number) => 167 + n * ((94.5 * 2) / 10)
  const toY = (n: number) => 163 - n * ((94.5 * 2) / 10)

  const poly = (f: (x: number) => number, step = 0.05) => {
    let s = ''
    for (let x = -9; x <= 9; x += step) {
      s += `${toX(x)},${toY(f(x))} `
    }
    return s.trim()
  }

  // (1) y = -x^2 + c1
  const f1 = (x: number) => -x * x + data.c1
  // (2) y = m2 x + b2
  const f2 = (x: number) => data.m2 * x + data.b2
  // (3) y = (x + s3)^2 + k3
  const f3 = (x: number) => (x + data.s3) * (x + data.s3) + data.k3
  // Distraktor
  const fd =
    data.distractorType === 'line'
      ? (x: number) => data.dm * x + data.db
      : (x: number) => data.da * x * x + data.dc

  const curves = [f1, f2, f3, fd]
  const colors = ['#0b74de', '#0f9d58', '#f4b400', '#db4437'] // A,B,C,D
  const labels = data.order

  return (
    <svg viewBox="0 0 328 328" width="328" height="328" className="my-2">
      <image
        href="/content/BW_2BFS/ksgroßmitachsen.png"
        height="328"
        width="328"
      />
      {curves.map((f, i) => (
        <g key={i}>
          <polyline
            points={poly(f, 0.02)}
            fill="none"
            stroke={colors[i]}
            strokeWidth={2}
          />
          {/* Buchstabe nahe eines markanten Punkts */}
          <text
            x={toX(-0.5 + i * 0.4)}
            y={toY(f(-0.5 + i * 0.4)) - 8}
            fontSize={16}
            textAnchor="middle"
            stroke="white"
            strokeWidth={3}
            fill={colors[i]}
          >
            {labels[i]}
          </text>
          <text
            x={toX(-0.5 + i * 0.4)}
            y={toY(f(-0.5 + i * 0.4)) - 8}
            fontSize={16}
            textAnchor="middle"
            fill={colors[i]}
          >
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* ========= Zuordnungstabelle im gewünschten Stil ========= */

function MappingTable() {
  return (
    <div
      className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
      style={{ transform: 'scale(1)', transformOrigin: 'top left' }}
    >
      <table className="table-auto rounded-lg shadow-md w-full text-left text-[12px] ">
        <thead
          className="uppercase bg-[#D2ECF6] text-[#404040]"
          style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
        >
          <tr>
            <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
              Gleichung
            </td>
            <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
              (1)
            </td>
            <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
              (2)
            </td>
            <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
              (3)
            </td>
          </tr>
        </thead>
        <tbody
          className="bg-white text-gray-500"
          style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
        >
          <tr>
            <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
              Schaubild
            </td>
            <td className="py-1 border text-center font-bold p-1"></td>
            <td className="py-1 border text-center font-bold p-1"></td>
            <td className="py-1 border text-center font-bold p-1"></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
