import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  imageW: number
  imageH: number
  frameW: number
  frameH: number
  context: string
}

export const exercise10005: Exercise<DATA> = {
  title: 'Bildformat bewerten',
  source: '3BKGD1',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      {
        imageW: 1920,
        imageH: 1080,
        frameW: 16,
        frameH: 9,
        context: 'Webbanner',
      },
      {
        imageW: 1200,
        imageH: 900,
        frameW: 16,
        frameH: 9,
        context: 'Präsentationsfolie',
      },
      {
        imageW: 1080,
        imageH: 1350,
        frameW: 4,
        frameH: 5,
        context: 'Social-Media-Fläche',
      },
    ])
  },
  originalData: {
    imageW: 1200,
    imageH: 900,
    frameW: 16,
    frameH: 9,
    context: 'Präsentationsfolie',
  },
  task({ data }) {
    return (
      <>
        <p>
          Ein Bild hat <b>{data.imageW} px</b> Breite und{' '}
          <b>{data.imageH} px</b> Höhe. Es soll in eine Fläche für ein{' '}
          {data.context} im Verhältnis{' '}
          <b>
            {data.frameW}:{data.frameH}
          </b>{' '}
          eingesetzt werden.
        </p>
        <p>
          Beurteilen Sie: Passt das Bild ohne Verzerrung und ohne Beschnitt
          genau in die Fläche?
        </p>
        <svg viewBox="0 0 360 150" className="my-3 max-w-md">
          <rect
            x="35"
            y="30"
            width="130"
            height="90"
            fill="#dbeafe"
            stroke="#1d4ed8"
            strokeWidth="3"
          />
          <text x="72" y="22" fontSize="13">
            Bild
          </text>
          <rect
            x="215"
            y="30"
            width="115"
            height="70"
            fill="#dcfce7"
            stroke="#15803d"
            strokeWidth="3"
          />
          <text x="240" y="22" fontSize="13">
            Fläche
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    const imageRatio = data.imageW / data.imageH
    const frameRatio = data.frameW / data.frameH
    const fits = Math.abs(imageRatio - frameRatio) < 0.001
    return (
      <>
        <p>Ich vergleiche die Seitenverhältnisse als Quotienten.</p>
        <p>
          Bild: <InlineMath math={`${data.imageW}:${data.imageH}`} /> und{' '}
          <InlineMath
            math={`${data.imageW}\\div${data.imageH}\\approx${pp(imageRatio)}`}
          />
        </p>
        <p>
          Fläche: <InlineMath math={`${data.frameW}:${data.frameH}`} /> und{' '}
          <InlineMath
            math={`${data.frameW}\\div${data.frameH}\\approx${pp(frameRatio)}`}
          />
        </p>
        {fits ? (
          <p>
            Die Quotienten sind gleich. Das Bild passt{' '}
            <b>ohne Verzerrung und ohne Beschnitt</b> genau in die Fläche.
          </p>
        ) : (
          <p>
            Die Quotienten sind verschieden. Das Bild müsste also verzerrt,
            beschnitten oder mit freien Rändern eingefügt werden.
          </p>
        )}
      </>
    )
  },
}
