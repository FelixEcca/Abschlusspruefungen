export type GiselaLook =
  | 'classic'
  | 'workshop'
  | 'technical'
  | 'research'
  | 'design'
  | 'master'
  | 'chemistry'

export const giselaLooks = [
  { look: 'workshop', title: 'Werkstatt', courses: 'AV und Berufsfachschule' },
  {
    look: 'technical',
    title: 'Technik',
    courses: 'Berufskolleg Technik und MEC-E',
  },
  { look: 'research', title: 'Forschung', courses: 'Technisches Gymnasium' },
  {
    look: 'design',
    title: 'Gestaltung',
    courses: 'Berufskolleg Grafik-Design',
  },
  { look: 'master', title: 'Meister', courses: 'Meistervorbereitung und FTM' },
  {
    look: 'chemistry',
    title: 'Labor',
    courses: 'Chemie am Technischen Gymnasium',
  },
] as const

const courseLooks: Record<number, GiselaLook> = {
  1: 'workshop',
  2: 'technical',
  3: 'research',
  4: 'research',
  5: 'workshop',
  6: 'workshop',
  7: 'workshop',
  8: 'workshop',
  10: 'technical',
  11: 'technical',
  12: 'technical',
  13: 'research',
  14: 'research',
  15: 'research',
  16: 'research',
  17: 'master',
  18: 'design',
  19: 'design',
  20: 'design',
  21: 'technical',
  22: 'technical',
  23: 'technical',
  24: 'master',
  25: 'technical',
  26: 'chemistry',
  27: 'chemistry',
  28: 'chemistry',
}

export function getGiselaLook(examId: number): GiselaLook {
  return courseLooks[examId] ?? 'classic'
}
