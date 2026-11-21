const { describe } = require('node:test')

describe('Onboarding flow', { concurrency: false }, () => {
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
    let state = {
      version: 1,
      courseId: 1,
      step: 'chat-humor',
      status: 'active',
    }
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
      guideWidth({ left: 284, top: 8, width: 360, height: 880 }, 660, 900) <=
        252,
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
})

describe(
  'Exercise chat and tutorial integration',
  { concurrency: false },
  () => {
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
      const extractions = []
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
        '../../../store/player-profile-store': {
          PlayerProfileStore: {
            useState: selector => selector({ currentExam: 6 }),
          },
        },
        '@/helper/ai-context': { htmlToPromptText: html => html },
        '@/content/exercises': { exercisesData: { 11: {} } },
        '@/components/gisela/GiselaAvatar': { GiselaAvatar: () => null },
        '@/components/gisela/Gisela': { Gisela: () => null },
        './ChatOverlay.module.css': { default: {} },
        './extractor/extractor': {
          extractor: (_exercise, _data, options) => {
            extractions.push(options)
            return context
          },
        },
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
        extractions,
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
        chat.find(
          chat.render(),
          node => node.props['data-chat-welcome'] === 'true',
        )
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
      assert.ok(
        chat.find(status(), node => node.props.expression === 'thinking'),
      )
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
      const chat = createChat(
        async () => new Response('Ausführliche Erklärung.'),
      )
      chat.state.pages = [{ index: 'b' }]
      chat.state.chatMessages = [
        { role: 'assistant', content: 'Altes Gespräch' },
      ]
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
      assert.equal(payload.courseId, 6)
      assert.equal(payload.exerciseId, 11)
      assert.ok(
        chat.extractions.filter(item => item.pageIndex === 'b').length >= 2,
      )
      const statement = JSON.parse(payload.messages[0].content)
      assert.equal(statement.activePart, 'b')
      assert.equal(JSON.parse(payload.messages[1].content).notStudentWork, true)
      assert.ok(payload.messages.at(-1).content.includes('Teilaufgabe b)'))
      assert.ok(payload.messages.some(m => m.content.includes('Lösung: 7.')))
      assert.ok(
        payload.messages.some(m =>
          m.content.includes('einschließlich des Ergebnisses'),
        ),
      )
      assert.ok(
        !payload.messages.some(m => m.content.includes('Altes Gespräch')),
      )
      chat.click('chat-back')
      assert.equal(chat.state.chatMode, null)
    })

    test('explanation sends context instead of conflicting client-side instructions', async () => {
      const chat = createChat(async () => new Response('Erklärung.'))
      chat.state.pages = [{ index: 'single' }]
      chat.state.queuedChatSubmission = {
        id: 'simple-explanation',
        kind: 'solution-explanation',
      }
      chat.consumeSubmission()
      await flush()
      const payload = JSON.parse(chat.requests[0].body)
      const context = payload.messages.filter(
        message => message.role === 'system',
      )
      assert.equal(context.length, 2)
      assert.equal(JSON.parse(context[0].content).activePart, 'single')
      assert.equal(JSON.parse(context[1].content).notStudentWork, true)
      assert.ok(chat.extractions.every(item => item.pageIndex === undefined))
      assert.match(
        payload.messages.at(-1).content,
        /nötigen Zwischenrechnungen/,
      )
      assert.match(payload.messages.at(-1).content, /gültiges KaTeX/)
      assert.ok(!JSON.stringify(context).includes('Modus-Anweisung:'))
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
      assert.equal(
        chat.state.chatMessages.at(-1).content,
        'Die Lösung erklärt.',
      )
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

    test('text review displays the validated full response in the existing chat flow', async () => {
      const chat = createChat(async () => new Response('Dein Ergebnis stimmt.'))
      chat.state.queuedChatSubmission = {
        id: 'text-review',
        content: '200 cm',
      }
      chat.consumeSubmission()
      await flush()
      const payload = JSON.parse(chat.requests[0].body)
      assert.equal(payload.learningMode, 'pruefen')
      assert.equal(payload.review, false)
      assert.equal(payload.stream, true)
      assert.equal(
        chat.state.chatMessages.at(-1).content,
        'Dein Ergebnis stimmt.',
      )
      assert.equal(chat.state.chatPending, false)
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
      stream.enqueue(
        new TextEncoder().encode('3 und 4 Akkus. Wie viele sind es?'),
      )
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
      assert.deepEqual(empty.events, [
        'chat-humor-started',
        'chat-humor-failed',
      ])
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
      assert.deepEqual(chat.events, [
        'chat-humor-started',
        'chat-overview-open',
      ])
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
      assert.deepEqual(failed.events, [
        'chat-humor-started',
        'chat-overview-open',
      ])
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
      assert.deepEqual(missing.events, [
        'chat-humor-started',
        'chat-humor-failed',
      ])
    })
  },
)
