// exercise6017.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type EnergyType = 'kinetic' | 'potential' | 'spring'
type PartBMode = 'mass' | 'speed' | 'height' | 'springConstant' | 'stretch'

interface DATA {
  energyType: EnergyType
  partBMode: PartBMode

  m: number
  v: number
  h: number
  d: number
  s: number
  energy: number

  bEnergy: number
  bMass: number
  bSpeed: number
  bHeight: number
  bSpringConstant: number
  bStretch: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getEnergyName(type: EnergyType) {
  if (type === 'kinetic') return 'kinetische Energie'
  if (type === 'potential') return 'potentielle Energie'
  return 'Spannenergie'
}

export const exercise6017: Exercise<DATA> = {
  title: 'Energieformen',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const energyType: EnergyType = rng.randomItemFromArray([
      'kinetic',
      'potential',
      'spring',
    ])

    if (energyType === 'kinetic') {
      const m = rng.randomItemFromArray([2, 5, 10, 20, 50])
      const v = rng.randomItemFromArray([3, 4, 5, 8, 10, 12])
      const energy = round2(0.5 * m * v * v)

      const partBMode: PartBMode = rng.randomItemFromArray(['mass', 'speed'])
      const bMass = rng.randomItemFromArray([2, 5, 10, 20, 50])
      const bSpeed = rng.randomItemFromArray([4, 6, 8, 10, 12])
      const bEnergy =
        partBMode === 'mass'
          ? round2(0.5 * bMass * v * v)
          : round2(0.5 * m * bSpeed * bSpeed)

      return {
        energyType,
        partBMode,
        m,
        v,
        h: 0,
        d: 0,
        s: 0,
        energy,
        bEnergy,
        bMass,
        bSpeed,
        bHeight: 0,
        bSpringConstant: 0,
        bStretch: 0,
      }
    }

    if (energyType === 'potential') {
      const m = rng.randomItemFromArray([2, 5, 10, 20, 50])
      const h = rng.randomItemFromArray([2, 3, 5, 8, 10, 15])
      const energy = round2(m * 9.81 * h)

      const partBMode: PartBMode = rng.randomItemFromArray(['mass', 'height'])
      const bMass = rng.randomItemFromArray([2, 5, 10, 20, 50])
      const bHeight = rng.randomItemFromArray([2, 3, 5, 8, 10, 15])
      const bEnergy =
        partBMode === 'mass'
          ? round2(bMass * 9.81 * h)
          : round2(m * 9.81 * bHeight)

      return {
        energyType,
        partBMode,
        m,
        v: 0,
        h,
        d: 0,
        s: 0,
        energy,
        bEnergy,
        bMass,
        bSpeed: 0,
        bHeight,
        bSpringConstant: 0,
        bStretch: 0,
      }
    }

    const d = rng.randomItemFromArray([100, 150, 200, 250, 300, 400])
    const s = rng.randomItemFromArray([0.05, 0.08, 0.1, 0.12, 0.15])
    const energy = round2(0.5 * d * s * s)

    const partBMode: PartBMode = rng.randomItemFromArray([
      'springConstant',
      'stretch',
    ])
    const bSpringConstant = rng.randomItemFromArray([100, 150, 200, 250, 300])
    const bStretch = rng.randomItemFromArray([0.05, 0.08, 0.1, 0.12, 0.15])
    const bEnergy =
      partBMode === 'springConstant'
        ? round2(0.5 * bSpringConstant * s * s)
        : round2(0.5 * d * bStretch * bStretch)

    return {
      energyType,
      partBMode,
      m: 0,
      v: 0,
      h: 0,
      d,
      s,
      energy,
      bEnergy,
      bMass: 0,
      bSpeed: 0,
      bHeight: 0,
      bSpringConstant,
      bStretch,
    }
  },

  originalData: {
    energyType: 'kinetic',
    partBMode: 'speed',
    m: 10,
    v: 8,
    h: 0,
    d: 0,
    s: 0,
    energy: 320,
    bEnergy: 500,
    bMass: 0,
    bSpeed: 10,
    bHeight: 0,
    bSpringConstant: 0,
    bStretch: 0,
  },

  constraint({ data }) {
    return data.energy > 0 && data.bEnergy > 0
  },

  intro({ data }) {
    return (
      <>
        <p>
          In dieser Aufgabe geht es um die{' '}
          <b>{getEnergyName(data.energyType)}</b>.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        if (data.energyType === 'kinetic') {
          return (
            <p>
              Ein Körper mit der Masse{' '}
              <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} /> bewegt sich
              mit der Geschwindigkeit{' '}
              <InlineMath
                math={`v=${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
              />
              . Berechnen Sie die kinetische Energie.
            </p>
          )
        }

        if (data.energyType === 'potential') {
          return (
            <p>
              Ein Körper mit der Masse{' '}
              <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} /> befindet
              sich in der Höhe{' '}
              <InlineMath math={`h=${pp(data.h)}\\,\\mathrm m`} />. Berechnen
              Sie die potentielle Energie.
            </p>
          )
        }

        return (
          <p>
            Eine Feder mit der Federkonstante{' '}
            <InlineMath
              math={`D=${pp(data.d)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
            />{' '}
            wird um <InlineMath math={`s=${pp(data.s)}\\,\\mathrm m`} />{' '}
            gespannt. Berechnen Sie die Spannenergie.
          </p>
        )
      },
      solution({ data }) {
        if (data.energyType === 'kinetic') {
          return (
            <>
              <p>Für die kinetische Energie gilt:</p>
              <InlineMath math={`E_\\mathrm{kin}=\\frac12\\cdot m\\cdot v^2`} />

              <p>Einsetzen der Werte:</p>
              <InlineMath
                math={`E_\\mathrm{kin}=\\frac12\\cdot ${pp(
                  data.m,
                )}\\,\\mathrm{kg}\\cdot \\left(${pp(
                  data.v,
                )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\right)^2`}
              />
              <br />
              <InlineMath
                math={`E_\\mathrm{kin}\\approx ${pp(data.energy)}\\,\\mathrm J`}
              />
            </>
          )
        }

        if (data.energyType === 'potential') {
          return (
            <>
              <p>Für die potentielle Energie gilt:</p>
              <InlineMath math={`E_\\mathrm{pot}=m\\cdot g\\cdot h`} />

              <p>Einsetzen der Werte:</p>
              <InlineMath
                math={`E_\\mathrm{pot}=${pp(
                  data.m,
                )}\\,\\mathrm{kg}\\cdot 9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot ${pp(
                  data.h,
                )}\\,\\mathrm m`}
              />
              <br />
              <InlineMath
                math={`E_\\mathrm{pot}\\approx ${pp(data.energy)}\\,\\mathrm J`}
              />
            </>
          )
        }

        return (
          <>
            <p>Für die Spannenergie gilt:</p>
            <InlineMath math={`E_\\mathrm{spann}=\\frac12\\cdot D\\cdot s^2`} />

            <p>Einsetzen der Werte:</p>
            <InlineMath
              math={`E_\\mathrm{spann}=\\frac12\\cdot ${pp(
                data.d,
              )}\\,\\tfrac{\\mathrm N}{\\mathrm m}\\cdot \\left(${pp(
                data.s,
              )}\\,\\mathrm m\\right)^2`}
            />
            <br />
            <InlineMath
              math={`E_\\mathrm{spann}\\approx ${pp(data.energy)}\\,\\mathrm J`}
            />
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        if (data.energyType === 'kinetic') {
          if (data.partBMode === 'mass') {
            return (
              <p>
                Bei gleicher Geschwindigkeit{' '}
                <InlineMath
                  math={`v=${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
                />{' '}
                beträgt die kinetische Energie{' '}
                <InlineMath
                  math={`E_\\mathrm{kin}=${pp(data.bEnergy)}\\,\\mathrm J`}
                />
                . Berechnen Sie die Masse.
              </p>
            )
          }

          return (
            <p>
              Bei gleicher Masse{' '}
              <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} /> beträgt die
              kinetische Energie{' '}
              <InlineMath
                math={`E_\\mathrm{kin}=${pp(data.bEnergy)}\\,\\mathrm J`}
              />
              . Berechnen Sie die Geschwindigkeit.
            </p>
          )
        }

        if (data.energyType === 'potential') {
          if (data.partBMode === 'mass') {
            return (
              <p>
                Bei gleicher Höhe{' '}
                <InlineMath math={`h=${pp(data.h)}\\,\\mathrm m`} /> beträgt die
                potentielle Energie{' '}
                <InlineMath
                  math={`E_\\mathrm{pot}=${pp(data.bEnergy)}\\,\\mathrm J`}
                />
                . Berechnen Sie die Masse.
              </p>
            )
          }

          return (
            <p>
              Bei gleicher Masse{' '}
              <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} /> beträgt die
              potentielle Energie{' '}
              <InlineMath
                math={`E_\\mathrm{pot}=${pp(data.bEnergy)}\\,\\mathrm J`}
              />
              . Berechnen Sie die Höhe.
            </p>
          )
        }

        if (data.partBMode === 'springConstant') {
          return (
            <p>
              Bei gleicher Auslenkung{' '}
              <InlineMath math={`s=${pp(data.s)}\\,\\mathrm m`} /> beträgt die
              Spannenergie{' '}
              <InlineMath
                math={`E_\\mathrm{spann}=${pp(data.bEnergy)}\\,\\mathrm J`}
              />
              . Berechnen Sie die Federkonstante.
            </p>
          )
        }

        return (
          <p>
            Bei gleicher Federkonstante{' '}
            <InlineMath
              math={`D=${pp(data.d)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
            />{' '}
            beträgt die Spannenergie{' '}
            <InlineMath
              math={`E_\\mathrm{spann}=${pp(data.bEnergy)}\\,\\mathrm J`}
            />
            . Berechnen Sie die Auslenkung.
          </p>
        )
      },
      solution({ data }) {
        if (data.energyType === 'kinetic') {
          if (data.partBMode === 'mass') {
            return (
              <>
                <p>Aus der Formel wird die Masse berechnet:</p>
                <InlineMath
                  math={`E_\\mathrm{kin}=\\frac12\\cdot m\\cdot v^2`}
                />
                <br />
                <InlineMath math={`m=\\frac{2E_\\mathrm{kin}}{v^2}`} />

                <p>Einsetzen der Werte:</p>
                <InlineMath
                  math={`m=\\frac{2\\cdot ${pp(
                    data.bEnergy,
                  )}\\,\\mathrm J}{\\left(${pp(
                    data.v,
                  )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\right)^2}`}
                />
                <br />
                <InlineMath
                  math={`m\\approx ${pp(data.bMass)}\\,\\mathrm{kg}`}
                />
              </>
            )
          }

          return (
            <>
              <p>Aus der Formel wird die Geschwindigkeit berechnet:</p>
              <InlineMath math={`E_\\mathrm{kin}=\\frac12\\cdot m\\cdot v^2`} />
              <br />
              <InlineMath math={`v=\\sqrt{\\frac{2E_\\mathrm{kin}}{m}}`} />

              <p>Einsetzen der Werte:</p>
              <InlineMath
                math={`v=\\sqrt{\\frac{2\\cdot ${pp(
                  data.bEnergy,
                )}\\,\\mathrm J}{${pp(data.m)}\\,\\mathrm{kg}}}`}
              />
              <br />
              <InlineMath
                math={`v\\approx ${pp(
                  data.bSpeed,
                )}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
              />
            </>
          )
        }

        if (data.energyType === 'potential') {
          if (data.partBMode === 'mass') {
            return (
              <>
                <p>Aus der Formel wird die Masse berechnet:</p>
                <InlineMath math={`E_\\mathrm{pot}=m\\cdot g\\cdot h`} />
                <br />
                <InlineMath math={`m=\\frac{E_\\mathrm{pot}}{g\\cdot h}`} />

                <p>Einsetzen der Werte:</p>
                <InlineMath
                  math={`m=\\frac{${pp(
                    data.bEnergy,
                  )}\\,\\mathrm J}{9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot ${pp(
                    data.h,
                  )}\\,\\mathrm m}`}
                />
                <br />
                <InlineMath
                  math={`m\\approx ${pp(data.bMass)}\\,\\mathrm{kg}`}
                />
              </>
            )
          }

          return (
            <>
              <p>Aus der Formel wird die Höhe berechnet:</p>
              <InlineMath math={`E_\\mathrm{pot}=m\\cdot g\\cdot h`} />
              <br />
              <InlineMath math={`h=\\frac{E_\\mathrm{pot}}{m\\cdot g}`} />

              <p>Einsetzen der Werte:</p>
              <InlineMath
                math={`h=\\frac{${pp(data.bEnergy)}\\,\\mathrm J}{${pp(
                  data.m,
                )}\\,\\mathrm{kg}\\cdot 9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}`}
              />
              <br />
              <InlineMath math={`h\\approx ${pp(data.bHeight)}\\,\\mathrm m`} />
            </>
          )
        }

        if (data.partBMode === 'springConstant') {
          return (
            <>
              <p>Aus der Formel wird die Federkonstante berechnet:</p>
              <InlineMath
                math={`E_\\mathrm{spann}=\\frac12\\cdot D\\cdot s^2`}
              />
              <br />
              <InlineMath math={`D=\\frac{2E_\\mathrm{spann}}{s^2}`} />

              <p>Einsetzen der Werte:</p>
              <InlineMath
                math={`D=\\frac{2\\cdot ${pp(
                  data.bEnergy,
                )}\\,\\mathrm J}{\\left(${pp(data.s)}\\,\\mathrm m\\right)^2}`}
              />
              <br />
              <InlineMath
                math={`D\\approx ${pp(
                  data.bSpringConstant,
                )}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
              />
            </>
          )
        }

        return (
          <>
            <p>Aus der Formel wird die Auslenkung berechnet:</p>
            <InlineMath math={`E_\\mathrm{spann}=\\frac12\\cdot D\\cdot s^2`} />
            <br />
            <InlineMath math={`s=\\sqrt{\\frac{2E_\\mathrm{spann}}{D}}`} />

            <p>Einsetzen der Werte:</p>
            <InlineMath
              math={`s=\\sqrt{\\frac{2\\cdot ${pp(
                data.bEnergy,
              )}\\,\\mathrm J}{${pp(data.d)}\\,\\tfrac{\\mathrm N}{\\mathrm m}}}`}
            />
            <br />
            <InlineMath math={`s\\approx ${pp(data.bStretch)}\\,\\mathrm m`} />
          </>
        )
      },
    },
  ],
}
