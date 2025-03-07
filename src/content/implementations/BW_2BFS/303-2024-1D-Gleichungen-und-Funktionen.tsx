import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'

interface DATA {}

export const exercise303: Exercise<DATA> = {
  title: 'Gleichungen und Funktionen',
  source: '2024 Hauptprüfung Hauptteil Aufgabe 1',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Entscheiden Sie jeweils, ob die folgenden Aussagen wahr oder falsch
          sind.
        </p>
        <ul>
          <li>
            Die Parabel mit der Gleichung y = x² verläuft durch den Punkt
            Q(0|0).
          </li>
          <li>Jede Parabel schneidet die y-Achse.</li>
          <li>
            Das Schaubild von y = -2 ist eine Gerade mit negativer Steigung.
          </li>
          <li>
            Die Parabel p mit y = (x + 1)² - 3 hat ihren Scheitel bei S(1|-3).
          </li>
          <li>
            x = -5 ist eine Lösung der Gleichung{' '}
            {buildInlineFrac(<>1</>, <>-x-5</>)} +{' '}
            {buildInlineFrac(<>1</>, <>5</>)}x = 0
          </li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
