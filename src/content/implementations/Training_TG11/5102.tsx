import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type GraphKind = 'power' | 'parabola'
type EndStyle = 'open' | 'closed'

interface DATA {
  // a) Graph-Aufgabe (Intervall sichtbar)
  graphKind: GraphKind
  sign: 1 | -1
  n: number // nur für power
  a: number // für parabola
  d: number
  e: number
  xmin: number
  xmax: number
  leftStyle: EndStyle
  rightStyle: EndStyle

  // b) Term-Aufgabe
  termKind: 'power' | 'ax2c' | 'vertex'
  tSign: 1 | -1
  tn: number
  ta: number
  tc: number
  td: number
  te: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function fmtSign(sign: 1 | -1) {
  return sign === -1 ? '-' : ''
}

function polylineFromFn(fn: (x: number) => number, xmin: number, xmax: number) {
  const pts: string[] = []
  for (let x = xmin; x <= xmax; x += 0.05) {
    const y = fn(x)
    const yClamped = Math.max(-9.5, Math.min(9.5, y))
    pts.push(`${toX(x)},${toY(yClamped)}`)
  }
  return pts.join(' ')
}

function endPointCircle(x: number, y: number, style: EndStyle) {
  const cx = toX(x)
  const cy = toY(y)
  const r = 5
  if (style === 'closed') {
    return <circle cx={cx} cy={cy} r={r} fill="black" />
  }
  return <circle cx={cx} cy={cy} r={r} fill="white" stroke="black" strokeWidth="2" />
}

function intervalLatex(xmin: number, xmax: number, l: EndStyle, r: EndStyle) {
  const L = l === 'closed' ? '[' : '('
  const R = r === 'closed' ? ']' : ')'
  return `${L}${pp(xmin)};${pp(xmax)}${R}`
}

function rangeFromSample(
  fn: (x: number) => number,
  xmin: number,
  xmax: number,
  left: EndStyle,
  right: EndStyle,
) {
  // Sample fein genug für Schulniveau
  const ys: number[] = []
  for (let x = xmin; x <= xmax; x += 0.01) ys.push(fn(x))
  let ymin = Math.min(...ys)
  let ymax = Math.max(...ys)

  // falls Rand offen: Randwert "nicht enthalten" nur wenn Extrem genau am Rand liegt.
  // Für einfache Darstellung: wir prüfen Extremnähe an Rand.
  const yL = fn(xmin)
  const yR = fn(xmax)

  const minAtLeft = Math.abs(ymin - yL) < 1e-6
  const minAtRight = Math.abs(ymin - yR) < 1e-6
  const maxAtLeft = Math.abs(ymax - yL) < 1e-6
  const maxAtRight = Math.abs(ymax - yR) < 1e-6

  const minIncluded =
    !((minAtLeft && left === 'open') || (minAtRight && right === 'open'))
  const maxIncluded =
    !((maxAtLeft && left === 'open') || (maxAtRight && right === 'open'))

  ymin = round2(ymin)
  ymax = round2(ymax)

  const L = minIncluded ? '[' : '('
  const R = maxIncluded ? ']' : ')'
  return `${L}${pp(ymin)};${pp(ymax)}${R}`
}

export const exercise5102: Exercise<DATA> = {
  title: 'Definitions- und Wertemenge',
  source: 'Potenzfunktionen',
  useCalculator: false,
  duration: 10,
  points: 6,

  generator(rng) {
    // a) Graph
    const graphKind: GraphKind = rng.randomItemFromArray(['power', 'parabola'])
    const sign: 1 | -1 = rng.randomItemFromArray([1, -1])
    const n = rng.randomItemFromArray([2, 3, 4, 5, 6,7,8,9]) // gut sichtbar
    const a = rng.randomItemFromArray([-2, -1, 1, 2])
    const d = rng.randomIntBetween(-3, 3)
    const e = rng.randomIntBetween(-4, 4)

    // sichtbares Intervall (sortiert + keine gleichen x)
    let xmin = -10
    let xmax = 10
    if (xmin >= xmax) {
      const tmp = xmin
      xmin = xmax - 2
      xmax = tmp + 2
    }

    const leftStyle: EndStyle = rng.randomItemFromArray(['open', 'closed'])
    const rightStyle: EndStyle = rng.randomItemFromArray(['open', 'closed'])

    // b) Term
    const termKind = rng.randomItemFromArray<'power' | 'ax2c' | 'vertex'>([
      'power',
      'ax2c',
      'vertex',
    ])
    const tSign: 1 | -1 = rng.randomItemFromArray([1, -1])
    const tn = rng.randomItemFromArray([1, 2, 3, 4, 5,6,7,8,9,10])
    const ta = rng.randomItemFromArray([-2, -1, 1, 2])
    const tc = rng.randomIntBetween(-6, 6)
    const td = rng.randomIntBetween(-4, 4)
    const te = rng.randomIntBetween(-6, 6)

    return {
      graphKind,
      sign,
      n,
      a,
      d,
      e,
      xmin,
      xmax,
      leftStyle,
      rightStyle,
      termKind,
      tSign,
      tn,
      ta,
      tc,
      td,
      te,
    }
  },

  originalData: {
    graphKind: 'parabola',
    sign: 1,
    n: 3,
    a: 1,
    d: 1,
    e: -2,
    xmin: -4,
    xmax: 4,
    leftStyle: 'closed',
    rightStyle: 'open',
    termKind: 'vertex',
    tSign: 1,
    tn: 3,
    ta: 1,
    tc: 2,
    td: -1,
    te: 1,
  },

  constraint({ data }) {
    return data.xmin < data.xmax && data.td!=0 && data.te !== 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        const fn =
          data.graphKind === 'power'
            ? (x: number) => data.sign * Math.pow(x, data.n)
            : (x: number) => data.a * Math.pow(x - data.d, 2) + data.e

        const poly = polylineFromFn(fn, data.xmin, data.xmax)
        const yL = fn(data.xmin)
        const yR = fn(data.xmax)

        return (
          <>
            <p>
              Bestimme aus dem Schaubild die Definitionsmenge{' '}
              <InlineMath math="D" /> und die Wertemenge <InlineMath math="W" />.
            </p>

            <svg viewBox="0 0 328 328" className="my-2">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={poly}
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
              {endPointCircle(data.xmin, yL, data.leftStyle)}
              {endPointCircle(data.xmax, yR, data.rightStyle)}
            </svg>
          </>
        )
      },
      solution({ data }) {
        const fn =
          data.graphKind === 'power'
            ? (x: number) => data.sign * Math.pow(x, data.n)
            : (x: number) => data.a * Math.pow(x - data.d, 2) + data.e

        const D = intervalLatex(data.xmin, data.xmax, data.leftStyle, data.rightStyle)
        const W = rangeFromSample(fn, data.xmin, data.xmax, data.leftStyle, data.rightStyle)

        return (
          <>
            <p>
              <InlineMath math={`D=${D}`} />
              <br />
              <InlineMath math={`W=${W}`} />
            </p>
          </>
        )
      },
    },

    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        let term = ''
        if (data.termKind === 'power') {
          term = `f(x)=${fmtSign(data.tSign)}x^{${data.tn}}`
        } else if (data.termKind === 'ax2c') {
          // f(x)=a x^2 ± c
          term = `f(x)=${pp(data.ta)}x^{2}${pp(data.tc, 'merge_op')}`
        } else {
          // vertex: a(x-d)^2+e
          term = `f(x)=${pp(data.ta)}\\,(x${pp(-data.td, 'merge_op')})^{2}${pp(
            data.te,
            'merge_op',
          )}`
        }

        return (
          <>
            <p>
              Bestimme Definitionsmenge <InlineMath math="D" /> und
              Wertemenge <InlineMath math="W" /> der Funktion
            </p>
            <p>
              <InlineMath math={term} />
            </p>
          </>
        )
      },
      solution({ data }) {
        // Für diese Aufgabentypen: D=R immer.
        let W = ''
        if (data.termKind === 'power') {
          const even = data.tn % 2 === 0
          if (!even) {
            W = '\\mathbb{R}'
          } else {
            // even power: sign entscheidet
            W =
              data.tSign === 1 ? '[0;\\infty)' : '(-\\infty;0]'
          }
        } else if (data.termKind === 'ax2c') {
          // a x^2 + c -> Scheitel bei y=c
          if (data.ta > 0) W = `[${pp(data.tc)};\\infty)`
          else W = `(-\\infty;${pp(data.tc)}]`
        } else {
          // a(x-d)^2+e -> Scheitel bei y=e
          if (data.ta > 0) W = `[${pp(data.te)};\\infty)`
          else W = `(-\\infty;${pp(data.te)}]`
        }

        return (
          <>
            <p>
              <InlineMath math={`D=\\mathbb{R}`} />
              <br />
              <InlineMath math={`W=${W}`} />
            </p>
          </>
        )
      },
    },
  ],
}
