import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  base: 'x2' | 'ax2' | 'vertex'
  a: number
  h: number
  k: number
  // Transformationen
  s: number // Streckfaktor (>0)

  sh: number // Verschiebung in x
  sk: number // Verschiebung in y
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise4004: Exercise<DATA> = {
  title: 'Streckung / Spiegelung / Verschiebung',
  source: '2BFS',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const base = rng.randomItemFromArray([
      'x2',
      'ax2',
      'vertex',
    ]) as DATA['base']
    const a = base === 'ax2' ? rng.randomItemFromArray([2, 3]) : 1
    const h = base === 'vertex' ? rng.randomIntBetween(-5, 5) : 0
    const k = base === 'vertex' ? rng.randomIntBetween(-5, 5) : 0

    const s = rng.randomItemFromArray([0.5, 2]) // Stauchung oder Streckung

    const sh = rng.randomIntBetween(-4, 4)
    const sk = rng.randomIntBetween(-4, 4)

    return { base, a, h, k, s, sh, sk }
  },

  originalData: {
    base: 'x2',
    a: 1,
    h: 0,
    k: 0,
    s: 2,

    sh: 1,
    sk: -1,
  },

  constraint({ data }) {
    return data.h != 0 && data.k != 0 && data.sh != 0 && data.sk != 0
  },

  task({ data }) {
    const { base, a, h, k, s, sh, sk } = data

    const baseText =
      base === 'x2' ? (
        <InlineMath math="y=x^{2}" />
      ) : base === 'ax2' ? (
        <InlineMath math={`y=${pp(a)}x^{2}`} />
      ) : (
        <InlineMath
          math={`y=(x${pp(-h, 'merge_op')})^{2} ${pp(k, 'merge_op')}`}
        />
      )

    return (
      <>
        <p>
          Gegeben ist {baseText}. <br></br>Das Schaubild der Parabel wird
          gestreckt mit Faktor <InlineMath math={`${pp(s)}`} />, danach um{' '}
          <InlineMath math={`${pp(Math.abs(sh))}`} />{' '}
          {sh > 0 ? 'nach rechts' : 'nach links'} und um{' '}
          <InlineMath math={`${pp(Math.abs(sk))}`} /> nach{' '}
          {sk > 0 ? 'oben' : 'unten'} verschoben.
        </p>
        <p>Gib die Funktionsgleichung der neuen Parabel an.</p>
      </>
    )
  },

  solution({ data }) {
    const { base, a, h, k, s, sh, sk } = data

    // Ausgangsgleichung als (allgemeine) Scheitelform herstellen
    let a0 = base === 'ax2' ? a : 1
    let h0 = base === 'vertex' ? h : 0
    let k0 = base === 'vertex' ? k : 0

    // Spiegelung (nur bei x² laut Vorgabe)

    // Streckung (am a)
    const a1 = a0 * s
    // Verschiebung: (x - h0)² -> (x - (h0 + sh))²; k0 -> k0 + sk
    let h1 = h0 + sh
    let k1 = k0 + sk

    const formula = `y = ${a1 === 1 ? '' : a1 === -1 ? '-' : pp(a1)}\\,${h1 !== 0 ? '(' : ''}x${h1 !== 0 ? pp(-h1, 'merge_op') : ''}${h1 !== 0 ? ')' : ''}^{2} ${pp(k1, 'merge_op')}`

    // kleine Demo-Grafik (f & g) – nur zur Veranschaulichung
    const denseXs: number[] = []
    for (let x = -8; x <= 8; x += 0.1) denseXs.push(+x.toFixed(1))
    const yF = (x: number) => {
      if (base === 'x2') return x * x
      if (base === 'ax2') return a * x * x
      return (x - h) * (x - h) + k
    }
    const yG = (x: number) => a1 * (x - h1) * (x - h1) + k1

    const pathF = denseXs.map(x => `${toX(x)},${toY(yF(x))}`).join(' ')
    const pathG = denseXs.map(x => `${toX(x)},${toY(yG(x))}`).join(' ')

    return (
      <>
        <p>
          Ergebnis: <InlineMath math={`\\boxed{\\;${formula}\\;}`} />
        </p>
        <div className="mt-2">
          <svg viewBox="0 0 328 328" className="w-full max-w-xs">
            <image
              href="/content/BW_2BFS/ksgroßmitachsen.png"
              height="328"
              width="328"
            />
            <polyline
              points={pathF}
              fill="none"
              stroke="#64748b"
              strokeWidth={2}
            />
            <polyline
              points={pathG}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth={2}
            />
          </svg>
        </div>
      </>
    )
  },
}
