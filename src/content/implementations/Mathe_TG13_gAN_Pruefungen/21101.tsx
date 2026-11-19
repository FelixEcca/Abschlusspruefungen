import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { ProbabilityTable } from './diagrams'
import { frac, binomial } from './math'
interface DATA {
  k: number
  target: number
  gold?: number
  black?: number
  white?: number
  trials?: number
  extra?: number
  cutoff?: number
}
function values(d: DATA) {
  const g = d.gold ?? d.k,
    b = d.black ?? 4 * d.k,
    w = d.white ?? 5 * d.k,
    n = g + b + w,
    trials = d.trials ?? 30,
    table =
      d.trials === undefined
        ? [0.04, 0.14, 0.23, 0.24, 0.18, 0.1, 0.05]
        : binomial(trials, g / n)
            .slice(0, 7)
            .map(p => Math.round(p * 100) / 100),
    extra = d.extra ?? (d.target * n - g) / (1 - d.target)
  return { g, b, w, n, table, extra, cutoff: d.cutoff ?? 3 }
}
export const exercise21101: Exercise<DATA> = {
  title: 'Stochastik: Goldene Kugeln und Verteilungstabelle (Auswahl I)',
  source: '2023 Pflichtteil Aufgabe 2 – Auswahl I',
  useCalculator: false,
  duration: 18,
  generator(rng) {
    const gold = rng.randomIntBetween(1, 3),
      black = rng.randomIntBetween(3, 7),
      white = rng.randomIntBetween(3, 7),
      mean = rng.randomItemFromArray([2, 2.5, 3, 3.5, 4])
    return {
      k: 1,
      target: 0.4,
      gold,
      black,
      white,
      trials: Math.round((mean * (gold + black + white)) / gold),
      extra: rng.randomIntBetween(3, 10),
      cutoff: rng.randomIntBetween(2, 5),
    }
  },
  originalData: { k: 1, target: 0.4 },
  intro: ({ data }) => {
    const { g, b, w } = values(data)
    return (
      <p>
        Eine Urne enthält {g} goldene, {b} schwarze und {w} weiße Kugeln. Es
        wird jeweils zufällig eine Kugel mit Zurücklegen gezogen.
      </p>
    )
  },
  tasks: [
    {
      points: 2,
      task: () => (
        <p>
          Es wird dreimal gezogen. Berechnen Sie die Wahrscheinlichkeit, zuerst
          Gold, dann Schwarz und zuletzt Weiß zu ziehen.
        </p>
      ),
      solution: ({ data }) => {
        const { g, b, w, n } = values(data)
        return (
          <p>
            Die Ziehungen sind unabhängig:{' '}
            <InlineMath
              math={String.raw`P(A)=\frac{${g}}{${n}}\cdot\frac{${b}}{${n}}\cdot\frac{${w}}{${n}}=${frac(g * b * w, n ** 3)}`}
            />
            .
          </p>
        )
      },
    },
    {
      points: 3,
      task: ({ data }) => {
        const { table, cutoff } = values(data)
        return (
          <>
            <p>
              Nun wird mehrmals gezogen. X zählt die goldenen Kugeln. Die
              Tabelle zeigt gerundete Wahrscheinlichkeiten. Bestimmen Sie P(B)
              für „höchstens {cutoff}-mal Gold“ und P(C) für „mindestens einmal
              Gold“.
            </p>
            <ProbabilityTable values={table} />
          </>
        )
      },
      solution: ({ data }) => {
        const { table, cutoff } = values(data)
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`P(B)=P(X\le${cutoff})\approx ${table
                  .slice(0, cutoff + 1)
                  .map(v => pp(v))
                  .join(
                    '+',
                  )}=${pp(table.slice(0, cutoff + 1).reduce((s, p) => s + p, 0))}`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`P(C)=1-P(X=0)\approx1-${pp(table[0])}=${pp(1 - table[0])}`}
              />
              . Die Ergebnisse sind Näherungen, weil die Tabelle gerundete Werte
              enthält.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: ({ data }) => {
        const { g, n, extra } = values(data)
        return (
          <p>
            Nur die Anzahl goldener Kugeln wird verändert. Formulieren Sie eine
            Frage, die durch{' '}
            <InlineMath
              math={String.raw`\frac{${g}+x}{${n}+x}=${data.extra === undefined ? pp(data.target) : frac(g + extra, n + extra)}`}
            />{' '}
            beantwortet wird, und berechnen Sie x.
          </p>
        )
      },
      solution: ({ data }) => {
        const { g, n, extra } = values(data)
        return (
          <>
            <p>
              Wie viele goldene Kugeln muss man hinzufügen, damit die
              Wahrscheinlichkeit für Gold bei einer Ziehung den Wert auf der
              rechten Seite erreicht?
            </p>
            <p>
              Beide Seiten mit <InlineMath math={String.raw`${n}+x`} />{' '}
              multiplizieren und die x-Terme zusammenfassen:
            </p>
            <p>
              <InlineMath
                math={String.raw`\frac{${n - g}}{${n + extra}}x=\frac{${extra * (n - g)}}{${n + extra}}\quad\Rightarrow\quad x=${extra}`}
              />
              . Es müssen {extra} goldene Kugeln hinzugefügt werden.
            </p>
          </>
        )
      },
    },
  ],
}
