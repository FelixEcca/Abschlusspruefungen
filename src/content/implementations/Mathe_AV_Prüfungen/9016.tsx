// exercise9016.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'ausflug' | 'sportfest' | 'schulfest' | 'projektwoche'

interface DATA {
  kontext: Kontext
  n1: number
  p1: number
  n2: number
  p2: number
  n3: number
  p3: number
  pfand: number
  total: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'sportfest') {
    return {
      intro: 'Sie kaufen für ein Sportfest folgende Getränke:',
      item1: 'Kisten Mineralwasser',
      item2: 'Kisten Apfelschorle',
      item3: 'Kisten Iso-Getränke',
      extra: `Pro Kiste zahlen Sie ${pp(data.pfand)} € Pfand.`,
      question: 'Berechnen Sie, wie viel Euro Sie mit Pfand bezahlen müssen.',
      extraLabel: 'Das Pfand kostet:',
    }
  }

  if (data.kontext === 'schulfest') {
    return {
      intro: 'Sie kaufen für ein Schulfest folgende Getränke:',
      item1: 'Kisten Wasser',
      item2: 'Kisten Limonade',
      item3: 'Kisten Apfelsaft',
      extra: `Pro Kiste zahlen Sie ${pp(data.pfand)} € Pfand.`,
      question: 'Berechnen Sie, wie viel Euro Sie mit Pfand bezahlen müssen.',
      extraLabel: 'Das Pfand kostet:',
    }
  }

  if (data.kontext === 'projektwoche') {
    return {
      intro: 'Sie kaufen für die Projektwoche folgende Getränke:',
      item1: 'Kisten Mineralwasser',
      item2: 'Kisten Orangensaft',
      item3: 'Kisten Traubensaft',
      extra: `Pro Kiste zahlen Sie ${pp(data.pfand)} € Pfand.`,
      question: 'Berechnen Sie, wie viel Euro Sie mit Pfand bezahlen müssen.',
      extraLabel: 'Das Pfand kostet:',
    }
  }

  return {
    intro: 'Sie kaufen für einen Ausflug folgende Getränke:',
    item1: 'Kisten Mineralwasser',
    item2: 'Kisten Apfelsaft',
    item3: 'Kisten Orangensaft',
    extra: `Pro Kiste zahlen Sie ${pp(data.pfand)} € Pfand.`,
    question: 'Berechnen Sie, wie viel Euro Sie mit Pfand bezahlen müssen.',
    extraLabel: 'Das Pfand kostet:',
  }
}

export const exercise9016: Exercise<DATA> = {
  title: 'Teil 2: Getränke',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'ausflug',
      'sportfest',
      'schulfest',
      'projektwoche',
    ])

    const n1 = rng.randomIntBetween(8, 20)
    const n2 = rng.randomIntBetween(3, 10)
    const n3 = rng.randomIntBetween(2, 8)

    const p1 = rng.randomItemFromArray([3.8, 4.2, 4.5, 5.2])
    const p2 = rng.randomItemFromArray([8.5, 9.8, 10.2, 11.4])
    const p3 = rng.randomItemFromArray([7.8, 8.9, 10.2, 12.5])

    const pfand = rng.randomItemFromArray([2.4, 3, 3.6, 4])

    const total = round2(
      n1 * (p1 + pfand) + n2 * (p2 + pfand) + n3 * (p3 + pfand),
    )

    return { kontext, n1, p1, n2, p2, n3, p3, pfand, total }
  },

  originalData: {
    kontext: 'ausflug',
    n1: 15,
    p1: 4.2,
    n2: 5,
    p2: 9.8,
    n3: 4,
    p3: 10.2,
    pfand: 3.6,
    total: 210.2,
  },

  constraint({ data }) {
    return data.total > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.intro}</p>
        <p>
          {data.n1} {context.item1} zu je {pp(data.p1)} €
          <br />
          {data.n2} {context.item2} zu je {pp(data.p2)} €
          <br />
          {data.n3} {context.item3} zu je {pp(data.p3)} €
          <br />
          {context.extra}
        </p>
        <p>{context.question}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)

    const drinkCost = round2(
      data.n1 * data.p1 + data.n2 * data.p2 + data.n3 * data.p3,
    )
    const pfandCost = round2(data.pfand * (data.n1 + data.n2 + data.n3))

    return (
      <>
        <p>Die Getränke kosten:</p>
        <InlineMath
          math={`${data.n1}\\cdot ${pp(data.p1)}+${data.n2}\\cdot ${pp(
            data.p2,
          )}+${data.n3}\\cdot ${pp(data.p3)}=${pp(drinkCost)}`}
        />
        <br />

        <p>{context.extraLabel}</p>
        <InlineMath
          math={`(${data.n1}+${data.n2}+${data.n3})\\cdot ${pp(
            data.pfand,
          )}=${pp(pfandCost)}`}
        />

        <p>
          Sie müssen insgesamt
          <br />{' '}
          <b>
            {pp(drinkCost)} € + {pp(pfandCost)} € = {pp(data.total)} €
          </b>{' '}
          <br />
          bezahlen.
        </p>
      </>
    )
  },
}
