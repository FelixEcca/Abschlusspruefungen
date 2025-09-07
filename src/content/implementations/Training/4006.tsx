import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type CaseKind = 'qq' | 'qL'
interface DATA {
  kind: CaseKind
  a: number
  b: number
  c: number
  m: number
  n: number
}

export const exercise4006: Exercise<DATA> = {
  title: 'Schnittpunkte berechnen',
  source: 'Training',
  useCalculator: false,
  duration: 10,
  points: 5,

  generator(rng) {
    const kind = rng.randomItemFromArray<CaseKind>(['qq', 'qL'])
    const a = rng.randomIntBetween(1, 3)
    const b = rng.randomIntBetween(-3, 3)
    const c = rng.randomIntBetween(-4, 4)
    const m = rng.randomIntBetween(-3, 3) || 1
    const n = rng.randomIntBetween(-4, 4)
    return { kind, a, b, c, m, n }
  },

  originalData: { kind: 'qL', a: 1, b: 2, c: -3, m: -1, n: 2 },
  constraint({ data }) {
    // alles im Sichtbereich halten
    const { kind, a, b, c, m, n } = data
    const A = kind === 'qL' ? a : a - (a + 1)
    const B = kind === 'qL' ? b - m : b - (b - 1)
    const C = kind === 'qL' ? c - n : c - (c + 1)

    // Lösen A x^2 + B x + C = 0 mit pq-Formel (auf Normalform bringen)
    // x^2 + px + q = 0
    const p = B / A
    const q = C / A
    const D = (p / 2) * (p / 2) - q
    const has = D >= 0
    const x1 = has ? -p / 2 - Math.sqrt(D) : NaN
    const x2 = has ? -p / 2 + Math.sqrt(D) : NaN

    const yAt = (x: number) =>
      data.kind === 'qL' ? m * x + n : (a + 1) * x * x + (b - 1) * x + (c + 1)

    return (
      data.c!=0 && x1%1==0 && x2%1==0   && data.b!=0 && data.n!=0 && data.b!=data.m && data.c!=data.n && x1!=x2
    )
  },

  task({ data }) {
    const { kind, a, b, c, m, n } = data
    const f = `y=${a===1? '' : a===-1? '-' : pp(a)}x^{2} ${b===1? '+' : b===-1? '-' : pp(b, 'merge_op')}x ${pp(c, 'merge_op')}`
    const g =
      kind === 'qL'
        ? `y=${m===1? '' : m===-1? '-' : pp(m)}x ${pp(n, 'merge_op')}`
        : `y=${a+1===1? '' : a+1===-1? '-' : pp(a+1)}x^{2} ${b-1===1? '+' : b-1===-1? '-' : pp(b-1, 'merge_op')}x ${pp(c + 1, 'merge_op')}`

    return (
      <>
        <p>Gegeben sind die Funktionen</p>
        <p>
          <InlineMath math={`f:\\;${f}`} /> und{' '}
          <InlineMath math={`g:\\;${g}`} />.
        </p>
        <p>Bestimme alle Schnittpunkte von f und g.</p>
      </>
    )
  },

  solution({ data }) {
    const { kind, a, b, c, m, n } = data
    const A = kind === 'qL' ? a : a - (a + 1)
    const B = kind === 'qL' ? b - m : b - (b - 1)
    const C = kind === 'qL' ? c - n : c - (c + 1)

    // Lösen A x^2 + B x + C = 0 mit pq-Formel (auf Normalform bringen)
    // x^2 + px + q = 0
    const p = B / A
    const q = C / A
    const D = (p / 2) * (p / 2) - q
    const has = D >= 0
    const x1 = has ? -p / 2 - Math.sqrt(D) : NaN
    const x2 = has ? -p / 2 + Math.sqrt(D) : NaN

    const yAt = (x: number) =>
      data.kind === 'qL' ? m * x + n : (a + 1) * x * x + (b - 1) * x + (c + 1)

    return (
      <>
        <p>
          <b>Gleichsetzen und lösen</b>
        </p>
        {data.kind === 'qL' ? (
          <InlineMath
            math={[
              `\\begin{aligned}`,
              `${pp(a)}x^{2} ${pp(b, 'merge_op')}x ${pp(c, 'merge_op')}&=${pp(m)}x ${pp(n, 'merge_op')}\\\\`,
              `${pp(a)}x^{2} ${pp(b - m, 'merge_op')}x ${pp(c - n, 'merge_op')}&=0\\\\`,
              `x^{2} ${pp(p, 'merge_op')}x ${pp(q, 'merge_op')}&=0`,
              `\\end{aligned}`,
            ].join('')}
          />
        ) : (
          <InlineMath
            math={[
              `\\begin{aligned}`,
              `${pp(a)}x^{2} ${pp(b, 'merge_op')}x ${pp(c, 'merge_op')}&=${pp(a + 1)}x^{2} ${pp(b - 1, 'merge_op')}x ${pp(c + 1, 'merge_op')}\\\\`,
              `${pp(A)}x^{2} ${pp(B, 'merge_op')}x ${pp(C, 'merge_op')}&=0\\\\`,
              `x^{2} ${pp(p, 'merge_op')}x ${pp(q, 'merge_op')}&=0`,
              `\\end{aligned}`,
            ].join('')}
          />
        )}

        <p className="mt-2">
          <b>pq-Formel</b>
        </p>
        <InlineMath
          math={[
            `\\begin{aligned}`,
            `x_{1,2}&=-\\tfrac{p}{2}\\,\\pm\\,\\sqrt{\\left(\\tfrac{p}{2}\\right)^2-q}\\\\`,
            `x_{1,2}&=-\\tfrac{${pp(p)}}{2}\\,\\pm\\,\\sqrt{\\left(\\tfrac{${pp(
              p,
            )}}{2}\\right)^2-${pp(q)}}`,
            `\\end{aligned}`,
          ].join('')}
        />

        {has ? (
          <>
            <p className="mt-2">
              <b>Ergebnisse</b>
            </p>
            <InlineMath math={`x_1=${pp(x1)},\\; x_2=${pp(x2)}`} />
            <p className="mt-2">Schnittpunkte:</p>
            <InlineMath
              math={`S_1\\,(${pp(x1)}\\,|\\,${pp(yAt(x1))}),\\; S_2\\,(${pp(
                x2,
              )}\\,|\\,${pp(yAt(x2))})`}
            />
          </>
        ) : (
          <p className="mt-2">Keine reellen Schnittpunkte.</p>
        )}
      </>
    )
  },
}
