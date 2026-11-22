import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  axis: number
  maximum: number
}
export const exercise22079: Exercise<DATA> = {
  title: 'Funktionen konstruieren und jede Eigenschaft prüfen',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      axis: rng.randomIntBetween(-2, 2),
      maximum: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { axis: 0, maximum: 1 },
  task({ data }) {
    return (
      <>
        <p>Es werden drei Eigenschaften betrachtet:</p>
        <ol>
          <li>f ist eine Polynomfunktion.</li>
          <li>
            Ihr Graph ist symmetrisch zur Geraden{' '}
            <InlineMath math={String.raw`x=${data.axis}`} />.
          </li>
          <li>
            Ihr Graph besitzt einen {data.maximum ? 'Hochpunkt' : 'Tiefpunkt'}.
          </li>
        </ol>
        <p>
          Finden Sie je eine Funktion mit genau einer, genau zwei und allen drei
          Eigenschaften. Prüfen Sie bei jedem Vorschlag ausdrücklich auch die
          nicht erfüllten Eigenschaften.
        </p>
      </>
    )
  },
  solution({ data }) {
    const u = data.axis === 0 ? 'x' : String.raw`(x-(${data.axis}))`
    return (
      <>
        <p>
          <strong>Genau eine:</strong>{' '}
          <InlineMath math={String.raw`f(x)=${u}`} /> ist ein Polynom. Die
          Gerade ist weder achsensymmetrisch zur genannten senkrechten Achse
          noch besitzt sie einen Extrempunkt.
        </p>
        <p>
          <strong>Genau zwei:</strong>{' '}
          <InlineMath
            math={String.raw`f(x)=${data.maximum ? '' : '-'}${u}^2`}
          />{' '}
          ist ein Polynom mit der geforderten Symmetrie. Sie hat aber nur einen{' '}
          {data.maximum ? 'Tiefpunkt' : 'Hochpunkt'} und keinen verlangten{' '}
          {data.maximum ? 'Hochpunkt' : 'Tiefpunkt'}.
        </p>
        <p>
          <strong>Alle drei:</strong>{' '}
          <InlineMath
            math={String.raw`f(x)=${data.maximum ? '-' : ''}${u}^4`}
          />{' '}
          ist ein Polynom, besitzt die geforderte Symmetrie und einen{' '}
          {data.maximum ? 'Hochpunkt' : 'Tiefpunkt'} bei{' '}
          <InlineMath math={String.raw`(${data.axis}\mid0)`} />.
        </p>
        <p>
          Dies sind Beispiele, nicht die einzig möglichen Lösungen. Entscheidend
          ist die genaue Anzahl erfüllter Eigenschaften.
        </p>
      </>
    )
  },
}
