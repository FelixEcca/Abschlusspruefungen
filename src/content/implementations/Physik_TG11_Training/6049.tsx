import { Exercise } from '@/data/types'

type Case = 'start' | 'slide' | 'roll'

interface DATA {
  situation: Case
}

function situationText(situation: Case) {
  if (situation === 'start') return 'Ein schwerer Werkzeugschrank soll angeschoben werden, bewegt sich aber noch nicht.'
  if (situation === 'slide') return 'Eine Holzkiste rutscht gleichmäßig über den Boden.'
  return 'Ein Transportwagen rollt auf seinen Rädern durch die Werkstatt.'
}

function solutionText(situation: Case) {
  if (situation === 'start') return 'Das ist Haftreibung. Sie wirkt, solange der Körper noch nicht gleitet.'
  if (situation === 'slide') return 'Das ist Gleitreibung. Sie wirkt, wenn zwei Flächen aneinander entlang gleiten.'
  return 'Das ist Rollreibung. Sie tritt beim Rollen auf und ist oft kleiner als Gleitreibung.'
}

export const exercise6049: Exercise<DATA> = {
  title: 'Reibungsarten unterscheiden',
  source: 'Kräfte',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    return { situation: rng.randomItemFromArray(['start', 'slide', 'roll']) }
  },

  originalData: {
    situation: 'start',
  },

  constraint({ data }) {
    return ['start', 'slide', 'roll'].includes(data.situation)
  },

  task({ data }) {
    return (
      <p>
        {situationText(data.situation)} Ordne die passende Reibungsart zu und
        begründe kurz.
      </p>
    )
  },

  solution({ data }) {
    return <p>{solutionText(data.situation)}</p>
  },
}
