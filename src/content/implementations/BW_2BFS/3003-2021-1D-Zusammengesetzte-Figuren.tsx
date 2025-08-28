import { Exercise } from '@/data/types'

interface DATA {case: number}

export const exercise3003: Exercise<DATA> = {
  title: 'Zusammengesetzte Figuren',
  source: '2021 Pflichtteil Aufgabe 1D',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {case: rng.randomIntBetween(1, 4)}
  },
  originalData: {case:5},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return <><p>Gegeben ist folgende Figur.</p><svg viewBox="0 0 328 140">
      {data.case==1&&<><image href="/content/BW_2BFS/3003_1.JPG" height="140" width="328" /></>}
      <svg viewBox="0 0 328 200">{data.case==2&&<><image href="/content/BW_2BFS/3003_2.JPG" height="200" width="328" /></>}</svg>
      <svg viewBox="0 0 328 200">{data.case==3&&<><image href="/content/BW_2BFS/3003_3.JPG" height="200" width="328" /></>}</svg>
      <svg viewBox="0 0 328 200">{data.case==4&&<><image href="/content/BW_2BFS/3003_4.JPG" height="200" width="328" /></>}</svg>
      <svg viewBox="0 0 328 328">{data.case==5&&<><image href="/content/BW_2BFS/3003_5.JPG" height="328" width="328" /></>}</svg>
      
      
      
      
      
      </svg></>
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <><p>Notieren Sie zwei unterschiedliche Terme zur Berechnung des Umfangs der Figur.</p></>
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
        return <>{data.case==1&&<><p>z ist doppelt so lang wie y.</p></>}
        {data.case==2&&<><p>z ist dreimal so lang wie x.</p></>}
        {data.case==3&&<><p></p></>}
        {data.case==4&&<><p>z ist dreimal so lang wie x.</p></>}
        {data.case==5&&<><p>x ist doppelt so lang wie y.</p></>}
        
        <p>Bestimmen Sie einen Term zur Berechnung des Flächeninhalts der Figur, der nur die Variable x enthält.</p></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
