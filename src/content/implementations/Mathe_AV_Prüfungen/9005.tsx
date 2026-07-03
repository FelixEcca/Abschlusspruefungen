// exercise9005.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'muffins' | 'pfannkuchen' | 'brot' | 'kuchen'

interface DATA {
  kontext: Kontext
  num: number
  den: number
  kg: number
  literNum: number
  literDen: number
}

function fracLatex(n: number, d: number) {
  if (d === 1) return `${n}`
  return `\\frac{${n}}{${d}}`
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

function getContext(data: DATA) {
  if (data.kontext === 'muffins') {
    return {
      s1: 'Für die Abschlussfeier backen Sie Muffins.',
      s2: `Pro kg Mehl benötigen Sie ${data.num}/${data.den} Liter Milch.`,
      frage: `Berechnen Sie, wie viel Liter Milch Sie für ${data.kg} kg Mehl benötigen.`,
      produkt: 'Muffins',
    }
  }

  if (data.kontext === 'pfannkuchen') {
    return {
      s1: 'Für ein Klassenfrühstück machen Sie Pfannkuchen.',
      s2: `Pro kg Mehl benötigen Sie ${data.num}/${data.den} Liter Milch.`,
      frage: `Berechnen Sie, wie viel Liter Milch Sie für ${data.kg} kg Mehl benötigen.`,
      produkt: 'Pfannkuchen',
    }
  }

  if (data.kontext === 'brot') {
    return {
      s1: 'Für ein Projekt backen Sie Brot.',
      s2: `Pro kg Mehl benötigen Sie ${data.num}/${data.den} Liter Wasser.`,
      frage: `Berechnen Sie, wie viel Liter Wasser Sie für ${data.kg} kg Mehl benötigen.`,
      produkt: 'Brot',
    }
  }

  return {
    s1: 'Für ein Schulfest backen Sie Kuchen.',
    s2: `Pro kg Mehl benötigen Sie ${data.num}/${data.den} Liter Milch.`,
    frage: `Berechnen Sie, wie viel Liter Milch Sie für ${data.kg} kg Mehl benötigen.`,
    produkt: 'Kuchen',
  }
}

export const exercise9005: Exercise<DATA> = {
  title: 'Teil 1: Bruchteil berechnen',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'muffins',
      'pfannkuchen',
      'brot',
      'kuchen',
    ])
    const den = rng.randomItemFromArray([2, 3, 4])
    const num = rng.randomIntBetween(1, den - 1)
    const kg = rng.randomIntBetween(3, 10)
    const g = gcd(num * kg, den)
    const literNum = (num * kg) / g
    const literDen = den / g

    return { kontext, num, den, kg, literNum, literDen }
  },

  originalData: {
    kontext: 'muffins',
    num: 1,
    den: 4,
    kg: 6,
    literNum: 3,
    literDen: 2,
  },

  constraint({ data }) {
    return data.kg > 0 && data.num > 0 && data.den > 0 && 2*(data.literNum/data.literDen)%1 === 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.s1}</p>
        <p>
          Pro kg Mehl benötigen Sie{' '}
          <InlineMath math={`${fracLatex(data.num, data.den)}`} /> Liter {data.kontext === 'brot'? 'Wasser' : 'Milch'}.
        </p>
        <p>{context.frage}</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${pp(data.kg)}\\cdot ${fracLatex(
            data.num,
            data.den,
          )}=\\frac{${data.kg * data.num}}{${data.den}}=${
            data.literNum/
            data.literDen
          }`}
        />
        <p>
          Es werden <b><InlineMath math={`${fracLatex(data.literNum, data.literDen)}`} /> Liter</b> benötigt.
        </p>
      </>
    )
  },
}