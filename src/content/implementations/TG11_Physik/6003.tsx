import { Exercise } from '@/data/types'

interface QA {
  question: string
  answer: string
}

interface DATA {
  index: number
}

// Fragen-Pool
const QUESTIONS: QA[] = [
  {
    question: 'Wie ist der Impuls eines Körpers definiert?',
    answer:
      'Der Impuls ist das Produkt aus Masse und Geschwindigkeit: p = m·v.',
  },
  {
    question: 'Welche Einheit hat der Impuls?',
    answer:
      'Die Einheit des Impulses ist kg·m/s (Kilogramm mal Meter pro Sekunde).',
  },
  {
    question: 'Was bedeutet der Impulserhaltungssatz?',
    answer:
      'Der Gesamtimpuls vor und nach einem Stoß sind gleich, bzw. der Impuls geht nicht verloren: p_vor = p_nach.',
  },
  {
    question:
      'Worin unterscheidet sich ein elastischer von einem unelastischen Stoß?',
    answer:
      'Beim unelastischen Stoß bleiben die Objekte nach dem Stoß zusammen und bewegen sich gemeinsam weiter.',
  },
  {
    question:
      'Warum kann ein leichter Körper trotzdem einen großen Impuls haben?',
    answer:
      'Weil der Impuls auch von der Geschwindigkeit abhängt. Ein Körper mit kleiner Masse, aber sehr großer Geschwindigkeit kann einen großen Impuls besitzen.',
  },
  {
    question:
      'Wie erkennt man in einer Textaufgabe oft, dass es um einen Rückstoß geht?',
    answer:
      'Typisch ist, dass ein zuvor ruhendes System (z.B. Waffe und Kugel) plötzlich auseinanderfliegt. Die Impulse der beiden Körper sind dann gleich groß und entgegengesetzt gerichtet.',
  },
]

// Rotationsindex über alle Instanzen hinweg
let lastIndex = -1

export const exercise6003: Exercise<DATA> = {
  title: 'Verständnisfragen zum Impuls',
  source: 'Impuls',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator() {
    // zyklische Auswahl: 0,1,2,…,N-1,0,1,…
    lastIndex = (lastIndex + 1) % QUESTIONS.length
    return { index: lastIndex }
  },

  originalData: {
    index: 0,
  },

  constraint({ data }) {
    return data.index >= 0 && data.index < QUESTIONS.length
  },

  task({ data }) {
    const qa = QUESTIONS[data.index]
    return (
      <>
        <p>Beantworte die folgende Verständnisfrage zum Impuls:</p>
        <p className="mt-2 font-medium">{qa.question}</p>
      </>
    )
  },

  solution({ data }) {
    const qa = QUESTIONS[data.index]
    return (
      <>
        <p className="mt-2">{qa.answer}</p>
      </>
    )
  },
}
