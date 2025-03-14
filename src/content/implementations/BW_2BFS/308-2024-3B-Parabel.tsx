import { Exercise } from '@/data/types'

interface DATA {}

export const exercise308: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2024 Wahlteil Aufgabe 3B',
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
          Ein Kartenspiel besteht aus roten (R) und schwarzen (S) Karten. Es
          werden zwei Karten nacheinander gezogen. Dabei ergibt sich folgendes
          Baumdiagramm.
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
            <p>Ergänzen Sie die fehlenden Angaben im Baumdiagramm.</p>
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
              Geben Sie an, aus wie vielen Karten das Kartenspiel insgesamt
              besteht.
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
              Berechnen Sie die Wahrscheinlichkeit, dass zwei schwarze Karten
              gezogen werden.
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
