import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { ProbabilityTree } from './diagrams'
interface DATA {
  young: number
  fanYoung: number
  fanOld: number
  age?: number
  brand?: number
}
const brands = [
  'Sportartikelmarke',
  'Fahrradmarke',
  'Elektronikmarke',
  'Bekleidungsmarke',
  'Automarke',
]
export const exercise21201: Exercise<DATA> = {
  title: 'Stochastik: Markenbeliebtheit und bedingte Wahrscheinlichkeit',
  source: '2024 Pflichtteil Aufgabe 2',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    young: 5 * rng.randomIntBetween(3, 15),
    fanYoung: 5 * rng.randomIntBetween(2, 16),
    fanOld: 5 * rng.randomIntBetween(2, 16),
    age: rng.randomItemFromArray([18, 20, 25, 30, 40]),
    brand: rng.randomIntBetween(0, brands.length - 1),
  }),
  originalData: { young: 30, fanYoung: 40, fanOld: 65 },
  intro: ({ data: d }) => (
    <p>
      Eine große {brands[d.brand ?? 0]} untersucht ihre Beliebtheit in
      verschiedenen Altersgruppen. Von den Befragten unter {d.age ?? 20} Jahren
      sind {d.fanYoung} % Fans. Unter den mindestens {d.age ?? 20} Jahre alten
      Befragten sind {d.fanOld} % Fans. Insgesamt sind {d.young} % der Befragten
      unter {d.age ?? 20} Jahre alt.
    </p>
  ),
  tasks: [
    {
      points: 3,
      task: () => (
        <p>
          Stellen Sie die Situation in einem vollständig beschrifteten
          Baumdiagramm dar.
        </p>
      ),
      solution: ({ data: d }) => (
        <>
          <p>
            U: unter {d.age ?? 20}; Ä: mindestens {d.age ?? 20}; F: Fan; N: kein
            Fan.
          </p>
          <ProbabilityTree
            first={[
              { label: 'U', probability: pp(d.young / 100) },
              { label: 'Ä', probability: pp(1 - d.young / 100) },
            ]}
            second={[
              [
                { label: 'F', probability: pp(d.fanYoung / 100) },
                { label: 'N', probability: pp(1 - d.fanYoung / 100) },
              ],
              [
                { label: 'F', probability: pp(d.fanOld / 100) },
                { label: 'N', probability: pp(1 - d.fanOld / 100) },
              ],
            ]}
          />
        </>
      ),
    },
    {
      points: 2,
      task: ({ data: d }) => (
        <p>
          Geben Sie eine Frage im Sachzusammenhang an, die mit{' '}
          <InlineMath
            math={String.raw`\frac{${pp(1 - d.young / 100)}\cdot${pp(d.fanOld / 100)}}{${pp(d.young / 100)}\cdot${pp(d.fanYoung / 100)}+${pp(1 - d.young / 100)}\cdot${pp(d.fanOld / 100)}}`}
          />{' '}
          beantwortet werden kann.
        </p>
      ),
      solution: ({ data: d }) => (
        <p>
          Wie groß ist die Wahrscheinlichkeit, dass eine zufällig ausgewählte
          Person mindestens {d.age ?? 20} Jahre alt ist, wenn bekannt ist, dass
          sie Fan dieser Marke ist? Der Zähler erfasst ältere Fans, der Nenner
          alle Fans.
        </p>
      ),
    },
  ],
}
