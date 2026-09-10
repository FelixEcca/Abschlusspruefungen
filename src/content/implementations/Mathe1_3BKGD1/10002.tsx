import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  headingPt: number
  bodyLines: number
  bodyPt: number
  lineGapPc: number
  bottomGapPc: number
  context: string
}

export const exercise10002: Exercise<DATA> = {
  title: 'Schriftgröße, Zeilenabstand und Layoutmaß berechnen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      {
        headingPt: 48,
        bodyLines: 3,
        bodyPt: 36,
        lineGapPc: 2,
        bottomGapPc: 1.5,
        context: 'Plakat',
      },
      {
        headingPt: 60,
        bodyLines: 3,
        bodyPt: 30,
        lineGapPc: 1.5,
        bottomGapPc: 2,
        context: 'Titelkarte',
      },
      {
        headingPt: 42,
        bodyLines: 4,
        bodyPt: 24,
        lineGapPc: 1,
        bottomGapPc: 1.5,
        context: 'Infografik',
      },
    ])
  },
  originalData: {
    headingPt: 48,
    bodyLines: 3,
    bodyPt: 36,
    lineGapPc: 2,
    bottomGapPc: 1.5,
    context: 'Plakat',
  },
  constraint({ data }) {
    const lengths = [
      data.headingPt,
      data.bodyLines * data.bodyPt,
      data.lineGapPc * 12,
      data.bottomGapPc * 12,
    ]
    return new Set(lengths).size === lengths.length
  },
  task({ data }) {
    return (
      <>
        <p>
          Für ein {data.context} wird ein Textblock gesetzt. Er besteht aus
          einer Überschrift mit <b>{data.headingPt} pt</b> und{' '}
          <b>{data.bodyLines}</b> Textzeilen mit jeweils <b>{data.bodyPt} pt</b>
          .
        </p>
        <p>
          Zwischen Überschrift und Text stehen <b>{pp(data.lineGapPc)} pc</b>,
          unter dem Textblock bleiben <b>{pp(data.bottomGapPc)} pc</b> frei.
        </p>
        <p>
          Berechnen Sie die gesamte benötigte Höhe in <b>pt</b> und in{' '}
          <b>mm</b>. Es gilt: <InlineMath math="1\,\mathrm{pc}=12\,\mathrm{pt}" />{' '}
          und <InlineMath math="1\,\mathrm{pt}\approx0{,}3528\,\mathrm{mm}" />.
        </p>
      </>
    )
  },
  solution({ data }) {
    const textPt = data.bodyLines * data.bodyPt
    const gapPt = data.lineGapPc * 12
    const bottomPt = data.bottomGapPc * 12
    const totalPt = data.headingPt + textPt + gapPt + bottomPt
    const totalMm = totalPt * 0.3528
    return (
      <>
        <p>Zuerst werden alle Abstände in Point umgerechnet.</p>
        <p>
          Abstand zwischen Überschrift und Text:{' '}
          <InlineMath math={`${pp(data.lineGapPc)}\\cdot12=${pp(gapPt)}\\,\\mathrm{pt}`} />
        </p>
        <p>
          Unterer Abstand:{' '}
          <InlineMath math={`${pp(data.bottomGapPc)}\\cdot12=${pp(bottomPt)}\\,\\mathrm{pt}`} />
        </p>
        <svg viewBox="0 0 360 150" className="my-3 max-w-md">
          <rect x="30" y="15" width="210" height="28" fill="#fde68a" stroke="#92400e" />
          <text x="45" y="35" fontSize="13">Überschrift {data.headingPt} pt</text>
          <rect x="30" y="50" width="210" height="18" fill="#bfdbfe" stroke="#1d4ed8" />
          <text x="250" y="64" fontSize="12">{pp(gapPt)} pt Abstand</text>
          <rect x="30" y="76" width="210" height="38" fill="#dcfce7" stroke="#15803d" />
          <text x="45" y="99" fontSize="13">{data.bodyLines} Textzeilen: {pp(textPt)} pt</text>
          <rect x="30" y="122" width="210" height="15" fill="#e5e7eb" stroke="#4b5563" />
          <text x="250" y="134" fontSize="12">{pp(bottomPt)} pt frei</text>
        </svg>
        <p>
          Höhe in pt:{' '}
          <InlineMath
            math={`${data.headingPt}+${pp(textPt)}+${pp(gapPt)}+${pp(bottomPt)}=${pp(totalPt)}\\,\\mathrm{pt}`}
          />
        </p>
        <p>
          Umrechnung in mm:{' '}
          <InlineMath math={`${pp(totalPt)}\\cdot0{,}3528\\approx${pp(totalMm)}\\,\\mathrm{mm}`} />
        </p>
        <p>
          Der Textblock benötigt insgesamt etwa <b>{pp(totalPt)} pt</b> bzw.{' '}
          <b>{pp(totalMm)} mm</b>.
        </p>
      </>
    )
  },
}
