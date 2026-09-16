import { Exercise } from '@/data/types'
import { BlockMath, InlineMath } from 'react-katex'

type Structure =
  | 'productOfSum'
  | 'quotientOfDifference'
  | 'sumOfProduct'
  | 'differenceOfQuotient'

interface TermData {
  structure: Structure
  a: number
  b: number
  c: number
}

interface DATA {
  partA: TermData
  partB: TermData
}

function term(data: TermData) {
  const { structure, a, b, c } = data
  if (structure === 'productOfSum') return `(${a}+${b})\\cdot ${c}`
  if (structure === 'quotientOfDifference') {
    return `\\frac{${a}-${b}}{${c}}`
  }
  if (structure === 'sumOfProduct') return `${a}+${b}\\cdot ${c}`
  return `${a}-\\frac{${b}}{${c}}`
}

function wording(data: TermData) {
  const { structure, a, b, c } = data
  if (structure === 'productOfSum') {
    return `das Produkt aus der Summe von ${a} und ${b} und der Zahl ${c}`
  }
  if (structure === 'quotientOfDifference') {
    return `den Quotienten aus der Differenz von ${a} und ${b} und der Zahl ${c}`
  }
  if (structure === 'sumOfProduct') {
    return `die Summe aus ${a} und dem Produkt aus ${b} und ${c}`
  }
  return `die Differenz aus ${a} und dem Quotienten aus ${b} und ${c}`
}

function operations(structure: Structure) {
  if (structure === 'productOfSum') {
    return 'Addition (Summe) und Multiplikation (Produkt)'
  }
  if (structure === 'quotientOfDifference') {
    return 'Subtraktion (Differenz) und Division (Quotient)'
  }
  if (structure === 'sumOfProduct') {
    return 'Multiplikation (Produkt) und Addition (Summe)'
  }
  return 'Division (Quotient) und Subtraktion (Differenz)'
}

function value(data: TermData) {
  const { structure, a, b, c } = data
  if (structure === 'productOfSum') return (a + b) * c
  if (structure === 'quotientOfDifference') return (a - b) / c
  if (structure === 'sumOfProduct') return a + b * c
  return a - b / c
}

function generateTerm(
  rng: Parameters<Exercise<DATA>['generator']>[0],
  structure: Structure,
): TermData {
  const c = rng.randomIntBetween(2, 6)
  const b =
    structure === 'differenceOfQuotient'
      ? c * rng.randomIntBetween(2, 7)
      : rng.randomIntBetween(2, 12)
  const a =
    structure === 'quotientOfDifference'
      ? b + c * rng.randomIntBetween(2, 7)
      : rng.randomIntBetween(3, 15)
  return { structure, a, b, c }
}

export const exercise13000: Exercise<DATA> = {
  title: 'Rechenbegriffe und Fachsprache',
  source: 'Vorbereitungskurs Meister · Rechengrundlagen',
  useCalculator: false,
  duration: 7,
  generator(rng) {
    const structures = rng.shuffleArray<Structure>([
      'productOfSum',
      'quotientOfDifference',
      'sumOfProduct',
      'differenceOfQuotient',
    ])
    return {
      partA: generateTerm(rng, structures[0]),
      partB: generateTerm(rng, structures[1]),
    }
  },
  originalData: {
    partA: { structure: 'productOfSum', a: 8, b: 4, c: 3 },
    partB: { structure: 'differenceOfQuotient', a: 14, b: 12, c: 3 },
  },
  constraint({ data }) {
    return (
      data.partA.structure !== data.partB.structure &&
      Number.isInteger(value(data.partA)) &&
      Number.isInteger(value(data.partB))
    )
  },
  intro() {
    return (
      <p>
        Mathematische Fachbegriffe beschreiben eindeutig, welche Rechenarten in
        einem Term vorkommen.
      </p>
    )
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              Nennen Sie alle Rechenarten, die im Term vorkommen. Geben Sie
              jeweils auch den mathematischen Fachbegriff an.
            </p>
            <BlockMath math={term(data.partA)} />
          </>
        )
      },
      solution({ data }) {
        return (
          <p>
            Im Term kommen <b>{operations(data.partA.structure)}</b> vor.
            Klammern und Bruchstriche zeigen, welche Teile zusammengehören.
          </p>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        return (
          <p>
            Schreiben Sie {wording(data.partB)} als mathematischen Term und
            berechnen Sie anschließend den Termwert.
          </p>
        )
      },
      solution({ data }) {
        return (
          <p>
            Der passende Term lautet <InlineMath math={term(data.partB)} />. Sein
            Wert ist <InlineMath math={`${value(data.partB)}`} />.
          </p>
        )
      },
    },
  ],
}
