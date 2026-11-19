const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { test } = require('node:test')
const ts = require('typescript')
const React = require('react')

const root = resolve(__dirname, '..')
function load(file, dependencies = {}) {
  const fileName = resolve(root, file)
  const module = { exports: {} }
  const { outputText } = ts.transpileModule(readFileSync(fileName, 'utf8'), {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  })
  new Function('require', 'module', 'exports', outputText)(
    name => {
      assert.ok(Object.hasOwn(dependencies, name), name)
      return dependencies[name]
    },
    module,
    module.exports,
  )
  return module.exports
}
const model = load('src/components/gisela/learning-coach.ts')
const navigation = {
  topics: [
    {
      title: 'Zahlen',
      skillGroups: [
        { skillExercises: [{ id: 10 }, { id: 11 }, { id: 10 }, { id: 999 }] },
      ],
    },
    {
      title: 'Brüche',
      skillGroups: [{ skillExercises: [{ id: 12 }, { id: 13 }] }],
    },
  ],
}
const catalog = {
  10: { title: 'Zahlen vergleichen', duration: 1 },
  11: { title: 'Runden', duration: 5, tasks: [{}, {}] },
  12: { title: 'Brüche erweitern', duration: 2 },
  13: { title: 'Brüche vergleichen', duration: 3 },
  100: { title: 'Prüfung', duration: 15, tasks: [{}, {}, {}] },
  200: { title: 'Fremder Kurs', duration: 1 },
}
const entries = model.getCoachExercises(navigation, catalog, [100])

test('coach deduplicates registered course tasks and offers a short training entry first', () => {
  assert.deepEqual(
    entries.map(entry => entry.id),
    [10, 11, 12, 13, 100],
  )
  assert.equal(model.recommendCoachExercise(entries, {}).id, 10)
  assert.equal(model.recommendCoachExercise(entries, {}).reason, 'start')
  const alternate = model.recommendCoachExercise(entries, {}, null, 1)
  assert.equal(alternate.id, 11)
  assert.equal(alternate.alternatives, 2)
})

test('learner retry and review markings take precedence over automatic choices', () => {
  const progress = {
    10: { flagged: true },
    13: { reviewLater: true },
    200: { reviewLater: true },
  }
  const result = model.recommendCoachExercise(entries, progress)
  assert.equal(result.id, 13)
  assert.equal(result.reason, 'retry')
  assert.equal(result.alternatives, 1)
  const review = model.recommendCoachExercise(entries, {
    12: { flagged: true },
  })
  assert.equal(review.id, 12)
  assert.equal(review.reason, 'later')
  assert.notEqual(
    model.recommendCoachExercise(entries, {
      10: { solved: true, reviewLater: true },
    }).id,
    10,
  )
})

test('equally short tasks keep the curricular order, not numerical ID order', () => {
  const list = model.getCoachExercises(
    {
      topics: [
        {
          title: 'Parabeln',
          skillGroups: [
            {
              skillExercises: [{ id: 4008 }, { id: 4003 }],
            },
          ],
        },
      ],
    },
    {
      4008: { title: 'Ablesen', duration: 6 },
      4003: { title: 'Berechnen', duration: 6 },
    },
    [],
  )
  assert.equal(model.recommendCoachExercise(list, {}).id, 4008)
})

test('coach continues the most recent partially completed topic, not a finished one', () => {
  const result = model.recommendCoachExercise(entries, {
    10: { solved: true, solvedAt: 10 },
    12: { solved: true, solvedAt: 20 },
  })
  assert.equal(result.id, 13)
  assert.equal(result.reason, 'continue')
  const next = model.recommendCoachExercise(entries, {
    10: { solved: true, solvedAt: 10 },
    12: { solved: true, solvedAt: 20 },
    13: { solved: true, solvedAt: 30 },
  })
  assert.equal(next.id, 11)
})

test('explicit topic choice overrides recommendations and can offer a new solved variant', () => {
  const progress = {
    10: { reviewLater: true },
    12: { solved: true },
    13: { solved: true },
  }
  const result = model.recommendCoachExercise(entries, progress, 1)
  assert.equal(result.topic, 'Brüche')
  assert.equal(result.reason, 'repeat')
  assert.equal(result.id, 12)
  assert.equal(model.recommendCoachExercise(entries, progress, 1, 1).id, 13)
  assert.equal(model.recommendCoachExercise(entries, progress, 999), null)
})

test('empty, exam-only and fully completed courses have honest fallback states', () => {
  assert.equal(model.recommendCoachExercise([], {}), null)
  const exams = model.getCoachExercises({ topics: [] }, catalog, [100])
  assert.equal(model.recommendCoachExercise(exams, {}).reason, 'exam')
  const completed = Object.fromEntries(
    entries.map(entry => [entry.id, { solved: true }]),
  )
  assert.equal(
    model.recommendCoachExercise(entries, completed).reason,
    'repeat',
  )
})

test('every real course recommendation stays inside its navigation and assigned exams', () => {
  const nav = load('src/content/navigations.tsx')
  const filters = load('src/content/navigation-exercises.ts', {
    './navigations': nav,
  })
  const file = readFileSync(resolve(root, 'src/content/exercises.tsx'), 'utf8')
  const source = ts.createSourceFile(
    'exercises.tsx',
    file,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  let registered
  for (const statement of source.statements) {
    if (ts.isVariableStatement(statement))
      for (const declaration of statement.declarationList.declarations) {
        if (declaration.name.getText(source) === 'exercisesData')
          registered = declaration.initializer.properties.map(property =>
            Number(property.name.getText(source)),
          )
      }
  }
  const data = Object.fromEntries(
    registered.map(id => [id, { title: `Aufgabe ${id}`, duration: 1 }]),
  )
  for (const [key, course] of Object.entries(nav.navigationData)) {
    const id = Number(key)
    const items = model.getCoachExercises(
      course,
      data,
      registered.filter(exercise =>
        filters.isExamExerciseInNavigation(id, exercise),
      ),
    )
    assert.ok(
      items.every(entry => filters.isExerciseForNavigation(id, entry.id)),
    )
    const result = model.recommendCoachExercise(items, {})
    if (result) assert.ok(filters.isExerciseForNavigation(id, result.id))
    else
      assert.equal(
        registered.some(exercise =>
          filters.isExerciseForNavigation(id, exercise),
        ),
        false,
      )
  }
})

function coachHarness(courseId = 6) {
  let open = false
  const component = load('src/components/gisela/LearningCoach.tsx', {
    react: {
      ...React,
      useState: () => [
        open,
        value => {
          open = value
        },
      ],
    },
    'react/jsx-runtime': require('react/jsx-runtime'),
    '@fortawesome/free-solid-svg-icons': { faArrowRight: {} },
    '@/components/ui/FaIcon': { FaIcon: () => null },
    './Gisela': {
      Gisela: props =>
        React.createElement('img', { alt: 'Gisela', 'data-look': props.look }),
    },
    './gisela-looks': {
      getGiselaLook: id => (id === 6 ? 'workshop' : 'research'),
    },
    './LearningCoachChat': { LearningCoachChat: () => null },
    './LearningCoach.module.css': { default: {} },
  })
  return {
    render: () =>
      component.LearningCoach({ courseId, name: 'Alex', progress: {} }),
  }
}
function elements(tree) {
  if (!tree || typeof tree !== 'object') return []
  if (Array.isArray(tree)) return tree.flatMap(elements)
  return [tree, ...elements(tree.props?.children)]
}
const html = tree => require('react-dom/server').renderToStaticMarkup(tree)

test('compact lower entry opens a chat only on demand, not a dashboard recommendation', () => {
  const h = coachHarness()
  let tree = h.render()
  assert.ok(html(tree).includes('Dein Lernassistent'))
  assert.ok(html(tree).includes('data-look="workshop"'))
  assert.ok(!html(tree).includes('Was soll ich lernen?'))
  assert.equal(
    elements(tree).find(node => node.props?.onClose).props.open,
    false,
  )
  elements(tree)
    .find(node => node.type === 'button')
    .props.onClick()
  tree = h.render()
  const chat = elements(tree).find(node => node.props?.onClose)
  assert.equal(chat.props.open, true)
  assert.equal(chat.props.name, 'Alex')
  chat.props.onClose()
  assert.equal(
    elements(h.render()).find(node => node.props?.onClose).props.open,
    false,
  )
})

test('old greeting is restored; the coach replaces random tasks after progress', () => {
  const start = readFileSync(
    resolve(root, 'src/components/pages/tabs/Start.tsx'),
    'utf8',
  )
  assert.match(start, /<LearningCoach\s+key=\{exam\}/)
  assert.ok(start.indexOf('<LearningCoach') > start.indexOf('Dein Fortschritt'))
  assert.ok(start.includes('Schön, dich wiederzusehen.'))
  assert.ok(!start.includes('Zufällige Aufgabe'))
  assert.ok(!start.includes('pickUnsolvedRandom'))
  assert.ok(start.includes('data-tutorial="dashboard-greeting"'))
  assert.ok(start.includes('data-tutorial="dashboard-suggestion"'))
  assert.ok(html(coachHarness(13).render()).includes('data-look="research"'))
})
