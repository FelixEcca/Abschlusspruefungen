import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  länge: number
  höhe: number
frequenz: number
masse: number
bahngeschwindigkeit: number
aufprallgeschwindigkeit: number
abbremszeit: number
leistung: number
batterie: number
wirkungsgrad: number
}

export const exercise400: Exercise<DATA> = {
  title: 'Windrad',
  source: '2024 Aufgabe 1 Mechanik',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      länge: rng.randomIntBetween(400,700)/10,
      höhe: rng.randomIntBetween(10,16)*10,
      frequenz: rng.randomIntBetween(70,140)/10,
      masse: rng.randomIntBetween(4,12)*100,
      bahngeschwindigkeit: rng.randomIntBetween(400,1000)/10,
      aufprallgeschwindigkeit: rng.randomIntBetween(70,120)/10,
      abbremszeit: rng.randomIntBetween(5,15)/10,
      leistung: rng.randomIntBetween(10,20)*100,
      batterie: rng.randomIntBetween(400,900)/10,
      wirkungsgrad: rng.randomIntBetween(60,90)}
  },
  originalData: {länge: 58.4,
    höhe: 120,
    frequenz: 11.8,
    masse: 800,
    bahngeschwindigkeit: 72.2,
    aufprallgeschwindigkeit: 80,
    abbremszeit: 7,
    leistung: 1700,
    batterie: 60,
    wirkungsgrad: 90},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (<><p>Die drei Rotorblätter einer Windkraftanlage haben jeweils eine Länge l von {pp(data.länge)} m und drehen sich im Uhrzeigersinn mit einer Drehfrequenz von {pp(data.frequenz)} min<sup>-1</sup>. Die Nabenhöhe h des Turms beträgt {pp(data.höhe)} m, siehe Abbildung 1. Alle Vorgänge werden idealisiert betrachtet. Lutwiderstand und Reibung werden vernachlässigt. Rechnen Sie mit g = 9,81 {buildInlineFrac('m','s²')}.
    </p><svg viewBox="0 0 328 260">
          <image href="/content/BW_1BK2T/400.PNG" height="230" width="328" />
          
        </svg>
        </>)
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Ermitteln Sie die Umlaufdauer der Drehung in Sekunden und die Winkelgeschwindigkeit.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Berechnen Sie die Zentripetalbeschleunigung an den Rotorspitzen. Geben Sie diese als Vielfaches der Fallbeschleunigung auf der Erde an.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Eine Schülerin und ein Schüler diskutieren. Alina behauptet: &quot;Die Zentripetalbeschleunigung ist bei konstanter Drehfrequenz proportional zum Radius. Also nimmt die Zentripetalbeschleunigung mit zunehmendem Radius zu.&quot;</p>
        <p>Max entgegnet: &quot;In der Formelsammlung steht a<sub>z</sub> = {buildInlineFrac('v²','r')}. Also ist die Zentripetalbeschleunigung umgekehrt proportional zum Radius und nimmt mit zunehmendem Radius ab.&quot;</p>
        <p>Nehmen Sie zu beiden Aussagen begründet Stellung.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>In der kalten Jahreszeit können sich an den Rotoren Eisablagerungen bilden, die beim Abwurf zur Gefahr werden. Das Verhalten eines Eisblocks mit einer Masse von {pp(data.masse)} g soll im Folgenden genauer untersucht wurden. Betrachten Sie den Eisblock als Massepunkt.</p>
        <p>In Abbildung 2 ist für den Eisblock in den Punkten A, C und D jeweils die Gewichtskraft F<sub>G</sub> eingezeichnet. Ergänzen Sie in den Punkten A, C und D die auftretende Haltekraft F<sub>h</sub> und die resultierende Zentripetalkraft F<sub>z</sub>.</p>
        <svg viewBox="0 0 328 190">
          <image href="/content/BW_1BK2T/400_2.PNG" height="190" width="328" />
          
        </svg>
        <p>Hinweis: Die Kräfteskizze muss nicht maßstäblich sein.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Geben Sie die Stellung des Rotorblatts an, in der die Haltekraft maximal ist. Berechnen Sie die maximal erforderliche Haltekraft für den Eisblock.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>In den folgenden Aufgaben wird das Verhalten eines Eisblocks nach dem Ablösen von der Rotorspitze betrachtet. Der Eisblock besitzt eine Bahngeschwindigkeit von {pp(data.bahngeschwindigkeit)} {buildInlineFrac('m','s')}.</p>
        <p>Skizzieren Sie in Abbildung 3 die vier Bahnkurven, die der Eisblock beschreibt, wenn er sich in den Punkten A, B, C bzw. D von der Rotorspitze löst. Beachten Sie dabei die Abwurfrichtung und nennen Sie die jeweilig Wurfart.</p>
        <svg viewBox="0 0 328 260">
          <image href="/content/BW_1BK2T/400_3.PNG" height="230" width="328" />
          
        </svg>
        </>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Der Eisblock löst sich im Punkt A. Berechnen Sie die Entfernung des Aufschlagortes des Eisblocks vom Rotormast.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Ermitteln Sie für den Abwurf im Punkt A die Auftreffgeschwindigkeit auf dem Boden.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Der Eisblock trifft mit v<sub>Auf</sub> = {pp(data.aufprallgeschwindigkeit)} {buildInlineFrac(<>m</>,<>s</>)} auf weichem Ackerboden auf. Dabei wird er in {pp(data.abbremszeit)} ms vollständig abgebremst. Berechnen Sie die mittlere Bremskraft, die beim Aufprall auf den Eisblock wirkt.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Eine Windkraftanlage dieser Größe besitzt eine mittlere elektrische Leistung von {pp(data.leistung)} kW.</p><p>Geben Sie an, welche Energieformen bei einer Windkraftanlage ineinander umgewandelt werden.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Berechnen Sie die elektrische Energie, die innerhalb von 24 Stunden von der Windkraftanlage bereitgestellt wird.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },{
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Die Batteriekapazität eines Elektroautos beträgt im Durchschnitt {pp(data.batterie)} kWh. Der Ladewirkungsgrad liegt bei {pp(data.wirkungsgrad)} %. Berechnen Sie die Anzahl der Elektroautos, die mit dem täglichen Energieertrag der Windkraftanlage geladen werden können.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
