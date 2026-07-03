import * as React from 'react'
import { Exercise } from '@/data/types'
import { Color2, Color3 } from '@/helper/colors'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x_s: number
  y_s: number
  m: number
  b: number
  verzerrung: number
}

function numberToLatex(x: number) {
  if (Number.isInteger(x)) return String(x)
  if (Math.abs(x) === 0.5)
    return `\\tfrac{${x < 0 ? '-' : ''}1}{2}`.replace('{-1}', '-1')
  if (Math.abs(x) === 1.5)
    return `\\tfrac{${x < 0 ? '-' : ''}3}{2}`.replace('{-3}', '-3')
  if (Math.abs(x) === 2.5)
    return `\\tfrac{${x < 0 ? '-' : ''}5}{2}`.replace('{-5}', '-5')
  return String(x).replace('.', '{,}')
}

function linearLatex(m: number, b: number) {
  let s = 'y = '

  if (m === 1) s += 'x'
  else if (m === -1) s += '-x'
  else s += `${numberToLatex(m)}x`

  if (b > 0) s += ` + ${pp(b)}`
  if (b < 0) s += ` - ${pp(Math.abs(b))}`

  return s
}

function parabolaLatex(x_s: number, y_s: number) {
  let s = 'y = (x'
  if (x_s > 0) s += ` - ${pp(x_s)}`
  if (x_s < 0) s += ` + ${pp(Math.abs(x_s))}`
  s += ')^{2}'
  if (y_s > 0) s += ` + ${pp(y_s)}`
  if (y_s < 0) s += ` - ${pp(Math.abs(y_s))}`
  return s
}

function toX(n: number, verzerrung: number) {
  return 167 + verzerrung * n * ((94.5 * 2) / 10)
}
function toY(n: number, verzerrung: number) {
  return 163 - verzerrung * n * ((94.5 * 2) / 10)
}

function generateParabolaPoints(
  x_s: number,
  y_s: number,
  verzerrung: number,
  step: number,
): string {
  let points = ''
  for (let x = -11; x <= 11; x += step) {
    const y = (x - x_s) * (x - x_s) + y_s
    points += `${toX(x, verzerrung)},${toY(y, verzerrung)} `
  }
  return points.trim()
}

function generateLinePoints(
  m: number,
  b: number,
  verzerrung: number,
  step: number,
): string {
  let points = ''
  for (let x = -11; x <= 11; x += step) {
    const y = m * x + b
    points += `${toX(x, verzerrung)},${toY(y, verzerrung)} `
  }
  return points.trim()
}

export const exercise3151: Exercise<DATA> = {
  title: 'Schaubilder',
  source: '2024 Pflichtteil Aufgabe 1B',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    return {
      x_s: rng.randomIntBetween(-3, 3),
      y_s: rng.randomIntBetween(-3, 3),
      m: rng.randomIntBetween(-3, 3) / 2,
      b: rng.randomIntBetween(-3, 3),
      verzerrung: rng.randomIntBetween(1, 2),
    }
  },

  originalData: { x_s: -1, y_s: -3, m: -0.5, b: 1, verzerrung: 2 },

  constraint({ data }) {
    const p = 2 * -data.x_s - data.m
    const q = data.x_s * data.x_s + data.y_s - data.b
    return (
      data.x_s !== 0 &&
      data.y_s !== 0 &&
      data.m !== 0 &&
      data.b !== 0 &&
      (p / 2) * (p / 2) - q > 0
    )
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 42,
      intro({ data }) {
        const parabolaPoints = generateParabolaPoints(
          data.x_s,
          data.y_s,
          data.verzerrung,
          0.1,
        )
        const linePoints = generateLinePoints(
          data.m,
          data.b,
          data.verzerrung,
          0.1,
        )

        return (
          <>
            <p>
              Gegeben sind die Parabel p mit <br />
              <InlineMath math={parabolaLatex(data.x_s, data.y_s)} /> und die
              Gerade g mit <br />
              <InlineMath
                math={`${pp(data.m)}x ${data.b >= 0 ? '+' : '-'} ${pp(Math.abs(data.b))}`}
              />{' '}
              sowie deren Schaubilder.
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksblanko.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={linePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </>
        )
      },
      task() {
        return (
          <>
            <p>
              Übertragen Sie das Koordinatensystem und die Graphen auf Papier.
            </p>
            <p>
              Beschriften und skalieren Sie die Achsen des Koordinatensystems.
            </p>
          </>
        )
      },
      solution({ data }) {
        const parabolaPoints = generateParabolaPoints(
          data.x_s,
          data.y_s,
          data.verzerrung,
          0.1,
        )
        const linePoints = generateLinePoints(
          data.m,
          data.b,
          data.verzerrung,
          0.1,
        )

        return (
          <>
            <p>
              Es hilft den Scheitelpunkt der Parabel <br />
              <InlineMath math={`S(${pp(data.x_s)}\\mid ${pp(data.y_s)})`} /> zu
              bestimmen, um die Skalierung herauszufinden.
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksblanko.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={linePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <text
                x={150}
                y={15}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                y
              </text>
              <text
                x={300}
                y={153}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>

              {Array.from({ length: 40 }, (_, index) => {
                const i = index - 20
                const itop = index + 1
                const ibot = index - 40

                return (
                  <React.Fragment key={i}>
                    <text
                      x={toX(i, data.verzerrung)}
                      y={toY(0, data.verzerrung)}
                      fontSize={5}
                      textAnchor="middle"
                      stroke="black"
                    >
                      |
                    </text>
                    <text
                      x={toX(i, data.verzerrung)}
                      y={toY(0, data.verzerrung) + 17}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {i}
                    </text>
                    <text
                      x={toX(0, data.verzerrung) + 15}
                      y={toY(itop, data.verzerrung)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {itop}
                    </text>
                    <text
                      x={toX(0, data.verzerrung) + 15}
                      y={toY(ibot, data.verzerrung)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {ibot}
                    </text>
                    <text
                      x={toX(0, data.verzerrung)}
                      y={toY(itop, data.verzerrung) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                    <text
                      x={toX(0, data.verzerrung)}
                      y={toY(ibot, data.verzerrung) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                  </React.Fragment>
                )
              })}
            </svg>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Beschreiben Sie, wie die Parabel p aus der Normalparabel mit{' '}
              <InlineMath math="y=x^{2}" /> entsteht.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Parabel wurde...</p>
            <ol>
              <li>
                um <Color2>{Math.abs(data.x_s)}</Color2>{' '}
                {Math.abs(data.x_s) === 1 ? <>Einheit</> : <>Einheiten</>} nach{' '}
                {data.x_s < 0 ? <>links</> : <>rechts</>} verschoben:
                <br />
                <InlineMath math="y=x^{2}" /> wird zu
                <br />
                <InlineMath
                  math={`y=(x \\color{green}${data.x_s > 0 ? '-' : '+'}\\,${pp(
                    Math.abs(data.x_s),
                  )}\\color{black})^{2}`}
                />
              </li>
              <li>
                um <Color3>{Math.abs(data.y_s)}</Color3>{' '}
                {Math.abs(data.y_s) === 1 ? <>Einheit</> : <>Einheiten</>} nach{' '}
                {data.y_s < 0 ? <>unten</> : <>oben</>} verschoben:
                <br />
                <InlineMath
                  math={`y=(x ${data.x_s > 0 ? '-' : '+'}\\,${pp(Math.abs(data.x_s))})^{2}`}
                />{' '}
                wird zu
                <br />
                <InlineMath
                  math={`y=(x ${data.x_s > 0 ? '-' : '+'}\\,${pp(
                    Math.abs(data.x_s),
                  )})^{2}\\color{orange}${data.y_s > 0 ? '+' : '-'}\\,${pp(
                    Math.abs(data.y_s),
                  )}`}
                />
              </li>
            </ol>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Geben Sie die Gleichung einer Geraden h an, die parallel zur
              Geraden g verläuft und die Parabel nicht schneidet.
            </p>
          </>
        )
      },
      solution({ data }) {
        const hIntercept = -data.m * data.x_s - 1 + data.y_s

        const parabolaPoints = generateParabolaPoints(
          data.x_s,
          data.y_s,
          data.verzerrung,
          0.1,
        )
        const linePoints = generateLinePoints(
          data.m,
          data.b,
          data.verzerrung,
          0.1,
        )
        const line2Points = generateLinePoints(
          data.m,
          hIntercept,
          data.verzerrung,
          0.1,
        )

        return (
          <>
            <p>
              Die Gerade h soll parallel zur Gerade g verlaufen:
              <br />
              <InlineMath math={`y_h = ${numberToLatex(data.m)}x + b`} />
            </p>
            <p>
              Wähle den y-Achsenabschnitt so klein, dass die Gerade unter der
              Parabel durchläuft:
            </p>
            <p>
              Zum Beispiel:{' '}
              <InlineMath
                math={linearLatex(data.m, hIntercept).replace('y = ', 'y_h = ')}
              />
            </p>

            <p>Tipp: Das lässt sich mit einer Skizze auch überprüfen.</p>

            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksblanko.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={linePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={line2Points}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
              <text
                x={150}
                y={15}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                y
              </text>
              <text
                x={300}
                y={153}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>

              {Array.from({ length: 40 }, (_, index) => {
                const i = index - 20
                const itop = index + 1
                const ibot = index - 40

                return (
                  <React.Fragment key={i}>
                    <text
                      x={toX(i, data.verzerrung)}
                      y={toY(0, data.verzerrung)}
                      fontSize={5}
                      textAnchor="middle"
                      stroke="black"
                    >
                      |
                    </text>
                    <text
                      x={toX(i, data.verzerrung)}
                      y={toY(0, data.verzerrung) + 17}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {i}
                    </text>
                    <text
                      x={toX(0, data.verzerrung) + 15}
                      y={toY(itop, data.verzerrung)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {itop}
                    </text>
                    <text
                      x={toX(0, data.verzerrung) + 15}
                      y={toY(ibot, data.verzerrung)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {ibot}
                    </text>
                    <text
                      x={toX(0, data.verzerrung)}
                      y={toY(itop, data.verzerrung) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                    <text
                      x={toX(0, data.verzerrung)}
                      y={toY(ibot, data.verzerrung) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                  </React.Fragment>
                )
              })}
            </svg>
          </>
        )
      },
    },
  ],
}
