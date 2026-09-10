import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  width: number
  height: number
  context: string
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

export const exercise10003: Exercise<DATA> = {
  title: 'Seitenverhältnis aus Breite und Höhe angeben',
  source: '3BKGD1',
  useCalculator: false,
  duration: 8,
  points: 8,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { width: 1920, height: 1080, context: 'Monitor' },
      { width: 1200, height: 900, context: 'Tabletbild' },
      { width: 210, height: 297, context: 'hochkantiges Layout' },
      { width: 2560, height: 1440, context: 'Präsentationsfolie' },
      { width: 1080, height: 1350, context: 'Social-Media-Post' },
    ])
  },
  originalData: { width: 1920, height: 1080, context: 'Monitor' },
  task({ data }) {
    return (
      <>
        <p>
          Ein {data.context} ist <b>{data.width}</b> Einheiten breit und{' '}
          <b>{data.height}</b> Einheiten hoch.
        </p>
        <p>Geben Sie das Seitenverhältnis Breite : Höhe möglichst gekürzt an.</p>
        <svg viewBox="0 0 320 190" className="my-3 max-w-sm">
          <rect x="40" y="35" width="230" height="130" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="3" />
          <text x="132" y="25" fontSize="14">Breite {data.width}</text>
          <text x="276" y="103" fontSize="14" transform="rotate(90 276 103)">Höhe {data.height}</text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    const divisor = gcd(data.width, data.height)
    const w = data.width / divisor
    const h = data.height / divisor
    return (
      <>
        <p>Das Seitenverhältnis ist zunächst Breite : Höhe.</p>
        <p>
          <InlineMath math={`${data.width}:${data.height}`} />
        </p>
        <p>
          Beide Zahlen werden durch den größten gemeinsamen Teiler gekürzt:{' '}
          <InlineMath math={`${divisor}`} />.
        </p>
        <p>
          <InlineMath math={`${data.width}:${data.height}=${w}:${h}`} />
        </p>
        <p>
          Das gekürzte Seitenverhältnis lautet <b>{w}:{h}</b>.
        </p>
      </>
    )
  },
}
