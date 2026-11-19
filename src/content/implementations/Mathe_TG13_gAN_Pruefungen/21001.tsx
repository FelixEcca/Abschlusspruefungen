import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'
interface DATA {
  limit: number
  n: number
  denominator?: number
  equalCount?: number
}
export const exercise21001: Exercise<DATA> = {
  title: 'Stochastik: Münzwürfe mit Abbruchregel (Auswahl I)',
  source: '2022 Pflichtteil Aufgabe 2 – Auswahl I',
  useCalculator: false,
  duration: 18,
  generator: rng => ({
    limit: rng.randomIntBetween(3, 6),
    n: rng.randomIntBetween(4, 10),
    denominator: rng.randomItemFromArray([4, 8, 16, 32]),
    equalCount: rng.randomIntBetween(1, 4),
  }),
  originalData: { limit: 3, n: 5 },
  intro: () => <p>Eine ideale Münze zeigt nach jedem Wurf Kopf oder Zahl.</p>,
  tasks: [
    {
      points: 2,
      task: ({ data: d }) => (
        <p>
          Man wirft bis zum ersten Auftreten von Zahl, jedoch höchstens{' '}
          {d.limit}-mal. Zeichnen Sie ein vollständiges Baumdiagramm.
        </p>
      ),
      solution: ({ data: d }) => (
        <>
          <p>
            K: Kopf; Z: Zahl. Jeder Ast hat Wahrscheinlichkeit ½. Nach Z oder
            dem letzten Wurf endet der Pfad.
          </p>
          <svg
            viewBox={`0 0 320 ${d.limit * 65 + 40}`}
            className="my-3 w-full"
            role="img"
            aria-label="Abbruchbaum mit Kopf-Fortsetzung und Zahl-Enden"
          >
            {Array.from({ length: d.limit }, (_, i) => (
              <g key={i}>
                <path
                  d={`M80 ${25 + i * 65}l145 30 M80 ${25 + i * 65}v65`}
                  stroke="#475569"
                  fill="none"
                />
                <text x="152" y={31 + i * 65} fontSize="14">
                  ½
                </text>
                <text x="58" y={65 + i * 65} fontSize="14">
                  ½
                </text>
                <text x="235" y={59 + i * 65}>
                  Z
                </text>
                <text x="90" y={91 + i * 65}>
                  K
                </text>
              </g>
            ))}
          </svg>
        </>
      ),
    },
    {
      points: 2,
      task: () => <p>Bestimmen Sie, wie oft man die Münze im Mittel wirft.</p>,
      solution: ({ data: d }) => (
        <>
          <p>
            Der erste Wurf ist sicher. Für jeden weiteren Wurf müssen alle
            vorherigen Würfe Kopf zeigen.
          </p>
          <p>
            <InlineMath
              math={String.raw`E(N)=\sum_{j=0}^{${d.limit - 1}}\left(\frac12\right)^j=${frac(2 ** d.limit - 1, 2 ** (d.limit - 1))}`}
            />
            .
          </p>
        </>
      ),
    },
    {
      points: 4,
      task: ({ data: d }) => (
        <>
          <p>Entscheiden Sie jeweils wahr oder falsch und begründen Sie:</p>
          <ol>
            <li>
              Bei {d.n} Würfen ist die Wahrscheinlichkeit für genau einmal Zahl
              größer als{' '}
              <InlineMath math={String.raw`\tfrac1{${d.denominator ?? 8}}`} />.
            </li>
            <li>
              Es gibt eine Wurfanzahl, bei der genau {(d.equalCount ?? 2) + 1}
              -mal Zahl und genau {d.equalCount ?? 2}-mal Zahl gleich
              wahrscheinlich sind.
            </li>
          </ol>
        </>
      ),
      solution: ({ data: d }) => {
        const k = d.equalCount ?? 2,
          n = 2 * k + 1,
          den = d.denominator ?? 8
        return (
          <>
            <p>
              (1){' '}
              <InlineMath
                math={String.raw`P(X=1)=\binom{${d.n}}1\left(\frac12\right)^{${d.n}}=${frac(d.n, 2 ** d.n)}`}
              />
              . Die Aussage ist {d.n * den > 2 ** d.n ? 'wahr' : 'falsch'}.
            </p>
            <p>
              (2) Wahr: Für n={n} stimmen die Binomialkoeffizienten{' '}
              <InlineMath
                math={String.raw`\binom{${n}}{${k}}=\binom{${n}}{${k + 1}}`}
              />{' '}
              überein. Beide Wahrscheinlichkeiten enthalten zusätzlich denselben
              Faktor <InlineMath math={String.raw`(1/2)^{${n}}`} />.
            </p>
          </>
        )
      },
    },
  ],
}
