import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { coord, vec, add, sub, mul, Vec } from './math'

interface DATA {
  point: Vec
  r: number
  s: number
  error: number
}
export const exercise22069: Exercise<DATA> = {
  title: 'Zwei Geraden auf einen Schnittpunkt untersuchen',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      point: [
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
      ],
      r: rng.randomIntBetween(-2, 3),
      s: rng.randomIntBetween(-2, 3),
      error: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { point: [1, 2, 3], r: 1, s: 2, error: 0 },
  task({ data }) {
    const u: Vec = [1, 1, 1],
      v: Vec = [1, -1, 2],
      a = sub(data.point, mul(u, data.r)),
      b = add(sub(data.point, mul(v, data.s)), [0, 0, data.error])
    return (
      <>
        <p>
          Untersuchen Sie, ob sich die Geraden schneiden. Falls ja, bestimmen
          Sie den Schnittpunkt.
        </p>
        <p>
          <InlineMath
            math={String.raw`g:\vec x=${vec(a)}+r${vec(u)},\quad h:\vec x=${vec(b)}+s${vec(v)}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Setzen Sie die drei Koordinaten gleich. Aus den ersten beiden
          Gleichungen folgt
        </p>
        <p>
          <InlineMath
            math={String.raw`r-s=${data.r - data.s},\quad r+s=${data.r + data.s}\quad\Rightarrow\quad r=${data.r},\ s=${data.s}`}
          />
          .
        </p>
        <p>
          In der dritten Koordinate ergibt g den Wert {data.point[2]}, h den
          Wert {data.point[2] + data.error}.{' '}
          {data.error ? (
            'Die dritte Gleichung ist nicht erfüllt. Es gibt keinen Schnittpunkt. Da die Richtungsvektoren nicht parallel sind, sind die Geraden windschief.'
          ) : (
            <>
              Alle drei Koordinaten stimmen. Der Schnittpunkt ist{' '}
              <InlineMath math={String.raw`S(${coord(data.point)})`} />.
            </>
          )}
        </p>
        <p>
          Nur zwei gelöste Koordinatengleichungen reichen für einen
          Schnittnachweis nicht aus.
        </p>
      </>
    )
  },
}
