import { Exercise } from '@/data/types'
import { Color2, Color3 } from '@/helper/colors'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  bool1: boolean
  x1: number
  random: number
  case: number
  value: number
  xs: number
  ys: number
  bool2: boolean
  num: number
  m: number
}

export const exercise303: Exercise<DATA> = {
  title: 'Gleichungen und Funktionen',
  source: '2024 Pflichtteil Aufgabe 1D',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      bool1: rng.randomBoolean(),
      bool2: rng.randomBoolean(),
      x1: rng.randomIntBetween(-3, 5),
      random: rng.randomIntBetween(1, 2),
      case: rng.randomIntBetween(1, 2),
      value: rng.randomIntBetween(-5, -2),
      xs: rng.randomIntBetween(-5, 5),
      ys: rng.randomIntBetween(-5, 5),
      num: rng.randomIntBetween(2, 6),
      m: rng.randomIntBetween(2, 6),
    }
  },
  originalData: {
    bool2: true,
    bool1: true,
    x1: 0,
    random: 1,
    case: 1,
    value: -2,
    xs: -1,
    ys: -3,
    num: 5,
    m: 2,
  },
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
            Die Parabel mit der Gleichung y = x² verläuft durch den Punkt Q(
            {pp(data.x1)}|
            {data.bool1 ? data.x1 * data.x1 : data.x1 * data.x1 + data.random}).
          </li>
          <li>
            {data.case == 1 ? (
              <>Jede Parabel schneidet die y-Achse.</>
            ) : (
              <>Jede Parabel schneidet die x-Achse.</>
            )}
          </li>
          <li>
            Das Schaubild von y ={' '}
            {data.random == 1 ? <>{pp(-data.m)}</> : <>{pp(-data.m)}x</>} ist
            eine Gerade mit negativer Steigung.
          </li>
          <li>
            Die Parabel p mit y = (x {pp(data.xs, 'merge_op')})²{' '}
            {pp(data.ys, 'merge_op')} hat ihren Scheitel bei S(
            {data.bool2 ? <>{pp(data.xs)}</> : <>{pp(-data.xs)}</>}|
            {pp(data.ys)}).
          </li>
          <li>
            x = {pp(-data.num)} ist eine Lösung der Gleichung{' '}
            {buildInlineFrac(<>1</>, <>x {pp(-data.num)}</>)} +{' '}
            {buildInlineFrac(<>1</>, <>{data.num}</>)}x = 0
          </li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <ul>
          <li>
            Aussage 1:{' '}
            {data.bool1 ? (
              <>
                <Color2>Richtig</Color2>
              </>
            ) : (
              <>
                <Color3>Falsch</Color3>
              </>
            )}
          </li>
          <li>
            Aussage 2:{' '}
            {data.case == 1 ? (
              <>
                <Color2>Richtig</Color2>
              </>
            ) : (
              <>
                <Color3>Falsch</Color3>
              </>
            )}
          </li>
          <li>
            Aussage 3:{' '}
            {data.random != 1 ? (
              <>
                <Color2>Richtig</Color2>
              </>
            ) : (
              <>
                <Color3>Falsch</Color3>
              </>
            )}
          </li>
          <li>
            Aussage 4:{' '}
            {!data.bool2 ? (
              <>
                <Color2>Richtig</Color2>
              </>
            ) : (
              <>
                <Color3>Falsch</Color3>
              </>
            )}
          </li>
          <li>
            Aussage 5:{' '}
            {1 / (-2 * data.num) + 1 != 0 ? (
              <>
                <Color3>Falsch</Color3>
              </>
            ) : (
              <>
                <Color2>Richtig</Color2>
              </>
            )}
          </li>
        </ul>
      </>
    )
  },
}
