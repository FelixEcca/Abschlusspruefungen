// exercise9517.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'gemuesetopf' | 'saftmischung' | 'teig' | 'futter'

interface DATA {
  kontext: Kontext
  total: number
  a: number
  b: number
  c: number
  d: number
}

function getContext(data: DATA) {
  if (data.kontext === 'saftmischung') {
    return {
      intro: `Für eine Saftmischung werden insgesamt ${pp(data.total)} Liter benötigt.`,
      unit: 'l',
      items: ['Apfelsaft', 'Orangensaft', 'Traubensaft', 'Wasser'],
    }
  }

  if (data.kontext === 'teig') {
    return {
      intro: `Für einen Teig werden insgesamt ${pp(data.total)} kg Zutaten benötigt.`,
      unit: 'kg',
      items: ['Mehl', 'Zucker', 'Butter', 'Milch'],
    }
  }

  if (data.kontext === 'futter') {
    return {
      intro: `Für eine Futtermischung werden insgesamt ${pp(data.total)} kg benötigt.`,
      unit: 'kg',
      items: ['Hafer', 'Mais', 'Kerne', 'Pellets'],
    }
  }

  return {
    intro: `Für einen Gemüsetopf werden insgesamt ${pp(data.total)} kg benötigt.`,
    unit: 'kg',
    items: ['Zwiebeln', 'Kartoffeln', 'Karotten', 'Wasser'],
  }
}

export const exercise9517: Exercise<DATA> = {
  title: 'Anteile aufteilen',
  source: 'Dreisatz und Anteile',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'gemuesetopf',
      'saftmischung',
      'teig',
      'futter',
    ])

    const total =
      kontext === 'saftmischung'
        ? rng.randomItemFromArray([6, 8, 10, 12, 15, 20])
        : rng.randomItemFromArray([8, 10, 12, 15, 18, 20])

    const a = rng.randomIntBetween(1, 4)
    const b = rng.randomIntBetween(3, 10)
    const c = rng.randomIntBetween(2, 8)
    const d = rng.randomIntBetween(1, 8)

    return { kontext, total, a, b, c, d }
  },

  originalData: {
    kontext: 'gemuesetopf',
    total: 12,
    a: 1,
    b: 10,
    c: 5,
    d: 8,
  },

  constraint({ data }) {
    return data.a + data.b + data.c + data.d > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.intro}</p>
        <p>
          Das Rezept hat folgende Teile:
          <br />
          {data.a} Teil {context.items[0]}
          <br />
          {data.b} Teile {context.items[1]}
          <br />
          {data.c} Teile {context.items[2]}
          <br />
          {data.d} Teile {context.items[3]}
        </p>
        <p>
          Berechnen Sie, wie viel {context.unit} von jeder Zutat gebraucht
          werden.
        </p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)
    const sum = data.a + data.b + data.c + data.d
    const one = data.total / sum

    return (
      <>
        <p>Alle Teile zusammen:</p>
        <InlineMath math={`${data.a}+${data.b}+${data.c}+${data.d}=${sum}`} />

        <p>Ein Teil:</p>
        <InlineMath
          math={`${pp(data.total)}:${sum}=${pp(one)}\\,\\mathrm{${context.unit}}`}
        />

        <p>
          {context.items[0]}:{' '}
          <b>
            {pp(one * data.a)} {context.unit}
          </b>
          <br />
          {context.items[1]}:{' '}
          <b>
            {pp(one * data.b)} {context.unit}
          </b>
          <br />
          {context.items[2]}:{' '}
          <b>
            {pp(one * data.c)} {context.unit}
          </b>
          <br />
          {context.items[3]}:{' '}
          <b>
            {pp(one * data.d)} {context.unit}
          </b>
        </p>
      </>
    )
  },
}