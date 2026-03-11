// exercise3058.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  volumeCube: number
  edgeCube: number
  coneRadius: number
  coneHeight: number
  coneSurface: number
  slantHeight: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise3058: Exercise<DATA> = {
  title: 'Kegel im Würfel',
  source: 'Prüfung 2022 / Aufgabe 3A',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const edgeCube = rng.randomItemFromArray([6, 8, 10, 12])
    const volumeCube = edgeCube ** 3
    const coneRadius = edgeCube / 2
    const coneHeight = edgeCube
    const slantHeight = round2(Math.sqrt(coneRadius ** 2 + coneHeight ** 2))
    const coneSurface = round2(
      Math.PI * coneRadius * coneRadius + Math.PI * coneRadius * slantHeight,
    )

    return {
      volumeCube,
      edgeCube,
      coneRadius,
      coneHeight,
      coneSurface,
      slantHeight,
    }
  },

  originalData: {
    volumeCube: 512,
    edgeCube: 8,
    coneRadius: 4,
    coneHeight: 8,
    coneSurface: round2(Math.PI * 4 * 4 + Math.PI * 4 * Math.sqrt(80)),
    slantHeight: round2(Math.sqrt(80)),
  },

  constraint({ data }) {
    return data.edgeCube > 0 && data.coneRadius > 0 && data.coneHeight > 0
  },

  intro() {
    return (
      <>
        <p>
          Ein Würfel hat ein Volumen von <InlineMath math={'512\\,\\mathrm{cm^3}'} />.
          Der Kegeldurchmesser entspricht der Länge der Kante des Würfels.
          Die Spitze des Kegels berührt die Deckfläche des Würfels.
        </p>

        <svg viewBox="0 0 220 180">
          <image href="/content/BW_2BFS/3058.png" height="180" width="220" />
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Zeigen Sie, dass der Kegelradius 4 cm beträgt.</p>
          </>
        )
      },
      solution({ data }) {
        const { volumeCube, edgeCube, coneRadius } = data
        return (
          <>
            <InlineMath math={`a^3 = ${pp(volumeCube)}`} />
            <br />
            <InlineMath math={`a = \\sqrt[3]{${pp(volumeCube)}} = ${pp(edgeCube)}\\,\\mathrm{cm}`} />
            <br />
            <p>Der Kegeldurchmesser entspricht der Würfelkante.</p>
            <InlineMath math={`r = \\frac{a}{2} = \\frac{${pp(edgeCube)}}{2} = ${pp(coneRadius)}\\,\\mathrm{cm}`} />
          </>
        )
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Berechnen Sie die Oberfläche des Kegels.</p>
          </>
        )
      },
      solution({ data }) {
        const { coneRadius, coneHeight, slantHeight, coneSurface } = data
        return (
          <>
            <p>Die Oberfläche besteht aus Grundfläche und Mantelfläche.</p>
            <InlineMath math={'s = \\sqrt{r^2 + h^2}'} />
            <br />
            <InlineMath
              math={`s = \\sqrt{${pp(coneRadius)}^2 + ${pp(
                coneHeight,
              )}^2} \\approx ${pp(slantHeight)}\\,\\mathrm{cm}`}
            />
            <br />
            <InlineMath math={'O = \\pi r^2 + \\pi r s'} />
            <br />
            <InlineMath
              math={`O = \\pi\\cdot ${pp(coneRadius)}^2 + \\pi\\cdot ${pp(
                coneRadius,
              )}\\cdot ${pp(slantHeight)}`}
            />
            <br />
            <InlineMath math={`O \\approx ${pp(coneSurface)}\\,\\mathrm{cm^2}`} />
          </>
        )
      },
    },
  ],
}