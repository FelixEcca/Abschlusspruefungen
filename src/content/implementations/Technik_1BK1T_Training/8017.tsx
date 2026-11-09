import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

const m = (math: string) => <InlineMath math={math} />

const questions = [
  {
    q: 'Eine schwere und eine leichte Kugel werden gleichzeitig aus derselben Höhe losgelassen. Welche kommt im Modell des freien Falls zuerst an?',
    a: (
      <>
        Beide kommen gleichzeitig an. Ohne Luftwiderstand hängt die Fallzeit bei
        gleicher Anfangsgeschwindigkeit und Fallstrecke nur von {m('g')} ab,
        nicht von der Masse.
      </>
    ),
  },
  {
    q: 'Ein flaches Blatt Papier fällt in Luft langsamer als eine kompakte Metallkugel. Widerspricht das dem Modell des freien Falls?',
    a: (
      <>
        Nein. In Luft wirkt beim Blatt der Luftwiderstand im Verhältnis zur
        Gewichtskraft deutlich stärker. Das Modell des freien Falls
        vernachlässigt den Luftwiderstand.
      </>
    ),
  },
  {
    q: 'Zwei Steine werden aus der Ruhe losgelassen. Einer fällt aus vierfacher Höhe. Vergleichen Sie Fallzeit und Aufprallgeschwindigkeit.',
    a: (
      <>
        Die Fallzeit verdoppelt sich, weil {m('t=\\sqrt{2y/g}')} gilt. Die
        Aufprallgeschwindigkeit verdoppelt sich ebenfalls, denn{' '}
        {m('v(t)=g\\cdot t')}.
      </>
    ),
  },
  {
    q: 'Ein Gegenstand hat nach einer Sekunde eine bestimmte Strecke durchfallen. Ist der Weg in der zweiten Sekunde genauso groß? Begründen Sie. Der Boden wird erst später erreicht.',
    a: (
      <>
        Nein. Die Geschwindigkeit steigt. Aus {m('y(t)=\\frac12gt^2')} folgt für
        die zweite Sekunde die dreifache Strecke der ersten Sekunde.
      </>
    ),
  },
  {
    q: 'Die positive y-Richtung zeigt beim freien Fall nach unten. Eine Person sagt: „Wenn y wächst, steigt der Körper höher.“ Beurteilen Sie.',
    a: (
      <>
        Die Aussage ist falsch. {m('y')} ist die Fallstrecke ab dem Startpunkt.
        Bei Starthöhe {m('h_0')} über dem Boden nimmt die verbleibende Höhe{' '}
        {m('h_0-y')} ab.
      </>
    ),
  },
  {
    q: 'Zwei Körper fallen aus gleicher Höhe und aus der Ruhe, einer bei größerem g. Wie unterscheiden sich Fallzeit und Aufprallgeschwindigkeit ohne Luftwiderstand?',
    a: (
      <>
        Bei größerem {m('g')} ist die Fallzeit {m('t=\\sqrt{2y/g}')} kürzer, die
        Aufprallgeschwindigkeit {m('v=\\sqrt{2gy}')} aber größer.
      </>
    ),
  },
]
export const exercise8017: Exercise<{ index: number }> = {
  title: 'Freien Fall verstehen',
  source: '1BK1T GT',
  useCalculator: false,
  duration: 5,
  points: 4,
  generator: rng => ({ index: rng.randomIntBetween(0, questions.length - 1) }),
  originalData: { index: 2 },
  constraint: ({ data }) =>
    Number.isInteger(data.index) && !!questions[data.index],
  task: ({ data }) => <p>{questions[data.index].q}</p>,
  solution: ({ data }) => <p>{questions[data.index].a}</p>,
}
