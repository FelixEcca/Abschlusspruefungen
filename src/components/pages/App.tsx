// src/components/pages/App.tsx
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
  gridOutline,
  homeOutline,
  menuOutline,
  person,
  personAdd,
  personOutline,
} from 'ionicons/icons'

import { Superskills } from './tabs/Superskills'
import { Search } from './tabs/Search'
import { Participate } from './tabs/Participate'
import { Profile } from './tabs/Profile'
import { Topics } from './tabs/Topics' // neuer Tab
import { faSmile } from '@fortawesome/free-solid-svg-icons'
// import { loadEmoji } from 'next/dist/compiled/@vercel/og/emoji'
// import { faSmile } from '@fortawesome/free-solid-svg-icons'

export function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Standard-Redirect */}
        <Route exact path="/app">
          <Redirect to="/app/participate" />
        </Route>

        {/* Tabs-Routen – immer mit component={...} */}
        <Route exact path="/app/participate" component={Participate} />
        <Route exact path="/app/topics" component={Topics} />
        <Route exact path="/app/superskills" component={Superskills} />
        <Route exact path="/app/search" component={Search} />
        <Route exact path="/app/profile" component={Profile} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab-start" href="/app/participate">
          <IonIcon icon={homeOutline} />
          <IonLabel>Start</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab-topics" href="/app/topics">
          <IonIcon icon={gridOutline} />
          <IonLabel>Themen</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab-superskills" href="/app/superskills">
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
