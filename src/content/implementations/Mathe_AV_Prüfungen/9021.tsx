// exercise9021.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'holzbretter' | 'kartons' | 'sandkasten' | 'hochbeet'
type TargetUnit = 'dm3' | 'm3'

interface DATA {
  kontext: Kontext
  lengthCm: number
  widthCm: number
  heightCm: number
  targetUnit: TargetUnit
  volumeCm3: number
  volumeDm3: number
  volumeM3: number
}

function round4(x: number) {
  return Math.round(x * 10000) / 10000
}

function getContext(data: DATA) {
  if (data.kontext === 'kartons') {
    return {
      intro: 'Mehrere Kartons werden zu einem  Stapel zusammengestellt.',
      object: 'Kartons',
      question:
        data.targetUnit === 'dm3'
          ? 'Berechnen Sie das Raumvolumen des dargestellten Stapels in dm³.'
          : 'Berechnen Sie das Raumvolumen des dargestellten Stapels in m³.',
    }
  }

  if (data.kontext === 'sandkasten') {
    return {
      intro: 'Ein Sandkasten hat folgende Maße:',
      object: 'Sandkasten',
      question:
        data.targetUnit === 'dm3'
          ? 'Berechnen Sie das Volumen des Sandkastens in dm³.'
          : 'Berechnen Sie das Volumen des Sandkastens in m³.',
    }
  }

  if (data.kontext === 'hochbeet') {
    return {
      intro: 'Ein Hochbeet hat folgende Maße:',
      object: 'Hochbeet',
      question:
        data.targetUnit === 'dm3'
          ? 'Berechnen Sie das Volumen des Hochbeets in dm³.'
          : 'Berechnen Sie das Volumen des Hochbeets in m³.',
    }
  }

  return {
    intro: 'Holzbretter wurden in einem Stapel geliefert.',
    object: 'Holzbretter',
    question:
      data.targetUnit === 'dm3'
        ? 'Berechnen Sie das Raumvolumen des dargestellten Stapels in dm³.'
        : 'Berechnen Sie das Raumvolumen des dargestellten Stapels in m³.',
  }
}

function unitLatex(unit: TargetUnit) {
  return unit === 'dm3' ? '\\mathrm{dm}^3' : '\\mathrm{m}^3'
}

function targetValue(data: DATA) {
  return data.targetUnit === 'dm3' ? data.volumeDm3 : data.volumeM3
}

export const exercise9021: Exercise<DATA> = {
  title: 'Teil 2: Volumen',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'holzbretter',
      'kartons',
      'sandkasten',
      'hochbeet',
    ])

    const targetUnit: TargetUnit = rng.randomItemFromArray(['dm3', 'm3'])

    const lengthCm =
      kontext === 'sandkasten' || kontext === 'hochbeet'
        ? rng.randomItemFromArray([120, 150, 180, 200, 240, 300])
        : rng.randomItemFromArray([240, 300, 360, 420])

    const widthCm =
      kontext === 'sandkasten' || kontext === 'hochbeet'
        ? rng.randomItemFromArray([60, 80, 100, 120, 150])
        : rng.randomItemFromArray([80, 100, 120, 140])

    const heightCm =
      kontext === 'sandkasten' || kontext === 'hochbeet'
        ? rng.randomItemFromArray([30, 40, 50, 60, 80])
        : rng.randomItemFromArray([60, 80, 100, 120])

    const volumeCm3 = lengthCm * widthCm * heightCm
    const volumeDm3 = round4(volumeCm3 / 1000)
    const volumeM3 = round4(volumeCm3 / 1000000)

    return {
      kontext,
      lengthCm,
      widthCm,
      heightCm,
      targetUnit,
      volumeCm3,
      volumeDm3,
      volumeM3,
    }
  },

  originalData: {
    kontext: 'holzbretter',
    lengthCm: 360,
    widthCm: 120,
    heightCm: 100,
    targetUnit: 'dm3',
    volumeCm3: 4320000,
    volumeDm3: 4320,
    volumeM3: 4.32,
  },

  constraint({ data }) {
    return data.volumeCm3 > 0 && data.volumeDm3 > 0 && data.volumeM3 > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.intro}</p>

        <svg viewBox="0 0 328 190">
          <polygon
            points="60,130 220,130 220,85 60,85"
            fill="#ddd"
            stroke="black"
          />
          <polygon
            points="60,85 220,85 260,50 100,50"
            fill="#ddd"
            stroke="black"
          />
          <polygon
            points="220,130 220,85 260,50 260,90"
            fill="#ddd"
            stroke="black"
          />

          <line x1="60" y1="145" x2="220" y2="145" stroke="black" />
          <line x1="220" y1="145" x2="270" y2="100" stroke="black" />
          <line x1="55" y1="130" x2="55" y2="85" stroke="black" />

          <text x="115" y="165" fontSize="14">
            {data.widthCm} cm
          </text>
          <text x="250" y="135" fontSize="14">
            {data.lengthCm} cm
          </text>
          <text x="0" y="110" fontSize="14">
            {data.heightCm} cm
          </text>
        </svg>

        <p>{context.question}</p>
      </>
    )
  },

  solution({ data }) {
    const result = targetValue(data)
    const lengthInTargetUnit =
      data.targetUnit === 'dm3' ? data.lengthCm / 10 : data.lengthCm / 100
    const widthInTargetUnit =
      data.targetUnit === 'dm3' ? data.widthCm / 10 : data.widthCm / 100
    const heightInTargetUnit =
      data.targetUnit === 'dm3' ? data.heightCm / 10 : data.heightCm / 100

    const unitLabel = data.targetUnit === 'dm3' ? 'dm' : 'm'

    return (
      <>
        <p>
          Zuerst werden die Maße in <InlineMath math={unitLabel} /> umgewandelt:
        </p>
        {data.targetUnit === 'dm3' ? (
          <>
            <InlineMath
              math={`${data.lengthCm}\\,\\mathrm{cm}=${pp(lengthInTargetUnit)}\\,\\mathrm{dm}`}
            />
            <br></br>
            <InlineMath
              math={`${data.widthCm}\\,\\mathrm{cm}=${pp(widthInTargetUnit)}\\,\\mathrm{dm}`}
            />
            <br></br>
            <InlineMath
              math={`${data.heightCm}\\,\\mathrm{cm}=${pp(heightInTargetUnit)}\\,\\mathrm{dm}`}
            />
          </>
        ) : (
          <>
            <InlineMath
              math={`${data.lengthCm}\\,\\mathrm{cm}=${pp(lengthInTargetUnit)}\\,\\mathrm{m}`}
            />
            <br></br>
            <InlineMath
              math={`${data.widthCm}\\,\\mathrm{cm}=${pp(widthInTargetUnit)}\\,\\mathrm{m}`}
            />
            <br></br>
            <InlineMath
              math={`${data.heightCm}\\,\\mathrm{cm}=${pp(heightInTargetUnit)}\\,\\mathrm{m}`}
            />
          </>
        )}

        <p>Danach wird das Volumen berechnet:</p>
        <InlineMath
          math={`${pp(lengthInTargetUnit)}\\cdot ${pp(widthInTargetUnit)}\\cdot ${pp(heightInTargetUnit)}=${pp(result)}\\,${unitLatex(data.targetUnit)}`}
        />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum Volumen eines Quaders:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/xFrFZieub44"
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
