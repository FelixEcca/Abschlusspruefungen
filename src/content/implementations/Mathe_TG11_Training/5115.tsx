import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface RootData {
  x: number
  m: number
}

interface DATA {
  rootsA: RootData[]
  rootsB: RootData[]
}

function factorLatex(root: number, multiplicity: number) {
  let base = 'x'
  if (root > 0) {
    base = `(x - ${pp(root)})`
  } else if (root < 0) {
    base = `(x + ${pp(Math.abs(root))})`
  }

  return multiplicity === 1 ? base : `${base}^{${multiplicity}}`
}

function productLatex(roots: RootData[]) {
  return roots.map(r => factorLatex(r.x, r.m)).join(' ')
}

function polyValue(x: number, roots: RootData[]) {
  return roots.reduce((acc, r) => acc * Math.pow(x - r.x, r.m), 1)
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}

function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function GraphSvg(props: { roots: RootData[] }) {
  const { roots } = props

  let d = ''
  const xMin = -5
  const xMax = 5

  for (let i = 0; i <= 500; i++) {
    const x = xMin + (i / 500) * (xMax - xMin)
    const y = polyValue(x, roots)
    d += `${i === 0 ? 'M' : 'L'} ${toX(x)} ${toY(y)} `
  }

  return (
    <svg viewBox="0 0 328 328">
      <image
        href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
        height="328"
        width="328"
      />
      <path d={d} fill="none" stroke="black" strokeWidth="2.5" />
    </svg>
  )
}

export const exercise5115: Exercise<DATA> = {
  title: 'Polynomfunktion in Linearfaktordarstellung',
  source: 'Nullstellen / Polynome',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    // Teil a
    const rootsPoolA = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
    const r1a = rng.randomItemFromArray(rootsPoolA)
    const r2a = rng.randomItemFromArray(rootsPoolA.filter(x => x !== r1a))
    const twoOrThreeA = rng.randomBoolean()

    const rootsA: RootData[] = [
      { x: r1a, m: rng.randomIntBetween(1, 3) },
      { x: r2a, m: rng.randomIntBetween(1, 3) },
    ]

    if (twoOrThreeA) {
      const r3a = rng.randomItemFromArray(
        rootsPoolA.filter(x => x !== r1a && x !== r2a),
      )
      rootsA.push({ x: r3a, m: rng.randomIntBetween(1, 3) })
    }

    // Teil b: gut lesbarer Graph
    const templatesB: RootData[][] = [
      [
        { x: -2, m: 1 },
        { x: 1, m: 2 },
      ],
      [
        { x: -1, m: 3 },
        { x: 2, m: 1 },
      ],
      [
        { x: -3, m: 1 },
        { x: 0, m: 2 },
      ],
      [
        { x: -2, m: 2 },
        { x: 2, m: 1 },
      ],
      [
        { x: -1, m: 1 },
        { x: 3, m: 2 },
      ],
    ]

    const rootsB = rng.randomItemFromArray(templatesB)

    return { rootsA, rootsB }
  },

  originalData: {
    rootsA: [
      { x: -2, m: 2 },
      { x: 1, m: 1 },
      { x: 3, m: 3 },
    ],
    rootsB: [
      { x: -2, m: 1 },
      { x: 1, m: 2 },
    ],
  },

  constraint({ data }) {
    return data.rootsA.length >= 2 && data.rootsB.length >= 2
  },

  intro({ data }) {
    return null
  },

  tasks: [
    {
      points: 21,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { rootsA } = data

        return (
          <>
            <p>
              Stelle eine Polynomfunktion in Linearfaktordarstellung auf, die
              die gegebenen Nullstellen mit den angegebenen Vielfachheiten
              besitzt.
            </p>

            <ul className="list-disc ml-6">
              {rootsA.map((root, index) => (
                <li key={index}>
                  <InlineMath
                    math={`x_${index + 1} = ${pp(root.x)}\\text{ mit Vielfachheit }${pp(root.m)}`}
                  />
                </li>
              ))}
            </ul>
          </>
        )
      },
      solution({ data }) {
        const { rootsA } = data

        return (
          <>
            <InlineMath math={`f(x) = ${productLatex(rootsA)}`} />
          </>
        )
      },
    },
    {
      points: 21,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { rootsB } = data

        return (
          <>
            <p>
              Lies die Nullstellen und ihre Vielfachheit aus dem Graphen ab und
              gib eine mögliche Polynomfunktion in Linearfaktordarstellung an.
            </p>

            <GraphSvg roots={rootsB} />
          </>
        )
      },
      solution({ data }) {
        const { rootsB } = data

        return (
          <>
            <InlineMath math={`f(x) = ${productLatex(rootsB)}`} />
          </>
        )
      },
    },
  ],
}
