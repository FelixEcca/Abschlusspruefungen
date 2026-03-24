import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Side = 'left' | 'right'

interface FractionTermA {
  num: number
  shift: number // Nenner: x + shift
}

interface FractionTermB {
  num: number
  xCoeff: number
  shift: number // Nenner: xCoeff*x + shift
}

interface DATA {
  // a)
  leftTermsA: FractionTermA[]
  rightTermsA: FractionTermA[]
  constA: number
  constASide: Side

  // b)
  leftTermsB: FractionTermB[]
  rightTermsB: FractionTermB[]
  constB: number
  constBSide: Side
}

function termLatexA(term: FractionTermA, isFirst: boolean) {
  const denom =
    term.shift === 0
      ? 'x'
      : term.shift > 0
        ? `x + ${pp(term.shift)}`
        : `x - ${pp(Math.abs(term.shift))}`

  const frac = `\\frac{${pp(term.num)}}{${denom}}`
  return isFirst ? frac : `+ ${frac}`
}

function termLatexB(term: FractionTermB, isFirst: boolean) {
  const xPart = term.xCoeff === 1 ? 'x' : `${pp(term.xCoeff)}x`
  const denom =
    term.shift === 0
      ? xPart
      : term.shift > 0
        ? `${xPart} + ${pp(term.shift)}`
        : `${xPart} - ${pp(Math.abs(term.shift))}`

  const frac = `\\frac{${pp(term.num)}}{${denom}}`
  return isFirst ? frac : `+ ${frac}`
}

function buildSideLatexA(terms: FractionTermA[], constant?: number | null) {
  const parts = terms.map((t, i) => termLatexA(t, i === 0))
  if (constant !== undefined && constant !== null)
    parts.push(`+ ${pp(constant)}`)
  return parts.join(' ')
}

function buildSideLatexB(terms: FractionTermB[], constant?: number | null) {
  const parts = terms.map((t, i) => termLatexB(t, i === 0))
  if (constant !== undefined && constant !== null)
    parts.push(`+ ${pp(constant)}`)
  return parts.join(' ')
}

function distinctShiftsA(rng: any, count: number, pool: number[]) {
  const chosen: number[] = []
  while (chosen.length < count) {
    const candidate = rng.randomItemFromArray(pool)
    if (!chosen.includes(candidate)) chosen.push(candidate)
  }
  return chosen
}

function makeDistinctForbiddenB(
  rng: any,
  count: number,
  xCoeffPool: number[],
  shiftPool: number[],
) {
  const terms: FractionTermB[] = []
  const forbidden = new Set<number>()

  while (terms.length < count) {
    const xCoeff = rng.randomItemFromArray(xCoeffPool)
    const shift = rng.randomItemFromArray(shiftPool)
    const val = -shift / xCoeff
    if (!forbidden.has(val)) {
      forbidden.add(val)
      terms.push({
        num: rng.randomIntBetween(1, 5),
        xCoeff,
        shift,
      })
    }
  }

  return terms
}

function forbiddenValuesLatexA(terms: FractionTermA[]) {
  const values = [...new Set(terms.map(t => -t.shift))].sort((a, b) => a - b)
  return values.map(v => `x = ${pp(v)}`).join('\\;\\text{ und }\\; ')
}

function forbiddenValuesLatexB(terms: FractionTermB[]) {
  const values = [...new Set(terms.map(t => -t.shift / t.xCoeff))].sort(
    (a, b) => a - b,
  )
  return values.map(v => `x = ${pp(v)}`).join('\\;\\text{ und }\\; ')
}

export const exercise4911: Exercise<DATA> = {
  title: 'Definitionsmenge',
  source: 'Gleichungen',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const shiftPoolA = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]

    // a) bleibt eher einfach
    const totalTermsA = rng.randomItemFromArray([2, 3, 4])
    const constASide: Side = rng.randomBoolean() ? 'left' : 'right'
    const fractionTotalA = totalTermsA - 1

    const leftFractionCountA = rng.randomIntBetween(1, fractionTotalA - 1)
    const rightFractionCountA = fractionTotalA - leftFractionCountA

    const shiftsA = distinctShiftsA(rng, fractionTotalA, shiftPoolA)
    const numsA = Array.from({ length: fractionTotalA }, () =>
      rng.randomIntBetween(1, 4),
    )

    const leftTermsA: FractionTermA[] = []
    const rightTermsA: FractionTermA[] = []

    for (let i = 0; i < leftFractionCountA; i++) {
      leftTermsA.push({ num: numsA[i], shift: shiftsA[i] })
    }
    for (let i = 0; i < rightFractionCountA; i++) {
      rightTermsA.push({
        num: numsA[leftFractionCountA + i],
        shift: shiftsA[leftFractionCountA + i],
      })
    }

    const constA = rng.randomIntBetween(1, 8)

    // b) etwas schwerer: Faktor vor x im Nenner
    const totalTermsB = rng.randomItemFromArray([3])
    const constBSide: Side = rng.randomBoolean() ? 'left' : 'right'
    const fractionTotalB = totalTermsB - 1

    const leftFractionCountB = rng.randomIntBetween(1, fractionTotalB - 1)
    const rightFractionCountB = fractionTotalB - leftFractionCountB

    const termsB = makeDistinctForbiddenB(
      rng,
      fractionTotalB,
      [2, 3],
      [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6],
    )

    const leftTermsB = termsB.slice(0, leftFractionCountB)
    const rightTermsB = termsB.slice(leftFractionCountB)

    const constB = rng.randomIntBetween(1, 8)

    return {
      leftTermsA,
      rightTermsA,
      constA,
      constASide,
      leftTermsB,
      rightTermsB,
      constB,
      constBSide,
    }
  },

  originalData: {
    leftTermsA: [{ num: 1, shift: 0 }],
    rightTermsA: [{ num: 3, shift: -2 }],
    constA: 5,
    constASide: 'right',

    leftTermsB: [
      { num: 2, xCoeff: 2, shift: -4 },
      { num: 1, xCoeff: 3, shift: 6 },
    ],
    rightTermsB: [{ num: 4, xCoeff: 2, shift: 2 }],
    constB: 2,
    constBSide: 'right',
  },

  constraint({ data }) {
    const shiftsA = [...data.leftTermsA, ...data.rightTermsA].map(t => t.shift)
    const valuesB = [...data.leftTermsB, ...data.rightTermsB].map(
      t => -t.shift / t.xCoeff,
    )

    const totalTermsA = data.leftTermsA.length + data.rightTermsA.length + 1
    const totalTermsB = data.leftTermsB.length + data.rightTermsB.length + 1

    return (
      data.leftTermsA.length >= 1 &&
      data.rightTermsA.length >= 1 &&
      data.leftTermsB.length >= 1 &&
      data.rightTermsB.length >= 1 &&
      new Set(shiftsA).size === shiftsA.length &&
      new Set(valuesB).size === valuesB.length &&
      totalTermsA <= 4 &&
      totalTermsB <= 4
    )
  },

  intro() {
    return (
      <>
        <p>
          Bestimmen Sie die Werte für <InlineMath math={'x'} />, für die die
          Gleichung nicht definiert ist.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        const left =
          data.constASide === 'left'
            ? buildSideLatexA(data.leftTermsA, data.constA)
            : buildSideLatexA(data.leftTermsA)

        const right =
          data.constASide === 'right'
            ? buildSideLatexA(data.rightTermsA, data.constA)
            : buildSideLatexA(data.rightTermsA)

        return (
          <>
            <InlineMath math={`${left} = ${right}`} />
          </>
        )
      },
      solution({ data }) {
        const allTerms = [...data.leftTermsA, ...data.rightTermsA]

        return (
          <>
            <p>Die Nenner dürfen nicht 0 werden.</p>
            <InlineMath
              math={`\\Rightarrow ${forbiddenValuesLatexA(allTerms)}`}
            />{' '}
            sind nicht erlaubte Werte für <InlineMath math={'x'} />.
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
        const left =
          data.constBSide === 'left'
            ? buildSideLatexB(data.leftTermsB, data.constB)
            : buildSideLatexB(data.leftTermsB)

        const right =
          data.constBSide === 'right'
            ? buildSideLatexB(data.rightTermsB, data.constB)
            : buildSideLatexB(data.rightTermsB)

        return (
          <>
            <InlineMath math={`${left} = ${right}`} />
          </>
        )
      },
      solution({ data }) {
        const allTerms = [...data.leftTermsB, ...data.rightTermsB]

        return (
          <>
            <p>Auch hier müssen alle Nenner ungleich 0 sein.</p>
            {allTerms.map((term, i) => {
              const xPart = term.xCoeff === 1 ? 'x' : `${pp(term.xCoeff)}x`
              const denom =
                term.shift === 0
                  ? xPart
                  : term.shift > 0
                    ? `${xPart} + ${pp(term.shift)}`
                    : `${xPart} - ${pp(Math.abs(term.shift))}`
              const forbidden = -term.shift / term.xCoeff

              return (
                <span key={i}>
                  <InlineMath math={`${denom} = 0`} />
                  <br />
                  <InlineMath
                    math={`${pp(term.xCoeff)}x = ${pp(-term.shift)}`}
                  />
                  <br />
                  <InlineMath math={`x = ${pp(forbidden)}`} />
                  {i < allTerms.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </span>
              )
            })}
            <br />
            <br />
            <InlineMath
              math={`\\Rightarrow ${forbiddenValuesLatexB(allTerms)}`}
            />{' '}
            sind nicht erlaubte Werte für <InlineMath math={'x'} />.
          </>
        )
      },
    },
  ],
}
