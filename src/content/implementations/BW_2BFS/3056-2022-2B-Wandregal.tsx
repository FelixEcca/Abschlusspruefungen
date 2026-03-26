// exercise3056.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  wallSide: number
  shelfHeight: number

  boxA: number
  boxB: number
  frontEdge: number
  fits: boolean
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise3056: Exercise<DATA> = {
  title: 'Dreieckiges Regal',
  source: 'Prüfung 2022 / Aufgabe 2B',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const wallSide = rng.randomItemFromArray([30, 35, 40, 45, 50])
    const shelfHeight = rng.randomItemFromArray([0.8, 0.9, 1.0, 1.1, 1.2])
    const boxA = rng.randomItemFromArray([18, 20, 22, 24])
    const boxB = rng.randomItemFromArray([26, 28, 30, 32])

    const frontEdge = round2(wallSide * Math.sqrt(2))
    const fits = boxA + boxB <= frontEdge

    return {
      wallSide,
      shelfHeight,

      boxA,
      boxB,
      frontEdge,
      fits,
    }
  },

  originalData: {
    wallSide: 40,
    shelfHeight: 1,

    boxA: 20,
    boxB: 30,
    frontEdge: round2(40 * Math.sqrt(2)),
    fits: true,
  },

  constraint({ data }) {
    return data.wallSide > 0 && data.shelfHeight > 0
  },

  intro({ data }) {
    const { wallSide, shelfHeight } = data

    return (
      <>
        <p>
          Felix möchte in einer Ecke seines Zimmers ein dreieckiges Regal für
          seine Musikbox anbringen.
        </p>

        <svg viewBox="0 0 328 180">
          <image href="/content/BW_2BFS/3056.png" height="180" width="328" />
          <text x={100} y={45} fontSize={15} textAnchor="middle" stroke="black">
            {data.wallSide} cm
          </text>
          <text
            x={170}
            y={120}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            {data.shelfHeight} m
          </text>
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie den Winkel α .</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Im rechtwinkligen Dreieck kann mit sin oder cos gerechnet werden:
            </p>
            <InlineMath
              math={`\\cos(\\alpha) = \\frac{\\text{A}}{\\text{H}} = \\frac{${pp(data.wallSide)}}{${pp(data.shelfHeight * 100)}} \\Rightarrow \\\\ \\alpha = \\cos^{-1}\\left(\\frac{${pp(data.wallSide)}}{${pp(data.shelfHeight * 100)}}\\right) = ${pp(
                Math.round(
                  ((Math.acos(data.wallSide / (data.shelfHeight * 100)) * 180) /
                    Math.PI) *
                    100,
                ) / 100,
              )}^{\\circ}`}
            />
          </>
        )
      },
    },
    {
      points: 3,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { boxA, boxB } = data
        return (
          <>
            <p>
              Felix hat eine Musikbox mit rechteckiger Grundfläche (Seitenlängen{' '}
              <InlineMath math={`${pp(boxA)}\\,\\mathrm{cm}`} /> und{' '}
              <InlineMath math={`${pp(boxB)}\\,\\mathrm{cm}`} />
              ).
            </p>
            <p>
              Prüfen Sie mit Hilfe einer Zeichnung, ob die Musikbox vollständig
              auf das Regal passt.
            </p>
            <p>
              Maßstab:{' '}
              <InlineMath
                math={
                  '10\\,\\mathrm{cm\\ (Realität)} \\;\\hat{=}\\; 1\\,\\mathrm{cm\\ (Zeichnung)}'
                }
              />
            </p>
          </>
        )
      },
      solution({ data }) {
        const { wallSide, boxA, boxB, frontEdge, fits } = data
        const drawShelf = round2(wallSide / 10)
        const drawA = round2(boxA / 10)
        const drawB = round2(boxB / 10)

        return (
          <>
            <p>
              Da die Box {fits ? '' : 'nicht'} vollständig in die Zeichnung
              eingezeichnet werden kann, passt sie{' '}
              {fits ? 'auf' : 'nicht vollständig auf'} das Regal.
            </p>
          </>
        )
      },
    },
  ],
}
