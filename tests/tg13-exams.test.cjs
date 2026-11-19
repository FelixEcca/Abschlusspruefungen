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
function checkFormulas(node, id) {
  React.Children.forEach(node, element => {
    if (!React.isValidElement(element)) return
    const math = element.props.math
    if (typeof math === 'string') {
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
  21300: { a: 1 },
  21301: { r: 3, y: 2 },
  21302: { s: 0 },
  21400: { a: 1 },
  21401: { n: 20 },
  21402: { k: 1, h: 6 },
}
test('all 21 compulsory exam sheets retain their transcribed original parameters and point totals', () => {
  assert.equal(exercises.length, 21)
  for (const [id, ex] of exercises) {
    assert.deepEqual(ex.originalData, originals[id], String(id))
    assert.equal(ex.useCalculator, false)
    assert.match(ex.source, /20(22|23|24|25|26) Pflichtteil/)
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

test('each exam generates at least 24 different parameter sets and task statements', () => {
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
      parameters.size >= 24,
      `${id}: only ${parameters.size} parameter sets`,
    )
    assert.ok(
      statements.size >= 24,
      `${id}: only ${statements.size} task statements`,
    )
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
