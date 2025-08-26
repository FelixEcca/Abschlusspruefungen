import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x_s: number
  y_s: number 
}

export const exercise3000: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2021 Pflichtteil Aufgabe 1A',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {x_s: rng.randomIntBetween(-4, 4), y_s: rng.randomIntBetween(-4, 4)}
  },
  originalData: {x_s:-3, y_s:1},
  constraint({ data }) {
    return data.x_s!=0 && data.y_s!=0
  },
  intro({ data }) {
    function toX(n: number) {return 167 + n * ((94.5 * 2) / 10)}
function toY(n: number) {return 163 - n * ((94.5 * 2) / 10)}
function generateParabolaPoints(a: number,b: number,c: number,step: number,): string {
let points = ''
for (let x = -4; x <= 11; x += step) {
const y = a * (x - b) * (x - b) + c
points += `${toX(x)},${toY(y)} `} return points.trim() }
    return <><p>Gegeben ist die Gleichung der Parabel p mit y = (x {pp(data.x_s,'merge_op')})² {pp(data.y_s,'merge_op')}</p></>
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Nennen Sie für jedes der drei Schaubilder einen Grund, warum es nicht das Schaubild von p sein kann.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Eine Gerade g ist die Symmetrieachse der Parabel in Schaubild 1. Zeichnen Sie die Gerade g in das Schaubild ein.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Eine Gerade h verläuft parallel zur x-Achse durch den Scheitelpunkt der Parabel in Schaubild 2. Geben Sie die Gleichung von h an.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
