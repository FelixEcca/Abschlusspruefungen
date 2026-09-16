import { Exercise } from '@/data/types'
import { BlockMath } from 'react-katex'

type Method = 'pythagoras' | 'sine' | 'cosine' | 'tangent'

interface DATA {
  angleAtLeft: boolean
  method: Method
}

function Triangle({ angleAtLeft }: { angleAtLeft: boolean }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="mx-auto my-4 w-full max-w-[340px]"
      role="img"
      aria-label="Rechtwinkliges Dreieck mit den Seiten a, b und c"
    >
      <path
        d="M 45 25 L 45 165 L 285 165 Z"
        fill="#eef5ff"
        stroke="#1e3a5f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M 45 143 L 67 143 L 67 165"
        fill="none"
        stroke="#1e3a5f"
        strokeWidth="2"
      />
      <text x="20" y="100" fontSize="20" fill="#172033">
        a
      </text>
      <text x="160" y="190" fontSize="20" fill="#172033">
        b
      </text>
      <text x="170" y="82" fontSize="20" fill="#172033">
        c
      </text>
      {angleAtLeft ? (
        <>
          <path
            d="M 45 60 Q 55 42 73 41"
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
          />
          <text x="62" y="73" fontSize="18" fill="#1d4ed8">
            α
          </text>
        </>
      ) : (
        <>
          <path
            d="M 248 165 Q 251 151 256 148"
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
          />
          <text x="222" y="148" fontSize="18" fill="#1d4ed8">
            α
          </text>
        </>
      )}
    </svg>
  )
}

function methodPrompt(method: Method, angleAtLeft: boolean) {
  const opposite = angleAtLeft ? 'b' : 'a'
  const adjacent = angleAtLeft ? 'a' : 'b'
  if (method === 'pythagoras') {
    return {
      known:
        'Die beiden Katheten a und b sind bekannt. Gesucht ist die Hypotenuse c.',
      name: 'Satz des Pythagoras',
      formula: 'c=\\sqrt{a^2+b^2}',
    }
  }
  if (method === 'sine') {
    return {
      known:
        `Der Winkel α und die Hypotenuse c sind bekannt. Gesucht ist die Gegenkathete ${opposite}.`,
      name: 'Sinus',
      formula: `\\sin(\\alpha)=\\frac{${opposite}}{c}`,
    }
  }
  if (method === 'cosine') {
    return {
      known:
        `Der Winkel α und die Hypotenuse c sind bekannt. Gesucht ist die Ankathete ${adjacent}.`,
      name: 'Kosinus',
      formula: `\\cos(\\alpha)=\\frac{${adjacent}}{c}`,
    }
  }
  return {
      known: `Der Winkel α und die Ankathete ${adjacent} sind bekannt. Gesucht ist die Gegenkathete ${opposite}.`,
    name: 'Tangens',
    formula: `\\tan(\\alpha)=\\frac{${opposite}}{${adjacent}}`,
  }
}

export const exercise13017: Exercise<DATA> = {
  title: 'Rechtwinklige Dreiecke fachgerecht beschreiben',
  source: 'Vorbereitungskurs Meister · Geometrie und Trigonometrie',
  useCalculator: false,
  duration: 7,
  generator(rng) {
    return {
      angleAtLeft: rng.randomBoolean(),
      method: rng.randomItemFromArray<Method>([
        'pythagoras',
        'sine',
        'cosine',
        'tangent',
      ]),
    }
  },
  originalData: {
    angleAtLeft: false,
    method: 'tangent',
  },
  constraint() {
    return true
  },
  intro() {
    return (
      <p>
        Die Bezeichnungen Gegenkathete und Ankathete hängen vom betrachteten
        Winkel ab. Die Hypotenuse liegt immer gegenüber dem rechten Winkel.
      </p>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <Triangle angleAtLeft={data.angleAtLeft} />
            <p>
              Benennen Sie bezogen auf den Winkel α die
              Hypotenuse, die Gegenkathete und die Ankathete.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <Triangle angleAtLeft={data.angleAtLeft} />
            <ul className="list-disc pl-6">
              <li>Hypotenuse: c</li>
              <li>Gegenkathete: {data.angleAtLeft ? 'b' : 'a'}</li>
              <li>Ankathete: {data.angleAtLeft ? 'a' : 'b'}</li>
            </ul>
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        const prompt = methodPrompt(data.method, data.angleAtLeft)
        return (
          <>
            <p>{prompt.known}</p>
            <p>
              Wählen Sie ein geeignetes Verfahren und notieren Sie den passenden
              Formelansatz. Eine Berechnung ist nicht erforderlich.
            </p>
          </>
        )
      },
      solution({ data }) {
        const prompt = methodPrompt(data.method, data.angleAtLeft)
        return (
          <>
            <p>Geeignet ist: {prompt.name}.</p>
            <BlockMath math={prompt.formula} />
          </>
        )
      },
    },
  ],
}
