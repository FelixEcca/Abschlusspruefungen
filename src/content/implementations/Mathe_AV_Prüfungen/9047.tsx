// exercise9047.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

type Kontext =
  | 'ausbildung'
  | 'nebenjob'
  | 'praktikum'
  | 'monatslohn'
  | 'ferienjob'

interface DATA {
  kontext: Kontext
  gross: number
  percentName: string
  socialPercent: number
  social: number
  fixedName: string
  tax: number
  net: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(kontext: Kontext) {
  if (kontext === 'nebenjob') {
    return {
      intro: 'In Ihrem Nebenjob haben Sie einen monatlichen Bruttolohn von',
      percentName: 'Versicherung',
      fixedName: 'Steuer',
      resultName: 'Auszahlungsbetrag',
    }
  }

  if (kontext === 'praktikum') {
    return {
      intro: 'In Ihrem Praktikum erhalten Sie eine monatliche Vergütung von',
      percentName: 'Sozialabgaben',
      fixedName: 'Pauschalsteuer',
      resultName: 'Auszahlungsbetrag',
    }
  }

  if (kontext === 'monatslohn') {
    return {
      intro: 'Sie erhalten einen monatlichen Bruttolohn von',
      percentName: 'Krankenkassenbeitrag',
      fixedName: 'Steuer',
      resultName: 'Nettolohn',
    }
  }

  if (kontext === 'ferienjob') {
    return {
      intro: 'In Ihrem Ferienjob verdienen Sie insgesamt',
      percentName: 'Abgaben',
      fixedName: 'Bearbeitungsgebühr',
      resultName: 'Auszahlungsbetrag',
    }
  }

  return {
    intro: 'In Ihrer Ausbildung haben Sie ein monatliches Bruttogehalt von',
    percentName: 'Sozialversicherungsbeiträge',
    fixedName: 'Lohnsteuer',
    resultName: 'Nettogehalt',
  }
}

export const exercise9047: Exercise<DATA> = {
  title: 'Teil 2: Nettogehalt',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'ausbildung',
      'nebenjob',
      'praktikum',
      'monatslohn',
      'ferienjob',
    ])

    const context = getContext(kontext)

    const gross = rng.randomItemFromArray([
      950, 1100, 1200, 1325, 1425, 1500, 1650,
    ])
    const socialPercent = rng.randomItemFromArray([12, 15, 18, 19, 20, 21])
    const tax = rng.randomItemFromArray([12.5, 18.41, 24.9, 35, 42.75])

    const social = round2((gross * socialPercent) / 100)
    const net = round2(gross - social - tax)

    return {
      kontext,
      gross,
      percentName: context.percentName,
      socialPercent,
      social,
      fixedName: context.fixedName,
      tax,
      net,
    }
  },

  originalData: {
    kontext: 'ausbildung',
    gross: 1425,
    percentName: 'Sozialversicherungsbeiträge',
    socialPercent: 21,
    social: 299.25,
    fixedName: 'Lohnsteuer',
    tax: 18.41,
    net: 1107.34,
  },

  constraint({ data }) {
    return data.net > 0
  },

  task({ data }) {
    const context = getContext(data.kontext)

    return (
      <>
        <p>
          {context.intro} {pp(data.gross)} €.
        </p>

        <p>
          Hiervon werden Ihnen zuerst {pp(data.socialPercent)} %{' '}
          {data.percentName} abgezogen.
        </p>

        <p>
          Anschließend werden {pp(data.tax)} € {data.fixedName} abgezogen.
        </p>

        <p>Berechnen Sie Ihr monatliches {context.resultName}.</p>
      </>
    )
  },

  solution({ data }) {
    const context = getContext(data.kontext)
    const onePercent = round2(data.gross / 100)

    return (
      <>
        <p>Berechne den prozentualen Abzug mit dem Dreisatz:</p>

        <svg viewBox="0 0 328 185">
          <image
            href="/content/Mathe_AV/Dreisatz.PNG"
            height="185"
            width="328"
          />

          <text x="120" y="12" fontSize="15" textAnchor="middle">
            %
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            €
          </text>

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            100
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.gross)}
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(onePercent)}
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {pp(data.socialPercent)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.social)}
          </text>

          <text x="22" y="72" fontSize="14">
            : 100
          </text>
          <text x="22" y="123" fontSize="14">
            · {pp(data.socialPercent)}
          </text>

          <text x="284" y="72" fontSize="14">
            : 100
          </text>
          <text x="284" y="123" fontSize="14">
            · {pp(data.socialPercent)}
          </text>
        </svg>

        <p>
          {data.percentName}: <b>{pp(data.social)} €</b>
        </p>

        <p>Danach werden beide Abzüge vom Bruttobetrag abgezogen:</p>

        <p>
          {pp(data.gross)} € - {pp(data.social)} € - {pp(data.tax)} € ={' '}
          <b>{pp(data.net)} €</b>
        </p>

        <p>
          Ihr monatliches {context.resultName} beträgt <b>{pp(data.net)} €</b>.
        </p>
      </>
    )
  },
}
