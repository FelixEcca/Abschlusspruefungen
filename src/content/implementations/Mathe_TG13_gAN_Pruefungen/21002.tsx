import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'
interface DATA {
  count: number
  stake: number
  b?: number
  d?: number
  k?: number
  triple?: number
}
function counts(d: DATA) {
  const b = d.b ?? d.count,
    q = d.d ?? d.count,
    k = d.k ?? d.count,
    n = b + q + k,
    total = n ** 3,
    distinct = 6 * b * q * k,
    triple = b ** 3 + q ** 3 + k ** 3,
    pair = total - distinct - triple
  return {
    b,
    q,
    k,
    n,
    total,
    distinct,
    triple,
    pair,
    payout: d.triple ?? 3 * d.stake + 3,
  }
}
export const exercise21002: Exercise<DATA> = {
  title: 'Stochastik: Kartenbilder und faires Spiel (Auswahl II)',
  source: '2022 Pflichtteil Aufgabe 2 – Auswahl II',
  useCalculator: false,
  duration: 20,
  generator(rng) {
    const stake = rng.randomIntBetween(3, 9)
    return {
      count: 2,
      stake,
      b: rng.randomIntBetween(1, 4),
      d: rng.randomIntBetween(1, 4),
      k: rng.randomIntBetween(1, 4),
      triple: 2 * stake,
    }
  },
  originalData: { count: 2, stake: 5 },
  intro: ({ data }) => {
    const { b, q, k } = counts(data)
    return (
      <p>
        Ein zufällig angeordneter Stapel enthält {b} Buben, {q} Damen und {k}{' '}
        Könige. Dreimal wird die oberste Karte gezogen und ihr Bild notiert. Die
        Karte wird jeweils zurückgelegt und der Stapel neu gemischt.
      </p>
    )
  },
  tasks: [
    {
      points: 5,
      task: () => (
        <>
          <p>Berechnen Sie die Wahrscheinlichkeiten:</p>
          <ul>
            <li>E₁: drei verschiedene Bilder.</li>
            <li>E₂: genau einmal Bube.</li>
            <li>E₃: mindestens einmal Bube oder mindestens zweimal König.</li>
          </ul>
        </>
      ),
      solution: ({ data }) => {
        const { b, q, k, n, total, distinct } = counts(data)
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`P(B)=${frac(b, n)},\quad P(D)=${frac(q, n)},\quad P(K)=${frac(k, n)}`}
              />
              .
            </p>
            <p>
              Für drei verschiedene Bilder gibt es 3! Reihenfolgen:{' '}
              <InlineMath
                math={String.raw`P(E_1)=6\cdot\frac{${b}}{${n}}\cdot\frac{${q}}{${n}}\cdot\frac{${k}}{${n}}=${frac(distinct, total)}`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`P(E_2)=\binom31\frac{${b}}{${n}}\left(\frac{${n - b}}{${n}}\right)^2=${frac(3 * b * (n - b) ** 2, total)}`}
              />
              .
            </p>
            <p>
              Das Gegenereignis von E₃ besteht aus DDD und den drei Anordnungen
              von KDD.{' '}
              <InlineMath
                math={String.raw`P(E_3)=1-\left(\frac{${q}}{${n}}\right)^3-3\frac{${k}}{${n}}\left(\frac{${q}}{${n}}\right)^2=${frac(total - q ** 3 - 3 * k * q * q, total)}`}
              />
              .
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: ({ data }) => (
        <p>
          Der Einsatz beträgt {data.stake} Euro. Nur bei mindestens zwei
          gleichen Bildern gibt es eine Auszahlung. Bei drei gleichen Bildern
          werden {counts(data).payout} Euro ausgezahlt. Welche Auszahlung im
          verbleibenden Fall macht das Spiel fair?
        </p>
      ),
      solution: ({ data }) => {
        const { triple, pair, total, payout } = counts(data)
        return (
          <>
            <p>
              Drei gleiche Bilder haben Wahrscheinlichkeit{' '}
              <InlineMath math={frac(triple, total)} />, genau zwei gleiche
              Bilder <InlineMath math={frac(pair, total)} />.
            </p>
            <p>
              Fair bedeutet „erwartete Auszahlung = Einsatz“:{' '}
              <InlineMath
                math={String.raw`${frac(triple, total)}\cdot${payout}+${frac(pair, total)}\cdot a=${data.stake}`}
              />
              .
            </p>
            <p>
              Die gesuchte Auszahlung ist{' '}
              <InlineMath
                math={String.raw`a=${frac(data.stake * total - payout * triple, pair)}\,\text{Euro}`}
              />
              .
            </p>
          </>
        )
      },
    },
  ],
}
