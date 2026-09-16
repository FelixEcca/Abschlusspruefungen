const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const ts = require('typescript')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

const root = path.resolve(__dirname, '..')
const originalResolve = Module._resolveFilename
Module._resolveFilename = function resolve(request, parent, ...rest) {
  const resolved = request.startsWith('@/')
    ? path.join(root, 'src', request.slice(2))
    : request
  return originalResolve.call(this, resolved, parent, ...rest)
}

for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const source = fs.readFileSync(filename, 'utf8')
    const compiled = ts.transpileModule(source, {
      fileName: filename,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText
    module._compile(compiled, filename)
  }
}

class TestRng {
  constructor(seed) {
    this.state = Math.imul(seed || 1, 0x9e3779b1) >>> 0
    for (let index = 0; index < 4; index++) this.random()
  }

  random() {
    this.state = (Math.imul(this.state, 1664525) + 1013904223) >>> 0
    return this.state / 2 ** 32
  }

  randomIntBetween(lower, upper, step = 1) {
    assert.ok(upper >= lower, `Invalid range ${lower}..${upper}`)
    assert.equal((upper - lower) % step, 0)
    return lower + Math.floor(this.random() * ((upper - lower) / step + 1)) * step
  }

  randomItemFromArray(array) {
    return array[Math.floor(this.random() * array.length)]
  }

  randomBoolean() {
    return this.random() < 0.5
  }

  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
}

function renderExercise(exercise, data, label) {
  const parts = 'tasks' in exercise
    ? [exercise.intro, ...exercise.tasks.flatMap((task) => [task.task, task.solution])]
    : [exercise.task, exercise.solution]
  for (const part of parts) {
    if (!part) continue
    const html = renderToStaticMarkup(React.createElement(part, { data }))
    assert.doesNotMatch(html, /katex-error|KaTeX parse error|\bNaN\b|\bInfinity\b/, label)
  }
}

const variants = new Map()
let rendered = 0
for (const id of [...Array.from({ length: 26 }, (_, index) => 13000 + index).filter((id) => id !== 13012), 9572]) {
  const folder = id === 9572 ? 'Mathe_AV_Training' : 'Mathe_Meister_Training'
  const file = path.join(root, 'src', 'content', 'implementations', folder, `${id}.tsx`)
  const exercise = require(file)[`exercise${id}`]
  assert.ok(exercise, `Exercise ${id} missing`)
  if (exercise.originalData) {
    assert.ok(!exercise.constraint || exercise.constraint({ data: exercise.originalData, rng: new TestRng(id) }), `${id} originalData violates constraint`)
    renderExercise(exercise, exercise.originalData, `${id} original`)
    rendered++
  }
  const seen = new Set()
  for (let seed = 1; seed <= 100; seed++) {
    const rng = new TestRng(id * 1000 + seed)
    let data
    for (let attempt = 0; attempt < 1000; attempt++) {
      data = exercise.generator(rng)
      if (!exercise.constraint || exercise.constraint({ data, rng })) break
    }
    assert.ok(!exercise.constraint || exercise.constraint({ data, rng }), `${id} could not satisfy constraint`)
    if (id === 13000) {
      assert.notEqual(data.partA.structure, data.partB.structure)
    }
    if (id === 13001) {
      assert.equal(new Set([data.partA.mode, data.partB.mode, data.partC.mode]).size, 3)
    }
    if (id === 13006) {
      const earlier = [data.coefficient1 * 10 ** data.exponent1, data.coefficient2 * 10 ** data.exponent2]
      const comparison = [data.coefficient3 * 10 ** data.exponent3, data.coefficient4 * 10 ** data.exponent4]
      assert.equal(comparison.filter((value) => earlier.includes(value)).length, 0)
    }
    renderExercise(exercise, data, `${id} seed ${seed}`)
    for (const key of ['plate', 'workpiece', 'figure', 'errorType', 'mode']) {
      if (data[key]) seen.add(`${key}:${data[key]}`)
    }
    rendered++
  }
  variants.set(id, [...seen])
}

assert.equal(variants.get(13023).length, 4, '13023 must produce four drawings')
assert.equal(variants.get(13024).length, 6, '13024 must produce six workpieces')
assert.equal(variants.get(9572).length, 6, '9572 must produce six shapes')
assert.equal(variants.get(13010).length, 3, '13010 must vary the error')
console.log(`Verified ${rendered} original and generated exercises without KaTeX or numeric render errors.`)
