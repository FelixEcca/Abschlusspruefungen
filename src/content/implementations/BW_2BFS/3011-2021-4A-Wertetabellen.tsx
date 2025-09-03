import { Exercise } from '@/data/types'
import { Color1, Color2 } from '@/helper/colors'
import { pp } from '@/helper/pretty-print'
import { polyToLatex } from '@/helper/pp-latex'
import { InlineMath, BlockMath } from 'react-katex'

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
        <p>
          Gegeben sind Wertetabellen zu einer Gerade <InlineMath math="g" /> und
          einer Parabel <InlineMath math="p" />.
        </p>

        {/* Tabelle 1: Gerade */}
        <div
          className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
          style={{ transform: 'scale(1)', transformOrigin: 'top left' }}
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
                {[0, 1, 2, 3, 4, 5, 6, 7].map(v => (
                  <td
                    key={v}
                    className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"
                  >
                    {v}
                  </td>
                ))}
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
                {[0, 1, 2, 3, 4, 5, 6, 7].map(v => (
                  <td
                    key={v}
                    className="py-1 border text-center font-bold p-1 text-black"
                  >
                    {pp(data.b + v * data.m)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p>Tabelle 1.</p>

        {/* Tabelle 2: Parabel */}
        <div
          className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
          style={{ transform: 'scale(1)', transformOrigin: 'top left' }}
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
                {[0, 1, 2, 3, 4, 5, 6, 7].map(v => (
                  <td
                    key={v}
                    className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"
                  >
                    {v}
                  </td>
                ))}
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
                {[0, 1, 2, 3, 4, 5, 6, 7].map(v => (
                  <td
                    key={v}
                    className="py-1 border text-center font-bold p-1 text-black"
                  >
                    {ParabolaPoints(v)}
                  </td>
                ))}
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
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Begründen Sie mithilfe der Tabellenwerte, dass Tabelle 1 zu{' '}
            <InlineMath math="g" /> und Tabelle 2 zu <InlineMath math="p" />{' '}
            gehört.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              In <b>Tabelle&nbsp;1</b> ändern sich die y-Werte jeweils um den
              konstanten Betrag <InlineMath math={`${data.m}`} /> pro Schritt in{' '}
              <InlineMath math="x" /> – das ist kennzeichnend für eine lineare
              Funktion (Gerade).
            </p>
            <p>
              In <b>Tabelle&nbsp;2</b> nehmen die y-Werte zunächst ab und
              anschließend wieder zu; zudem sind die Abstände nicht konstant,
              sondern wachsen symmetrisch um den Scheitel. Das passt zu einer
              quadratischen Funktion (Parabel).
            </p>
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
          <p>
            Geben Sie die Gleichung der Gerade <InlineMath math="g" /> an.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <div
              className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
              style={{ transform: 'scale(1)', transformOrigin: 'top left' }}
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
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((v, i) => (
                      <td
                        key={v}
                        className={`py-1 border text-center font-bold p-1 border-[#6D5E5E] ${i === 0 ? 'p-2' : ''}`}
                      >
                        {i === 0 ? <Color1>0</Color1> : v}
                      </td>
                    ))}
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
                    {[1, 2, 3, 4, 5, 6, 7].map(v => (
                      <td
                        key={v}
                        className="py-1 border text-center font-bold p-1  text-black"
                      ></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Aus der ersten Spalte liest man den y-Achsenabschnitt{' '}
              <InlineMath math={`b=${data.b}`} /> ab. Die konstante Änderung je
              Schritt ist die Steigung <InlineMath math={`m=${data.m}.`} />
            </p>
            <p>
              Damit lautet die Geradengleichung:
              <br />
              <InlineMath
                math={`g:\\; y = ${polyToLatex([
                  [data.m, 'x', 1],
                  [data.b, 'x', 0],
                ])}`}
              />
            </p>
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
          <p>
            Bestimmen Sie die Gleichung der Parabel <InlineMath math="p." />
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Aus der Tabelle lässt sich ein Scheitelpunkt ablesen:</p>
            <p>
              <InlineMath math={`S\\,(${data.x_s}\\mid ${data.y_s})`} />
            </p>
            <p>Da die die Werte zu einer Normalparabel passen, erhält man:</p>
            <p>
              <InlineMath
                math={`p:\\; y = (x\\,${pp(-data.x_s, 'merge_op')})^{2}\\,${pp(
                  data.y_s,
                  'merge_op',
                )}`}
              />
            </p>
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
          <p>
            In welchen Punkten schneiden sich die Schaubilder von{' '}
            <InlineMath math="p" /> und <InlineMath math="g" />?
          </p>
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
              Vergleiche die Tabellenwerte: an{' '}
              <InlineMath math={`x_1=${pp(x1)}`} /> und{' '}
              <InlineMath math={`x_2=${pp(x2)}`} /> stimmen die y-Werte überein.
              Damit schneiden sich die Schaubilder an:
            </p>
            <p>
              <InlineMath
                math={`P_1\\,\\big(${pp(x1)}\\mid ${pp(
                  data.b + data.m * x1,
                )}\\big),\\quad P_2\\,\\big(${pp(x2)}\\mid ${pp(
                  data.b + data.m * x2,
                )}\\big)`}
              />
            </p>
          </>
        )
      },
    },
  ],
}
