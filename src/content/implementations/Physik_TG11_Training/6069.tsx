import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type ErrorType =
  | 'missingUnits'
  | 'wrongFormula'
  | 'wrongDirection'
  | 'diagramSlope'
  | 'vtArea'
  | 'efficiencyPercent'
  | 'normalForce'
  | 'impulseSign'

interface DATA {
  errorType: ErrorType
}

function taskText(errorType: ErrorType) {
  if (errorType === 'missingUnits') {
    return (
      <>
        Eine Schülerlösung zu <InlineMath math="F=m\cdot a" /> setzt ein:{' '}
        <InlineMath math={`F=500\\cdot2=1000\\,\\mathrm N`} />. Die Masse war
        aber in Gramm angegeben.
      </>
    )
  }
  if (errorType === 'wrongFormula') {
    return (
      <>
        Eine Schülerlösung berechnet bei gleichförmiger Bewegung mit{' '}
        <InlineMath math={`s=\\tfrac12 a t^2`} />, obwohl eine konstante
        Geschwindigkeit gegeben ist.
      </>
    )
  }
  if (errorType === 'wrongDirection') {
    return (
      <>
        Eine Schülerlösung schreibt beim Bremsen{' '}
        <InlineMath math={`a=+3\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`} />, obwohl
        die Geschwindigkeit kleiner wird.
      </>
    )
  }
  if (errorType === 'diagramSlope') {
    return (
      <>
        Eine Schülerlösung liest aus einem steigenden <InlineMath math="s(t)" />
        -Diagramm direkt die Strecke ab und nennt diesen Wert Geschwindigkeit.
      </>
    )
  }
  if (errorType === 'vtArea') {
    return (
      <>
        Eine Schülerlösung bestimmt den Weg aus einem{' '}
        <InlineMath math="v(t)" />-Diagramm, indem nur die Endgeschwindigkeit
        abgelesen wird.
      </>
    )
  }
  if (errorType === 'efficiencyPercent') {
    return (
      <>
        Eine Schülerlösung rechnet beim Wirkungsgrad{' '}
        <InlineMath math={`E_\\mathrm{nutz}=75\\cdot800\\,\\mathrm J`} />, obwohl
        <InlineMath math={`\\eta=75\\,\\%`} /> gegeben ist.
      </>
    )
  }
  if (errorType === 'normalForce') {
    return (
      <>
        Eine Schülerlösung setzt auf einer schiefen Ebene immer{' '}
        <InlineMath math={`F_\\mathrm N=F_\\mathrm G`} />, egal wie groß der
        Neigungswinkel ist.
      </>
    )
  }
  return (
    <>
      Eine Schülerlösung berechnet eine Impulsänderung beim Richtungswechsel
      nur mit <InlineMath math={`m\\cdot v`} /> und beachtet die neue Richtung
      nicht.
    </>
  )
}

function solutionText(errorType: ErrorType) {
  if (errorType === 'missingUnits') {
    return (
      <>
        Die Lösung ist falsch. Für Newton muss die Masse in Kilogramm eingesetzt
        werden:{' '}
        <InlineMath
          math={`1\\,\\mathrm N=1\\,\\mathrm{kg}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
        />
        .
      </>
    )
  }
  if (errorType === 'wrongFormula') {
    return (
      <>
        Die Formel passt nicht. Bei gleichförmiger Bewegung gilt{' '}
        <InlineMath math={`s=v\\cdot t`} />. Die Formel mit{' '}
        <InlineMath math={`\\tfrac12 a t^2`} /> gehört zur beschleunigten
        Bewegung aus der Ruhe.
      </>
    )
  }
  if (errorType === 'wrongDirection') {
    return (
      <>
        Beim Bremsen ist die Beschleunigung negativ, wenn die positive Richtung
        die Bewegungsrichtung ist. Das Vorzeichen zeigt, dass die Geschwindigkeit
        abnimmt.
      </>
    )
  }
  if (errorType === 'diagramSlope') {
    return (
      <>
        Im <InlineMath math="s(t)" />-Diagramm ist die Geschwindigkeit die
        Steigung des Graphen, nicht der abgelesene Streckenwert.
      </>
    )
  }
  if (errorType === 'vtArea') {
    return (
      <>
        Der Weg ist im <InlineMath math="v(t)" />-Diagramm die Fläche unter dem
        Graphen. Eine einzelne Geschwindigkeit reicht dafür nicht aus.
      </>
    )
  }
  if (errorType === 'efficiencyPercent') {
    return (
      <>
        Prozent müssen als Anteil eingesetzt werden:{' '}
        <InlineMath math={`75\\,\\%=0{,}75`} />. Daher gilt{' '}
        <InlineMath math={`E_\\mathrm{nutz}=0{,}75\\cdot800\\,\\mathrm J`} />.
      </>
    )
  }
  if (errorType === 'normalForce') {
    return (
      <>
        Auf der schiefen Ebene ist die Normalkraft kleiner als die Gewichtskraft.
        Es gilt <InlineMath math={`F_\\mathrm N=F_\\mathrm G\\cdot\\cos\\alpha`} />.
      </>
    )
  }
  return (
    <>
      Der Impuls ist eine gerichtete Größe. Bei einem Richtungswechsel muss das
      Vorzeichen berücksichtigt werden, sonst wird die Impulsänderung zu klein.
    </>
  )
}

export const exercise6069: Exercise<DATA> = {
  title: 'Fehlerhafte Schülerlösung bewerten',
  source: 'Vernetzung',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    return {
      errorType: rng.randomItemFromArray([
        'missingUnits',
        'wrongFormula',
        'wrongDirection',
        'diagramSlope',
        'vtArea',
        'efficiencyPercent',
        'normalForce',
        'impulseSign',
      ]),
    }
  },

  originalData: {
    errorType: 'missingUnits',
  },

  constraint({ data }) {
    return [
      'missingUnits',
      'wrongFormula',
      'wrongDirection',
      'diagramSlope',
      'vtArea',
      'efficiencyPercent',
      'normalForce',
      'impulseSign',
    ].includes(data.errorType)
  },

  task({ data }) {
    return (
      <p>
        {taskText(data.errorType)} Bewerte die Lösung: Was ist falsch oder
        ungenau? Formuliere eine kurze Korrektur.
      </p>
    )
  },

  solution({ data }) {
    return <p>{solutionText(data.errorType)}</p>
  },
}
