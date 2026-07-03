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
          {
            name: 'Bewegungsgesetz F=ma 2',
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
            name: 'Raketenphysik (Kraftstoß)',
            skillExercises: [
              {
                id: 6016,
              },
            ],
          },

          {
            name: 'Federkraft',
            skillExercises: [
              {
                id: 6019,
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
            name: 'Energiemengen berechnen',
            skillExercises: [
              {
                id: 6017,
              },
            ],
          },
          {
            name: 'Energieerhaltung',
            skillExercises: [
              {
                id: 6018,
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
            name: 'Runden',
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
            name: 'Dividieren in Textaufgaben',
            skillExercises: [{ id: 9502 }],
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
            name: 'Flächen umrechnen',
            skillExercises: [{ id: 9525 }],
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
            name: 'Cent und Euro umrechnen',
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
            name: 'Wird es rechtzeitig fertig?',
            skillExercises: [{ id: 9542 }],
          },
          {
            name: 'Zeitplan Schritt für Schritt',
            skillExercises: [{ id: 9544 }],
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
