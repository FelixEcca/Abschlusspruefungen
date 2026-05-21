// exercise9030.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { kürzeBruch } from '@/helper/kuerze-bruch'

interface DATA {
  mondayH: number
  mondayM: number
  tuesday: number
  wednesday: number
  thursday: number
  friday: number
  totalMinutes: number
  resultH: number
  resultM: number
}

function hourValueLatex(value: number) {
  const wholeHours = Math.floor(value)
  const remainingMinutes = Math.round((value - wholeHours) * 60)

  if (remainingMinutes === 0) {
    return `${wholeHours}`
  }

  const fraction = kürzeBruch(remainingMinutes, 60)

  return `${wholeHours}\\frac{${fraction.zähler}}{${fraction.nenner}}`
}

function hourValueText(value: number) {
  const wholeHours = Math.floor(value)
  const remainingMinutes = Math.round((value - wholeHours) * 60)

  if (remainingMinutes === 0) {
    return `${wholeHours}`
  }

  const fraction = kürzeBruch(remainingMinutes, 60)

  return `${wholeHours}\\frac{${fraction.zähler}}{${fraction.nenner}}`
}

function minutesFromHours(value: number) {
  return Math.round(value * 60)
}

export const exercise9030: Exercise<DATA> = {
  title: 'Teil 1: Arbeitszeiten addieren',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const mondayH = rng.randomItemFromArray([5, 6, 7, 8])
    const mondayM = rng.randomItemFromArray([15, 20, 30, 45])

    const tuesday = rng.randomItemFromArray([6.25, 6.5, 6.75, 7.25, 8.25])
    const wednesday = rng.randomItemFromArray([5.5, 6.25, 6.75, 7.5])
    const thursday = rng.randomItemFromArray([5, 6, 7, 8])
    const friday = rng.randomItemFromArray([5.5, 6.5, 7.5])

    const totalMinutes =
      mondayH * 60 +
      mondayM +
      minutesFromHours(tuesday) +
      minutesFromHours(wednesday) +
      minutesFromHours(thursday) +
      minutesFromHours(friday)

    const resultH = Math.floor(totalMinutes / 60)
    const resultM = totalMinutes % 60

    return {
      mondayH,
      mondayM,
      tuesday,
      wednesday,
      thursday,
      friday,
      totalMinutes,
      resultH,
      resultM,
    }
  },

  originalData: {
    mondayH: 7,
    mondayM: 20,
    tuesday: 8.25,
    wednesday: 6.75,
    thursday: 7,
    friday: 6.5,
    totalMinutes: 2145,
    resultH: 35,
    resultM: 45,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Sie haben in den Ferien gearbeitet:</p>

        <p>
          Montag: {data.mondayH} Stunden {data.mondayM} Minuten
          <br />
          Dienstag: <InlineMath math={hourValueLatex(data.tuesday)} /> Stunden
          <br />
          Mittwoch: <InlineMath math={hourValueLatex(data.wednesday)} /> Stunden
          <br />
          Donnerstag: <InlineMath math={hourValueLatex(data.thursday)} />{' '}
          Stunden
          <br />
          Freitag: <InlineMath math={hourValueLatex(data.friday)} /> Stunden
        </p>

        <p>
          Berechnen Sie, wie viele Stunden und Minuten Sie insgesamt gearbeitet
          haben.
        </p>
      </>
    )
  },

  solution({ data }) {
    const mondayMinutes = data.mondayH * 60 + data.mondayM

    const tueHours = Math.floor(data.tuesday)
    const tueMinutes = Math.round((data.tuesday - tueHours) * 60)

    const wedHours = Math.floor(data.wednesday)
    const wedMinutes = Math.round((data.wednesday - wedHours) * 60)

    const thuHours = Math.floor(data.thursday)
    const thuMinutes = Math.round((data.thursday - thuHours) * 60)

    const friHours = Math.floor(data.friday)
    const friMinutes = Math.round((data.friday - friHours) * 60)

    const totalWholeHours =
      data.mondayH + tueHours + wedHours + thuHours + friHours

    const totalExtraMinutes =
      data.mondayM + tueMinutes + wedMinutes + thuMinutes + friMinutes

    const extraHours = Math.floor(totalExtraMinutes / 60)
    const remainingMinutes = totalExtraMinutes % 60

    return (
      <>
        <p>Zuerst werden die ganzen Stunden addiert:</p>

        <InlineMath
          math={`${data.mondayH}+${tueHours}+${wedHours}+${thuHours}+${friHours}=${totalWholeHours}`}
        />

        <p>Danach werden die Minuten addiert:</p>

        <InlineMath
          math={`${data.mondayM}+${tueMinutes}+${wedMinutes}+${thuMinutes}+${friMinutes}=${totalExtraMinutes}`}
        />

        <p>Die Minuten werden in Stunden und Minuten umgerechnet:</p>

        <InlineMath
          math={`${totalExtraMinutes}:60=${extraHours}\\text{ Rest }${remainingMinutes}`}
        />

        <p>Die zusätzlichen Stunden werden addiert:</p>

        <InlineMath math={`${totalWholeHours}+${extraHours}=${data.resultH}`} />

        <p>
          Insgesamt wurden{' '}
          <b>
            {data.resultH} Stunden und {data.resultM} Minuten
          </b>{' '}
          gearbeitet.
        </p>
      </>
    )
  },
}
