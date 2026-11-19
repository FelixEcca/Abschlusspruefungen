import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  voltage: number
  heaterPower: number
  motorOutputPower: number
  motorCosPhi: number
  motorEfficiency: number
  residualPower: number
}

const calculateValues = (data: DATA) => {
  const phiMotor = Math.acos(data.motorCosPhi)

  // Elektrische Wirkleistungsaufnahme des Motors
  const motorActivePower = data.motorOutputPower / data.motorEfficiency

  // Blind- und Scheinleistung des Motors
  const motorReactivePower = motorActivePower * Math.tan(phiMotor)
  const motorApparentPower = motorActivePower / data.motorCosPhi

  // Stromkomponenten des Motors
  const motorActiveCurrent =
    motorActivePower * 1000 / (Math.sqrt(3) * data.voltage)

  const motorReactiveCurrent =
    motorReactivePower * 1000 / (Math.sqrt(3) * data.voltage)

  const motorCurrent = Math.sqrt(
    motorActiveCurrent ** 2 + motorReactiveCurrent ** 2
  )

  // Gesamtleistungen der Anlage
  const totalActivePower =
    data.heaterPower + motorActivePower + data.residualPower / 1000

  const totalReactivePower = motorReactivePower

  const totalApparentPower = Math.sqrt(
    totalActivePower ** 2 + totalReactivePower ** 2
  )

  // Gesamtstrom
  const totalActiveCurrent =
    totalActivePower * 1000 / (Math.sqrt(3) * data.voltage)

  const totalReactiveCurrent =
    totalReactivePower * 1000 / (Math.sqrt(3) * data.voltage)

  const totalCurrent = Math.sqrt(
    totalActiveCurrent ** 2 + totalReactiveCurrent ** 2
  )

  const phiTotal = Math.atan2(
    totalReactivePower,
    totalActivePower
  )

  return {
    phiMotor,
    motorActivePower,
    motorReactivePower,
    motorApparentPower,
    motorActiveCurrent,
    motorReactiveCurrent,
    motorCurrent,
    totalActivePower,
    totalReactivePower,
    totalApparentPower,
    totalActiveCurrent,
    totalReactiveCurrent,
    totalCurrent,
    phiTotal,
  }
}

const round = (value: number) => Math.round(value * 100) / 100

export const exercise26000: Exercise<DATA> = {
  title: 'Wechselspannungsanalyse durchführen',
  source: 'Training – Wechselstromanalyse',
  useCalculator: true,
  duration: 35,
  points: 20,

  generator(rng) {
    return {
      voltage: 400,
      heaterPower: rng.randomItemFromArray([
        12, 13, 14, 15, 16, 17, 18,
      ]),
      motorOutputPower: rng.randomItemFromArray([
        0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7,
      ]),
      motorCosPhi: rng.randomItemFromArray([
        0.70, 0.72, 0.75, 0.78, 0.80, 0.82, 0.85,
      ]),
      motorEfficiency: rng.randomItemFromArray([
        0.72, 0.74, 0.76, 0.79, 0.81, 0.83, 0.85,
      ]),
      residualPower: rng.randomItemFromArray([
        100, 150, 200, 250, 300, 350, 400,
      ]),
    }
  },

  originalData: {
    voltage: 400,
    heaterPower: 15,
    motorOutputPower: 1.3,
    motorCosPhi: 0.75,
    motorEfficiency: 0.79,
    residualPower: 200,
  },

  constraint({ data }) {
    return (
      data.voltage === 400 &&
      data.heaterPower >= 12 &&
      data.heaterPower <= 18 &&
      data.motorOutputPower > 0 &&
      data.motorCosPhi >= 0.7 &&
      data.motorCosPhi <= 0.85 &&
      data.motorEfficiency >= 0.72 &&
      data.motorEfficiency <= 0.85 &&
      data.residualPower >= 100 &&
      data.residualPower <= 400 &&
      data.motorEfficiency > 0 &&
      data.motorCosPhi > 0 &&
      data.motorCosPhi <= 1
    )
  },

  intro({ data }) {
    return (
      <>
        <p>
          Eine elektrische Anlage wird an einem symmetrischen Drehstromnetz
          mit einer Netzspannung von{' '}
          <InlineMath math={`${data.voltage}\\,\\mathrm{V}`} /> betrieben.
          Die elektrischen Kennwerte der Anlage wurden wie folgt ermittelt:
        </p>

        <div className="my-3 rounded-lg border p-3 space-y-2">
          <p>
            <strong>Netzspannung:</strong>{' '}
            <InlineMath math={`${data.voltage}\\,\\mathrm{V}`} />
          </p>
          <p>
            <strong>Heizung:</strong>{' '}
            <InlineMath math={`${pp(data.heaterPower)}\\,\\mathrm{kW}`} />
          </p>
          <p>
            <strong>Motor:</strong>
          </p>
          <ul className="list-disc pl-5">
            <li>
              Abgegebene Leistung:{' '}
              <InlineMath
                math={`${pp(data.motorOutputPower)}\\,\\mathrm{kW}`}
              />
            </li>
            <li>
              Leistungsfaktor:{' '}
              <InlineMath math={`\\cos\\varphi=${pp(data.motorCosPhi)}`} />
            </li>
            <li>
              Wirkungsgrad:{' '}
              <InlineMath math={`\\eta=${pp(data.motorEfficiency)}`} />
            </li>
          </ul>
          <p>
            <strong>Allgemeine restliche Leistung:</strong>{' '}
            <InlineMath
              math={`${pp(data.residualPower)}\\,\\mathrm{W}`}
            />{' '}
            (ohne Phasenverschiebung)
          </p>
        </div>

        <p>
          Die Heizung und die allgemeine restliche Leistung werden als
          ohmsche Verbraucher betrachtet. Der Motor ist ein induktiver
          Verbraucher. Alle Verbraucher werden als symmetrisch auf die
          drei Phasen verteilt angenommen.
        </p>

        <p>
          Für die Berechnungen gilt die Drehstromformel:
        </p>

        <BlockMath
          math={`P=\\sqrt{3}\\cdot U\\cdot I\\cdot\\cos\\varphi`}
        />

        <p>
          Runde alle Ergebnisse auf zwei Nachkommastellen.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 1,

      intro({ data }) {
        return null
      },

      task({ data }) {
        return (
          <>
            <p>
              <strong>6.1</strong> Bestimme den Phasenverschiebungswinkel
              des Motors.
            </p>
          </>
        )
      },

      solution({ data }) {
        const v = calculateValues(data)

        return (
          <>
            <p>Aus dem Leistungsfaktor ergibt sich:</p>

            <BlockMath
              math={`\\cos\\varphi= ${pp(data.motorCosPhi)}`}
            />

            <p>Nach dem Winkel umgestellt:</p>

            <BlockMath
              math={`\\varphi=\\arccos(${pp(data.motorCosPhi)})`}
            />

            <BlockMath
              math={`\\boxed{\\varphi=${pp(round(v.phiMotor * 180 / Math.PI))}^{\\circ}}`}
            />
          </>
        )
      },
    },

    {
      points: 1,

      intro({ data }) {
        return null
      },

      task({ data }) {
        return (
          <>
            <p>
              <strong>6.2</strong> Erkläre, welchen Zusammenhang zwischen
              Spannung und Strom der Phasenverschiebungswinkel beschreibt.
            </p>
          </>
        )
      },

      solution({ data }) {
        return (
          <>
            <p>
              Der Phasenverschiebungswinkel beschreibt die zeitliche
              Verschiebung zwischen dem Spannungsverlauf und dem
              Stromverlauf einer Wechselspannung.
            </p>
            <p>
              Bei einem induktiven Verbraucher wie dem Motor eilt die
              Spannung dem Strom voraus. Der Strom hinkt der Spannung
              um den Phasenverschiebungswinkel hinterher.
            </p>
            <p>
              Je größer der Winkel ist, desto größer ist bei gleichem
              Effektivstrom der Blindleistungsanteil. Der Leistungsfaktor
              wird durch den Kosinus des Winkels beschrieben:
            </p>
            <BlockMath math={`\\cos\\varphi=\\frac{P}{S}`} />
          </>
        )
      },
    },

    {
      points: 3,

      intro({ data }) {
        return null
      },

      task({ data }) {
        return (
          <>
            <p>
              <strong>6.3</strong> Berechne den Wirkstrom und den Blindstrom
              des Motors.
            </p>
          </>
        )
      },

      solution({ data }) {
        const v = calculateValues(data)

        return (
          <>
            <p>
              Zuerst wird die elektrische Wirkleistungsaufnahme des
              Motors mit dem Wirkungsgrad berechnet:
            </p>

            <BlockMath
              math={`P_{\\mathrm{Motor}}=\\frac{P_2}{\\eta}`}
            />

            <BlockMath
              math={`P_{\\mathrm{Motor}}=\\frac{${pp(data.motorOutputPower)}}{${pp(data.motorEfficiency)}}=${pp(round(v.motorActivePower))}\\,\\mathrm{kW}`}
            />

            <p>
              Der Phasenverschiebungswinkel ist aus Teilaufgabe 6.1
              bekannt. Daraus ergibt sich die Blindleistung:
            </p>

            <BlockMath
              math={`Q_{\\mathrm{Motor}}=P_{\\mathrm{Motor}}\\cdot\\tan\\varphi`}
            />

            <BlockMath
              math={`Q_{\\mathrm{Motor}}=${pp(round(v.motorActivePower))}\\cdot\\tan(${pp(round(v.phiMotor * 180 / Math.PI))}^{\\circ})`}
            />

            <BlockMath
              math={`Q_{\\mathrm{Motor}}=${pp(round(v.motorReactivePower))}\\,\\mathrm{kvar}`}
            />

            <p>
              Berechnung des Wirkstroms:
            </p>

            <BlockMath
              math={`I_W=\\frac{P_{\\mathrm{Motor}}\\cdot1000}{\\sqrt{3}\\cdot U}`}
            />

            <BlockMath
              math={`I_W=\\frac{${pp(round(v.motorActivePower * 1000))}}{\\sqrt{3}\\cdot${pp(data.voltage)}}=${pp(round(v.motorActiveCurrent))}\\,\\mathrm{A}`}
            />

            <p>
              Berechnung des Blindstroms:
            </p>

            <BlockMath
              math={`I_B=\\frac{Q_{\\mathrm{Motor}}\\cdot1000}{\\sqrt{3}\\cdot U}`}
            />

            <BlockMath
              math={`I_B=\\frac{${pp(round(v.motorReactivePower * 1000))}}{\\sqrt{3}\\cdot${pp(data.voltage)}}=${pp(round(v.motorReactiveCurrent))}\\,\\mathrm{A}`}
            />

            <p className="font-semibold">
              Ergebnis:
            </p>

            <BlockMath
              math={`\\boxed{I_W=${pp(round(v.motorActiveCurrent))}\\,\\mathrm{A}\\qquad I_B=${pp(round(v.motorReactiveCurrent))}\\,\\mathrm{A}}`}
            />
          </>
        )
      },
    },

    {
      points: 7,

      intro({ data }) {
        return null
      },

      task({ data }) {
        return (
          <>
            <p>
              <strong>6.4</strong> Berechne die Stromaufnahme der gesamten
              Anlage.
            </p>
            <p>
              Berücksichtige dabei die Wirk- und Blindstromanteile aller
              Verbraucher.
            </p>
          </>
        )
      },

      solution({ data }) {
        const v = calculateValues(data)

        const heaterCurrent =
          data.heaterPower * 1000 / (Math.sqrt(3) * data.voltage)

        const residualCurrent =
          data.residualPower / (Math.sqrt(3) * data.voltage)

        return (
          <>
            <p>
              Die Heizung und die allgemeine restliche Leistung sind
              ohmsche Verbraucher. Sie besitzen keinen Blindstromanteil.
            </p>

            <p>Wirkstrom der Heizung:</p>

            <BlockMath
              math={`I_{W,H}=\\frac{${pp(data.heaterPower * 1000)}}{\\sqrt{3}\\cdot${pp(data.voltage)}}=${pp(round(heaterCurrent))}\\,\\mathrm{A}`}
            />

            <p>Wirkstrom der restlichen Verbraucher:</p>

            <BlockMath
              math={`I_{W,R}=\\frac{${pp(data.residualPower)}}{\\sqrt{3}\\cdot${pp(data.voltage)}}=${pp(round(residualCurrent))}\\,\\mathrm{A}`}
            />

            <p>Gesamter Wirkstrom:</p>

            <BlockMath
              math={`I_{W,ges}=I_{W,H}+I_{W,R}+I_{W,Motor}`}
            />

            <BlockMath
              math={`I_{W,ges}=${pp(round(heaterCurrent))}+${pp(round(residualCurrent))}+${pp(round(v.motorActiveCurrent))}`}
            />

            <BlockMath
              math={`I_{W,ges}=${pp(round(v.totalActiveCurrent))}\\,\\mathrm{A}`}
            />

            <p>
              Da nur der Motor eine Phasenverschiebung aufweist, entspricht
              der gesamte Blindstrom dem Blindstrom des Motors:
            </p>

            <BlockMath
              math={`I_{B,ges}=I_{B,Motor}=${pp(round(v.totalReactiveCurrent))}\\,\\mathrm{A}`}
            />

            <p>
              Der Gesamtstrom ergibt sich aus der geometrischen Addition
              von Wirk- und Blindstrom:
            </p>

            <BlockMath
              math={`I_{ges}=\\sqrt{I_{W,ges}^{2}+I_{B,ges}^{2}}`}
            />

            <BlockMath
              math={`I_{ges}=\\sqrt{${pp(round(v.totalActiveCurrent))}^{2}+${pp(round(v.totalReactiveCurrent))}^{2}}`}
            />

            <BlockMath
              math={`\\boxed{I_{ges}=${pp(round(v.totalCurrent))}\\,\\mathrm{A}}`}
            />
          </>
        )
      },
    },

    {
      points: 2,

      intro({ data }) {
        return null
      },

      task({ data }) {
        return (
          <>
            <p>
              <strong>6.5</strong> Bestimme den Phasenverschiebungswinkel
              der gesamten Anlage.
            </p>
          </>
        )
      },

      solution({ data }) {
        const v = calculateValues(data)

        return (
          <>
            <p>
              Der Gesamtwinkel ergibt sich aus dem Verhältnis von
              Gesamtblindleistung zu Gesamtwirkleistung:
            </p>

            <BlockMath
              math={`\\tan\\varphi_{ges}=\\frac{Q_{ges}}{P_{ges}}`}
            />

            <p>
              Die Gesamtwirkleistung beträgt:
            </p>

            <BlockMath
              math={`P_{ges}=${pp(data.heaterPower)}+${pp(round(v.motorActivePower))}+${pp(data.residualPower / 1000)}=${pp(round(v.totalActivePower))}\\,\\mathrm{kW}`}
            />

            <p>
              Die Gesamtblindleistung beträgt:
            </p>

            <BlockMath
              math={`Q_{ges}=${pp(round(v.totalReactivePower))}\\,\\mathrm{kvar}`}
            />

            <p>Einsetzen und nach dem Winkel auflösen:</p>

            <BlockMath
              math={`\\varphi_{ges}=\\arctan\\left(\\frac{${pp(round(v.totalReactivePower))}}{${pp(round(v.totalActivePower))}}\\right)`}
            />

            <BlockMath
              math={`\\boxed{\\varphi_{ges}=${pp(round(v.phiTotal * 180 / Math.PI))}^{\\circ}}`}
            />
          </>
        )
      },
    },

    {
      points: 6,

      intro({ data }) {
        return null
      },

      task({ data }) {
        return (
          <>
            <p>
              <strong>6.6</strong> Berechne die Wirkleistung,
              Scheinleistung und Blindleistung der gesamten Schaltung.
            </p>
          </>
        )
      },

      solution({ data }) {
        const v = calculateValues(data)

        return (
          <>
            <p>
              <strong>1. Gesamtwirkleistung</strong>
            </p>

            <p>
              Die Gesamtwirkleistung setzt sich aus der Leistung der
              Heizung, der elektrischen Leistungsaufnahme des Motors
              und der restlichen Leistung zusammen:
            </p>

            <BlockMath
              math={`P_{ges}=P_H+P_{Motor}+P_R`}
            />

            <BlockMath
              math={`P_{ges}=${pp(data.heaterPower)}+${pp(round(v.motorActivePower))}+${pp(data.residualPower / 1000)}`}
            />

            <BlockMath
              math={`\\boxed{P_{ges}=${pp(round(v.totalActivePower))}\\,\\mathrm{kW}}`}
            />

            <p>
              <strong>2. Gesamtblindleistung</strong>
            </p>

            <p>
              Da Heizung und restliche Verbraucher keine
              Phasenverschiebung besitzen, entsteht die gesamte
              Blindleistung ausschließlich durch den Motor:
            </p>

            <BlockMath
              math={`Q_{ges}=Q_{Motor}`}
            />

            <BlockMath
              math={`\\boxed{Q_{ges}=${pp(round(v.totalReactivePower))}\\,\\mathrm{kvar}}`}
            />

            <p>
              <strong>3. Gesamtscheinleistung</strong>
            </p>

            <p>
              Die Scheinleistung wird mit dem Satz des Pythagoras
              aus Wirk- und Blindleistung berechnet:
            </p>

            <BlockMath
              math={`S_{ges}=\\sqrt{P_{ges}^{2}+Q_{ges}^{2}}`}
            />

            <BlockMath
              math={`S_{ges}=\\sqrt{${pp(round(v.totalActivePower))}^{2}+${pp(round(v.totalReactivePower))}^{2}}`}
            />

            <BlockMath
              math={`\\boxed{S_{ges}=${pp(round(v.totalApparentPower))}\\,\\mathrm{kVA}}`}
            />

            <p className="font-semibold">
              Ergebnisse:
            </p>

            <div className="rounded-lg border p-3 space-y-2">
              <p>
                Wirkleistung:{' '}
                <InlineMath
                  math={`P_{ges}=${pp(round(v.totalActivePower))}\\,\\mathrm{kW}`}
                />
              </p>
              <p>
                Blindleistung:{' '}
                <InlineMath
                  math={`Q_{ges}=${pp(round(v.totalReactivePower))}\\,\\mathrm{kvar}`}
                />
              </p>
              <p>
                Scheinleistung:{' '}
                <InlineMath
                  math={`S_{ges}=${pp(round(v.totalApparentPower))}\\,\\mathrm{kVA}`}
                />
              </p>
            </div>
          </>
        )
      },
    },
  ],
}