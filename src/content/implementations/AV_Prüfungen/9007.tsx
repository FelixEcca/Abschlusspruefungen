// exercise9007.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mm: number
  cm: number
  km: number
  dm2: number
  mm2: number
}

export const exercise9007: Exercise<DATA> = {
  title: 'Teil 1: Einheiten umwandeln',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    return {
      mm: rng.randomIntBetween(1200, 9500),
      cm: rng.randomItemFromArray([4.5, 5.8, 7.2, 9.3, 12.6]),
      km: rng.randomItemFromArray([0.25, 0.48, 0.72, 1.35, 2.4]),
      dm2: rng.randomIntBetween(8, 80),
      mm2: rng.randomItemFromArray([1.5, 2.4, 3.5, 4.8, 6.2]),
    }
  },

  originalData: {
    mm: 7562,
    cm: 9.3,
    km: 0.72,
    dm2: 42,
    mm2: 3.5,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie in die Klammern angegebene Einheit um.</p>
        <p>{data.mm} mm (cm)</p>
        <p>{pp(data.cm)} cm (mm)</p>
        <p>{pp(data.km)} km (m)</p>
        <p>{data.dm2} dm² (m²)</p>
        <p>{pp(data.mm2)} mm² (cm²)</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p><InlineMath math={`${data.mm}\\,\\mathrm{mm}=${pp(data.mm / 10)}\\,\\mathrm{cm}`} /></p>
        <p><InlineMath math={`${pp(data.cm)}\\,\\mathrm{cm}=${pp(data.cm * 10)}\\,\\mathrm{mm}`} /></p>
        <p><InlineMath math={`${pp(data.km)}\\,\\mathrm{km}=${pp(data.km * 1000)}\\,\\mathrm{m}`} /></p>
        <p><InlineMath math={`${data.dm2}\\,\\mathrm{dm}^2=${pp(data.dm2 / 100)}\\,\\mathrm{m}^2`} /></p>
        <p><InlineMath math={`${pp(data.mm2)}\\,\\mathrm{mm}^2=${pp(data.mm2 / 100)}\\,\\mathrm{cm}^2`} /></p>
      </>
    )
  },
}