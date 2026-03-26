// =============================
// 1A (3050) – Terme zum Umfang
// =============================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // für (1): Reihenfolge der Antwortvorschläge
  opts1: string[]
  // für (2): Reihenfolge der Antwortvorschläge
  opts2: string[]
}

export const exercise3050: Exercise<DATA> = {
  title: 'Terme',
  source: '2022 Pflichtteil Aufgabe 1A',
  useCalculator: false,
  duration: 10,

  generator(rng) {
    // gleiche vier Vorschläge wie im Original, aber in zufälliger Reihenfolge
    // Define multiple pools for more variety
    const pools1 = [
      [
        '2(2x + 4 + 2x + x)', // korrekt
        '(2x + 4) · 2x · x', // falsch
        '10x + 8', // korrekt
        '2(2x + 4) + 6x', // korrekt
      ],
      [
        '2(3y + 5 + 3y + y)', // korrekt
        '(3y + 5) · 3y · y', // falsch
        '14y + 10', // korrekt
        '2(3y + 5) + 8y', // korrekt
      ],
      [
        '2(4z + 2 + 4z + z)', // korrekt
        '(4z + 2) · 4z · z', // falsch
        '18z + 4', // korrekt
        '2(4z + 2) + 10z', // korrekt
      ],
      [
        '2(5a + 3 + 5a + a)', // korrekt
        '(5a + 3) · 5a · a', // falsch
        '22a + 6', // korrekt
        '2(5a + 3) + 12a', // korrekt
      ],
      [
        '2(6b + 7 + 6b + b)', // korrekt
        '(6b + 7) · 6b · b', // falsch
        '26b + 14', // korrekt
        '2(6b + 7) + 13b', // korrekt
      ],
    ]

    const pools2 = [
      [
        '4a + 4s', // korrekt
        '4(a+s)', // korrekt (äquivalent)
        'a + a + a + a + 4s', // korrekt (äquivalent)
        '4a + s', // falsch (nur eine Seitenkante)
      ],
      [
        '4b + 4t', // korrekt
        '4(b+t)', // korrekt (äquivalent)
        'b + b + b + b + 4t', // korrekt (äquivalent)
        '4b + t', // falsch
      ],
      [
        '4c + 4u', // korrekt
        '4(c+u)', // korrekt (äquivalent)
        'c + c + c + c + 4u', // korrekt (äquivalent)
        '4c + u', // falsch
      ],
      [
        '4d + 4v', // korrekt
        '4(d+v)', // korrekt (äquivalent)
        'd + d + d + d + 4v', // korrekt (äquivalent)
        '4d + v', // falsch
      ],
      [
        '4e + 4w', // korrekt
        '4(e+w)', // korrekt (äquivalent)
        'e + e + e + e + 4w', // korrekt (äquivalent)
        '4e + w', // falsch
      ],
    ]

    // Pick a random pool index for this exercise instance
    const poolIdx = rng.randomIntBetween(0, pools1.length - 1)
    const pool1 = [...pools1[poolIdx]]
    const pool2 = [...pools2[poolIdx]]

    const order1: string[] = []
    while (pool1.length)
      order1.push(pool1.splice(rng.randomIntBetween(0, pool1.length - 1), 1)[0])

    const order2: string[] = []
    while (pool2.length)
      order2.push(pool2.splice(rng.randomIntBetween(0, pool2.length - 1), 1)[0])
    // (The following duplicate block is removed to avoid redeclaration errors)

    return { opts1: order1, opts2: order2 }
  },

  // Original: feste Figur/Termvorschläge
  originalData: {
    opts1: [
      '2(2x + 4 + 2x + x)',
      '(2x + 4) · 2x · x',
      '10x + 8',
      '2(2x + 4) + 6x',
    ],
    opts2: ['4a + 4s', '4(a+s)', 'a + a + a + a + 4s', '4a + s'],
  },

  constraint() {
    return true
  },

  intro({ data }) {
    // Statische Skizze (vereinfacht) – ändert sich NICHT mit den Daten
    return (
      <div className="space-y-2">
        <p>Welche Terme beschreiben den Umfang der Figur?</p>
        <svg
          viewBox="0 0 320 140"
          width="320"
          height="140"
          className="border rounded"
        >
          <image href="/content/BW_2BFS/3050.png" height="140" width="328" />
          {/* Dynamically render side labels based on the selected pool */}
          {(() => {
            // Extract the variable and numbers from the selected pool
            // Example: '2(2x + 4 + 2x + x)' → variable: x, numbers: 2, 4, 2, 1
            const poolIdx = (() => {
              // Try to infer the pool index from the current opts1
              const opts1 = (typeof data !== 'undefined' && data?.opts1) ||
                exercise3050.originalData?.opts1 || [
                  '2(2x + 4 + 2x + x)',
                  '(2x + 4) · 2x · x',
                  '10x + 8',
                  '2(2x + 4) + 6x',
                ]
              const pools = [
                [
                  '2(2x + 4 + 2x + x)',
                  '(2x + 4) · 2x · x',
                  '10x + 8',
                  '2(2x + 4) + 6x',
                ],
                [
                  '2(3y + 5 + 3y + y)',
                  '(3y + 5) · 3y · y',
                  '14y + 10',
                  '2(3y + 5) + 8y',
                ],
                [
                  '2(4z + 2 + 4z + z)',
                  '(4z + 2) · 4z · z',
                  '18z + 4',
                  '2(4z + 2) + 10z',
                ],
                [
                  '2(5a + 3 + 5a + a)',
                  '(5a + 3) · 5a · a',
                  '22a + 6',
                  '2(5a + 3) + 12a',
                ],
                [
                  '2(6b + 7 + 6b + b)',
                  '(6b + 7) · 6b · b',
                  '26b + 14',
                  '2(6b + 7) + 13b',
                ],
              ]
              for (let i = 0; i < pools.length; i++) {
                if (opts1.includes(pools[i][0])) return i
              }
              return 0
            })()

            // Map poolIdx to side labels
            const sideData = [
              { var: 'x', left: '2x + 4', top: '2x', right: 'x' },
              { var: 'y', left: '3y + 5', top: '3y', right: 'y' },
              { var: 'z', left: '4z + 2', top: '4z', right: 'z' },
              { var: 'a', left: '5a + 3', top: '5a', right: 'a' },
              { var: 'b', left: '6b + 7', top: '6b', right: 'b' },
            ][poolIdx]

            return (
              <>
                <text x="150" y="120" fontSize="14">
                  {sideData.left}
                </text>
                <text x="295" y="40" fontSize="14">
                  {sideData.top}
                </text>
                <text x="295" y="85" fontSize="14">
                  {sideData.right}
                </text>
              </>
            )
          })()}
        </svg>
      </div>
    )
  },

  tasks: [
    // (1) Umfangsterme beurteilen
    {
      points: 6,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <ul className="list-disc ml-6">
            {data.opts1.map((t, i) => (
              <li key={i}>
                <InlineMath math={t.replaceAll('·', '\\cdot')} />
              </li>
            ))}
          </ul>
        )
      },
      // ...existing code...
      solution({ data }) {
        // Map pools to correct/incorrect answers for each pool
        const pools = [
          [
            { math: '2(2x+4+2x+x)', correct: true },
            { math: '(2x+4)\\cdot2x\\cdot x', correct: false },
            { math: '10x+8', correct: true },
            { math: '2(2x+4)+6x', correct: true },
          ],
          [
            { math: '2(3y+5+3y+y)', correct: true },
            { math: '(3y+5)\\cdot3y\\cdot y', correct: false },
            { math: '14y+10', correct: true },
            { math: '2(3y+5)+8y', correct: true },
          ],
          [
            { math: '2(4z+2+4z+z)', correct: true },
            { math: '(4z+2)\\cdot4z\\cdot z', correct: false },
            { math: '18z+4', correct: true },
            { math: '2(4z+2)+10z', correct: true },
          ],
          [
            { math: '2(5a+3+5a+a)', correct: true },
            { math: '(5a+3)\\cdot5a\\cdot a', correct: false },
            { math: '22a+6', correct: true },
            { math: '2(5a+3)+12a', correct: true },
          ],
          [
            { math: '2(6b+7+6b+b)', correct: true },
            { math: '(6b+7)\\cdot6b\\cdot b', correct: false },
            { math: '26b+14', correct: true },
            { math: '2(6b+7)+13b', correct: true },
          ],
        ]

        // Helper to normalize expressions for comparison
        const normalize = (str: string) =>
          str
            .replace(/\\cdot/g, '·')
            .replace(/\s/g, '')
            .replace(/\+/g, '+')
            .replace(/\(/g, '(')
            .replace(/\)/g, ')')

        // Find which pool is used by matching the current opts1[0]
        const poolIdx = (() => {
          const opts1 = data.opts1
          for (let i = 0; i < pools.length; i++) {
            if (
              opts1.some(
                opt =>
                  normalize(opt) ===
                  normalize(pools[i][0].math.replace(/\\cdot/g, '·')),
              )
            )
              return i
          }
          return 0
        })()

        return (
          <ul className="list-disc ml-6">
            {data.opts1.map((t, i) => {
              const entry = pools[poolIdx].find(
                sol => normalize(sol.math) === normalize(t),
              ) || { math: t, correct: false }
              return (
                <li key={i}>
                  <InlineMath math={t.replaceAll('·', '\\cdot')} />{' '}
                  <span>{entry.correct ? '✅' : '❌'}</span>
                </li>
              )
            })}
          </ul>
        )
      },
      // ...existing
    },
    // (2) Pyramidenkanten
    {
      points: 6,
      intro() {
        return <></>
      },
      task({ data }) {
        // Dynamically determine the variable names for this pool
        const poolIdx = (() => {
          const opts2 = data.opts2
          const pools = [
            ['4a + 4s', '4(a+s)', 'a + a + a + a + 4s', '4a + s'],
            ['4b + 4t', '4(b+t)', 'b + b + b + b + 4t', '4b + t'],
            ['4c + 4u', '4(c+u)', 'c + c + c + c + 4u', '4c + u'],
            ['4d + 4v', '4(d+v)', 'd + d + d + d + 4v', '4d + v'],
            ['4e + 4w', '4(e+w)', 'e + e + e + e + 4w', '4e + w'],
          ]
          for (let i = 0; i < pools.length; i++) {
            if (opts2.includes(pools[i][0])) return i
          }
          return 0
        })()
        const vars = [
          { base: 'a', side: 's' },
          { base: 'b', side: 't' },
          { base: 'c', side: 'u' },
          { base: 'd', side: 'v' },
          { base: 'e', side: 'w' },
        ][poolIdx]

        return (
          <>
            <p>
              Gegeben ist eine Pyramide mit quadratischer Grundfläche mit
              Grundkantenlänge <InlineMath math={vars.base} /> und
              Seitenkantenlänge <InlineMath math={vars.side} />. Welche Terme
              beschreiben die Gesamtlänge aller Kanten?
            </p>
            <ul className="list-disc ml-6">
              {data.opts2.map((t, i) => (
                <li key={i}>
                  <InlineMath math={t.replaceAll('·', '\\cdot')} />
                </li>
              ))}
            </ul>
          </>
        )
      },
      // ...existing code...
      solution({ data }) {
        // Map the current order to the correct/incorrect answers for the selected pool
        const pools = [
          [
            { math: '4a+4s', correct: true },
            { math: '4(a+s)', correct: true },
            { math: 'a+a+a+a+4s', correct: true },
            { math: '4a+s', correct: false },
          ],
          [
            { math: '4b+4t', correct: true },
            { math: '4(b+t)', correct: true },
            { math: 'b+b+b+b+4t', correct: true },
            { math: '4b+t', correct: false },
          ],
          [
            { math: '4c+4u', correct: true },
            { math: '4(c+u)', correct: true },
            { math: 'c+c+c+c+4u', correct: true },
            { math: '4c+u', correct: false },
          ],
          [
            { math: '4d+4v', correct: true },
            { math: '4(d+v)', correct: true },
            { math: 'd+d+d+d+4v', correct: true },
            { math: '4d+v', correct: false },
          ],
          [
            { math: '4e+4w', correct: true },
            { math: '4(e+w)', correct: true },
            { math: 'e+e+e+e+4w', correct: true },
            { math: '4e+w', correct: false },
          ],
        ]

        // Helper to normalize expressions for comparison
        const normalize = (str: string) =>
          str
            .replace(/\s/g, '')
            .replace(/·/g, '')
            .replace(/\\cdot/g, '')
            .replace(/\+/g, '+')
            .replace(/\(/g, '(')
            .replace(/\)/g, ')')

        // Find which pool is used by matching the current opts2[0]
        const poolIdx = (() => {
          const opts2 = data.opts2
          for (let i = 0; i < pools.length; i++) {
            if (
              opts2.some(opt => normalize(opt) === normalize(pools[i][0].math))
            )
              return i
          }
          return 0
        })()

        return (
          <ul className="list-disc ml-6">
            {data.opts2.map((t, i) => {
              const entry = pools[poolIdx].find(
                sol => normalize(sol.math) === normalize(t),
              ) || { math: t, correct: false }
              return (
                <li key={i}>
                  <InlineMath math={t.replaceAll('·', '\\cdot')} />{' '}
                  <span>{entry.correct ? '✅' : '❌'}</span>
                </li>
              )
            })}
          </ul>
        )
      },
    },
  ],
}
