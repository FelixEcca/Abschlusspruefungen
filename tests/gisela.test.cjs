const { describe } = require('node:test')

describe('Illustrations and animation', { concurrency: false }, () => {
  const assert = require('node:assert/strict')
  const { readFileSync } = require('node:fs')
  const { resolve } = require('node:path')
  const { test } = require('node:test')
  const React = require('react')
  const { renderToStaticMarkup } = require('react-dom/server')
  const ts = require('typescript')
  const postcss = require('postcss')

  const fileName = resolve(__dirname, '../src/components/gisela/Gisela.tsx')
  const { outputText } = ts.transpileModule(readFileSync(fileName, 'utf8'), {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  })
  const componentModule = { exports: {} }
  function loadLookModule(file, imports = {}) {
    const source = readFileSync(
      resolve(__dirname, '../src/components/gisela', file),
      'utf8',
    )
    const compiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText
    const module = { exports: {} }
    new Function('require', 'module', 'exports', compiled)(
      name => {
        assert.ok(Object.hasOwn(imports, name), name)
        return imports[name]
      },
      module,
      module.exports,
    )
    return module.exports
  }
  const lookModel = loadLookModule('gisela-looks.ts')
  const rigModel = loadLookModule('illustrated-looks.ts')
  const illustratedModule = loadLookModule('IllustratedGisela.tsx', {
    react: React,
    'react/jsx-runtime': require('react/jsx-runtime'),
    './illustrated-looks': rigModel,
    './Gisela.module.css': { default: { root: 'root' } },
    './IllustratedGisela.module.css': {
      default: {
        figure: 'illustratedFigure',
        moving: 'illustratedMoving',
        still: 'still',
        rig: 'illustratedRig',
        head: 'head',
        tail: 'tail',
        gesture: 'gesture',
        eyelid: 'eyelid',
      },
    },
  })
  let selectedExam = -1
  const dependencies = {
    react: React,
    'react/jsx-runtime': require('react/jsx-runtime'),
    '../../../store/player-profile-store': {
      PlayerProfileStore: {
        useState: selector => selector({ currentExam: selectedExam }),
      },
    },
    './gisela-looks': lookModel,
    './IllustratedGisela': illustratedModule,
    './Gisela.module.css': {
      default: {
        root: 'root',
        figure: 'figure',
        staticImage: 'staticImage',
        rig: 'rig',
        moving: 'moving',
        tail: 'tail',
        foreleg: 'foreleg',
        lowerLeg: 'lowerLeg',
        eyes: 'eyes',
        eyelid: 'eyelid',
      },
      __esModule: true,
    },
  }
  new Function('require', 'module', 'exports', outputText)(
    name => {
      assert.ok(Object.hasOwn(dependencies, name), `Unexpected import: ${name}`)
      return dependencies[name]
    },
    componentModule,
    componentModule.exports,
  )
  const { Gisela } = componentModule.exports

  test('all school courses have a look; AV and BFS share the workshop look', () => {
    for (const id of [1, 5, 6, 7, 8])
      assert.equal(lookModel.getGiselaLook(id), 'workshop')
    for (const id of [2, 10, 11, 12, 21, 22, 23, 25])
      assert.equal(lookModel.getGiselaLook(id), 'technical')
    for (const id of [3, 4, 13, 14, 15, 16])
      assert.equal(lookModel.getGiselaLook(id), 'research')
    for (const id of [18, 19, 20])
      assert.equal(lookModel.getGiselaLook(id), 'design')
    for (const id of [17, 24])
      assert.equal(lookModel.getGiselaLook(id), 'master')
    for (const id of [26, 27, 28])
      assert.equal(lookModel.getGiselaLook(id), 'chemistry')
    for (let id = 1; id <= 28; id++) {
      if (id !== 9) assert.notEqual(lookModel.getGiselaLook(id), 'classic')
    }
    for (const id of [-1, 0, 9, 999, NaN])
      assert.equal(lookModel.getGiselaLook(id), 'classic')
  })

  test('every look has its own complete transparent illustration and individually fitted animation rig', () => {
    const assets = new Set()
    for (const { look } of lookModel.giselaLooks) {
      const markup = renderToStaticMarkup(React.createElement(Gisela, { look }))
      assert.ok(markup.includes(`data-gisela-look="${look}"`))
      assert.match(markup, /data-gisela-version="2"/)
      assert.equal([...markup.matchAll(/data-gisela-layer="head"/g)].length, 1)
      assert.equal([...markup.matchAll(/data-gisela-layer="body"/g)].length, 1)
      assert.equal([...markup.matchAll(/data-gisela-layer="tail"/g)].length, 1)
      assert.doesNotMatch(markup, /data-gisela-outfit|gisela-idle-v1/)
      const asset = `gisela-${look}-v2.webp`
      assets.add(asset)
      assert.ok(markup.includes(asset))
      const webp = readFileSync(
        resolve(__dirname, '../public/img/gisela', asset),
      )
      assert.equal(webp.toString('ascii', 0, 4), 'RIFF')
      assert.equal(webp.toString('ascii', 8, 12), 'WEBP')
      assert.equal(webp.toString('ascii', 12, 16), 'VP8X')
      assert.ok(webp[20] & 0x10, 'Illustration must retain transparency')
      assert.equal(webp.readUIntLE(24, 3) + 1, 1024)
      assert.equal(webp.readUIntLE(27, 3) + 1, 1536)
      assert.ok(webp.length < 300000, 'Use optimized illustrations in the app')
      assert.equal(rigModel.illustratedLooks[look].eyes.length, 2)
      assert.notEqual(
        rigModel.illustratedLooks[look].head.clip,
        rigModel.illustratedLooks[look].head.cut,
      )
      assert.notEqual(
        rigModel.illustratedLooks[look].tail.clip,
        rigModel.illustratedLooks[look].tail.cut,
      )
      const still = renderToStaticMarkup(
        React.createElement(Gisela, { look, animated: false }),
      )
      assert.ok(still.includes(asset))
      assert.doesNotMatch(still, /data-gisela-layer=/)
    }
    assert.equal(assets.size, 6)
    assert.equal(
      rigModel.illustratedLooks.technical.prop,
      undefined,
      'The machine stays stationary',
    )
    assert.ok(
      rigModel.illustratedLooks.chemistry.gesture < 1,
      'Test tubes stay upright',
    )
  })

  test('new illustrations blink every five seconds, gesture every thirty and honor reduced motion', () => {
    const css = postcss.parse(
      readFileSync(
        resolve(
          __dirname,
          '../src/components/gisela/IllustratedGisela.module.css',
        ),
        'utf8',
      ),
    )
    for (const [selector, value] of [
      ['.moving .head', 'acknowledge 30s ease-in-out infinite'],
      ['.moving .tail', 'swish 3.2s ease-in-out infinite'],
      ['.moving .gesture', 'present 30s ease-in-out infinite'],
      ['.moving .eyelid', 'blink 5s ease-in-out infinite'],
    ]) {
      const rule = css.nodes.find(node => node.selector === selector)
      assert.equal(
        rule.nodes.find(node => node.prop === 'animation').value,
        value,
      )
    }
    const reduced = css.nodes.find(
      node => node.params === '(prefers-reduced-motion: reduce)',
    )
    assert.ok(
      reduced.nodes.some(rule =>
        rule.nodes.some(
          node => node.prop === 'animation' && node.value === 'none',
        ),
      ),
    )
    const markup = renderToStaticMarkup(
      React.createElement(
        React.Fragment,
        null,
        ...lookModel.giselaLooks.map(({ look }) =>
          React.createElement(Gisela, { look, key: look }),
        ),
      ),
    )
    const ids = [...markup.matchAll(/(?:clipPath|mask) id="([^"]+)"/g)].map(
      match => match[1],
    )
    assert.equal(new Set(ids).size, ids.length)
    const refs = [
      ...markup.matchAll(/(?:clip-path|mask)="url\(#([^)]+)\)"/g),
    ].map(match => match[1])
    for (const id of refs) assert.ok(ids.includes(id))
  })

  test('Gisela follows the selected course and explicit previews override it', () => {
    try {
      selectedExam = 7
      assert.match(
        renderToStaticMarkup(React.createElement(Gisela)),
        /data-gisela-look="workshop"/,
      )
      selectedExam = 27
      assert.match(
        renderToStaticMarkup(React.createElement(Gisela)),
        /data-gisela-look="chemistry"/,
      )
      assert.match(
        renderToStaticMarkup(React.createElement(Gisela, { look: 'design' })),
        /data-gisela-look="design"/,
      )
    } finally {
      selectedExam = -1
    }
  })

  test('the first blink is fully visible within one second and respects reduced motion', () => {
    const css = postcss.parse(
      readFileSync(
        resolve(__dirname, '../src/components/gisela/Gisela.module.css'),
        'utf8',
      ),
    )
    const animation = css.nodes.find(
      node => node.type === 'rule' && node.selector === '.moving .eyelid',
    )
    const duration = Number.parseFloat(
      animation.nodes
        .find(node => node.prop === 'animation')
        .value.split(' ')[1],
    )
    const blink = css.nodes.find(
      node =>
        node.type === 'atrule' &&
        node.name === 'keyframes' &&
        node.params === 'blink',
    )
    const closed = blink.nodes.find(node =>
      node.nodes.some(
        declaration =>
          declaration.prop === 'opacity' && declaration.value === '1',
      ),
    )
    const firstClosedPercent = Number.parseFloat(closed.selector.split(',')[0])
    assert.equal(duration, 5)
    assert.ok((firstClosedPercent / 100) * duration < 1)
    const reducedMotion = css.nodes.find(
      node =>
        node.type === 'atrule' &&
        node.name === 'media' &&
        node.params === '(prefers-reduced-motion: reduce)',
    )
    assert.ok(
      reducedMotion.nodes.some(
        node =>
          node.selector.includes('.moving .eyelid') &&
          node.selector.includes('.moving .tail') &&
          node.selector.includes('.moving .foreleg') &&
          node.selector.includes('.moving .lowerLeg') &&
          node.nodes.some(
            declaration =>
              declaration.prop === 'animation' && declaration.value === 'none',
          ),
      ),
    )
  })

  test('Gisela provides a labelled fixed-size figure with one moving foreleg and no controls', () => {
    const markup = renderToStaticMarkup(React.createElement(Gisela))
    assert.match(markup, /role="img" aria-label="Gisela, deine Lernbegleitung"/)
    assert.match(markup, /width="1024" height="1536" alt=""/)
    assert.doesNotMatch(markup, /<button/)
    for (const layer of ['tail', 'foreleg', 'upper-leg', 'lower-leg', 'body']) {
      assert.equal(
        [...markup.matchAll(new RegExp(`data-gisela-layer="${layer}"`, 'g'))]
          .length,
        1,
      )
    }
    for (const asset of ['gisela-idle-v1.png', 'gisela-body-v1.png']) {
      const png = readFileSync(
        resolve(__dirname, '../public/img/gisela', asset),
      )
      assert.equal(png.readUInt32BE(16), 1024)
      assert.equal(png.readUInt32BE(20), 1536)
      assert.equal(png[25], 6, 'PNG must retain RGBA transparency')
    }
  })

  test('a static Gisela has no animation control', () => {
    const markup = renderToStaticMarkup(
      React.createElement(Gisela, { animated: false }),
    )
    assert.doesNotMatch(markup, /<button/)
    assert.doesNotMatch(markup, /class="figure moving"/)
    assert.doesNotMatch(markup, /data-gisela-layer/)
  })

  test('multiple Gisela instances have independent eye, limb and fur definitions', () => {
    const markup = renderToStaticMarkup(
      React.createElement(
        React.Fragment,
        null,
        React.createElement(Gisela),
        React.createElement(Gisela),
      ),
    )
    const ids = [...markup.matchAll(/<clipPath id="([^"]+)"/g)].map(
      match => match[1],
    )
    const references = [...markup.matchAll(/clip-path="url\(#([^)]+)\)"/g)].map(
      match => match[1],
    )
    assert.equal(ids.length, 10)
    assert.equal(new Set(ids).size, 10)
    assert.deepEqual(references, ids)
    const shapes = [
      ...markup.matchAll(/<path id="([^"]+-upper-leg-shape)"/g),
    ].map(match => match[1])
    const uses = [...markup.matchAll(/<use href="#([^"]+)"/g)].map(
      match => match[1],
    )
    assert.equal(new Set(shapes).size, 2)
    assert.deepEqual(
      uses,
      shapes.flatMap(id => [id, id, id]),
    )
    const gradients = [...markup.matchAll(/<linearGradient id="([^"]+)"/g)].map(
      match => match[1],
    )
    const fills = [...markup.matchAll(/fill="url\(#([^)]+)\)"/g)].map(
      match => match[1],
    )
    assert.equal(gradients.length, 4)
    assert.equal(new Set(gradients).size, 4)
    assert.deepEqual(new Set(fills), new Set(gradients))
  })

  test('tail movement and the immediate greeting repeat indefinitely without timers', () => {
    const css = postcss.parse(
      readFileSync(
        resolve(__dirname, '../src/components/gisela/Gisela.module.css'),
        'utf8',
      ),
    )
    for (const [selector, expected] of [
      ['.moving .tail', 'swish 3.2s ease-in-out infinite'],
      ['.moving .foreleg', 'lift 30s ease-in-out infinite'],
      ['.moving .lowerLeg', 'wave 30s ease-in-out infinite'],
    ]) {
      const rule = css.nodes.find(
        node => node.type === 'rule' && node.selector === selector,
      )
      assert.equal(
        rule.nodes.find(node => node.prop === 'animation').value,
        expected,
      )
    }
    const wave = css.nodes.find(
      node => node.type === 'atrule' && node.params === 'wave',
    )
    const rest = wave.nodes.find(node => node.selector.includes('0%'))
    assert.equal(
      rest.nodes.find(node => node.prop === 'transform').value,
      'rotate(0deg)',
    )
    const raised = wave.nodes.find(node =>
      node.selector
        .split(',')
        .map(value => value.trim())
        .includes('3%'),
    )
    assert.equal(
      raised.nodes.find(node => node.prop === 'transform').value,
      'rotate(110deg)',
    )
    const lift = css.nodes.find(
      node => node.type === 'atrule' && node.params === 'lift',
    )
    assert.equal(
      lift.nodes
        .find(node => node.selector.includes('3%'))
        .nodes.find(node => node.prop === 'transform').value,
      'rotate(55deg)',
    )
    const markup = renderToStaticMarkup(React.createElement(Gisela))
    assert.match(
      markup,
      /data-gisela-layer="foreleg"[\s\S]*data-gisela-layer="lower-leg"[\s\S]*data-gisela-layer="body"/,
    )
    assert.doesNotMatch(
      readFileSync(fileName, 'utf8'),
      /setInterval|setTimeout/,
    )
  })

  test('the shoulder pivot stays inside the overlapping body and upper-leg root', () => {
    const css = postcss.parse(
      readFileSync(
        resolve(__dirname, '../src/components/gisela/Gisela.module.css'),
        'utf8',
      ),
    )
    const shoulder = css.nodes.find(node => node.selector === '.foreleg')
    const origin = shoulder.nodes.find(
      node => node.prop === 'transform-origin',
    ).value
    const [x, y] = origin.split(' ').map(Number.parseFloat)
    // Shared opaque root region of the body PNG and the upper-leg drawing.
    assert.ok(x >= 356 && x <= 372, `Shoulder x outside attachment: ${x}`)
    assert.ok(y >= 824 && y <= 844, `Shoulder y outside attachment: ${y}`)
    const joints = css.nodes.find(
      node => node.selector === '.tail,\n.foreleg,\n.lowerLeg',
    )
    assert.ok(
      joints.nodes.some(
        node => node.prop === 'transform-box' && node.value === 'view-box',
      ),
    )
  })

  test('the upper leg is a continuous opaque drawing extending behind the fixed body', () => {
    const markup = renderToStaticMarkup(React.createElement(Gisela))
    const upperLeg = markup.match(
      /<g[^>]*data-gisela-layer="upper-leg">([\s\S]*?)<\/g>/,
    )
    assert.ok(upperLeg)
    assert.match(
      upperLeg[1],
      /<use href="#[^"]+-upper-leg-shape" fill="url\(#[^)]+-leg-fur\)">/,
    )
    assert.doesNotMatch(upperLeg[1], /<image/)
    const fur = markup.match(
      /<linearGradient id="[^"]+-leg-fur"[^>]*>([\s\S]*?)<\/linearGradient>/,
    )
    assert.ok(fur)
    assert.doesNotMatch(fur[1], /stop-opacity|opacity=/)
    assert.doesNotMatch(markup, /data-gisela-layer="shoulder"/)
    const shape = markup.match(/<path id="([^"]+-upper-leg-shape)" d="([^"]+)"/)
    assert.ok(shape)
    assert.ok(shape[2].endsWith('Z'), 'The thigh must be a closed silhouette')
    assert.match(shape[2], /C457 1057 477 913 485 846/)
    const clip = markup.match(
      /<clipPath id="[^"]+-upper-leg">([\s\S]*?)<\/clipPath>/,
    )
    assert.ok(clip)
    assert.ok(
      clip[1].includes(`href="#${shape[1]}"`),
      'The fur and opaque base must share the same continuous outline',
    )
    assert.ok(markup.indexOf('data-gisela-layer="foreleg"') < upperLeg.index)
    assert.ok(upperLeg.index < markup.indexOf('data-gisela-layer="lower-leg"'))
    assert.ok(upperLeg.index < markup.indexOf('data-gisela-layer="body"'))
  })

  test('the full dark leg outline is painted after the fur and outside its clip', () => {
    const markup = renderToStaticMarkup(React.createElement(Gisela))
    const start = markup.indexOf('data-gisela-layer="upper-leg"')
    const end = markup.indexOf('data-gisela-layer="lower-leg"')
    const upperLeg = markup.slice(start, end)
    const outline = upperLeg.match(
      /<use href="#[^"]+-upper-leg-shape" fill="none" stroke="#42200c" stroke-width="([^"]+)"[^>]*data-gisela-layer="upper-leg-outline"/,
    )
    assert.ok(outline)
    assert.ok(Number(outline[1]) >= 5 && Number(outline[1]) <= 7)
    assert.ok(upperLeg.lastIndexOf('fill="url(') < outline.index)
    assert.ok(upperLeg.indexOf('</g>') < outline.index)
  })
})

describe('Avatar and exercise integration', { concurrency: false }, () => {
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
      const webp = readFileSync(
        resolve(__dirname, '../public/img/gisela', asset),
      )
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
        '@fortawesome/free-solid-svg-icons': {
          faQuestionCircle: {},
          faPen: {},
        },
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
    assert.ok(
      html.indexOf('Lösung: 23') < html.indexOf('Wie kommt man darauf?'),
    )
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
})
