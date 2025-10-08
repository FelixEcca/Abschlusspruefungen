// src/components/pages/tabs/Profile.tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
} from '@ionic/react'
import React from 'react'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'
import {
  useProfile,
  formatMs,
  resetProfile,
} from '../../../../store/progress-store'
import { exercisesData } from '@/content/exercises'
import { SkillExercise } from '@/data/types'

type FlatExercise = { id: number; group?: string }

function flattenExercises(topic: any): FlatExercise[] {
  const groups = Array.isArray(topic?.skillGroups) ? topic.skillGroups : []
  const out: FlatExercise[] = []
  groups.forEach((g: any) => {
    const skills = Array.isArray(g?.skillExercises) ? g.skillExercises : []
    skills.forEach((sx: SkillExercise | number) => {
      if (typeof sx === 'number') {
        out.push({ id: sx, group: g?.name })
      } else if (sx && typeof (sx as any).id === 'number') {
        out.push({ id: (sx as any).id, group: g?.name })
      }
    })
  })
  return out
}

function flattenAllExercises(topics: any[]): FlatExercise[] {
  const acc: FlatExercise[] = []
  topics.forEach(t => acc.push(...flattenExercises(t)))
  return acc
}

function passExamFilter(exam: number, idNum: number): boolean {
  if (exam == 1 && idNum > 99) return false
  if (exam == 2 && (idNum < 100 || idNum >= 199)) return false
  if (exam == 3 && (idNum < 200 || idNum >= 299)) return false
  if (exam == 4 && (idNum < 3000 || idNum >= 3999)) return false
  if (exam == 5 && (idNum < 400 || idNum >= 499)) return false
  return true
}

export function Profile() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const profile = useProfile()

  // Prüfungs-IDs aus exercisesData
  const examIds = React.useMemo(
    () =>
      Object.keys(exercisesData)
        .map(k => parseInt(k, 10))
        .filter(id =>
          passExamFilter(typeof exam === 'number' ? exam : 99999, id),
        ),
    [exam],
  )
  const examCount = examIds.length

  // Trainingsaufgaben (navigationData[exam])
  const trainingCount = React.useMemo(() => {
    const topics = navigationData[exam as number]?.topics ?? []
    const flat = flattenAllExercises(topics)
    const ids = Array.from(new Set(flat.map(f => f.id)))
    return ids.length
  }, [exam])

  // Profil-Stats
  type ExerciseEntry = {
    solved?: boolean
    flagged?: boolean
    attempts?: number
    correct?: number
    timeMs?: number
  }
  const entries: ExerciseEntry[] = Object.values(profile.exercises ?? {})
  const workedOn = entries.length
  const solved = entries.filter(e => e.solved).length
  const flagged = entries.filter(e => e.flagged).length
  const totalTimeMs = profile.totalTimeMs ?? 0

  const totalAvailable = examCount + trainingCount

  // Prüfungen dynamisch wie im Popover
  const examKeys = React.useMemo(
    () =>
      Object.keys(navigationData)
        .map(n => Number(n))
        .filter(n => !Number.isNaN(n))
        .sort((a, b) => a - b),
    [],
  )

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="mx-3 space-y-6 mt-4">
          {/* Prüfungsauswahl */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-semibold" htmlFor="exam-select">
              Prüfung
            </label>
            <select
              id="exam-select"
              value={typeof exam === 'number' ? exam : ''}
              onChange={e => {
                const v = Number(e.target.value)
                if (!Number.isNaN(v)) {
                  updatePlayerProfileStore(s => {
                    s.currentExam = v
                  })
                }
              }}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Bitte auswählen …
              </option>
              {examKeys.map(n => (
                <option value={n} key={n}>
                  {navigationData[n]?.shortTitle ?? `Prüfung ${n}`}
                </option>
              ))}
            </select>
          </div>

          {/* Statistik */}
          <div className="shadow-md bg-sky-50 rounded-xl border p-3">
            <div className="font-semibold mb-2">Dein Lernfortschritt</div>
            <IonList lines="none">
              <IonItem>
                <IonLabel>
                  Aufgaben verfügbar: <b>{totalAvailable}</b>{' '}
                  <span className="text-sm text-gray-500">
                    ({examCount} Prüfung + {trainingCount} Training)
                  </span>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Bearbeitete Aufgaben: <b>{workedOn}</b>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Gelöst (grün): <b>{solved}</b>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Markiert (gelb): <b>{flagged}</b>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  ⏱️ Lernzeit gesamt: <b>{formatMs(totalTimeMs)}</b>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>

          {/* Fortschritt löschen */}
          <div className="shadow-md bg-sky-50 rounded-xl border p-3 space-y-3">
            <div className="font-semibold">Fortschritt löschen</div>
            <IonText color="medium" className="text-sm block">
              Löscht alle lokal gespeicherten Lernstände auf diesem Gerät.
            </IonText>
            <IonButton
              color="danger"
              onClick={() => {
                if (
                  confirm(
                    'Wirklich den gesamten Lernfortschritt löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.',
                  )
                ) {
                  resetProfile()
                  alert('Fortschritt gelöscht.')
                }
              }}
            >
              Löschen
            </IonButton>
          </div>

          <p className="text-xs text-gray-500">
            Hinweis: Alle Daten werden lokal in deinem Browser gespeichert.
          </p>
        </div>
      </IonContent>
    </IonPage>
  )
}
