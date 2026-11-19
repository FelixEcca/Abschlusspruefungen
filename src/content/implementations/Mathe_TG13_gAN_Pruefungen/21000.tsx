import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { FunctionGraph } from './diagrams'
import { frac } from './math'
interface DATA {
  k: number
  c: number
  value: number
  offset?: number
  frequency?: number
  tangent?: number
}
export const exercise21000: Exercise<DATA> = {
  title: 'Analysis: Exponentialfunktion, Sinusprodukt und Parabel',
  source: '2022 Pflichtteil Aufgabe 1',
  useCalculator: false,
  duration: 35,
  generator(rng) {
    const k = rng.randomIntBetween(1, 5)
    return {
      k,
      c: rng.randomIntBetween(1, 5),
      value: rng.randomIntBetween(-5, 9),
      offset: k * rng.randomItemFromArray([-2, -1, 0, 2, 3]),
      frequency: rng.randomItemFromArray([1, 2]),
      tangent: rng.randomItemFromArray([3, 4, 6, 8]),
    }
  },
  originalData: { k: 2, c: 1, value: 7 },
  intro: () => null,
  tasks: [
    {
      points: 4,
      task: ({ data: d }) => (
        <p>
          Die in <InlineMath math={String.raw`\mathbb R`} /> definierte Funktion
          f ist gegeben durch{' '}
          <InlineMath math={String.raw`f(x)=${d.k}e^x+(${d.offset ?? 0})`} />.
          Ordnen Sie{' '}
          <InlineMath math={String.raw`f(0),\ f'(1),\ \int_0^1 f(x)\,dx`} /> der
          Größe nach aufsteigend.
        </p>
      ),
      solution: ({ data: d }) => {
        const c = d.offset ?? 0,
          terms = [
            { v: d.k + c, t: 'f(0)' },
            { v: d.k * Math.E, t: "f'(1)" },
            { v: d.k * (Math.E - 1) + c, t: String.raw`\int_0^1f(x)\,dx` },
          ].sort((a, b) => a.v - b.v)
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`f(0)=${d.k + c},\quad f'(1)=${d.k}e,\quad \int_0^1f(x)\,dx=${d.k}(e-1)+(${c})`}
              />
              .
            </p>
            <p>
              Mit 2&lt;e&lt;3 folgt{' '}
              <InlineMath math={terms.map(t => t.t).join('<')} />.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: ({ data: d }) => {
        const w = d.frequency ?? 1
        return (
          <>
            <p>
              Gegeben ist{' '}
              <InlineMath
                math={String.raw`g(x)=${frac(d.k, 2)}x\sin(${w}x),\quad -1\le x\le10`}
              />
              .
            </p>
            <FunctionGraph
              fn={x => (d.k / 2) * x * Math.sin(w * x)}
              xMin={-1}
              xMax={10}
              yMin={-6 * d.k}
              yMax={6 * d.k}
              yStep={2 * d.k}
            />
            <p>
              Bestimmen Sie die gemeinsamen Punkte mit{' '}
              <InlineMath math={String.raw`y=${frac(d.k, 2)}x`} /> und geben Sie
              die Anzahl der Berührpunkte an.
            </p>
          </>
        )
      },
      solution: ({ data: d }) => {
        const w = d.frequency ?? 1,
          last = Math.floor((10 * w - Math.PI / 2) / (2 * Math.PI)),
          points = Array.from(
            { length: last + 1 },
            (_, j) =>
              String.raw`(\tfrac{${4 * j + 1}\pi}{${2 * w}}\mid\tfrac{${d.k * (4 * j + 1)}\pi}{${4 * w}})`,
          )
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`x\sin(${w}x)=x\iff x=0\ \text{oder}\ \sin(${w}x)=1`}
              />
              .
            </p>
            <p>
              Im Intervall liegen{' '}
              <InlineMath
                math={String.raw`(0\mid0),\quad ${points.join(',\\quad')}`}
              />
              .
            </p>
            <p>
              An den {last + 1} von null verschiedenen Schnittstellen gilt{' '}
              <InlineMath
                math={String.raw`g'(x)=${frac(d.k, 2)}[\sin(${w}x)+${w}x\cos(${w}x)]=${frac(d.k, 2)}`}
              />
              , also dieselbe Steigung wie die Gerade. Dort sind Berührpunkte.
              Im Ursprung ist g′(0)=0, also keine Berührung mit der Geraden.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: ({ data: d }) => {
        const w = d.frequency ?? 1
        return (
          <p>
            Zeigen Sie, dass{' '}
            <InlineMath
              math={String.raw`G(x)=${frac(d.k, 2)}\left[-\frac{x\cos(${w}x)}{${w}}+\frac{\sin(${w}x)}{${w * w}}\right]`}
            />{' '}
            eine Stammfunktion von g ist. Geben Sie die Stammfunktion an, deren
            Graph durch <InlineMath math={String.raw`(0\mid${d.value})`} />{' '}
            geht.
          </p>
        )
      },
      solution: ({ data: d }) => {
        const w = d.frequency ?? 1
        return (
          <>
            <p>
              Produkt- und Kettenregel liefern{' '}
              <InlineMath
                math={String.raw`G'(x)=${frac(d.k, 2)}\left[-\frac{\cos(${w}x)}{${w}}+x\sin(${w}x)+\frac{\cos(${w}x)}{${w}}\right]=g(x)`}
              />
              .
            </p>
            <p>
              Da G(0)=0 ist, lautet die gesuchte Stammfunktion{' '}
              <InlineMath math={String.raw`F(x)=G(x)+(${d.value})`} /> auf
              [−1;10].
            </p>
          </>
        )
      },
    },
    {
      points: 5,
      task: ({ data: d }) => (
        <p>
          Ermitteln Sie eine quadratische Funktion h: Ihr Graph schneidet{' '}
          <InlineMath
            math={String.raw`y=-\tfrac1{${d.tangent ?? 4}}x+${d.c}`}
          />{' '}
          in <InlineMath math={String.raw`(0\mid${d.c})`} /> rechtwinklig. Die
          x- und y-Koordinate seines Extrempunkts stimmen überein.
        </p>
      ),
      solution: ({ data: d }) => {
        const b = d.tangent ?? 4,
          a = frac(b * (b - 2), 4 * d.c)
        return (
          <>
            <p>
              Ansatz <InlineMath math={String.raw`h(x)=ax^2+bx+c`} />. Aus dem
              Schnittpunkt folgt c={d.c}; die senkrechten Tangenten liefern{' '}
              <InlineMath
                math={String.raw`b(-\tfrac1{${b}})=-1\Rightarrow b=${b}`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`x_E=-\frac{${b}}{2a},\quad y_E=${d.c}-\frac{${b * b}}{4a}`}
              />
              . Gleichsetzen ergibt{' '}
              <InlineMath
                math={String.raw`4a\cdot${d.c}=${b * b - 2 * b}\Rightarrow a=${a}`}
              />
              .
            </p>
            <p>
              <InlineMath math={String.raw`h(x)=${a}x^2+${b}x+${d.c}`} />.
            </p>
          </>
        )
      },
    },
  ],
}
