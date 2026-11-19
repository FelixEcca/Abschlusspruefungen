const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { test } = require('node:test')
const { runInNewContext } = require('node:vm')
const ts = require('typescript')

const root = resolve(__dirname, '..')
function load(file, dependencies = {}, globals = {}) {
  const fileName = resolve(root, file)
  const { outputText } = ts.transpileModule(readFileSync(fileName, 'utf8'), {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
    },
  })
  const module = { exports: {} }
  runInNewContext(outputText, {
    module,
    exports: module.exports,
    require: name => {
      assert.ok(Object.hasOwn(dependencies, name), `Unexpected import: ${name}`)
      return dependencies[name]
    },
    ...globals,
  })
  return module.exports
}
const levels = load('src/components/exercise-view/leveling.ts')
function progressStore(saved, react = {}) {
  const items = new Map(
    saved ? [['ap-progress-v1', JSON.stringify(saved)]] : [],
  )
  const storage = {
    getItem: key => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, value),
  }
  const store = load(
    'store/progress-store.ts',
    { react },
    {
      localStorage: storage,
      crypto: require('node:crypto'),
      clearInterval: () => {},
    },
  )
  return { store, storage, items }
}

test('six levels retain percentage goals, with exact boundaries and a full final bar', () => {
  assert.deepEqual(
    Array.from(levels.getLevelThresholds(250)),
    [0, 5, 10, 15, 20, 25],
  )
  for (let level = 2; level <= 6; level++) {
    const goal = (level - 1) * 5
    assert.equal(levels.computeLevelProgress(goal - 1, 250).level, level - 1)
    assert.equal(levels.computeLevelProgress(goal, 250).level, level)
  }
  assert.equal(levels.computeLevelProgress(25, 250).pctWithin, 1)
  assert.equal(levels.computeLevelProgress(30, 250).remainingToNext, 0)
})

test('small and empty courses cannot start at a higher level or skip levels', () => {
  for (const total of [0, 1, 6, 20, NaN]) {
    assert.deepEqual(
      Array.from(levels.getLevelThresholds(total)),
      [0, 1, 2, 3, 4, 5],
    )
    assert.equal(levels.computeLevelProgress(0, total).level, 1)
    assert.equal(levels.computeLevelProgress(1, total).level, 2)
  }
  assert.equal(levels.computeLevelProgress(-10, 100).level, 1)
  assert.equal(levels.computeLevelProgress(NaN, 100).pctWithin, 0)
  assert.deepEqual(
    Array.from(levels.getLevelThresholds(175)),
    [0, 4, 7, 11, 14, 18],
  )
})

test('AV and BFS earn their first levels after one exercise, independently of catalog size', () => {
  for (const course of [1, 5, 6, 7, 8]) {
    const goals = Array.from(levels.getLevelThresholds(197, course))
    assert.deepEqual(goals, [0, 1, 2, 3, 5, 8])
    for (let level = 2; level <= 6; level++) {
      assert.equal(
        levels.computeLevelProgress(goals[level - 1] - 1, 197, course).level,
        level - 1,
      )
      assert.equal(
        levels.computeLevelProgress(goals[level - 1], 197, course).level,
        level,
      )
    }
    assert.equal(levels.computeLevelProgress(1, 197, course).remainingToNext, 1)
  }
  assert.deepEqual(
    Array.from(levels.getLevelThresholds(6, 5)),
    [0, 1, 2, 3, 5, 6],
  )
  for (const course of [2, 3, 4, 11, 13, 18, 24]) {
    assert.deepEqual(
      Array.from(levels.getLevelThresholds(250, course)),
      [0, 5, 10, 15, 20, 25],
    )
  }
})

test('legacy profiles migrate without losing exercises and without a pending celebration', () => {
  const { store } = progressStore({
    version: 1,
    exercises: { 10: { solved: true } },
  })
  assert.equal(store.getStatus(10).solved, true)
  assert.equal(store.getPendingLevelUp(), null)
  assert.equal(Object.keys(store.getProfile().levelMilestones).length, 0)
  store.rememberLevelBaseline(1, 4)
  store.queueLevelUp(
    { courseId: 1, level: 4, solvedCount: 3, totalCount: 10 },
    3,
  )
  assert.equal(store.getPendingLevelUp(), null)
})

test('only a real newly solved exercise emits an achievement event', () => {
  const { store } = progressStore()
  const events = []
  const unsubscribe = store.subscribeExerciseSolved(id => events.push(id))
  store.setExerciseLearningStatus(10, 'later')
  store.setExerciseLearningStatus(10, 'retry')
  store.setExerciseLearningStatus(10, 'solved')
  store.markSolved(10)
  store.recordAttempt(10, true)
  store.markSolved(10, false)
  store.markSolved(10)
  assert.deepEqual(events, [10, 10])
  unsubscribe()
  store.markSolved(11)
  assert.deepEqual(events, [10, 10])
})

test('dashboard profile snapshots update counts without mutating the previous render', () => {
  const updates = []
  const effects = []
  const { store } = progressStore(undefined, {
    useState: initial => [initial(), value => updates.push(value)],
    useEffect: fn => effects.push(fn),
  })
  const initial = store.useProfile()
  const cleanup = effects[0]()
  store.markSolved(10)
  assert.equal(updates.length, 1)
  assert.equal(updates[0].exercises[10].solved, true)
  assert.equal(initial.exercises[10], undefined)
  assert.notEqual(updates[0], initial)
  assert.notEqual(updates[0].exercises, initial.exercises)
  cleanup()
})

test('level milestones persist across reloads, undo and re-marking', () => {
  const { store, items } = progressStore()
  const achievement = { courseId: 6, level: 2, solvedCount: 3, totalCount: 150 }
  store.rememberLevelBaseline(6, 1)
  store.queueLevelUp(achievement, 1)
  assert.equal(store.getPendingLevelUp().level, 2)
  const restored = progressStore(JSON.parse(items.get('ap-progress-v1'))).store
  assert.equal(restored.getPendingLevelUp().level, 2)
  restored.dismissLevelUp()
  restored.queueLevelUp(achievement, 1)
  assert.equal(restored.getPendingLevelUp(), null)
  restored.rememberLevelBaseline(6, 1)
  assert.equal(restored.getProfile().levelMilestones[6], 2)
  restored.queueLevelUp({ ...achievement, level: 3, solvedCount: 6 }, 2)
  assert.equal(restored.getPendingLevelUp().level, 3)
  restored.resetProfile()
  assert.equal(restored.getPendingLevelUp(), null)
  assert.equal(Object.keys(restored.getProfile().levelMilestones).length, 0)
})

test('imports do not emit solve events and preserve the highest celebrated level', () => {
  const { store } = progressStore()
  let events = 0
  store.subscribeExerciseSolved(() => events++)
  store.rememberLevelBaseline(6, 4)
  store.mergeProfile({
    ...store.emptyProfile(),
    levelMilestones: { 6: 2 },
    exercises: { 10: { solved: true } },
  })
  assert.equal(events, 0)
  assert.equal(store.getProfile().levelMilestones[6], 4)
  assert.equal(store.getPendingLevelUp(), null)
})

test('malformed persisted achievements are discarded without clearing valid progress', () => {
  const { store } = progressStore({
    version: 1,
    exercises: { 10: { solved: true } },
    levelMilestones: { 6: 2, 7: 30, x: 3 },
    pendingLevelUp: { courseId: 6, level: 10, solvedCount: 1, totalCount: 10 },
  })
  assert.equal(store.getProfile().levelMilestones[6], 2)
  assert.equal(store.getProfile().levelMilestones[7], undefined)
  assert.equal(store.getPendingLevelUp(), null)
  assert.equal(store.getStatus(10).solved, true)
})

function celebrationHarness(saved) {
  const { store } = progressStore(saved)
  const profile = { currentExam: 6, name: 'Alex' }
  const route = { pathname: '/exercise/10' }
  const history = {
    replacements: [],
    replace: path => history.replacements.push(path),
  }
  const effects = []
  const tutorial = { active: false }
  const exerciseView = { chatOverlay: 'solution' }
  const React = require('react')
  const component = load('src/components/progress/LevelUpCelebration.tsx', {
    react: {
      ...React,
      useMemo: fn => fn(),
      useEffect: fn => effects.push(fn),
      useSyncExternalStore: (_subscribe, snapshot) => snapshot(),
    },
    'react/jsx-runtime': require('react/jsx-runtime'),
    'react-router-dom': { useHistory: () => history, useLocation: () => route },
    '@/content/exercises': {
      exercisesData: { 10: {}, 11: {}, 12: {}, 99: {} },
    },
    '@/content/navigation-exercises': {
      isExerciseForNavigation: (course, id) => course === 6 && id < 99,
    },
    '@/components/exercise-view/leveling': levels,
    '@/components/exercise-view/state/exercise-view-store': {
      ExerciseViewStore: { update: fn => fn(exerciseView) },
    },
    '@/components/onboarding/TutorialProvider': { useTutorial: () => tutorial },
    '../../../store/player-profile-store': {
      PlayerProfileStore: {
        useState: fn => fn(profile),
        getRawState: () => profile,
      },
    },
    '../../../store/progress-store': store,
    './LevelUpPopover': { LevelUpPopover: () => null },
  })
  return {
    store,
    route,
    history,
    effects,
    tutorial,
    profile,
    exerciseView,
    render: component.LevelUpCelebration,
  }
}

test('crossing a level navigates to Start, closes tools and displays Gisela there', () => {
  const h = celebrationHarness()
  h.render()
  const cleanup = h.effects.shift()()
  h.effects.shift()()
  h.store.markSolved(99)
  assert.equal(h.store.getPendingLevelUp(), null)
  h.store.setExerciseLearningStatus(10, 'solved')
  assert.equal(h.store.getPendingLevelUp().level, 2)
  assert.equal(h.render(), null)
  h.effects.pop()()
  assert.deepEqual(h.history.replacements, ['/app/start'])
  assert.equal(h.exerciseView.chatOverlay, null)
  h.route.pathname = '/app/start'
  const popover = h.render()
  assert.equal(popover.props.achievement.level, 2)
  assert.equal(popover.props.name, 'Alex')
  cleanup()
})

test('hydration, legacy imports and course changes never celebrate old progress', () => {
  const h = celebrationHarness({
    version: 1,
    exercises: { 10: { solved: true } },
  })
  h.render()
  const cleanup = h.effects.shift()()
  h.effects.shift()()
  assert.equal(h.store.getPendingLevelUp(), null)
  h.store.mergeProfile({
    ...h.store.emptyProfile(),
    exercises: { 11: { solved: true } },
  })
  assert.equal(h.store.getProfile().levelMilestones[6], 3)
  h.store.markSolved(11, false)
  h.store.markSolved(11)
  assert.equal(h.store.getPendingLevelUp(), null)
  h.profile.currentExam = 1
  h.store.markSolved(12)
  assert.equal(h.store.getPendingLevelUp(), null)
  cleanup()
})

test('an active tutorial finishes before a pending level-up can interrupt it', () => {
  const h = celebrationHarness()
  h.render()
  const cleanup = h.effects.shift()()
  h.effects.shift()()
  h.store.markSolved(10)
  h.tutorial.active = true
  assert.equal(h.render(), null)
  h.effects.pop()()
  assert.equal(h.history.replacements.length, 0)
  assert.equal(h.store.getPendingLevelUp().level, 2)
  h.tutorial.active = false
  h.render()
  h.effects.pop()()
  assert.deepEqual(h.history.replacements, ['/app/start'])
  cleanup()
})

test('changed level rules do not replay an outdated saved celebration', () => {
  const h = celebrationHarness({
    version: 1,
    exercises: {},
    levelMilestones: { 6: 2 },
    pendingLevelUp: { courseId: 6, level: 2, solvedCount: 4, totalCount: 197 },
  })
  assert.equal(h.render(), null)
  const [subscribe, validate, navigate] = h.effects.splice(0)
  const cleanup = subscribe()
  validate()
  navigate()
  assert.equal(h.store.getPendingLevelUp(), null)
  assert.equal(h.history.replacements.length, 0)
  cleanup()
})

test('celebration copy, speech bubble, final level and accessible dismissal', () => {
  const React = require('react')
  const module = load(
    'src/components/progress/LevelUpPopover.tsx',
    {
      react: {
        ...React,
        useEffect: () => {},
        useId: () => 'test-title',
        useRef: () => ({ current: null }),
      },
      'react/jsx-runtime': require('react/jsx-runtime'),
      'react-dom': { createPortal: node => node },
      '@fortawesome/free-solid-svg-icons': { faArrowRight: {}, faTrophy: {} },
      '@/components/ui/FaIcon': { FaIcon: () => null },
      '@/components/gisela/Gisela': {
        Gisela: () => React.createElement('img', { alt: 'Gisela' }),
      },
      '@/components/gisela/gisela-looks': { getGiselaLook: () => 'workshop' },
      '@/components/exercise-view/leveling': levels,
      '@/content/navigations': {
        navigationData: { 6: { shortTitle: 'AV Mathematik' } },
      },
      './LevelUpPopover.module.css': { default: {} },
    },
    { document: { body: {} } },
  )
  let closed = false
  const tree = module.LevelUpPopover({
    achievement: { courseId: 6, level: 6, solvedCount: 5, totalCount: 10 },
    name: 'Alex',
    onClose: () => {
      closed = true
    },
  })
  const html = require('react-dom/server').renderToStaticMarkup(tree)
  assert.ok(html.includes('Level 6 erreicht!'))
  assert.ok(html.includes('Klasse, Alex!'))
  assert.ok(html.includes('höchste Level'))
  assert.ok(!html.includes('bis Level'))
  assert.ok(html.includes('aria-labelledby'))
  tree.props.onCancel({ preventDefault: () => {} })
  assert.equal(closed, true)
  const css = readFileSync(
    resolve(root, 'src/components/progress/LevelUpPopover.module.css'),
    'utf8',
  )
  assert.ok(css.includes('prefers-reduced-motion'))
})
