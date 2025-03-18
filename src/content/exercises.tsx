import { Exercise } from '@/data/types'

import { exercise215 } from './implementations/BW_Realschule/215-2024-B-3-Angelspiel+Tennishalle'
import { exercise200 } from './implementations/BW_Realschule/200-2024-A1-1-Pyramide'
import { exercise201 } from './implementations/BW_Realschule/201-2024-A1-2-Kugeln-ziehen'
import { exercise202 } from './implementations/BW_Realschule/202-2024-A1-3-Zehnerpotenzen'
import { exercise203 } from './implementations/BW_Realschule/203-2024-A1-4-Muster'
import { exercise204 } from './implementations/BW_Realschule/204-2024-A1-5-Sinus'
import { exercise205 } from './implementations/BW_Realschule/205-2024-A1-6-Boxplot'
import { exercise206 } from './implementations/BW_Realschule/206-2024-A1-7-Diagramm'
import { exercise207 } from './implementations/BW_Realschule/207-2024-A2-1-Viereck'
import { exercise208 } from './implementations/BW_Realschule/208-2024-A2-2-Fünfseitige-Pyramide'
import { exercise209 } from './implementations/BW_Realschule/209-2024-A2-3-Parabeln'
import { exercise210 } from './implementations/BW_Realschule/210-2024-A2-4-Sammelbilder'
import { exercise211 } from './implementations/BW_Realschule/211-2024-A2-5-Quadratische-Gleichung'
import { exercise212 } from './implementations/BW_Realschule/212-2024-A2-6-Diagramm'
import { exercise213 } from './implementations/BW_Realschule/213-2024-B-1-Drachenviereck+Parabeln'
import { exercise214 } from './implementations/BW_Realschule/214-2024-B-2-Funktionen+Zusammengesetzter-Körper'
import { exercise230 } from './implementations/BW_Realschule/230-2023-B-1-Trapez+Parabel'
import { exercise231 } from './implementations/BW_Realschule/231-2023-B-2-Parabel+Körper'
import { exercise232 } from './implementations/BW_Realschule/232-2023-B-3-Gewinnlose+Parabel'
import { exercise233 } from './implementations/BW_Realschule/233-2023-B-4-Parabel+Prisma'
import { exercise241 } from './implementations/BW_Realschule/241-2022-A2-1-Dreieck'
import { exercise242 } from './implementations/BW_Realschule/242-2022-A2-2-Gussform'
import { exercise243 } from './implementations/BW_Realschule/243-2022-A2-3-Quadratische-Gleichung'
import { exercise244 } from './implementations/BW_Realschule/244-2022-A2-4-Parabel'
import { exercise245 } from './implementations/BW_Realschule/245-2022-A2-5-Losverkauf'
import { exercise246 } from './implementations/BW_Realschule/246-2022-A2-6-Paketdiagramm'
import { exercise247 } from './implementations/BW_Realschule/247-2022-B-1-Figuren+Funktionen'
import { exercise248 } from './implementations/BW_Realschule/248-2022-B-2-Parabeln+Körper'
import { exercise249 } from './implementations/BW_Realschule/249-2022-B-3-Zufall+Tiny-House'
import { exercise250 } from './implementations/BW_Realschule/250-2022-B-4-Parabeln+Sechseck'
import { exercise258 } from './implementations/BW_Realschule/258-2021-A2-1-Figur'
import { exercise259 } from './implementations/BW_Realschule/259-2021-A2-2-Körper'
import { exercise260 } from './implementations/BW_Realschule/260-2021-A2-3-Glücksrad'
import { exercise261 } from './implementations/BW_Realschule/261-2021-A2-4-Diagramme'
import { exercise262 } from './implementations/BW_Realschule/262-2021-A2-5-Funktionen'
import { exercise263 } from './implementations/BW_Realschule/263-2021-A2-6-Boxplots'
import { exercise264 } from './implementations/BW_Realschule/264-2021-B-1-Figur+Funktionen'
import { exercise265 } from './implementations/BW_Realschule/265-2021-B-2-Funktionen+Körper'
import { exercise266 } from './implementations/BW_Realschule/266-2021-B-3-Glücksspiel+Parabel'
import { exercise267 } from './implementations/BW_Realschule/267-2021-B-4-Parabel+Figur'

import { exercise300 } from './implementations/BW_2BFS/300-2024-1A-Ebene-Figur'
import { exercise301 } from './implementations/BW_2BFS/301-2024-1B-Graphen'
import { exercise302 } from './implementations/BW_2BFS/302-2024-1C-Kartenspiel'
import { exercise303 } from './implementations/BW_2BFS/303-2024-1D-Gleichungen-und-Funktionen'
import { exercise304 } from './implementations/BW_2BFS/304-2024-2A-Zahlenkugeln'
import { exercise305 } from './implementations/BW_2BFS/305-2024-2B-Dreieck-im-Koordinatensystem'
import { exercise306 } from './implementations/BW_2BFS/306-2024-2C-Dachschräge'
import { exercise307 } from './implementations/BW_2BFS/307-2024-3A-Zusammengesetzter-Körper'
import { exercise308 } from './implementations/BW_2BFS/308-2024-3B-Parabel'
import { exercise309 } from './implementations/BW_2BFS/309-2024-3C-Einkommensteuer'
import { exercise310 } from './implementations/BW_2BFS/310-2024-4A-Gerade-und-Parabel'
import { exercise311 } from './implementations/BW_2BFS/311-2024-4B-LGS'
import { exercise312 } from './implementations/BW_2BFS/312-2024-4C-Betonkörper'

export const exercisesData: { [key: number]: Exercise<any> } = {
  200: exercise200,
  201: exercise201,
  202: exercise202,
  203: exercise203,
  204: exercise204,
  205: exercise205,
  206: exercise206,
  207: exercise207,
  208: exercise208,
  209: exercise209,
  210: exercise210,
  211: exercise211,
  212: exercise212,
  213: exercise213,
  214: exercise214,
  215: exercise215,
  230: exercise230,
  231: exercise231,
  232: exercise232,
  233: exercise233,
  241: exercise241,
  242: exercise242,
  243: exercise243,
  244: exercise244,
  245: exercise245,
  246: exercise246,
  247: exercise247,
  248: exercise248,
  249: exercise249,
  250: exercise250,
  258: exercise258,
  259: exercise259,
  260: exercise260,
  261: exercise261,
  262: exercise262,
  263: exercise263,
  264: exercise264,
  265: exercise265,
  266: exercise266,
  267: exercise267,

  300: exercise300,
  301: exercise301,
  302: exercise302,
  303: exercise303,
  304: exercise304,
  305: exercise305,
  306: exercise306,
  307: exercise307,
  308: exercise308,
  309: exercise309,
  310: exercise310,
  311: exercise311,
  312: exercise312,
}

// symbols:
// {buildEquation([[<></>,<></>,<></>],[<></>,<></>,<></>],[<></>,<></>,<></>]])}
// ℚ
// π · ≤ ≥
// − ±
// ×
// α β γ δ ε ϕ
// ∠ ∡
// ⊕
// ≙ ≠ ⇒ ∈ ∉
// ['',<> <Color4><span className="inline-block  scale-y-[1.5]">↓</span></Color4></>,<><Color4><span style={{ fontSize: 'small' }}>Hier Erklärtext</span></Color4></>,]
// π ≈ √

// SVG-Umgebung:
//<svg viewBox="0 0 328 190"></svg>

// Umgebung für Bild:
// <image href="/content/BW_Realschule/" height="190" width="328" />

// Umgebung für Text in SVG:
// <text x={140} y={185} fontSize={20} textAnchor="right" stroke="black">Hier Text</text>

// Bildunterschrift:
// <center><Color5><span style={{ fontSize: 'small' }}>Unterschrift</span></Color5></center>

// Intro Codeblock:
// intro({data}){return(<></>)},

// Skalierungsfunktion für Koordinatensysteme:
// function toX(n: number) {return 167 + n * ((94.5 * 2) / 10)}
// function toY(n: number) {return 163 - n * ((94.5 * 2) / 10)}

// Funktion, die Punkte von Graphen anlegt
// function generateParabolaPoints(a: number,b: number,c: number,step: number,): string {
// let points = ''
// for (let x = -4; x <= 11; x += step) {
// const y = a * (x - b) * (x - b) + c
// points += `${toX(x)},${toY(y)} `} return points.trim() }

// Variable, die Funktion abruft:
// const parabolaPoints = generateParabolaPoints(data.a,data.x_s,data.y_s,0.1,)

// Polyline für svg-Umgebung
// <polyline points={parabolaPoints} stroke="blue" strokeWidth="2" fill="none"/>

// Line-Umgebung (für Geraden)
// <line x1={33} y1={157} x2={toX((data.zeit_2 - data.zeit_1) / 10)} y2={toY(data.strecke_1 / 50)} stroke="blue" strokeWidth={2} />

// Shuffle
// order: number[]
// order: rng.shuffleArray([0, 1, 2]),
// const listItems = [<li key="1"></li>,<li key="2"></li>,<li key="3"></li>,]
// const shuffledItems = data.order.map(i => listItems[i])
