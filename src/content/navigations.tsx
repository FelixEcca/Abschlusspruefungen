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
            name: 'Dreisatz gemischt',
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
            name: 'Steigungswerte umrechnen',
            skillExercises: [{ id: 5117 }],
          },
          {
            name: 'Durchschnittliche Änderungsrate',
            skillExercises: [{ id: 5116 }],
          },
          {
            name: 'Steigungswert annähern',
            skillExercises: [{ id: 5118 }],
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
      {
        title: 'Exponentialfunktion',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Welcher Vorgang liegt vor?',
            skillExercises: [{ id: 5119 }],
          },
          {
            name: 'Asymptote bestimmen',
            skillExercises: [{ id: 5120 }],
          },
          {
            name: 'Parameter a, d und q bestimmen',
            skillExercises: [{ id: 5121 }],
          },
          {
            name: 'Logarithmieren',
            skillExercises: [{ id: 5122 }],
          },
          {
            name: 'Gleichungen mit e^x',
            skillExercises: [{ id: 5123 }],
          },
          {
            name: 'Als e-Funktion schreiben',
            skillExercises: [{ id: 5124 }],
          },
          {
            name: 'Gleichungen mit Substitution',
            skillExercises: [{ id: 5125 }],
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
                id: 6020,
              },
            ],
          },
          {
            name: 'Gleichmäßig beschleunigte Bewegung 1',
            skillExercises: [
              {
                id: 6022,
              },
            ],
          },
          {
            name: 'Gleichmäßig beschleunigte Bewegung 2',
            skillExercises: [
              {
                id: 6025,
              },
            ],
          },
          {
            name: 'Gleichmäßig beschleunigte Bewegung 3',
            skillExercises: [
              {
                id: 6026,
              },
            ],
          },
          {
            name: 'Geschwindigkeitseinheiten',
            skillExercises: [
              {
                id: 6024,
              },
            ],
          },
          {
            name: 'Bewegungsdiagramme 1',
            skillExercises: [
              {
                id: 6007,
              },
            ],
          },
          {
            name: 'Bewegungsdiagramme 2',
            skillExercises: [
              {
                id: 6021,
              },
            ],
          },
          {
            name: 'Bewegungsdiagramme 3',
            skillExercises: [
              {
                id: 6029,
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
            name: 'Reaktionsweg und Bremsweg',
            skillExercises: [
              {
                id: 6023,
              },
            ],
          },
          {
            name: 'Freier Fall 1',
            skillExercises: [
              {
                id: 7002,
              },
            ],
          },
          {
            name: 'Freier Fall 2',
            skillExercises: [
              {
                id: 6027,
              },
            ],
          },
          {
            name: 'Freier Fall 3',
            skillExercises: [
              {
                id: 6028,
              },
            ],
          },
          {
            name: 'Geschwindigkeit in mehreren Dimensionen 1',
            skillExercises: [
              {
                id: 6000,
              },
            ],
          },
          {
            name: 'Geschwindigkeit in mehreren Dimensionen 2',
            skillExercises: [
              {
                id: 6030,
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
            name: 'Kraftstoß 1',
            skillExercises: [
              {
                id: 6034,
              },
            ],
          },
          {
            name: 'Kraftstoß 2',
            skillExercises: [
              {
                id: 6035,
              },
            ],
          },
          {
            name: 'Kraftstoß 3',
            skillExercises: [
              {
                id: 6036,
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
            name: 'Bewegungsgesetz F=ma 1',
            skillExercises: [
              {
                id: 6013,
              },
            ],
          },
          {
            name: 'Bewegungsgesetz F=ma 2',
            skillExercises: [
              {
                id: 6031,
              },
            ],
          },
          {
            name: 'Schiefe Ebene und Bewegungsgesetz',
            skillExercises: [
              {
                id: 6014,
              },
            ],
          },
          {
            name: "Newton'sche Mechanik",
            skillExercises: [
              {
                id: 6015,
              },
            ],
          },
          {
            name: "Newton'sche Mechanik 2",
            skillExercises: [
              {
                id: 6056,
              },
            ],
          },
          {
            name: "Newton'sche Mechanik 3",
            skillExercises: [
              {
                id: 6057,
              },
            ],
          },
          {
            name: 'Fallschirmspringer mit Kräften',
            skillExercises: [
              {
                id: 6058,
              },
            ],
          },
          {
            name: 'Raketenphysik (Kraftstoß)',
            skillExercises: [
              {
                id: 6016,
              },
            ],
          },

          {
            name: 'Federkraft 1',
            skillExercises: [
              {
                id: 6019,
              },
            ],
          },
          {
            name: 'Federkraft 2',
            skillExercises: [
              {
                id: 6042,
              },
            ],
          },
          {
            name: 'Federkraft 3',
            skillExercises: [
              {
                id: 6053,
              },
            ],
          },
          {
            name: 'Federkraft 4',
            skillExercises: [
              {
                id: 6054,
              },
            ],
          },
          {
            name: 'Federkraft 5',
            skillExercises: [
              {
                id: 6055,
              },
            ],
          },
          {
            name: 'Reibung 1',
            skillExercises: [
              {
                id: 6032,
              },
            ],
          },
          {
            name: 'Reibung 2',
            skillExercises: [
              {
                id: 6049,
              },
            ],
          },
          {
            name: 'Reibung 3',
            skillExercises: [
              {
                id: 6050,
              },
            ],
          },
          {
            name: 'Reibung 4',
            skillExercises: [
              {
                id: 6051,
              },
            ],
          },
          {
            name: 'Reibung 5',
            skillExercises: [
              {
                id: 6052,
              },
            ],
          },
          {
            name: 'Kräfte auf Rampen',
            skillExercises: [
              {
                id: 6033,
              },
            ],
          },
          {
            name: 'Newtonsche Ideen',
            skillExercises: [
              {
                id: 6043,
              },
            ],
          },
        ],
      },
      {
        title: 'Energie',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Energiemengen berechnen 1',
            skillExercises: [
              {
                id: 6017,
              },
            ],
          },
          {
            name: 'Energiemengen berechnen 2',
            skillExercises: [
              {
                id: 6037,
              },
            ],
          },

          {
            name: 'Energiemengen berechnen 3',
            skillExercises: [
              {
                id: 6040,
              },
            ],
          },
          {
            name: 'Energiemengen berechnen 4',
            skillExercises: [
              {
                id: 6041,
              },
            ],
          },
          {
            name: 'Energiemengen berechnen 5',
            skillExercises: [
              {
                id: 6060,
              },
            ],
          },

          {
            name: 'Energieerhaltung 1',
            skillExercises: [
              {
                id: 6018,
              },
            ],
          },
          {
            name: 'Energieerhaltung 2',
            skillExercises: [
              {
                id: 6045,
              },
            ],
          },
          {
            name: 'Energieerhaltung 3',
            skillExercises: [
              {
                id: 6061,
              },
            ],
          },
          {
            name: 'Energieerhaltung 4',
            skillExercises: [
              {
                id: 6062,
              },
            ],
          },

          {
            name: 'Leistung 1',
            skillExercises: [
              {
                id: 6038,
              },
            ],
          },
          {
            name: 'Leistung 2',
            skillExercises: [
              {
                id: 6063,
              },
            ],
          },
          {
            name: 'Elektrische Leistung',
            skillExercises: [
              {
                id: 6064,
              },
            ],
          },
          {
            name: 'Wirkungsgrad 1',
            skillExercises: [
              {
                id: 6039,
              },
            ],
          },
          {
            name: 'Wirkungsgrad 2',
            skillExercises: [
              {
                id: 6065,
              },
            ],
          },
          {
            name: 'Systemleistung bewerten',
            skillExercises: [
              {
                id: 6066,
              },
            ],
          },
        ],
      },
      {
        title: 'Vernetzung',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Mechanikformeln auswählen',
            skillExercises: [
              {
                id: 6044,
              },
            ],
          },
          {
            name: 'Impuls, Kraft und Newton verknüpfen',
            skillExercises: [
              {
                id: 6067,
              },
            ],
          },
          {
            name: 'Kraftzerlegung, Reibung und Energie verknüpfen',
            skillExercises: [
              {
                id: 6068,
              },
            ],
          },
          {
            name: 'Fehlerhafte Schülerlösung bewerten',
            skillExercises: [
              {
                id: 6069,
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
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Zahlenstrahl ablesen',
            skillExercises: [{ id: 9545 }],
          },
          {
            name: 'Runden 1',
            skillExercises: [{ id: 9608 }],
          },
          {
            name: 'Runden 2',
            skillExercises: [{ id: 9514 }],
          },
          {
            name: 'Schriftliches Addieren',
            skillExercises: [{ id: 9546 }],
          },
          {
            name: 'Schriftliches Subtrahieren',
            skillExercises: [{ id: 9547 }],
          },
          {
            name: 'Mehrere Zahlen addieren',
            skillExercises: [{ id: 9548 }],
          },
          {
            name: 'Punkt vor Strich',
            skillExercises: [{ id: 9503 }],
          },

          {
            name: 'Rechnen mit Klammern',
            skillExercises: [{ id: 9504 }],
          },
          {
            name: 'Rechnen im Sachkontext',
            skillExercises: [{ id: 9638 }],
          },
          {
            name: 'Schriftlich Multiplizieren',
            skillExercises: [{ id: 9549 }],
          },
          {
            name: 'Schriftlich Dividieren',
            skillExercises: [{ id: 9553 }],
          },
          {
            name: 'Addieren/Subtrahieren mit ganzen Zahlen',
            skillExercises: [{ id: 9550 }],
          },
          {
            name: 'Multiplizieren/Dividieren mit ganzen Zahlen',
            skillExercises: [{ id: 9551 }],
          },
          {
            name: 'Rechnen mit Kommazahlen',
            skillExercises: [{ id: 9552 }],
          },
          {
            name: 'Kommazahlen mit Längen',
            skillExercises: [{ id: 9639 }],
          },
          {
            name: 'Preis mit Kommazahlen',
            skillExercises: [{ id: 9640 }],
          },
          {
            name: 'Dividieren in Textaufgaben',
            skillExercises: [{ id: 9502 }],
          },
          {
            name: 'Gerecht verteilen',
            skillExercises: [{ id: 9636 }],
          },
          {
            name: 'Rechnen mit Geld 1',
            skillExercises: [{ id: 9500 }],
          },
          {
            name: 'Rechnen mit Geld 2',
            skillExercises: [{ id: 9510 }],
          },
          {
            name: 'Rechnen mit Geld 3',
            skillExercises: [{ id: 9511 }],
          },
          {
            name: 'Rechnen mit Geld 4',
            skillExercises: [{ id: 9501 }],
          },

          {
            name: 'Rechnen mit Geld 5',
            skillExercises: [{ id: 9512 }],
          },
          {
            name: 'Rückgeld berechnen',
            skillExercises: [{ id: 9609 }],
          },
        ],
      },

      {
        title: 'Einheiten',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Längen umrechnen',
            skillExercises: [{ id: 9524 }],
          },
          {
            name: 'Maßstab im Plan',
            skillExercises: [{ id: 9631 }],
          },
          {
            name: 'Flächen umrechnen',
            skillExercises: [{ id: 9525 }],
          },
          {
            name: 'Quadratzentimeter in Quadratmeter',
            skillExercises: [{ id: 9643 }],
          },
          {
            name: 'Volumen umrechnen',
            skillExercises: [{ id: 9526 }],
          },
          {
            name: 'Gewicht umrechnen',
            skillExercises: [{ id: 9527 }],
          },
          {
            name: 'Liter und Milliliter umrechnen',
            skillExercises: [{ id: 9528 }],
          },
          {
            name: 'Liter in Milliliter',
            skillExercises: [{ id: 9632 }],
          },
          {
            name: 'Cent und € umrechnen',
            skillExercises: [{ id: 9529 }],
          },

          {
            name: 'Stunden in Minuten',
            skillExercises: [{ id: 9540 }],
          },
          {
            name: 'Stundenzahl umwandeln',
            skillExercises: [{ id: 9543 }],
          },
          {
            name: 'Zeit addieren',
            skillExercises: [{ id: 9541 }],
          },

          {
            name: 'Zeitplan Schritt für Schritt',
            skillExercises: [{ id: 9544 }],
          },
          {
            name: 'Endzeiten berechnen',
            skillExercises: [{ id: 9610 }],
          },

          {
            name: 'Zeit über Mitternacht',
            skillExercises: [{ id: 9641 }],
          },
        ],
      },
      {
        title: 'Figuren und Flächen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Figuren erkennen',
            skillExercises: [{ id: 9556 }],
          },
          {
            name: 'Eigenschaften von Figuren',
            skillExercises: [{ id: 9557 }],
          },
          {
            name: 'Gemischte Aufgaben zum Umfang',
            skillExercises: [{ id: 9558 }],
          },
          {
            name: 'Kreisumfang',
            skillExercises: [{ id: 9559 }],
          },
          {
            name: 'Radius und Durchmesser',
            skillExercises: [{ id: 9560 }],
          },
          {
            name: 'Fläche eines Quadrats',
            skillExercises: [{ id: 9565 }],
          },

          {
            name: 'Fläche eines Rechtecks',
            skillExercises: [{ id: 9531 }],
          },
          {
            name: 'Fläche eines Parallelogramms',
            skillExercises: [{ id: 9564 }],
          },
          {
            name: 'Fläche eines Trapezes',
            skillExercises: [{ id: 9567 }],
          },
          {
            name: 'Fläche von rechtwinkligen Dreiecken',
            skillExercises: [{ id: 9568 }],
          },
          {
            name: 'Fläche eines Dreiecks',
            skillExercises: [{ id: 9569 }],
          },
          {
            name: 'Fläche eines Kreises',
            skillExercises: [{ id: 9570 }],
          },
          {
            name: 'Fläche von einer zusammengesetzten Figur',
            skillExercises: [{ id: 9572 }],
          },

          {
            name: 'Fläche von einem Kreisring',
            skillExercises: [{ id: 9571 }],
          },
          {
            name: 'Rechteck im Alltag',
            skillExercises: [{ id: 9611 }],
          },
          {
            name: 'Wandfläche und Kosten',
            skillExercises: [{ id: 9612 }],
          },
          {
            name: 'Fliesen für einen Boden',
            skillExercises: [{ id: 9613 }],
          },
          {
            name: 'Durchmesser, Radius und Umfang',
            skillExercises: [{ id: 9633 }],
          },
          {
            name: 'Restfläche berechnen',
            skillExercises: [{ id: 9644 }],
          },
        ],
      },
      {
        title: 'Körper und Volumen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Körper erkennen',
            skillExercises: [{ id: 9575 }],
          },
          {
            name: 'Volumen eines Würfels',
            skillExercises: [{ id: 9576 }],
          },
          {
            name: 'Volumen eines Quaders',
            skillExercises: [{ id: 9577 }],
          },

          {
            name: 'Volumen eines Zylinders',
            skillExercises: [{ id: 9533 }],
          },
          {
            name: 'Volumen einer Pyramide',
            skillExercises: [{ id: 9579 }],
          },
          {
            name: 'Volumen eines Kegels',
            skillExercises: [{ id: 9580 }],
          },

          {
            name: 'Volumen einer Kugel',
            skillExercises: [{ id: 9581 }],
          },
          {
            name: 'Oberfläche eines Würfels',
            skillExercises: [{ id: 9582 }],
          },
          {
            name: 'Oberfläche eines Quaders',
            skillExercises: [{ id: 9583 }],
          },
          {
            name: 'Oberfläche eines Zylinders',
            skillExercises: [{ id: 9584 }],
          },
          {
            name: 'Oberfläche einer Pyramide',
            skillExercises: [{ id: 9585 }],
          },
          {
            name: 'Oberfläche eines Kegels',
            skillExercises: [{ id: 9586 }],
          },
          {
            name: 'Volumen einer Kiste',
            skillExercises: [{ id: 9614 }],
          },
          {
            name: 'Oberfläche eines Pakets',
            skillExercises: [{ id: 9615 }],
          },
          {
            name: 'Volumen eines Prismas mit Grundfläche',
            skillExercises: [{ id: 9645 }],
          },
          {
            name: 'Behältervolumen in Litern',
            skillExercises: [{ id: 9646 }],
          },
        ],
      },
      {
        title: 'Bruchrechnen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Zähler und Nenner',
            skillExercises: [{ id: 9587 }],
          },
          {
            name: 'Erweitern',
            skillExercises: [{ id: 9588 }],
          },
          {
            name: 'Brüche vergleichen',
            skillExercises: [{ id: 9589 }],
          },
          {
            name: 'Kürzen',
            skillExercises: [{ id: 9590 }],
          },

          {
            name: 'Brüche addieren',
            skillExercises: [{ id: 9507 }],
          },
          {
            name: 'Brüche subtrahieren',
            skillExercises: [{ id: 9508 }],
          },
          {
            name: 'Brüche mit ganzen Zahlen multiplizieren',
            skillExercises: [{ id: 9592 }],
          },
          {
            name: 'Brüche multiplizieren',
            skillExercises: [{ id: 9509 }],
          },
          {
            name: 'Brüche dividieren',
            skillExercises: [{ id: 9505 }],
          },
          {
            name: 'Brüche auf dem Zahlenstrahl',
            skillExercises: [{ id: 9593 }],
          },
          {
            name: 'Bruch in Kommazahl umwandeln',
            skillExercises: [{ id: 9594 }],
          },
          {
            name: 'Bruchteil angeben',
            skillExercises: [{ id: 9595 }],
          },

          {
            name: 'Bruchteil berechnen',
            skillExercises: [{ id: 9506 }],
          },
          {
            name: 'Bruchteil berechnen 2',
            skillExercises: [{ id: 9005 }],
          },
          {
            name: 'Gesuchter Teil berechnen',
            skillExercises: [{ id: 9597 }],
          },
          {
            name: 'Bruchteil von einer Menge',
            skillExercises: [{ id: 9616 }],
          },
          {
            name: 'Brüche im Vergleich',
            skillExercises: [{ id: 9617 }],
          },
          {
            name: 'Gemischten Bruch aufteilen',
            skillExercises: [{ id: 9618 }],
          },
          {
            name: 'Anteil als gekürzter Bruch',
            skillExercises: [{ id: 9647 }],
          },
          {
            name: 'Brüche mit gleichem Nenner addieren',
            skillExercises: [{ id: 9648 }],
          },
          {
            name: 'Markierte Felder als Bruch',
            skillExercises: [{ id: 9649 }],
          },
        ],
      },
      {
        title: 'Dreisatz',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Dreisatz',
            skillExercises: [{ id: 9515 }],
          },
          {
            name: 'Umgekehrter Dreisatz',
            skillExercises: [{ id: 9516 }],
          },
          {
            name: 'Anteile aufteilen',
            skillExercises: [{ id: 9517 }],
          },
          {
            name: 'Rezept umrechnen',
            skillExercises: [{ id: 9619 }],
          },
          {
            name: 'Mischung im Verhältnis',
            skillExercises: [{ id: 9620 }],
          },
          {
            name: 'Material proportional berechnen',
            skillExercises: [{ id: 9621 }],
          },
          {
            name: 'Arbeitszeit umgekehrt proportional',
            skillExercises: [{ id: 9622 }],
          },
          {
            name: 'Kilopreis berechnen',
            skillExercises: [{ id: 9650 }],
          },
          {
            name: 'Maschinen und Arbeitszeit',
            skillExercises: [{ id: 9651 }],
          },
          {
            name: 'Geld im Verhältnis aufteilen',
            skillExercises: [{ id: 9652 }],
          },
        ],
      },
      {
        title: 'Prozentrechnung',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Prozent in Kommazahl umwandeln',
            skillExercises: [{ id: 9598 }],
          },
          {
            name: 'Prozent in Bruch umwandeln',
            skillExercises: [{ id: 9599 }],
          },
          {
            name: 'Prozentwert berechnen',
            skillExercises: [{ id: 9600 }],
          },
          {
            name: 'Prozensatz berechnen',
            skillExercises: [{ id: 9601 }],
          },
          {
            name: 'Grundwert berechnen',
            skillExercises: [{ id: 9602 }],
          },
          {
            name: 'Zinsen berechnen',
            skillExercises: [{ id: 9603 }],
          },
          {
            name: 'Rabatt berechnen',
            skillExercises: [{ id: 9623 }],
          },
          {
            name: 'Preissteigerung berechnen',
            skillExercises: [{ id: 9624 }],
          },
          {
            name: 'Prozentsatz aus Anteil',
            skillExercises: [{ id: 9625 }],
          },
          {
            name: 'Ursprünglichen Preis berechnen',
            skillExercises: [{ id: 9626 }],
          },
          {
            name: 'Zinsen für einige Monate',
            skillExercises: [{ id: 9627 }],
          },
          {
            name: 'Beschädigte Teile berechnen',
            skillExercises: [{ id: 9653 }],
          },
          {
            name: 'Zwei Angebote vergleichen',
            skillExercises: [{ id: 9654 }],
          },
          {
            name: 'Prozent, Dezimalzahl und Bruch',
            skillExercises: [{ id: 9655 }],
          },
        ],
      },
      {
        title: 'Diagramme und Daten',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Säulendiagramm zeichnen',
            skillExercises: [{ id: 9535 }],
          },
          {
            name: 'Kreisdiagramm ablesen',
            skillExercises: [{ id: 9536 }],
          },

          {
            name: 'Mittelwert berechnen',
            skillExercises: [{ id: 9605 }],
          },
          {
            name: 'Daten vergleichen',
            skillExercises: [{ id: 9606 }],
          },
          {
            name: 'Häufigkeiten',
            skillExercises: [{ id: 9607 }],
          },
          {
            name: 'Mittelwert aus vier Werten',
            skillExercises: [{ id: 9628 }],
          },
          {
            name: 'Spannweite bestimmen',
            skillExercises: [{ id: 9629 }],
          },
          {
            name: 'Tabelle auswerten',
            skillExercises: [{ id: 9630 }],
          },
          {
            name: 'Winkel im Kreisdiagramm',
            skillExercises: [{ id: 9656 }],
          },
          {
            name: 'Säulenwerte vergleichen',
            skillExercises: [{ id: 9657 }],
          },
          {
            name: 'Daten aus Text ordnen',
            skillExercises: [{ id: 9658 }],
          },
        ],
      },
      {
        title: 'Prüfungsvorbereitung',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Prozent und Aufteilen verknüpfen',
            skillExercises: [{ id: 9635 }],
          },
          {
            name: 'Fläche mit Prozentanteil',
            skillExercises: [{ id: 9659 }],
          },
          {
            name: 'Einkauf mit Rabatt und Rückgeld',
            skillExercises: [{ id: 9660 }],
          },
          {
            name: 'Rezept und Portionen',
            skillExercises: [{ id: 9661 }],
          },
          {
            name: 'Mehrere Pakete und Volumen',
            skillExercises: [{ id: 9662 }],
          },
          {
            name: 'Zeitplan in Schritten',
            skillExercises: [{ id: 9663 }],
          },
          {
            name: 'Daten mit Prozentanteil',
            skillExercises: [{ id: 9664 }],
          },
          {
            name: 'Rechenmix in zwei Schritten',
            skillExercises: [{ id: 9665 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  7: {
    longTitle: 'AV - BFK - Metall',
    shortTitle: 'AV - BFK - Metall',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  8: {
    longTitle: 'AV - BFK - Elektrotechnik',
    shortTitle: 'AV - BFK - Elektro',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  9: {
    longTitle: 'AV - BFK - Elektrotechnik',
    shortTitle: 'AV - BFK - Elektro',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  10: {
    longTitle: '1BK1T - Mathematik',
    shortTitle: '1BK1T - Mathe',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  11: {
    longTitle: '1BK1T - Grundlagen der Technik',
    shortTitle: '1BK1T - GT',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  12: {
    longTitle: '1BK2T - Mathematik',
    shortTitle: '1BK2T - Mathe',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  13: {
    longTitle: 'TG12 - Mathematik gAN',
    shortTitle: 'TG12 - Mathe gAN',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  14: {
    longTitle: 'TG12 - Mathematik eAN',
    shortTitle: 'TG12 - Mathe eAN',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  15: {
    longTitle: 'TG13 - Mathematik gAN',
    shortTitle: 'TG13 - Mathe gAN',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  16: {
    longTitle: 'TG13 - Mathematik eAN',
    shortTitle: 'TG13 - Mathe eAN',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  17: {
    longTitle: 'FTM - Technische Mathematik',
    shortTitle: 'FTM - TM',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  18: {
    longTitle: '3BKGD1 - Mathematik',
    shortTitle: '3BKGD1 - Mathe',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  19: {
    longTitle: '3BKGD2 - Mathematik',
    shortTitle: '3BKGD2 - Mathe',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  20: {
    longTitle: '3BKGD3 - Mathematik',
    shortTitle: '3BKGD3 - Mathe',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Break-Even-Point',
            skillExercises: [{ id: 10000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  21: {
    longTitle: '3BKM/R1 - Mathematik',
    shortTitle: '3BKM/R1 - Mathe',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  22: {
    longTitle: '3BKM/R2 - Mathematik',
    shortTitle: '3BKM/R2 - Mathe',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  23: {
    longTitle: '3BKM/R3 - Mathematik',
    shortTitle: '3BKM/R3 - Mathe',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Testaufgabe',
            skillExercises: [{ id: 1000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
}
