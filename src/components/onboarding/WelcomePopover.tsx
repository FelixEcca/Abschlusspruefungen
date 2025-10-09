import * as React from 'react'
import { IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/react'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'

/** Stellt sicher, dass SSR/CSR-Markup identisch bleibt: wir rendern erst nach Mount. */
function useClientReady() {
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => setReady(true), [])
  return ready
}

type Props = { forceOpen?: boolean }

export function WelcomePopover({ forceOpen = false }: Props) {
  const clientReady = useClientReady()

  // Storewerte (können beim 1. Client-Render noch leer sein)
  const storeName = PlayerProfileStore.useState(s => s.name)
  const storeExam = PlayerProfileStore.useState(s => s.currentExam)

  const [dismissed, setDismissed] = React.useState(false)
  const [name, setName] = React.useState(storeName ?? '')
  const [exam, setExam] = React.useState<number | ''>(
    typeof storeExam === 'number' ? storeExam : '',
  )

  // Store → lokale Inputs synchronisieren (nach Rehydration)
  React.useEffect(() => {
    if (typeof storeName === 'string') setName(storeName)
  }, [storeName])
  React.useEffect(() => {
    if (typeof storeExam === 'number') setExam(storeExam)
  }, [storeExam])

  // Prüfungen dynamisch
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

  // Popover erst auf dem Client entscheiden/rendern (vermeidet SSR/CSR-Differenz)
  if (!clientReady) return null

  const needOnboarding =
    !(name && name.trim().length >= 2) || !(typeof exam === 'number')
  const shouldOpen = (forceOpen || needOnboarding) && !dismissed

  if (!shouldOpen) return null

  const canSubmit = name.trim().length >= 2 && typeof exam === 'number'

  function onSubmit() {
    if (!canSubmit) return
    try {
      PlayerProfileStore.update(s => {
        s.name = name.trim()
        s.currentExam = exam as number
      })
    } finally {
      setDismissed(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/15 flex items-start justify-center pt-8">
      <div className="w-[min(92vw,380px)] rounded-2xl shadow-xl bg-white border border-gray-200 p-4">
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
          Hinweis: Dieses Fenster erscheint nur, wenn Name oder Prüfung fehlen.
        </div>
      </div>
    </div>
  )
}
