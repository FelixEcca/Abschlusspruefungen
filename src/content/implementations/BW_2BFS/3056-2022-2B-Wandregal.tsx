// exercise3056.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  wallSide: number
  shelfHeight: number
  alphaDeg: number
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

    const alphaDeg = 45
    const frontEdge = round2(wallSide * Math.sqrt(2))
    const fits = boxA + boxB <= frontEdge

    return {
      wallSide,
      shelfHeight,
      alphaDeg,
      boxA,
      boxB,
      frontEdge,
      fits,
    }
  },

  originalData: {
    wallSide: 40,
    shelfHeight: 1,
    alphaDeg: 45,
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
          <image
            href="/content/BW_2BFS/3056.png"
            height="180"
            width="328"
          />
        </svg>

        <p>
          Dabei gilt: Die beiden Schenkel an den Wänden sind jeweils{' '}
          <InlineMath math={`${pp(wallSide)}\\,\\mathrm{cm}`} /> lang und das
          Regal befindet sich in{' '}
          <InlineMath math={`${pp(shelfHeight)}\\,\\mathrm{m}`} /> Höhe.
        </p>
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
        const { alphaDeg } = data

        return (
          <>
            <p>
              Da die beiden Wände senkrecht zueinander stehen, entsteht ein
              rechtwinkliges Dreieck.
            </p>
            <p>
              Die beiden an den Wänden liegenden Seiten sind gleich lang, daher
              sind die beiden spitzen Winkel gleich groß.
            </p>
            <InlineMath math={'\\alpha + \\alpha + 90^{\\circ} = 180^{\\circ}'} />
            <br />
            <InlineMath math={`2\\alpha = 90^{\\circ}`} />
            <br />
            <InlineMath math={`\\alpha = ${pp(alphaDeg)}^{\\circ}`} />
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
              Felix hat eine Musikbox mit rechteckiger Grundfläche
              (Seitenlängen <InlineMath math={`${pp(boxA)}\\,\\mathrm{cm}`} /> und{' '}
              <InlineMath math={`${pp(boxB)}\\,\\mathrm{cm}`} />).
            </p>
            <p>
              Prüfen Sie mit Hilfe einer Zeichnung, ob die Musikbox vollständig
              auf das Regal passt.
            </p>
            <p>
              Maßstab: <InlineMath math={'10\\,\\mathrm{cm\\ (Realität)} \\;\\hat{=}\\; 1\\,\\mathrm{cm\\ (Zeichnung)}'} />
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
              Im Maßstab entsteht ein rechtwinkliges Dreieck mit Katheten
              <InlineMath math={`${pp(drawShelf)}\\,\\mathrm{cm}`} />.
            </p>
            <p>
              Die Musikbox hat in der Zeichnung die Seitenlängen{' '}
              <InlineMath math={`${pp(drawA)}\\,\\mathrm{cm}`} /> und{' '}
              <InlineMath math={`${pp(drawB)}\\,\\mathrm{cm}`} />.
            </p>
            <InlineMath
              math={`\\text{Vorderkante des Regals} = ${pp(wallSide)}\\sqrt{2} \\approx ${pp(
                frontEdge,
              )}\\,\\mathrm{cm}`}
            />
            <br />
            <p>
              Da die Box damit vollständig in die Zeichnung eingezeichnet werden
              kann, passt sie {fits ? 'auf' : 'nicht vollständig auf'} das Regal.
            </p>
          </>
        )
      },
    },
  ],
}