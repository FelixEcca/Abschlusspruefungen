import { Exercise } from '@/data/types'

interface DATA {
  fixedCosts: number
  sellingPrice: number
  variableCosts: number
}

export const exercise12001: Exercise<DATA> = {
  title: 'Break-even-Point bestimmen',
  source: '3BKGD3 Mathematik I',
  useCalculator: false,
  duration: 5,
  points: 2,
  generator(rng) {
    return {
      fixedCosts: rng.randomIntBetween(-1500, 1500, 100),
      sellingPrice: rng.randomIntBetween(-10, 10),
      variableCosts: rng.randomIntBetween(-20, 20),
    }
  },
  originalData: {
    fixedCosts: 500,
    sellingPrice: 8,
    variableCosts: 12,
  },
  constraint({ data }) {
    return data.sellingPrice !== data.variableCosts
  },
  task({ data }) {
    return (
      <p>
        Eine Druckerei stellt Plackate her. Die Fixkosten betragen{' '}
        {data.fixedCosts} €, der Verkaufspreis beträgt {data.sellingPrice} € pro
        Stück und die variablen Kosten betragen {data.variableCosts} € pro
        Stück. Berechne, ab welcher Stückzahl ein Gewinn erzielt wird.
      </p>
    )
  },
  solution({ data }) {
    const breakEven = Number(
      (data.fixedCosts / (data.sellingPrice - data.variableCosts)).toFixed(2),
    )
      .toString()
      .replace('.', ',')

    return <p>Der Break-even-Point liegt rechnerisch bei {breakEven} Stück.</p>
  },
}
