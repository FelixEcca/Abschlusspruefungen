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
            name: 'Fehlende Koordinate eines Punktes berechnen',
            skillExercises: [{ id: 4301 }],
          },

          {
            name: 'Schnittpunkte mit Koordinatenachsen ablesen',
            skillExercises: [{ id: 4005 }],
          },
           {
            name: 'Scheitel mit Formel berechnen',
            skillExercises: [{ id: 4921 }],
          },
          {
            name: 'Schnittpunkt mit der y-Achse berechnen',
            skillExercises: [{ id: 4922 }],
          },
          {
            name: 'Nullstellen berechnen',
            skillExercises: [{ id: 4923 }],
          },
          {
            name: 'Schnittpunkte Gerade-Parabel',
            skillExercises: [{ id: 4924 }],
          },
          {
            name: 'Schnittpunkte Parabel-Parabel',
            skillExercises: [{ id: 4925 }],
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
            name: 'Einfache Gleichungen lösen',
            skillExercises: [{ id: 4907 }],
          },
          {
            name: 'Gleichungen lösen',
            skillExercises: [{ id: 4200 }],
          },
          {
            name: 'Klammern & Ausmultiplizieren',
            skillExercises: [{ id: 4201 }],
          },
          {
            name: 'Definitionsmenge',
            skillExercises: [{ id: 4911 }],
          },
          {
            name: 'Einfache Bruchgleichungen',
            skillExercises: [{ id: 4912 }],
          },
          {
            name: 'Mittlere Bruchgleichungen',
            skillExercises: [{ id: 4913 }],
          },
          {
            name: 'Bruchgleichungen',
            skillExercises: [{ id: 4202 }],
          },
          {
            name: 'abc-Formel',
            skillExercises: [{ id: 4300 }],
          },
        ],
      },

    

      {
        title: 'Terme',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Termwerte berechnen',
            skillExercises: [{ id: 4906 }],
          },
          {
            name: 'Terme vereinfachen',
            skillExercises: [{ id: 4400 }],
          },
          {
            name: 'Binomische Formeln',
            skillExercises: [{ id: 4401 }],
          },
          {
            name: 'Ausmultiplizieren',
            skillExercises: [{ id: 4910 }],
          },
          {
            name: 'Wertetabelle anlegen',
            skillExercises: [{ id: 4908 }],
          },
          {
            name: 'Minusklammern',
            skillExercises: [{ id: 4909 }],
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
            name: 'Strahlensatz ',
            skillExercises: [{ id: 4914 }],
          },
          {
            name: 'Winkel im Thaleskreis ',
            skillExercises: [{ id: 4915 }],
          },
          {
            name: 'Rechtwinklige Dreiecke: Seiten benennen',
            skillExercises: [{ id: 4917 }],
          },
          {
            name: 'Sin, Cos oder Tan?',
            skillExercises: [{ id: 4918 }],
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
      {
        title: 'Potenzfunktionen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Parabeln n-ter Ordnung: Globalverhalten',
            skillExercises: [{ id: 5100 }],
          },
          {
            name: 'Parabeln n-ter Ordnung: Symmetrie',
            skillExercises: [{ id: 5101 }],
          },
          {
            name: 'Parabeln n-ter Ordnung: Definitions- und Wertebereich',
            skillExercises: [{ id: 5102 }],
          },
          {
            name: 'Hyperbeln n-ter Ordnung: Globalverhalten',
            skillExercises: [{ id: 5103 }],
          },
          {
            name: 'Hyperbeln n-ter Ordnung: Symmetrie',
            skillExercises: [{ id: 5104 }],
          },
          {
            name: 'Hyperbeln n-ter Ordnung: Definitions- und Wertebereich',
            skillExercises: [{ id: 5105 }],
          },
          {
            name: 'Transformationen: Verschiebung',
            skillExercises: [{ id: 5106 }],
          },
          {
            name: 'Transformationen: Streckung',
            skillExercises: [{ id: 5107 }],
          },
        ],
      },
      {
        title: 'Polynomfunktionen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Grad der Polynomfunktion',
            skillExercises: [{ id: 5108 }],
          },
          {
            name: 'Globalverhalten',
            skillExercises: [{ id: 5109 }],
          },
          {
            name: 'Symmetrie',
            skillExercises: [{ id: 5110 }],
          },

          {
            name: 'Gleichung lösen mit Substitution',
            skillExercises: [{ id: 5112 }],
          },
          {
            name: 'Satz vom Nullprodukt',
            skillExercises: [{ id: 5113 }],
          },
          {
            name: 'Gleichung lösen mit Wurzel ziehen',
            skillExercises: [{ id: 5114 }],
          },
          {
            name: 'Linearfaktordarstellung von Polynomfunktionen',
            skillExercises: [{ id: 5115 }],
          },
        ],
      },
      {
        title: 'Steigung und Änderung',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Durchschnittliche Änderungsrate',
            skillExercises: [{ id: 5116 }],
          },
          {
            name: 'Steigungsfunktion berechnen',
            skillExercises: [{ id: 4926 }],
          },
          {
            name: 'Steigung berechnen',
            skillExercises: [{ id: 4927 }],
          },
          {
            name: 'Steigungsfunktion zuordnen',
            skillExercises: [{ id: 4928 }],
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
      {
        title: 'Kraft',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Gewichtskraft',
            skillExercises: [
              {
                id: 6008,
              },
            ],
          },
          {
            name: 'Rechnen im rechtwinkligen Dreieck',
            skillExercises: [
              {
                id: 6009,
              },
            ],
          },
          {
            name: 'Kräfteaddition rechnerisch',
            skillExercises: [
              {
                id: 6010,
              },
            ],
          },
          {
            name: 'Kräftezerlegung rechnerisch',
            skillExercises: [
              {
                id: 6011,
              },
            ],
          },
          {
            name: 'Kräfte an der schiefen Ebene',
            skillExercises: [
              {
                id: 6012,
              },
            ],
          },
          {
            name: 'Bewegungsgesetz F=ma',
            skillExercises: [
              {
                id: 6013,
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
