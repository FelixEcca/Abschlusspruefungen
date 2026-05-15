// exercise9004.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'abschlussfeier' | 'schulfest' | 'vereinsfest' | 'projektwoche'

interface DATA {
  kontext: Kontext
  gewinn1: number
  einnahme2: number
  einnahme3: number
  kosten: number
  gesamt: number
}

function getContext(data: DATA) {
  if (data.kontext === 'abschlussfeier') {
    return {
      s1: `Der Gewinn aus dem Kuchenverkauf betrug ${pp(data.gewinn1)} €.`,
      s2: `Durch einen Spendenlauf wurden ${pp(data.einnahme2)} € und durch einen Flohmarkt ${pp(data.einnahme3)} € eingenommen.`,
      s3: `Die Standmiete beim Flohmarkt kostete ${pp(data.kosten)} €.`,
      frage: 'Berechnen Sie, wie viel Gewinn Sie insgesamt gemacht haben.',
    }
  }

  if (data.kontext === 'schulfest') {
    return {
      s1: `Der Gewinn aus dem Getränkeverkauf betrug ${pp(data.gewinn1)} €.`,
      s2: `Durch ein Gewinnspiel wurden ${pp(data.einnahme2)} € und durch einen Bücherstand ${pp(data.einnahme3)} € eingenommen.`,
      s3: `Für Material wurden ${pp(data.kosten)} € bezahlt.`,
      frage: 'Berechnen Sie, wie viel Gewinn insgesamt gemacht wurde.',
    }
  }

  if (data.kontext === 'vereinsfest') {
    return {
      s1: `Der Gewinn aus dem Essensverkauf betrug ${pp(data.gewinn1)} €.`,
      s2: `Mit dem Eintritt wurden ${pp(data.einnahme2)} € und durch Spenden ${pp(data.einnahme3)} € eingenommen.`,
      s3: `Für die Miete wurden ${pp(data.kosten)} € bezahlt.`,
      frage: 'Berechnen Sie, wie viel Gewinn insgesamt gemacht wurde.',
    }
  }

  return {
    s1: `Der Gewinn aus einem Verkaufsstand betrug ${pp(data.gewinn1)} €.`,
    s2: `Durch eine Sammelaktion wurden ${pp(data.einnahme2)} € und durch einen Basar ${pp(data.einnahme3)} € eingenommen.`,
    s3: `Für Werbung wurden ${pp(data.kosten)} € bezahlt.`,
    frage: 'Berechnen Sie, wie viel Gewinn insgesamt gemacht wurde.',
  }
}

export const exercise9004: Exercise<DATA> = {
  title: 'Teil 1: Gewinn berechnen',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'abschlussfeier',
      'schulfest',
      'vereinsfest',
      'projektwoche',
    ])

    const gewinn1 = rng.randomIntBetween(80, 250)
    const einnahme2 = rng.randomIntBetween(50, 180)
    const einnahme3 = rng.randomIntBetween(80, 260)
    const kosten = rng.randomIntBetween(20, 120)
    const gesamt = gewinn1 + einnahme2 + einnahme3 - kosten

    return { kontext, gewinn1, einnahme2, einnahme3, kosten, gesamt }
  },

  originalData: {
    kontext: 'abschlussfeier',
    gewinn1: 127,
    einnahme2: 628,
    einnahme3: 205,
    kosten: 85,
    gesamt: 309,
  },

  constraint({ data }) {
    return data.gesamt > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.s1}</p>
        <p>{context.s2}</p>
        <p>{context.s3}</p>
        <p>{context.frage}</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die Einnahmen werden addiert. Die Kosten werden abgezogen.</p>
        <InlineMath
          math={`${pp(data.gewinn1)}+${pp(data.einnahme2)}+${pp(
            data.einnahme3,
          )}-${pp(data.kosten)}=${pp(data.gesamt)}`}
        />
        <p>
          Der Gewinn beträgt insgesamt <b>{pp(data.gesamt)} €</b>.
        </p>
      </>
    )
  },
}