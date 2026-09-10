import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Kind = 'positiveOdd' | 'negativeOdd' | 'positiveEven' | 'negativeEven'

interface DATA {
  kind: Kind
}

function formula(kind: Kind) {
  if (kind === 'positiveOdd') return 'f(x)=x^3-4x'
  if (kind === 'negativeOdd') return 'f(x)=-x^3+4x'
  if (kind === 'positiveEven') return 'f(x)=x^4-5x^2+4'
  return 'f(x)=-x^4+5x^2-4'
}

function description(kind: Kind) {
  if (kind === 'positiveOdd') return 'ungerader Grad, positiver Leitkoeffizient'
  if (kind === 'negativeOdd') return 'ungerader Grad, negativer Leitkoeffizient'
  if (kind === 'positiveEven') return 'gerader Grad, positiver Leitkoeffizient'
  return 'gerader Grad, negativer Leitkoeffizient'
}

function path(kind: Kind) {
  if (kind === 'positiveOdd') return '35,165 C75,175 100,70 145,115 C190,160 215,55 265,65'
  if (kind === 'negativeOdd') return '35,65 C75,55 100,160 145,115 C190,70 215,175 265,165'
  if (kind === 'positiveEven') return '35,35 C75,165 105,170 145,80 C185,170 215,165 265,35'
  return '35,185 C75,55 105,50 145,140 C185,50 215,55 265,185'
}

export const exercise10063: Exercise<DATA> = {
  title: 'Polynomfunktion über das Globalverhalten skizzieren',
  source: '3BKGD1',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    return {
      kind: rng.randomItemFromArray<Kind>([
        'positiveOdd',
        'negativeOdd',
        'positiveEven',
        'negativeEven',
      ]),
    }
  },
  originalData: { kind: 'positiveOdd' },
  task({ data }) {
    return (
      <>
        <p>
          Skizzieren Sie den groben Verlauf der Polynomfunktion{' '}
          <InlineMath math={formula(data.kind)} />.
        </p>
        <p>
          Entscheiden Sie zuerst mit Grad und Leitkoeffizient, wie sich der
          Graph für sehr große positive und negative x-Werte verhält.
        </p>
      </>
    )
  },
  solution({ data }) {
    const odd = data.kind === 'positiveOdd' || data.kind === 'negativeOdd'
    const positive = data.kind === 'positiveOdd' || data.kind === 'positiveEven'
    return (
      <>
        <p>
          Der führende Term entscheidet das Globalverhalten. Hier gilt:{' '}
          <b>{description(data.kind)}</b>.
        </p>
        {odd && positive && (
          <p>
            Links fällt der Graph nach unten, rechts steigt er nach oben.
          </p>
        )}
        {odd && !positive && (
          <p>
            Links steigt der Graph nach oben, rechts fällt er nach unten.
          </p>
        )}
        {!odd && positive && (
          <p>
            Beide Enden des Graphen zeigen nach oben.
          </p>
        )}
        {!odd && !positive && (
          <p>
            Beide Enden des Graphen zeigen nach unten.
          </p>
        )}
        <svg viewBox="0 0 300 220" className="my-3 max-w-md">
          <line x1="20" y1="110" x2="280" y2="110" stroke="#374151" />
          <line x1="150" y1="20" x2="150" y2="200" stroke="#374151" />
          <path d={path(data.kind)} fill="none" stroke="#2563eb" strokeWidth="4" />
          <text x="260" y="104" fontSize="12">x</text>
          <text x="156" y="30" fontSize="12">y</text>
        </svg>
        <p>
          Danach kann die Skizze mit weiteren Punkten oder Nullstellen
          verbessert werden. Für das Globalverhalten sind aber Grad und
          Leitkoeffizient der entscheidende erste Schritt.
        </p>
      </>
    )
  },
}
