import { Exercise } from '@/data/types'

interface DATA {}

export const exercise300: Exercise<DATA> = {
  title: 'Ebene Figur',
  source: '2024 2BFS',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>Gegeben ist die symmetrische Figur.</p>
        <svg viewBox="0 0 328 260">
          <image href="/content/BW_2BFS/300.png" height="230" width="328" />
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
            <p>
              Der Umfang soll 22 cm betragen. Geben Sie dazu eine Gleichung an
              und berechnen Sie x.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Nun soll x = 5 cm sein. Berechnen Sie die Höhe und geben Sie das
              Ergebnis als Wurzel an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Bestimmen Sie einen Term, der x und h enthält und mit dem die
              Fläche dieser Figur berechnet werden kann.
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
