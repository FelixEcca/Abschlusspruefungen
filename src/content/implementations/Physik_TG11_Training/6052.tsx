import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  pull: number
  mu: number
  normal: number
  friction: number
  netForce: number
  acceleration: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6052: Exercise<DATA> = {
  title: 'Bewegung mit Reibung bewerten',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([8, 10, 12, 15, 20])
    const mu = rng.randomItemFromArray([0.08, 0.1, 0.15, 0.2])
    const normal = round2(mass * 9.81)
    const friction = round2(mu * normal)
    const pull = round2(friction + rng.randomItemFromArray([-5, 0, 5, 10, 20]))
    const netForce = round2(pull - friction)
    const acceleration = round2(netForce / mass)

    return { mass, pull, mu, normal, friction, netForce, acceleration }
  },

  originalData: {
    mass: 10,
    pull: 25,
    mu: 0.2,
    normal: 98.1,
    friction: 19.62,
    netForce: 5.38,
    acceleration: 0.54,
  },

  constraint({ data }) {
    return data.mass > 0 && data.friction > 0 && data.pull > 0
  },

  task({ data }) {
    return (
      <p>
        Eine Kiste mit <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} />{' '}
        wird waagerecht mit{' '}
        <InlineMath math={`F_\\mathrm Z=${pp(data.pull)}\\,\\mathrm N`} />{' '}
        gezogen. Der Reibungskoeffizient beträgt{' '}
        <InlineMath math={`\\mu=${pp(data.mu)}`} />. Berechne die Reibungskraft
        und bewerte, ob die Kiste schneller wird.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`F_\\mathrm R=\\mu\\cdot m\\cdot g=${pp(data.mu)}\\cdot${pp(data.mass)}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\approx${pp(data.friction)}\\,\\mathrm N`}
        />
        <br />
        <InlineMath
          math={`F_\\mathrm{res}=F_\\mathrm Z-F_\\mathrm R=${pp(data.pull)}\\,\\mathrm N-${pp(data.friction)}\\,\\mathrm N=${pp(data.netForce)}\\,\\mathrm N`}
        />
        <br />
        {data.netForce > 0 ? (
          <>
            <p>
              Die Kiste wird beschleunigt, da die Zugkraft größer ist als die
              Reibungskraft. Sie beschleunigt mit:
            </p>
            <InlineMath
              math={`a=\\tfrac{F_\\mathrm{res}}{m}=\\tfrac{${pp(data.netForce)}\\,\\mathrm N}{${pp(data.mass)}\\,\\mathrm{kg}}\\approx${pp(data.acceleration)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
          </>
        ) : (
          <p>
            Die Zugkraft ist nicht größer als die Reibungskraft. Die Kiste wird
            dadurch nicht schneller.
          </p>
        )}
      </>
    )
  },
}
