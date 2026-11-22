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
        title: '1 Längen und Umfang',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Zahlen vergleichen',
            skillExercises: [{ id: 9657 }],
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
            name: 'Rechnen mit 10er-Zahlen',
            skillExercises: [{ id: 9658 }],
          },
          {
            name: 'Längen umrechnen',
            skillExercises: [{ id: 9524 }],
          },
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
            name: 'Umfang zusammengesetzter Figuren',
            skillExercises: [{ id: 9659 }],
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
            name: 'Durchmesser, Radius und Umfang',
            skillExercises: [{ id: 9633 }],
          },
        ],
      },
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
            name: 'Brüche im Vergleich',
            skillExercises: [{ id: 9617 }],
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
            name: 'Brüche mit gleichem Nenner addieren',
            skillExercises: [{ id: 9648 }],
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
            name: 'Markierte Felder als Bruch',
            skillExercises: [{ id: 9649 }],
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
            name: 'Gemischten Bruch aufteilen',
            skillExercises: [{ id: 9618 }],
          },
          {
            name: 'Anteil als gekürzter Bruch',
            skillExercises: [{ id: 9647 }],
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
            name: 'Maschinen und Arbeitszeit',
            skillExercises: [{ id: 9651 }],
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
            name: 'Winkel im Kreisdiagramm',
            skillExercises: [{ id: 9656 }],
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
        skillGroups: [],
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
            name: 'Stromstärke berechnen',
            skillExercises: [{ id: 14002 }],
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
            name: 'Elektrischen Widerstand berechnen',
            skillExercises: [{ id: 14002 }],
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
        title: 'Kinematik',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Gleichförmige Bewegung: Geschwindigkeit bestimmen',
            skillExercises: [{ id: 8000 }],
          },
          {
            name: 'Gleichförmige Bewegung: Bewegungsgleichung',
            skillExercises: [{ id: 8002 }],
          },
          {
            name: 'Gleichförmige Bewegung: Treffpunkt zweier Fahrer',
            skillExercises: [{ id: 8003 }],
          },
          {
            name: 'Geschwindigkeitseinheiten umrechnen',
            skillExercises: [{ id: 8004 }],
          },
          {
            name: 'Längeneinheiten umrechnen',
            skillExercises: [{ id: 8005 }],
          },
          {
            name: 'Beschleunigung aus Tabelle und v-t-Diagramm bestimmen',
            skillExercises: [{ id: 8006 }],
          },
          {
            name: 'Beschleunigte Bewegung: Geschwindigkeits-Zeit-Gleichung',
            skillExercises: [{ id: 8008 }],
          },
          {
            name: 'Beschleunigte Bewegung: Gefahrene Strecke berechnen',
            skillExercises: [{ id: 8009 }],
          },
          {
            name: 'Strecke als Fläche im v-t-Diagramm',
            skillExercises: [{ id: 8010 }],
          },
          {
            name: 'Verständnisfragen',
            skillExercises: [{ id: 8011 }],
          },
          {
            name: 'Bremsen bis zum Stillstand',
            skillExercises: [{ id: 8012 }],
          },
          {
            name: 'Bremsvorgänge im v-t-Diagramm',
            skillExercises: [{ id: 8013 }],
          },
          {
            name: 'Bremsvorgänge verstehen',
            skillExercises: [{ id: 8014 }],
          },
          {
            name: 'Freien Fall berechnen',
            skillExercises: [{ id: 8015 }],
          },
          {
            name: 'Freien Fall verstehen',
            skillExercises: [{ id: 8017 }],
          },
          {
            name: 'Geschwindigkeitspfeile und Maßstab',
            skillExercises: [{ id: 8018 }],
          },
          {
            name: 'Geschwindigkeiten grafisch überlagern',
            skillExercises: [{ id: 8019 }],
          },

          {
            name: 'Horizontalen Wurf am Stroboskopbild deuten',
            skillExercises: [{ id: 8021 }],
          },
          {
            name: 'Horizontalen Wurf berechnen',
            skillExercises: [{ id: 8022 }],
          },
          {
            name: 'Horizontalen Wurf rückwärts berechnen',
            skillExercises: [{ id: 8023 }],
          },
          {
            name: 'Schiefen Wurf bis zum höchsten Punkt berechnen',
            skillExercises: [{ id: 8024 }],
          },
          {
            name: 'Schiefen Wurf vollständig berechnen',
            skillExercises: [{ id: 8025 }],
          },
          {
            name: 'Schwer: Einen schiefen Wurf rekonstruieren',
            skillExercises: [{ id: 8026 }],
          },
          {
            name: 'Flugbahnen vergleichen und begründen',
            skillExercises: [{ id: 8027 }],
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
        title: 'Periodische Vorgänge',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Oszillogramm einer Tonveränderung deuten',
            skillExercises: [{ id: 20000 }],
          },
          {
            name: 'Periodenlänge, Mittellinie und Amplitude ablesen',
            skillExercises: [{ id: 20001 }],
          },

          {
            name: 'Gleiche Sinuswerte im Intervall finden',
            skillExercises: [{ id: 20002 }],
          },
          {
            name: 'Sinuswerte ohne Taschenrechner ordnen',
            skillExercises: [{ id: 20003 }],
          },
          {
            name: 'Gradmaß und Bogenmaß umwandeln',
            skillExercises: [{ id: 20004 }],
          },
          {
            name: 'Periodenlänge im Bogenmaß ablesen',
            skillExercises: [{ id: 20005 }],
          },

          {
            name: 'Sinuskurven transformieren und Funktionsterm bestimmen',
            skillExercises: [{ id: 20006 }],
          },
          {
            name: 'Sin, -Sin, Cos, -Cos?',
            skillExercises: [{ id: 20007 }],
          },
          {
            name: 'Trigonometrische Gleichungen lösen',
            skillExercises: [{ id: 20008 }],
          },
        ],
      },
      {
        title: 'Funktionen und Transformationen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Grundfunktionen und Eigenschaften',
            skillExercises: [{ id: 20009 }],
          },
          {
            name: 'Funktionen transformieren',
            skillExercises: [{ id: 20010 }],
          },
          {
            name: 'Funktionen verknüpfen',
            skillExercises: [{ id: 20011 }],
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
        skillGroups: [],
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
        title: 'Pflichtteiltrainer · 1. Rechnen auffrischen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: '01 · Basis: Brüche mit einer Rechenart verrechnen',
            skillExercises: [{ id: 22001 }],
          },
          {
            name: '02 · Basis: Potenzen, Wurzeln und Vorzeichen unterscheiden',
            skillExercises: [{ id: 22002 }],
          },
          {
            name: '03 · Basis: Terme vereinfachen und typische Fehler korrigieren',
            skillExercises: [{ id: 22003 }],
          },
          {
            name: '04 · Basis: Lineare Gleichungen in kleinen Schritten lösen',
            skillExercises: [{ id: 22004 }],
          },
          {
            name: '05 · Basis: Den Satz vom Nullprodukt verstehen',
            skillExercises: [{ id: 22005 }],
          },
          {
            name: '06 · Aufbau: Das passende Verfahren für eine quadratische Gleichung wählen',
            skillExercises: [{ id: 22006 }],
          },
          {
            name: '07 · Basis: Einfache Gleichungen mit e lösen',
            skillExercises: [{ id: 22007 }],
          },
          {
            name: '08 · Basis: Lineare Gleichungssysteme auffrischen',
            skillExercises: [{ id: 4800 }],
          },
        ],
      },
      {
        title: 'Pflichtteiltrainer · 2. Funktionen wiedererkennen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: '09 · Basis: Funktionswerte mit Vorzeichen berechnen',
            skillExercises: [{ id: 22009 }],
          },
          {
            name: '10 · Basis: Funktionswert, Steigung und Stammfunktion unterscheiden',
            skillExercises: [{ id: 22010 }],
          },
          {
            name: '11 · Basis: Grad und Globalverhalten von Polynomen',
            skillExercises: [{ id: 5108 }, { id: 5109 }],
          },
          {
            name: '12 · Basis: Symmetrie erkennen und mit f(−x) prüfen',
            skillExercises: [{ id: 5110 }, { id: 5111 }],
          },
          {
            name: '13 · Basis: Markante Stellen in einem Graphen ablesen',
            skillExercises: [{ id: 22013 }],
          },
          {
            name: '14 · Basis: Einfache Potenzfunktionen ableiten',
            skillExercises: [{ id: 4926, pages: [{ index: 'a' }] }],
          },
          {
            name: '15 · Basis: Die Steigung an einer Stelle berechnen',
            skillExercises: [{ id: 4927 }],
          },
        ],
      },
      {
        title: 'Pflichtteiltrainer · 3. Analysis aufbauen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: '16 · Basis: Exponentialfunktionen mit einfacher Kettenregel ableiten',
            skillExercises: [{ id: 22016 }],
          },
          {
            name: '17 · Basis: Sinus und Cosinus mit Vorzeichen ableiten',
            skillExercises: [{ id: 22017 }],
          },
          {
            name: '18 · Aufbau: Die Produktregel an übersichtlichen Produkten anwenden',
            skillExercises: [{ id: 22018 }],
          },
          {
            name: '19 · Aufbau: Typische Ableitungsfehler erkennen und korrigieren',
            skillExercises: [{ id: 22019 }],
          },
          {
            name: '20 · Basis: Stationäre Stellen durch Ausklammern bestimmen',
            skillExercises: [{ id: 22020 }],
          },
          {
            name: '21 · Aufbau: Hochpunkt, Tiefpunkt oder waagerechte Wendestelle?',
            skillExercises: [{ id: 22021 }],
          },
          {
            name: '22 · Aufbau: Wendestelle und Wendepunktsteigung schrittweise berechnen',
            skillExercises: [{ id: 22022 }],
          },
          {
            name: '23 · Aufbau: Aus dem Ableitungsgraphen auf f schließen',
            skillExercises: [{ id: 22023 }],
          },
          {
            name: '24 · Basis: Einfache Stammfunktionen finden',
            skillExercises: [{ id: 22024 }],
          },
          {
            name: '25 · Aufbau: Eine Stammfunktion durch einen Punkt bestimmen',
            skillExercises: [{ id: 22025 }],
          },
          {
            name: '26 · Aufbau: Eine vorgegebene Stammfunktion überprüfen',
            skillExercises: [{ id: 22026 }],
          },
          {
            name: '27 · Basis: Bestimmte Integrale mit einfachen Grenzen berechnen',
            skillExercises: [{ id: 22027 }],
          },
          {
            name: '28 · Aufbau: Flächeninhalt und Integralwert unterscheiden',
            skillExercises: [{ id: 22028 }],
          },
          {
            name: '29 · Transfer: Ein Integral mit einem Rechteck abschätzen',
            skillExercises: [{ id: 22029 }],
          },
          {
            name: '30 · Transfer: Funktionswert, Ableitung und Integral exakt vergleichen',
            skillExercises: [{ id: 22030 }],
          },
          {
            name: '31 · Transfer: Eine Parabel aus Punkt und Tangentenbedingungen rekonstruieren',
            skillExercises: [{ id: 22031 }],
          },
        ],
      },
      {
        title: 'Pflichtteiltrainer · 4. Trigonometrie reaktivieren',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: '32 · Basis: Sin, −Sin, Cos oder −Cos?',
            skillExercises: [{ id: 20007 }],
          },
          {
            name: '33 · Basis: Amplitude, Mittellinie und Periode ablesen',
            skillExercises: [{ id: 20001 }, { id: 20005 }],
          },
          {
            name: '34 · Basis: Bogenmaß und besondere Sinuswerte auffrischen',
            skillExercises: [{ id: 20003 }, { id: 20004 }],
          },
          {
            name: '35 · Aufbau: Trigonometrische Gleichungen im Intervall lösen',
            skillExercises: [{ id: 20008 }],
          },
          {
            name: '36 · Transfer: Sinuskurven beschreiben und Funktionsterme bestimmen',
            skillExercises: [{ id: 20006 }],
          },
          {
            name: '37 · Transfer: Schnittpunkte und Berührpunkte eines Sinusprodukts unterscheiden',
            skillExercises: [{ id: 22037 }],
          },
        ],
      },
      {
        title: 'Pflichtteiltrainer · 5. Stochastik aufbauen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: '38 · Basis: Ergebnisse, Ereignisse und Laplace-Wahrscheinlichkeiten',
            skillExercises: [{ id: 22038 }],
          },
          {
            name: '39 · Basis: Ein Baumdiagramm mit Zurücklegen ergänzen',
            skillExercises: [{ id: 22039 }],
          },
          {
            name: '40 · Basis: Ziehen ohne Zurücklegen Schritt für Schritt',
            skillExercises: [{ id: 22040 }],
          },
          {
            name: '41 · Aufbau: Eine Abbruchregel vollständig beschreiben',
            skillExercises: [{ id: 22041 }],
          },
          {
            name: '42 · Basis: Genau, mindestens und höchstens übersetzen',
            skillExercises: [{ id: 22042 }],
          },
          {
            name: '43 · Aufbau: Zu einem Wahrscheinlichkeitsterm ein Ereignis formulieren',
            skillExercises: [{ id: 22043 }],
          },
          {
            name: '44 · Aufbau: Oder-Ereignisse mit Überschneidung berechnen',
            skillExercises: [{ id: 22044 }],
          },
          {
            name: '45 · Basis: Eine Binomialverteilung erkennen und ihre Parameter benennen',
            skillExercises: [{ id: 22045 }],
          },
          {
            name: '46 · Aufbau: Genau k Treffer mit der Binomialformel berechnen',
            skillExercises: [{ id: 22046 }],
          },
          {
            name: '47 · Aufbau: Eine Binomialverteilung aus einem Säulendiagramm erschließen',
            skillExercises: [{ id: 22047 }],
          },
          {
            name: '48 · Aufbau: Höchstens, mindestens und Bereiche aus einer Tabelle berechnen',
            skillExercises: [{ id: 22048 }],
          },
          {
            name: '49 · Aufbau: Den Erwartungswert bei einer Abbruchregel berechnen',
            skillExercises: [{ id: 22049 }],
          },
          {
            name: '50 · Aufbau: Fairen Einsatz, Auszahlung und Gewinn auseinanderhalten',
            skillExercises: [{ id: 22050 }],
          },
          {
            name: '51 · Basis: Bedingte Wahrscheinlichkeiten aus Häufigkeiten verstehen',
            skillExercises: [{ id: 22051 }],
          },
          {
            name: '52 · Transfer: Die Bedingung umkehren: Wer steckt hinter den verspäteten Sendungen?',
            skillExercises: [{ id: 22052 }],
          },
          {
            name: '53 · Transfer: Eine unbekannte Kugel- oder Jokerzahl aus einer Wahrscheinlichkeit bestimmen',
            skillExercises: [{ id: 22053 }],
          },
          {
            name: '54 · Transfer: Flächenanteile und Sektorwinkel als Wahrscheinlichkeiten deuten',
            skillExercises: [{ id: 22054 }],
          },
          {
            name: '55 · Aufbau: Typische Wahrscheinlichkeitsfehler prüfen und korrigieren',
            skillExercises: [{ id: 22055 }],
          },
        ],
      },
      {
        title: 'Pflichtteiltrainer · 6. Vektoren auffrischen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: '56 · Basis: Punkte im Raum lesen und einzeichnen',
            skillExercises: [{ id: 5000 }],
          },
          {
            name: '57 · Basis: Punkte auf Achsen und Ebenen erkennen',
            skillExercises: [{ id: 5001 }],
          },
          {
            name: '58 · Basis: Projektion und Spiegelung an Koordinatenebenen unterscheiden',
            skillExercises: [{ id: 22058 }],
          },
          {
            name: '59 · Basis: Verbindungs- und Gegenvektoren bestimmen',
            skillExercises: [{ id: 5003 }],
          },
          {
            name: '60 · Basis: Mit Vektoren und Linearkombinationen rechnen',
            skillExercises: [{ id: 5004 }],
          },
          {
            name: '61 · Basis: Vektorlänge und Abstand zweier Punkte berechnen',
            skillExercises: [{ id: 22061 }],
          },
          {
            name: '62 · Basis: Mittelpunkte von Strecken bestimmen',
            skillExercises: [{ id: 5006 }],
          },
          {
            name: '63 · Basis: Vektoren auf Parallelität prüfen',
            skillExercises: [{ id: 5005 }],
          },
          {
            name: '64 · Basis: Mit dem Skalarprodukt auf Orthogonalität prüfen',
            skillExercises: [{ id: 22064 }],
          },
        ],
      },
      {
        title: 'Pflichtteiltrainer · 7. Vektorgeometrie verbinden',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: '65 · Aufbau: Eine Gerade durch zwei Punkte aufstellen und eine Punktprobe durchführen',
            skillExercises: [{ id: 22065 }],
          },
          {
            name: '66 · Aufbau: Innere und äußere Teilpunkte zu einem Streckenverhältnis finden',
            skillExercises: [{ id: 22066 }],
          },
          {
            name: '67 · Aufbau: Parallele und identische Geraden unterscheiden',
            skillExercises: [{ id: 22067 }],
          },
          {
            name: '68 · Aufbau: Eine Gerade mit einer Koordinatenebene vergleichen',
            skillExercises: [{ id: 22068 }],
          },
          {
            name: '69 · Transfer: Zwei Geraden auf einen Schnittpunkt untersuchen',
            skillExercises: [{ id: 22069 }],
          },
          {
            name: '70 · Aufbau: Einen rechten Winkel oder ein Rechteck mit Vektoren nachweisen',
            skillExercises: [{ id: 22070 }],
          },
          {
            name: '71 · Aufbau: Ein Parallelogramm ergänzen, das kein Rechteck ist',
            skillExercises: [{ id: 22071 }],
          },
          {
            name: '72 · Aufbau: Längenfaktor und Flächenfaktor unterscheiden',
            skillExercises: [{ id: 22072 }],
          },
          {
            name: '73 · Aufbau: Prismenvolumen oder Pyramidenhöhe aus einer Skizze bestimmen',
            skillExercises: [{ id: 22073 }],
          },
          {
            name: '74 · Transfer: Einen vorgegebenen Lotfußpunkt überprüfen',
            skillExercises: [{ id: 22074 }],
          },
          {
            name: '75 · Transfer: Einen Punkt mit gleichem Abstand oder ein gleichschenkliges Dreieck konstruieren',
            skillExercises: [{ id: 22075 }],
          },
          {
            name: '76 · Aufbau: Eine Ebene orthogonal zu einer Geraden angeben',
            skillExercises: [{ id: 22076 }],
          },
        ],
      },
      {
        title: 'Pflichtteiltrainer · 8. Prüfungstransfer und PLA',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: '77 · Transfer: Alle natürlichen Lösungen eines Gleichungssystems finden',
            skillExercises: [{ id: 22077 }],
          },
          {
            name: '78 · Transfer: Ein eindeutig lösbares Gleichungssystem zu einer Wunschlösung bauen',
            skillExercises: [{ id: 22078 }],
          },
          {
            name: '79 · Transfer: Funktionen konstruieren und jede Eigenschaft prüfen',
            skillExercises: [{ id: 22079 }],
          },
          {
            name: '80 · Transfer: Ein mehrstufiges Glücksspiel mit vorgegebenem Veranstaltergewinn entwerfen',
            skillExercises: [{ id: 22080 }],
          },
          {
            name: '81 · Transfer: Gemischter Pflichtteil-Check: Analysis, Stochastik und Vektoren',
            skillExercises: [{ id: 22081 }],
          },
        ],
      },
      {
        title: 'Pflichtteiltrainer · 9. Matrizen – optionales Zusatzmodul',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: '82 · Basis: Matrizenformate, Matrix-Vektor-Produkt und Linearität',
            skillExercises: [{ id: 22082 }],
          },
          {
            name: '83 · Aufbau: Eine inverse Matrix bestimmen und eine Matrixgleichung lösen',
            skillExercises: [{ id: 22083 }],
          },
          {
            name: '84 · Transfer: Mehrere LGS-Lösungen und eine nicht invertierbare Matrix erklären',
            skillExercises: [{ id: 22084 }],
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
        title: 'Fachrechnen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Zoll und Zentimeter umrechnen',
            skillExercises: [{ id: 10064 }],
          },
          {
            name: 'Point, Pica und Inch umrechnen',
            skillExercises: [{ id: 10000 }],
          },
          {
            name: 'Typografische Maße vergleichen',
            skillExercises: [{ id: 10001 }],
          },
          {
            name: 'Schriftgröße, Zeilenabstand und Layoutmaß berechnen',
            skillExercises: [{ id: 10002 }],
          },

          {
            name: 'Fehlende Seitenlänge bei Seitenverhältnis berechnen',
            skillExercises: [{ id: 10004 }],
          },

          {
            name: 'Seitenlängen aus Diagonale und Seitenverhältnis berechnen',
            skillExercises: [{ id: 10060 }],
          },

          {
            name: 'Maßstab aus Originalmaß und Abbildungsmaß berechnen',
            skillExercises: [{ id: 10006 }],
          },
          {
            name: 'Originallänge aus Maßstab und Zeichnung berechnen',
            skillExercises: [{ id: 10007 }],
          },
          {
            name: 'Zeichnungsgröße bei gegebenem Maßstab berechnen',
            skillExercises: [{ id: 10008 }],
          },
        ],
      },
      {
        title: 'Grundlagen Klassenarbeit 1',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Brüche erweitern und kürzen',
            skillExercises: [{ id: 9588 }, { id: 9590 }],
          },
          {
            name: 'Brüche vergleichen und ordnen',
            skillExercises: [{ id: 9617 }, { id: 9589 }],
          },
          {
            name: 'Bruch in Dezimalzahl umwandeln',
            skillExercises: [{ id: 9594 }],
          },
          {
            name: 'Dezimalzahl, Prozent und Bruch zuordnen',
            skillExercises: [{ id: 9655 }],
          },
          {
            name: 'Brüche addieren und subtrahieren',
            skillExercises: [{ id: 9507 }, { id: 9508 }],
          },
          {
            name: 'Brüche multiplizieren und dividieren',
            skillExercises: [{ id: 9509 }, { id: 9505 }],
          },
          {
            name: 'Gleichartige Terme zusammenfassen',
            skillExercises: [{ id: 9554 }, { id: 4400 }],
          },
          {
            name: 'Klammern auflösen',
            skillExercises: [{ id: 4201 }, { id: 4909 }],
          },
          {
            name: 'Ausmultiplizieren mit einer Klammer',
            skillExercises: [{ id: 4910 }],
          },

          {
            name: 'Fehler in einer Termumformung finden und korrigieren',
            skillExercises: [{ id: 10020 }],
          },

          {
            name: 'Lineare Gleichung lösen',
            skillExercises: [{ id: 4907 }, { id: 4200 }],
          },
          {
            name: 'Gleichung mit Klammern lösen',
            skillExercises: [{ id: 4201 }],
          },
        ],
      },
      {
        title: 'Grundlagen 2',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Gleichung mit Brüchen lösen',
            skillExercises: [{ id: 4912 }, { id: 4913 }],
          },
          {
            name: 'LGS lösen',
            skillExercises: [{ id: 4800 }],
          },
          {
            name: 'LGS zeichnerisch deuten',
            skillExercises: [{ id: 10028 }],
          },
          {
            name: 'Sachaufgabe als LGS modellieren',
            skillExercises: [{ id: 10029 }],
          },
          {
            name: 'Prozentrechenregel anwenden',
            skillExercises: [{ id: 10030 }],
          },
          {
            name: 'Prozentwert, Grundwert oder Prozentsatz',
            skillExercises: [{ id: 9600 }, { id: 9601 }, { id: 9602 }],
          },
          {
            name: 'Potenzgesetze anwenden',
            skillExercises: [{ id: 4403 }],
          },
          {
            name: 'Potenzen mit negativen Exponenten umformen',
            skillExercises: [{ id: 10022 }],
          },
          {
            name: 'Sachaufgabe mit Zehnerpotenzen lösen',
            skillExercises: [{ id: 10023 }],
          },
          {
            name: 'Binomische Formeln erkennen und anwenden',
            skillExercises: [{ id: 4401 }],
          },
        ],
      },
      {
        title: 'Lineare Funktionen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Steigung und Funktionsgleichung am Graphen bestimmen',
            skillExercises: [{ id: 4100 }],
          },
          {
            name: 'Steigung aus zwei Punkten berechnen',
            skillExercises: [{ id: 10032 }],
          },
          {
            name: 'Geradengleichung aus Steigung und Punkt bestimmen',
            skillExercises: [{ id: 4101 }],
          },
          {
            name: 'Geradengleichung aus zwei Punkten bestimmen',
            skillExercises: [{ id: 10034 }],
          },
          {
            name: 'Graph und Funktionsgleichung zuordnen',
            skillExercises: [{ id: 4100 }, { id: 4504 }],
          },
          {
            name: 'Punktprobe bei einer linearen Funktion durchführen',
            skillExercises: [{ id: 10035 }],
          },
          {
            name: 'Nullstelle einer linearen Funktion berechnen',
            skillExercises: [{ id: 10036 }],
          },
          {
            name: 'Schnittpunkt zweier Geraden berechnen',
            skillExercises: [{ id: 4801 }],
          },
          {
            name: 'Schnittpunkte mit den Koordinatenachsen bestimmen',
            skillExercises: [{ id: 10039 }],
          },
          {
            name: 'Sachaufgabe mit linearen Modellen',
            skillExercises: [{ id: 4504 }, { id: 4505 }],
          },
        ],
      },
      {
        title: 'Quadratische Funktionen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Parabel aus Funktionsgleichung skizzieren',
            skillExercises: [{ id: 4007 }],
          },
          {
            name: 'Scheitelpunkt aus Scheitelpunktform ablesen',
            skillExercises: [{ id: 4000 }],
          },
          {
            name: 'Nullstellen einer Parabel berechnen',
            skillExercises: [{ id: 4923 }],
          },
          {
            name: 'Punktprobe bei einer quadratischen Funktion durchführen',
            skillExercises: [{ id: 10044 }],
          },
          {
            name: 'Schnittpunkte von Parabel und Gerade berechnen',
            skillExercises: [{ id: 4924 }, { id: 4006 }],
          },
          {
            name: 'Schnittpunkte von zwei Parabeln berechnen',
            skillExercises: [{ id: 4925 }],
          },
          {
            name: 'Anwendungsaufgabe: Flugbahn oder Bogen modellieren',
            skillExercises: [{ id: 10046 }],
          },
        ],
      },
      {
        title: 'Potenzfunktionen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Potenzfunktion f(x)=a·x³ auswerten und skizzieren',
            skillExercises: [{ id: 10047 }],
          },
          {
            name: 'Symmetrie von Potenzfunktionen beschreiben',
            skillExercises: [{ id: 10048 }],
          },
          {
            name: 'Potenzfunktion mit negativen Exponenten auswerten',
            skillExercises: [{ id: 10049 }],
          },
          {
            name: 'Parameter einer Potenzfunktion untersuchen',
            skillExercises: [{ id: 10050 }],
          },
          {
            name: 'Lagebeziehung zweier Kurven beschreiben',
            skillExercises: [{ id: 10051 }],
          },
          {
            name: 'Potenzgesetze anwenden',
            skillExercises: [{ id: 4403 }],
          },
        ],
      },
      {
        title: 'Polynomfunktionen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Grad, Koeffizienten und konstantes Glied angeben',
            skillExercises: [{ id: 10053 }],
          },
          {
            name: 'Globalverhalten einer Polynomfunktion beschreiben',
            skillExercises: [{ id: 10054 }],
          },
          {
            name: 'Symmetrie von Polynomfunktionen untersuchen',
            skillExercises: [{ id: 10055 }],
          },
          {
            name: 'Polynomfunktion auswerten',
            skillExercises: [{ id: 10052 }],
          },
          {
            name: 'Graphen von Polynomfunktionen skizzieren',
            skillExercises: [{ id: 10056 }],
          },
          {
            name: 'Polynomfunktion über das Globalverhalten skizzieren',
            skillExercises: [{ id: 10063 }],
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
    longTitle: '3BKGD3 - Mathematik I',
    shortTitle: '3BKGD3 - Mathe I',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Break-Even-Point',
            skillExercises: [{ id: 12000 }],
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
  24: {
    longTitle: 'Vorbereitungskurs Meister - Mathematik',
    shortTitle: 'Meister-Vorkurs - Mathe',
    topics: [
      {
        title: 'Rechengrundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Rechenbegriffe und Rechenregeln',
            skillExercises: [{ id: 13000 }, { id: 13001 }],
          },
          {
            name: 'Mit positiven und negativen Zahlen rechnen',
            skillExercises: [{ id: 9550 }, { id: 9551 }],
          },
          {
            name: 'Wurzeln berechnen und Wurzelregeln prüfen',
            skillExercises: [{ id: 13002 }],
          },
          {
            name: 'Brüche verstehen und vergleichen',
            skillExercises: [{ id: 9587 }, { id: 9595 }, { id: 9589 }],
          },
          {
            name: 'Mit Brüchen rechnen',
            skillExercises: [
              { id: 9507 },
              { id: 9508 },
              { id: 9509 },
              { id: 9505 },
              { id: 13003 },
            ],
          },
          {
            name: 'Bruch, Dezimalzahl und Prozent umwandeln',
            skillExercises: [{ id: 9655 }],
          },
          {
            name: 'Dreisatz in technischen Situationen',
            skillExercises: [{ id: 13004 }],
          },
          {
            name: 'Prozentrechnung im Metallbetrieb',
            skillExercises: [{ id: 13005 }],
          },
          {
            name: 'Technische Zahlen in Potenzschreibweise',
            skillExercises: [{ id: 13006 }],
          },
        ],
      },
      {
        title: 'Terme und Rechengesetze',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Terme lesen, einsetzen und ausklammern',
            skillExercises: [{ id: 13007 }, { id: 4906 }],
          },
          {
            name: 'Gleichartige Terme zusammenfassen',
            skillExercises: [{ id: 9554 }, { id: 4400 }],
          },
          {
            name: 'Klammern auflösen und Fehler finden',
            skillExercises: [{ id: 4201 }, { id: 4909 }, { id: 10020 }],
          },
          {
            name: 'Potenzgesetze verstehen und anwenden',
            skillExercises: [{ id: 13008 }, { id: 4403 }, { id: 10022 }],
          },
          {
            name: 'Binomische Formeln',
            skillExercises: [{ id: 13009 }],
          },
        ],
      },
      {
        title: 'Gleichungen und Formeln',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Äquivalenzumformungen verstehen',
            skillExercises: [{ id: 13010 }, { id: 4907 }, { id: 4200 }],
          },
          {
            name: 'Gleichungen mit Klammern und Brüchen',
            skillExercises: [{ id: 13011 }, { id: 4912 }, { id: 4913 }],
          },
          {
            name: 'Technische Formeln umstellen',
            skillExercises: [{ id: 13013 }, { id: 13014 }],
          },
          {
            name: 'Dichte, Masse und Volumen',
            skillExercises: [{ id: 13015 }],
          },
          {
            name: 'Einheiten und Ergebnisse auf Plausibilität prüfen',
            skillExercises: [{ id: 13016 }],
          },
        ],
      },
      {
        title: 'Geometrie und Trigonometrie',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Rechtwinklige Dreiecke fachgerecht beschreiben',
            skillExercises: [{ id: 13017 }],
          },
          {
            name: 'Satz des Pythagoras anwenden und Fehler finden',
            skillExercises: [{ id: 4602 }, { id: 13018 }],
          },
          {
            name: 'Passende Winkelfunktion auswählen',
            skillExercises: [{ id: 4918 }],
          },
          {
            name: 'Trigonometrie in technischen Konstruktionen',
            skillExercises: [{ id: 13019 }],
          },
        ],
      },
      {
        title: 'Längen, Flächen, Volumen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Größen unterscheiden und Einheiten umwandeln',
            skillExercises: [
              { id: 13020 },
              { id: 9524 },
              { id: 9525 },
              { id: 9526 },
            ],
          },
          {
            name: 'Umfang und Flächeninhalt berechnen',
            skillExercises: [{ id: 4600 }],
          },
          {
            name: 'Fehlende Maße aus Flächen bestimmen',
            skillExercises: [{ id: 13021 }],
          },
          {
            name: 'Zusammengesetzte Blechflächen',
            skillExercises: [{ id: 9572 }, { id: 13022 }],
          },
          {
            name: 'Maße aus technischen Skizzen ableiten',
            skillExercises: [{ id: 13023 }],
          },
          {
            name: 'Volumen von Grundkörpern und Werkstücken',
            skillExercises: [{ id: 4700 }, { id: 9645 }, { id: 13024 }],
          },
          {
            name: 'Werkstückmasse aus Volumen und Dichte',
            skillExercises: [{ id: 13025 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  25: {
    longTitle: 'TG13 - MEC-E',
    shortTitle: 'TG13 - MEC-E',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Wechselspannungsanalyse Drehstrommotor',
            skillExercises: [{ id: 26000 }],
          },
        ],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  26: {
    longTitle: 'TG11 - Chemie',
    shortTitle: 'TG11 - Chemie',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  27: {
    longTitle: 'TG12 - Chemie',
    shortTitle: 'TG12 - Chemie',
    topics: [
      {
        title: 'Grundlagen',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [],
      },
    ],
    mapHeight: 0,
    breakPoints: [0, 0],
    path: [],
  },
  28: {
    longTitle: 'TG13 - Chemie',
    shortTitle: 'TG13 - Chemie',
    topics: [
      {
        title: 'Grundlagen',
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
