// src/store/player-profile-store.ts
import { Store } from 'pullstate'

export const storageKey = 'physikprüfungen_player_progress_v0_2'

export type PlayerProfileStoreProps = {
  name: string
  currentExam: number
  progress: { [key: number]: ExamProgress }
  eventLog: { id: number; index: number; ts: number; type: 'kann-ich' }[]
  statsLog: string[]
  original: boolean
  key?: string
  birdieIntros: string[]
}

interface ExamProgress {
  selectedTopics: number[]
  learningPathTags: string[]
}

export const defaultPlayerProfileStoreValue: PlayerProfileStoreProps = {
  name: '',
  currentExam: 4,
  progress: {
    1: { selectedTopics: [], learningPathTags: [] },
    2: { selectedTopics: [], learningPathTags: [] },
    3: { selectedTopics: [], learningPathTags: [] },
  },
  eventLog: [],
  statsLog: [],
  original: false,
  birdieIntros: [],
}

export const PlayerProfileStore = new Store<PlayerProfileStoreProps>(
  defaultPlayerProfileStoreValue,
)

export function updatePlayerProfileStore(
  f: Parameters<typeof PlayerProfileStore.update>['0'],
) {
  PlayerProfileStore.update(f)
  // lokal im Browser speichern
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      storageKey,
      JSON.stringify(PlayerProfileStore.getRawState()),
    )
  }
  // früher: Sync mit externem Backend (Uberspace)
  // aktuell deaktiviert, da es kein dauerhaftes Backend mehr gibt
  void syncProfileWithBackend()
}

export async function syncProfileWithBackend() {
  const key = PlayerProfileStore.getRawState().key

  // aktuell kein Remote-Backend vorhanden → Funktion tut nichts
  // Hook bleibt bestehen, falls später wieder ein Profil-Backend
  // (z.B. über eine eigene DB + API-Route) angebunden wird.
  if (!key || key === 'pending') return

  // Beispiel, falls du später ein neues Backend baust:
  // await fetch(`/api/profile/${key}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(PlayerProfileStore.getRawState()),
  // })
}
