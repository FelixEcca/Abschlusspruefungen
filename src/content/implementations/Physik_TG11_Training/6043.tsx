import { Exercise } from '@/data/types'

interface DATA {
  index: number
}

const QUESTIONS = [
  {
    question:
      'Ein Gegenstand bewegt sich mit konstanter Geschwindigkeit geradeaus. Was kann man über die resultierende Kraft sagen?',
    answer:
      'Die resultierende Kraft ist null. Nach dem Trägheitsprinzip ändert sich die Geschwindigkeit nur, wenn eine resultierende Kraft wirkt.',
  },
  {
    question:
      'Warum fliegt man in einem bremsenden Bus scheinbar nach vorne?',
    answer:
      'Der Körper möchte wegen seiner Trägheit seine Bewegung beibehalten. Der Bus wird langsamer, der Körper bewegt sich zunächst weiter nach vorne.',
  },
  {
    question:
      'Zwei Personen ziehen gleich stark in entgegengesetzte Richtungen an einem Wagen. Was passiert mit dem Wagen?',
    answer:
      'Die Kräfte heben sich auf. Wenn der Wagen vorher in Ruhe war, bleibt er in Ruhe.',
  },
  {
    question:
      'Warum ist die Beschleunigung bei gleicher Kraft kleiner, wenn die Masse größer ist?',
    answer:
      'Nach F = m · a gilt a = F / m. Bei größerer Masse führt dieselbe Kraft zu einer kleineren Beschleunigung.',
  },
  {
    question:
      'Was bedeutet eine negative Beschleunigung in Bewegungsrichtung?',
    answer:
      'Die Geschwindigkeit nimmt ab. Man spricht häufig von Verzögerung oder Bremsen.',
  },
]

export const exercise6043: Exercise<DATA> = {
  title: 'Newtonsche Ideen beschreiben',
  source: 'Kräfte',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    return { index: rng.randomIntBetween(0, QUESTIONS.length - 1) }
  },

  originalData: {
    index: 0,
  },

  constraint({ data }) {
    return data.index >= 0 && data.index < QUESTIONS.length
  },

  task({ data }) {
    return (
      <>
        <p>Beantworte die Frage in einem vollständigen Satz.</p>
        <p className="font-semibold">{QUESTIONS[data.index].question}</p>
      </>
    )
  },

  solution({ data }) {
    return <p>{QUESTIONS[data.index].answer}</p>
  },
}
