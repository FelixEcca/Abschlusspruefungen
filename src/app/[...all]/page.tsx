import dynamic from 'next/dynamic'
import { exercisesData } from '@/content/exercises'
import { navigationData } from '@/content/navigations'

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
    { all: ['feed'] },
    { all: ['exercise', '123456'] },
    { all: ['settings'] },
    ...[6, 1, 2, 3, 4, 5].map(t => ({ all: ['topic', t.toString()] })),
    ...Array.from({ length: navigationData[2].topics.length }).map((_, i) => ({
      all: ['topic', (101 + i).toString()],
    })),
    ...Array.from({ length: navigationData[3].topics.length }).map((_, i) => ({
      all: ['topic', (201 + i).toString()],
    })),
    ...Object.keys(exercisesData).map(id => ({
      all: ['exercise', id],
    })),
  ]
}

export default function Page() {
  return <App />
}
