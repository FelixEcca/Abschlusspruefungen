const assert = require('node:assert/strict')
const { readFileSync, readdirSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const ts = require('typescript')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const katex = require('katex')
const root = path.resolve(__dirname, '..')
const cache = new Map()
function load(file) {
  const resolved = path.extname(file)
    ? file
    : ['.tsx', '.ts']
        .map(ext => file + ext)
        .find(f => require('node:fs').existsSync(f))
  if (cache.has(resolved)) return cache.get(resolved)
  const output = ts.transpileModule(readFileSync(resolved, 'utf8'), {
    fileName: resolved,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText
  const module = { exports: {} }
  const dependency = name =>
    name.startsWith('@/')
      ? load(path.join(root, 'src', name.slice(2)))
      : name.startsWith('.')
        ? load(path.resolve(path.dirname(resolved), name))
        : require(name)
  new Function('require', 'module', 'exports', output)(
    dependency,
    module,
    module.exports,
  )
  cache.set(resolved, module.exports)
  return module.exports
}
const directory = path.join(
  root,
  'src/content/implementations/Mathe_TG13_gAN_Pruefungen',
)
const exercises = readdirSync(directory)
  .filter(f => /^\d+\.tsx$/.test(f))
  .map(f => [
    Number(f.slice(0, -4)),
    Object.values(load(path.join(directory, f)))[0],
  ])

const trainerDirectory = path.join(
  root,
  'src/content/implementations/Mathe_TG13_gAN_Training',
)
const trainer = readdirSync(trainerDirectory)
  .filter(f => /^\d+\.tsx$/.test(f))
  .map(f => [
    Number(f.slice(0, -4)),
    Object.values(load(path.join(trainerDirectory, f)))[0],
  ])
function trainerRng(initial = 457132) {
  let seed = initial
  let calls = 0
  const random = () => {
    assert.ok(
      ++calls < 200000,
      'trainer generator exceeded its random-call budget',
    )
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 2 ** 32
  }
  return {
    randomIntBetween(lo, hi, step = 1) {
      assert.ok(
        Number.isSafeInteger(lo) &&
          Number.isSafeInteger(hi) &&
          hi >= lo &&
          (hi - lo) % step === 0,
      )
      return lo + Math.floor(random() * ((hi - lo) / step + 1)) * step
    },
    randomItemFromArray: values => values[Math.floor(random() * values.length)],
    randomBoolean: () => random() < 0.5,
    shuffleArray: values => {
      const result = [...values]
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
      }
      return result
    },
  }
}
function trainerNodes(exercise, data, solutions = true) {
  return exercise.tasks
    ? [
        exercise.intro({ data }),
        ...exercise.tasks.flatMap(task => [
          task.intro?.({ data }),
          task.task({ data }),
          ...(solutions ? [task.solution({ data })] : []),
        ]),
      ]
    : [
        exercise.task({ data }),
        ...(solutions ? [exercise.solution({ data })] : []),
      ]
}
function trainerMath(node, result = []) {
  React.Children.forEach(node, child => {
    if (!React.isValidElement(child)) return
    if (typeof child.props.math === 'string') result.push(child.props.math)
    trainerMath(child.props.children, result)
  })
  return result
}

test('trainer contains 84 numbered families, reuses earlier courses and stays outside the exam list', () => {
  const navigation = load(path.join(root, 'src/content/navigations.tsx'))
    .navigationData[15]
  assert.equal(navigation.topics.length, 9)
  const groups = navigation.topics.flatMap(topic => topic.skillGroups)
  assert.equal(groups.length, 84)
  for (let n = 1; n <= 84; n++)
    assert.match(
      groups[n - 1].name,
      new RegExp('^' + String(n).padStart(2, '0') + ' · '),
    )
  const ids = groups.flatMap(group => group.skillExercises.map(ex => ex.id))
  assert.equal(new Set(ids).size, 88)
  assert.equal(trainer.length, 68)
  const catalog = readFileSync(
    path.join(root, 'src/content/exercises.tsx'),
    'utf8',
  )
  const registry = load(path.join(root, 'src/content/navigation-exercises.ts'))
  for (const [id, exercise] of trainer) {
    assert.ok(ids.includes(id), String(id))
    assert.match(catalog, new RegExp(id + ': exercise' + id))
    assert.equal(registry.isExerciseInNavigation(15, id), true)
    assert.equal(registry.isExamExerciseInNavigation(15, id), false)
    assert.equal(registry.isExerciseForNavigation(3, id), false)
    assert.equal(exercise.useCalculator, false)
    assert.ok(exercise.originalData)
    assert.match(exercise.source, /^Pflichtteiltrainer/)
    assert.doesNotMatch(exercise.source, /\b20\d{2}\b/)
    if (exercise.source.endsWith('Basis')) assert.ok(exercise.duration <= 3)
  }
  assert.deepEqual(groups[13].skillExercises, [
    { id: 4926, pages: [{ index: 'a' }] },
  ])
  for (const id of [
    5000, 5001, 5003, 5004, 5005, 5006, 5108, 5109, 5110, 5111, 20007,
  ])
    assert.ok(ids.includes(id))
})

test('trainer originals and variants render clean mathematical tasks, solutions and diagrams', () => {
  const rng = trainerRng()
  for (const [id, exercise] of trainer) {
    const statements = new Set()
    for (const data of [
      exercise.originalData,
      ...Array.from({ length: 39 }, () => exercise.generator(rng)),
    ]) {
      const elements = trainerNodes(exercise, data)
      checkFormulas(elements, id)
      const html = renderToStaticMarkup(
        React.createElement(React.Fragment, null, ...elements),
      )
      assert.doesNotMatch(
        html,
        /katex-error|NaN|undefined|Infinity/,
        String(id),
      )
      assert.doesNotMatch(
        html,
        /<text[^>]*>[^<]*\\(?:frac|begin)/,
        String(id) + ' raw TeX in SVG',
      )
      assert.ok(html.length > 100, String(id))
      const question = renderToStaticMarkup(
        React.createElement(
          React.Fragment,
          null,
          ...trainerNodes(exercise, data, false),
        ),
      )
      statements.add(question)
    }
    assert.ok(
      statements.size >= 3,
      String(id) + ': insufficient meaningful variation',
    )
  }
})

test('trainer TG11 polynomial generator cannot request more distinct exponents than exist', () => {
  const ex = load(
    path.join(root, 'src/content/implementations/Mathe_TG11_Training/5108.tsx'),
  ).exercise5108
  for (let degree = 1; degree <= 6; degree++) {
    let call = 0
    const data = ex.generator({
      randomIntBetween(lo, hi) {
        call++
        if (call === 1) return degree
        if (call === 2) return hi
        return hi
      },
      shuffleArray: values => values,
    })
    assert.equal(data.terms.length, Math.min(4, degree + 1))
    assert.equal(new Set(data.terms.map(t => t.exp)).size, data.terms.length)
    assert.ok(data.terms.every(t => t.exp >= 0 && t.exp <= degree))
  }
})

test('trainer reused TG11 and TG12 exercises render with their existing generators and selected pages', () => {
  const navigation = load(path.join(root, 'src/content/navigations.tsx'))
    .navigationData[15]
  const linked = navigation.topics
    .flatMap(topic => topic.skillGroups.flatMap(group => group.skillExercises))
    .filter(ex => ex.id < 22000)
  const catalog = readFileSync(
      path.join(root, 'src/content/exercises.tsx'),
      'utf8',
    ),
    rng = trainerRng(7341)
  for (const entry of linked) {
    const match = catalog.match(
      new RegExp('import \\{ exercise' + entry.id + " \\} from '([^']+)'"),
    )
    assert.ok(match, String(entry.id))
    const exercise = load(path.resolve(root, 'src/content', match[1]))[
      'exercise' + entry.id
    ]
    for (let i = 0; i < 5; i++) {
      let data = exercise.generator(rng),
        attempt = 0
      while (
        exercise.constraint &&
        !exercise.constraint({ data, rng }) &&
        attempt++ < 100
      )
        data = exercise.generator(rng)
      assert.ok(attempt < 100, String(entry.id))
      const selection =
        entry.pages && exercise.tasks
          ? {
              ...exercise,
              tasks: entry.pages.map(
                page => exercise.tasks[page.index.charCodeAt(0) - 97],
              ),
            }
          : exercise
      const elements = trainerNodes(selection, data)
      checkFormulas(elements, entry.id)
      const html = renderToStaticMarkup(
        React.createElement(React.Fragment, null, ...elements),
      )
      assert.doesNotMatch(
        html,
        /katex-error|NaN|undefined|Infinity/,
        String(entry.id),
      )
    }
  }
})

test('trainer arithmetic, probability and geometry solutions satisfy independent mathematical checks', () => {
  const get = n => trainer.find(([id]) => id === 22000 + n)[1],
    rng = trainerRng(8932)
  const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`)
  const last = math => math.slice(math.lastIndexOf('=') + 1)
  const ratio = tex => {
    const m = tex.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    return m ? ((m[1] ? -1 : 1) * Number(m[2])) / Number(m[3]) : Number(tex)
  }
  const dot = (a, b) => a.reduce((s, n, i) => s + n * b[i], 0)
  for (let sample = 0; sample < 80; sample++) {
    const data = n =>
      sample === 0 ? get(n).originalData : get(n).generator(rng)
    const fractions = data(1),
      fs = trainerMath(get(1).solution({ data: fractions }))[0]
    const f1 = fractions.a / fractions.b,
      f2 = fractions.c / fractions.d
    close(
      ratio(last(fs)),
      [f1 + f2, f1 - f2, f1 * f2, f1 / f2][fractions.operation],
    )
    const linear = data(4)
    if (linear.a !== linear.c)
      assert.ok(
        trainerMath(get(4).solution({ data: linear }))[0].endsWith(
          'x=' + linear.x,
        ),
      )
    const inflection = data(22),
      slope = trainerMath(get(22).solution({ data: inflection })).at(-1)
    close(
      Number(last(slope)),
      inflection.c - 3 * inflection.a * inflection.b ** 2,
    )
    const integral = data(27),
      is = trainerMath(get(27).solution({ data: integral })).at(-1)
    close(
      ratio(last(is)),
      (integral.a / 2) * (integral.right ** 2 - integral.left ** 2) +
        integral.b * (integral.right - integral.left),
    )
    const cards = data(44),
      cp = trainerMath(get(44).solution({ data: cards }))[0]
    close(ratio(last(cp)), (cards.ranks + 3) / (4 * cards.ranks))
    const bin = data(46),
      bs = trainerMath(get(46).solution({ data: bin }))[0]
    let combinations = 1
    for (let i = 1; i <= bin.k; i++)
      combinations = (combinations * (bin.n - i + 1)) / i
    close(
      ratio(last(bs)),
      combinations *
        (1 / bin.denominator) ** bin.k *
        (1 - 1 / bin.denominator) ** (bin.n - bin.k),
    )
    const stop = data(49),
      ss = trainerMath(get(49).solution({ data: stop })).at(-1)
    close(
      ratio(last(ss)),
      Array.from(
        { length: stop.limit },
        (_, i) => (1 - 1 / stop.denominator) ** i,
      ).reduce((s, n) => s + n, 0),
    )
    const shipping = data(52),
      posterior = trainerMath(get(52).solution({ data: shipping })).at(-1)
    close(
      ratio(last(posterior)),
      (shipping.a * shipping.lateA) /
        (shipping.a * shipping.lateA + (10 - shipping.a) * shipping.lateB),
    )
    const geometry = data(64),
      u = [geometry.a, geometry.b, geometry.c],
      v = [-geometry.b + geometry.variant, geometry.a, 0]
    close(
      Number(last(trainerMath(get(64).solution({ data: geometry }))[0])),
      dot(u, v),
    )
    const part = data(66),
      r = part.ratio
    for (const t of [r / (r + 1), r / (r - 1)])
      close(Math.abs(t) / Math.abs(t - 1), r)
    const line = data(69)
    assert.equal(line.error === 0, line.point[2] === line.point[2] + line.error)
    const lot = data(74),
      lu = [2, -1, 2],
      normal = [2 * lot.k, 2 * lot.k, -lot.k],
      fa = normal.map((n, i) => n - (lot.correct ? 0 : lu[i]))
    assert.equal(dot(fa, lu) === 0, Boolean(lot.correct))
    const natural = data(77),
      solution = trainerMath(get(77).solution({ data: natural })).at(-1)
    const triples = [...solution.matchAll(/\((\d+);(\d+);(\d+)\)/g)].map(m =>
        m.slice(1).map(Number),
      ),
      expected = []
    for (let x = 0; x <= natural.count; x++)
      for (let y = 0; y <= natural.count; y++) {
        const z = natural.count - x - y
        if (z >= 0 && x + 2 * y + 4 * z === natural.count + natural.excess)
          expected.push([x, y, z])
      }
    assert.deepEqual(triples, expected)
    const inv = data(83),
      a = [
        [inv.scale, inv.scale * inv.k],
        [inv.scale * inv.s, inv.scale * (1 + inv.k * inv.s)],
      ],
      inverse = [
        [(1 + inv.k * inv.s) / inv.scale, -inv.k / inv.scale],
        [-inv.s / inv.scale, 1 / inv.scale],
      ]
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++)
        close(
          a[i][0] * inverse[0][j] + a[i][1] * inverse[1][j],
          i === j ? 1 : 0,
        )
    const singular = data(84),
      nullVector = [1, -singular.s, singular.s - 1],
      rows = [
        [1, 1, 1],
        [1, singular.s, singular.s + 1],
        [2, singular.s + 1, singular.s + 2],
      ]
    for (const row of rows) close(dot(row, nullVector), 0)
    assert.notEqual(singular.s - 1, 0)
  }
})
function checkFormulas(node, id) {
  React.Children.forEach(node, element => {
    if (!React.isValidElement(element)) return
    const math = element.props.math
    if (typeof math === 'string') {
      assert.doesNotMatch(
        math,
        /[\x00-\x08\x0b\x0c\x0e-\x1f]/,
        `${id}: control character in LaTeX`,
      )
      assert.doesNotMatch(
        math,
        /(?<!\\)\b(?:mathbb|overrightarrow|sqrt|cdot|quad|iff|mathrm|overline)\b/,
        `${id}: missing LaTeX escape: ${math}`,
      )
      assert.doesNotMatch(
        math,
        /\\\\(?:mathbb|frac|sqrt|overrightarrow|int|sin|cos|begin|vec|Omega)/,
        `${id}: overescaped LaTeX`,
      )
      assert.doesNotThrow(
        () => katex.renderToString(math, { throwOnError: true }),
        `${id}: ${math}`,
      )
    }
    checkFormulas(element.props.children, id)
  })
}
const originals = {
  21000: { k: 2, c: 1, value: 7 },
  21001: { limit: 3, n: 5 },
  21002: { count: 2, stake: 5 },
  21003: { t: 0, area: 5 },
  21004: { s: 2 },
  21100: { a: 2, k: 1 },
  21101: { k: 1, target: 0.4 },
  21102: { black: 2 },
  21103: { s: 0 },
  21104: { k: 1 },
  21105: { k: 1, q: 2 },
  21106: { k: 1 },
  21200: { k: 1 },
  21201: { young: 30, fanYoung: 40, fanOld: 65 },
  21202: { shift: 0 },
  21203: { length: 4, height: 2 },
  21204: { x: -1, y: 2, z: 4 },
  21205: { a: 1, k: 1 },
  21206: {
    support: [0, 1, 2],
    direction: [2, -1, 2],
    t: 1,
    normal: [-4, -4, 2],
  },
  21207: { gainCents: 100 },
  21300: { a: 1 },
  21301: { r: 3, y: 2 },
  21302: { s: 0 },
  21303: { radii: [1, 2, 4], payouts: [6, 2, 1] },
  21304: { b: [3, 0, -1], direction: [-2, 4, 3], normal: [1, 2, -2] },
  21305: { suit: 3, rank: 2, jokers: 2 },
  21306: { count: 12, excess: 18, unit: 5 },
  21307: { axis: 0, maximum: true },
  21400: { a: 1 },
  21401: { n: 20 },
  21402: { k: 1, h: 6 },
  21403: { a: 1, root: 1 },
  21404: { share: 40, lateA: 20, lateOther: 30 },
  21405: { zero: -3, peak: 4, minimum: 2 },
  21406: { angle: 120 },
  21407: { x1: 2, x2: 5, x3: 11 },
}
test('all 36 Part A exam sheets retain their original parameters, aids and point totals', () => {
  assert.equal(exercises.length, 36)
  for (const [id, ex] of exercises) {
    assert.deepEqual(ex.originalData, originals[id], String(id))
    assert.equal(ex.useCalculator, id >= 21200 && id % 100 === 7)
    assert.match(ex.source, /20(22|23|24|25|26) (?:Pflichtteil|Teil A)/)
    const sum = ex.tasks
      ? ex.tasks.reduce((s, t) => s + t.points, 0)
      : ex.points
    assert.equal(
      sum,
      id < 21200
        ? id % 100 === 0
          ? 15
          : id === 21001 || id === 21002 || id === 21101 || id === 21102
            ? 8
            : 7
        : id % 100 === 7
          ? 10
          : 5,
      String(id),
    )
  }
})
test('originals and generated variants render all tasks and solutions without invalid mathematics', () => {
  let seed = 1234567
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 2 ** 32
  }
  const rng = {
    randomIntBetween: (lo, hi) => lo + Math.floor(random() * (hi - lo + 1)),
    randomItemFromArray: arr => arr[Math.floor(random() * arr.length)],
  }
  for (const [id, ex] of exercises) {
    for (const data of [
      ex.originalData,
      ...Array.from({ length: 79 }, () => ex.generator(rng)),
    ]) {
      assert.ok(
        !ex.constraint || ex.constraint({ data, rng }),
        `${id}: constraint`,
      )
      const elements = ex.tasks
        ? [
            ex.intro({ data }),
            ...ex.tasks.flatMap(t => [t.task({ data }), t.solution({ data })]),
          ]
        : [ex.task({ data }), ex.solution({ data })]
      const html = renderToStaticMarkup(
        React.createElement(React.Fragment, null, ...elements),
      )
      checkFormulas(elements, id)
      assert.doesNotMatch(
        html,
        /katex-error|NaN|undefined|Infinity/,
        `${id}: render`,
      )
      assert.match(html, /katex/)
    }
  }
})

test('math commands are never passed through literal JSX attributes', () => {
  for (const file of readdirSync(directory).filter(f => f.endsWith('.tsx'))) {
    const source = ts.createSourceFile(
      file,
      readFileSync(path.join(directory, file), 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    )
    function visit(node) {
      if (
        ts.isJsxAttribute(node) &&
        node.name.getText(source) === 'math' &&
        node.initializer &&
        ts.isStringLiteral(node.initializer)
      ) {
        assert.ok(
          !node.initializer.text.includes('\\'),
          `${file}: LaTeX requires a JSX expression`,
        )
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
  const exercise = exercises.find(([id]) => id === 21400)[1]
  const html = renderToStaticMarkup(exercise.intro({ data: { a: 2 } }))
  const visible = html
    .replace(/<annotation[\s\S]*?<\/annotation>/g, '')
    .replace(/<[^>]*>/g, '')
  assert.match(html, /mathvariant="double-struck"|class="[^"]*\bmathbb\b/)
  assert.doesNotMatch(visible, /mathbb/)
})

test('each exam provides varied statements without inflating its approved difficulty', () => {
  let seed = 824781
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 2 ** 32
  }
  const rng = {
    randomIntBetween: (lo, hi) => lo + Math.floor(random() * (hi - lo + 1)),
    randomItemFromArray: arr => arr[Math.floor(random() * arr.length)],
  }
  for (const [id, ex] of exercises) {
    // Small, useful coefficient sets are preferable to artificial transformations.
    const minimum = { 21400: 12, 21307: 14, 21406: 9 }[id] ?? 24
    const parameters = new Set(),
      statements = new Set()
    for (let i = 0; i < 240; i++) {
      const data = ex.generator(rng)
      parameters.add(JSON.stringify(data))
      const elements = ex.tasks
        ? [ex.intro({ data }), ...ex.tasks.map(t => t.task({ data }))]
        : [ex.task({ data })]
      statements.add(
        renderToStaticMarkup(
          React.createElement(React.Fragment, null, ...elements),
        ),
      )
    }
    assert.ok(
      parameters.size >= minimum,
      `${id}: only ${parameters.size} parameter sets`,
    )
    assert.ok(
      statements.size >= minimum,
      `${id}: only ${statements.size} task statements`,
    )
  }
})

test('cubic analysis variants stay in polynomial main form with valid elementary solutions', () => {
  const { polynomial, frac } = load(path.join(directory, 'math.ts'))
  assert.equal(
    polynomial([
      [1, 3],
      [-1, 1],
      [0, 0],
    ]),
    'x^{3}-x',
  )
  assert.equal(
    polynomial([
      [frac(-1, 2), 3],
      [3, 2],
      [-2, 0],
    ]),
    '-\\frac{1}{2}x^{3}+3x^{2}-2',
  )
  assert.equal(polynomial([[0, 3]]), '0')
  function formulas(node) {
    const result = []
    React.Children.forEach(node, element => {
      if (!React.isValidElement(element)) return
      if (typeof element.props.math === 'string')
        result.push(element.props.math)
      result.push(...formulas(element.props.children))
    })
    return result
  }
  function evaluate(tex, x) {
    const expression = tex
      .replace(/\\frac\{(\d+)\}\{(\d+)\}/g, '($1/$2)')
      .replace(/x\^\{(\d+)\}/g, '(x**$1)')
      .replace(/(\d|\))(?=x|\(x)/g, '$1*')
    assert.match(expression, /^[\d x+*/().-]+$/)
    return new Function('x', `return ${expression}`)(x)
  }
  const close = (actual, expected) =>
    assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`)
  let seed = 89321
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 2 ** 32
  }
  const rng = {
    randomIntBetween: (lo, hi) => lo + Math.floor(random() * (hi - lo + 1)),
    randomItemFromArray: items => items[Math.floor(random() * items.length)],
  }
  for (const id of [21100, 21200, 21300, 21400]) {
    const ex = exercises.find(([number]) => number === id)[1]
    for (const data of [
      ex.originalData,
      ...Array.from({ length: 120 }, () => ex.generator(rng)),
    ]) {
      assert.ok(!Object.hasOwn(data, 'shift') && !Object.hasOwn(data, 'h'))
      const nodes = ex.tasks
        ? [ex.intro({ data }), ...ex.tasks.map(task => task.task({ data }))]
        : [ex.task({ data })]
      const formula = formulas(nodes).find(math => math.startsWith('f(x)='))
      const mainForm = formula.slice(5).split(',')[0]
      assert.doesNotMatch(mainForm, /\\left|\(x|\bu\b/)
      const k = data.k ?? 1,
        a = data.a,
        r = data.r ?? 3
      const coefficients =
        id === 21100
          ? [k / 2, 0, (-3 * k * a * a) / 2, data.c ?? 0]
          : id === 21200
            ? [(-2 * k) / (3 * r), k, 0, -k * (data.c ?? 3)]
            : id === 21300
              ? [k, 3 * k * a, 0, data.offset ?? 0]
              : [k, 0, -3 * k * a * a, 0]
      const [A, B, C, D] = coefficients
      const f = x => A * x ** 3 + B * x ** 2 + C * x + D
      const first = x => 3 * A * x ** 2 + 2 * B * x + C
      const second = x => 6 * A * x + 2 * B
      for (const x of [-3, -1, 0, 1, 3]) close(evaluate(mainForm, x), f(x))
      const solutionNodes = ex.tasks
        ? ex.tasks.map(task => task.solution({ data }))
        : [ex.solution({ data })]
      const solutions = formulas(solutionNodes)
      const derivatives = solutions.find(math => math.startsWith("f'(x)="))
      for (const [index, equation] of derivatives.split(',\\quad').entries()) {
        const term = equation.slice(equation.indexOf('=') + 1)
        for (const x of [-3, 0, 3])
          close(evaluate(term, x), index === 0 ? first(x) : second(x))
      }
      for (const name of ['H', 'T']) {
        const pattern = new RegExp(`${name}\\((-?\\d+)\\\\mid([^)]*)\\)`)
        const match = solutions.map(math => math.match(pattern)).find(Boolean)
        assert.ok(match, `${id}: ${name}`)
        const x = Number(match[1]),
          y = evaluate(match[2], 0)
        close(first(x), 0)
        close(f(x), y)
        assert.ok(name === 'H' ? second(x) < 0 : second(x) > 0)
      }
      if (id === 21300) {
        const slope = solutions
          .map(math => math.match(/m=f'\((-?\d+)\)=(-?\d+)/))
          .find(Boolean)
        assert.ok(slope)
        close(second(Number(slope[1])), 0)
        close(first(Number(slope[1])), Number(slope[2]))
      }
    }
  }
})

test('generated geometry, linear systems and probability data retain their mathematical constraints', () => {
  const { dot, orthogonalPairs, binomial } = load(
    path.join(directory, 'math.ts'),
  )
  for (const { u, v } of orthogonalPairs) assert.equal(dot(u, v), 0)
  let seed = 623876
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 2 ** 32
  }
  const rng = {
    randomIntBetween: (lo, hi) => lo + Math.floor(random() * (hi - lo + 1)),
    randomItemFromArray: arr => arr[Math.floor(random() * arr.length)],
  }
  const get = id => exercises.find(([n]) => n === id)[1]
  const means = new Set(),
    tables = new Set(),
    matrixShapes = new Set()
  for (let i = 0; i < 400; i++) {
    for (const id of [21003, 21202, 21302]) {
      const d = get(id).generator(rng)
      assert.equal(dot(d.u, d.v), 0)
      assert.ok(dot(d.u, d.u) > 0 && dot(d.v, d.v) > 0)
    }
    const triangle = get(21402).generator(rng)
    assert.equal(dot(triangle.a, triangle.b), 0)
    assert.equal(dot(triangle.a, triangle.a), dot(triangle.b, triangle.b))
    const system = get(21106).generator(rng)
    for (const row of system.rows) assert.equal(dot(row, system.nullVector), 0)
    assert.notEqual(
      system.rows[0][0] * system.rows[1][1] -
        system.rows[0][1] * system.rows[1][0],
      0,
    )
    matrixShapes.add(JSON.stringify(system.rows))
    const cubic = get(21200).generator(rng)
    assert.ok(
      cubic.left ** 2 + (2 * cubic.left ** 3) / (3 * cubic.r) - cubic.c > 0,
    )
    const urn = get(21101).generator(rng)
    tables.add(
      binomial(urn.trials, urn.gold / (urn.gold + urn.black + urn.white))
        .slice(0, 7)
        .map(p => Math.round(p * 100))
        .join(','),
    )
    const bin = get(21401).generator(rng),
      prob = binomial(bin.n, bin.mean / bin.n)
    assert.equal(prob.indexOf(Math.max(...prob)), bin.mean)
    assert.deepEqual(
      prob.flatMap((p, k) =>
        Math.round(p * 1000) === Math.round(prob[bin.readAt] * 1000) ? [k] : [],
      ),
      [bin.readAt],
    )
    let sum = 0
    assert.deepEqual(
      prob.flatMap((p, k) => {
        sum += p
        return sum > bin.lower && sum < bin.upper ? [k] : []
      }),
      [bin.cumulativeAt],
    )
    means.add(bin.mean)
  }
  assert.ok(means.size >= 5)
  assert.ok(tables.size >= 20)
  assert.ok(matrixShapes.size >= 30)
})
test('new Part A selections have consistent graphs, probabilities and constructive solutions', () => {
  const { frac, vec } = load(path.join(directory, 'math.ts'))
  const { FunctionGraph } = load(path.join(directory, 'diagrams.tsx'))
  const get = id => exercises.find(([n]) => n === id)[1]
  const nodes = (element, predicate, result = []) => {
    React.Children.forEach(element, child => {
      if (!React.isValidElement(child)) return
      if (predicate(child)) result.push(child)
      nodes(child.props.children, predicate, result)
    })
    return result
  }
  const math = element =>
    nodes(element, child => typeof child.props.math === 'string').map(
      child => child.props.math,
    )
  const ratio = expression => {
    const match = expression.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/)
    return match
      ? ((match[1] ? -1 : 1) * Number(match[2])) / Number(match[3])
      : Number(expression)
  }
  const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`)
  let state = 194368
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 2 ** 32
  }
  const rng = {
    randomIntBetween: (lo, hi) => lo + Math.floor(random() * (hi - lo + 1)),
    randomItemFromArray: items => items[Math.floor(random() * items.length)],
  }
  const dot = (a, b) => a.reduce((sum, n, i) => sum + n * b[i], 0)
  for (let i = 0; i < 100; i++) {
    const sample = id =>
      i === 0 ? get(id).originalData : get(id).generator(rng)
    const sketch = sample(21203)
    const graph = nodes(
      get(21203).tasks[0].solution({ data: sketch }),
      e => e.type === FunctionGraph,
    )[0].props.fn
    for (const x of [-sketch.length, 0, sketch.length]) close(graph(x), 0)
    close(graph(-sketch.length / Math.sqrt(3)), sketch.height)
    close(graph(sketch.length / Math.sqrt(3)), -sketch.height)
    assert.ok(graph(-0.01) > graph(0.01))
    const reflected = sample(21204)
    for (const t of [-5, 0, 7]) {
      const distance = x => x * x + (reflected.y - t) ** 2 + reflected.z ** 2
      close(distance(reflected.x), distance(-reflected.x))
    }
    const exp = sample(21205)
    const expGraph = nodes(
      get(21205).intro({ data: exp }),
      e => e.type === FunctionGraph,
    )[0].props.fn
    close(expGraph(0), 0)
    assert.ok(exp.a * exp.k ** 2 * (Math.exp(-0.5) - 4 * Math.exp(-1)) < 0)
    const integral =
      (exp.a / exp.k) * (1 - Math.exp(-2)) -
      (exp.a / (2 * exp.k)) * (1 - Math.exp(-4))
    assert.ok(integral > 0 && integral < ((2 / exp.k) * exp.a) / 4)
    const geometry = sample(21206)
    assert.equal(dot(geometry.normal, geometry.direction), 0)
    const foot = geometry.support.map(
      (n, j) => n + geometry.t * geometry.direction[j],
    )
    const factor = Math.sqrt(
      dot(geometry.normal, geometry.normal) /
        dot(geometry.direction, geometry.direction),
    )
    const b = foot.map((n, j) => n + factor * geometry.direction[j])
    close(
      dot(
        b.map((n, j) => n - foot[j]),
        b.map((n, j) => n - foot[j]),
      ),
      dot(geometry.normal, geometry.normal),
    )
    assert.ok(
      math(get(21206).tasks[1].solution({ data: geometry })).some(s =>
        s.endsWith(vec(b)),
      ),
    )
    const game = sample(21207)
    close(game.gainCents / 100 + 1 - 0.25 * 4, game.gainCents / 100)
    const dart = sample(21303)
    const probabilities = math(get(21303).intro({ data: dart })).map(ratio)
    close(
      probabilities.reduce((a, b) => a + b, 0),
      1,
    )
    const payout = probabilities.reduce(
      (sum, p, j) => sum + p * dart.payouts[j],
      0,
    )
    const displayedPayout = math(
      get(21303).tasks[0].solution({ data: dart }),
    )[0]
      .split('=')
      .at(-1)
    close(ratio(displayedPayout), payout)
    const projection = sample(21304)
    assert.equal(dot(projection.direction, projection.normal), 0)
    const c = projection.b.map((n, j) => n - projection.normal[j])
    assert.ok(
      math(get(21304).tasks[1].solution({ data: projection }))[0].endsWith(
        vec(c),
      ),
    )
    const cards = sample(21305)
    const equation = math(get(21305).tasks[1].task({ data: cards }))[1].match(
      /^(\d+)n\^2\+(\d+)n\+(\d+)=(\d+)$/,
    )
    assert.ok(equation)
    close(
      Number(equation[1]) * cards.jokers ** 2 +
        Number(equation[2]) * cards.jokers +
        Number(equation[3]),
      Number(equation[4]),
    )
    const system = sample(21306)
    const displayed = math(get(21306).solution({ data: system })).find(s =>
      s.startsWith('L_0='),
    )
    const triples = [...displayed.matchAll(/\((\d+);(\d+);(\d+)\)/g)].map(m =>
      m.slice(1).map(Number),
    )
    const expected = []
    for (let x = 0; x <= system.count; x++)
      for (let y = 0; y <= system.count; y++) {
        const z = system.count - x - y
        if (z >= 0 && x + 2 * y + 4 * z === system.count + system.excess)
          expected.push([x, y, z])
      }
    assert.ok(triples.length > 0)
    assert.deepEqual(triples, expected)
    const construction = sample(21307)
    const functions = math(get(21307).solution({ data: construction }))
      .filter(s => s.startsWith('f(x)='))
      .map(
        s =>
          new Function(
            'x',
            `return ${s.slice(5).replace(/^-/, '-1*').replaceAll('^', '**')}`,
          ),
      )
    const axis = construction.axis
    assert.notEqual(functions[0](axis - 1), functions[0](axis + 1))
    for (const f of functions.slice(1)) close(f(axis - 1), f(axis + 1))
    assert.ok(
      construction.maximum
        ? functions[2](axis) > functions[2](axis + 1)
        : functions[2](axis) < functions[2](axis + 1),
    )
    assert.ok(
      construction.maximum
        ? functions[1](axis) < functions[1](axis + 1)
        : functions[1](axis) > functions[1](axis + 1),
    )
    const area = sample(21403)
    const f = x => area.a * (Math.exp(1 - x / area.root) - 1)
    close(f(area.root), 0)
    const value = area.a * area.root * (Math.E - 2)
    assert.ok(value > 0 && value < area.a * area.root)
    const shipping = sample(21404)
    const posterior =
      ((100 - shipping.share) * shipping.lateOther) /
      (shipping.share * shipping.lateA +
        (100 - shipping.share) * shipping.lateOther)
    const answer = math(get(21404).tasks[1].solution({ data: shipping }))[0]
      .split('=')
      .at(-1)
    close(ratio(answer), posterior)
    const derivative = sample(21405)
    const derivativeGraph = nodes(
      get(21405).intro({ data: derivative }),
      e => e.type === FunctionGraph,
    )[0].props.fn
    close(derivativeGraph(derivative.zero), 0)
    close(derivativeGraph(derivative.zero + 1), derivative.peak)
    for (const x of [derivative.zero - 2, derivative.zero - 0.1])
      assert.ok(derivativeGraph(x) < 0)
    for (const x of [derivative.zero + 0.1, derivative.zero + 8])
      assert.ok(derivativeGraph(x) > 0)
    assert.ok(derivative.minimum > 0)
    const wheel = sample(21406)
    const chance = ratio(math(get(21406).task({ data: wheel }))[0])
    close((wheel.angle / 360) ** 2 + (1 - wheel.angle / 360) ** 2, chance)
    assert.ok(wheel.angle > 0 && wheel.angle < 180)
    const designed = sample(21407)
    const rows = math(get(21407).solution({ data: designed }))[0]
    const rhs = [...rows.matchAll(/&=(-?\d+)/g)].map(m => Number(m[1]))
    assert.equal(rhs.length, 3)
    close(rhs[1] - rhs[0], designed.x2)
    close(rhs[2] - rhs[0], designed.x3)
    close(rhs[0] - designed.x2 - designed.x3, designed.x1)
  }
})

test('binomial variants keep the read-off and cumulative answers unique', () => {
  for (const n of [16, 20, 25]) {
    const p = 4 / n
    let bin = 1
    const probs = Array.from({ length: n + 1 }, (_, k) => {
      if (k) bin = (bin * (n - k + 1)) / k
      return bin * p ** k * (1 - p) ** (n - k)
    })
    assert.equal(probs.indexOf(Math.max(...probs)), 4)
    const target = Math.round(probs[5] * 1000)
    assert.deepEqual(
      probs.flatMap((v, k) => (Math.round(v * 1000) === target ? [k] : [])),
      [5],
    )
    let sum = 0
    assert.deepEqual(
      probs.flatMap((v, k) => {
        sum += v
        return sum > 0.15 && sum < 0.25 ? [k] : []
      }),
      [2],
    )
  }
})
