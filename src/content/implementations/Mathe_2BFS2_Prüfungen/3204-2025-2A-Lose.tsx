// src/content/exercises/exercise3204.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath, BlockMath } from 'react-katex'

interface DATA {
  bikes: number // Anzahl Lose „Fahrrad“
  boards: number // Anzahl Lose „Skateboard“
  blanks: number // Anzahl Nieten
  total: number // = 100
}

export const exercise3204: Exercise<DATA> = {
  title: 'Lose',
  source: '2025 Wahlteil Aufgabe 2A',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const total = 100
    const bikes = rng.randomIntBetween(1, 3) // (z. B. 1–3 Fahrräder)
    const boards = rng.randomIntBetween(6, 12) // (z. B. 6–12 Skateboards)
    const blanks = total - (bikes + boards) // Rest sind Nieten
    return { bikes, boards, blanks, total }
  },

  originalData: { bikes: 2, boards: 8, blanks: 90, total: 100 },

  constraint({ data }) {
    return data.bikes >= 1 && data.boards >= 1 && data.blanks >= 50
  },

  intro({ data }) {
    return (
      <>
        <p>
          Eine Klasse verkauft Lose. Mit {data.bikes} Los
          {data.bikes === 1 ? '' : 'en'} gewinnt man ein Fahrrad, mit{' '}
          {data.boards} Los{data.boards === 1 ? '' : 'en'} ein Skateboard und
          die übrigen {data.blanks} Lose sind Nieten. Amy zieht nacheinander 2
          Lose.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 42,
      intro() {
        return null
      },

      // 1. Baumdiagramm
      task({ data }) {
        const { bikes: F, boards: S, blanks: N, total: T } = data
        // kleine Hilfsfunktion für LaTeX-Brüche
        const frac = (a: number, b: number) => `\\tfrac{${a}}{${b}}`

        return (
          <>
            <p>
              Zeichnen Sie hierzu ein vollständig beschriftetes Baumdiagramm.
            </p>
          </>
        )
      },

      solution({ data }) {
        const { bikes: F, boards: S, blanks: N, total: T } = data
        const frac = (a: number, b: number) => `\\tfrac{${a}}{${b}}`
        const x0 = 30,
          y0 = 100
        const x1 = 120 // Ende Stufe 1 (viel weiter rechts)
        const x2 = 300 // Ende Stufe 2
        const Y = [40, 100, 160] // F, S, N auf Stufe 1
        const dY = [-30, 0, 30]

        return (
          <>
            {/* einfache Baumgrafik (SVG) mit LaTeX-Brüchen via foreignObject */}
            <svg viewBox="0 0 328 250" width="328" height="250">
              {/* Hintergrundbild */}
              <image
                href="/content/BW_2BFS/3204.png"
                height="250"
                width="328"
              />

              {/* Level 1: Äste von Startpunkt */}
              <foreignObject x="40" y="60" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(S, T)} />
                </div>
              </foreignObject>
              <foreignObject x="130" y="60" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(F, T)} />
                </div>
              </foreignObject>
              <foreignObject x="240" y="60" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(N, T)} />
                </div>
              </foreignObject>

              {/* Level 2 vom F-Ast */}
              <foreignObject x="0" y="150" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(S - 1, T - 1)} />
                </div>
              </foreignObject>
              <foreignObject x="38" y="150" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(F, T - 1)} />
                </div>
              </foreignObject>
              <foreignObject x="67" y="150" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(N, T - 1)} />
                </div>
              </foreignObject>

              {/* Level 2 vom S-Ast */}
              <foreignObject x="100" y="150" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(S, T - 1)} />
                </div>
              </foreignObject>
              <foreignObject x="130" y="150" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(F - 1, T - 1)} />
                </div>
              </foreignObject>
              <foreignObject x="177" y="150" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(N, T - 1)} />
                </div>
              </foreignObject>

              {/* Level 2 vom N-Ast */}
              <foreignObject x="210" y="150" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(S, T - 1)} />
                </div>
              </foreignObject>
              <foreignObject x="257" y="150" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(F, T - 1)} />
                </div>
              </foreignObject>
              <foreignObject x="292" y="150" width="50" height="30">
                <div style={{ textAlign: 'center' }}>
                  <InlineMath math={frac(N - 1, T - 1)} />
                </div>
              </foreignObject>
            </svg>
          </>
        )
      },
    },

    {
      points: 42,
      intro() {
        return null
      },

      // 2. Wahrscheinlichkeiten A, B
      task() {
        return (
          <>
            <p>
              Berechnen Sie die Wahrscheinlichkeiten für folgende Ereignisse:
            </p>
            <p>
              A:&nbsp;<i>„Amy zieht 2 Nieten.“</i>
              <br />
              B:&nbsp;<i>„Amy gewinnt 1 Fahrrad und 1 Skateboard.“</i>
            </p>
          </>
        )
      },

      solution({ data }) {
        const { bikes: F, boards: S, blanks: N, total: T } = data
        const frac = (a: number, b: number) => `\\tfrac{${a}}{${b}}`

        // A: zwei Nieten
        const pA_num = N * (N - 1)
        const pA_den = T * (T - 1)
        const pA = pA_num / pA_den

        // B: ein Fahrrad und ein Skateboard (beide Reihenfolgen)
        const pB_num = F * S * 2
        const pB_den = T * (T - 1)
        const pB = pB_num / pB_den

        return (
          <>
            <p>
              <b>Ereignis A</b> (zwei Nieten):
            </p>
            <BlockMath
              math={String.raw`
\begin{aligned}
P(A)
= ${frac(N, T)}\cdot ${frac(N - 1, T - 1)}

\approx ${pp(Math.round(pA * 10000) / 10000)}.
\end{aligned}`}
            />

            <p>
              <b>Ereignis B</b> (ein Fahrrad und ein Skateboard, beliebige
              Reihenfolge):
            </p>
            <BlockMath
              math={String.raw`
\begin{aligned}
P(B)
&= ${frac(F, T)}\cdot ${frac(S, T - 1)}\;+\;${frac(S, T)}\cdot ${frac(F, T - 1)}\\
&= ${frac(2 * F * S, T * (T - 1))}\\
&\approx ${pp(Math.round(pB * 10000) / 10000)}.
\end{aligned}`}
            />
          </>
        )
      },
    },
  ],
}
