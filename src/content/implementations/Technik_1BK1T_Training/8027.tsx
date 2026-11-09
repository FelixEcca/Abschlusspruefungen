import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

const m = (math: string) => <InlineMath math={math} />

const questions = [
  {
    q: 'Ein Ball landet auf Höhe seines Abwurfpunkts. Ein zweiter Ball wird mit denselben Abwurfkomponenten von einem Podest geworfen und landet tiefer. Vergleichen Sie bei beiden Würfen Steigzeit, Fallzeit und Wurfweite.',
    a: (
      <>
        Die Steigzeit ist gleich, weil {m('v_{0y}')} gleich ist. Beim ersten
        Wurf gilt {m('h_{\\mathrm{fall}}=h_{\\mathrm{steig}}')} und damit{' '}
        {m('t_{\\mathrm{fall}}=t_{\\mathrm{steig}}')}. Beim Wurf vom Podest ist
        die Fallhöhe größer, also dauert das Fallen länger. Weil {m('v_{0x}')}{' '}
        gleich bleibt, ist auch die Wurfweite größer.
      </>
    ),
  },
  {
    q: 'Zwei Bälle werden gleich schnell abgeworfen, einer unter 30°, einer unter 60°. Beide landen auf Höhe des Abwurfpunkts. Welcher fliegt höher, welcher weiter?',
    a: (
      <>
        Der Wurf unter 60° hat die größere vertikale Abwurfkomponente und damit
        die größere Steighöhe. Die Wurfweiten sind gleich: Bei gleicher Abwurf-
        und Landehöhe gilt {m('w=2v_{0x}v_{0y}/g')}. Bei den beiden Winkeln
        tauschen die Komponenten ihre Werte, ihr Produkt bleibt gleich.
      </>
    ),
  },
  {
    q: 'Eine Wurfmaschine erzeugt zwei Würfe mit derselben horizontalen Abwurfkomponente. Beim zweiten Wurf ist die vertikale Abwurfkomponente größer. Abwurfhöhe und Landeniveau sind jeweils gleich. Vergleichen Sie die Flugbahnen.',
    a: (
      <>
        Der zweite Körper steigt länger und höher. Seine größere Steighöhe führt
        auch zu einer größeren Fallhöhe und damit zu längerer Fallzeit. Bei
        gleichem {m('v_{0x}')} führt die längere Flugzeit zu einer größeren
        Wurfweite.
      </>
    ),
  },
  {
    q: 'In einer Zeichnung zeigt der Geschwindigkeitspfeil am höchsten Punkt waagerecht. Eine Person behauptet: „Dann ist dort auch die Beschleunigung null.“ Beurteilen Sie.',
    a: (
      <>
        Die Beschleunigung zeigt weiterhin nach unten. Nur {m('v_y=0')} gilt für
        diesen einen Moment. Die horizontale Geschwindigkeit bleibt{' '}
        {m('v_x=v_{0x}')}; die vertikale Beschleunigung ist bei nach oben
        gerichteter y-Achse {m('a_y=-g')}.
      </>
    ),
  },
  {
    q: 'Zwei Kugeln werden von derselben Höhe gestartet. Die erste wird horizontal geworfen. Die zweite bekommt dieselbe horizontale, zusätzlich aber eine nach oben gerichtete vertikale Startgeschwindigkeit. Welche landet weiter entfernt?',
    a: (
      <>
        Die zweite Kugel. Sie steigt erst und fällt dann aus einer größeren
        Höhe. Sie ist länger in der Luft, während sich beide horizontal mit
        derselben konstanten Geschwindigkeit bewegen.
      </>
    ),
  },
]
export const exercise8027: Exercise<{ index: number }> = {
  title: 'Flugbahnen vergleichen und begründen',
  source: '1BK1T GT',
  useCalculator: false,
  duration: 6,
  points: 5,
  generator: rng => ({ index: rng.randomIntBetween(0, questions.length - 1) }),
  originalData: { index: 0 },
  constraint: ({ data }) =>
    Number.isInteger(data.index) && !!questions[data.index],
  task: ({ data }) => (
    <>
      <p>
        {questions[data.index].q} Begründen Sie Ihre Antwort. Vernachlässigen
        Sie den Luftwiderstand.
      </p>
    </>
  ),
  solution: ({ data }) => <p>{questions[data.index].a}</p>,
}
