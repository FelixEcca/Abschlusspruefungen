const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { test } = require('node:test')
const React = require('react')
const ts = require('typescript')

const { outputText } = ts.transpileModule(
  readFileSync(
    resolve(__dirname, '../src/components/exercise-view/ChatOverlay.tsx'),
    'utf8',
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  },
)

function createChat(fetch, context = 'Berechne 3 + 4. Lösung: 7.') {
  const events = []
  const requests = []
  const refs = []
  let effects = []
  let refIndex = 0
  const state = {
    chatOverlay: 'chat',
    chatMode: null,
    chatMessages: [],
    chatPending: false,
    pages: [],
    navIndicatorPosition: 0,
    id: 11,
    _exerciseIDs: [],
    data: {},
    dataPerExercise: {},
    queuedChatSubmission: null,
  }
  const store = {
    useState: selector => selector(state),
    getRawState: () => state,
    update: update => update(state),
  }
  const dependencies = {
    react: {
      ...React,
      useState: initial => [initial, () => {}],
      useEffect: (callback, deps) => effects.push({ callback, deps }),
      useMemo: factory => factory(),
      useRef: initial =>
        refs[refIndex++] ?? (refs[refIndex - 1] = { current: initial }),
    },
    'react/jsx-runtime': require('react/jsx-runtime'),
    'react-dom': { createPortal: node => node },
    clsx: { default: require('clsx') },
    '../ui/FaIcon': { FaIcon: () => null },
    '@fortawesome/free-solid-svg-icons': {},
    'react-textarea-autosize': { default: () => null },
    'react-markdown': { default: () => null },
    'remark-math': { default: () => null },
    'rehype-katex': { default: () => null },
    './state/exercise-view-store': { ExerciseViewStore: store },
    '@/content/exercises': { exercisesData: { 11: {} } },
    '@/components/gisela/GiselaAvatar': { GiselaAvatar: () => null },
    '@/components/gisela/Gisela': { Gisela: () => null },
    './ChatOverlay.module.css': { default: {} },
    './extractor/extractor': { extractor: () => context },
    '@/components/onboarding/TutorialProvider': {
      useTutorial: () => ({
        notifyTutorial: event => events.push(event),
        stepId: 'chat-humor',
      }),
    },
  }
  const module = { exports: {} }
  new Function('require', 'module', 'exports', 'fetch', outputText)(
    name => {
      assert.ok(Object.hasOwn(dependencies, name), name)
      return dependencies[name]
    },
    module,
    module.exports,
    (url, options) => {
      requests.push({ url, ...options })
      return fetch(url, options)
    },
  )
  function render() {
    refIndex = 0
    effects = []
    return module.exports.ChatOverlay({ mobileHeightVh: 75 })
  }
  function find(node, predicate) {
    if (!React.isValidElement(node)) return null
    if (predicate(node)) return node
    return React.Children.toArray(node.props.children)
      .map(child => find(child, predicate))
      .find(Boolean)
  }
  const start = mode => {
    const card = find(
      render(),
      node => node.props.mode === mode && node.props.onClick,
    )
    assert.ok(card)
    card.props.onClick(mode)
  }
  const click = target => {
    const button = find(
      render(),
      node => node.props['data-tutorial'] === target,
    )
    assert.ok(button)
    button.props.onClick()
  }
  const consumeSubmission = () => {
    const submission = state.queuedChatSubmission
    render()
    const effect = effects.find(effect => effect.deps?.includes(submission))
    assert.ok(effect)
    effect.callback()
    return effect.callback
  }
  return {
    events,
    requests,
    state,
    start,
    click,
    render,
    find,
    consumeSubmission,
  }
}

const flush = () => new Promise(resolve => setImmediate(resolve))

test('Gisela greets with an animated figure only while choosing a chat mode', () => {
  const chat = createChat(() => {
    throw new Error('No API call needed')
  })
  const welcome = () =>
    chat.find(chat.render(), node => node.props['data-chat-welcome'] === 'true')
  assert.ok(welcome())
  assert.equal(
    chat.find(welcome(), node => node.type === 'h2').props.children,
    'Wie kann ich dir helfen?',
  )
  assert.ok(chat.find(welcome(), node => node.props.animated === true))
  chat.start('pruefen')
  assert.equal(welcome(), undefined)
  chat.click('chat-back')
  assert.ok(welcome())
  assert.equal(chat.requests.length, 0)
})

test('Gisela stays thoughtful during streaming and stops thinking after completion', async () => {
  let stream
  const chat = createChat(
    async () =>
      new Response(
        new ReadableStream({
          start: controller => {
            stream = controller
          },
        }),
      ),
  )
  assert.equal(
    chat.find(chat.render(), node => node.props.role === 'status'),
    undefined,
  )
  chat.start('humor')
  const status = () =>
    chat.find(chat.render(), node => node.props.role === 'status')
  assert.ok(status())
  assert.ok(chat.find(status(), node => node.props.expression === 'thinking'))
  assert.ok(
    chat
      .find(status(), node => node.type === 'span')
      .props.children.includes('Gisela denkt nach'),
  )
  stream.enqueue(new TextEncoder().encode('Eine neue Aufgabe'))
  await flush()
  assert.ok(
    status(),
    'The thinking indicator must remain while the answer is streaming',
  )
  stream.close()
  await flush()
  assert.equal(status(), undefined)
  assert.equal(
    chat.find(chat.render(), node => node.props.expression === 'friendly'),
    undefined,
    'No redundant avatar remains in the conversation header',
  )
})

test('solution explanation consumes the request once with the current subtask and reference', async () => {
  const chat = createChat(async () => new Response('Ausführliche Erklärung.'))
  chat.state.pages = [{ index: 'b' }]
  chat.state.chatMessages = [{ role: 'assistant', content: 'Altes Gespräch' }]
  chat.state.queuedChatSubmission = {
    id: 'explain-1',
    kind: 'solution-explanation',
  }
  const repeatEffect = chat.consumeSubmission()
  repeatEffect()
  await flush()
  assert.equal(chat.state.queuedChatSubmission, null)
  assert.equal(chat.state.chatMode, 'erklaeren')
  assert.equal(chat.requests.length, 1)
  const payload = JSON.parse(chat.requests[0].body)
  assert.equal(payload.learningMode, 'erklaeren')
  assert.equal(payload.review, false)
  assert.ok(payload.messages.at(-1).content.includes('Teilaufgabe b)'))
  assert.ok(payload.messages.some(m => m.content.includes('Lösung: 7.')))
  assert.ok(
    payload.messages.some(m =>
      m.content.includes('einschließlich des Ergebnisses'),
    ),
  )
  assert.ok(!payload.messages.some(m => m.content.includes('Altes Gespräch')))
  chat.click('chat-back')
  assert.equal(chat.state.chatMode, null)
})

test('explanation requests small steps and provides KaTeX-valid formatting examples', async () => {
  const chat = createChat(async () => new Response('Erklärung.'))
  chat.state.pages = [{ index: 'single' }]
  chat.state.queuedChatSubmission = {
    id: 'simple-explanation',
    kind: 'solution-explanation',
  }
  chat.consumeSubmission()
  await flush()
  const payload = JSON.parse(chat.requests[0].body)
  const instruction = payload.messages.find(m =>
    m.content.startsWith('Modus-Anweisung:'),
  ).content
  assert.ok(instruction.includes('sehr einfache Sprache und kurze Sätze'))
  assert.ok(
    instruction.includes('nur eine neue Rechenoperation oder Umformung'),
  )
  assert.ok(instruction.includes('Zeige jede Zwischenrechnung einzeln'))
  assert.ok(instruction.includes('was du machst und warum'))
  assert.ok(instruction.includes('paarige Dollarzeichen'))
  assert.ok(instruction.includes(String.raw`\frac{\mathrm{m}}{\mathrm{s}}`))
  assert.ok(
    !instruction.includes('\\\\frac'),
    'Commands must not be double-escaped',
  )

  const { default: ReactMarkdown } = await import('react-markdown')
  const { default: remarkMath } = await import('remark-math')
  const { default: rehypeKatex } = await import('rehype-katex')
  const { renderToStaticMarkup } = require('react-dom/server')
  const katex = require('katex')
  const exampleLine = instruction
    .split('\n')
    .find(line => line.startsWith('- Gültige Beispiele:'))
  const examples = Array.from(exampleLine.matchAll(/\$([^$]+)\$/g), m => m[1])
  assert.equal(examples.length, 5)
  for (const example of [...examples, '3{,}5']) {
    assert.doesNotThrow(() =>
      katex.renderToString(example, { throwOnError: true, strict: 'error' }),
    )
  }
  const markup = renderToStaticMarkup(
    React.createElement(ReactMarkdown, {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
      children: exampleLine,
    }),
  )
  assert.equal((markup.match(/class="katex"/g) ?? []).length, 5)
  assert.ok(!markup.includes('katex-error'))
})

test('opening a solution explanation cancels any previous generation', async () => {
  let oldStream
  let attempt = 0
  const chat = createChat(async () => {
    attempt++
    return attempt === 1
      ? new Response(
          new ReadableStream({
            start: c => {
              oldStream = c
            },
          }),
        )
      : new Response('Die Lösung erklärt.')
  })
  chat.start('humor')
  await flush()
  chat.state.pages = [{ index: 'single' }]
  chat.state.queuedChatSubmission = {
    id: 'explain-2',
    kind: 'solution-explanation',
  }
  chat.consumeSubmission()
  assert.equal(chat.requests[0].signal.aborted, true)
  oldStream.enqueue(new TextEncoder().encode('Verspätete Antwort'))
  oldStream.close()
  await flush()
  assert.equal(chat.state.chatMessages.at(-1).content, 'Die Lösung erklärt.')
  const payload = JSON.parse(chat.requests[1].body)
  assert.ok(!payload.messages.at(-1).content.includes('Teilaufgabe'))
  assert.ok(!chat.events.includes('chat-humor-ready'))
})

test('scribble submissions still open the review mode with the image', async () => {
  const chat = createChat(async () =>
    Response.json({ text: 'Das ist richtig.' }),
  )
  chat.state.queuedChatSubmission = {
    id: 'scribble-1',
    content: 'Prüfe mein Bild.',
    attachment: { kind: 'image', src: 'data:image/png;base64,TEST' },
  }
  chat.consumeSubmission()
  await flush()
  assert.equal(chat.state.chatMode, 'pruefen')
  const payload = JSON.parse(chat.requests[0].body)
  assert.equal(payload.review, true)
  assert.equal(payload.learningMode, 'pruefen')
  assert.equal(payload.messages.at(-1).content[1].type, 'image')
})

test('humor signals completion only after the full answer has streamed', async () => {
  let stream
  const chat = createChat(
    async () =>
      new Response(
        new ReadableStream({
          start: controller => {
            stream = controller
          },
        }),
      ),
  )
  chat.start('humor')
  assert.deepEqual(chat.events, ['chat-humor-started'])
  assert.equal(chat.state.chatPending, true)
  assert.equal(chat.requests[0].url, '/api/va89kjds')
  const payload = JSON.parse(chat.requests[0].body)
  assert.equal(payload.learningMode, 'humor')
  assert.equal(payload.stream, true)
  assert.ok(
    payload.messages.some(message =>
      message.content.includes('Interne fachliche Referenz'),
    ),
  )
  stream.enqueue(new TextEncoder().encode('Ein Roboter sammelt '))
  await flush()
  assert.deepEqual(chat.events, ['chat-humor-started'])
  assert.equal(chat.state.chatPending, true)
  stream.enqueue(new TextEncoder().encode('3 und 4 Akkus. Wie viele sind es?'))
  stream.close()
  await flush()
  assert.deepEqual(chat.events, ['chat-humor-started', 'chat-humor-ready'])
  assert.equal(chat.state.chatPending, false)
  assert.equal(
    chat.state.chatMessages.at(-1).content,
    'Ein Roboter sammelt 3 und 4 Akkus. Wie viele sind es?',
  )
})

test('failed or empty answers do not finish the tour and restart can recover', async () => {
  let attempt = 0
  const chat = createChat(async () => {
    attempt++
    return attempt === 1
      ? Response.json(
          { error: 'Die KI-Funktionen sind nicht konfiguriert.' },
          { status: 503 },
        )
      : new Response('Eine neue Übung: Berechne 3 + 4.')
  })
  chat.start('humor')
  await flush()
  assert.deepEqual(chat.events, ['chat-humor-started', 'chat-humor-failed'])
  assert.equal(chat.state.chatPending, false)
  chat.click('chat-restart')
  await flush()
  assert.deepEqual(chat.events, [
    'chat-humor-started',
    'chat-humor-failed',
    'chat-humor-started',
    'chat-humor-ready',
  ])
  const empty = createChat(async () => new Response('   '))
  empty.start('humor')
  await flush()
  assert.deepEqual(empty.events, ['chat-humor-started', 'chat-humor-failed'])
})

test('returning to modes cancels generation and ignores late chunks or errors', async () => {
  let stream
  const chat = createChat(
    async () =>
      new Response(
        new ReadableStream({
          start: controller => {
            stream = controller
          },
        }),
      ),
  )
  chat.start('humor')
  await flush()
  chat.click('chat-back')
  assert.equal(chat.requests[0].signal.aborted, true)
  assert.equal(chat.state.chatMode, null)
  assert.equal(chat.state.chatPending, false)
  stream.enqueue(new TextEncoder().encode('Diese Antwort kommt zu spät.'))
  stream.close()
  await flush()
  assert.deepEqual(chat.events, ['chat-humor-started', 'chat-overview-open'])
  assert.deepEqual(chat.state.chatMessages, [])
  let reject
  const failed = createChat(
    () =>
      new Promise((_resolve, rejectRequest) => {
        reject = rejectRequest
      }),
  )
  failed.start('humor')
  failed.click('chat-back')
  reject(new Error('Late error'))
  await flush()
  assert.deepEqual(failed.events, ['chat-humor-started', 'chat-overview-open'])
})

test('opening the review mode is local and missing context is not a success', async () => {
  const chat = createChat(() => {
    throw new Error('Review should not call the API')
  })
  chat.start('pruefen')
  assert.equal(chat.requests.length, 0)
  assert.equal(chat.state.chatMessages.length, 1)
  const missing = createChat(() => {
    throw new Error('Missing context should not call the API')
  }, '')
  missing.start('humor')
  assert.deepEqual(missing.events, ['chat-humor-started', 'chat-humor-failed'])
})
