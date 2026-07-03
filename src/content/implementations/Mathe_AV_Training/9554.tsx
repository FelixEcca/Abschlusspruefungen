// exercise9554.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Op = '+' | '-'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  xCoeff: number
  constant: number
}

function sign(n: number) {
  if (n < 0) return `${n}`
  return `+${n}`
}

function termPart(coeff: number, variable: string) {
  if (coeff === 1) return variable
  if (coeff === -1) return `-${variable}`
  return `${coeff}${variable}`
}

function signedVariablePart(coeff: number, variable: string) {
  if (coeff > 0) return `+${termPart(coeff, variable)}`
  return termPart(coeff, variable)
}

export const exercise9554: Exercise<DATA> = {
  title: 'Terme addieren und subtrahieren (ohne Klammern)',
  source: 'Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const op: Op = rng.randomItemFromArray(['+', '-'])

    const a = rng.randomIntBetween(-9, 9)
    const b = rng.randomIntBetween(-20, 20)
    const rawC = rng.randomIntBetween(-9, 9)
    const rawD = rng.randomIntBetween(-20, 20)

    const c = op === '+' ? rawC : -rawC
    const d = op === '+' ? rawD : -rawD

    const xCoeff = a + c
    const constant = b + d

    return { a, b, c, d, xCoeff, constant }
  },

  originalData: {
    a: 3,
    b: 5,
    c: 2,
    d: 7,
    xCoeff: 5,
    constant: 12,
  },

  constraint({ data }) {
    return data.a !== 0 && data.c !== 0 && data.xCoeff !== 0
  },

  task({ data }) {
    return (
      <>
        <p>Schreiben Sie den Term so kurz wie möglich.</p>
        <InlineMath
          math={`${termPart(data.a, 'x')}${sign(data.b)}${signedVariablePart(
            data.c,
            'x',
          )}${sign(data.d)}`}
        />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Alle Terme mit x werden zusammengefasst und alle Zahlen:</p>
        <InlineMath
          math={`${termPart(data.a, 'x')}${sign(data.b)}${signedVariablePart(
            data.c,
            'x',
          )}${sign(data.d)}`}
        />
        <br></br>
        <InlineMath
          math={`=${termPart(data.a, 'x')}${signedVariablePart(
            data.c,
            'x',
          )}${sign(data.b)}${sign(data.d)}`}
        />

        <br />
        <InlineMath
          math={`=${termPart(data.xCoeff, 'x')}${sign(data.constant)}`}
        />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/PKBC90ZwU8A"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
