import { Exercise } from '@/data/types'

interface DATA {
  ax: number
  ay: number
  cx: number
  cy: number
  zx: number
  zy: number
}

export const exercise305: Exercise<DATA> = {
  title: 'Dreieck im Koordinatensystem',
  source: '2024 Wahlteil Aufgabe 2B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      ax: rng.randomIntBetween(2, 6),
      ay: rng.randomIntBetween(2, 6),
      cx: rng.randomIntBetween(2, 6),
      cy: rng.randomIntBetween(-5, -1),
      zx: rng.randomIntBetween(-1, 1),
      zy: rng.randomIntBetween(-2, 2),
    }
  },
  originalData: { ax: 5, ay: 4, cx: 0, cy: 0, zx: 4, zy: -2 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>Ein Dreieck ABC hat die Eckpunkte A(5|4), B(0|0) und C(4|-2).</p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Zeichnen Sie das Dreieck ABC in ein Koordinatensystem und spiegeln
              Sie das Dreieck ABC am Punkt Z(1|2).
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Ermitteln Sie eine Gleichung der Geraden durch die Punkte A und B.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Eine parallele zur x-Achse verläuft durch den Punkt C. Geben Sie
              die Gleichung dieser Geraden an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
