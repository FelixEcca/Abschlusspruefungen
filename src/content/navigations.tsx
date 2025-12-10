import { Navigation } from '@/data/types'

export const navigationData: { [key: number]: Navigation } = {
  1: {
    longTitle: '2BFS2 - Mathe',
    shortTitle: '2BFS2 - Mathe',
    topics: [
      {
        title: 'Parabeln',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'a und c aus Schaubild ablesen',
            skillExercises: [{ id: 4008 }],
          },
          {
            name: 'Scheitel ablesen',
            skillExercises: [{ id: 4000 }],
          },
          {
            name: 'Wertetabelle ausfüllen',
            skillExercises: [{ id: 4001 }],
          },
          {
            name: 'Parabeln skizzieren',
            skillExercises: [{ id: 4007 }],
          },
          {
            name: 'a und c aus Punkten berechnen',
            skillExercises: [{ id: 4003 }],
          },

          {
            name: 'x-Wert zu gegebenem y-Wert berechnen',
            skillExercises: [{ id: 4301 }],
          },

          {
            name: 'Schnittpunkte mit Koordinatenachsen',
            skillExercises: [{ id: 4005 }],
          },
        ],
      },

      {
        title: 'Geraden',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Steigung & y-Achsenabschnitt bestimmen',
            skillExercises: [{ id: 4100 }],
          },
          {
            name: 'Geradengleichung aus zwei Punkten',
            skillExercises: [{ id: 4101 }],
          },
          {
            name: 'Parallel / Senkrecht',
            skillExercises: [{ id: 4102 }],
          },
          {
            name: 'Schnittpunkt von Geraden',
            skillExercises: [{ id: 4801 }],
          },
        ],
      },

      {
        title: 'Gleichungen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Gleichungen lösen',
            skillExercises: [{ id: 4200 }],
          },
          {
            name: 'Klammern & Ausmultiplizieren',
            skillExercises: [{ id: 4201 }],
          },
          {
            name: 'Bruchgleichungen',
            skillExercises: [{ id: 4202 }],
          },
        ],
      },

      {
        title: 'Quadratische Gleichungen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'pq-Formel',
            skillExercises: [{ id: 4300 }],
          },

          {
            name: 'Quadratische Ergänzung',
            skillExercises: [{ id: 4302 }],
          },
        ],
      },

      {
        title: 'Terme',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Terme vereinfachen',
            skillExercises: [{ id: 4400 }],
          },
          {
            name: 'Binomische Formeln',
            skillExercises: [{ id: 4401 }],
          },
          {
            name: 'Ausklammern',
            skillExercises: [{ id: 4402 }],
          },
          {
            name: 'Potenzen',
            skillExercises: [{ id: 4403 }],
          },
        ],
      },

      {
        title: 'Prozent und Zins',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Prozentrechnung',
            skillExercises: [{ id: 4500 }],
          },
          {
            name: 'Prozentuale Zu-/Abnahme',
            skillExercises: [{ id: 4501 }],
          },
          {
            name: 'Zinsrechnung',
            skillExercises: [{ id: 4502 }],
          },

          {
            name: 'Dreisatz',
            skillExercises: [{ id: 4503 }],
          },
          {
            name: 'Zusammenhang erkennen',
            skillExercises: [{ id: 4503 }],
          },
          {
            name: 'Termwerte berechnen',
            skillExercises: [{ id: 4503 }],
          },
        ],
      },

      {
        title: 'Figuren',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Umfang & Fläche',
            skillExercises: [{ id: 4600 }],
          },

          {
            name: 'Winkelsätze ',
            skillExercises: [{ id: 4601 }],
          },
          {
            name: 'Satz des Pythagoras',
            skillExercises: [{ id: 4602 }],
          },
        ],
      },

      {
        title: 'Körper',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Quader/Prisma',
            skillExercises: [{ id: 4700 }],
          },
          {
            name: 'Zylinder/Kegel/Kugel',
            skillExercises: [{ id: 4701 }],
          },
        ],
      },

      {
        title: 'LGS',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'LGS lösen',
            skillExercises: [{ id: 4800 }],
          },
        ],
      },

      {
        title: 'Daten und Zufall',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Diagramme',
            skillExercises: [{ id: 4900 }],
          },
          {
            name: 'Mittelwert/Median/Spannweite',
            skillExercises: [{ id: 4901 }],
          },
          {
            name: 'Wahrscheinlichkeit',
            skillExercises: [{ id: 4902 }],
          },
          {
            name: 'Absolute/relative Häufigkeit',
            skillExercises: [{ id: 4903 }],
          },
          {
            name: 'Baumdiagramm & Pfadregeln',
            skillExercises: [{ id: 4904 }],
          },
          {
            name: 'Erwartungswert',
            skillExercises: [{ id: 4905 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },

  2: {
    longTitle: '1BK2T - Physik',
    shortTitle: '1BK2T - Physik',
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
  3: {
    longTitle: 'TG11 - Mathe',
    shortTitle: 'TG11 - Mathe',
    topics: [
      {
        title: 'Vektoren',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Punkte skizzieren und Ablesen',
            skillExercises: [{ id: 5000 }],
          },
          {
            name: 'Lage von Punkten',
            skillExercises: [{ id: 5001 }],
          },
          {
            name: 'Punkte projizieren',
            skillExercises: [{ id: 5002 }],
          },
          {
            name: 'Verbindungs- und Gegenvektor',
            skillExercises: [{ id: 5003 }],
          },
          {
            name: 'Linearkombinationen',
            skillExercises: [{ id: 5004 }],
          },
          {
            name: 'Parallele Vektoren',
            skillExercises: [{ id: 5005 }],
          },
          {
            name: 'Mittelpunkte von Strecken',
            skillExercises: [{ id: 5006 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  4: {
    longTitle: 'TG11 - Physik',
    shortTitle: 'TG11 - Physik',
    topics: [
      {
        title: 'Kinematik',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Gleichförmige Bewegung',
            skillExercises: [
              {
                id: 7000,
              },
            ],
          },
          {
            name: 'Gleichmäßig beschleunigte Bewegung',
            skillExercises: [
              {
                id: 7001,
              },
            ],
          },
          {
            name: 'Bewegungsdiagramme',
            skillExercises: [
              {
                id: 6007,
              },
            ],
          },
          {
            name: 'Bewegungsgleichungen',
            skillExercises: [
              {
                id: 6005,
              },
            ],
          },
          {
            name: 'Freier Fall',
            skillExercises: [
              {
                id: 7002,
              },
            ],
          },
          {
            name: 'Geschwindigkeit in mehreren Dimensionen',
            skillExercises: [
              {
                id: 6000,
              },
            ],
          },
          {
            name: 'Waagerechter Wurf',
            skillExercises: [
              {
                id: 6006,
              },
            ],
          },
          {
            name: 'Verständnisfragen zur Kinematik',
            skillExercises: [
              {
                id: 6004,
              },
            ],
          },
        ],
      },
      {
        title: 'Impuls',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Impuls',
            skillExercises: [
              {
                id: 6001,
              },
            ],
          },
          {
            name: 'Impulserhaltung bei Stößen',
            skillExercises: [
              {
                id: 6002,
              },
            ],
          },
          {
            name: 'Verständnisfragen zum Impuls',
            skillExercises: [
              {
                id: 6003,
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
  5: {
    longTitle: '2BFS2 - Physik',
    shortTitle: '2BFS2 - Physik',
    topics: [
      {
        title: 'Mechanik',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Gleichförmige Bewegung',
            skillExercises: [{ id: 7000 }],
          },
          {
            name: 'Beschleunigte Bewegung',
            skillExercises: [{ id: 7001 }],
          },
          {
            name: 'Freier Fall',
            skillExercises: [{ id: 7002 }],
          },
          {
            name: 'Gewichtskraft F=mg',
            skillExercises: [{ id: 7003 }],
          },
          {
            name: 'Bewegungsgesetz F=ma',
            skillExercises: [{ id: 7004 }],
          },
          {
            name: 'Federkraft F=Ds',
            skillExercises: [{ id: 7005 }],
          },
        ],
      },
      {
        title: 'E-Lehre',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
      {
        title: 'Optik',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
      {
        title: 'Astrophysik',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
      {
        title: 'Wärmelehre',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  6: {
    longTitle: 'AV - Mathe',
    shortTitle: 'AV - Mathe',
    topics: [
      {
        title: 'Dreisatz',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
      {
        title: 'Prozentrechnen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
      {
        title: 'Dreiecke',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
      {
        title: 'Terme',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
      {
        title: 'Gleichungen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
}
