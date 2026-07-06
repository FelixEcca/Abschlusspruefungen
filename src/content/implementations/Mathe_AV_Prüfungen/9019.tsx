// exercise9019.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext =
  | 'solarmodule'
  | 'zaun'
  | 'stuehle'
  | 'malerarbeiten'
  | 'aufraeumen'

interface DATA {
  kontext: Kontext
  workers1: number
  hours1: number
  extra: number
  workers2: number
  hours2: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'zaun') {
    return {
      sentence1: (
        <>
          {data.workers1} Schüler brauchen für das Streichen eines Zauns{' '}
          {pp(data.hours1)} Stunden.
        </>
      ),
      sentence2: (
        <>
          Berechnen Sie, wie lange die Schüler brauchen, wenn ihnen noch{' '}
          {data.extra} weitere Schüler helfen.
        </>
      ),
      result: 'Schüler brauchen',
      einheit: 'Schüler',
    }
  }

  if (data.kontext === 'stuehle') {
    return {
      sentence1: (
        <>
          {data.workers1} Helfer brauchen für das Aufstellen der Stühle{' '}
          {pp(data.hours1)} Stunden.
        </>
      ),
      sentence2: (
        <>
          Berechnen Sie, wie lange die Helfer brauchen, wenn noch {data.extra}{' '}
          weitere Helfer dazukommen.
        </>
      ),
      result: 'Helfer brauchen',
      einheit: 'Helfer',
    }
  }

  if (data.kontext === 'malerarbeiten') {
    return {
      sentence1: (
        <>
          {data.workers1} Personen brauchen für Malerarbeiten {pp(data.hours1)}{' '}
          Stunden.
        </>
      ),
      sentence2: (
        <>
          Berechnen Sie, wie lange die Personen brauchen, wenn noch {data.extra}{' '}
          weitere Personen mitarbeiten.
        </>
      ),
      result: 'Personen brauchen',
      einheit: 'Personen',
    }
  }

  if (data.kontext === 'aufraeumen') {
    return {
      sentence1: (
        <>
          {data.workers1} Schülerinnen und Schüler brauchen für das Aufräumen{' '}
          {pp(data.hours1)} Stunden.
        </>
      ),
      sentence2: (
        <>
          Berechnen Sie, wie lange sie brauchen, wenn noch {data.extra} weitere
          Schülerinnen und Schüler helfen.
        </>
      ),
      result: 'Sie brauchen',
      einheit: 'Schüler',
    }
  }

  return {
    sentence1: (
      <>
        {data.workers1} Schüler brauchen für das Anbringen der Solarmodule{' '}
        {pp(data.hours1)} Stunden.
      </>
    ),
    sentence2: (
      <>
        Berechnen Sie, wie lange die Schüler brauchen, wenn ihnen noch{' '}
        {data.extra} weitere Schüler helfen.
      </>
    ),
    result: 'Die Schüler brauchen',
    einheit: 'Schüler',
  }
}

export const exercise9019: Exercise<DATA> = {
  title: 'Teil 2: Arbeitszeit berechnen',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'solarmodule',
      'zaun',
      'stuehle',
      'malerarbeiten',
      'aufraeumen',
    ])

    const workers1 = rng.randomItemFromArray([2, 3, 4])
    const hours1 = rng.randomItemFromArray([4, 5, 6, 7, 8])
    const extra = rng.randomItemFromArray([2, 3, 4, 5])
    const workers2 = workers1 + extra
    const hours2 = round2((workers1 * hours1) / workers2)

    return { kontext, workers1, hours1, extra, workers2, hours2 }
  },

  originalData: {
    kontext: 'solarmodule',
    workers1: 2,
    hours1: 5,
    extra: 3,
    workers2: 5,
    hours2: 2,
  },

  constraint({ data }) {
    return data.hours2 > 0 && data.workers2 === data.workers1 + data.extra
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.sentence1}</p>
        <p>{context.sentence2}</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data)
    const totalWork = data.workers1 * data.hours1

    return (
      <>
        <p>
          Berechne mit dem umgekehrten Dreisatz wie lange die {data.workers2}{' '}
          {context.einheit} für die Arbeit brauchen:
        </p>

        <svg viewBox="0 0 328 185">
          <image
            href="/content/Mathe_AV/Dreisatz.PNG"
            height="185"
            width="328"
          />

          <text x="120" y="12" fontSize="15" textAnchor="middle">
            {context.einheit}
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            h
          </text>

          {/* obere Zeile */}
          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {data.workers1}
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.hours1)} h
          </text>

          {/* mittlere Zeile */}
          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(totalWork)} h
          </text>

          {/* untere Zeile */}
          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {data.workers2}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.hours2)} h
          </text>

          {/* Rechenpfeile links */}
          <text x="24" y="72" fontSize="14">
            : {data.workers1}
          </text>
          <text x="22" y="123" fontSize="14">
            · {data.workers2}
          </text>

          {/* Rechenpfeile rechts beim umgekehrten Dreisatz */}
          <text x="286" y="72" fontSize="14">
            · {data.workers1}
          </text>
          <text x="284" y="123" fontSize="14">
            : {data.workers2}
          </text>
        </svg>

        <p>
          {data.workers2} {context.result} <b>{pp(data.hours2)} Stunden</b>.
        </p>

        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum umgekehrten Dreisatz:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/ISGhREON0T4"
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
