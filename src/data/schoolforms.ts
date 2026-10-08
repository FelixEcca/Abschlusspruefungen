import { navigationData } from '@/content/navigations'

interface SchoolformOption {
  name: string
  subjects: { label: string; examId: number }[]
}

const schoolformConfig: SchoolformOption[] = [
  {
    name: 'Ausbildungsvorbereitung (AV)',
    subjects: [
      { label: 'Mathematik', examId: 6 },
      { label: 'BFK Metall', examId: 7 },
      { label: 'BFK Elektrotechnik', examId: 8 },
    ],
  },
  {
    name: '2-jährige Berufsfachschule (2BFS2)',
    subjects: [
      { label: 'Mathematik', examId: 1 },
      { label: 'Physik', examId: 5 },
    ],
  },
  {
    name: 'Technisches Gymnasium 11 (TG11)',
    subjects: [
      { label: 'Mathematik', examId: 3 },
      { label: 'Physik', examId: 4 },
      { label: 'Chemie', examId: 26 },
    ],
  },
  {
    name: 'Technisches Gymnasium 12 (TG12)',
    subjects: [
      { label: 'Mathematik gAN', examId: 13 },
      { label: 'Mathematik eAN', examId: 14 },
      { label: 'Chemie', examId: 27 },
    ],
  },
  {
    name: 'Technisches Gymnasium 13 (TG13)',
    subjects: [
      { label: 'Mathematik gAN', examId: 15 },
      { label: 'Mathematik eAN', examId: 16 },
      { label: 'MEC-E', examId: 25 },
      { label: 'Chemie', examId: 28 },
    ],
  },
  {
    name: 'Berufskolleg 1BK1T',
    subjects: [
      { label: 'Mathematik', examId: 10 },
      { label: 'Grundlagen der Technik', examId: 11 },
    ],
  },
  {
    name: 'Berufskolleg 1BK2T',
    subjects: [
      { label: 'Mathematik', examId: 12 },
      { label: 'Physik', examId: 2 },
    ],
  },
  { name: 'FTM', subjects: [{ label: 'Technische Mathematik', examId: 17 }] },
  {
    name: 'Vorbereitungskurs Meister',
    subjects: [{ label: 'Mathematik', examId: 24 }],
  },
  {
    name: 'Berufskolleg Grafik-Design (3BKGD1)',
    subjects: [{ label: 'Mathematik', examId: 18 }],
  },
  {
    name: 'Berufskolleg Grafik-Design (3BKGD2)',
    subjects: [{ label: 'Mathematik', examId: 19 }],
  },
  {
    name: 'Berufskolleg Grafik-Design (3BKGD3)',
    subjects: [{ label: 'Mathematik I', examId: 20 }],
  },
  {
    name: 'Berufskolleg 3BKM/R1',
    subjects: [{ label: 'Mathematik', examId: 21 }],
  },
  {
    name: 'Berufskolleg 3BKM/R2',
    subjects: [{ label: 'Mathematik', examId: 22 }],
  },
  {
    name: 'Berufskolleg 3BKM/R3',
    subjects: [{ label: 'Mathematik', examId: 23 }],
  },
]

export const schoolforms = schoolformConfig
  .map(form => ({
    ...form,
    subjects: form.subjects.filter(subject => navigationData[subject.examId]),
  }))
  .filter(form => form.subjects.length > 0)
