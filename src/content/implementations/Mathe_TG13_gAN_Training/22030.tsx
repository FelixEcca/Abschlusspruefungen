import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  c: number
}

export const exercise22030: Exercise<DATA> = {
  title: 'Funktionswert, Ableitung und Integral exakt vergleichen',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return { a: rng.randomIntBetween(1, 5), c: rng.randomIntBetween(-2, 2) }
  },
  originalData: { a: 2, c: 0 },
  task({ data }) {
    return (
      <>
        <p>
          Für{' '}
          <InlineMath
            math={String.raw`f(x)=${data.a}e^x+(${data.a * data.c})`}
          />{' '}
          sollen die drei Werte{' '}
          <InlineMath
            math={String.raw`f(0),\quad f'(1),\quad\int_0^1f(x)\,dx`}
          />{' '}
          aufsteigend geordnet werden. Geben Sie eine exakte Begründung an. Sie
          dürfen <InlineMath math="2<e<3" /> verwenden.
        </p>
      </>
    )
  },
  solution({ data }) {
    const items = [
      { v: data.a * (1 + data.c), s: 'f(0)' },
      { v: data.a * Math.E, s: "f'(1)" },
      { v: data.a * (Math.E - 1 + data.c), s: '\\int_0^1f(x)\\,dx' },
    ].sort((a, b) => a.v - b.v)
    return (
      <>
        <p>
          <InlineMath
            math={String.raw`f(0)=${data.a * (1 + data.c)},\quad f'(1)=${data.a}e,\quad\int_0^1f(x)\,dx=${data.a}(e-1+(${data.c}))`}
          />
          .
        </p>
        <p>
          Die Differenz zwischen Integral und f(0) ist{' '}
          <InlineMath math={String.raw`${data.a}(e-2)>0`} />. Die Differenz
          zwischen Integral und f′(1) ist{' '}
          <InlineMath
            math={String.raw`${data.a}(${data.c}-1)=${data.a * (data.c - 1)}`}
          />
          . Für den verbleibenden Vergleich genügt 2 &lt; e &lt; 3.
        </p>
        <p>
          <InlineMath
            math={items
              .map(
                (item, i) =>
                  item.s +
                  (i < 2
                    ? Math.abs(item.v - items[i + 1].v) < 1e-9
                      ? '='
                      : '<'
                    : ''),
              )
              .join('')}
          />
        </p>
      </>
    )
  },
}
