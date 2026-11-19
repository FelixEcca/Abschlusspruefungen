import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

const m = (math: string) => <InlineMath math={math} />

const questions = [
  {
    q: 'Eine Kugel wird aus der Ruhe losgelassen. Welche Form haben ihr y-t-Graph und ihr v-t-Graph, wenn die positive y-Achse nach unten zeigt?',
    a: (
      <>
        Der y-t-Graph ist eine nach oben geöffnete Parabel ab dem Ursprung, denn{' '}
        {m('y(t)=\\frac12gt^2')}. Der v-t-Graph ist eine ansteigende Gerade
        durch den Ursprung, denn {m('v(t)=g\\cdot t')}.
      </>
    ),
  },
  {
    q: 'Eine Kugel fällt aus der Ruhe doppelt so lange wie eine andere. Vergleichen Sie die durchfallenen Strecken und Geschwindigkeiten vor dem Aufprall.',
    a: (
      <>
        Die Fallstrecke ist viermal so groß, die Geschwindigkeit doppelt so
        groß. Die Strecke hängt von {m('t^2')} ab, die Geschwindigkeit von{' '}
        {m('t')}.
      </>
    ),
  },
  {
    q: 'Ein Schüler sagt: „Weil g konstant ist, fällt ein Körper mit konstanter Geschwindigkeit.“ Beurteilen Sie.',
    a: 'Die Aussage ist falsch. g ist die konstante Beschleunigung. Die Geschwindigkeit nimmt beim Fallen in jeder Sekunde um etwa 9,81 m/s zu.',
  },
  {
    q: 'Ein Körper wird nach unten geworfen statt aus der Ruhe losgelassen. Darf man seine Fallstrecke direkt mit y(t) = ½·g·t² berechnen?',
    a: (
      <>
        Nein. Die Anfangsgeschwindigkeit ist nicht null. Bei Ursprung am
        Startpunkt und positiver Richtung nach unten gilt{' '}
        {m('y(t)=v_0\\cdot t+\\frac12gt^2')}.
      </>
    ),
  },
  {
    q: 'Zwei gleich große Kugeln unterschiedlicher Masse fallen im Vakuum. Welche hat nach derselben Fallzeit die größere Geschwindigkeit, wenn beide aus der Ruhe starten?',
    a: 'Beide haben dieselbe Geschwindigkeit. Bei gleichem g gilt für beide v(t) = g·t; die Masse kommt darin nicht vor.',
  },
  {
    q: 'Eine Kugel wird fallengelassen. Unmittelbar beim Loslassen ist ihre Geschwindigkeit null. Ist ihre Beschleunigung zu diesem Zeitpunkt ebenfalls null?',
    a: 'Nein. Schon unmittelbar nach dem Loslassen wirkt die Fallbeschleunigung g nach unten. Geschwindigkeit und Beschleunigung sind verschiedene Größen.',
  },
  {
    q: 'Man möchte die Fallzeit einer aus der Ruhe fallenden Kugel halbieren. Wie muss sich die Fallhöhe bei gleichem g ändern?',
    a: (
      <>
        Die Fallhöhe muss auf ein Viertel sinken. Nach {m('y=\\frac12gt^2')}{' '}
        führt die halbe Fallzeit zur vierfach kleineren Fallstrecke.
      </>
    ),
  },
  {
    q: 'Auf dem Mond ist g kleiner als auf der Erde. Welche Kugel erreicht bei gleicher Fallhöhe aus der Ruhe zuerst den Boden, und welche prallt schneller auf?',
    a: 'Die Kugel auf der Erde erreicht zuerst den Boden und hat die größere Aufprallgeschwindigkeit. Das größere g verkürzt die Fallzeit und erhöht die Endgeschwindigkeit.',
  },
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
