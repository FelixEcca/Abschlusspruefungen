import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'
interface DATA {
  black: number
  limit?: number
  minimum?: number
}
export const exercise21102: Exercise<DATA> = {
  title: 'Stochastik: Würfelspiel mit Abbruchregel (Auswahl II)',
  source: '2023 Pflichtteil Aufgabe 2 – Auswahl II',
  useCalculator: false,
  duration: 18,
  generator(rng) {
    const limit = rng.randomIntBetween(3, 6)
    return {
      black: rng.randomIntBetween(1, 5),
      limit,
      minimum: rng.randomIntBetween(2, limit),
    }
  },
  originalData: { black: 2 },
  intro: ({ data: d }) => (
    <p>
      Ein idealer Würfel hat {6 - d.black} weiße und {d.black} schwarze Flächen.
      Man würfelt bis zum ersten Schwarz, jedoch höchstens {d.limit ?? 4}-mal.
    </p>
  ),
  tasks: [
    {
      points: 2,
      task: () => <p>Geben Sie die Ergebnismenge an.</p>,
      solution: ({ data: d }) => {
        const limit = d.limit ?? 4
        return (
          <p>
            Mit W=weiß und S=schwarz:{' '}
            <InlineMath
              math={String.raw`\Omega=\{${[...Array.from({ length: limit }, (_, i) => 'W'.repeat(i) + 'S'), 'W'.repeat(limit)].join(',')}\}`}
            />
            . Nach Schwarz wird nicht weitergewürfelt.
          </p>
        )
      },
    },
    {
      points: 6,
      task: ({ data: d }) => (
        <>
          <p>Berechnen Sie:</p>
          <ul>
            <li>A: Das Spiel endet spätestens nach dem zweiten Wurf.</li>
            <li>
              B: Es wird {d.limit ?? 4}-mal gewürfelt und Schwarz erscheint.
            </li>
            <li>C: Es wird mindestens {d.minimum ?? 2}-mal gewürfelt.</li>
          </ul>
        </>
      ),
      solution: ({ data: d }) => {
        const w = 6 - d.black,
          l = d.limit ?? 4,
          m = d.minimum ?? 2
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`p=P(S)=${frac(d.black, 6)},\quad q=P(W)=${frac(w, 6)}`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`P(A)=p+qp=1-q^2=${frac(36 - w * w, 36)}`}
              />
              .
            </p>
            <p>
              B benötigt {l - 1} weiße Würfe und dann Schwarz:{' '}
              <InlineMath
                math={String.raw`P(B)=q^{${l - 1}}p=${frac(w ** (l - 1) * d.black, 6 ** l)}`}
              />
              .
            </p>
            <p>
              Für C müssen die ersten {m - 1} Würfe Weiß zeigen:{' '}
              <InlineMath
                math={String.raw`P(C)=q^{${m - 1}}=${frac(w ** (m - 1), 6 ** (m - 1))}`}
              />
              .
            </p>
          </>
        )
      },
    },
  ],
}
