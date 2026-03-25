import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type DATA = {
  // x-Werte für die Tabelle
  xs: number[]

  // K1: Gerade  y = m x + b
  m: number
  b: number
  y1: number[]

  // K2: Normalparabel in Scheitelform  y = (x - h)^2 + k
  h: number
  k: number
  y2: number[]

  // Aussagen (Task 2)
  stmt1: string
  truth1: boolean
  stmt2: string
  truth2: boolean
  stmt3: string
  truth3: boolean
  stmt4: string
  truth4: boolean

  // Ausgeklappte Form von K2 (für Aussagen)
  quadA: number
  quadB: number
  quadC: number
}

export const exercise3208: Exercise<DATA> = {
  title: 'Wertetabelle',
  source: '2025 Wahlteil Aufgabe 3B',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // x-Werte wie im Original
    const xs = [-2, -1, 0, 1, 2, 3, 4]

    // --- K1: Gerade ---
    const m = rng.randomItemFromArray([-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2])
    const b = rng.randomItemFromArray([
      -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5,
    ])
    const y1 = xs.map(x => m * x + b)

    // --- K2: Normalparabel in Scheitelform ---
    // "Normalparabel" -> Leitkoeffizient = +1
    const h = rng.randomIntBetween(1, 4) // Scheitel x-Richtung
    const k = rng.randomIntBetween(-4, 2) // Scheitel y-Richtung
    const y2 = xs.map(x => (x - h) ** 2 + k)

    // Ausgeklappte Form: y = x^2 + B x + C  (A=1)
    const quadA = 1
    const quadB = -2 * h
    const quadC = h * h + k

    // --- Aussagen ---
    // 1) Steigung von K1 ist größer als -1.
    const stmt1 = 'Die Steigung von K₁ ist größer als -1.'
    const truth1 = m > -1

    // 2) Lineare Funktion & Parabel haben nicht mehr als zwei gemeinsame Punkte. (immer wahr)
    const stmt2 = 'K₁ und K₂ haben nicht mehr als zwei gemeinsame Punkte.'
    const truth2 = true

    // 3) Eine Gleichung zu K₂ lautet: y = x² + Bx + C. (teils wahr, teils falsch)
    const makeTrue = rng.randomBoolean()
    const Bshown =
      quadB + (makeTrue ? 0 : rng.randomItemFromArray([-2, -1, 1, 2]))
    const Cshown =
      quadC + (makeTrue ? 0 : rng.randomItemFromArray([-2, -1, 1, 2]))
    const stmt3 = `Eine Gleichung zu K₂ lautet: y = x² ${Bshown >= 0 ? '+ ' + pp(Bshown) : pp(Bshown)}x ${Cshown >= 0 ? '+ ' + pp(Cshown) : pp(Cshown)}.`
    const truth3 = makeTrue

    // 4) Es gibt Punkte auf K₁, die oberhalb der Geraden y = s liegen.
    const y1max = Math.max(...y1)
    const s =
      Math.round((y1max + rng.randomItemFromArray([-2, -1, 0, 1])) * 10) / 10
    const stmt4 = `Es gibt Punkte auf K₁, die oberhalb der Geraden mit der Gleichung y = ${pp(s)} liegen.`
    const truth4 = y1.some(v => v > s)

    return {
      xs,
      m,
      b,
      y1,
      h,
      k,
      y2,
      quadA,
      quadB,
      quadC,
      stmt1,
      truth1,
      stmt2,
      truth2,
      stmt3,
      truth3,
      stmt4,
      truth4,
    }
  },

  originalData: {
    xs: [-2, -1, 0, 1, 2, 3, 4],
    m: -0.5,
    b: 1.5,
    y1: [2.5, 2, 1.5, 1, 0.5, 0, -0.5],
    h: 1,
    k: -4,
    y2: [5, 0, -3, -4, -3, 0, 5],
    quadA: 1,
    quadB: -2,
    quadC: -3,
    stmt1: 'Die Steigung von K₁ ist größer als -1.',
    truth1: true,
    stmt2: 'K₁ und K₂ haben nicht mehr als zwei gemeinsame Punkte.',
    truth2: true,
    stmt3: 'Eine Gleichung zu K₂ lautet: y = -x² + 2x + 3.',
    truth3: false,
    stmt4:
      'Es gibt Punkte auf K₁, die oberhalb der Geraden mit der Gleichung y = 5 liegen.',
    truth4: true,
  } as DATA,

  constraint({ data }) {
    return (
      Array.isArray(data.xs) &&
      data.xs.length >= 5 &&
      isFinite(data.m) &&
      isFinite(data.b) &&
      Array.isArray(data.y1) &&
      Array.isArray(data.y2) &&
      data.h != 0 &&
      data.k != 0
    )
  },

  intro({ data }) {
    return (
      <div className="space-y-3">
        <p>
          Gegeben sind Wertetabellen zu zwei Schaubildern{' '}
          <InlineMath math="K_1" /> und <InlineMath math="K_2" />. Das Schaubild{' '}
          <InlineMath math="K_2" /> wird durch die Gleichung<br></br>{' '}
          <InlineMath
            math={`y=(x-${data.h})^{2}${data.k >= 0 ? `+${data.k}` : `${data.k}`}`}
          />{' '}
          beschrieben.
        </p>

        {/* Tabelle (K2-y bleibt zunächst leer) */}
        <div className="relative overflow-hidden rounded-lg max-w-[328px] mx-auto">
          <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px]">
            <thead
              className="uppercase"
              style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  x
                </td>
                {data.xs.map((v, i) => (
                  <td
                    key={i}
                    className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"
                  >
                    {pp(v)}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody
              className="bg-white"
              style={{ backgroundColor: '#FFFFFF', color: '#000' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  K<sub>1</sub>: y
                </td>
                {data.y1.map((yy, i) => (
                  <td key={i} className="py-1 border text-center font-bold p-1">
                    {pp(Math.round(yy * 10) / 10)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  K<sub>2</sub>: y
                </td>
                {data.xs.map((_, i) => (
                  <td
                    key={i}
                    className="py-1 border text-center font-bold p-1"
                  ></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },

  tasks: [
    // 1) K2-Werte eintragen
    {
      points: 18,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Tragen Sie die zugehörigen y-Werte zu <InlineMath math="K_2" /> in
              die Wertetabelle ein.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <div className="relative overflow-hidden rounded-lg max-w-[328px] mx-auto">
            <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px]">
              <thead
                className="uppercase"
                style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
              >
                <tr>
                  <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                    x
                  </td>
                  {data.xs.map((v, i) => (
                    <td
                      key={i}
                      className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"
                    >
                      {pp(v)}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody
                className="bg-white"
                style={{ backgroundColor: '#FFFFFF', color: '#000' }}
              >
                <tr>
                  <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                    K<sub>1</sub> y
                  </td>
                  {data.y1.map((yy, i) => (
                    <td
                      key={i}
                      className="py-1 border text-center font-bold p-1"
                    >
                      {pp(Math.round(yy * 10) / 10)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                    K<sub>2</sub> y
                  </td>
                  {data.y2.map((yy, i) => (
                    <td
                      key={i}
                      className="py-1 border text-center font-bold p-1"
                    >
                      {pp(Math.round(yy * 10) / 10)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )
      },
    },

    // 2) Zeichnen + Aussagen bewerten
    {
      points: 24,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Zeichnen Sie die Schaubilder <InlineMath math="K_1" /> und{' '}
              <InlineMath math="K_2" /> in ein gemeinsames Koordinatensystem.
            </p>
          </>
        )
      },
      solution({ data }) {
        // Mapping ins Koordinatensystem (Pixel)
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }

        // Abtastbereich und -schritt (sichtbarer Bereich ca. x∈[-5,5])
        const xMin = -9,
          xMax = 9,
          step = 0.1
        const xs: number[] = []
        for (let x = xMin; x <= xMax + 1e-9; x += step) xs.push(x)

        // K1: y = m x + b
        const pathK1 = xs
          .map(x => `${toX(x)},${toY(data.m * x + data.b)}`)
          .join(' ')

        // K2: y = (x - h)^2 + k
        const pathK2 = xs
          .map(x => `${toX(x)},${toY((x - data.h) ** 2 + data.k)}`)
          .join(' ')

        return (
          <div className="space-y-2">
            <svg
              viewBox="0 0 328 328"
              width="328"
              height="328"
              className="border rounded"
            >
              {/* Koordinatensystem-Hintergrund */}
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                x="0"
                y="0"
                width="328"
                height="328"
              />
              {/* Graph K1 (Gerade) */}
              <polyline
                points={pathK1}
                fill="none"
                stroke="green"
                strokeWidth={2}
              />
              {/* Graph K2 (Parabel) */}
              <polyline
                points={pathK2}
                fill="none"
                stroke="blue"
                strokeWidth={2}
              />
            </svg>
          </div>
        )
      },
    },
    {
      points: 24,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Entscheiden Sie für jede Aussage, ob wahr oder falsch.</p>
            <div className="mt-2 space-y-1 text-sm">
              <p>• {data.stmt1}</p>
              <p>• {data.stmt2}</p>
              <p>• {data.stmt3}</p>
              <p>• {data.stmt4}</p>
            </div>
          </>
        )
      },
      solution({ data }) {
        // Darstellung der w/f-Lösung als Liste
        const wf = (b: boolean) => (b ? 'wahr' : 'falsch')
        const eqExpanded = `y = x² ${data.quadB >= 0 ? '+ ' + pp(data.quadB) : pp(data.quadB)}x ${data.quadC >= 0 ? '+ ' + pp(data.quadC) : pp(data.quadC)}`
        return (
          <div className="space-y-2 text-sm">
            <p>Aussagen:</p>
            <ul className="list-disc pl-5">
              <li>
                {data.stmt1} <strong>{wf(data.truth1)}</strong>
              </li>
              <li>
                {data.stmt2} <strong>{wf(data.truth2)}</strong>
              </li>
              <li>
                {data.stmt3} <strong>{wf(data.truth3)}</strong>{' '}
                {data.truth3 ? null : (
                  <>
                    {' '}
                    (korrekt wäre: <InlineMath math={eqExpanded} />)
                  </>
                )}
              </li>
              <li>
                {data.stmt4} <strong>{wf(data.truth4)}</strong>
              </li>
            </ul>
          </div>
        )
      },
    },
  ],
}
