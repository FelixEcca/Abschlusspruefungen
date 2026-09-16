import { Exercise } from '@/data/types'
import { BlockMath, InlineMath } from 'react-katex'

type Mode = 'bracketPower' | 'powerProduct' | 'bracketDivision' | 'nested'

interface TermData {
  mode: Mode
  a: number
  b: number
  c: number
  d: number
}

interface DATA {
  partA: TermData
  partB: TermData
  partC: TermData
}

function expression(data: TermData) {
  const { mode, a, b, c, d } = data
  if (mode === 'bracketPower') return `(${a}+${b})^2-${c}\\cdot ${d}`
  if (mode === 'powerProduct') return `${a}+${b}^2\\cdot ${c}-${d}`
  if (mode === 'bracketDivision') return `\\frac{${a}\\cdot ${b}+${c}}{${d}}`
  return `${a}\\cdot(${b}+${c})-${d}^2`
}

function correctFirstStep(data: TermData) {
  const { mode, a, b, c, d } = data
  if (mode === 'bracketPower') return `${a + b}^2-${c}\\cdot ${d}`
  if (mode === 'powerProduct') return `${a}+${b * b}\\cdot ${c}-${d}`
  if (mode === 'bracketDivision') return `\\frac{${a * b}+${c}}{${d}}`
  return `${a}\\cdot ${b + c}-${d}^2`
}

function wrongFirstStep(data: TermData) {
  const { mode, a, b, c, d } = data
  if (mode === 'bracketPower') return `${a}+${b * b}-${c}\\cdot ${d}`
  if (mode === 'powerProduct') return `${a + b}^2\\cdot ${c}-${d}`
  if (mode === 'bracketDivision') return `\\frac{${a}\\cdot ${b + c}}{${d}}`
  return `${a * b}+${c}-${d * d}`
}

function result(data: TermData) {
  const { mode, a, b, c, d } = data
  if (mode === 'bracketPower') return (a + b) ** 2 - c * d
  if (mode === 'powerProduct') return a + b ** 2 * c - d
  if (mode === 'bracketDivision') return (a * b + c) / d
  return a * (b + c) - d ** 2
}

function firstRule(mode: Mode) {
  if (mode === 'bracketPower' || mode === 'nested') return 'Klammer'
  if (mode === 'powerProduct') return 'Hochzahl'
  return 'Zähler des Bruchs'
}

function generateTerm(
  rng: Parameters<Exercise<DATA>['generator']>[0],
  mode: Mode,
): TermData {
  const a = rng.randomIntBetween(2, 7)
  const b = rng.randomIntBetween(2, 6)
  const d = rng.randomIntBetween(2, 5)
  const c =
    mode === 'bracketDivision'
      ? d * rng.randomIntBetween(3, 8) - a * b
      : rng.randomIntBetween(2, 8)
  return { mode, a, b, c, d }
}

export const exercise13001: Exercise<DATA> = {
  title: 'KLAHOPS sicher anwenden',
  source: 'Vorbereitungskurs Meister · Rechengrundlagen',
  useCalculator: false,
  duration: 9,
  generator(rng) {
    const modes = rng.shuffleArray<Mode>([
      'bracketPower',
      'powerProduct',
      'bracketDivision',
      'nested',
    ])
    return {
      partA: generateTerm(rng, modes[0]),
      partB: generateTerm(rng, modes[1]),
      partC: generateTerm(rng, modes[2]),
    }
  },
  originalData: {
    partA: { mode: 'bracketPower', a: 4, b: 3, c: 5, d: 2 },
    partB: { mode: 'nested', a: 3, b: 4, c: 2, d: 2 },
    partC: { mode: 'powerProduct', a: 5, b: 3, c: 2, d: 4 },
  },
  constraint({ data }) {
    const parts = [data.partA, data.partB, data.partC]
    return (
      new Set(parts.map((part) => part.mode)).size === 3 &&
      parts.every((part) => part.c > 0 && Number.isInteger(result(part)))
    )
  },
  intro() {
    return (
      <p>
        KLAHOPS bedeutet: Klammern, Hochzahlen, Punktrechnung und zuletzt
        Strichrechnung.
      </p>
    )
  },
  tasks: [
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>Welcher Teil muss zuerst berechnet werden?</p>
            <BlockMath math={expression(data.partA)} />
          </>
        )
      },
      solution({ data }) {
        return <p>Zuerst wird der Bereich „{firstRule(data.partA.mode)}“ berechnet.</p>
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie den folgenden Term schrittweise.</p>
            <BlockMath math={expression(data.partB)} />
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Der erste korrekte Schritt lautet:</p>
            <BlockMath
              math={`${expression(data.partB)}=${correctFirstStep(data.partB)}`}
            />
            <BlockMath math={`\\phantom{Ergebnis}=${result(data.partB)}`} />
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>Finden und erklären Sie den Fehler in diesem dritten Term.</p>
            <BlockMath
              math={`${expression(data.partC)}\\stackrel{?}{=}${wrongFirstStep(data.partC)}`}
            />
            <p>Geben Sie den richtigen ersten Schritt an.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Rechenreihenfolge wurde verletzt. Zuerst muss der Bereich
              „{firstRule(data.partC.mode)}“ korrekt berechnet werden.
            </p>
            <InlineMath math={correctFirstStep(data.partC)} /> ist der richtige
            erste Schritt.
          </>
        )
      },
    },
  ],
}
