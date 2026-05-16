// exercise9015.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  total: number
  z: number
  k: number
  ka: number
  w: number
}

export const exercise9015: Exercise<DATA> = {
  title: 'Teil 2: Rezept',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    return {
      total: rng.randomItemFromArray([8, 10, 12, 15, 18, 20]),
      z: rng.randomIntBetween(1, 4),
      k: rng.randomIntBetween(6, 12),
      ka: rng.randomIntBetween(3, 8),
      w: rng.randomIntBetween(5, 10),
    }
  },

  originalData: { total: 12, z: 1, k: 10, ka: 5, w: 8 },

  constraint({ data }) {
    return data.z + data.k + data.ka + data.w > 0
  },

  task({ data }) {
    return (
      <>
        <p>An einem Abend soll ein Essen zubereitet werden.</p>
        <p>
          Sie kochen einen Gemüsetopf und benötigen insgesamt {pp(data.total)}{' '}
          kg davon. Laut Rezept brauchen Sie:
        </p>
        <p>
          {data.z} Teil Zwiebeln
          <br />
          {data.k} Teile Kartoffeln
          <br />
          {data.ka} Teile Karotten
          <br />
          {data.w} Teile Wasser
        </p>
        <p>Berechnen Sie, wie viel Kilogramm Sie von jeder Zutat brauchen.</p>
      </>
    )
  },

  solution({ data }) {
    const sum = data.z + data.k + data.ka + data.w
    const one = data.total / sum
    return (
      <>
        <p>Alle Teile zusammen:</p>
        <InlineMath math={`${data.z}+${data.k}+${data.ka}+${data.w}=${sum}`} />
        <p>Berechne jeweils den Anteil:</p>

        <p>
          {data.z} Teile Zwiebeln:{' '}
          <InlineMath
            math={`${pp(data.total)} \\cdot \\frac{${data.z}}{${sum}} \\approx ${pp(Math.round(one * data.z * 100) / 100)} \\text{ kg}`}
          />
          <br />
          {data.k} Teile Kartoffeln:{' '}
          <InlineMath
            math={`${pp(data.total)} \\cdot \\frac{${data.k}}{${sum}} \\approx ${pp(Math.round(one * data.k * 100) / 100)} \\text{ kg}`}
          />
          <br />
          {data.ka} Teile Karotten:{' '}
          <InlineMath
            math={`${pp(data.total)} \\cdot \\frac{${data.ka}}{${sum}} \\approx ${pp(Math.round(one * data.ka * 100) / 100)} \\text{ kg}`}
          />
          <br />
          {data.w} Teile Wasser:{' '}
          <InlineMath
            math={`${pp(data.total)} \\cdot \\frac{${data.w}}{${sum}} \\approx ${pp(Math.round(one * data.w * 100) / 100)} \\text{ kg}`}
          />
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum Berechnen von Anteilen:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/I6-yuR1jurc"
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
