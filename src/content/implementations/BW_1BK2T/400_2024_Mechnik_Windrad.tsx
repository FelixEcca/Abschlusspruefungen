import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { buildSharp } from 'ionicons/icons'

interface DATA {
  länge: number
  höhe: number
  frequenz: number
  masse: number
  bahngeschwindigkeit: number
  aufprallgeschwindigkeit: number
  abbremszeit: number
  leistung: number
  batterie: number
  wirkungsgrad: number
}

export const exercise400: Exercise<DATA> = {
  title: 'Windrad',
  source: '2024 Aufgabe 1 Mechanik',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      länge: rng.randomIntBetween(400, 700) / 10,
      höhe: rng.randomIntBetween(10, 16) * 10,
      frequenz: rng.randomIntBetween(70, 140) / 10,
      masse: rng.randomIntBetween(4, 12) * 100,
      bahngeschwindigkeit: rng.randomIntBetween(400, 1000) / 10,
      aufprallgeschwindigkeit: rng.randomIntBetween(70, 120) / 10,
      abbremszeit: rng.randomIntBetween(5, 50) / 10,
      leistung: rng.randomIntBetween(10, 20) * 100,
      batterie: rng.randomIntBetween(400, 900) / 10,
      wirkungsgrad: rng.randomIntBetween(60, 90),
    }
  },
  originalData: {
    länge: 58.4,
    höhe: 120,
    frequenz: 11.8,
    masse: 800,
    bahngeschwindigkeit: 72.2,
    aufprallgeschwindigkeit: 80,
    abbremszeit: 7,
    leistung: 1700,
    batterie: 60,
    wirkungsgrad: 90,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Die drei Rotorblätter einer Windkraftanlage haben jeweils eine Länge l
          von {pp(data.länge)} m und drehen sich im Uhrzeigersinn mit einer
          Drehfrequenz von {pp(data.frequenz)} min<sup>-1</sup>. Die Nabenhöhe h
          des Turms beträgt {pp(data.höhe)} m, siehe Abbildung 1. Alle Vorgänge
          werden idealisiert betrachtet. Lutwiderstand und Reibung werden
          vernachlässigt. Rechnen Sie mit g = 9,81 {buildInlineFrac('m', 's²')}.
        </p>
        <svg viewBox="0 0 328 260">
          <image href="/content/BW_1BK2T/400.PNG" height="230" width="328" />
        </svg>
      </>
    )
  },
  // {buildEquation([[<></>,<></>,<></>,],[<></>,<></>,<></>,],[<></>,<></>,<></>,]])}
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
              Ermitteln Sie die Umlaufdauer der Drehung in Sekunden und die
              Winkelgeschwindigkeit.
            </p>
          </>
        )
      },
      solution({ data }) {
        const omega = roundToDigits(
          (2 * Math.PI) / (60 * roundToDigits(1 / data.frequenz, 2)),
          2,
        )
        return (
          <>
            <p>Für die Umlaufdauer T gilt:</p>
            {buildEquation([
              [<>T</>, <>=</>, <>{buildInlineFrac(1, 'f')}</>],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    1,
                    <>
                      {pp(data.frequenz)} min<sup>-1</sup>
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>{pp(roundToDigits(1 / data.frequenz, 2))} min</>,
              ],
            ])}
            <p>Rechne die Umlaufdauer in Sekunden um:</p>
            <p>
              T = {pp(roundToDigits(1 / data.frequenz, 2))} min ·{' '}
              {buildInlineFrac(<>60 s</>, <>min</>)} ={' '}
              {pp(60 * roundToDigits(1 / data.frequenz, 2))} s
            </p>
            <p>
              Berechne die Winkelgeschwindigkeit ω mit einer der beiden Formeln:
            </p>
            <p>ω = {buildInlineFrac(<>2 · 𝜋</>, 'T')} = 2 · 𝜋 · f</p>
            <p>
              Beispielsweise über die Umlaufdauer (denn wir haben sie schon in
              der Einheit s):
            </p>
            {buildEquation([
              [<>ω</>, <>=</>, <>{buildInlineFrac(<>2 · 𝜋</>, 'T')}</>],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>2 · 𝜋</>,
                    <>{pp(60 * roundToDigits(1 / data.frequenz, 2))} s</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(omega)} s<sup>-1</sup>
                </>,
              ],
            ])}
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
              Berechnen Sie die Zentripetalbeschleunigung an den Rotorspitzen.
              Geben Sie diese als Vielfaches der Fallbeschleunigung auf der Erde
              an.
            </p>
          </>
        )
      },
      solution({ data }) {
        const omega = roundToDigits(
          (2 * Math.PI) / (60 * roundToDigits(1 / data.frequenz, 2)),
          2,
        )
        return (
          <>
            <p>Für die Zentripetalbeschleunigung gilt:</p>
            {buildEquation([
              [
                <>
                  a<sub>z</sub>
                </>,
                <>=</>,
                <>ω² · r</>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  ({pp(omega)} s<sup>-1</sup>)² · {pp(data.länge)} m
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(roundToDigits(omega * data.länge * omega, 2))}{' '}
                  {buildInlineFrac('m', 's²')}
                </>,
              ],
            ])}
            <p>
              In Vielfachen der Erdbeschleunigung gerechnet, beträgt a
              <sub>z</sub>:
            </p>
            <p>
              a<sub>z</sub> = {pp(roundToDigits(omega * data.länge * omega, 2))}{' '}
              {buildInlineFrac('m', 's²')} : 9,81 {buildInlineFrac('m', 's²')} ≈{' '}
              {pp(roundToDigits((omega * data.länge * omega) / 9.81, 2))}{' '}
            </p>
            <p>
              a<sub>z</sub> beträgt etwa das{' '}
              {pp(roundToDigits((omega * data.länge * omega) / 9.81, 2))} -
              fache der Erdbeschleunigung.
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
              Eine Schülerin und ein Schüler diskutieren. Alina behauptet:
              &quot;Die Zentripetalbeschleunigung ist bei konstanter
              Drehfrequenz proportional zum Radius. Also nimmt die
              Zentripetalbeschleunigung mit zunehmendem Radius zu.&quot;
            </p>
            <p>
              Max entgegnet: &quot;In der Formelsammlung steht a<sub>z</sub> ={' '}
              {buildInlineFrac('v²', 'r')}. Also ist die
              Zentripetalbeschleunigung umgekehrt proportional zum Radius und
              nimmt mit zunehmendem Radius ab.&quot;
            </p>
            <p>Nehmen Sie zu beiden Aussagen begründet Stellung.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Alina argumentiert mit der Drehfrequenz. Für a<sub>z</sub> gilt
              unter der Verwendung von ω:
            </p>
            <p>
              a<sub>z</sub> = ω² · r
            </p>
            <p>
              Sie hat also recht, dass die Zentripetalbeschleunigung mit dem
              Radius r proportional zunimmt.
            </p>
            <p>
              Max argumentiert mit der Bahngeschwindigkeit v, womit die
              Zentripetalbeschleunigung durch den Term a<sub>z</sub> = ω² · r ={' '}
              {buildInlineFrac('v²', 'r²')} · r ={' '}
              <b>{buildInlineFrac('v²', 'r')}</b> berechnet wird. Hier ist die
              Beschleunigung umgekehrt proportional zum Radius r. Da sich die
              Behauptung aber auf die Drehfrequenz bezieht, liegt Max falsch.
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
              In der kalten Jahreszeit können sich an den Rotoren
              Eisablagerungen bilden, die beim Abwurf zur Gefahr werden. Das
              Verhalten eines Eisblocks mit einer Masse von {pp(data.masse)} g
              soll im Folgenden genauer untersucht wurden. Betrachten Sie den
              Eisblock als Massepunkt.
            </p>
            <p>
              In Abbildung 2 ist für den Eisblock in den Punkten A, C und D
              jeweils die Gewichtskraft F<sub>G</sub> eingezeichnet. Ergänzen
              Sie in den Punkten A, C und D die auftretende Haltekraft F
              <sub>h</sub> und die resultierende Zentripetalkraft F<sub>z</sub>.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_1BK2T/400_2.PNG"
                height="190"
                width="328"
              />
            </svg>
            <p>Hinweis: Die Kräfteskizze muss nicht maßstäblich sein.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Zeichne in jedem Punkt die resultierende Zentripetalkraft F
              <sub>z</sub> ein. Diese muss in die Kreismitte zeigen.
            </p>
            <p>
              Die Haltekraft F<sub>h</sub> muss so eingezeichnet werden, dass
              sich die Kraft F<sub>G</sub> und die Haltekraft F<sub>h</sub>{' '}
              gerade zur Zentripetalkraft F<sub>z</sub> zusammensetzen.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_1BK2T/400_4.png"
                height="190"
                width="328"
              />
            </svg>
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
              Geben Sie die Stellung des Rotorblatts an, in der die Haltekraft
              maximal ist. Berechnen Sie die maximal erforderliche Haltekraft
              für den Eisblock.
            </p>
          </>
        )
      },
      solution({ data }) {
        const omega = roundToDigits(
          (2 * Math.PI) / (60 * roundToDigits(1 / data.frequenz, 2)),
          2,
        )
        const m = data.masse / 1000
        const Fh = roundToDigits(
          Math.pow(
            roundToDigits(
              (2 * Math.PI) / (60 * roundToDigits(1 / data.frequenz, 2)),
              2,
            ),
            2,
          ) *
            m *
            data.länge +
            m * 9.81,
          2,
        )
        return (
          <>
            <p>
              Die Haltekraft F<sub>h</sub> ist genau dann am größten, wenn das
              Windrad in Position A steht. Dort muss sie den Betrag der
              Zentripetalkraft und der Gewichtskraft aufbringen.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_1BK2T/400_5.png"
                height="190"
                width="328"
              />
            </svg>
            <p>Die Kraft beträgt:</p>
            <div>
              <span style={{ fontSize: '0.8em' }}>
                {buildEquation([
                  [
                    <>
                      F<sub>h</sub>
                    </>,
                    <>=</>,
                    <>
                      F<sub>z</sub> + F<sub>G</sub>
                    </>,
                  ],
                  [<></>, <>=</>, <>m · ω² · r + m · g</>],
                  [
                    <></>,
                    <>=</>,
                    <>
                      {pp(data.masse / 1000)} kg · ({pp(omega)} s<sup>-1</sup>)²
                      · {pp(data.länge)} m + {pp(data.masse / 1000)} kg · 9,81{' '}
                      {buildInlineFrac('m', 's²')}
                    </>,
                  ],
                  [<></>, <>≈</>, <>{pp(Fh)} N</>],
                ])}
              </span>
            </div>
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
        const omega = roundToDigits(
          (2 * Math.PI) / (60 * roundToDigits(1 / data.frequenz, 2)),
          2,
        )
        return (
          <>
            <p>
              In den folgenden Aufgaben wird das Verhalten eines Eisblocks nach
              dem Ablösen von der Rotorspitze betrachtet. Der Eisblock besitzt
              eine Bahngeschwindigkeit von {pp(data.bahngeschwindigkeit)}{' '}
              {buildInlineFrac('m', 's')}.
            </p>
            <p>
              Skizzieren Sie in Abbildung 3 die vier Bahnkurven, die der
              Eisblock beschreibt, wenn er sich in den Punkten A, B, C bzw. D
              von der Rotorspitze löst. Beachten Sie dabei die Abwurfrichtung
              und nennen Sie die jeweilig Wurfart.
            </p>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/BW_1BK2T/400_3.PNG"
                height="230"
                width="328"
              />
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/BW_1BK2T/400_6.PNG"
                height="230"
                width="328"
              />
            </svg>
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
              Der Eisblock löst sich im Punkt A. Berechnen Sie die Entfernung
              des Aufschlagortes des Eisblocks vom Rotormast.
            </p>
          </>
        )
      },
      solution({ data }) {
        const fallzeit = roundToDigits(
          Math.sqrt((2 * (data.höhe - data.länge)) / 9.81),
          2,
        )
        return (
          <>
            <p>
              Die Bahnkurve des Eisblocks entspricht der des waagerechten Wurfs.
            </p>
            <p>
              In y-Richtung wird der Eisblock gleichmäßig beschleunigt und es
              gilt:
            </p>
            {buildEquation([
              [
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s
                  <sub>y</sub>
                </>,
                <>=</>,
                <>{ppFrac(1 / 2)} · g · t²</>,
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
                      s<sub>y</sub> ist die Höhe des Eisblocks über dem Boden h
                      - l
                    </span>
                  </Color4>
                </>,
              ],
            ])}
            {buildEquation([
              [<>h - l</>, <>=</>, <>{ppFrac(1 / 2)} · g · t²</>, <>| · 2</>],
              [<>2 · (h - l)</>, <>=</>, <>g · t²</>, <>| : g</>],
              [
                <>{buildInlineFrac(<>2 · (h - l)</>, 'g')}</>,
                <>=</>,
                <>t²</>,
                <>| √</>,
              ],
              [
                <>{buildSqrt(<>{buildInlineFrac(<>2 · (h - l)</>, 'g')}</>)}</>,
                <>=</>,
                <>t</>,
              ],
              [
                <>t</>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      {buildInlineFrac(
                        <>
                          2 · ({pp(data.höhe)} m - {pp(data.länge)} m)
                        </>,
                        <>9,81 {buildInlineFrac('m', 's²')}</>,
                      )}
                    </>,
                  )}
                </>,
              ],
              [<>t</>, <>≈</>, <>{pp(fallzeit)} s</>],
            ])}
            <p>
              In dieser Zeit bewegt sich sich der Eisblock gleichförmig in
              x-Richtung mit der Geschwindigkeit {pp(data.bahngeschwindigkeit)}{' '}
              {buildInlineFrac('m', 's')}.
            </p>
            <p>Der Eisblock legt dabei die Entfernung s zurück:</p>
            <p>
              s = v · t = {pp(data.bahngeschwindigkeit)}{' '}
              {buildInlineFrac('m', 's')} · {pp(fallzeit)} s ≈{' '}
              {pp(roundToDigits(data.bahngeschwindigkeit * fallzeit, 2))} m
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
              Ermitteln Sie für den Abwurf im Punkt A die
              Auftreffgeschwindigkeit auf dem Boden.
            </p>
          </>
        )
      },
      solution({ data }) {
        const fallzeit = roundToDigits(
          Math.sqrt((2 * (data.höhe - data.länge)) / 9.81),
          2,
        )
        const v = roundToDigits(
          Math.sqrt(
            data.bahngeschwindigkeit * data.bahngeschwindigkeit +
              roundToDigits(9.81 * fallzeit, 2) *
                roundToDigits(9.81 * fallzeit, 2),
          ),
          2,
        )
        return (
          <>
            <p>
              Die Auftreffgeschwindigkeit setzt sich zusammen aus den Kompenten
              in x- und y-Richtung.
            </p>
            <svg viewBox="0 0 328 120">
              <image
                href="/content/BW_1BK2T/400_8.PNG"
                height="120"
                width="328"
              />
            </svg>
            <p>
              In x-Richtung: v<sub>x</sub> = {pp(data.bahngeschwindigkeit)}{' '}
              {buildInlineFrac('m', 's')}
            </p>
            <p>
              In y-Richtung beschleunigt der Eisblock auf die Geschwindigkeit v
              <sub>y</sub>:
            </p>
            {buildEquation([
              [
                <>
                  v<sub>y</sub>
                </>,
                <>=</>,
                <>g · t</>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  9,81 {buildInlineFrac('m', 's²')} · {pp(fallzeit)} s
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(roundToDigits(9.81 * fallzeit, 2))}{' '}
                  {buildInlineFrac('m', 's')}
                </>,
              ],
            ])}
            <p>
              Berechne die Auftreffgeschwindigkeit v im rechtwinkligen Dreieck
              mit dem Satz des Pythagoras:
            </p>
            {buildEquation([
              [
                <>v²</>,
                <>=</>,
                <>
                  v<sub>x</sub>² + v<sub>y</sub>²
                </>,
                <>| √</>,
              ],
              [
                <>v</>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      v<sub>x</sub>² + v<sub>y</sub>²
                    </>,
                  )}
                </>,
              ],
              [
                <>v</>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      <>
                        {' '}
                        <Color4>
                          <span className="inline-block  scale-y-[2]">(</span>
                        </Color4>
                      </>
                      {pp(data.bahngeschwindigkeit)} {buildInlineFrac('m', 's')}
                      <>
                        {' '}
                        <Color4>
                          <span className="inline-block  scale-y-[2]">)</span>
                        </Color4>
                      </>
                      ² +{' '}
                      <>
                        {' '}
                        <Color4>
                          <span className="inline-block  scale-y-[2]">(</span>
                        </Color4>
                      </>
                      {pp(roundToDigits(9.81 * fallzeit, 2))}{' '}
                      {buildInlineFrac('m', 's')}
                      <>
                        {' '}
                        <Color4>
                          <span className="inline-block  scale-y-[2]">)</span>
                        </Color4>
                      </>
                      ²
                    </>,
                  )}
                </>,
              ],
              [
                <>v</>,
                <>≈</>,
                <>
                  {pp(v)} {buildInlineFrac('m', 's')}
                </>,
              ],
            ])}
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
        const fallzeit = roundToDigits(
          Math.sqrt((2 * (data.höhe - data.länge)) / 9.81),
          2,
        )
        const v = roundToDigits(
          Math.sqrt(
            data.bahngeschwindigkeit * data.bahngeschwindigkeit +
              roundToDigits(9.81 * fallzeit, 2) *
                roundToDigits(9.81 * fallzeit, 2),
          ),
          2,
        )
        const Auftreffgeschwindigkeit = Math.round(v / 10) * 10
        return (
          <>
            <p>
              Der Eisblock trifft für die folgende Aufgabe mit v<sub>Auf</sub> ={' '}
              {pp(Auftreffgeschwindigkeit)} {buildInlineFrac(<>m</>, <>s</>)}{' '}
              auf weichem Ackerboden auf. Dabei wird er in{' '}
              {pp(data.abbremszeit)} ms vollständig abgebremst. Berechnen Sie
              die mittlere Bremskraft, die beim Aufprall auf den Eisblock wirkt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const fallzeit = roundToDigits(
          Math.sqrt((2 * (data.höhe - data.länge)) / 9.81),
          2,
        )
        const v = roundToDigits(
          Math.sqrt(
            data.bahngeschwindigkeit * data.bahngeschwindigkeit +
              roundToDigits(9.81 * fallzeit, 2) *
                roundToDigits(9.81 * fallzeit, 2),
          ),
          2,
        )
        const Auftreffgeschwindigkeit = Math.round(v / 10) * 10
        return (
          <>
            <p>Für die Bremskraft gilt:</p>
            {buildEquation([
              [<>F</>, <>=</>, <>{buildInlineFrac(<>Δp</>, <>Δt</>)}</>],
            ])}
            <p>
              Der Impuls p des Eisblocks beträgt:<br></br> p = m · v ={' '}
              {pp(data.masse / 1000)} kg · {pp(Auftreffgeschwindigkeit)}{' '}
              {buildInlineFrac(<>m</>, <>s</>)} ={' '}
              {pp((data.masse / 1000) * Auftreffgeschwindigkeit)} kg{' '}
              {buildInlineFrac(<>m</>, <>s</>)}
            </p>
            <p>
              Dieser Impuls wird in der Zeit <br></br>Δt ={' '}
              {pp(data.abbremszeit)} ms = {pp(data.abbremszeit / 1000)} s
              <br></br> übertragen. Die Kraft beträgt damit:
            </p>
            {buildEquation([
              [<>F</>, <>=</>, <>{buildInlineFrac(<>Δp</>, <>Δt</>)}</>],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {pp((data.masse / 1000) * Auftreffgeschwindigkeit)} kg{' '}
                      {buildInlineFrac(<>m</>, <>s</>)}
                    </>,
                    <>{pp(data.abbremszeit / 1000)} s</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      ((data.masse / 1000) * Auftreffgeschwindigkeit) /
                        (data.abbremszeit / 1000),
                      2,
                    ),
                  )}
                  N
                </>,
              ],
            ])}
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
              Eine Windkraftanlage dieser Größe besitzt eine mittlere
              elektrische Leistung von {pp(data.leistung)} kW.
            </p>
            <p>
              Geben Sie an, welche Energieformen bei einer Windkraftanlage
              ineinander umgewandelt werden.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bei einem Windrad wird die kinetische Energie des Windes in
              kinetische Energie der Rotoren umgewandelt. Diese wird im
              Generator in elektrische Energie umgewandelt.
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
              Berechnen Sie die elektrische Energie, die innerhalb von 24
              Stunden von der Windkraftanlage bereitgestellt wird.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Das Windrad besitzt eine mittlere Leistung von {pp(data.leistung)}{' '}
              kW.
            </p>
            <p>
              An einem Tag werden damit <br></br>
              {pp(data.leistung)} kW · 24 h = {pp(24 * data.leistung)} kWh ={' '}
              {pp((24 * data.leistung) / 1000)} MWh<br></br> generiert.
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
              Die Batteriekapazität eines Elektroautos beträgt im Durchschnitt{' '}
              {pp(data.batterie)} kWh. Der Ladewirkungsgrad liegt bei{' '}
              {pp(data.wirkungsgrad)} %. Berechnen Sie die Anzahl der
              Elektroautos, die mit dem täglichen Energieertrag der
              Windkraftanlage geladen werden können.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Zum Laden eines Autos werden aufgrund des Wirkungsgrads{' '}
              {buildInlineFrac(
                <>{pp(data.batterie)} kWh</>,
                <>{pp(data.wirkungsgrad / 100)}</>,
              )}{' '}
              ≈{' '}
              {pp(roundToDigits((100 * data.batterie) / data.wirkungsgrad, 2))}{' '}
              kWh benötigt.
            </p>
            <p>Die Gesamtzahl der Autos beträgt damit:</p>
            <p>
              {buildInlineFrac(
                <>{pp(24 * data.leistung)} kWh</>,
                <>
                  {buildInlineFrac(
                    <>{pp(data.batterie)} kWh</>,
                    <>{pp(data.wirkungsgrad / 100)}</>,
                  )}
                </>,
              )}{' '}
              ≈{' '}
              {pp(
                Math.floor(
                  ((data.wirkungsgrad / 100) * (24 * data.leistung)) /
                    data.batterie,
                ),
              )}{' '}
            </p>
            <p>
              Tipp: Das Ergebnis der Rechnung muss auf ganze Autos abgerundet
              werden.
            </p>
          </>
        )
      },
    },
  ],
}
