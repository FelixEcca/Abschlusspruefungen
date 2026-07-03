// exercise6015.tsx
import { Exercise } from '@/data/types'

type Gesetz = 'traegheit' | 'bewegung' | 'wechselwirkung'

interface DATA {
  gesetz: Gesetz
  statements: {
    text: string
    correct: boolean
  }[]
}

function getLawName(gesetz: Gesetz) {
  if (gesetz === 'traegheit') return 'Trägheitsgesetz'
  if (gesetz === 'bewegung') return 'Bewegungsgesetz'
  return 'Wechselwirkungsgesetz'
}

function getLawMeaning(gesetz: Gesetz) {
  if (gesetz === 'traegheit') {
    return 'Wirkt auf einen Körper keine resultierende Kraft, bleibt er in Ruhe oder bewegt sich geradlinig mit konstanter Geschwindigkeit weiter.'
  }

  if (gesetz === 'bewegung') {
    return 'Eine resultierende Kraft bewirkt eine Beschleunigung gemäß: F_res = m · a.'
  }

  return 'Wenn Körper A auf Körper B eine Kraft ausübt, wirkt Körper B auf Körper A mit einer gleich großen, entgegengesetzt gerichteten Kraft.'
}

function getExample(gesetz: Gesetz) {
  if (gesetz === 'traegheit') {
    return 'Beim starken Bremsen auf einer Autofahrt bewegt sich der Körper zunächst weiter nach vorne. Er behält wegen seiner Trägheit zunächst seinen Bewegungszustand bei.'
  }

  if (gesetz === 'bewegung') {
    return 'Ein Einkaufswagen wird durch eine resultierende Kraft beschleunigt. Ist die resultierende Kraft größer, ist bei gleicher Masse auch die Beschleunigung größer.'
  }

  return 'Beim Gehen wirkt der Fuß auf den Boden mit einer nach hinten gerichteten Kraft. Der Boden wirkt auf den Fuß mit gleich großer Kraft nach vorne.'
}

function getStatements(gesetz: Gesetz) {
  if (gesetz === 'traegheit') {
    return [
      {
        text: 'Wirkt auf einen Körper keine resultierende Kraft, bleibt seine Geschwindigkeit konstant.',
        correct: true,
      },
      {
        text: 'Ein Körper kann sich nur bewegen, wenn dauerhaft eine resultierende Kraft auf ihn wirkt.',
        correct: false,
      },
      {
        text: 'Ein Körper in Ruhe bleibt in Ruhe, wenn keine resultierende Kraft auf ihn wirkt.',
        correct: true,
      },
      {
        text: 'Wenn keine resultierende Kraft wirkt, wird ein bewegter Körper immer langsamer.',
        correct: false,
      },
    ]
  }

  if (gesetz === 'bewegung') {
    return [
      {
        text: 'Bei gleicher Masse führt eine größere resultierende Kraft zu einer größeren Beschleunigung.',
        correct: true,
      },
      {
        text: 'Bei gleicher resultierender Kraft führt eine größere Masse zu einer kleineren Beschleunigung.',
        correct: true,
      },
      {
        text: 'Das Bewegungsgesetz lautet F_res = m · a.',
        correct: true,
      },
      {
        text: 'Bei Kräftegleichgewicht ist die resultierende Kraft null und der Körper wird trotzdem beschleunigt.',
        correct: false,
      },
    ]
  }

  return [
    {
      text: 'Kraft und Gegenkraft sind gleich groß und entgegengesetzt gerichtet.',
      correct: true,
    },
    {
      text: 'Kraft und Gegenkraft wirken auf denselben Körper und heben sich deshalb immer auf.',
      correct: false,
    },
    {
      text: 'Wenn ein Körper eine Kraft auf einen zweiten Körper ausübt, übt der zweite Körper eine gleich große Gegenkraft auf den ersten Körper aus.',
      correct: true,
    },
    {
      text: 'Beim Rückstoß einer Rakete wirken ausgestoßene Gase und Rakete gegenseitig aufeinander.',
      correct: true,
    },
  ]
}

export const exercise6015: Exercise<DATA> = {
  title: 'Newtonsche Gesetze',
  source: 'Kraft',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const gesetz: Gesetz = rng.randomItemFromArray([
      'traegheit',
      'bewegung',
      'wechselwirkung',
    ])

    return {
      gesetz,
      statements: getStatements(gesetz),
    }
  },

  originalData: {
    gesetz: 'bewegung',
    statements: getStatements('bewegung'),
  },

  constraint({ data }) {
    return data.statements.length === 4
  },

  intro({ data }) {
    return (
      <>
        <p>
          In dieser Aufgabe geht es um das <b>{getLawName(data.gesetz)}</b>.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>Erklären Sie kurz, was das {getLawName(data.gesetz)} bedeutet.</p>
        )
      },
      solution({ data }) {
        return (
          <p>
            Das {getLawName(data.gesetz)} bedeutet: {getLawMeaning(data.gesetz)}
          </p>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Entscheiden Sie jeweils: wahr oder falsch?</p>

            <table className="border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Aussage</th>
                  <th className="border px-2 py-1">Wahr</th>
                  <th className="border px-2 py-1">Falsch</th>
                </tr>
              </thead>
              <tbody>
                {data.statements.map((statement, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{statement.text}</td>
                    <td className="border px-2 py-1"></td>
                    <td className="border px-2 py-1"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Richtige Entscheidungen:</p>

            <table className="border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Aussage</th>
                  <th className="border px-2 py-1">Lösung</th>
                </tr>
              </thead>
              <tbody>
                {data.statements.map((statement, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{statement.text}</td>
                    <td className="border px-2 py-1">
                      {statement.correct ? 'Wahr' : 'Falsch'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Nennen Sie ein Beispiel zum {getLawName(data.gesetz)} und erklären
            Sie kurz, warum es dazu passt.
          </p>
        )
      },
      solution({ data }) {
        return <p>Beispiel: {getExample(data.gesetz)}</p>
      },
    },
  ],
}
