// exercise9518.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'personen' | 'preis' | 'punkte' | 'geld'

interface DATA {
  kontext: Kontext
  base: number
  percent: number
  value: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getText(data: DATA) {
  if (data.kontext === 'preis') {
    return `Ein Artikel kostet ${pp(data.base)} €. Berechnen Sie ${pp(
      data.percent,
    )} % davon.`
  }

  if (data.kontext === 'punkte') {
    return `Insgesamt gibt es ${data.base} Punkte. Berechnen Sie ${pp(
      data.percent,
    )} % davon.`
  }

  if (data.kontext === 'geld') {
    return `Es sind ${pp(data.base)} € in der Kasse. Berechnen Sie ${pp(
      data.percent,
    )} % davon.`
  }

  return `Es wurden ${data.base} Personen befragt. Berechnen Sie ${pp(
    data.percent,
  )} % davon.`
}

export const exercise9518: Exercise<DATA> = {
  title: 'Prozentwert berechnen',
  source: 'Prozentrechnen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'personen',
      'preis',
      'punkte',
      'geld',
    ])
    const base = rng.randomItemFromArray([40, 60, 80, 100, 120, 200, 250])
    const percent = rng.randomItemFromArray([5, 10, 12.5, 20, 25, 50, 75])
    const value = round2((base * percent) / 100)

    return { kontext, base, percent, value }
  },

  originalData: {
    kontext: 'personen',
    base: 80,
    percent: 12.5,
    value: 10,
  },

  constraint({ data }) {
    return data.value > 0
  },

  task({ data }) {
    return <p>{getText(data)}</p>
  },

  // Lösung für exercise9518 ersetzen durch:

solution({ data }) {
  return (
    <>
      <p>Berechne den Prozentwert:</p>
      <InlineMath math={`W=\\frac{G\\cdot p}{100}`} />
      <br />
      <InlineMath
        math={`W=\\frac{${pp(data.base)}\\cdot ${pp(
          data.percent,
        )}}{100}=${pp(data.value)}`}
      />
    </>
  )
},
}