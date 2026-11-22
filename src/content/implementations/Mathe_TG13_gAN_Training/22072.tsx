import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  length: number
  scale: number
  variant: number
}
export const exercise22072: Exercise<DATA> = {
  title: 'Längenfaktor und Flächenfaktor unterscheiden',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      length: rng.randomIntBetween(2, 8),
      scale: rng.randomIntBetween(2, 5),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { length: 3, scale: 2, variant: 0 },
  task({ data }) {
    return (
      <p>
        {data.variant === 0 ? (
          <>
            Eine Figur wird ähnlich vergrößert. Ihr Flächeninhalt wächst um den
            Faktor {data.scale ** 2}. Eine ursprüngliche Seite ist {data.length}{' '}
            cm lang. Wie lang ist sie danach?
          </>
        ) : (
          <>
            Alle Seitenlängen einer Figur werden mit{' '}
            <InlineMath math={String.raw`\sqrt{${data.scale + 1}}`} />{' '}
            multipliziert. Um welchen Faktor wächst ihr Flächeninhalt?
          </>
        )}
      </p>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Bei einer ähnlichen Vergrößerung gilt{' '}
          <InlineMath
            math={String.raw`\text{Flächenfaktor}=(\text{Längenfaktor})^2`}
          />
          .
        </p>
        <p>
          {data.variant === 0 ? (
            <>
              Der Längenfaktor ist{' '}
              <InlineMath
                math={String.raw`\sqrt{${data.scale ** 2}}=${data.scale}`}
              />
              . Die neue Seitenlänge ist{' '}
              <InlineMath
                math={String.raw`${data.length}\cdot${data.scale}=${data.length * data.scale}`}
              />{' '}
              cm.
            </>
          ) : (
            <>
              Der Flächenfaktor ist{' '}
              <InlineMath
                math={String.raw`(\sqrt{${data.scale + 1}})^2=${data.scale + 1}`}
              />
              .
            </>
          )}
        </p>
      </>
    )
  },
}
