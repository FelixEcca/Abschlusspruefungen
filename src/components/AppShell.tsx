'use client'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route, useHistory } from 'react-router-dom'
import { App } from './pages/App'
import { Topic } from './pages/Topic'
import { navigationData } from '@/content/navigations'
import { exercisesData } from '@/content/exercises'
import { ExerciseView } from './exercise-view/ExerciseView'
import { useEffect } from 'react'
import { ExerciseViewStore } from './exercise-view/state/exercise-view-store'

import {
  defaultPlayerProfileStoreValue,
  PlayerProfileStore,
  storageKey,
} from '../../store/player-profile-store'

setupIonicReact({})

export function AppShell() {
  const history = useHistory()

  useEffect(() => {
    const handler = (ev: any) => {
      ev.detail.register(1000, () => {
        if (ExerciseViewStore.getRawState().chatOverlay) {
          ExerciseViewStore.update(s => {
            s.chatOverlay = null
          })
          return
        }
        history.goBack()
      })
    }

    const persistence = localStorage.getItem(storageKey)

    try {
      const obj = JSON.parse(
        persistence || JSON.stringify(defaultPlayerProfileStoreValue),
      )
      PlayerProfileStore.update(() => obj)
    } catch {}

    document.addEventListener('ionBackButton', handler)

    return () => {
      document.removeEventListener('ionBackButton', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/app" render={() => <App />} />

          <Route
            path=""
            render={() => <Redirect to="/app/superskills/" />}
            exact={true}
          />
          {navigationData[1].topics.map((t, i) => (
            <Route
              key={i}
              path={`/topic/${i + 1}`}
              render={() => (
                <Topic
                  title={t.title}
                  color={t.headerColor}
                  skillGroups={t.skillGroups}
                />
              )}
            />
          ))}
          {navigationData[2].topics.map((t, i) => (
            <Route
              key={i}
              path={`/topic/${i + 101}`}
              render={() => (
                <Topic
                  title={t.title}
                  color={t.headerColor}
                  skillGroups={t.skillGroups}
                />
              )}
            />
          ))}
          {navigationData[3].topics.map((t, i) => (
            <Route
              key={i}
              path={`/topic/${i + 201}`}
              render={() => (
                <Topic
                  title={t.title}
                  color={t.headerColor}
                  skillGroups={t.skillGroups}
                />
              )}
            />
          ))}
          {Object.keys(exercisesData)
            .map(x => parseInt(x))
            .map(id => (
              <Route
                path={`/exercise/${id}`}
                key={id}
                render={() => <ExerciseView id={id} />}
              />
            ))}
          <Route
            path={`/exercise/123456`}
            key={123456}
            render={() => <ExerciseView id={123456} />}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default AppShell
