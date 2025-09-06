// src/components/pages/App.tsx
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react'
import { Route, Redirect } from 'react-router-dom' // ⬅️ wichtig: react-router-dom!
import {
  analyticsOutline,
  gridOutline,
  homeOutline,
  menuOutline,
  person,
  personAdd,
  personOutline,
  powerOutline,
} from 'ionicons/icons'

import { List } from './tabs/List'
import { Search } from './tabs/Search'
import { Start } from './tabs/Start'
import { Profile } from './tabs/Profile'
import { Training } from './tabs/Training' // neuer Tab
import { faDumbbell, faSmile } from '@fortawesome/free-solid-svg-icons'
// import { loadEmoji } from 'next/dist/compiled/@vercel/og/emoji'
// import { faSmile } from '@fortawesome/free-solid-svg-icons'

export function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Standard-Redirect */}
        <Route exact path="/app">
          <Redirect to="/app/start" />
        </Route>

        {/* Tabs-Routen – immer mit component={...} */}
        <Route exact path="/app/start" component={Start} />
        <Route exact path="/app/training" component={Training} />
        <Route exact path="/app/list" component={List} />
        <Route exact path="/app/search" component={Search} />
        <Route exact path="/app/profile" component={Profile} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab-start" href="/app/start">
          <IonIcon icon={homeOutline} />
          <IonLabel>Start</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab-topics" href="/app/training">
          <IonIcon icon={analyticsOutline} />
          <IonLabel>Training</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab-list" href="/app/list">
          <IonIcon icon={menuOutline} />
          <IonLabel>Liste</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab-profile" href="/app/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
