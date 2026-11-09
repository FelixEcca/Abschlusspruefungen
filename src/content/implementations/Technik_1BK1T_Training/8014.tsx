import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

const m = (math: string) => <InlineMath math={math} />

const questions = [
  {
    q: (
      <>
        Ein Pkw fährt doppelt so schnell wie ein zweiter Pkw. Beide bremsen mit
        derselben konstanten Verzögerung bis zum Stillstand. Eine Schülerin
        sagt: „Der Bremsweg verdoppelt sich.“ Beurteilen Sie die Aussage.
      </>
    ),
    a: (
      <>
        Der Bremsweg vervierfacht sich: In {m('s_v=-v_0^2/(2a_v)')} steht die
        Anfangsgeschwindigkeit im Quadrat. Die Bremszeit verdoppelt sich
        dagegen, denn {m('t_v=-v_0/a_v')}.
      </>
    ),
  },
  {
    q: (
      <>
        Ein Radfahrer beginnt zu bremsen. Ein Schüler rechnet den Bremsweg mit{' '}
        {m('s=v_0\\cdot t_v')}. Erklären Sie seinen Fehler und geben Sie eine
        passende Formel an.
      </>
    ),
    a: (
      <>
        Die Geschwindigkeit bleibt beim Bremsen nicht konstant. Bei konstanter
        Verzögerung bis zum Stillstand passt {m('s_v=-v_0^2/(2a_v)')}. Im
        v-t-Diagramm ist der Bremsweg eine Dreiecksfläche.
      </>
    ),
  },
  {
    q: (
      <>
        Zwei Lieferwagen fahren gleich schnell. Beim ersten ist der Betrag der
        konstanten Verzögerung doppelt so groß. Wie unterscheiden sich Bremszeit
        und Bremsweg?
      </>
    ),
    a: (
      <>
        Beide halbieren sich. Bei festem {m('v_0')} stehen {m('t_v=-v_0/a_v')}{' '}
        und {m('s_v=-v_0^2/(2a_v)')} jeweils im umgekehrten Verhältnis zum
        Betrag von {m('a_v')}.
      </>
    ),
  },
  {
    q: (
      <>
        Eine Person am Steuer reagiert später, bremst danach aber aus derselben
        Geschwindigkeit mit derselben Verzögerung. Ändert sich der Bremsweg oder
        der Anhalteweg? Begründen Sie.
      </>
    ),
    a: (
      <>
        Der Bremsweg bleibt gleich, da {m('v_0')} und {m('a_v')} beim Bremsen
        gleich sind. Der Reaktionsweg wird länger und damit auch der gesamte
        Anhalteweg.
      </>
    ),
  },
  {
    q: (
      <>
        Eine Straßenbahn kommt nach gleichmäßigem Bremsen zum Stillstand.
        Begründen Sie, warum die Gerade im v-t-Diagramm für eine anschließende
        Standphase bei null waagerecht weitergeht.
      </>
    ),
    a: (
      <>
        Während der Standphase ist {m('v(t)=0')}. Das Bremsmodell mit{' '}
        {m('a_v<0')} gilt nur bis zum Stillstand. Verlängerte man die fallende
        Gerade, würde das eine Bewegung in Gegenrichtung beschreiben.
      </>
    ),
  },
]
export const exercise8014: Exercise<{ index: number }> = {
  title: 'Bremsvorgänge verstehen',
  source: '1BK1T GT',
  useCalculator: false,
  duration: 5,
  points: 4,
  generator: rng => ({ index: rng.randomIntBetween(0, questions.length - 1) }),
  originalData: { index: 0 },
  constraint: ({ data }) =>
    Number.isInteger(data.index) && !!questions[data.index],
  task: ({ data }) => <p>{questions[data.index].q}</p>,
  solution: ({ data }) => <p>{questions[data.index].a}</p>,
}
