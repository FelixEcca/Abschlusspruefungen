import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'
import { Solid } from './diagrams'

interface DATA {
  a: number
  b: number
  h: number
  variant: number
}
export const exercise22073: Exercise<DATA> = {
  title: 'Prismenvolumen oder Pyramidenhöhe aus einer Skizze bestimmen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: 2 * rng.randomIntBetween(1, 4),
      b: 3 * rng.randomIntBetween(1, 3),
      h: 3 * rng.randomIntBetween(1, 4),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { a: 4, b: 6, h: 3, variant: 0 },
  task({ data }) {
    return (
      <>
        <p>
          Die Grundfläche ist ein rechtwinkliges Dreieck mit Kathetenlängen{' '}
          {data.a} cm und {data.b} cm.{' '}
          {data.variant === 0 ? (
            <>
              Das gerade Prisma hat die Höhe {data.h} cm. Berechnen Sie sein
              Volumen.
            </>
          ) : (
            <>
              Die Pyramide hat das Volumen {(data.a * data.b * data.h) / 6} cm³.
              Berechnen Sie ihre senkrechte Höhe.
            </>
          )}
        </p>
        <Solid
          kind={data.variant === 0 ? 'prism' : 'pyramid'}
          a={data.a}
          b={data.b}
          h={data.variant === 0 ? String(data.h) + ' cm' : ''}
        />
      </>
    )
  },
  solution({ data }) {
    const base = (data.a * data.b) / 2,
      volume = (base * data.h) / 3
    return (
      <>
        <p>
          Für das rechtwinklige Grunddreieck gilt{' '}
          <InlineMath
            math={String.raw`G=\frac12\cdot${data.a}\cdot${data.b}=${base}\,\mathrm{cm}^2`}
          />
          .
        </p>
        <p>
          {data.variant === 0 ? (
            <InlineMath
              math={String.raw`V=G\cdot h=${base}\cdot${data.h}=${base * data.h}\,\mathrm{cm}^3`}
            />
          ) : (
            <InlineMath
              math={String.raw`V=\frac13Gh\quad\Rightarrow\quad h=\frac{3V}{G}=\frac{3\cdot${volume}}{${base}}=${data.h}\,\mathrm{cm}`}
            />
          )}
        </p>
        <p>
          {data.variant === 0
            ? 'Beim Prisma wird die Grundfläche mit der senkrechten Körperhöhe multipliziert.'
            : 'Der Faktor 1/3 gehört zur Pyramide und darf beim Umstellen nicht verloren gehen.'}
        </p>
      </>
    )
  },
}
