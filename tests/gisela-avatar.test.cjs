const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { test } = require('node:test')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const ts = require('typescript')

function load(path, dependencies, windowValue) {
  const { outputText } = ts.transpileModule(
    readFileSync(resolve(__dirname, '../src', path), 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    },
  )
  const module = { exports: {} }
  new Function('require', 'module', 'exports', 'window', outputText)(
    name => {
      assert.ok(Object.hasOwn(dependencies, name), name)
      return dependencies[name]
    },
    module,
    module.exports,
    windowValue,
  )
  return module.exports
}

const { GiselaAvatar } = load('components/gisela/GiselaAvatar.tsx', {
  'react/jsx-runtime': require('react/jsx-runtime'),
})

test('Gisela avatars have stable square dimensions and accessible or decorative labels', () => {
  for (const [expression, asset, label] of [
    ['friendly', 'gisela-head-v1.webp', 'Gisela'],
    ['thinking', 'gisela-thinking-v1.webp', 'Gisela denkt nach'],
  ]) {
    const html = renderToStaticMarkup(
      React.createElement(GiselaAvatar, { expression }),
    )
    assert.ok(html.includes(asset))
    assert.ok(html.includes(`alt="${label}"`))
    assert.match(html, /width="256" height="256"/)
    const webp = readFileSync(resolve(__dirname, '../public/img/gisela', asset))
    assert.equal(webp.toString('ascii', 0, 4), 'RIFF')
    assert.equal(webp.toString('ascii', 8, 12), 'WEBP')
    assert.equal(webp.toString('ascii', 12, 16), 'VP8X')
    assert.ok(webp[20] & 0x10, 'Avatar must preserve transparency')
    assert.ok(
      webp.length < 50000,
      'Tiny avatars must not download megabyte-sized masters',
    )
  }
  const decorative = renderToStaticMarkup(
    React.createElement(GiselaAvatar, { decorative: true }),
  )
  assert.match(decorative, /alt="" aria-hidden="true"/)
})

test('the Chat tool uses Gisela instead of a robot and keeps toggle and tutorial events', () => {
  const state = { chatOverlay: null, needReset2: false }
  const events = []
  const heights = []
  const viewport = { innerHeight: 568 }
  const { ExerciseViewFooter } = load(
    'components/exercise-view/ExerciseViewFooter.tsx',
    {
      react: {
        ...React,
        useEffect: () => {},
        useRef: initial => ({ current: initial }),
        useState: initial => [initial, value => heights.push(value)],
      },
      'react/jsx-runtime': require('react/jsx-runtime'),
      './state/exercise-view-store': {
        ExerciseViewStore: {
          useState: selector => selector(state),
          update: update => update(state),
        },
      },
      '../ui/FaIcon': { FaIcon: () => null },
      '@fortawesome/free-solid-svg-icons': { faQuestionCircle: {}, faPen: {} },
      './SolutionOverlay': { SolutionOverlay: () => null },
      './ChatOverlay': { ChatOverlay: () => null },
      './ScribbleOverlay': { ScribbleOverlay: () => null },
      '@/components/onboarding/TutorialProvider': {
        useTutorial: () => ({ notifyTutorial: event => events.push(event) }),
      },
      '@/components/gisela/GiselaAvatar': { GiselaAvatar },
    },
    viewport,
  )
  function findTool(node) {
    if (!React.isValidElement(node)) return null
    if (node.props['data-tutorial'] === 'tool-chat') return node
    return React.Children.toArray(node.props.children)
      .map(findTool)
      .find(Boolean)
  }
  const button = findTool(ExerciseViewFooter())
  const html = renderToStaticMarkup(button)
  assert.match(html, />Chat</)
  assert.ok(html.includes('gisela-head-v1.webp'))
  assert.ok(!html.includes('KI-Chat'))
  assert.equal(button.props['aria-pressed'], false)
  button.props.onClick()
  assert.equal(state.chatOverlay, 'chat')
  assert.equal(heights.at(-1), (320 / 568) * 100)
  const opened = findTool(ExerciseViewFooter())
  assert.equal(opened.props['aria-pressed'], true)
  opened.props.onClick()
  assert.equal(state.chatOverlay, null)
  assert.deepEqual(events, ['chat-open', 'chat-close'])
  for (const height of [812, 320]) {
    viewport.innerHeight = height
    findTool(ExerciseViewFooter()).props.onClick()
    assert.equal(
      heights.at(-1),
      Math.min(84, Math.max(40, (320 / height) * 100)),
    )
    findTool(ExerciseViewFooter()).props.onClick()
  }
})

test('the solution offers an explanation for the displayed solution and opens Chat', () => {
  const state = {
    chatOverlay: 'solution',
    id: 11,
    navIndicatorPosition: 0,
    pages: [{ index: 'b', context: '1' }],
    _exerciseIDs: [12],
    dataPerExercise: { 1: { answer: 23 } },
    data: { answer: 7 },
  }
  const { SolutionOverlay } = load(
    'components/exercise-view/SolutionOverlay.tsx',
    {
      react: {
        ...React,
        useEffect: () => {},
        useRef: () => ({ current: null }),
      },
      'react/jsx-runtime': require('react/jsx-runtime'),
      '@/helper/prose-wrapper': { proseWrapper: node => node },
      './state/exercise-view-store': {
        ExerciseViewStore: {
          useState: selector => selector(state),
          getRawState: () => state,
          update: update => update(state),
        },
      },
      '@/content/exercises': {
        exercisesData: {
          12: {
            tasks: [
              {
                solution: () =>
                  React.createElement('p', null, 'Andere Teilaufgabe'),
              },
              {
                solution: ({ data }) =>
                  React.createElement('p', null, `Lösung: ${data.answer}`),
              },
            ],
          },
        },
      },
      '@ionic/react': {},
      '@/helper/count-letter': { countLetter: (_letter, i) => ['a', 'b'][i] },
      '@/helper/ai-worksheet-generator': { AiWorksheetGenerator: () => null },
      '@/components/gisela/GiselaAvatar': { GiselaAvatar },
    },
  )
  const tree = SolutionOverlay({ mobileHeightVh: 60 })
  const html = renderToStaticMarkup(tree)
  assert.ok(html.indexOf('Lösung: 23') < html.indexOf('Wie kommt man darauf?'))
  assert.ok(html.includes('gisela-head-v1.webp'))
  assert.ok(!html.includes('Andere Teilaufgabe'))
  function findButton(node) {
    if (!React.isValidElement(node)) return null
    if (node.type === 'button') return node
    return React.Children.toArray(node.props.children)
      .map(findButton)
      .find(Boolean)
  }
  findButton(tree).props.onClick()
  assert.equal(state.chatOverlay, 'chat')
  assert.equal(state.queuedChatSubmission.kind, 'solution-explanation')
  assert.equal(SolutionOverlay({ mobileHeightVh: 60 }), null)
})
