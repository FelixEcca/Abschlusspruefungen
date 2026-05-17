// exercise9516.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

type Kontext = 'solarmodule' | 'zaun' | 'stuehle' | 'aufraeumen'

interface DATA {
  kontext: Kontext
  workers1: number
  hours1: number
  extra: number
  workers2: number
  hours2: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'zaun') {
    return {
      sentence1: `${data.workers1} Schüler brauchen für das Streichen eines Zauns ${pp(
        data.hours1,
      )} Stunden.`,
      sentence2: `Berechnen Sie, wie lange sie brauchen, wenn ${data.extra} weitere Schüler helfen.`,
      unit: 'Schüler',
      result: 'Die Schüler brauchen',
    }
  }

  if (data.kontext === 'stuehle') {
    return {
      sentence1: `${data.workers1} Helfer brauchen für das Aufstellen der Stühle ${pp(
        data.hours1,
      )} Stunden.`,
      sentence2: `Berechnen Sie, wie lange sie brauchen, wenn ${data.extra} weitere Helfer dazukommen.`,
      unit: 'Helfer',
      result: 'Die Helfer brauchen',
    }
  }

  if (data.kontext === 'aufraeumen') {
    return {
      sentence1: `${data.workers1} Personen brauchen für das Aufräumen ${pp(
        data.hours1,
      )} Stunden.`,
      sentence2: `Berechnen Sie, wie lange sie brauchen, wenn ${data.extra} weitere Personen helfen.`,
      unit: 'Personen',
      result: 'Die Personen brauchen',
    }
  }

  return {
    sentence1: `${data.workers1} Schüler brauchen für das Anbringen der Solarmodule ${pp(
      data.hours1,
    )} Stunden.`,
    sentence2: `Berechnen Sie, wie lange sie brauchen, wenn ${data.extra} weitere Schüler helfen.`,
    unit: 'Schüler',
    result: 'Die Schüler brauchen',
  }
}

export const exercise9516: Exercise<DATA> = {
  title: 'Umgekehrter Dreisatz',
  source: 'Dreisatz und Anteile',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'solarmodule',
      'zaun',
      'stuehle',
      'aufraeumen',
    ])
    const workers1 = rng.randomItemFromArray([2, 3, 4])
    const hours1 = rng.randomItemFromArray([4, 5, 6, 7, 8])
    const extra = rng.randomItemFromArray([2, 3, 4, 5])
    const workers2 = workers1 + extra
    const hours2 = round2((workers1 * hours1) / workers2)

    return { kontext, workers1, hours1, extra, workers2, hours2 }
  },

  originalData: {
    kontext: 'solarmodule',
    workers1: 2,
    hours1: 5,
    extra: 3,
    workers2: 5,
    hours2: 2,
  },

  constraint({ data }) {
    return data.hours2 > 0 && data.workers2 === data.workers1 + data.extra
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.sentence1}</p>
        <p>{context.sentence2}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)
    const totalWork = data.workers1 * data.hours1

    return (
      <>
        <p>Mehr Personen brauchen weniger Zeit.</p>
        <p>
          {data.workers1} {context.unit}: {pp(data.hours1)} h
        </p>
        <p>
          1 {context.unit}: {pp(data.hours1)} h · {data.workers1} ={' '}
          {pp(totalWork)} h
        </p>
        <p>
          {data.workers2} {context.unit}: {pp(totalWork)} h : {data.workers2} ={' '}
          {pp(data.hours2)} h
        </p>
        <p>
          {context.result} <b>{pp(data.hours2)} Stunden</b>.
        </p>
      </>
    )
  },
}