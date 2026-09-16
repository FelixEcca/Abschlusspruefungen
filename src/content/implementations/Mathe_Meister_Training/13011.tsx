import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface DATA {
  bracketFactor: number
  bracketShift: number
  bracketSolution: number
  fractionDivisor: number
  fractionShift: number
  fractionQuotient: number
  mixedFactor: number
  mixedDivisor: number
  mixedShift: number
  mixedQuotient: number
}

function fractionSolution(data: DATA) {
  return data.fractionDivisor * data.fractionQuotient - data.fractionShift
}

function mixedSolution(data: DATA) {
  return data.mixedDivisor * data.mixedQuotient - data.mixedShift
}

export const exercise13011: Exercise<DATA> = {
  title: 'Gleichungen mit Klammern und Brüchen',
  source: 'Vorbereitungskurs Meister · Gleichungen und Formeln',
  useCalculator: false,
  duration: 12,
  generator(rng) {
    return {
      bracketFactor: rng.randomIntBetween(2, 7),
      bracketShift: rng.randomIntBetween(2, 8) * (rng.randomBoolean() ? 1 : -1),
      bracketSolution: rng.randomIntBetween(2, 12),
      fractionDivisor: rng.randomIntBetween(2, 7),
      fractionShift: rng.randomIntBetween(2, 9) * (rng.randomBoolean() ? 1 : -1),
      fractionQuotient: rng.randomIntBetween(2, 9),
      mixedFactor: rng.randomIntBetween(2, 5),
      mixedDivisor: rng.randomIntBetween(2, 6),
      mixedShift: rng.randomIntBetween(2, 8) * (rng.randomBoolean() ? 1 : -1),
      mixedQuotient: rng.randomIntBetween(2, 7),
    }
  },
  originalData: {
    bracketFactor: 4,
    bracketShift: -3,
    bracketSolution: 8,
    fractionDivisor: 3,
    fractionShift: 2,
    fractionQuotient: 5,
    mixedFactor: 2,
    mixedDivisor: 4,
    mixedShift: -1,
    mixedQuotient: 4,
  },
  constraint({ data }) {
    return (
      data.bracketSolution !== fractionSolution(data) &&
      fractionSolution(data) !== mixedSolution(data) &&
      data.bracketSolution !== mixedSolution(data)
    )
  },
  intro() {
    return <p>Lösen Sie jede Gleichung mit Äquivalenzumformungen.</p>
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>Eine Gleichung mit Klammern:</p>
            <BlockMath
              math={`${data.bracketFactor}(x ${pp(data.bracketShift, 'merge_op')})=${data.bracketFactor * (data.bracketSolution + data.bracketShift)}`}
            />
          </>
        )
      },
      solution({ data }) {
        return (
          <BlockMath
            math={`\\begin{aligned}
              ${data.bracketFactor}(x ${pp(data.bracketShift, 'merge_op')})&=${data.bracketFactor * (data.bracketSolution + data.bracketShift)}\\\\
              x ${pp(data.bracketShift, 'merge_op')}&=${data.bracketSolution + data.bracketShift}\\\\
              x&=${data.bracketSolution}
            \\end{aligned}`}
          />
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>Eine Gleichung mit einem Bruch:</p>
            <BlockMath
              math={`\\frac{x ${pp(data.fractionShift, 'merge_op')}}{${data.fractionDivisor}}=${data.fractionQuotient}`}
            />
          </>
        )
      },
      solution({ data }) {
        return (
          <BlockMath
            math={`\\begin{aligned}
              \\frac{x ${pp(data.fractionShift, 'merge_op')}}{${data.fractionDivisor}}&=${data.fractionQuotient}\\\\
              x ${pp(data.fractionShift, 'merge_op')}&=${data.fractionDivisor * data.fractionQuotient}\\\\
              x&=${fractionSolution(data)}
            \\end{aligned}`}
          />
        )
      },
    },
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>Hier kommen Klammer und Bruch zusammen. Lösen Sie und prüfen Sie durch Einsetzen.</p>
            <BlockMath
              math={`\\frac{${data.mixedFactor}(x ${pp(data.mixedShift, 'merge_op')})}{${data.mixedDivisor}}=${data.mixedFactor * data.mixedQuotient}`}
            />
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <BlockMath
              math={`\\begin{aligned}
                \\frac{${data.mixedFactor}(x ${pp(data.mixedShift, 'merge_op')})}{${data.mixedDivisor}}&=${data.mixedFactor * data.mixedQuotient}\\\\
                ${data.mixedFactor}(x ${pp(data.mixedShift, 'merge_op')})&=${data.mixedFactor * data.mixedDivisor * data.mixedQuotient}\\\\
                x ${pp(data.mixedShift, 'merge_op')}&=${data.mixedDivisor * data.mixedQuotient}\\\\
                x&=${mixedSolution(data)}
              \\end{aligned}`}
            />
            <p>Probe: Einsetzen liefert auf beiden Seiten denselben Wert.</p>
            <BlockMath
              math={`\\frac{${data.mixedFactor}(${mixedSolution(data)} ${pp(data.mixedShift, 'merge_op')})}{${data.mixedDivisor}}=${data.mixedFactor * data.mixedQuotient}`}
            />
          </>
        )
      },
    },
  ],
}
