import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  index: number
}

// Fragen-Pool: beliebig erweiterbar
const QUESTIONS: { question: JSX.Element; answer: JSX.Element }[] = [
  {
    question: (
      <>
        Was versteht man unter einer <b>gleichförmigen Bewegung</b>?
      </>
    ),
    answer: (
      <>
        Bei einer gleichförmigen Bewegung ist die Geschwindigkeit{' '}
        <InlineMath math="v" /> konstant. In gleichen Zeitabschnitten werden
        gleiche Strecken zurückgelegt.
      </>
    ),
  },
  {
    question: (
      <>
        Steigt die zurückgelegte Strecke bei einer{' '}
        <b>gleichmäßig beschleunigten Bewegung</b> proportional oder quadratisch
        mit der Zeit?
      </>
    ),
    answer: (
      <>
        Die Strecke wächst <b>quadratisch</b> mit der Zeit, denn es gilt
        <InlineMath math="s = \tfrac12 a t^2" />.
      </>
    ),
  },
  {
    question: (
      <>
        Steigt die zurückgelegte Strecke bei einer{' '}
        <b>gleichförmigen Bewegung</b> proportional oder quadratisch mit der
        Zeit?
      </>
    ),
    answer: (
      <>
        Die Strecke wächst <b>proportional</b> mit der Zeit, denn es gilt
        <InlineMath math="s = v t" />.
      </>
    ),
  },
  {
    question: (
      <>
        Welche Größe ist die <b>Steigung im s–t-Diagramm</b>?
      </>
    ),
    answer: (
      <>
        Die Steigung im s–t-Diagramm entspricht der Geschwindigkeit{' '}
        <InlineMath math="v" />.
      </>
    ),
  },
  {
    question: (
      <>
        Welche Größe ist die <b>Steigung im v–t-Diagramm</b>?
      </>
    ),
    answer: (
      <>
        Die Steigung im v–t-Diagramm entspricht der Beschleunigung{' '}
        <InlineMath math="a" />.
      </>
    ),
  },
  {
    question: (
      <>
        Wie heißt der <b>Fachbegriff</b> für das Prinzip, dass sich Bewegungen
        in verschiedene Richtungen unabhängig überlagern lassen?
      </>
    ),
    answer: (
      <>
        Das nennt man das <b>Überlagerungsprinzip</b> (Superpositionsprinzip).
      </>
    ),
  },
  {
    question: (
      <>
        Was bedeutet es, wenn in einem v–t-Diagramm eine{' '}
        <b>horizontale Linie</b> eingezeichnet ist?
      </>
    ),
    answer: (
      <>
        Die Geschwindigkeit ist konstant, es liegt also eine gleichförmige
        Bewegung vor.
      </>
    ),
  },
  {
    question: (
      <>
        Ein Körper wird aus der Ruhe gleichmäßig beschleunigt. Wie groß ist die
        <b> Anfangsgeschwindigkeit</b>?
      </>
    ),
    answer: (
      <>
        Die Anfangsgeschwindigkeit ist <InlineMath math="v_0 = 0" />.
      </>
    ),
  },
  {
    question: (
      <>
        Nenne einen <b>Unterschied</b> zwischen gleichförmiger und gleichmäßig
        beschleunigter Bewegung.
      </>
    ),
    answer: (
      <>
        Bei der gleichförmigen Bewegung ist <InlineMath math="v" /> konstant (
        <InlineMath math="a = 0" />
        ). Bei der gleichmäßig beschleunigten Bewegung ist{' '}
        <InlineMath math="a" /> konstant, aber <InlineMath math="v" /> ändert
        sich.
      </>
    ),
  },
  {
    question: (
      <>
        Wie nennt man die Überlagerung einer gleichförmigen Bewegung in
        horizontaler Richtung mit einer gleichmäßig beschleunigten Bewegung in
        vertikaler Richtung?
      </>
    ),
    answer: (
      <>
        Das ist ein <b>waagerechter Wurf</b>.
      </>
    ),
  },
]

const STORAGE_KEY = 'kinematik-questions-next-index'

function getNextIndexRandomFallback(max: number, rng: any): number {
  return rng.randomIntBetween(0, max - 1)
}

/**
 * Ermittelt einen Index so, dass alle Fragen nacheinander durchlaufen werden.
 * Der aktuelle Index wird in localStorage gemerkt. Falls localStorage
 * nicht verfügbar ist (z.B. Server), wird auf eine Zufallsauswahl
 * zurückgegriffen.
 */
function getNextRoundRobinIndex(rng: any): number {
  const max = QUESTIONS.length
  if (typeof window === 'undefined') {
    // Fallback: rein zufällig
    return getNextIndexRandomFallback(max, rng)
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    let idx = raw !== null ? parseInt(raw, 10) : 0
    if (!Number.isFinite(idx) || idx < 0 || idx >= max) {
      idx = 0
    }
    const next = (idx + 1) % max
    window.localStorage.setItem(STORAGE_KEY, String(next))
    return idx
  } catch {
    return getNextIndexRandomFallback(max, rng)
  }
}

export const exercise6004: Exercise<DATA> = {
  title: 'Verständnisfragen zur Kinematik',
  source: 'Kinematik',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const index = getNextRoundRobinIndex(rng)
    return { index }
  },

  originalData: {
    index: 0,
  },

  constraint({ data }) {
    return (
      typeof data.index === 'number' &&
      data.index >= 0 &&
      data.index < QUESTIONS.length
    )
  },

  task({ data }) {
    const entry = QUESTIONS[data.index]

    return (
      <>
        <p>
          Beantworte die folgende Verständnisfrage zur Kinematik in einem
          vollständigen Satz.
        </p>
        <p className="mt-2 font-semibold">{entry.question}</p>
      </>
    )
  },

  solution({ data }) {
    const entry = QUESTIONS[data.index]

    return (
      <>
        <p>Eine mögliche Antwort lautet:</p>
        <p className="mt-2">{entry.answer}</p>
      </>
    )
  },
}
