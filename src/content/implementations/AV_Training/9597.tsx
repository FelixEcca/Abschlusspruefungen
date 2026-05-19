// exercise9597.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  wholeA: number
  denominatorA: number
  partA: number
  numeratorA: number
  wholeB: number
  numeratorB: number
  partB: number
  denominatorB: number
  numeratorC: number
  denominatorC: number
  partC: number
  wholeC: number
}

export const exercise9597: Exercise<DATA> = {
  title: 'Zähler Nenner Ganzes bestimmen',
  source: 'Bruchrechnen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const denominatorA = rng.randomItemFromArray([4, 5, 6, 8, 10])
    const numeratorA = rng.randomIntBetween(1, denominatorA - 1)
    const baseA = rng.randomIntBetween(2, 10)
    const wholeA = denominatorA * baseA
    const partA = numeratorA * baseA

    const numeratorB = rng.randomItemFromArray([1, 2, 3, 4])
    const denominatorB = rng.randomItemFromArray([4, 5, 6, 8, 10])
    const baseB = rng.randomIntBetween(2, 10)
    const wholeB = denominatorB * baseB
    const partB = numeratorB * baseB

    const denominatorC = rng.randomItemFromArray([3, 4, 5, 6, 8])
    const numeratorC = rng.randomIntBetween(1, denominatorC - 1)
    const baseC = rng.randomIntBetween(2, 10)
    const wholeC = denominatorC * baseC
    const partC = numeratorC * baseC

    return {
      wholeA,
      denominatorA,
      partA,
      numeratorA,
      wholeB,
      numeratorB,
      partB,
      denominatorB,
      numeratorC,
      denominatorC,
      partC,
      wholeC,
    }
  },

  originalData: {
    wholeA: 40,
    denominatorA: 8,
    partA: 15,
    numeratorA: 3,
    wholeB: 30,
    numeratorB: 2,
    partB: 12,
    denominatorB: 5,
    numeratorC: 3,
    denominatorC: 4,
    partC: 18,
    wholeC: 24,
  },

  constraint({ data }) {
    return data.partA > 0 && data.partB > 0 && data.partC > 0
  },

  task({ data }) {
    return (
      <>
        <p>Bestimmen Sie die gesuchte Zahl.</p>

        <p>
          a) Gesucht ist der Zähler:{' '}
          <InlineMath
            math={`\\frac{\\square}{${data.denominatorA}}\\;\\text{von}\\;${data.wholeA}=${data.partA}`}
          />
        </p>

        <p>
          b) Gesucht ist der Nenner:{' '}
          <InlineMath
            math={`\\frac{${data.numeratorB}}{\\square}\\;\\text{von}\\;${data.wholeB}=${data.partB}`}
          />
        </p>

        <p>
          c) Gesucht ist das Ganze:{' '}
          <InlineMath
            math={`\\frac{${data.numeratorC}}{${data.denominatorC}}\\;\\text{von}\\;\\square=${data.partC}`}
          />
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>a) Gesucht ist der Zähler.</p>
        <InlineMath
          math={`${data.wholeA}:${data.denominatorA}=${
            data.wholeA / data.denominatorA
          }`}
        />
        <br />
        <InlineMath
          math={`${data.partA}:${
            data.wholeA / data.denominatorA
          }=${data.numeratorA}`}
        />

        <p>
          Also:{' '}
          <InlineMath
            math={`\\frac{${data.numeratorA}}{${data.denominatorA}}\\;\\text{von}\\;${data.wholeA}=${data.partA}`}
          />
        </p>

        <p>b) Gesucht ist der Nenner.</p>
        <InlineMath math={`${data.partB}:${data.numeratorB}=${data.partB / data.numeratorB}`} />
        <br />
        <InlineMath
          math={`${data.wholeB}:${data.partB / data.numeratorB}=${data.denominatorB}`}
        />

        <p>
          Also:{' '}
          <InlineMath
            math={`\\frac{${data.numeratorB}}{${data.denominatorB}}\\;\\text{von}\\;${data.wholeB}=${data.partB}`}
          />
        </p>

        <p>c) Gesucht ist das Ganze.</p>
        <InlineMath
          math={`${data.partC}:${data.numeratorC}=${data.partC / data.numeratorC}`}
        />
        <br />
        <InlineMath
          math={`${data.partC / data.numeratorC}\\cdot ${
            data.denominatorC
          }=${data.wholeC}`}
        />

        <p>
          Also:{' '}
          <InlineMath
            math={`\\frac{${data.numeratorC}}{${data.denominatorC}}\\;\\text{von}\\;${data.wholeC}=${data.partC}`}
          />
        </p>
      </>
    )
  },
}