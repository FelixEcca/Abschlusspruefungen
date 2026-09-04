import { Exercise } from '@/data/types'
import { buildEquation, buildFrac } from '@/helper/math-builder'
import { InlineMath } from 'react-katex'

interface DATA {fixkosten:number
  verkaufspreis: number
  variabel: number
}

export const exercise10000: Exercise<DATA> = {
  title: 'Break-Even-Point',
  source: 'Grundlagen',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {fixkosten: rng.randomIntBetween(1000, 10000),
      verkaufspreis: rng.randomIntBetween(1, 10),
      variabel: rng.randomIntBetween(1, 10)
     }
  },
  originalData: {fixkosten:6500,
    verkaufspreis: 5,
    variabel: 2
  },
  constraint({ data }) {
    return data.variabel<data.verkaufspreis
  },
  task({ data }) {
    return <><p>Sie arbeiten für das Unternehmen xy. Sie produzieren Flyer.</p>
    <p>Die fixen Kosten der Produktion betragen <InlineMath math={`K_f=${data.fixkosten}`} /> € und der Verkaufspreis beträgt <InlineMath math={`p=${data.verkaufspreis} €`} /> pro Stück.</p>
    <p>Berechnen Sie die erforderliche Stückzahl <InlineMath math={`x`} />, wenn die variablen Kosten <InlineMath math={`K_v=${data.variabel}`} /> € betragen.</p></>
  },
  solution({ data }) {
    const ergebnis = Math.ceil(data.fixkosten/(data.verkaufspreis-data.variabel))
    return <><p>Wenden Sie die Formel für den Break-Even-Point an:</p>
    {buildEquation([[<>x</>,<>=</>,<>{buildFrac(<>K<sub>f</sub></>,<>p-<>K<sub>v</sub></></>)}</>],[<>x</>,<>=</>,<>{buildFrac(<>{data.fixkosten}</>,<>{data.verkaufspreis}-{data.variabel}</>)}</>],[<>x</>,<>=</>,<>{ergebnis}</>]])}
    <p>Die erforderliche Stückzahl ist x = {ergebnis}.</p>
    </>
  },
}
