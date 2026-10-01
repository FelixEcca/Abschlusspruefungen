import dynamic from 'next/dynamic'
import { exercisesData } from '@/content/exercises'

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
})

export async function generateStaticParams() {
  return [
    { all: ['app'] },
    { all: ['app', 'home'] },
    { all: ['app', 'list'] },
    { all: ['app', 'search'] },
    { all: ['app', 'start'] },
    { all: ['app', 'training'] },
    { all: ['app', 'profile'] },

    { all: ['exercise', '123456'] },
    { all: ['settings'] },

    ...Object.keys(exercisesData).map(id => ({
      all: ['exercise', id],
    })),
  ]
}

export default function Page() {
  return <App />
}
