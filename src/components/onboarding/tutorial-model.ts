import type { Navigation } from '@/data/types'

export const tutorialStorageKey = 'gisela-tutorial-v1'

export type TutorialEvent =
  | 'next'
  | 'training-arrived'
  | 'exercise-arrived'
  | 'training-returned'
  | 'list-arrived'
  | 'solution-open'
  | 'solution-close'
  | 'repeat'
  | 'mark-open'
  | 'scribble-open'
  | 'scribble-close'
  | 'chat-open'
  | 'chat-close'
  | 'chat-conversation-ready'
  | 'chat-overview-open'
  | 'chat-humor-started'
  | 'chat-humor-ready'
  | 'chat-humor-failed'
  | `topic-open:${number}`
  | `year-open:${number}`

export type TutorialStep = {
  id: string
  section: number
  title: string
  text: string
  target: string
  route: string
  event: TutorialEvent
  hint?: string
}

export type TutorialRecord = {
  version: 1
  courseId: number
  step: string
  status: 'active' | 'completed' | 'skipped'
}

type CatalogEntry = {
  source?: string
  exampleData?: unknown
  tasks?: unknown[]
}

export type TutorialPlan = {
  courseId: number
  exerciseId: number | null
  topicIndex: number | null
  examYear: number | null
  steps: TutorialStep[]
}

export function buildTutorialPlan(
  courseId: number,
  navigations: Record<number, Navigation>,
  catalog: Record<number, CatalogEntry>,
  isExam: (courseId: number, exerciseId: number) => boolean,
): TutorialPlan {
  const entries = (navigations[courseId]?.topics ?? []).flatMap(
    (topic, index) =>
      topic.skillGroups.flatMap(group =>
        group.skillExercises
          .filter(exercise => catalog[exercise.id])
          .map(exercise => ({ id: exercise.id, topicIndex: index })),
      ),
  )
  const selected =
    entries.find(
      entry => !catalog[entry.id].tasks && !catalog[entry.id].exampleData,
    ) ?? entries[0]
  const examYears = Object.entries(catalog)
    .filter(([id]) => isExam(courseId, Number(id)))
    .map(([, entry]) => Number(entry.source?.match(/\b(20\d{2})\b/)?.[1] ?? 0))
    .sort((a, b) => b - a)
  const examYear = examYears[0] ?? null
  const exerciseId = selected?.id ?? null
  const topicIndex = selected?.topicIndex ?? null
  const taskRoute = `/exercise/${exerciseId}`
  const steps: TutorialStep[] = []
  const add = (
    id: string,
    section: number,
    title: string,
    text: string,
    target: string,
    route: string,
    event: TutorialEvent = 'next',
    hint?: string,
  ) => {
    steps.push({ id, section, title, text, target, route, event, hint })
  }

  add(
    'dashboard',
    1,
    'Dein Platz zum Lernen',
    'Hier starten wir! Auf der Startseite findest du deinen Fortschritt und meinen Lernassistenten. Ich zeige dir die wichtigsten Stellen.',
    'dashboard-greeting',
    '/app/start',
  )
  add(
    'progress',
    1,
    'Jeder Schritt zählt',
    'Dein Level, die gelösten Aufgaben und deine Streak zeigen dir, was du schon geschafft hast. Kleine, regelmäßige Übungsrunden bringen dich weiter.',
    'dashboard-progress',
    '/app/start',
  )
  if (entries.length || examYear !== null)
    add(
      'suggestion',
      1,
      'Dein Lernassistent',
      'Hier kannst du später mit mir sprechen: Was möchtest du üben, wo hakt es oder wie viel Zeit hast du? Gemeinsam finden wir einen passenden nächsten Schritt.',
      'dashboard-suggestion',
      '/app/start',
    )
  add(
    'training-tab',
    2,
    'Gezielt üben',
    'Im Training sind die Aufgaben nach Themen sortiert. Öffne jetzt den Tab „Training“, dann schauen wir uns die Übersicht an.',
    'tab-training',
    '/app/start',
    'training-arrived',
    'Öffne „Training“.',
  )
  add(
    'training-overview',
    2,
    'Deine Themen im Überblick',
    entries.length
      ? 'Hier findest du die Übungsaufgaben deines Fachs. Die Themen lassen sich aufklappen; an den Farben erkennst du später deine Markierungen.'
      : 'Hier erscheinen die Übungsaufgaben deines Fachs. Für diese Auswahl sind noch keine Trainingsaufgaben verfügbar. Sobald welche hinzukommen, kannst du sie hier öffnen.',
    'training-overview',
    '/app/training',
  )
  if (examYear !== null) {
    add(
      'list-tab',
      2,
      'Auch für die Prüfung üben',
      selected
        ? 'Für dein Fach gibt es originale Prüfungsaufgaben. Bevor wir eine Trainingsaufgabe öffnen, schauen wir kurz in „Liste“.'
        : 'Für dein Fach gibt es originale Prüfungsaufgaben. Wir schauen jetzt kurz in „Liste“.',
      'tab-list',
      '/app/training',
      'list-arrived',
      'Öffne „Liste“.',
    )
    add(
      'exam-overview',
      2,
      'Nach Jahrgängen sortiert',
      'Hier findest du Prüfungsaufgaben nach Jahrgang oder Sammlung. So kannst du dich gezielt auf das Prüfungsformat vorbereiten.',
      'exam-overview',
      '/app/list',
    )
    add(
      'exam-year',
      2,
      'Eine Sammlung aufklappen',
      'Öffne die hervorgehobene Sammlung. Darunter findest du die einzelnen Prüfungsaufgaben.',
      `exam-year-${examYear}`,
      '/app/list',
      `year-open:${examYear}`,
      'Klappe die Sammlung auf.',
    )
    add(
      'exam-items',
      2,
      'Originale Prüfungsaufgaben',
      'Diese Aufgaben kannst du später genauso öffnen und üben wie Trainingsaufgaben. Jetzt lernen wir zuerst die Werkzeuge kennen.',
      `exam-items-${examYear}`,
      '/app/list',
    )
    add(
      'exam-return',
      2,
      'Zurück zum Training',
      'Wechsle wieder zu „Training“. Dort wählen wir eine Aufgabe für unseren Rundgang aus.',
      'tab-training',
      '/app/list',
      'training-returned',
      'Öffne „Training“.',
    )
  }
  if (selected) {
    add(
      'training-topic',
      2,
      'Ein Thema öffnen',
      'Hier findest du passende Übungen. Klappe das hervorgehobene Thema auf, um eine Aufgabe auszuwählen.',
      `training-topic-${topicIndex}`,
      '/app/training',
      `topic-open:${topicIndex}`,
      'Klappe das hervorgehobene Thema auf.',
    )
    add(
      'training-exercise',
      3,
      'Deine erste Übungsrunde',
      'Öffne diese Aufgabe. Du musst sie jetzt noch nicht lösen: Wir schauen zuerst gemeinsam, was dir beim Üben hilft.',
      `training-exercise-${exerciseId}`,
      '/app/training',
      'exercise-arrived',
      'Öffne die hervorgehobene Aufgabe.',
    )
    add(
      'exercise',
      3,
      'Erst in Ruhe lesen',
      'Hier steht die Aufgabenstellung. Nimm dir zum Rechnen Zeit. Bei Aufgaben mit mehreren Teilen findest du die Teilaufgaben untereinander.',
      'exercise-task',
      taskRoute,
    )
    add(
      'solution-open',
      4,
      'Den Lösungsweg ansehen',
      'Die Lösung hilft dir, deinen eigenen Weg zu vergleichen. Öffne sie jetzt selbst mit „Lösung“.',
      'tool-solution',
      taskRoute,
      'solution-open',
      'Tippe auf „Lösung“.',
    )
    add(
      'solution-view',
      4,
      'Nicht nur das Ergebnis',
      'Lies auch die einzelnen Rechenschritte. Wenn du hängenbleibst, such den ersten Schritt, den du noch nicht verstehst, statt nur das Ergebnis zu übernehmen.',
      'solution-content',
      taskRoute,
    )
    add(
      'solution-close',
      4,
      'Zurück zur Aufgabe',
      'Die Lösung kannst du jederzeit wieder schließen. Tippe noch einmal auf „Lösung“, damit wir das nächste Werkzeug ausprobieren können.',
      'tool-solution',
      taskRoute,
      'solution-close',
      'Schließe „Lösung“.',
    )
    add(
      'repeat',
      5,
      'Noch eine Runde',
      'Mit „Nochmal“ übst du denselben Aufgabentyp erneut. Bei variablen Aufgaben bekommst du neue Zahlen. Probiere den Button jetzt aus.',
      'exercise-repeat',
      taskRoute,
      'repeat',
      'Tippe auf „Nochmal“.',
    )
    add(
      'repeat-view',
      5,
      'Üben, bis es sicher sitzt',
      'So kannst du mehrere Varianten üben, ohne das Thema zu wechseln. Deinen Lösungsweg vergleichst du anschließend wieder mit der passenden Lösung.',
      'exercise-task',
      taskRoute,
    )
    add(
      'mark-open',
      6,
      'Deinen Lernstand festhalten',
      'Manche Aufgaben sitzen schon, andere möchtest du noch einmal ansehen. Öffne „Markieren“, um die Möglichkeiten zu entdecken.',
      'exercise-mark',
      taskRoute,
      'mark-open',
      'Öffne „Markieren“.',
    )
    add(
      'mark-menu',
      6,
      'Deine Markierungen',
      '„Gelöst“ ist für Aufgaben, die du geschafft hast. „Später wiederholen“ und „Merken, wieder versuchen“ helfen dir, gezielt weiterzuüben. Du musst für den Rundgang noch nichts markieren.',
      'mark-menu',
      taskRoute,
    )
    add(
      'scribble-open',
      7,
      'Platz für deinen Rechenweg',
      'Öffne „Scribble“. Dort kannst du direkt schreiben, zeichnen oder eine kleine Skizze machen.',
      'tool-scribble',
      taskRoute,
      'scribble-open',
      'Öffne „Scribble“.',
    )
    add(
      'scribble-view',
      7,
      'Schreiben und ausprobieren',
      'Hier kannst du mit Finger, Stift oder Maus zeichnen. „Undo“ nimmt den letzten Schritt zurück. „Senden“ lässt deinen Rechenweg von der KI prüfen; für den Rundgang brauchst du nichts zu senden.',
      'scribble-content',
      taskRoute,
    )
    add(
      'scribble-close',
      7,
      'Deine Skizze bleibt erhalten',
      'Schließe die Zeichenfläche mit einem weiteren Klick auf „Scribble“. Deine Skizze bleibt während dieser Sitzung bei der Aufgabe erhalten.',
      'tool-scribble',
      taskRoute,
      'scribble-close',
      'Schließe „Scribble“.',
    )
    add(
      'chat-open',
      8,
      'Hilfe, wenn du sie brauchst',
      'Im Chat kannst du mich nach einem Tipp fragen, dir einen Schritt erklären lassen oder deinen Lösungsweg prüfen. Öffne jetzt den Chat.',
      'tool-chat',
      taskRoute,
      'chat-open',
      'Öffne „Chat“.',
    )
    add(
      'chat-view',
      8,
      'Eine passende Hilfe wählen',
      'Der Chat kennt die aktuelle Aufgabe. Er kann dir Tipps geben, einen Lösungsweg erklären oder deine Rechnung prüfen. Die KI kann sich auch irren: Vergleiche wichtige Ergebnisse mit der Lösung.',
      'chat-content',
      taskRoute,
    )
    add(
      'chat-review',
      8,
      'Deinen Lösungsweg prüfen lassen',
      'Öffne „Lösungsweg prüfen“. Hier könntest du deine Rechnung schreiben oder ein Bild senden. Für den Rundgang brauchst du noch nichts einzureichen.',
      'chat-mode-pruefen',
      taskRoute,
      'chat-conversation-ready',
      'Öffne „Lösungsweg prüfen“.',
    )
    add(
      'chat-back',
      8,
      'Eine andere Hilfe ausprobieren',
      'Mit dem Zurück-Pfeil im Chat wechselst du zur Modusauswahl. Dabei wird der aktuelle Chat zurückgesetzt. Probiere den Pfeil jetzt aus.',
      'chat-back',
      taskRoute,
      'chat-overview-open',
      'Tippe auf den Zurück-Pfeil im Chat.',
    )
    add(
      'chat-options',
      8,
      'Du wählst die passende Unterstützung',
      'Du kannst Aufgaben leichter oder schwerer machen, Schritt für Schritt lernen, einen Tipp bekommen oder deinen Lösungsweg prüfen. „Lustige Aufgaben“ gibt dir eine neue Übung mit einer überraschenden Geschichte.',
      'chat-modes',
      taskRoute,
    )
    add(
      'chat-humor',
      8,
      'Eine Aufgabe zum Schmunzeln',
      'Wähle „Lustige Aufgaben“. Der Chat erstellt dann eine neue Aufgabe zum gleichen Thema. Die Lösung bleibt zunächst deine eigene Herausforderung.',
      'chat-mode-humor',
      taskRoute,
      'chat-humor-started',
      'Öffne „Lustige Aufgaben“.',
    )
    add(
      'chat-retry',
      8,
      'Das hat noch nicht geklappt',
      'Die neue Aufgabe konnte nicht geladen werden. Versuche es mit dem Neustart-Pfeil im Chat noch einmal. Du kannst den Rundgang auch überspringen.',
      'chat-restart',
      taskRoute,
      'chat-humor-started',
      'Tippe auf „Modus neu starten“.',
    )
    add(
      'chat-wait',
      8,
      'Deine neue Aufgabe entsteht',
      'Der Chat formuliert gerade deine Übung. Sobald die vollständige Antwort da ist, schließen wir unseren Rundgang ab.',
      'chat-content',
      taskRoute,
      'chat-humor-ready',
      'Warte auf die fertige Aufgabe.',
    )
  }
  add(
    'finish',
    selected ? 8 : 2,
    'Unser Rundgang ist geschafft!',
    selected
      ? 'Deine neue Aufgabe ist da! Du kennst jetzt die wichtigsten Werkzeuge. Gehe zur Startseite und übe in deinem Tempo weiter. Im Profil kannst du unseren Rundgang jederzeit neu starten.'
      : 'Du weißt jetzt, wo du deine Aufgaben findest. Im Profil kannst du den Rundgang jederzeit neu starten, auch wenn später weitere Aufgaben dazukommen.',
    selected ? 'chat-messages' : 'training-overview',
    selected ? taskRoute : '/app/training',
  )
  return { courseId, exerciseId, topicIndex, examYear, steps }
}

export function advanceTutorial(
  record: TutorialRecord,
  plan: TutorialPlan,
  event: TutorialEvent,
): TutorialRecord {
  if (record.status !== 'active') return record
  const index = plan.steps.findIndex(step => step.id === record.step)
  if (index < 0) return record
  if (
    ['chat-wait', 'chat-retry'].includes(record.step) &&
    event === 'chat-overview-open'
  )
    return { ...record, step: 'chat-options' }
  if (record.step === 'chat-wait' && event === 'chat-humor-failed')
    return { ...record, step: 'chat-retry' }
  if (record.step === 'chat-options' && event === 'chat-humor-started')
    return { ...record, step: 'chat-wait' }
  if (plan.steps[index].event !== event) return record
  if (record.step === 'chat-humor') return { ...record, step: 'chat-wait' }
  const next = plan.steps[index + 1]
  return next
    ? { ...record, step: next.id }
    : { ...record, status: 'completed' }
}

export function readTutorialRecord(
  value: string | null,
): TutorialRecord | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(value)
    if (
      parsed?.version !== 1 ||
      !Number.isInteger(parsed.courseId) ||
      parsed.courseId < 1 ||
      typeof parsed.step !== 'string' ||
      !['active', 'completed', 'skipped'].includes(parsed.status)
    )
      return null
    return {
      version: 1,
      courseId: parsed.courseId,
      step: parsed.step,
      status: parsed.status,
    }
  } catch {
    return null
  }
}

export function resumeTutorial(
  record: TutorialRecord,
  plan?: TutorialPlan,
): TutorialRecord {
  const reopen: Record<string, string> = {
    'training-exercise': 'training-topic',
    'solution-view': 'solution-open',
    'solution-close': 'solution-open',
    'mark-menu': 'mark-open',
    'scribble-view': 'scribble-open',
    'scribble-close': 'scribble-open',
    'chat-view': 'chat-open',
    'chat-close': 'chat-open',
    'chat-review': 'chat-open',
    'chat-back': 'chat-open',
    'chat-options': 'chat-open',
    'chat-humor': 'chat-open',
    'chat-retry': 'chat-open',
    'chat-wait': 'chat-open',
    'training-return': 'chat-open',
    'exam-items': 'exam-year',
    finish: plan?.exerciseId != null ? 'chat-open' : 'training-overview',
  }
  const step = reopen[record.step] ?? record.step
  if (
    record.status === 'active' &&
    plan &&
    !plan.steps.some(item => item.id === step)
  )
    return { ...record, step: 'dashboard' }
  return record.status === 'active' ? { ...record, step } : record
}
