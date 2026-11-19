import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { FunctionGraph } from './diagrams'
import { frac } from './math'
interface DATA {
  a: number
  k: number
  h?: number
  c?: number
  sign?: number
  vertical?: number
  phase?: number
  threshold?: number
}
export const exercise21100: Exercise<DATA> = {
  title: 'Analysis: Extrempunkte, Graphenaussagen und Cosinus',
  source: '2023 Pflichtteil Aufgabe 1',
  useCalculator: false,
  duration: 35,
  generator: rng => ({
    a: rng.randomIntBetween(1, 4),
    k: rng.randomIntBetween(1, 5),
    h: rng.randomIntBetween(-4, 4),
    c: rng.randomIntBetween(-8, 8),
    sign: rng.randomItemFromArray([-1, 1]),
    vertical: rng.randomItemFromArray([-2, -1, 0, 1, 2]),
    phase: rng.randomIntBetween(-2, 2),
    threshold: rng.randomItemFromArray([-5, -3, 3, 5]),
  }),
  originalData: { a: 2, k: 1 },
  intro: () => null,
  tasks: [
    {
      points: 5,
      task: ({ data: d }) => (
        <p>
          Gegeben ist{' '}
          <InlineMath
            math={String.raw`f(x)=${frac(d.k, 2)}(x-(${d.h ?? 0}))^3-${frac(3 * d.k * d.a ** 2, 2)}(x-(${d.h ?? 0}))+(${d.c ?? 0}),\quad x\in\mathbb R`}
          />
          . Bestimmen Sie Koordinaten und Art der Extrempunkte und den
          Wendepunkt.
        </p>
      ),
      solution: ({ data: d }) => {
        const h = d.h ?? 0,
          c = d.c ?? 0
        return (
          <>
            <p>
              Mit <InlineMath math={String.raw`u=x-(${h})`} /> gilt{' '}
              <InlineMath
                math={String.raw`f'(x)=${frac(3 * d.k, 2)}(u^2-${d.a ** 2}),\quad f''(x)=${3 * d.k}u`}
              />
              .
            </p>
            <p>
              Die stationären Stellen sind{' '}
              <InlineMath math={String.raw`x=${h - d.a},\quad x=${h + d.a}`} />.
              Die zweite Ableitung ist dort negativ beziehungsweise positiv.
              Somit{' '}
              <InlineMath
                math={String.raw`H(${h - d.a}\mid${c + d.k * d.a ** 3}),\quad T(${h + d.a}\mid${c - d.k * d.a ** 3})`}
              />
              .
            </p>
            <p>
              Aus{' '}
              <InlineMath
                math={String.raw`f''(${h})=0,\quad f'''(x)=${3 * d.k}\ne0`}
              />{' '}
              folgt <InlineMath math={String.raw`W(${h}\mid${c})`} />.
            </p>
          </>
        )
      },
    },
    {
      points: 5,
      task: ({ data: d }) => {
        const s = d.sign ?? 1,
          v = d.vertical ?? -2,
          h = d.phase ?? 0
        return (
          <>
            <p>
              Die Abbildung zeigt einen Ausschnitt des Graphen von g.
              Entscheiden Sie wahr oder falsch und begründen Sie:
            </p>
            <FunctionGraph
              fn={x =>
                d.k * (s * 4 * Math.cos((Math.PI * (x - 1 - h)) / 4) + v)
              }
              xMin={Math.min(-1 + h, -1)}
              xMax={6 + h}
              yMin={-8 * d.k}
              yMax={8 * d.k}
              yStep={2 * d.k}
            />
            <ol>
              <li>
                <InlineMath
                  math={String.raw`g(${5 + h})-g(${3 + h})<${(d.threshold ?? -5) * d.k}`}
                />
              </li>
              <li>
                <InlineMath math={String.raw`g'(${4 + h})<0`} />
              </li>
              <li>
                Für jede Stammfunktion G gilt{' '}
                <InlineMath math={String.raw`G(${3 + h})-G(${h})>0`} />.
              </li>
            </ol>
          </>
        )
      },
      solution: ({ data: d }) => {
        const s = d.sign ?? 1,
          v = d.vertical ?? -2,
          h = d.phase ?? 0,
          difference = -4 * d.k * s
        return (
          <>
            <p>
              (1) {difference < (d.threshold ?? -5) * d.k ? 'Wahr' : 'Falsch'}:
              Man liest{' '}
              <InlineMath
                math={String.raw`g(${5 + h})=${d.k * (v - 4 * s)},\quad g(${3 + h})=${d.k * v}`}
              />{' '}
              ab. Die Differenz ist {difference}.
            </p>
            <p>
              (2){' '}
              {s > 0
                ? 'Wahr: Der Graph fällt an dieser Stelle.'
                : 'Falsch: Der Graph steigt an dieser Stelle.'}
            </p>
            <p>
              (3) {s > 0 ? 'Wahr' : 'Falsch'}:{' '}
              <InlineMath
                math={String.raw`G(${3 + h})-G(${h})=\int_{${h}}^{${3 + h}}g(x)\,dx`}
              />
              . Im betrachteten Intervall ist die Fläche{' '}
              {s > 0 ? 'oberhalb' : 'unterhalb'} der x-Achse größer. Die
              orientierte Flächenbilanz ist {s > 0 ? 'positiv' : 'negativ'}.
            </p>
          </>
        )
      },
    },
    {
      points: 5,
      task: ({ data: d }) => (
        <p>
          Eine in <InlineMath math={String.raw`\mathbb R`} /> definierte
          Cosinusfunktion h hat Periodenlänge p&gt;0.{' '}
          <InlineMath math={String.raw`(\tfrac p2\mid${d.k}p)`} /> ist ein
          Hochpunkt und{' '}
          <InlineMath math={String.raw`(\tfrac p4\mid\tfrac{${d.k}p}2)`} /> ein
          Wendepunkt. Bestimmen Sie die Steigung an der Stelle p/4.
        </p>
      ),
      solution: ({ data: d }) => (
        <>
          <p>
            Mittellinie und Amplitude haben jeweils den Wert{' '}
            <InlineMath math={String.raw`\tfrac{${d.k}p}2`} />. Ein passender
            Term ist{' '}
            <InlineMath
              math={String.raw`h(x)=-\frac{${d.k}p}2\cos(\tfrac{2\pi}px)+\frac{${d.k}p}2`}
            />
            .
          </p>
          <p>
            <InlineMath
              math={String.raw`h'(x)=${d.k}\pi\sin(\tfrac{2\pi}px)\quad\Rightarrow\quad h'(p/4)=${d.k}\pi`}
            />
            .
          </p>
        </>
      ),
    },
  ],
}
