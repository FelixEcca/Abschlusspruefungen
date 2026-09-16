import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type Material = 'steel' | 'aluminium' | 'brass' | 'copper'
type Target = 'mass' | 'volume' | 'density'

interface DATA {
  material: Material
  target: Target
  volume: number
}

function materialData(material: Material) {
  if (material === 'aluminium') {
    return { name: 'Aluminium', density: 2.7 }
  }
  if (material === 'brass') {
    return { name: 'Messing', density: 8.5 }
  }
  if (material === 'copper') {
    return { name: 'Kupfer', density: 8.96 }
  }
  return { name: 'Stahl', density: 7.85 }
}

export const exercise13015: Exercise<DATA> = {
  title: 'Dichte, Masse und Volumen',
  source: 'Vorbereitungskurs Meister · Gleichungen und Formeln',
  useCalculator: true,
  duration: 8,
  generator(rng) {
    return {
      material: rng.randomItemFromArray<Material>([
        'steel',
        'aluminium',
        'brass',
        'copper',
      ]),
      target: rng.randomItemFromArray<Target>(['mass', 'volume', 'density']),
      volume: rng.randomIntBetween(4, 40) * 25,
    }
  },
  originalData: {
    material: 'steel',
    target: 'mass',
    volume: 500,
  },
  constraint({ data }) {
    return data.volume > 0
  },
  intro({ data }) {
    const material = materialData(data.material)
    const mass = data.volume * material.density

    if (data.target === 'mass') {
      return (
        <p>
          Ein Werkstück aus {material.name} besitzt ein Volumen von{' '}
          {pp(data.volume)} cm³. Die Dichte beträgt {pp(material.density)}{' '}
          g/cm³. Berechnen Sie die Masse.
        </p>
      )
    }

    if (data.target === 'volume') {
      return (
        <p>
          Ein Bauteil aus {material.name} hat eine Masse von {pp(mass)} g. Die
          Dichte beträgt {pp(material.density)} g/cm³. Berechnen Sie das
          Volumen.
        </p>
      )
    }

    return (
      <p>
        Eine Werkstoffprobe hat bei einem Volumen von {pp(data.volume)} cm³ eine
        Masse von {pp(mass)} g. Berechnen Sie die Dichte und ordnen Sie die
        Probe einem Werkstoff zu.
      </p>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        const targetName =
          data.target === 'mass'
            ? 'Masse m'
            : data.target === 'volume'
              ? 'Volumen V'
              : 'Dichte ρ'
        return (
          <>
            <p>Stellen Sie die Dichteformel nach {targetName} um.</p>
            <BlockMath math={`\\rho=\\frac{m}{V}`} />
          </>
        )
      },
      solution({ data }) {
        const formula =
          data.target === 'mass'
            ? 'm=\\rho\\cdot V'
            : data.target === 'volume'
              ? 'V=\\frac{m}{\\rho}'
              : '\\rho=\\frac{m}{V}'
        return <BlockMath math={formula} />
      },
    },
    {
      points: 4,
      task() {
        return (
          <p>
            Berechnen Sie die gesuchte Größe. Schreiben Sie die Einheiten beim
            Einsetzen mit und geben Sie einen Antwortsatz an.
          </p>
        )
      },
      solution({ data }) {
        const material = materialData(data.material)
        const mass = data.volume * material.density

        if (data.target === 'mass') {
          return (
            <>
              <BlockMath
                math={`m=${pp(material.density)}\\,\\frac{\\mathrm{g}}{\\mathrm{cm}^3}\\cdot${pp(data.volume)}\\,\\mathrm{cm}^3=${pp(mass)}\\,\\mathrm{g}`}
              />
              <p>Die Masse beträgt {pp(mass / 1000)} kg.</p>
            </>
          )
        }

        if (data.target === 'volume') {
          return (
            <>
              <BlockMath math={`V=\\frac{${pp(mass)}\\,\\mathrm{g}}{${pp(material.density)}\\,\\frac{\\mathrm{g}}{\\mathrm{cm}^3}}=${pp(data.volume)}\\,\\mathrm{cm}^3`} />
              <p>Das Volumen beträgt {pp(data.volume)} cm³.</p>
            </>
          )
        }

        return (
          <>
            <BlockMath
              math={`\\rho=\\frac{${pp(mass)}\\,\\mathrm{g}}{${pp(data.volume)}\\,\\mathrm{cm}^3}=${pp(material.density)}\\,\\frac{\\mathrm{g}}{\\mathrm{cm}^3}`}
            />
            <p>Die Dichte entspricht {material.name}.</p>
          </>
        )
      },
    },
  ],
}
