// exercise9031.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

type Kontext = 'arbeit' | 'ferienjob' | 'gartenarbeit' | 'werkstatt'

interface DATA {
  kontext: Kontext
  hours1: number
  money1: number
  hours2: number
  result: number
}

export const exercise9031: Exercise<DATA> = {
  title: 'Teil 1: Lohn berechnen',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'arbeit',
      'ferienjob',
      'gartenarbeit',
      'werkstatt',
    ])

    const hours1 = rng.randomItemFromArray([20, 30, 40, 50])
    const money1 = rng.randomItemFromArray([240, 360, 480, 600])
    const hours2 = rng.randomItemFromArray([45, 50, 60, 70])

    const result = (money1 / hours1) * hours2

    return { kontext, hours1, money1, hours2, result }
  },

  originalData: {
    kontext: 'arbeit',
    hours1: 40,
    money1: 480,
    hours2: 60,
    result: 720,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Für {data.hours1} Arbeitsstunden bekommen Sie {pp(data.money1)} €.
        </p>

        <p>
          Berechnen Sie, wie viel Sie für {data.hours2} Arbeitsstunden bekommen
          würden.
        </p>
      </>
    )
  },

  solution({ data }) {
    const one = data.money1 / data.hours1

    return (
      <>
        <p>Berechne mit dem Dreisatz:</p>

        <svg viewBox="0 0 328 185">
          <image
            href="/content/AV_Prüfungen/Dreisatz.PNG"
            height="185"
            width="328"
          />
          <text x="120" y="12" fontSize="15" textAnchor="middle">
            Stunden
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            €
          </text>

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {data.hours1}
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.money1)} €
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(one)} €
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {data.hours2}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.result)} €
          </text>

          <text x="24" y="72" fontSize="14">
            : {data.hours1}
          </text>
          <text x="22" y="123" fontSize="14">
            · {data.hours2}
          </text>

          <text x="286" y="72" fontSize="14">
            : {data.hours1}
          </text>
          <text x="284" y="123" fontSize="14">
            · {data.hours2}
          </text>
        </svg>

        <p>
          Sie erhalten <b>{pp(data.result)} €</b>.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/IXCWLXdv6YQ"
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
