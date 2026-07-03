// exercise9032.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'Musikanlage' | 'Fahrrad' | 'Computer' | 'Fernseher'

interface DATA {
  kontext: Kontext
  price: number
  wage: number
  hours: number
}

export const exercise9032: Exercise<DATA> = {
  title: 'Teil 1: Arbeitsstunden berechnen',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'Musikanlage',
      'Fahrrad',
      'Computer',
      'Fernseher',
    ])

    const wage = rng.randomItemFromArray([12, 15, 18, 20])
    const hours = rng.randomItemFromArray([40, 60, 80, 100])
    const price = wage * hours

    return { kontext, price, wage, hours }
  },

  originalData: {
    kontext: 'Musikanlage',
    price: 1800,
    wage: 15,
    hours: 120,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Sie möchten{' '}
          {data.kontext === 'Musikanlage'
            ? 'eine neue'
            : data.kontext === 'Fahrrad'
              ? 'ein neues'
              : 'einen neuen'}{' '}
          {data.kontext} für {pp(data.price)} € kaufen.
        </p>

        <p>Bei einem Nebenjob bekommen Sie {pp(data.wage)} € pro Stunde.</p>

        <p>Berechnen Sie, wie viele Stunden Sie dafür arbeiten müssen.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Der Gesamtpreis wird durch den Stundenlohn geteilt:</p>

        <InlineMath math={`${pp(data.price)}:${pp(data.wage)}=${data.hours}`} />

        <p>
          Sie müssen <b>{data.hours} Stunden</b> arbeiten.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/2A-9_-GCXrA"
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
