import { Exercise } from '@/data/types'

interface DATA {}

export const exercise312: Exercise<DATA> = {
  title: 'Betonkörper',
  source: '2024 Wahlteil Aufgabe 4C',
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
    return (
      <>
        <p>
          Vor einem Museum steht der abgebildete Körper aus Beton. Er hat eine
          quadratische Grundfläche mit der Seitenlänge 3,5 m.
        </p>
        <p>
          Die weiteren Maße des Lörpers sind:h<sub>1</sub> = 1,4 m;&nbsp;&nbsp;
          h<sub>2</sub> = 0,4 m;&nbsp;&nbsp; r = 0,7 m
        </p>
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
              Berechnen Sie, wie schwer der Körper ist, wenn 1 m³ Beton 2600 kg
              wiegt.
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
              Der Körper soll neu gestrichen werden. Berechnen Sie den
              Flächeninhalt der sichtbaren Oberfläche, die angestrichen werden
              muss.
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
