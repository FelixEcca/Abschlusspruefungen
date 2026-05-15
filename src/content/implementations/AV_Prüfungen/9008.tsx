// exercise9008.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  g: number
  m3: number
  l: number
  euro: number
  mm3: number
}

export const exercise9008: Exercise<DATA> = {
  title: 'Teil 1: Einheiten umwandeln 2',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    return {
      g: rng.randomIntBetween(250, 950),
      m3: rng.randomItemFromArray([0.25, 0.48, 0.56, 0.75, 1.2]),
      l: rng.randomItemFromArray([2.5, 7.8, 12.7, 15.4, 21.6]),
      euro: rng.randomIntBetween(400, 1200),
      mm3: rng.randomItemFromArray([12, 25, 48, 75, 95]),
    }
  },

  originalData: {
    g: 725,
    m3: 0.562,
    l: 12.7,
    euro: 875,
    mm3: 95,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie in die Klammern angegebene Einheit um.</p>
        <p>{data.g} g (kg)</p>
        <p>{pp(data.m3)} m³ (dm³)</p>
        <p>{pp(data.l)} l (ml)</p>
        <p>{data.euro} € (ct)</p>
        <p>{pp(data.mm3)} mm³ (cm³)</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p><InlineMath math={`${data.g}\\,\\mathrm{g}=${pp(data.g / 1000)}\\,\\mathrm{kg}`} /></p>
        <p><InlineMath math={`${pp(data.m3)}\\,\\mathrm{m}^3=${pp(data.m3 * 1000)}\\,\\mathrm{dm}^3`} /></p>
        <p><InlineMath math={`${pp(data.l)}\\,\\mathrm{l}=${pp(data.l * 1000)}\\,\\mathrm{ml}`} /></p>
        <p>{data.euro} € = {data.euro * 100} ct</p>
        <p><InlineMath math={`${pp(data.mm3)}\\,\\mathrm{mm}^3=${pp(data.mm3 / 1000)}\\,\\mathrm{cm}^3`} /></p>
      </>
    )
  },
}