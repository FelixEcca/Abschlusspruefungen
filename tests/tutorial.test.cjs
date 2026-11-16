const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { test } = require('node:test')
const ts = require('typescript')

function load(name) {
  const path = resolve(__dirname, '../src/components/onboarding', name)
  const module = { exports: {} }
  const { outputText } = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  })
  new Function('module', 'exports', outputText)(module, module.exports)
  return module.exports
}

const {
  buildTutorialPlan,
  advanceTutorial,
  readTutorialRecord,
  resumeTutorial,
} = load('tutorial-model.ts')
const { positionGuide, guideWidth } = load('tutorial-position.ts')
const navigation = {
  1: {
    topics: [{ skillGroups: [{ skillExercises: [{ id: 10 }, { id: 11 }] }] }],
  },
  2: { topics: [{ skillGroups: [{ skillExercises: [{ id: 999 }] }] }] },
  3: { topics: [] },
}
const catalog = {
  10: { tasks: [{}] },
  11: {},
  100: { source: 'Prüfung 2025' },
  101: { source: 'Prüfung 2024' },
}
const isExam = (course, id) => course === 1 && id >= 100

test('tour chooses a registered exercise and only shows exams for the selected course', () => {
  const plan = buildTutorialPlan(1, navigation, catalog, isExam)
  assert.equal(plan.exerciseId, 11)
  assert.equal(plan.topicIndex, 0)
  assert.equal(plan.examYear, 2025)
  assert.ok(plan.steps.some(step => step.id === 'exam-year'))
  assert.ok(
    plan.steps.findIndex(step => step.id === 'exam-return') <
      plan.steps.findIndex(step => step.id === 'training-topic'),
  )
  const empty = buildTutorialPlan(2, navigation, catalog, isExam)
  assert.equal(empty.exerciseId, null)
  assert.equal(empty.examYear, null)
  assert.ok(!empty.steps.some(step => step.route.startsWith('/exercise/')))
  assert.ok(empty.steps.every(step => !step.id.startsWith('exam-')))
  assert.equal(empty.steps.at(-1).id, 'finish')
})

test('each action requires its own event; next cannot open tools or skip clicks', () => {
  const plan = buildTutorialPlan(1, navigation, catalog, isExam)
  let state = { version: 1, courseId: 1, step: 'dashboard', status: 'active' }
  const visited = []
  while (state.status === 'active') {
    const step = plan.steps.find(step => step.id === state.step)
    assert.ok(step)
    visited.push(step.id)
    assert.ok(visited.length <= plan.steps.length)
    if (step.event !== 'next')
      assert.equal(advanceTutorial(state, plan, 'next'), state)
    assert.equal(advanceTutorial(state, plan, 'topic-open:88'), state)
    state = advanceTutorial(state, plan, step.event)
  }
  assert.equal(state.status, 'completed')
  assert.ok(!visited.includes('chat-retry'))
  assert.deepEqual(visited.slice(-7), [
    'chat-view',
    'chat-review',
    'chat-back',
    'chat-options',
    'chat-humor',
    'chat-wait',
    'finish',
  ])
  assert.equal(advanceTutorial(state, plan, 'next'), state)
  const skipped = { ...state, step: 'dashboard', status: 'skipped' }
  assert.equal(advanceTutorial(skipped, plan, 'next'), skipped)
})

test('chat completion waits for success and supports retries or returning to modes', () => {
  const plan = buildTutorialPlan(1, navigation, catalog, isExam)
  let state = { version: 1, courseId: 1, step: 'chat-humor', status: 'active' }
  state = advanceTutorial(state, plan, 'chat-humor-started')
  assert.equal(state.step, 'chat-wait')
  assert.equal(advanceTutorial(state, plan, 'next'), state)
  state = advanceTutorial(state, plan, 'chat-humor-failed')
  assert.equal(state.step, 'chat-retry')
  assert.equal(advanceTutorial(state, plan, 'next'), state)
  assert.equal(advanceTutorial(state, plan, 'chat-humor-ready'), state)
  state = advanceTutorial(state, plan, 'chat-humor-started')
  assert.equal(state.step, 'chat-wait')
  const back = advanceTutorial(state, plan, 'chat-overview-open')
  assert.equal(back.step, 'chat-options')
  assert.equal(advanceTutorial(back, plan, 'chat-humor-ready'), back)
  assert.equal(
    advanceTutorial(back, plan, 'chat-humor-started').step,
    'chat-wait',
  )
  state = advanceTutorial(state, plan, 'chat-humor-ready')
  assert.equal(state.step, 'finish')
  assert.equal(state.status, 'active')
  assert.equal(advanceTutorial(state, plan, 'next').status, 'completed')
})

test('tutorial pointerdown does not close the mark menu before Weiter advances to Scribble', () => {
  const React = require('react')
  const plan = buildTutorialPlan(1, navigation, catalog, isExam)
  let state = { version: 1, courseId: 1, step: 'mark-menu', status: 'active' }
  let menuOpen = true
  let propagationStopped = false
  let hookIndex = 0
  const { outputText } = ts.transpileModule(
    readFileSync(
      resolve(__dirname, '../src/components/onboarding/TutorialOverlay.tsx'),
      'utf8',
    ),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    },
  )
  const dependencies = {
    react: {
      ...React,
      useId: () => 'test-mask',
      useRef: () => ({ current: null }),
      useEffect: () => {},
      useLayoutEffect: () => {},
      useState: initial => [
        hookIndex++ === 0
          ? { left: 20, top: 80, width: 256, height: 200 }
          : initial,
        () => {},
      ],
    },
    'react/jsx-runtime': require('react/jsx-runtime'),
    'react-dom': { createPortal: node => node },
    '@fortawesome/free-solid-svg-icons': { faArrowRight: {} },
    '@/components/ui/FaIcon': { FaIcon: () => null },
    '@/components/gisela/Gisela': { Gisela: () => null },
    './tutorial-position': { guideWidth, positionGuide },
    './TutorialOverlay.module.css': { default: {} },
  }
  const module = { exports: {} }
  new Function(
    'require',
    'module',
    'exports',
    'window',
    'document',
    outputText,
  )(
    name => {
      assert.ok(Object.hasOwn(dependencies, name), name)
      return dependencies[name]
    },
    module,
    module.exports,
    { innerWidth: 1280, innerHeight: 720 },
    { body: {} },
  )
  const next = () => {
    state = advanceTutorial(state, plan, 'next')
  }
  const layer = module.exports.TutorialOverlay({
    step: plan.steps.find(step => step.id === state.step),
    plan,
    name: 'Mika',
    wrongRoute: false,
    onNext: next,
    onSkip: () => {},
    onRecover: () => {
      state = resumeTutorial(state, plan)
    },
  })
  function findNext(node) {
    if (!React.isValidElement(node)) return null
    if (node.type === 'button' && node.props.onClick === next) return node
    return React.Children.toArray(node.props.children)
      .map(findNext)
      .find(Boolean)
  }
  const button = findNext(layer)
  assert.ok(button)
  layer.props.onPointerDown?.({
    stopPropagation: () => {
      propagationStopped = true
    },
  })
  // Simulate the document's outside-pointer handler before the later click event.
  if (!propagationStopped) menuOpen = false
  assert.equal(
    menuOpen,
    true,
    'The highlighted menu must survive pointerdown on Weiter',
  )
  button.props.onClick()
  assert.equal(state.step, 'scribble-open')
  assert.equal(plan.steps.find(step => step.id === state.step).section, 7)
})

test('storage validation and refresh recovery never open a tool automatically', () => {
  for (const raw of [
    null,
    '',
    '{',
    'null',
    '{}',
    '{"version":2}',
    '{"version":1,"courseId":1,"step":"dashboard","status":"wrong"}',
  ])
    assert.equal(readTutorialRecord(raw), null)
  const state = {
    version: 1,
    courseId: 1,
    step: 'solution-view',
    status: 'active',
  }
  assert.deepEqual(readTutorialRecord(JSON.stringify(state)), state)
  assert.equal(resumeTutorial(state).step, 'solution-open')
  assert.equal(
    resumeTutorial({ ...state, step: 'scribble-view' }).step,
    'scribble-open',
  )
  assert.equal(
    resumeTutorial({ ...state, step: 'mark-menu' }).step,
    'mark-open',
  )
  assert.equal(
    resumeTutorial({ ...state, status: 'completed' }).step,
    'solution-view',
  )
  const plan = buildTutorialPlan(1, navigation, catalog, isExam)
  assert.equal(
    resumeTutorial({ ...state, step: 'finish' }, plan).step,
    'chat-open',
  )
  for (const step of [
    'chat-back',
    'chat-wait',
    'chat-retry',
    'training-return',
    'chat-close',
  ])
    assert.equal(resumeTutorial({ ...state, step }, plan).step, 'chat-open')
  assert.equal(
    resumeTutorial({ ...state, step: 'obsolete-step' }, plan).step,
    'dashboard',
  )
  const empty = buildTutorialPlan(2, navigation, catalog, isExam)
  assert.equal(
    resumeTutorial({ ...state, courseId: 2, step: 'finish' }, empty).step,
    'training-overview',
  )
})

test('guide stays in the viewport and avoids a highlighted button on desktop and mobile', () => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 375, height: 812 },
    { width: 1280, height: 900 },
  ]) {
    const target = {
      left: 12,
      top: viewport.height - 64,
      width: 100,
      height: 44,
    }
    const width = guideWidth(target, viewport.width, viewport.height)
    const height = 260
    const placed = positionGuide(target, width, height, viewport)
    assert.ok(placed.left >= 12)
    assert.ok(placed.top >= 12)
    assert.ok(placed.left + width <= viewport.width - 12)
    assert.ok(placed.top + height <= viewport.height - 12)
    const overlaps =
      placed.left < target.left + target.width &&
      placed.left + width > target.left &&
      placed.top < target.top + target.height &&
      placed.top + height > target.top
    assert.equal(overlaps, false)
  }
  assert.equal(
    guideWidth({ left: 900, top: 8, width: 360, height: 880 }, 1280, 900),
    360,
  )
  assert.ok(
    guideWidth({ left: 284, top: 8, width: 360, height: 880 }, 660, 900) <= 252,
  )
})

test('dashboard progress uses one subscription and only counts the selected course', () => {
  let course = 1
  let subscriptions = 0
  const source = readFileSync(
    resolve(__dirname, '../src/components/exercise-view/LevelingPanel.tsx'),
    'utf8',
  )
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  })
  const dependencies = {
    react: {
      ...require('react'),
      useMemo: factory => factory(),
      useSyncExternalStore: (_subscribe, snapshot) => {
        subscriptions++
        return snapshot()
      },
    },
    'react/jsx-runtime': require('react/jsx-runtime'),
    './leveling': {
      MAX_LEVEL: 6,
      computeLevelProgress: count => ({
        level: 1,
        pctWithin: count / 12,
        remainingToNext: 12 - count,
        nextLevel: 2,
      }),
    },
    '@/content/exercises': { exercisesData: { 10: {}, 11: {}, 12: {} } },
    '@/content/navigation-exercises': {
      isExerciseForNavigation: (id, exercise) =>
        id === 1 ? exercise === 10 : id === 2,
    },
    '../../../store/player-profile-store': {
      PlayerProfileStore: {
        useState: selector => selector({ currentExam: course }),
      },
    },
    '../../../store/progress-store': {
      getStatus: () => ({ solved: true }),
      subscribeProgress: () => () => {},
    },
  }
  const module = { exports: {} }
  new Function('require', 'module', 'exports', outputText)(
    name => {
      assert.ok(Object.hasOwn(dependencies, name), name)
      return dependencies[name]
    },
    module,
    module.exports,
  )
  const render = require('react-dom/server').renderToStaticMarkup
  for (const [id, remaining] of [
    [1, 11],
    [2, 9],
    [3, null],
  ]) {
    course = id
    subscriptions = 0
    const html = render(module.exports.default())
    assert.equal(subscriptions, 1)
    assert.ok(
      html.includes(
        remaining === null ? 'Kurs wird vorbereitet' : `<b>${remaining}</b>`,
      ),
    )
  }
})
