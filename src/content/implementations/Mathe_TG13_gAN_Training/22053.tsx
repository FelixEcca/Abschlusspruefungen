import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  red: number
  blue: number
  extra: number
  variant: number
}
export const exercise22053: Exercise<DATA> = {
  title:
    'Eine unbekannte Kugel- oder Jokerzahl aus einer Wahrscheinlichkeit bestimmen',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      red: rng.randomIntBetween(2, 5),
      blue: rng.randomIntBetween(3, 7),
      extra: rng.randomIntBetween(1, 6),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { red: 3, blue: 5, extra: 2, variant: 0 },
  task({ data }) {
    return (
      <>
        {data.variant === 0 ? (
          <p>
            Zu {data.red} roten und {data.blue} blauen Kugeln werden nur rote
            Kugeln hinzugefügt. Danach beträgt die Wahrscheinlichkeit für rot{' '}
            <InlineMath
              math={frac(
                data.red + data.extra,
                data.red + data.blue + data.extra,
              )}
            />
            . Wie viele Kugeln wurden hinzugefügt?
          </p>
        ) : (
          <p>
            Ein Stapel besteht aus vier Assen und n Jokern. Die
            Wahrscheinlichkeit für zwei Asse bei zweimaligem Ziehen ohne
            Zurücklegen ist{' '}
            <InlineMath math={frac(12, (data.extra + 4) * (data.extra + 3))} />.
            Bestimmen Sie n.
          </p>
        )}
      </>
    )
  },
  solution({ data }) {
    return data.variant === 0 ? (
      <>
        <p>Mit x zusätzlichen roten Kugeln wachsen Zähler und Nenner um x:</p>
        <p>
          <InlineMath
            math={String.raw`\frac{${data.red}+x}{${data.red + data.blue}+x}=${frac(data.red + data.extra, data.red + data.blue + data.extra)}`}
          />
          .
        </p>
        <p>
          Kreuzmultiplikation mit den ungekürzten Verhältnissen liefert{' '}
          <InlineMath
            math={String.raw`${data.blue}x=${data.blue * data.extra}\Rightarrow x=${data.extra}`}
          />
          . Das Einsetzen bestätigt die Wahrscheinlichkeit.
        </p>
      </>
    ) : (
      <>
        <p>
          <InlineMath
            math={String.raw`\frac4{n+4}\frac3{n+3}=\frac{12}{${(data.extra + 4) * (data.extra + 3)}}`}
          />
          . Nach Kürzen der 12 und Kreuzmultiplikation gilt{' '}
          <InlineMath
            math={String.raw`(n+4)(n+3)=${(data.extra + 4) * (data.extra + 3)}`}
          />
          .
        </p>
        <p>
          Umformen und Faktorisieren liefert{' '}
          <InlineMath
            math={String.raw`(n-${data.extra})(n+${data.extra + 7})=0`}
          />
          . Nur <InlineMath math={String.raw`n=${data.extra}`} /> ist eine nicht
          negative Kartenanzahl. Die zweite Lösung ist negativ und unzulässig.
        </p>
      </>
    )
  },
}
