import { Exercise } from '@/data/types'
import { Color2, Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  x_s: number
  y_s: number
  ax: number
  delta_ay: number
}

export const exercise308: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2024 Wahlteil Aufgabe 3B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      x_s: rng.randomIntBetween(-5, 5),
      y_s: rng.randomIntBetween(-5, -1),
      ax: rng.randomIntBetween(-4, 4),
      delta_ay: rng.randomIntBetween(-1, 1),
    }
  },
  originalData: { x_s: -1, y_s: -3, ax: -3, delta_ay: -1 },
  constraint({ data }) {
    return data.x_s != 0
  },
  intro({ data }) {
    return (
      <>
        <p>
          Gegeben ist die Parabelgleichung <br></br>p: y = x²{' '}
          {pp(data.x_s * 2, 'merge_op')}x{' '}
          {pp(data.x_s * data.x_s + data.y_s, 'merge_op')}.
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
        function parabel(n: number) {
          return n * n + data.x_s * 2 * n + data.x_s * data.x_s + data.y_s
        }
        return (
          <>
            <p>
              Untersuchen Sie, ob der Punkt A({pp(data.ax)}|
              {parabel(data.ax) + data.delta_ay}) auf der Parabel, oberhalb der
              Parabel oder unterhalb der Parabel liegt.
            </p>
          </>
        )
      },
      solution({ data }) {
        function parabel(n: number) {
          return n * n + data.x_s * 2 * n + data.x_s * data.x_s + data.y_s
        }
        return (
          <>
            <p>Setze den x-Wert in die Funktion ein und berechne:</p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² {pp(data.x_s * 2, 'merge_op')}x{' '}
                  {pp(data.x_s * data.x_s + data.y_s, 'merge_op')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(data.ax, 'embrace_neg')}² {pp(data.x_s * 2, 'merge_op')} ·{' '}
                  {pp(data.ax, 'embrace_neg')}{' '}
                  {pp(data.x_s * data.x_s + data.y_s, 'merge_op')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(data.ax * data.ax)}{' '}
                  {pp(data.x_s * 2 * data.ax, 'merge_op')}{' '}
                  {pp(data.x_s * data.x_s + data.y_s, 'merge_op')}
                </>,
              ],
              [<></>, <>=</>, <>{parabel(data.ax)}</>],
            ])}
            <p>
              Die Parabel hat{' '}
              {data.delta_ay == 0 && <>den gleichen y-Wert wie der Punkt.</>}
              {data.delta_ay == 1 && (
                <>einen niedrigeren y-Wert als der Punkt.</>
              )}{' '}
              {data.delta_ay == -1 && <>einen größeren y-Wert als der Punkt.</>}{' '}
            </p>
            <p>
              Damit liegt der Punkt A({pp(data.ax)}|
              {parabel(data.ax) + data.delta_ay}){' '}
              {data.delta_ay == 0 && <>auf</>}
              {data.delta_ay == -1 && <>unter</>}{' '}
              {data.delta_ay == 1 && <>über</>} der Parabel.
            </p>
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
              Berechnen Sie die gemeinsamen Punkte der Parabel p mit der
              x-Achse. Runden Sie falls nötig auf zwei Nachkommastellen.
            </p>
          </>
        )
      },
      solution({ data }) {
        const p = 2 * data.x_s
        const q = data.x_s * data.x_s + data.y_s
        return (
          <>
            <p>
              Berechne die Nullstellen der Parabel <br></br>y = x²{' '}
              {pp(data.x_s * 2, 'merge_op')}x{' '}
              {pp(data.x_s * data.x_s + data.y_s, 'merge_op')}.
            </p>
            <p>
              {' '}
              Bestimme p und q: p = {pp(p)}, q = {pp(q)}
            </p>
            <p>Setze in die pq-Formel ein und berechne:</p>
            {buildEquation([
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  −{buildInlineFrac('p', 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac('p', 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      q
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  −{buildInlineFrac(p, 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac(p, 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −{' '}
                      {q < 0 && <>(</>}
                      {pp(q)}
                      {q < 0 && <>)</>}
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  −{buildInlineFrac(p, 2)} ±{' '}
                  {buildSqrt(
                    <>
                      {p / 2}² − {q < 0 && <>(</>}
                      {pp(q)}
                      {q < 0 && <>)</>}
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <>
                    <span style={{ verticalAlign: 'middle' }}>
                      {pp(-p / 2)} ±{' '}
                    </span>
                    {buildSqrt(pp((p / 2) * (p / 2) - q))}
                  </>
                </>,
              ],
              [
                <></>,
                <>
                  {Math.sqrt((p / 2) * (p / 2) - q) % 1 != 0 ? <>≈</> : <>=</>}
                </>,
                <>
                  <>
                    <span style={{ verticalAlign: 'middle' }}>
                      {pp(-p / 2)} ±{' '}
                    </span>
                    {pp(roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2))}
                  </>
                </>,
              ],
            ])}

            <p>
              x<sub>1</sub> = {pp(-p / 2)} +{' '}
              {pp(roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2))} ={' '}
              {pp(-p / 2 + roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2))}
              <br></br>x<sub>2</sub> = {pp(-p / 2)} -{' '}
              {pp(roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2))} ={' '}
              {pp(-p / 2 - roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2))}
            </p>

            <p>Damit sind die gemeinsamen Punkte mit der x-Achse:</p>
            <p>
              <b>
                N<sub>1</sub>(
                {pp(
                  -p / 2 + roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2),
                )}
                |0) N<sub>2</sub>(
                {pp(
                  -p / 2 - roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2),
                )}
                |0)
              </b>
            </p>
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
            <p>Bestimmen Sie die Scheitlform der Parabel p.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bestimme die Scheitelform der Parabel mit einer quadratischen
              Ergänzung:
            </p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² <b>{pp(data.x_s * 2, 'merge_op')}</b>x{' '}
                  {pp(data.x_s * data.x_s + data.y_s, 'merge_op')}
                </>,
              ],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Egänze mit dem Term{' '}
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac(
                        <>
                          <b>{pp(data.x_s * 2)}</b>
                        </>,
                        2,
                      )}
                      <span className="inline-block  scale-y-[2.6]">)</span>²
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  x² {pp(data.x_s * 2, 'merge_op')}x{' '}
                  <Color2>
                    + <span className="inline-block  scale-y-[2.6]">(</span>
                    {buildInlineFrac(<>{pp(data.x_s * 2)}</>, 2)}
                    <span className="inline-block  scale-y-[2.6]">)</span>²
                  </Color2>{' '}
                  {pp(data.x_s * data.x_s + data.y_s, 'merge_op')}{' '}
                  <Color2>
                    - <span className="inline-block  scale-y-[2.6]">(</span>
                    {buildInlineFrac(<>{pp(data.x_s * 2)}</>, 2)}
                    <span className="inline-block  scale-y-[2.6]">)</span>²
                  </Color2>
                </>,
              ],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Fasse den vorderen Teil zu einem Binom zusammen.
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x {pp(data.x_s, 'merge_op')})²{' '}
                  {pp(data.x_s * data.x_s + data.y_s, 'merge_op')} -{' '}
                  {pp(data.x_s)}²
                </>,
              ],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Fasse den hinteren Teil zusammen.
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x {pp(data.x_s, 'merge_op')})² {pp(data.y_s, 'merge_op')}{' '}
                </>,
              ],
            ])}
          </>
        )
      },
    },
  ],
}
