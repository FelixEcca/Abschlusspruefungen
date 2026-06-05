// exercise9046.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'obstsalat' | 'farbmischung' | 'muesli' | 'smoothie' | 'salat'

interface DATA {
  kontext: Kontext
  total: number
  items: string[]
  parts: number[]
  sum: number
  amounts: number[]
}

function getContext(kontext: Kontext) {
  if (kontext === 'farbmischung') {
    return {
      intro: 'Sie möchten eine Farbe selbst mischen.',
      recipeIntro: 'Die Farbe wird aus folgenden Teilen gemischt:',
      totalText: 'Insgesamt planen Sie mit',
      unit: 'Liter',
      resultText: 'Berechnen Sie, wie viel Sie von jeder Farbe brauchen.',
      items: ['Weiß', 'Blau', 'Gelb', 'Grün', 'Schwarz'],
    }
  }

  if (kontext === 'muesli') {
    return {
      intro: 'Sie möchten eine Müslimischung vorbereiten.',
      recipeIntro: 'Die Mischung besteht aus folgenden Teilen:',
      totalText: 'Insgesamt planen Sie mit',
      unit: 'kg',
      resultText: 'Berechnen Sie, wie viel Sie von jeder Zutat brauchen.',
      items: ['Haferflocken', 'Nüsse', 'Rosinen', 'Schokolade', 'Cornflakes'],
    }
  }

  if (kontext === 'smoothie') {
    return {
      intro: 'Sie möchten Smoothies vorbereiten.',
      recipeIntro: 'Der Smoothie wird aus folgenden Teilen gemischt:',
      totalText: 'Insgesamt planen Sie mit',
      unit: 'Liter',
      resultText: 'Berechnen Sie, wie viel Sie von jeder Zutat brauchen.',
      items: ['Banane', 'Mango', 'Apfelsaft', 'Joghurt', 'Beeren'],
    }
  }

  if (kontext === 'salat') {
    return {
      intro: 'Sie möchten einen Salat vorbereiten.',
      recipeIntro: 'Der Salat wird aus folgenden Teilen gemischt:',
      totalText: 'Insgesamt planen Sie mit',
      unit: 'kg',
      resultText: 'Berechnen Sie, wie viel Sie von jeder Zutat brauchen.',
      items: ['Tomaten', 'Gurken', 'Mais', 'Paprika', 'Feta'],
    }
  }

  return {
    intro: 'Für die erste Party bereiten Sie Obstsalat vor.',
    recipeIntro: 'Im Rezept steht, dass Sie folgende Zutaten mischen sollen:',
    totalText: 'Insgesamt planen Sie mit',
    unit: 'kg',
    resultText: 'Berechnen Sie, wie viel Sie von jeder Zutat brauchen.',
    items: ['Pfirsiche', 'Kiwis', 'Bananen', 'Weintrauben', 'Äpfel'],
  }
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9046: Exercise<DATA> = {
  title: 'Teil 2: Anteile berechnen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'obstsalat',
      'farbmischung',
      'muesli',
      'smoothie',
      'salat',
    ])

    const context = getContext(kontext)

    const parts = [
      rng.randomIntBetween(1, 4),
      rng.randomIntBetween(2, 5),
      rng.randomIntBetween(1, 4),
      rng.randomIntBetween(1, 4),
      rng.randomIntBetween(2, 5),
    ]

    const sum = parts.reduce((s, v) => s + v, 0)

    const total = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12, 15])
    const amounts = parts.map(part => round2((total * part) / sum))

    return {
      kontext,
      total,
      items: context.items,
      parts,
      sum,
      amounts,
    }
  },

  originalData: {
    kontext: 'obstsalat',
    total: 3,
    items: ['Pfirsiche', 'Kiwis', 'Bananen', 'Weintrauben', 'Äpfel'],
    parts: [2, 4, 1, 1, 2],
    sum: 10,
    amounts: [0.6, 1.2, 0.3, 0.3, 0.6],
  },

  constraint({ data }) {
    return (
      data.items.length === data.parts.length &&
      data.parts.length === data.amounts.length &&
      data.sum > 0
    )
  },

  task({ data }) {
    const context = getContext(data.kontext)

    return (
      <>
        <p>{context.intro}</p>

        <p>{context.recipeIntro}</p>

        <ul>
          {data.items.map((item, i) => (
            <li key={item}>
              {item}: {data.parts[i]} {data.parts[i] === 1 ? 'Teil' : 'Teile'}
            </li>
          ))}
        </ul>

        <p>
          {context.totalText} {pp(data.total)} {context.unit}.
        </p>

        <p>{context.resultText}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data.kontext)

    return (
      <>
        <p>Alle Teile zusammen:</p>

        <InlineMath math={`${data.parts.join('+')}=${data.sum}`} />

        <p>Jetzt wird jeder Anteil berechnet:</p>

        <p>
          {data.items.map((item, i) => (
            <span key={item}>
              {item}:{' '}
              <InlineMath
                math={`${pp(data.total)}\\, ${context.unit}\\cdot\\frac{${data.parts[i]}}{${
                  data.sum
                }}=${pp(data.amounts[i])}\\,\\text{${context.unit}}`}
              />
              <br />
            </span>
          ))}
        </p>
      </>
    )
  },
}
