// ==========================================
// 1D (3053) – p: (x+3)^2+1 ; g: 6x+2 (Skalieren)
// ==========================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x_s: number
  y_s: number
  m: number
  b: number
  scale: number
}

export const exercise3053: Exercise<DATA> = {
  title: 'Schaubilder',
  source: '2022 Pflichtteil Aufgabe 1D',
  useCalculator: false,
  duration: 8,

  generator(rng) {
    const scales = [0.5, 1, 2]
    return {
      x_s: rng.randomIntBetween(-6, 6),
      y_s: rng.randomIntBetween(-6, 6),
      m: rng.randomIntBetween(-6, 6),
      b: rng.randomIntBetween(-6, 6),
      scale: rng.randomItemFromArray(scales),
    }
  },

  originalData: { x_s: -3, y_s: 1, m: 6, b: 2, scale: 1 },

  constraint({ data }) {
    return (
      data.x_s != 0 &&
      data.y_s != 0 &&
      data.m != 0 &&
      data.b != 0 &&
      [0.5, 1, 2].includes(data.scale)
    )
  },

  task({ data }) {
    // scale: 1 means 1 unit = 1 grid, 2 means 1 unit = 2 grids, 0.5 means 1 unit = 0.5 grid
    const scale = data.scale

    function toX(n: number) {
      // 94*2/10 = 18.8 is the original scale for 1 unit
      // Multiply by scale to adjust
      return 167 + n * (18.8 * scale)
    }
    function toY(n: number) {
      return 163 - n * (18.8 * scale)
    }
    function generateParabolaPoints(
      b: number,
      c: number,
      step: number,
    ): string {
      let points = ''
      for (let x = -10; x <= 10; x += step) {
        const y = (x - b) * (x - b) + c
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    function linearPoints(m: number, b: number, step: number): string {
      let points = ''
      for (let x = -10; x <= 10; x += step) {
        const y = m * x + b
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    const parabolaPoints = generateParabolaPoints(data.x_s, data.y_s, 0.1)
    const linePoints = linearPoints(data.m, data.b, 0.1)
    return (
      <>
        <p>
          Gegeben sind die Parabel p und die Gerade g durch die Gleichungen:
          <br />
          <InlineMath
            math={`p: y=(x${data.x_s >= 0 ? '+' : ''}${pp(data.x_s)})^2${data.y_s >= 0 ? '+' : ''}${pp(data.y_s)}`}
          />{' '}
          und <br />
          <InlineMath math={`g: y=${data.m}x+${data.b}`} />.
        </p>
        <p>Beschriften und skalieren Sie das Koordinatensystem vollständig.</p>
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
        </svg>
        <svg viewBox="0 0 328 328">
          <image
            href="/content/BW_2BFS/ksblanko.png"
            height="328"
            width="328"
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
  solution({ data }) {
    const scale = data.scale

    function toX(n: number) {
      return 167 + n * (18.8 * scale)
    }
    function toY(n: number) {
      return 163 - n * (18.8 * scale)
    }
    function generateParabolaPoints(
      b: number,
      c: number,
      step: number,
    ): string {
      let points = ''
      for (let x = -10; x <= 10; x += step) {
        const y = (x - b) * (x - b) + c
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    function linearPoints(m: number, b: number, step: number): string {
      let points = ''
      for (let x = -10; x <= 10; x += step) {
        const y = m * x + b
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    const parabolaPoints = generateParabolaPoints(data.x_s, data.y_s, 0.1)
    const linePoints = linearPoints(data.m, data.b, 0.1)

    // Calculate the number of ticks for the axes based on the scale
    // For scale=1: -8 to 8, for scale=2: -4 to 4, for scale=0.5: -16 to 16
    const tickCount = scale === 2 ? 9 : scale === 0.5 ? 33 : 17
    const tickMin = scale === 2 ? -4 : scale === 0.5 ? -16 : -8
    const tickMax = scale === 2 ? 4 : scale === 0.5 ? 16 : 8

    return (
      <>
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
          {/* x-axis scale and numbers */}
          {Array.from({ length: tickCount }, (_, i) => {
            const x = tickMin + i
            const px = 167 + x * (18.8 * scale)
            return (
              <g key={x}>
                <line
                  x1={px}
                  y1={163 - 5}
                  x2={px}
                  y2={163 + 5}
                  stroke="black"
                  strokeWidth="1"
                />
                <text
                  x={px}
                  y={163 + 15}
                  fontSize="12"
                  textAnchor="middle"
                  fill="black"
                >
                  {x}
                </text>
              </g>
            )
          })}
          {/* y-axis scale and numbers */}
          {Array.from({ length: tickCount }, (_, i) => {
            const y = tickMin + i
            const py = 163 - y * (18.8 * scale)
            return (
              <g key={y}>
                <line
                  x1={167 - 5}
                  y1={py}
                  x2={167 + 5}
                  y2={py}
                  stroke="black"
                  strokeWidth="1"
                />
                <text
                  x={167 - 10}
                  y={py + 4}
                  fontSize="12"
                  textAnchor="end"
                  fill="black"
                >
                  {y}
                </text>
              </g>
            )
          })}
          {/* Axis labels */}
          <text
            x={320}
            y={163 + 15}
            fontSize="16"
            textAnchor="end"
            fill="black"
          >
            x
          </text>
          <text x={167 - 10} y={18} fontSize="16" textAnchor="end" fill="black">
            y
          </text>
          {/* Skalierungshinweis */}
          <text x={20} y={30} fontSize="14" textAnchor="start" fill="black">
            Skalierung: {scale} Kästchen/Einheit
          </text>
        </svg>
        <svg viewBox="0 0 328 328">
          <image
            href="/content/BW_2BFS/ksblanko.png"
            height="328"
            width="328"
          />
          <polyline
            points={linePoints}
            stroke="blue"
            strokeWidth="2"
            fill="none"
          />
          {/* x-axis scale and numbers */}
          {Array.from({ length: tickCount }, (_, i) => {
            const x = tickMin + i
            const px = 167 + x * (18.8 * scale)
            return (
              <g key={x}>
                <line
                  x1={px}
                  y1={163 - 5}
                  x2={px}
                  y2={163 + 5}
                  stroke="black"
                  strokeWidth="1"
                />
                <text
                  x={px}
                  y={163 + 20}
                  fontSize="12"
                  textAnchor="middle"
                  fill="black"
                >
                  {x}
                </text>
              </g>
            )
          })}
          {/* y-axis scale and numbers */}
          {Array.from({ length: tickCount }, (_, i) => {
            const y = tickMin + i
            const py = 163 - y * (18.8 * scale)
            return (
              <g key={y}>
                <line
                  x1={167 - 5}
                  y1={py}
                  x2={167 + 5}
                  y2={py}
                  stroke="black"
                  strokeWidth="1"
                />
                <text
                  x={167 - 20}
                  y={py + 4}
                  fontSize="12"
                  textAnchor="end"
                  fill="black"
                >
                  {y}
                </text>
              </g>
            )
          })}
          {/* Axis labels */}
          <text
            x={320}
            y={163 + 15}
            fontSize="16"
            textAnchor="end"
            fill="black"
          >
            x
          </text>
          <text x={167 - 10} y={18} fontSize="16" textAnchor="end" fill="black">
            y
          </text>
          {/* Skalierungshinweis */}
          <text x={20} y={30} fontSize="14" textAnchor="start" fill="black">
            Skalierung: {scale} Kästchen/Einheit
          </text>
        </svg>
      </>
    )
  },
}
