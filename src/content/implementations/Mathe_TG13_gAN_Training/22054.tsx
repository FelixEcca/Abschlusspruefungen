import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  inner: number
  factor: number
  angle: number
  variant: number
}
export const exercise22054: Exercise<DATA> = {
  title: 'Flächenanteile und Sektorwinkel als Wahrscheinlichkeiten deuten',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      inner: rng.randomIntBetween(1, 4),
      factor: rng.randomIntBetween(2, 4),
      angle: rng.randomItemFromArray([30, 45, 60, 72, 90, 120, 150]),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { inner: 2, factor: 2, angle: 90, variant: 0 },
  task({ data }) {
    return data.variant === 0 ? (
      <>
        <p>
          Ein Punkt trifft eine Kreisscheibe überall gleich wahrscheinlich. Der
          äußere Radius ist {data.inner * data.factor}, der innere Radius{' '}
          {data.inner}. Wie groß ist die Wahrscheinlichkeit, den blau markierten
          Kreisring zu treffen?
        </p>
        <svg
          viewBox="0 0 300 245"
          className="my-3 w-full"
          role="img"
          aria-label="Kreisring mit unmarkiertem inneren Kreis"
        >
          <circle cx="140" cy="115" r="100" fill="#bfdbfe" stroke="#334155" />
          <circle
            cx="140"
            cy="115"
            r={100 / data.factor}
            fill="white"
            stroke="#334155"
          />
          <path d="M140 115H240" stroke="#334155" />
          <text x="142" y="138" fontSize="12">
            r = {data.inner}
          </text>
          <text x="204" y="106" fontSize="12">
            R = {data.inner * data.factor}
          </text>
        </svg>
      </>
    ) : (
      <p>
        Die Trefferwahrscheinlichkeit des roten Sektors eines gleichmäßig
        drehenden Glücksrads beträgt <InlineMath math={frac(data.angle, 360)} />
        . Bestimmen Sie den Mittelpunktswinkel des Sektors.
      </p>
    )
  },
  solution({ data }) {
    return data.variant === 0 ? (
      <>
        <p>
          Beim Kreisring muss die innere Kreisfläche abgezogen werden. Geteilt
          wird durch die gesamte äußere Kreisfläche.
        </p>
        <p>
          <InlineMath
            math={String.raw`P=\frac{\pi\cdot${data.inner * data.factor}^2-\pi\cdot${data.inner}^2}{\pi\cdot${data.inner * data.factor}^2}=${frac(data.factor ** 2 - 1, data.factor ** 2)}`}
          />
          .
        </p>
        <p>
          Das Verhältnis der Radien allein wäre nicht richtig; Kreisflächen
          wachsen mit dem Quadrat des Radius.
        </p>
      </>
    ) : (
      <p>
        Der Anteil am Vollkreis entspricht der Wahrscheinlichkeit:{' '}
        <InlineMath
          math={String.raw`\alpha=360^\circ\cdot${frac(data.angle, 360)}=${data.angle}^\circ`}
        />
        .
      </p>
    )
  },
}
