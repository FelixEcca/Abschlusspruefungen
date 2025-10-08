import * as React from 'react'
import { IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/react'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'

type Props = {
  /** Optional: Popover explizit anzeigen/erzwingen (z.B. aus Start) */
  forceOpen?: boolean
}

export function WelcomePopover({ forceOpen = false }: Props) {
  const currentName = PlayerProfileStore.useState(s => s.name)
  const currentExam = PlayerProfileStore.useState(s => s.currentExam)

  const [dismissed, setDismissed] = React.useState(false)
  const [inputName, setInputName] = React.useState(currentName ?? '')
  const [exam, setExam] = React.useState<number | undefined>(
    currentExam ?? undefined,
  )

  // --- Ableiten, ob wir anzeigen sollen ---
  const needOnboarding =
    !inputName?.trim() || typeof exam !== 'number' || Number.isNaN(exam)
  const shouldOpen = (forceOpen || needOnboarding) && !dismissed

  // Wenn Store-Werte später rehydrieren, übernehme sie in die Felder
  React.useEffect(() => {
    if (typeof currentName === 'string') setInputName(currentName)
  }, [currentName])
  React.useEffect(() => {
    if (typeof currentExam === 'number') setExam(currentExam)
  }, [currentExam])

  if (!shouldOpen) return null

  // verfügbare Prüfungen dynamisch
  const exams = Object.keys(navigationData)
    .map(n => Number(n))
    .filter(n => !Number.isNaN(n))
    .sort((a, b) => a - b)

  const labelFor = (ex: number) =>
    navigationData[ex]?.shortTitle ?? `Prüfung ${ex}`

  const valid = (inputName?.trim().length ?? 0) >= 2 && typeof exam === 'number'

  function save() {
    if (!valid || typeof exam !== 'number') return
    PlayerProfileStore.update(s => {
      s.name = inputName.trim()
      s.currentExam = exam
    })
    // Schließen – und künftig geschlossen lassen
    setDismissed(true)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-start justify-center pt-6">
      <div className="w-[min(92vw,380px)] rounded-2xl shadow-xl bg-white border border-gray-200 p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="text-lg font-semibold">👋 Willkommen!</div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setDismissed(true)}
            aria-label="Schließen"
            title="Schließen"
          >
            ✖
          </button>
        </div>

        <p className="mt-1 text-sm text-gray-600">
          Schön, dass du da bist. Sag mir kurz deinen Namen und wähle deine
          Prüfung – dann geht’s los. 🚀
        </p>

        <div className="mt-3 space-y-3">
          <IonInput
            label="Dein Name"
            labelPlacement="stacked"
            placeholder="..."
            value={inputName}
            onIonChange={e => setInputName((e.detail.value as string) ?? '')}
          />

          <div>
            <div className="text-[13px] mb-1">Prüfung</div>
            <IonSelect
              placeholder="Bitte auswählen"
              value={typeof exam === 'number' ? exam : undefined}
              onIonChange={e => {
                const v = Number(e.detail.value)
                setExam(Number.isNaN(v) ? undefined : v)
              }}
              interface="popover"
            >
              {exams.map(ex => (
                <IonSelectOption key={ex} value={ex}>
                  {labelFor(ex)}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <IonButton expand="block" onClick={save} disabled={!valid}>
            Los geht&apos;s ✨
          </IonButton>
          <IonButton
            fill="outline"
            color="medium"
            onClick={() => setDismissed(true)}
          >
            Später
          </IonButton>
        </div>

        <div className="mt-2 text-[11px] text-gray-500">
          Tipp: Du kannst die Prüfung jederzeit im Profil ändern.
        </div>
      </div>
    </div>
  )
}
