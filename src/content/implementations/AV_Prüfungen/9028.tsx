// exercise9028.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'schokoriegel' | 'brötchen' | 'getränke' | 'muffins'

interface DATA {
  kontext: Kontext
  count: number
  priceCent: number
  totalEuro: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'brötchen') {
    return `In der Bäckerei kaufen Sie ${data.count} Brötchen. Ein Brötchen kostet ${data.priceCent} Cent.`
  }

  if (data.kontext === 'getränke') {
    return `Sie kaufen ${data.count} Getränke. Ein Getränk kostet ${data.priceCent} Cent.`
  }

  if (data.kontext === 'muffins') {
    return `Sie kaufen ${data.count} Muffins. Ein Muffin kostet ${data.priceCent} Cent.`
  }

  return `Im Süßwarenladen kaufen Sie ${data.count} Schokoladenriegel. Ein Riegel kostet ${data.priceCent} Cent.`
}

export const exercise9028: Exercise<DATA> = {
  title: 'Teil 1: Gesamtpreis in Euro',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'schokoriegel',
      'brötchen',
      'getränke',
      'muffins',
    ])
    const count = rng.randomItemFromArray([12, 24, 36, 48, 60, 72])
    const priceCent = rng.randomItemFromArray([35, 45, 50, 55, 60, 75, 90])
    const totalEuro = round2((count * priceCent) / 100)

    return { kontext, count, priceCent, totalEuro }
  },

  originalData: {
    kontext: 'schokoriegel',
    count: 48,
    priceCent: 55,
    totalEuro: 26.4,
  },

  constraint({ data }) {
    return data.totalEuro > 0
  },

  task({ data }) {
    return (
      <>
        <p>{getContext(data)}</p>
        <p>Berechnen Sie den Gesamtpreis in Euro.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird der Preis in Cent berechnet:</p>
        <InlineMath
          math={`${data.count}\\cdot ${data.priceCent}=${data.count * data.priceCent}\\,\\mathrm{ct}`}
        />
        <p>Dann wird in Euro umgerechnet:</p>
        <InlineMath
          math={`${data.count * data.priceCent}\\,\\mathrm{ct}=${pp(
            data.totalEuro,
          )}\\,€`}
        />
        <p>
          Der Gesamtpreis beträgt <b>{pp(data.totalEuro)} €</b>.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/MZQSGKKCioU"
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
