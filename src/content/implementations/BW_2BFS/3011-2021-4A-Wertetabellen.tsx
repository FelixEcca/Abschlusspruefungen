import { Exercise } from '@/data/types'
import { Color1, Color2 } from '@/helper/colors'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  m: number
  b: number
  x_s: number
  y_s: number
}

export const exercise3011: Exercise<DATA> = {
  title: 'Wertetabellen',
  source: '2021 Wahlteil Aufgabe 4A',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      m: rng.randomIntBetween(-2, 2),
      b: rng.randomIntBetween(-5, 5),
      x_s: rng.randomIntBetween(1, 5),
      y_s: rng.randomIntBetween(-5, 5),
    }
  },
  originalData: { m: 1, b: 1, x_s: 4, y_s: -4 },
  constraint({ data }) {
    const p = -2 * data.x_s - data.m
    const q = data.x_s * data.x_s + data.y_s - data.b
    const x1 = (-p + Math.sqrt(p * p - 4 * q)) / 2
    const x2 = (-p - Math.sqrt(p * p - 4 * q)) / 2

    return (
      data.m != 0 &&
      x1 != x2 &&
      x1 > 0 &&
      x1 < 7 &&
      x2 > 0 &&
      x2 < 7 &&
      x1 % 1 == 0 &&
      x2 % 1 == 0
    )
  },
  intro({ data }) {
    function ParabolaPoints(x: number): number {
      return (x - data.x_s) * (x - data.x_s) + data.y_s
    }
    return (
      <>
        <p>Gegeben sind Wertetabellen zu einer Gerade g und einer Parabel p.</p>
        <div
          className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
          style={{
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
        >
          <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px] ">
            <thead
              className="uppercase bg-[#D2ECF6] text-[#404040]"
              style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  x
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  0
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  1
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  2
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  3
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  4
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  5
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  6
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  7
                </td>
              </tr>
            </thead>
            <tbody
              className="bg-white text-gray-500"
              style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                  y<sub>1</sub>
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  {pp(data.b)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {pp(data.b + data.m)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {' '}
                  {pp(data.b + 2 * data.m)}
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  {' '}
                  {pp(data.b + 3 * data.m)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {' '}
                  {pp(data.b + 4 * data.m)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {' '}
                  {pp(data.b + 5 * data.m)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {' '}
                  {pp(data.b + 6 * data.m)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {' '}
                  {pp(data.b + 7 * data.m)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Tabelle 1.</p>
        <div
          className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
          style={{
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
        >
          <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px] ">
            <thead
              className="uppercase bg-[#D2ECF6] text-[#404040]"
              style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  x
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  0
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  1
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  2
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  3
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  4
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  5
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  6
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  7
                </td>
              </tr>
            </thead>
            <tbody
              className="bg-white text-gray-500"
              style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                  y<sub>2</sub>
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  {ParabolaPoints(0)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {ParabolaPoints(1)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {ParabolaPoints(2)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {ParabolaPoints(3)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {ParabolaPoints(4)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {ParabolaPoints(5)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {ParabolaPoints(6)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {ParabolaPoints(7)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Tabelle 2.</p>
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
        return (
          <>
            <p>
              Begründen Sie mit Hilfe der Tabellenwerte, dass Tabelle 1 zu g und
              Tabelle 2 zu p gehört.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              In Tabelle 1 werden die y-Werte gleichmäßig{' '}
              {data.m > 0 ? 'größer.' : 'kleiner.'} Deshabl liegt eine Gerade
              vor. In Tabelle 2 werden die y-Werte erst kleiner, dann wieder
              größer. Deshalb liegt eine Parabel vor.
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
            <p>Geben Sie die Gleichung der Gerade g an.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <div
              className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
              style={{
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
            >
              <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px] ">
                <thead
                  className="uppercase bg-[#D2ECF6] text-[#404040]"
                  style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      x
                    </td>
                    <td className="py-1 border text-center font-bold p-2 border-[#6D5E5E]">
                      <Color1>0</Color1>
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      1
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      2
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      3
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      4
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      5
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      6
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      7
                    </td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                      y<sub>1</sub>
                    </td>
                    <td className="py-1 border text-center font-bold p-2 text-black">
                      <Color1>{pp(data.b, 'merge_op')}</Color1>
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1 text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Aus der Tabelle kann man den y-Achsenabschnitt ablesen. Die Gerade
              ist damit:
            </p>
            <p>g: y = mx {pp(data.b, 'merge_op')}</p>
            <p>
              Da die y-Werte gleichmäßig mit dem Wert {data.m}{' '}
              {data.m > 0 ? 'wachsen' : 'fallen'}, ist die Gerade:
            </p>
            <p>
              g: y = {ppPolynom([[data.m, 'x', 1]])} {pp(data.b, 'merge_op')}
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
            <p>Bestimmen Sie die Gleichung der Parabel p.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Aus der Tabelle lässt sich der Scheitelpunkt der Parabel ablesen:
            </p>
            <p>
              S({data.x_s}|{data.y_s})
            </p>
            <p>
              Anhand der Änderung der Tabellenwerte lässt sich erkennen, dass es
              sich um eine Normalparabel handelt. Damit ist die Gleichung:
            </p>
            <p>
              p: y = (x {pp(-data.x_s, 'merge_op')})² {pp(data.y_s, 'merge_op')}
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
              In welchen Punkten schneiden sich die Schaubilder von p und g?
            </p>
          </>
        )
      },
      solution({ data }) {
        const p = -2 * data.x_s - data.m
        const q = data.x_s * data.x_s + data.y_s - data.b
        const x2 = (-p + Math.sqrt(p * p - 4 * q)) / 2
        const x1 = (-p - Math.sqrt(p * p - 4 * q)) / 2
        return (
          <>
            <p>
              Vergleiche die Tabellenwerte. An den Stellen x<sub>1</sub> = {x1}{' '}
              und x<sub>2</sub> = {x2} lassen sich die gleichen y-Werte finden.
              Damit sind die Schnittpunkte:
            </p>
            <p>
              P<sub>1</sub>({pp(x1)}|{pp(data.b + data.m * x1)}) und P
              <sub>2</sub>({pp(x2)}|{pp(data.b + data.m * x2)})
            </p>
          </>
        )
      },
    },
  ],
}
