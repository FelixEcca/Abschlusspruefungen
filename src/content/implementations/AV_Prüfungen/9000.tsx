import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'klassenkasse' | 'vereinskasse' | 'ausflugskasse' | 'projektkasse'

interface DATA {
  kontext: Kontext
  startbetrag: number
  betrag1: number
  betrag2: number
  gesamt: number
}

function getContext(data: DATA) {
  if (data.kontext === 'klassenkasse') {
    return {
      start: (
        <>
          In Ihrer Klassenkasse sind {pp(data.startbetrag)} €.
        </>
      ),
      plus1: (
        <>
          Die Eltern spenden der Klasse {pp(data.betrag1)} €.
        </>
      ),
      plus2: (
        <>
          Vom Förderverein der Schule erhalten Sie {pp(data.betrag2)} €.
        </>
      ),
      frage: 'Berechnen Sie, wie viel Geld nun in der Klassenkasse ist.',
      ort: 'in der Klassenkasse',
    }
  }

  if (data.kontext === 'vereinskasse') {
    return {
      start: (
        <>
          In der Vereinskasse sind {pp(data.startbetrag)} €.
        </>
      ),
      plus1: (
        <>
          Bei einem Kuchenverkauf nimmt der Verein {pp(data.betrag1)} € ein.
        </>
      ),
      plus2: (
        <>
          Durch Spenden kommen weitere {pp(data.betrag2)} € hinzu.
        </>
      ),
      frage: 'Berechnen Sie, wie viel Geld nun in der Vereinskasse ist.',
      ort: 'in der Vereinskasse',
    }
  }

  if (data.kontext === 'ausflugskasse') {
    return {
      start: (
        <>
          In der Ausflugskasse sind {pp(data.startbetrag)} €.
        </>
      ),
      plus1: (
        <>
          Die Klasse sammelt zusätzlich {pp(data.betrag1)} € ein.
        </>
      ),
      plus2: (
        <>
          Die Schule unterstützt den Ausflug mit {pp(data.betrag2)} €.
        </>
      ),
      frage: 'Berechnen Sie, wie viel Geld nun in der Ausflugskasse ist.',
      ort: 'in der Ausflugskasse',
    }
  }

  return {
    start: (
      <>
        Für ein Schulprojekt sind bereits {pp(data.startbetrag)} € vorhanden.
      </>
    ),
    plus1: (
      <>
        Ein Sponsor gibt weitere {pp(data.betrag1)} € dazu.
      </>
    ),
    plus2: (
      <>
        Durch eine Aktion werden zusätzlich {pp(data.betrag2)} € eingenommen.
      </>
    ),
    frage: 'Berechnen Sie, wie viel Geld nun für das Schulprojekt vorhanden ist.',
    ort: 'für das Schulprojekt',
  }
}

export const exercise9000: Exercise<DATA> = {
  title: 'Teil 1: Geldbeträge',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'klassenkasse',
      'vereinskasse',
      'ausflugskasse',
      'projektkasse',
    ])

    const startbetrag = rng.randomIntBetween(50, 250)
    const betrag1 = rng.randomIntBetween(50, 500)
    const betrag2 = rng.randomIntBetween(25, 200)
    const gesamt = startbetrag + betrag1 + betrag2

    return { kontext, startbetrag, betrag1, betrag2, gesamt }
  },

  originalData: {
    kontext: 'klassenkasse',
    startbetrag: 150,
    betrag1: 337,
    betrag2: 75,
    gesamt: 562,
  },

  constraint({ data }) {
    return (
      data.startbetrag > 0 &&
      data.betrag1 > 0 &&
      data.betrag2 > 0 &&
      data.gesamt === data.startbetrag + data.betrag1 + data.betrag2
    )
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.start}</p>
        <p>{context.plus1}</p>
        <p>{context.plus2}</p>
        <p>{context.frage}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>Die Geldbeträge werden addiert.</p>
        <InlineMath
          math={`${pp(data.startbetrag)} + ${pp(data.betrag1)} + ${pp(
            data.betrag2,
          )} = ${pp(data.gesamt)}`}
        />
        <p>
          Es sind nun <b>{pp(data.gesamt)} €</b> {context.ort}.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum schriftlichen Addieren:</p>
         <div className="my-4">
        <iframe
          width="100%"
          height="220"
          src="https://www.youtube.com/embed/tEBKFoD9LeI"
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