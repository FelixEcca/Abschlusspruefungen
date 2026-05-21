// exercise9035.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  kg: number
  g: number

  dm3: number
  cm3: number

  ml: number
  l: number

  l2: number
  ml2: number

  m2: number
  cm2: number
}

export const exercise9035: Exercise<DATA> = {
  title: 'Teil 1: Gemischte Einheiten',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kg = rng.randomItemFromArray([2.5, 4.2, 7.04, 9.5])
    const dm3 = rng.randomItemFromArray([0.01, 0.0457, 0.08])
    const ml = rng.randomIntBetween(100, 900)
    const l2 = rng.randomItemFromArray([1.5, 2.03, 4.5])
    const m2 = rng.randomItemFromArray([0.12, 0.478, 1.25])

    return {
      kg,
      g: kg * 1000,
      dm3,
      cm3: dm3 * 1000,
      ml,
      l: ml / 1000,
      l2,
      ml2: l2 * 1000,
      m2,
      cm2: m2 * 10000,
    }
  },

  originalData: {
    kg: 7.04,
    g: 7040,
    dm3: 0.0457,
    cm3: 45.7,
    ml: 487,
    l: 0.487,
    l2: 2.03,
    ml2: 2030,
    m2: 0.478,
    cm2: 4780,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie in die angegebene Einheit um.</p>

        <p>
          {pp(data.kg)} kg (g)
          <br />
          {pp(data.dm3)} dm³ (cm³)
          <br />
          {data.ml} ml (l)
          <br />
          {pp(data.l2)} l (ml)
          <br />
          {pp(data.m2)} m² (cm²)
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`${pp(data.kg)}\\,kg=${pp(data.g)}\\,g`} />
        <br />
        <InlineMath math={`${pp(data.dm3)}\\,dm^3=${pp(data.cm3)}\\,cm^3`} />
        <br />
        <InlineMath math={`${data.ml}\\,ml=${pp(data.l)}\\,l`} />
        <br />
        <InlineMath math={`${pp(data.l2)}\\,l=${pp(data.ml2)}\\,ml`} />
        <br />
        <InlineMath math={`${pp(data.m2)}\\,m^2=${pp(data.cm2)}\\,cm^2`} />
      </>
    )
  },
}
