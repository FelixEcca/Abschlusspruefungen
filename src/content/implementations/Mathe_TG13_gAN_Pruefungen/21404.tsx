import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { ProbabilityTree } from './diagrams'
import { frac } from './math'
import { pp } from '@/helper/pretty-print'

interface DATA {
  share: number
  lateA: number
  lateOther: number
}

export const exercise21404: Exercise<DATA> = {
  title: 'Stochastik: Verspätete Lieferungen und bedingte Wahrscheinlichkeit',
  source: '2026 Teil A Aufgabe 4 – Auswahl II',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    share: 10 * rng.randomIntBetween(2, 6),
    lateA: 10 * rng.randomIntBetween(1, 4),
    lateOther: 10 * rng.randomIntBetween(1, 5),
  }),
  originalData: { share: 40, lateA: 20, lateOther: 30 },
  intro: ({ data: d }) => (
    <>
      <p>
        Ein Onlinehändler verschickt {d.share} % seiner Sendungen mit
        Unternehmen A. {pp((d.share * d.lateA) / 100)} % aller Sendungen werden
        mit A verschickt und verspätet zugestellt. Von den Sendungen, die nicht
        mit A verschickt werden, kommen {d.lateOther} % verspätet an.
      </p>
      <p>
        V bedeutet „verspätet“, p bedeutet „pünktlich“. Die Angaben an den Enden
        geben Anteile an allen Sendungen an.
      </p>
      <ProbabilityTree
        first={[
          { label: 'A', probability: `${d.share} %` },
          { label: 'nicht A', probability: `${100 - d.share} %` },
        ]}
        second={[
          [
            {
              label: `V (${pp((d.share * d.lateA) / 100)} %)`,
              probability: 'x',
            },
            { label: 'p', probability: '1 − x' },
          ],
          [
            { label: 'V (y)', probability: `${d.lateOther} %` },
            { label: 'p', probability: `${100 - d.lateOther} %` },
          ],
        ]}
      />
    </>
  ),
  tasks: [
    {
      points: 3,
      task: ({ data: d }) => (
        <p>
          Ermitteln Sie den Anteil x und weisen Sie nach, dass{' '}
          <InlineMath
            math={String.raw`y=${pp(((100 - d.share) * d.lateOther) / 100)}\,\%`}
          />{' '}
          gilt.
        </p>
      ),
      solution: ({ data: d }) => (
        <>
          <p>
            x ist eine bedingte Wahrscheinlichkeit, während der im Text genannte
            gemeinsame Anteil auf alle Sendungen bezogen ist:
          </p>
          <p>
            <InlineMath
              math={String.raw`x=P(V\mid A)=\frac{P(A\cap V)}{P(A)}=\frac{${pp((d.share * d.lateA) / 100)}}{${d.share}}=${frac(d.lateA, 100)}`}
            />
            , also {d.lateA} %.
          </p>
          <p>
            <InlineMath
              math={String.raw`y=P(\overline A\cap V)=\frac{${100 - d.share}}{100}\cdot\frac{${d.lateOther}}{100}=${frac((100 - d.share) * d.lateOther, 10000)}`}
            />
            , also {pp(((100 - d.share) * d.lateOther) / 100)} % aller
            Sendungen.
          </p>
        </>
      ),
    },
    {
      points: 2,
      task: () => (
        <p>
          Eine zufällig ausgewählte Sendung ist verspätet. Untersuchen Sie, ob
          die Wahrscheinlichkeit, dass sie nicht mit A verschickt wurde, größer
          als 50 % ist.
        </p>
      ),
      solution: ({ data: d }) => {
        const a = d.share * d.lateA,
          b = (100 - d.share) * d.lateOther
        return (
          <>
            <p>Unter den verspäteten Sendungen ist der gesuchte Anteil</p>
            <p>
              <InlineMath
                math={String.raw`P(\overline A\mid V)=\frac{P(\overline A\cap V)}{P(A\cap V)+P(\overline A\cap V)}=\frac{${pp(b / 100)}}{${pp(a / 100)}+${pp(b / 100)}}=${frac(b, a + b)}`}
              />
              .
            </p>
            <p>
              {b > a
                ? 'Ja, der Anteil ist größer als 50 %'
                : b === a
                  ? 'Nein, der Anteil ist genau 50 %'
                  : 'Nein, der Anteil ist kleiner als 50 %'}
              , denn der gemeinsame Anteil verspäteter Sendungen ohne A ist{' '}
              {b > a
                ? 'größer als'
                : b === a
                  ? 'genauso groß wie'
                  : 'kleiner als'}{' '}
              der entsprechende Anteil mit A.
            </p>
          </>
        )
      },
    },
  ],
}
