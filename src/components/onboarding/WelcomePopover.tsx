import * as React from 'react'
import { IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/react'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'

/** Erst nach Mount rendern -> verhindert SSR/CSR-Mismatch */
function useClientReady() {
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => setReady(true), [])
  return ready
}

type Props = { forceOpen?: boolean }

export function WelcomePopover({ forceOpen = false }: Props) {
  const clientReady = useClientReady()
  const storeName = PlayerProfileStore.useState(s => s.name)
  const storeExam = PlayerProfileStore.useState(s => s.currentExam)

  // Sichtbarkeit lokal steuern
  const [dismissed, setDismissed] = React.useState(false)

  // Controlled Inputs
  const [name, setName] = React.useState(storeName ?? '')
  const [exam, setExam] = React.useState<number | ''>(
    typeof storeExam === 'number' ? storeExam : '',
  )

  // Submitting-Guard (verhindert Doppelklick)
  const [submitting, setSubmitting] = React.useState(false)

  // Store -> lokale Inputs synchronisieren (nach Rehydration)
  React.useEffect(() => {
    if (typeof storeName === 'string') setName(storeName)
  }, [storeName])
  React.useEffect(() => {
    if (typeof storeExam === 'number') setExam(storeExam)
  }, [storeExam])

  // Prüfungsoptionen
  const examKeys = React.useMemo(
    () =>
      Object.keys(navigationData)
        .map(n => Number(n))
        .filter(n => !Number.isNaN(n))
        .sort((a, b) => a - b),
    [],
  )
  const label = (key: number) =>
    navigationData[key]?.shortTitle ?? `Prüfung ${key}`

  // Bedingungen
  const missingName = !(storeName && storeName.trim().length >= 2)
  const missingExam = !(typeof storeExam === 'number')
  const needOnboarding = missingName || missingExam

  const open = clientReady && (forceOpen || needOnboarding) && !dismissed
  const canSubmit =
    name.trim().length >= 2 && typeof exam === 'number' && !submitting

  function onSubmit() {
    if (!canSubmit) return
    setSubmitting(true)
    const trimmed = name.trim()
    updatePlayerProfileStore(s => {
      s.name = trimmed
      s.currentExam = exam as number
    })
    // Hard reload nach minimaler Verzögerung, um den Store persistieren zu lassen
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.reload()
      }, 0)
    } else {
      // Fallback ohne window (SSR-Sicherheit)
      setDismissed(true)
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/15 flex items-start justify-center pt-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Willkommen"
        className="w-[min(92vw,380px)] rounded-2xl shadow-xl bg-white border border-gray-200 p-4"
        onMouseDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="text-lg font-semibold">👋 Willkommen!</div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setDismissed(true)}
            aria-label="Schließen"
            title="Schließen"
            type="button"
          >
            ✖
          </button>
        </div>

        <p className="mt-1 text-sm text-gray-600">
          Bitte gib deinen Namen an und wähle deine Prüfung. Du kannst das
          später im Profil jederzeit ändern.
        </p>

        <div className="mt-3 space-y-3">
          <IonInput
            label="Dein Name"
            labelPlacement="stacked"
            placeholder="Name …"
            value={name}
            onIonChange={e => setName((e.detail.value as string) ?? '')}
          />

          <div>
            <div className="text-[13px] mb-1">Prüfung</div>
            <IonSelect
              placeholder="Bitte auswählen"
              value={typeof exam === 'number' ? exam : undefined}
              interface="popover"
              onIonChange={e => {
                const v = Number(e.detail.value)
                setExam(Number.isNaN(v) ? '' : v)
              }}
            >
              {examKeys.map(k => (
                <IonSelectOption key={k} value={k}>
                  {label(k)}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <IonButton expand="block" onClick={onSubmit} disabled={!canSubmit}>
            {submitting ? 'Lädt…' : "Los geht's ✨"}
          </IonButton>

          <IonButton
            fill="outline"
            color="medium"
            onClick={() => setDismissed(true)}
            disabled={submitting}
          >
            Später
          </IonButton>
        </div>
      </div>
    </div>
  )
}
