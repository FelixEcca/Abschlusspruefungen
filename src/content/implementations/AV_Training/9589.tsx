// exercise9589.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  n1: number
  d1: number
  n2: number
  d2: number
  left: number
  right: number
  sign: '<' | '>' | '='
}

export const exercise9589: Exercise<DATA> = {
  title: 'Brüche vergleichen',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const d1 = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12])
    const d2 = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12])
    const n1 = rng.randomIntBetween(1, d1 - 1)
    const n2 = rng.randomIntBetween(1, d2 - 1)
    const left = n1 * d2
    const right = n2 * d1
    const sign = left < right ? '<' : left > right ? '>' : '='
    return { n1, d1, n2, d2, left, right, sign }
  },

  originalData: {
    n1: 3,
    d1: 4,
    n2: 2,
    d2: 3,
    left: 9,
    right: 8,
    sign: '>',
  },

  constraint({ data }) {
    return data.sign !== '='
  },

  task({ data }) {
    return (
      <>
        <p>Vergleichen Sie die Brüche. Setzen Sie &lt;, &gt; oder = ein.</p>
        <InlineMath
          math={`\\frac{${data.n1}}{${data.d1}}\\;\\square\\;\\frac{${data.n2}}{${data.d2}}`}
        />
      </>
    )
  },

  solution({ data }) {
    const common = (data.d1 * data.d2) / gcd(data.d1, data.d2)
    const e1 = common / data.d1
    const e2 = common / data.d2
    const n1Expanded = data.n1 * e1
    const n2Expanded = data.n2 * e2

    return (
      <>
        <p>Die Brüche werden auf den gleichen Nenner erweitert.</p>
        <InlineMath math={`\\text{gemeinsamer Nenner: }${common}`} />
        <br />
        <InlineMath
          math={`\\frac{${data.n1}}{${data.d1}}=\\frac{${data.n1}\\cdot ${e1}}{${data.d1}\\cdot ${e1}}=\\frac{${n1Expanded}}{${common}}`}
        />
        <br />
        <InlineMath
          math={`\\frac{${data.n2}}{${data.d2}}=\\frac{${data.n2}\\cdot ${e2}}{${data.d2}\\cdot ${e2}}=\\frac{${n2Expanded}}{${common}}`}
        />
        <p>Jetzt werden die Zähler verglichen.</p>
        <InlineMath
          math={`\\frac{${data.n1}}{${data.d1}}\\;${data.sign}\\;\\frac{${data.n2}}{${data.d2}}`}
        />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/5o9bf4G8SkI"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}

function gcd(a: number, b: number) {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y !== 0) {
    const t = y
    y = x % y
    x = t
  }
  return x
}
