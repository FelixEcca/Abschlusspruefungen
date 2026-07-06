import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  order: number[]
}

const beschreibungen = [
  'Eine Bakterienkultur verdoppelt sich in regelmäßigen Abständen.',
  'Ein Kühlschrank beginnt immer zu kühlen, wenn eine bestimmte Temperatur erreicht wird.',
  'Eine Taxifahrt kostet 8 € Grundpreis und 2,50 € pro gefahrenen Kilometer.',
  'Ein Ball der herunterfällt, legt immer mehr Strecke zurück.',
  'Ein heißer Kaffee kühlt auf Raumtemperatur ab.',
  'Eine Population von Tieren im Wald wächst, bis sie eine Obergrenze erreicht.',
  'Eine Kerze mit 14 cm Höhe brennt gleichmäßig 2 cm pro Stunde ab.',
  'Ein Junge verkauft Äpfel für 1 € und hat 10 € Gebühren für den Stand bezahlt.',
  'Ein Energydrink kostet pro Stück 2,50 €.',
  'Ein Maurer legt jede Stunde 2 Reihen Ziegelsteine. Er beginnt mit 2 Reihen.',
  'Ein Auto fährt jede Minute einen Kilometer und fängt bei 1 km an.',
  'Eine App wird in 4 Minuten heruntergeladen.',
]
const darstellungen = [
  <>
    <svg viewBox="0 0 328 70">
      <image href="/content/Mathe_2BFS2/3012_1.png" height="70" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 100">
      <image href="/content/Mathe_2BFS2/3012_2.png" height="100" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 150">
      <image href="/content/Mathe_2BFS2/3012_3.png" height="150" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 200">
      <image href="/content/Mathe_2BFS2/3012_4.png" height="200" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 200">
      <image href="/content/Mathe_2BFS2/3012_5.png" height="200" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 200">
      <image href="/content/Mathe_2BFS2/3012_6.png" height="200" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 30">
      <image href="/content/Mathe_2BFS2/3012_7.png" height="30" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 30">
      <image href="/content/Mathe_2BFS2/3012_8.png" height="30" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 30">
      <image href="/content/Mathe_2BFS2/3012_9.png" height="30" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 50">
      <image href="/content/Mathe_2BFS2/3012_10.png" height="50" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 50">
      <image href="/content/Mathe_2BFS2/3012_11.png" height="50" width="328" />
    </svg>
  </>,
  <>
    <svg viewBox="0 0 328 50">
      <image href="/content/Mathe_2BFS2/3012_12.png" height="50" width="328" />
    </svg>
  </>,
]
const einheit_x = [
  'Zeit',
  'gefahrene Kilometer',
  'Zeit',
  'Zeit',
  'Zeit',
  'Zeit',
  'Stunden',
  'verkaufte Äpfel',
  'verkaufte Energydrinks',
  'Stunden',
  'Minuten',
  'Minuten',
]
const einheit_y = [
  'Anzahl Bakterien',
  'Kosten in €',
  'Temperatur in °C',
  'Strecke in m',
  'Temperatur in °C',
  'Anzahl Tiere',
  'Höhe in cm',
  'Einnahmen in €',
  'Kosten in €',
  'Reihen Ziegelsteine',
  'gefahrene Kilometer',
  'Fortschritt in %',
]
const begründungen = [
  'Die y-Werte verdoppeln sich in regelmäßigen Abständen. Diese stellen die Bakterien dar.',
  'Die Geradengleichung stellt den festen Preis von 8 € dar und die 2,50 €, die für jeden x-Wert dazukommen.',
  'Die Temperatur steigt immer wieder an, bis der Kühlschrank wieder beginnt zu kühlen. Das stellt der Graph dar.',
  'Der Graph stellt den zurückgelegten Weg dar, der quadratisch zunimmt.',
  'Die Temperatur fällt am Anfang schnell und immer langsamer, bis sie sich der Raumtemperatur annähert.',
  'Der Graph nähert sich einer Obergrenze an, genauso wie die Population der Tiere.',
  'Die Gerade stellt die 14 cm Höhe da und die 2 cm, die mit jedem x-Wert die Höhe reduzieren.',
  'Die Gerade stellt korrekt die 10 € Kosten für den Stand dar und die 1 €, die mit jedem x-Wert hinzukommen.',
  'Die Gerade stellt richtig dar, wie mit jedem x-Wert (Energydrink), 2,50 € Kosten dazukommen.',
  'Die Werte beschreiben genau wie in jeder Stunde (x-Werte) genau 2 Reihen Ziegel dazukommen.',
  'Die Werte beschreiben genau wie in jeder Minute (x-Werte), ein Kilometer Strecke dazukommt.',
  'Die Werte beschreiben den Fortschritt von 0 % bis 100 %.',
]
export const exercise3012: Exercise<DATA> = {
  title: 'Darstellungen',
  source: '2021 Wahlteil Aufgabe 4B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return { order: rng.shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) }
  },
  originalData: { order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Nachfolgend sind Beschreibungen und mathematische Darstellungen
          gegeben.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const einheit_y_shuffled = data.order.map(i => einheit_y[i])
        const einheit_x_shuffled = data.order.map(i => einheit_x[i])
        const beschreibungen_shuffled = data.order.map(i => beschreibungen[i])
        const darstellungen_shuffled = data.order.map(i => darstellungen[i])
        return (
          <>
            <ol>
              <li>{beschreibungen_shuffled[0]}</li>
              <li>{beschreibungen_shuffled[1]}</li>
              <li>{beschreibungen_shuffled[2]}</li>
            </ol>
            {darstellungen_shuffled[0]}
            <p>Darstellung 1</p>
            {darstellungen_shuffled[1]}
            <p>Darstellung 2</p>
            {darstellungen_shuffled[2]}
            <p>Darstellung 3</p>
          </>
        )
      },
      solution({ data }) {
        const einheit_y_shuffled = data.order.map(i => einheit_y[i])
        const einheit_x_shuffled = data.order.map(i => einheit_x[i])
        const beschreibungen_shuffled = data.order.map(i => beschreibungen[i])
        const darstellungen_shuffled = data.order.map(i => darstellungen[i])
        const begründungen_shuffled = data.order.map(i => begründungen[i])
        return (
          <>
            <p>
              Beschreibung 1 gehört zur Darstellung: {darstellungen_shuffled[0]}
            </p>
            <p>{begründungen_shuffled[0]}</p>
            <p>
              Beschreibung 2 gehört zur Darstellung: {darstellungen_shuffled[1]}
            </p>
            <p>{begründungen_shuffled[1]}</p>
            <p>
              Beschreibung 3 gehört zur Darstellung: {darstellungen_shuffled[2]}
            </p>
            <p>{begründungen_shuffled[2]}</p>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Geben Sie für eine Darstellung Ihrer Wahl an, welche Einheit{' '}
              <InlineMath math="x" /> und <InlineMath math="y" /> haben.
            </p>
          </>
        )
      },
      solution({ data }) {
        const einheit_y_shuffled = data.order.map(i => einheit_y[i])
        const einheit_x_shuffled = data.order.map(i => einheit_x[i])
        const beschreibungen_shuffled = data.order.map(i => beschreibungen[i])
        const darstellungen_shuffled = data.order.map(i => darstellungen[i])
        const begründungen_shuffled = data.order.map(i => begründungen[i])
        return (
          <>
            {darstellungen_shuffled[0]}
            <p>Darstellung 1 hat die Einheiten:</p>
            <ul>
              <li>
                <InlineMath math={`x:`} /> {einheit_x_shuffled[0]}
              </li>
              <li>
                <InlineMath math={`y:`} /> {einheit_y_shuffled[0]}
              </li>
            </ul>
            <br></br>
            <br></br>
            {darstellungen_shuffled[1]}
            <p>Darstellung 2 hat die Einheiten:</p>
            <ul>
              <li>
                <InlineMath math={`x:`} />
                {einheit_x_shuffled[1]}
              </li>
              <li>
                <InlineMath math={`y:`} /> {einheit_y_shuffled[1]}
              </li>
            </ul>
            <br></br>
            <br></br>
            {darstellungen_shuffled[2]}
            <p>Darstellung 3 hat die Einheiten:</p>
            <ul>
              <li>
                <InlineMath math={`x:`} />
                {einheit_x_shuffled[2]}
              </li>
              <li>
                <InlineMath math={`y:`} /> {einheit_y_shuffled[2]}
              </li>
            </ul>
          </>
        )
      },
    },
  ],
}
