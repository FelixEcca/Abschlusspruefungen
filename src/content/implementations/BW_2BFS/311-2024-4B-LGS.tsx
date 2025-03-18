import { Exercise } from '@/data/types'

interface DATA {}

export const exercise311: Exercise<DATA> = {
  title: 'LGS',
  source: '2024 Wahlteil Aufgabe 4B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return <></>
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
              Gegeben ist ein lineares Gleichungssystem (LGS).<br></br>Berechnen
              Sie die Lösung.
            </p>
            <p>
              (I) x = 2y - 3<br></br>(II) y = 2x
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
              Gegeben ist ein anderes, unvollständiges LGS mit:<br></br>
            </p>
            <p>
              (I) x = 2y - 3<br></br>(II) &nbsp;&nbsp;=
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
              Stellen Sie Gleichung (I) aus (b) grafisch in einem
              Koordinatensystem dar.
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
              Geben Sie eine zweite Gleichung (II) an, sodass das LGS aus (b)
              keine Lösung hat.
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
              Stellen Sie eine mögliche Gleichung (II) grafisch in dem vorhanden
              Koordinatensystem dar, sodass das LGS keine Lösung hat.
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
