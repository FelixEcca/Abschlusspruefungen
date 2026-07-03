import { Exercise } from '@/data/types'
import { Color2, Color3 } from '@/helper/colors'
import { InlineMath } from 'react-katex'

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

export const exercise3153: Exercise<DATA> = {
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
  task({ data }) {
    return (
      <>
        <p>Entscheiden Sie, ob die Aussagen wahr oder falsch sind.</p>
        <ul>
          <li>
            Die Parabel <InlineMath math="y=x^2" /> verläuft durch
            <InlineMath
              math={`Q(${data.x1}|${
                data.bool1 ? data.x1 * data.x1 : data.x1 * data.x1 + data.random
              }).`}
            />
          </li>
          <li>
            {data.case === 1 ? (
              <>Jede Parabel schneidet die y-Achse.</>
            ) : (
              <>Jede Parabel schneidet die x-Achse.</>
            )}
          </li>
          <li>
            <InlineMath
              math={`y=${data.random == 1 ? -data.m : -data.m + 'x'}`}
            />{' '}
            ist eine Gerade mit negativer Steigung.
          </li>
          <li>
            Die Parabel{' '}
            <InlineMath
              math={`y=(x${data.xs >= 0 ? '-' : '+'}${Math.abs(data.xs)})^2${data.ys >= 0 ? '+' : ''}${data.ys}`}
            />{' '}
            hat den Scheitel bei{' '}
            <InlineMath
              math={`S(${data.bool2 ? data.xs : -data.xs}|${data.ys})`}
            />
            .
          </li>
          <li>
            <InlineMath math={`x=${-data.num}`} /> ist eine Lösung von<br></br>{' '}
            <InlineMath
              math={`\\frac{1}{-x-${data.num}}+\\frac{1}{${data.num}}x=0`}
            />
          </li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return (
      <ul>
        <li>
          Aussage 1:{' '}
          {data.bool1 ? <Color2>Richtig</Color2> : <Color3>Falsch</Color3>}
        </li>
        <li>
          Aussage 2:{' '}
          {data.case === 1 ? <Color2>Richtig</Color2> : <Color3>Falsch</Color3>}
        </li>
        <li>
          Aussage 3:{' '}
          {data.random !== 1 ? (
            <Color2>Richtig</Color2>
          ) : (
            <Color3>Falsch</Color3>
          )}
        </li>
        <li>
          Aussage 4:{' '}
          {!data.bool2 ? <Color2>Richtig</Color2> : <Color3>Falsch</Color3>}
        </li>
        <li>
          Aussage 5:{' '}
          {1 / (-2 * data.num) + 1 !== 0 ? (
            <Color3>Falsch</Color3>
          ) : (
            <Color2>Richtig</Color2>
          )}
        </li>
      </ul>
    )
  },
}
