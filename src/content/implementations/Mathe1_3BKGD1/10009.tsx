import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  imageW: number
  ratioW: number
  ratioH: number
  logoOriginalM: number
  logoScale: number
  product: string
}

export const exercise10009: Exercise<DATA> = {
  title: 'Layoutaufgabe mit Maßstab und Seitenverhältnis',
  source: '3BKGD1',
  useCalculator: true,
  duration: 14,
  points: 14,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { imageW: 16, ratioW: 16, ratioH: 9, logoOriginalM: 1.2, logoScale: 20, product: 'Flyer' },
      { imageW: 18, ratioW: 4, ratioH: 3, logoOriginalM: 1.5, logoScale: 25, product: 'Infoblatt' },
      { imageW: 21, ratioW: 21, ratioH: 9, logoOriginalM: 2.4, logoScale: 40, product: 'Bannerentwurf' },
    ])
  },
  originalData: { imageW: 16, ratioW: 16, ratioH: 9, logoOriginalM: 1.2, logoScale: 20, product: 'Flyer' },
  task({ data }) {
    return (
      <>
        <p>
          Für einen {data.product} wird oben ein Bildfeld im Seitenverhältnis{' '}
          <b>
            {data.ratioW}:{data.ratioH}
          </b>{' '}
          angelegt. Das Bildfeld ist <b>{pp(data.imageW)} cm</b> breit.
        </p>
        <p>
          Darunter soll ein Logo eingefügt werden. Das Logo ist in Wirklichkeit{' '}
          <b>{pp(data.logoOriginalM)} m</b> breit und wird im Maßstab{' '}
          <b>1:{data.logoScale}</b> gezeichnet.
        </p>
        <p>
          Berechnen Sie die Höhe des Bildfeldes und die Breite des Logos in der
          Zeichnung.
        </p>
        <svg viewBox="0 0 300 190" className="my-3 max-w-sm">
          <rect x="50" y="25" width="200" height="105" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="3" />
          <text x="105" y="85" fontSize="14">Bildfeld {data.ratioW}:{data.ratioH}</text>
          <rect x="90" y="148" width="120" height="22" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
          <text x="124" y="164" fontSize="12">Logo 1:{data.logoScale}</text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    const part = data.imageW / data.ratioW
    const imageH = part * data.ratioH
    const logoOriginalCm = data.logoOriginalM * 100
    const logoDrawingCm = logoOriginalCm / data.logoScale
    return (
      <>
        <p>
          Zuerst berechne ich die Höhe des Bildfeldes über das
          Seitenverhältnis.
        </p>
        <p>
          Ein Verhältnissteil ist:{' '}
          <InlineMath math={`${pp(data.imageW)}:${data.ratioW}=${pp(part)}\\,\\mathrm{cm}`} />
        </p>
        <p>
          Die Höhe hat {data.ratioH} Teile:{' '}
          <InlineMath math={`${data.ratioH}\\cdot${pp(part)}=${pp(imageH)}\\,\\mathrm{cm}`} />
        </p>
        <p>Nun berechne ich die Logobreite im Maßstab.</p>
        <p>
          <InlineMath math={`${pp(data.logoOriginalM)}\\,\\mathrm m=${pp(logoOriginalCm)}\\,\\mathrm{cm}`} />
        </p>
        <p>
          <InlineMath math={`${pp(logoOriginalCm)}:${data.logoScale}=${pp(logoDrawingCm)}\\,\\mathrm{cm}`} />
        </p>
        <p>
          Das Bildfeld ist <b>{pp(imageH)} cm</b> hoch. Das Logo ist in der
          Zeichnung <b>{pp(logoDrawingCm)} cm</b> breit.
        </p>
      </>
    )
  },
}
