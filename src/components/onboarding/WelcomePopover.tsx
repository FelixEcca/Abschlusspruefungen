import * as React from 'react'
import { IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/react'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'

type Props = {
  // optional: erzwinge das PopUp (z.B. für Tests)
  forceOpen?: boolean
  onClose?: () => void
}

export function WelcomePopover({ forceOpen = false, onClose }: Props) {
  const currentName = PlayerProfileStore.useState(s => s.name)
  const currentExam = PlayerProfileStore.useState(s => s.currentExam)

  const [open, setOpen] = React.useState(false)
  const [inputName, setInputName] = React.useState(currentName ?? '')
  const [exam, setExam] = React.useState<number | undefined>(
    currentExam || undefined,
  )

  // Öffnen, wenn kein Name gesetzt ist (oder forceOpen)
  React.useEffect(() => {
    if (forceOpen || !currentName || currentName.trim() === '') {
      setOpen(true)
    }
  }, [forceOpen, currentName])

  // Notify parent when closing
  function handleClose() {
    setOpen(false)
    if (onClose) onClose()
  }

  if (!open) return null

  // alle verfügbaren Prüfungen (Schlüssel) herausziehen
  const exams = Object.keys(navigationData)
    .map(n => Number(n))
    .filter(n => !Number.isNaN(n))
    .sort((a, b) => a - b)

  const labelFor = (ex: number) =>
    navigationData[ex]?.shortTitle ?? `Prüfung ${ex}`

  const valid = (inputName?.trim().length ?? 0) >= 2 && !!exam

  function save() {
    if (!valid) return
    PlayerProfileStore.update(s => {
      s.name = inputName.trim()
      s.currentExam = exam!
    })
    handleClose()
    window.location.reload() // <-- This will reload the page
  }

  return (
    // Der Container fängt KEINE Pointer-Events (Hintergrund bleibt klickbar)
    <div className="fixed inset-0 z-50 pointer-events-none mt-10">
      {/* PopUp: fängt Pointer-Events (klickbar) */}
      <div className="pointer-events-auto absolute left-1/2 top-6 -translate-x-1/2 w-[min(92vw,380px)]">
        <div className="rounded-2xl shadow-xl bg-white border border-gray-200 p-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="text-lg font-semibold">👋 Willkommen!</div>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={handleClose}
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
              onIonChange={e => setInputName(e.detail.value as string)}
            />

            <div>
              <div className="text-[13px] mb-1">Prüfung</div>
              <IonSelect
                placeholder="Bitte auswählen"
                value={exam}
                onIonChange={e => {
                  const selectedExam = Number(e.detail.value)
                  setExam(selectedExam)
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
            <IonButton fill="outline" color="medium" onClick={handleClose}>
              Später
            </IonButton>
          </div>

          {/* kleiner Hinweis */}
          <div className="mt-2 text-[11px] text-gray-500">
            Tipp: Du kannst die Prüfung jederzeit im Profil ändern.
          </div>
        </div>
      </div>
    </div>
  )
}
