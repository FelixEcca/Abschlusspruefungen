import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type ShiftKind = 'x' | 'y'
type N = -1 | 1 | 2 | 3 | 4 | 5

interface DATA {
  n: N

  // Teil a: g entsteht durch eine unbekannte Verschiebung (nur x ODER nur y)
  shiftKindA: ShiftKind
  shiftA: number // -3..3 ohne 0

  // Teil b: Verschiebung gegeben, Tabelle g ergänzen
  shiftKindB: ShiftKind
  shiftB: number // -3..3 ohne 0

  // Teil c: Verschiebung gegeben, auf Term anwenden
  shiftKindC: ShiftKind
  shiftC: number // -3..3 ohne 0
}

const XS = [-3, -2, -1, 0, 1, 2, 3]

function powVal(x: number, n: N) {
  if (n === -1) {
    if (x === 0) return null // nicht definiert
    return 1 / x
  }
  return Math.pow(x, n)
}

function fmtShiftX(d: number) {
  // g(x)=f(x-d)
  return d >= 0 ? `(x-${pp(d)})` : `(x+${pp(-d)})`
}

function fmtShiftY(c: number) {
  return c >= 0 ? `+${pp(c)}` : `-${pp(-c)}`
}

function buildTableRow(vals: Array<number | null>) {
  return vals.map((v, i) => (
    <td key={i} className="border px-2 py-1 text-right">
      {v === null ? '—' : pp(Math.round(v * 100) / 100)}
    </td>
  ))
}

export const exercise5106: Exercise<DATA> = {
  title: 'Verschiebung (Tabelle & Term)',
  source: 'Potenfunktionen',
  useCalculator: false,
  duration: 12,
  points: 9,

  generator(rng) {
    const n = rng.randomItemFromArray<N>([-1, 1, 2, 3, 4, 5])

    const shiftKindA: ShiftKind = rng.randomItemFromArray(['x', 'y'])
    const shiftA = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])

    const shiftKindB: ShiftKind = rng.randomItemFromArray(['x', 'y'])
    const shiftB = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])

    const shiftKindC: ShiftKind = rng.randomItemFromArray(['x', 'y'])
    const shiftC = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])

    return { n, shiftKindA, shiftA, shiftKindB, shiftB, shiftKindC, shiftC }
  },

  originalData: {
    n: 2,
    shiftKindA: 'x',
    shiftA: 1,
    shiftKindB: 'y',
    shiftB: -2,
    shiftKindC: 'x',
    shiftC: -2,
  },

  constraint({ data }) {
    if (data.shiftA === 0 || data.shiftB === 0 || data.shiftC === 0)
      return false
    return true
  },

  intro() {
    return null
  },

  tasks: [
    // a) Verschiebung aus Tabellen erkennen
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        const n = data.n
        const fVals = XS.map(x => powVal(x, n))

        const gVals = XS.map(x => {
          if (data.shiftKindA === 'x') {
            // g(x)=f(x-d)
            return powVal(x - data.shiftA, n)
          }
          // y-shift: g(x)=f(x)+d
          const fv = powVal(x, n)
          return fv === null ? null : fv + data.shiftA
        })

        return (
          <>
            <p>
              Gegeben sind die Wertetabelle von{' '}
              <InlineMath math={`f(x)=x^{${n}}`} /> und der Funktion{' '}
              <InlineMath math="g" />, die aus <InlineMath math={`f`} />{' '}
              hervorgegangen ist.
            </p>
            <p>
              Entscheide, ob eine Verschiebung in <b>x-</b> oder{' '}
              <b>y-Richtung</b> vorliegt und gib an, um wie viele Einheiten
              verschoben wurde.
            </p>

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
        const text =
          data.shiftKindA === 'x'
            ? `\\text{Verschiebung in} ~x\\text{-Richtung um } ${data.shiftA} \\text{ LE} \\\\g(x)=f${fmtShiftX(data.shiftA)}=${fmtShiftX(data.shiftA)}^{${data.n}}`
            : `\\text{Verschiebung in} ~y\\text{-Richtung um } ${fmtShiftY(data.shiftA)} \\text{ LE}   \\\\g(x)=f(x)${fmtShiftY(data.shiftA)}=x^{${data.n}}${fmtShiftY(data.shiftA)}`
        return (
          <>
            <p>
              <InlineMath math={text} />
            </p>
          </>
        )
      },
    },

    // b) Tabelle von g ergänzen (Transformation gegeben)
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        const n = data.n
        const fVals = XS.map(x => powVal(x, n))

        return (
          <>
            <p>
              Gegeben ist <InlineMath math={`f(x)=x^{${n}}`} />. Daraus entsteht{' '}
              <InlineMath math="g" /> durch eine Verschiebung in{' '}
              {data.shiftKindB === 'x' ? 'x' : 'y'}-Richtung um{' '}
              {Math.abs(data.shiftB)} LE:
            </p>

            <p>
              {data.shiftKindB === 'x' ? (
                <InlineMath math={`g(x)=f${fmtShiftX(data.shiftB)}`} />
              ) : (
                <InlineMath math={`g(x)=f(x)${fmtShiftY(data.shiftB)}`} />
              )}
            </p>

            <p>
              Ergänze die Wertetabelle von <InlineMath math="g(x)" />.
            </p>

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
                    {XS.map((_, i) => (
                      <td key={i} className="border px-2 py-1 text-right">
                        &nbsp;
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )
      },
      solution({ data }) {
        const n = data.n
        const fVals = XS.map(x => powVal(x, n))

        const gVals = XS.map(x => {
          if (data.shiftKindB === 'x') {
            return powVal(x - data.shiftB, n)
          }
          const fv = powVal(x, n)
          return fv === null ? null : fv + data.shiftB
        })

        return (
          <>
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
    },

    // c) Verschiebung auf Funktionsterm anwenden
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        const n = data.n
        return (
          <>
            <p>
              Gegeben ist <InlineMath math={`f(x)=x^{${n}}`} />.
            </p>
            <p>
              Wende die folgende Verschiebung an und gib den Term von{' '}
              <InlineMath math="g(x)" /> an:
            </p>
            <p>
              {data.shiftKindC === 'x' ? (
                <InlineMath math={`g(x)=f${fmtShiftX(data.shiftC)}`} />
              ) : (
                <InlineMath math={`g(x)=f(x)${fmtShiftY(data.shiftC)}`} />
              )}
            </p>
          </>
        )
      },
      solution({ data }) {
        const n = data.n
        if (data.shiftKindC === 'x') {
          return (
            <>
              <InlineMath math={`g(x)=${fmtShiftX(data.shiftC)}^{${n}}`} />
            </>
          )
        }
        // y-shift
        const add = fmtShiftY(data.shiftC)
        return (
          <>
            <InlineMath math={`g(x)=x^{${n}}${add}`} />
          </>
        )
      },
    },
  ],
}
