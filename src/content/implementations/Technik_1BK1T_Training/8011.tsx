import { Exercise } from '@/data/types'

interface DATA {
  question: number
}

const qa = [
  {
    q: 'Was bedeutet gleichförmige Bewegung?',
    a: 'Die Geschwindigkeit bleibt konstant. In gleichen Zeitabschnitten werden gleiche Strecken zurückgelegt.',
  },
  {
    q: 'Was bedeutet gleichmäßig beschleunigte Bewegung?',
    a: 'Die Geschwindigkeit ändert sich gleichmäßig. Die Beschleunigung ist konstant.',
  },
  {
    q: 'Was bedeutet verzögern?',
    a: 'Die Geschwindigkeit nimmt ab. In Bewegungsrichtung ist die Beschleunigung dann negativ.',
  },
  {
    q: 'Was ist die Steigung im x-t-Diagramm?',
    a: 'Die Steigung im x-t-Diagramm ist die Geschwindigkeit.',
  },
  {
    q: 'Was ist die Steigung im v-t-Diagramm?',
    a: 'Die Steigung im v-t-Diagramm ist die Beschleunigung.',
  },
  {
    q: 'Was ist die Fläche unter einem v-t-Diagramm?',
    a: 'Die Fläche unter dem v-t-Diagramm ist die zurückgelegte Strecke.',
  },
  {
    q: 'Woran erkennt man im x-t-Diagramm, dass ein Körper ruht?',
    a: 'Der Ort ändert sich nicht. Der Graph verläuft waagerecht und hat die Steigung null.',
  },
  {
    q: 'Was bedeutet eine waagerechte Linie im v-t-Diagramm?',
    a: 'Die Geschwindigkeit ist konstant. Die Beschleunigung beträgt 0 m/s².',
  },
  {
    q: 'Was bedeutet eine steilere Gerade im x-t-Diagramm?',
    a: 'Der Betrag der Geschwindigkeit ist größer. Der Körper legt in derselben Zeit mehr Strecke zurück.',
  },
  {
    q: 'Was bedeutet eine ansteigende Gerade im v-t-Diagramm?',
    a: 'Die Geschwindigkeit nimmt zu. Die Beschleunigung ist positiv.',
  },
  {
    q: 'Was bedeutet eine fallende Gerade im v-t-Diagramm?',
    a: 'Die Geschwindigkeit nimmt ab. Bei positiver Bewegungsrichtung wird der Körper verzögert.',
  },
  {
    q: 'Welche Einheit hat die Geschwindigkeit im SI-System?',
    a: 'Die SI-Einheit der Geschwindigkeit ist Meter pro Sekunde: m/s.',
  },
  {
    q: 'Welche Einheit hat die Beschleunigung im SI-System?',
    a: 'Die SI-Einheit der Beschleunigung ist Meter pro Sekunde zum Quadrat: m/s².',
  },
  {
    q: 'Was beschreibt der Wert x₀ in einer Bewegungsgleichung?',
    a: 'x₀ ist der Ort zum Zeitpunkt t = 0 s, also der Startort.',
  },
  {
    q: 'Was beschreibt der Wert v₀ bei einer beschleunigten Bewegung?',
    a: 'v₀ ist die Geschwindigkeit zum Zeitpunkt t = 0 s, also die Anfangsgeschwindigkeit.',
  },
  {
    q: 'Welche Bedingung gilt am Treffpunkt zweier Fahrer?',
    a: 'Beide Fahrer befinden sich zur gleichen Zeit am gleichen Ort. Deshalb setzt man ihre Bewegungsgleichungen gleich.',
  },
  {
    q: 'Wie unterscheiden sich Geschwindigkeit und Beschleunigung?',
    a: 'Die Geschwindigkeit beschreibt, wie schnell sich der Ort ändert. Die Beschleunigung beschreibt, wie schnell sich die Geschwindigkeit ändert.',
  },
  {
    q: 'Kann ein Körper eine Geschwindigkeit haben, obwohl seine Beschleunigung null ist?',
    a: 'Ja. Bei einer gleichförmigen Bewegung ist die Geschwindigkeit konstant und die Beschleunigung null.',
  },
  {
    q: 'Kann ein Körper im Moment stillstehen und trotzdem beschleunigt sein?',
    a: 'Ja. Beim Anfahren kann die momentane Geschwindigkeit 0 m/s sein, während die Beschleunigung bereits positiv ist.',
  },
  {
    q: 'Was bedeutet eine negative Geschwindigkeit?',
    a: 'Der Körper bewegt sich entgegen der festgelegten positiven Richtung.',
  },
]

export const exercise8011: Exercise<DATA> = {
  title: 'Bewegungsbegriffe verstehen',
  source: '1BK1T GT',
  useCalculator: false,
  duration: 5,
  points: 5,
  generator(rng) {
    return { question: rng.randomIntBetween(0, qa.length - 1) }
  },
  originalData: { question: 0 },
  task({ data }) {
    return <p>{qa[data.question].q}</p>
  },
  solution({ data }) {
    return <p>{qa[data.question].a}</p>
  },
}
