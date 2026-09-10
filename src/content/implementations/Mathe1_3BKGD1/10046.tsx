import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  width: number
  height: number
  object: string
}

export const exercise10046: Exercise<DATA> = {
  title: 'Anwendungsaufgabe: Flugbahn oder Bogen modellieren',
  source: '3BKGD1',
  useCalculator: true,
  duration: 14,
  points: 14,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { width: 8, height: 4, object: 'Brückenbogen' },
      { width: 10, height: 5, object: 'Torbogen' },
      { width: 12, height: 6, object: 'Wasserstrahl' },
      { width: 6, height: 3, object: 'Dekorbogen' },
    ])
  },
  originalData: { width: 8, height: 4, object: 'Brückenbogen' },
  task({ data }) {
    return (
      <>
        <p>
          Ein {data.object} wird als nach unten geöffnete Parabel modelliert.
          Der höchste Punkt liegt in der Mitte bei{' '}
          <InlineMath math={`S(0|${data.height})`} />.
        </p>
        <p>
          Am Boden ist der Bogen insgesamt <b>{data.width} m</b> breit.
          Bestimmen Sie eine passende Funktionsgleichung der Form{' '}
          <InlineMath math="f(x)=ax^2+c" />.
        </p>
      </>
    )
  },
  solution({ data }) {
    const halfWidth = data.width / 2
    const a = -data.height / halfWidth ** 2
    return (
      <>
        <p>
          Der Scheitel liegt bei <InlineMath math={`S(0|${data.height})`} />.
          Deshalb ist <InlineMath math={`c=${data.height}`} />.
        </p>
        <p>
          Die Nullstellen liegen links und rechts am Boden. Da die Breite{' '}
          {data.width} m beträgt, liegt eine Nullstelle bei{' '}
          <InlineMath math={`x=${pp(halfWidth)}`} />.
        </p>
        <p>
          Diesen Punkt setze ich ein:{' '}
          <InlineMath math={`0=a\\cdot${pp(halfWidth)}^2+${data.height}`} />
        </p>
        <p>
          <InlineMath math={`a=${pp(-data.height)}:${pp(halfWidth ** 2)}=${pp(a)}`} />
        </p>
        <p>
          Eine passende Funktion ist{' '}
          <InlineMath math={`f(x)=${pp(a)}x^2+${data.height}`} />.
        </p>
        <svg viewBox="0 0 300 190" className="my-3 max-w-sm">
          <line x1="30" y1="155" x2="270" y2="155" stroke="#374151" />
          <line x1="150" y1="25" x2="150" y2="165" stroke="#374151" />
          <path d="M55 155 C95 35 205 35 245 155" fill="none" stroke="#2563eb" strokeWidth="4" />
          <text x="134" y="42" fontSize="12">S</text>
          <text x="42" y="172" fontSize="12">-{pp(halfWidth)}</text>
          <text x="232" y="172" fontSize="12">{pp(halfWidth)}</text>
        </svg>
      </>
    )
  },
}
