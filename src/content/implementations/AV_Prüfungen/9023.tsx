// exercise9023.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'baumstamm' | 'chipsdose' | 'wasserglas'

interface DATA {
  kontext: Kontext

  // Aufgabe a)
  length: number
  lengthUnit: 'm' | 'cm'
  diameterCm: number
  volumeCm3: number
  volumeM3: number
  volumeMl: number

  // Aufgabe b)
  amountVolume: number
  amountUnit: 'm3' | 'l'
  density: number
  densityUnit: 'kg/m3' | 'g/l'
  weight: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'chipsdose') {
    return {
      introA: 'Eine Chipsdose ist annähernd zylinderförmig.',
      image: 'Chipsdose.png',
      object: 'Chipsdose',
      article: 'eine',
      volumeQuestion: 'Berechnen Sie das Volumen der Chipsdose in ml.',
      amountText: (
        <>
          Am Ende werden insgesamt {pp(data.amountVolume)} l Chipsdosen-Volumen
          verpackt. 1 l Inhalt wiegt {pp(data.density)} g.
        </>
      ),
      weightQuestion: 'Berechnen Sie, wie viel der Inhalt insgesamt wiegt.',
      resultUnit: 'g',
    }
  }

  if (data.kontext === 'wasserglas') {
    return {
      introA: 'Ein Wasserglas ist annähernd zylinderförmig.',
      image: 'Wasserglas.png',
      object: 'Wasserglas',
      article: 'ein',
      volumeQuestion: 'Berechnen Sie das Volumen des Wasserglases in ml.',
      amountText: (
        <>
          Insgesamt werden {pp(data.amountVolume)} l Wasser eingefüllt. 1 l
          Wasser wiegt {pp(data.density)} g.
        </>
      ),
      weightQuestion: 'Berechnen Sie, wie viel das Wasser insgesamt wiegt.',
      resultUnit: 'g',
    }
  }

  return {
    introA: 'Es wird noch Brennholz aus dem Wald geholt.',
    image: 'Baumstamm.png',
    object: 'Baumstamm',
    article: 'einen',
    volumeQuestion: 'Berechnen Sie das Volumen des Stamms in m³.',
    amountText: (
      <>
        Am Ende liegen auf einem Anhänger {pp(data.amountVolume)} m³ Holz. 1 m³
        Holz wiegt {pp(data.density)} kg.
      </>
    ),
    weightQuestion: 'Berechnen Sie, wie viel das Holz auf dem Anhänger wiegt.',
    resultUnit: 'kg',
  }
}

function lengthInCm(data: DATA) {
  return data.lengthUnit === 'm' ? data.length * 100 : data.length
}

function volumeResult(data: DATA) {
  if (data.kontext === 'baumstamm') return data.volumeM3
  return data.volumeMl
}

function volumeUnitLatex(data: DATA) {
  if (data.kontext === 'baumstamm') return '\\mathrm{m}^3'
  return '\\mathrm{ml}'
}

export const exercise9023: Exercise<DATA> = {
  title: 'Teil 2: Zylinder',
  source: '2025',
  useCalculator: true,
  duration: 42,

  intro() {
    return null
  },

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'baumstamm',
      'chipsdose',
      'wasserglas',
    ])

    let length = 0
    let lengthUnit: 'm' | 'cm' = 'cm'
    let diameterCm = 0
    let amountVolume = 0
    let amountUnit: 'm3' | 'l' = 'l'
    let density = 0
    let densityUnit: 'kg/m3' | 'g/l' = 'g/l'

    if (kontext === 'baumstamm') {
      length = rng.randomItemFromArray([8, 10, 12, 15, 18])
      lengthUnit = 'm'
      diameterCm = rng.randomItemFromArray([50, 60, 70, 74, 80, 90])
      amountVolume = rng.randomItemFromArray([8.5, 12.4, 18.7, 22.5])
      amountUnit = 'm3'
      density = rng.randomItemFromArray([650, 700, 720, 760])
      densityUnit = 'kg/m3'
    } else if (kontext === 'chipsdose') {
      length = rng.randomItemFromArray([18, 20, 22, 24, 26])
      lengthUnit = 'cm'
      diameterCm = rng.randomItemFromArray([6, 7, 8, 9])
      amountVolume = rng.randomItemFromArray([12, 18, 24, 30])
      amountUnit = 'l'
      density = rng.randomItemFromArray([80, 90, 100, 110])
      densityUnit = 'g/l'
    } else {
      length = rng.randomItemFromArray([10, 12, 14, 16])
      lengthUnit = 'cm'
      diameterCm = rng.randomItemFromArray([6, 7, 8, 9])
      amountVolume = rng.randomItemFromArray([3, 5, 8, 10])
      amountUnit = 'l'
      density = 1000
      densityUnit = 'g/l'
    }

    const hCm = lengthUnit === 'm' ? length * 100 : length
    const rCm = diameterCm / 2
    const volumeCm3 = Math.PI * rCm * rCm * hCm
    const volumeM3 = round2(volumeCm3 / 1000000)
    const volumeMl = round2(volumeCm3)

    const weight = round2(amountVolume * density)

    return {
      kontext,
      length,
      lengthUnit,
      diameterCm,
      volumeCm3,
      volumeM3,
      volumeMl,
      amountVolume,
      amountUnit,
      density,
      densityUnit,
      weight,
    }
  },

  originalData: {
    kontext: 'baumstamm',
    length: 15,
    lengthUnit: 'm',
    diameterCm: 74,
    volumeCm3: Math.PI * 37 * 37 * 1500,
    volumeM3: 6.45,
    volumeMl: round2(Math.PI * 37 * 37 * 1500),
    amountVolume: 18.7,
    amountUnit: 'm3',
    density: 720,
    densityUnit: 'kg/m3',
    weight: 13464,
  },

  constraint({ data }) {
    return data.length > 0 && data.diameterCm > 0 && data.weight > 0
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        const context = getContext(data)

        return (
          <>
            <p>{context.introA}</p>
            <p>
              Sie haben {context.article} {pp(data.length)} {data.lengthUnit}{' '}
              langen {context.object}. Der {context.object} ist zylinderförmig
              und hat einen Durchmesser von {pp(data.diameterCm)} cm.
            </p>

            <svg viewBox="0 0 328 190">
              <image
                href={`/content/AV_Prüfungen/${context.image}`}
                height="190"
                width="328"
              />
            </svg>

            <p>{context.volumeQuestion}</p>
          </>
        )
      },
      solution({ data }) {
        const result = volumeResult(data)

        if (data.kontext === 'baumstamm') {
          const diameterM = data.diameterCm / 100
          const radiusM = diameterM / 2
          const heightM = data.length

          return (
            <>
              <p>Für das Volumen eines Zylinders gilt:</p>
              <InlineMath math="V=\pi\cdot r^2\cdot h" />

              <p>Zuerst wird der Durchmesser in Meter umgerechnet:</p>
              <InlineMath
                math={`${pp(data.diameterCm)}\\,\\mathrm{cm}=${pp(
                  diameterM,
                )}\\,\\mathrm{m}`}
              />

              <p>Der Radius ist die Hälfte des Durchmessers:</p>
              <InlineMath
                math={`r=\\frac{${pp(diameterM)}}{2}=${pp(
                  radiusM,
                )}\\,\\mathrm{m}`}
              />

              <p>Einsetzen:</p>
              <InlineMath
                math={`V=\\pi\\cdot ${pp(radiusM)}^2\\cdot ${pp(
                  heightM,
                )}\\approx ${pp(result)}\\,\\mathrm{m}^3`}
              />
            </>
          )
        }

        const radiusCm = data.diameterCm / 2
        const hCm = lengthInCm(data)

        return (
          <>
            <p>Für das Volumen eines Zylinders gilt:</p>
            <InlineMath math="V=\pi\cdot r^2\cdot h" />

            <p>Der Radius ist die Hälfte des Durchmessers:</p>
            <InlineMath
              math={`r=\\frac{${pp(data.diameterCm)}}{2}=${pp(
                radiusCm,
              )}\\,\\mathrm{cm}`}
            />

            <p>Einsetzen:</p>
            <InlineMath
              math={`V=\\pi\\cdot ${pp(radiusCm)}^2\\cdot ${pp(
                hCm,
              )}\\approx ${pp(round2(data.volumeCm3))}\\,\\mathrm{cm}^3`}
            />

            <p>
              Da <InlineMath math="1\,\mathrm{cm}^3=1\,\mathrm{ml}" /> gilt:
            </p>
            <InlineMath math={`${pp(result)}\\,${volumeUnitLatex(data)}`} />
            <h2>Erklärvideo</h2>
            <p>
              Hier gibt es noch ein Erklärungsvideo zum Volumen eines Zylinders:
            </p>
            <div className="my-4">
              <iframe
                width="100%"
                height="220"
                src="https://www.youtube.com/embed/JmTtpD7Q8jo"
                title="Erklärungsvideo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded border"
              />
            </div>
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        const context = getContext(data)

        return (
          <>
            <p>{context.amountText}</p>
            <p>{context.weightQuestion}</p>
          </>
        )
      },
      solution({ data }) {
        const context = getContext(data)

        return (
          <>
            <InlineMath
              math={`${pp(data.amountVolume)}\\cdot ${pp(data.density)}=${pp(
                data.weight,
              )}\\,\\mathrm{${context.resultUnit}}`}
            />
            <p>
              Das Ergebnis beträgt{' '}
              <b>
                {pp(data.weight)} {context.resultUnit}
              </b>
              .
            </p>
          </>
        )
      },
    },
  ],
}
