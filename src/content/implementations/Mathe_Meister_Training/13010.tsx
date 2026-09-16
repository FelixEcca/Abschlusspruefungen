import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface DATA {
  coefficient: number
  constant: number
  solution: number
  errorType: 'constantNotDivided' | 'oneSideOnly' | 'wrongSign'
}

function erroneousStep(data: DATA) {
  const right = data.coefficient * data.solution + data.constant
  if (data.errorType === 'oneSideOnly') {
    return `${data.coefficient}x ${pp(data.constant, 'merge_op')}=${right}\\quad\\Rightarrow\\quad ${data.coefficient}x=${right}`
  }
  if (data.errorType === 'wrongSign') {
    return `${data.coefficient}x ${pp(data.constant, 'merge_op')}=${right}\\quad\\Rightarrow\\quad ${data.coefficient}x=${right + data.constant}`
  }
  return `\\frac{${data.coefficient}x ${pp(data.constant, 'merge_op')}}{${data.coefficient}}=\\frac{${right}}{${data.coefficient}}\\quad\\Rightarrow\\quad x ${pp(data.constant, 'merge_op')}=\\frac{${right}}{${data.coefficient}}`
}

export const exercise13010: Exercise<DATA> = {
  title: 'Äquivalenzumformungen verstehen',
  source: 'Vorbereitungskurs Meister · Gleichungen und Formeln',
  useCalculator: false,
  duration: 8,
  generator(rng) {
    return {
      coefficient: rng.randomIntBetween(2, 9),
      constant: rng.randomIntBetween(2, 15) * (rng.randomBoolean() ? 1 : -1),
      solution: rng.randomIntBetween(-8, 12),
      errorType: rng.randomItemFromArray<DATA['errorType']>([
        'constantNotDivided',
        'oneSideOnly',
        'wrongSign',
      ]),
    }
  },
  originalData: {
    coefficient: 4,
    constant: -7,
    solution: 6,
    errorType: 'constantNotDivided',
  },
  constraint({ data }) {
    const right = data.coefficient * data.solution + data.constant
    return data.solution !== 0 && right !== 0
  },
  intro() {
    return (
      <p>
        Eine Äquivalenzumformung verändert die Lösungsmenge einer Gleichung
        nicht. Deshalb muss auf beiden Seiten dieselbe zulässige Operation
        ausgeführt werden.
      </p>
    )
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        const right = data.coefficient * data.solution + data.constant
        return (
          <>
            <BlockMath
              math={`${data.coefficient}x ${pp(data.constant, 'merge_op')}=${right}`}
            />
            <p>
              Welche Operation ist als erster Schritt zweckmäßig? Begründen Sie
              kurz, warum die Operation auf beiden Seiten ausgeführt werden
              muss.
            </p>
          </>
        )
      },
      solution({ data }) {
        const operation = -data.constant
        return (
          <p>
            Zweckmäßig ist <InlineMath math={pp(operation, 'merge_op')} /> auf
            beiden Seiten. Nur dann bleibt die Gleichheit erhalten und die
            Umformung ist äquivalent.
          </p>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        const right = data.coefficient * data.solution + data.constant
        return (
          <>
            <p>Lösen Sie die Gleichung vollständig.</p>
            <BlockMath
              math={`${data.coefficient}x ${pp(data.constant, 'merge_op')}=${right}`}
            />
          </>
        )
      },
      solution({ data }) {
        const right = data.coefficient * data.solution + data.constant
        return (
          <BlockMath
            math={`\\begin{aligned}
              ${data.coefficient}x ${pp(data.constant, 'merge_op')}&=${right}\\\\
              ${data.coefficient}x&=${right - data.constant}\\\\
              x&=${data.solution}
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
            <p>Finden und erklären Sie den Fehler in dieser Umformung.</p>
            <BlockMath math={erroneousStep(data)} />
          </>
        )
      },
      solution({ data }) {
        const right = data.coefficient * data.solution + data.constant
        if (data.errorType === 'oneSideOnly') {
          return (
            <>
              <p>Der konstante Summand wurde nur links entfernt. Auf beiden Seiten muss dieselbe Zahl subtrahiert werden.</p>
              <BlockMath math={`${data.coefficient}x=${right} ${pp(-data.constant, 'merge_op')}=${right - data.constant}`} />
            </>
          )
        }
        if (data.errorType === 'wrongSign') {
          return (
            <>
              <p>Beim Beseitigen des konstanten Summanden wurde das Vorzeichen vertauscht.</p>
              <BlockMath math={`${data.coefficient}x=${right} ${pp(-data.constant, 'merge_op')}=${right - data.constant}`} />
            </>
          )
        }
        return (
          <>
            <p>
              Durch <InlineMath math={`${data.coefficient}`} /> wird die gesamte
              linke Seite geteilt, also jeder Summand. Der konstante Summand
              wurde im falschen Lösungsweg nicht geteilt.
            </p>
            <BlockMath
              math={`\\frac{${data.coefficient}x ${pp(data.constant, 'merge_op')}}{${data.coefficient}}=x ${pp(data.constant / data.coefficient, 'merge_op')}`}
            />
            <p>
              Übersichtlicher ist es, zuerst{' '}
              <InlineMath math={pp(-data.constant, 'merge_op')} /> zu rechnen
              und danach durch <InlineMath math={`${data.coefficient}`} /> zu
              teilen. So erhält man <InlineMath math={`x=${data.solution}`} />.
            </p>
          </>
        )
      },
    },
  ],
}
