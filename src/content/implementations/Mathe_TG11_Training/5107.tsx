import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type N = -1 | 1 | 2 | 3 | 4 | 5

interface DATA {
  // Teil a: f(x)=x^n, g(x)=k·f(x)  => k aus Tabellen bestimmen
  nA: N
  kA: number // halbzahlig -5..5 ohne 0

  // Teil b: f(x)=a·x^n (+ c optional), g(x)=k·f(x) => fertiger Term mit verrechneten Vorfaktoren
  nB: N
  aB: number // -4..4 ohne 0
  hasConst: boolean
  cB: number // -6..6 (wenn hasConst)
  kB: number // halbzahlig -5..5 ohne 0
}

const XS = [-3, -2, -1, 0, 1, 2, 3]

function powVal(x: number, n: N) {
  if (n === -1) {
    if (x === 0) return null
    return 1 / x
  }
  return Math.pow(x, n)
}

function buildTableRow(vals: Array<number | null>) {
  return vals.map((v, i) => (
    <td key={i} className="border px-2 py-1 text-right">
      {v === null ? '—' : pp(Math.round(v * 100) / 100)}
    </td>
  ))
}

function kChoices() {
  return [
    -5, -4.5, -4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3,
    3.5, 4, 4.5, 5,
  ]
}

function fmtSignedConst(c: number) {
  return c >= 0 ? `+${pp(c)}` : `-${pp(-c)}`
}

export const exercise5107: Exercise<DATA> = {
  title: 'Streckfaktor (Tabelle & Term)',
  source: 'Potenfunktionen',
  useCalculator: false,
  duration: 12,
  points: 6,

  generator(rng) {
    const nA = rng.randomItemFromArray<N>([-1, 1, 2, 3, 4, 5])
    const kA = rng.randomItemFromArray(kChoices())

    const nB = rng.randomItemFromArray<N>([-1, 1, 2, 3, 4, 5])
    const aB = rng.randomItemFromArray([-4, -3, -2, -1, 1, 2, 3, 4])
    const hasConst = rng.randomItemFromArray([true, false])
    let cB = rng.randomIntBetween(-6, 6)
    if (cB === 0) cB = 2
    const kB = rng.randomItemFromArray(kChoices())

    return { nA, kA, nB, aB, hasConst, cB, kB }
  },

  originalData: {
    nA: 2,
    kA: -1.5,
    nB: 3,
    aB: 2,
    hasConst: true,
    cB: -3,
    kB: 0.5,
  },

  constraint({ data }) {
    if (data.kA === 0 || data.kB === 0) return false
    if (data.aB === 0) return false
    return true
  },

  intro() {
    return null
  },

  tasks: [
    // a) k aus Tabellen bestimmen
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        const fVals = XS.map(x => powVal(x, data.nA))
        const gVals = XS.map((x, i) => {
          const fv = fVals[i]
          return fv === null ? null : data.kA * fv
        })

        return (
          <>
            <p>
              Gegeben ist die Wertetabelle der Funktion{' '}
              <InlineMath math={`f(x)=x^{${data.nA}}`} />. Aus{' '}
              <InlineMath math={`f`} /> entsteht die Funktion{' '}
              <InlineMath math="g" /> durch Streckung in y-Richtung.
            </p>
            <p>Bestimme den Streckfaktor aus der Wertetabelle.</p>

            <div className="my-2 overflow-auto">
              <table className="min-w-[320px] text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">x</th>
                    {XS.map((x, i) => (
                      <th key={i} className="border px-2 py-1 text-right">
                        {pp(x)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1 font-medium">
                      <InlineMath math="f(x)" />
                    </td>
                    {buildTableRow(fVals)}
                  </tr>
                  <tr>
                    <td className="border px-2 py-1 font-medium">
                      <InlineMath math="g(x)" />
                    </td>
                    {buildTableRow(gVals)}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )
      },
      solution({ data }) {
        // kurz: k = g(x)/f(x) (für ein x, wo f(x) definiert und nicht 0)
        // bei n=-1 ist x=0 eh — ; bei n>0 kann f(0)=0 sein -> dann nicht nehmen
        return (
          <>
            <p>
              Der Faktor beträgt: <InlineMath math={`${pp(data.kA)}`} />
            </p>
          </>
        )
      },
    },

    // b) Streckung auf Term anwenden, Ergebnisterm vollständig mit verrechneten Vorfaktoren
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        const termF = data.hasConst
          ? `f(x)=${pp(data.aB)}\\cdot x^{${data.nB}}${fmtSignedConst(data.cB)}`
          : `f(x)=${pp(data.aB)}\\cdot x^{${data.nB}}`

        return (
          <>
            <p>
              Gegeben ist der Funktionsterm der Funktion{' '}
              <InlineMath math={`f`} /> mit
            </p>

            <p>
              <InlineMath math={termF} />.
            </p>
            <p>
              Die Funktion <InlineMath math="g" /> geht aus{' '}
              <InlineMath math={`f`} /> durch Streckung in y-Richtung mit dem
              Faktor <InlineMath math={`${pp(data.kB)}`} /> hervor.
            </p>
            <p>
              Gib den Funktionsterm von <InlineMath math="g(x)" /> an.
            </p>
          </>
        )
      },
      solution({ data }) {
        // g(x)=k*(a x^n + c) = (k*a) x^n + (k*c)
        const ka = Math.round(data.kB * data.aB * 100) / 100
        const kc = Math.round(data.kB * data.cB * 100) / 100

        const term = data.hasConst
          ? `g(x)=${pp(ka)}\\cdot x^{${data.nB}}${fmtSignedConst(kc)}`
          : `g(x)=${pp(ka)}\\cdot x^{${data.nB}}`

        return (
          <>
            <p>
              <InlineMath math={`g(x)= ${pp(data.kB)} \\cdot f(x)`} />
            </p>
            <p>
              <InlineMath math={term} />
            </p>
          </>
        )
      },
    },
  ],
}
