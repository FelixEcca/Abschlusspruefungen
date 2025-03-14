import { Navigation } from '@/data/types'

export const navigationData: { [key: number]: Navigation } = {
  3: {
    longTitle: 'Baden-Württemberg - Realschulabschluss',
    shortTitle: 'BW - RS',
    topics: [
      {
        title: 'TestTopic',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'TestSkill',
            skillExercises: [
              {
                id: 200,
              },
            ],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  4: {
    longTitle: 'Baden-Württemberg - 2BFS',
    shortTitle: 'BW - 2BFS',
    topics: [
      {
        title: 'TestTopic',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'TestSkill',
            skillExercises: [
              {
                id: 300,
              },
            ],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
}
