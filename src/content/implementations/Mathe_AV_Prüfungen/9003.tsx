// exercise9003.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Kontext = 'abschlussfeier' | 'klassenfest' | 'turnier' | 'elternabend'

interface DATA {
  kontext: Kontext
  plaetze: number
  personen: number
  tische: number
}

function getContext(data: DATA) {
  if (data.kontext === 'abschlussfeier') {
    return {
      text1: `Die Besucher der Abschlussfeier sollen auf ${data.plaetze}er-Tische verteilt werden.`,
      text2: `Es werden ${data.personen} Besucher erwartet.`,
      frage: 'Berechnen Sie, wie viele Tische benötigt werden.',
      einheit: 'Tische',
    }
  }

  if (data.kontext === 'klassenfest') {
    return {
      text1: `Die Gäste des Klassenfestes sollen auf ${data.plaetze}er-Tische verteilt werden.`,
      text2: `Es werden ${data.personen} Gäste erwartet.`,
      frage: 'Berechnen Sie, wie viele Tische benötigt werden.',
      einheit: 'Tische',
    }
  }

  if (data.kontext === 'turnier') {
    return {
      text1: `Die Teilnehmer eines Turniers sollen in Gruppen mit jeweils ${data.plaetze} Personen eingeteilt werden.`,
      text2: `Es werden ${data.personen} Teilnehmer erwartet.`,
      frage: 'Berechnen Sie, wie viele Gruppen benötigt werden.',
      einheit: 'Gruppen',
    }
  }

  return {
    text1: `Die Eltern beim Elternabend sollen auf Reihen mit jeweils ${data.plaetze} Plätzen verteilt werden.`,
    text2: `Es werden ${data.personen} Eltern erwartet.`,
    frage: 'Berechnen Sie, wie viele Reihen benötigt werden.',
    einheit: 'Reihen',
  }
}

export const exercise9003: Exercise<DATA> = {
  title: 'Teil 1: Anzahl berechnen',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'abschlussfeier',
      'klassenfest',
      'turnier',
      'elternabend',
    ])
    const plaetze = rng.randomItemFromArray([4, 5, 6, 8, 10])
    const personen = rng.randomIntBetween(80, 300)
    const tische = Math.ceil(personen / plaetze)

    return { kontext, plaetze, personen, tische }
  },

  originalData: {
    kontext: 'abschlussfeier',
    plaetze: 8,
    personen: 248,
    tische: 31,
  },

  constraint({ data }) {
    const lösung = (data.personen / data.plaetze)
    return data.plaetze > 0 && data.personen > 0 && lösung % 1 === 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text1}</p>
        <p>{context.text2}</p>
        <p>{context.frage}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)

    return (
      <>
        <InlineMath
          math={`${data.personen}:${data.plaetze}=${data.personen / data.plaetze}`}
        />
        <p>
          Es werden <b>{data.tische}</b> {context.einheit} benötigt.
        </p>
      </>
    )
  },
}