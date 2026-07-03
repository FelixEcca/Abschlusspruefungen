// exercise9605.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'noten' | 'temperaturen' | 'punkte' | 'zeiten'

interface DATA {
  kontext: Kontext
  values: number[]
  sum: number
  mean: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'temperaturen') {
    return {
      intro: 'Die Temperaturen einer Woche wurden notiert:',
      unit: '°C',
      question: 'Berechnen Sie die Durchschnittstemperatur.',
    }
  }

  if (data.kontext === 'punkte') {
    return {
      intro: 'In mehreren Tests wurden diese Punkte erreicht:',
      unit: 'Punkte',
      question: 'Berechnen Sie den Durchschnitt.',
    }
  }

  if (data.kontext === 'zeiten') {
    return {
      intro: 'Die Arbeitszeiten wurden notiert:',
      unit: 'h',
      question: 'Berechnen Sie die durchschnittliche Arbeitszeit.',
    }
  }

  return {
    intro: 'Folgende Noten wurden erreicht:',
    unit: '',
    question: 'Berechnen Sie den Notendurchschnitt.',
  }
}

export const exercise9605: Exercise<DATA> = {
  title: 'Mittelwert berechnen',
  source: 'Diagramme und Daten',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'noten',
      'temperaturen',
      'punkte',
      'zeiten',
    ])

    const count = rng.randomItemFromArray([4, 5, 6])
    const values =
      kontext === 'noten'
        ? Array.from({ length: count }, () => rng.randomIntBetween(1, 6))
        : kontext === 'temperaturen'
          ? Array.from({ length: count }, () => rng.randomIntBetween(-5, 30))
          : kontext === 'zeiten'
            ? Array.from({ length: count }, () =>
                rng.randomItemFromArray([2, 2.5, 3, 3.5, 4, 4.5, 5]),
              )
            : Array.from({ length: count }, () => rng.randomIntBetween(5, 30))

    const sum = values.reduce((a, b) => a + b, 0)
    const mean = round2(sum / values.length)

    return { kontext, values, sum, mean }
  },

  originalData: {
    kontext: 'punkte',
    values: [12, 15, 18, 20, 25],
    sum: 90,
    mean: 18,
  },

  constraint({ data }) {
    return data.values.length > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.intro}</p>
        <p>
          {data.values.map((v, i) => (
            <span key={i}>
              {pp(v)} {context.unit}
              {i < data.values.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
        <p>{context.question}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>Zuerst werden alle Werte addiert.</p>
        <InlineMath
          math={`${data.values.map(v => pp(v)).join('+')}=${pp(data.sum)}`}
        />

        <p>Dann wird durch die Anzahl der Werte geteilt.</p>
        <InlineMath
          math={`${pp(data.sum)}:${data.values.length}=${pp(data.mean)}`}
        />

        <p>
          Der Mittelwert ist{' '}
          <b>
            {pp(data.mean)} {context.unit}
          </b>
          .
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/do79J-0JhqQ"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
