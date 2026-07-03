// exercise9039.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  items: string[]
  counts: number[]
  prices: number[]
  totals: number[]
  sum: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9039: Exercise<DATA> = {
  title: 'Teil 2: Tabelle ausfüllen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const pools = [
      ['Fischfutter', 'Wasserpflanzen', 'Aquariensand', 'Pflanzendünger'],
      ['Getränke', 'Brötchen', 'Servietten', 'Kuchen'],
      ['Hefte', 'Stifte', 'Radiergummis', 'Lineale'],
      ['Äpfel', 'Bananen', 'Trauben', 'Birnen'],
    ]

    const items = rng.randomItemFromArray(pools)
    const counts = items.map(() => rng.randomIntBetween(1, 5))
    const prices = items.map(() =>
      round2(rng.randomItemFromArray([1.49, 2.79, 3.5, 4.59, 5.5, 7.99, 9.99])),
    )
    const totals = items.map((_, i) => round2(counts[i] * prices[i]))
    const sum = round2(totals.reduce((s, v) => s + v, 0))

    return { items, counts, prices, totals, sum }
  },

  originalData: {
    items: ['Fischfutter', 'Wasserpflanzen', 'Aquariensand', 'Pflanzendünger'],
    counts: [1, 4, 2, 1],
    prices: [4.59, 5.5, 9.99, 2.79],
    totals: [4.59, 22, 19.98, 2.79],
    sum: 49.36,
  },

  constraint({ data }) {
    return data.sum > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Sie sollen kassieren, aber die Kasse ist kaputt. Sie müssen mit dem
          Taschenrechner rechnen:
        </p>

        <table className="border-collapse text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">Artikel</th>
              <th className="border px-2 py-1">Anzahl</th>
              <th className="border px-2 py-1">Einzelpreis</th>
              <th className="border px-2 py-1">Gesamtpreis</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={item}>
                <td className="border px-2 py-1">{item}</td>
                <td className="border px-2 py-1">{data.counts[i]}</td>
                <td className="border px-2 py-1">{pp(data.prices[i])} €</td>
                <td className="border px-2 py-1"></td>
              </tr>
            ))}
            <tr>
              <td className="border px-2 py-1" colSpan={3}>
                Summe
              </td>
              <td className="border px-2 py-1"></td>
            </tr>
          </tbody>
        </table>

        <p>Berechnen Sie die Gesamtpreise und die Summe.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Jeder Gesamtpreis wird berechnet mit:</p>
        <InlineMath math={`\\text{Anzahl}\\cdot\\text{Einzelpreis}`} />

        <p>
          {data.items.map((item, i) => (
            <span key={item}>
              {item}:{' '}
              <InlineMath
                math={`${data.counts[i]}\\cdot ${pp(data.prices[i])}=${pp(
                  data.totals[i],
                )}\\,€`}
              />
              <br />
            </span>
          ))}
        </p>

        <p>Danach werden alle Gesamtpreise addiert:</p>
        <InlineMath
          math={`${data.totals.map(t => pp(t)).join('+')}=${pp(data.sum)}\\,€`}
        />
      </>
    )
  },
}
