const assert = require('node:assert/strict')
const { readFileSync, readdirSync } = require('node:fs')
const { resolve } = require('node:path')
const { test } = require('node:test')
const ts = require('typescript')

const root = resolve(__dirname, '..')

// Load the TypeScript data modules without bundling the exercise components.
function loadContentModule(name, dependencies = {}) {
  const fileName = resolve(root, 'src/content', name)
  const { outputText } = ts.transpileModule(readFileSync(fileName, 'utf8'), {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
    },
  })
  const module = { exports: {} }
  const requireDependency = dependency => {
    assert.ok(
      Object.hasOwn(dependencies, dependency),
      `Unexpected import: ${dependency}`,
    )
    return dependencies[dependency]
  }
  new Function('require', 'module', 'exports', outputText)(
    requireDependency,
    module,
    module.exports,
  )
  return module.exports
}

const navigations = loadContentModule('navigations.tsx')
const { navigationData } = navigations
const { schoolforms } = loadContentModule('../data/schoolforms.ts', {
  '@/content/navigations': navigations,
})
const {
  isExerciseForNavigation,
  isExamExerciseInNavigation,
  isExerciseInNavigation,
} = loadContentModule('navigation-exercises.ts', {
  './navigations': navigations,
})

const catalogFile = resolve(root, 'src/content/exercises.tsx')
const catalog = ts.createSourceFile(
  catalogFile,
  readFileSync(catalogFile, 'utf8'),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
)
const imports = new Map()
for (const statement of catalog.statements) {
  if (!ts.isImportDeclaration(statement)) continue
  const bindings = statement.importClause?.namedBindings
  if (!bindings || !ts.isNamedImports(bindings)) continue
  for (const binding of bindings.elements) {
    imports.set(binding.name.text, statement.moduleSpecifier.text)
  }
}
const registeredModules = new Map()
let registeredIds
for (const statement of catalog.statements) {
  if (!ts.isVariableStatement(statement)) continue
  for (const declaration of statement.declarationList.declarations) {
    if (declaration.name.getText(catalog) !== 'exercisesData') continue
    assert.ok(ts.isObjectLiteralExpression(declaration.initializer))
    registeredIds = declaration.initializer.properties.map(property => {
      assert.ok(ts.isPropertyAssignment(property))
      const id = Number(property.name.getText(catalog))
      const modulePath = imports.get(property.initializer.getText(catalog))
      assert.ok(modulePath, `Missing import for exercise ${id}`)
      registeredModules.set(
        id,
        resolve(root, 'src/content', `${modulePath}.tsx`),
      )
      return id
    })
  }
}
assert.ok(registeredIds?.length > 0)

test('welcome and profile schoolforms include every course exactly once', () => {
  assert.equal(
    new Set(schoolforms.map(form => form.shortName)).size,
    schoolforms.length,
  )
  assert.ok(schoolforms.every(form => form.shortName.length > 0))
  const ids = schoolforms.flatMap(form => {
    assert.ok(form.subjects.length > 0)
    return form.subjects.map(subject => subject.examId)
  })
  assert.equal(new Set(ids).size, ids.length)
  assert.deepEqual(
    ids.sort((a, b) => a - b),
    Object.keys(navigationData)
      .map(Number)
      .sort((a, b) => a - b),
  )
  const tg12 = schoolforms.find(form => form.name.includes('(TG12)'))
  assert.deepEqual(
    tg12.subjects.map(subject => subject.examId),
    [13, 14, 27],
  )
})

test('each course only accepts its training entries and assigned exams', () => {
  const examRanges = {
    1: [3000, 3999],
    2: [400, 401],
    6: [9000, 9075],
    15: [21000, 21402],
    25: [26500, 26999],
  }
  for (const [navigationId, navigation] of Object.entries(navigationData)) {
    const id = Number(navigationId)
    const trainingIds = new Set(
      navigation.topics.flatMap(topic =>
        topic.skillGroups.flatMap(group =>
          group.skillExercises.map(exercise => exercise.id),
        ),
      ),
    )
    const range = examRanges[id]
    for (const exerciseId of registeredIds) {
      const exam = Boolean(
        range && exerciseId >= range[0] && exerciseId <= range[1],
      )
      assert.equal(
        isExerciseForNavigation(id, exerciseId),
        trainingIds.has(exerciseId) || exam,
        `${navigation.longTitle}: exercise ${exerciseId}`,
      )
      assert.equal(isExamExerciseInNavigation(id, exerciseId), exam)
    }
  }
})

test('2BFS physics and TG12 mathematics do not receive the other course IDs', () => {
  assert.equal(isExerciseForNavigation(5, 7000), true)
  assert.equal(isExerciseForNavigation(5, 6000), false)
  assert.equal(isExerciseForNavigation(13, 20000), true)
  assert.equal(isExerciseForNavigation(13, 13000), false)
  assert.equal(isExerciseForNavigation(11, 8000), true)
  assert.equal(isExerciseForNavigation(11, 9500), false)
})

test('reused training exercises remain available in graphic design', () => {
  assert.equal(isExerciseForNavigation(18, 9507), true)
  assert.equal(isExerciseForNavigation(18, 4400), true)
  assert.equal(isExerciseForNavigation(18, 10000), true)
  assert.equal(isExerciseForNavigation(18, 3000), false)
})

test('empty courses and invalid selections never fall back to the entire catalog', () => {
  for (const id of [8, 26, 27, 28, 9, -1, 999, NaN, undefined]) {
    assert.equal(
      registeredIds.some(exerciseId => isExerciseForNavigation(id, exerciseId)),
      false,
    )
  }
})

test('exam range boundaries are inclusive and exclude neighboring exercises', () => {
  for (const [id, first, last] of [
    [1, 3000, 3999],
    [2, 400, 401],
    [6, 9000, 9075],
    [15, 21000, 21402],
    [25, 26500, 26999],
  ]) {
    assert.equal(isExamExerciseInNavigation(id, first), true)
    assert.equal(isExamExerciseInNavigation(id, last), true)
    assert.equal(isExamExerciseInNavigation(id, first - 1), false)
    assert.equal(isExamExerciseInNavigation(id, last + 1), false)
  }
})

test('TG13 gAN exams appear only as exams and do not enter the training catalog', () => {
  const ids = registeredIds.filter(id => id >= 21000 && id <= 21402)
  assert.equal(ids.length, 21)
  for (const id of ids) {
    assert.equal(isExamExerciseInNavigation(15, id), true)
    assert.equal(isExerciseInNavigation(15, id), false)
    assert.equal(isExerciseForNavigation(13, id), false)
    assert.equal(isExerciseForNavigation(16, id), false)
  }
})

test('every numbered examination file is registered and assigned to its own course', () => {
  for (const [course, folder] of [
    [1, 'Mathe_2BFS2_Prüfungen'],
    [2, 'Physik_1BK2T_Prüfungen'],
    [6, 'Mathe_AV_Prüfungen'],
    [15, 'Mathe_TG13_gAN_Pruefungen'],
    [25, 'Mec-E_TG13_Prüfungen'],
  ]) {
    const directory = resolve(root, 'src/content/implementations', folder)
    for (const file of readdirSync(directory)) {
      const match = file.match(/^(\d+)(?:-|_|\.tsx$)/)
      if (!match || !file.endsWith('.tsx')) continue
      const id = Number(match[1])
      assert.equal(registeredModules.get(id), resolve(directory, file), file)
      assert.equal(isExamExerciseInNavigation(course, id), true, file)
      for (const otherCourse of Object.keys(navigationData).map(Number)) {
        if (otherCourse !== course) {
          assert.equal(isExamExerciseInNavigation(otherCourse, id), false, file)
        }
      }
    }
  }
})

test('MEC-E keeps training 26000 separate from examination 26500', () => {
  assert.ok(registeredIds.includes(26500))
  assert.equal(isExerciseInNavigation(25, 26000), true)
  assert.equal(isExamExerciseInNavigation(25, 26000), false)
  assert.equal(isExerciseForNavigation(25, 26000), true)
  assert.equal(isExerciseInNavigation(25, 26500), false)
  assert.equal(isExamExerciseInNavigation(25, 26500), true)
  assert.equal(isExerciseForNavigation(25, 26500), true)
})

function exerciseMetadata(id) {
  const fileName = registeredModules.get(id)
  assert.ok(fileName, `Unregistered exercise ${id}`)
  const source = ts.createSourceFile(
    fileName,
    readFileSync(fileName, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(source) !== `exercise${id}`) continue
      assert.ok(ts.isObjectLiteralExpression(declaration.initializer))
      return Object.fromEntries(
        declaration.initializer.properties
          .filter(
            property =>
              ts.isPropertyAssignment(property) &&
              ['title', 'source'].includes(property.name.getText(source)),
          )
          .map(property => {
            assert.ok(ts.isStringLiteralLike(property.initializer))
            return [property.name.getText(source), property.initializer.text]
          }),
      )
    }
  }
  assert.fail(`Missing exercise${id} export in ${fileName}`)
}

function listHarness(course, entries) {
  const React = require('react')
  const opened = [],
    routes = [],
    events = []
  const { List } = loadContentModule('../components/pages/tabs/List.tsx', {
    react: { ...React, useMemo: factory => factory() },
    'react/jsx-runtime': require('react/jsx-runtime'),
    '/assets/simple-document-icon-paper-sheet-and-pencil-png.png': {
      default: { src: 'pen.png' },
    },
    '@/components/exercise-view/state/actions': {
      setupExercise: id => opened.push(id),
    },
    '@/content/exercises': { exercisesData: entries },
    '@/content/navigation-exercises': { isExamExerciseInNavigation },
    '@ionic/react': Object.fromEntries(
      [
        'Page',
        'Header',
        'Toolbar',
        'Title',
        'Content',
        'AccordionGroup',
        'Accordion',
        'Item',
        'Label',
      ].map(name => [`Ion${name}`, `ion-${name.toLowerCase()}`]),
    ),
    '../../../../store/player-profile-store': {
      PlayerProfileStore: {
        useState: selector => selector({ currentExam: course }),
      },
    },
    '../../../../store/progress-store': { useProgress: () => null },
    'react-router': { useHistory: () => ({ push: path => routes.push(path) }) },
    '@/components/onboarding/TutorialProvider': {
      useTutorial: () => ({ notifyTutorial: event => events.push(event) }),
    },
  })
  const tree = List()
  function all(node, predicate) {
    if (!React.isValidElement(node)) return []
    return [
      ...(predicate(node) ? [node] : []),
      ...React.Children.toArray(node.props.children).flatMap(child =>
        all(child, predicate),
      ),
    ]
  }
  return {
    tree,
    opened,
    routes,
    events,
    accordions: all(tree, node => node.type === 'ion-accordion'),
    groups: all(tree, node => node.type === 'ion-accordiongroup'),
    rows: all(
      tree,
      node =>
        typeof node.type === 'function' && typeof node.props.idNum === 'number',
    ),
    html: () => require('react-dom/server').renderToStaticMarkup(tree),
  }
}

test('Liste renders all 77 2BFS maths exams under their decimal years and opens the correct ID', () => {
  const ids = registeredIds.filter(id => id >= 3000 && id <= 3999)
  assert.equal(ids.length, 77)
  const entries = Object.fromEntries(
    [...ids, 26000, 26500].map(id => [id, exerciseMetadata(id)]),
  )
  const view = listHarness(1, entries)
  assert.equal(view.rows.length, 77)
  assert.deepEqual(
    view.accordions.map(node => node.props.value),
    ['2025', '2024', '2023', '2022', '2021'],
  )
  assert.deepEqual(
    view.rows.slice(0, 13).map(node => node.props.idNum),
    Array.from({ length: 13 }, (_, index) => 3200 + index),
  )
  assert.ok(!view.html().includes('keine Prüfungsaufgaben hinterlegt'))
  const row = view.rows.find(node => node.props.idNum === 3000)
  row.type(row.props).props.onClick()
  assert.deepEqual(view.opened, [3000])
  assert.deepEqual(view.routes, ['/exercise/3000'])
  const target = {}
  view.groups[0].props.onIonChange({
    target,
    currentTarget: target,
    detail: { value: '2025' },
  })
  assert.deepEqual(view.events, ['year-open:2025'])
})

test('Liste renders MEC-E 26500 without inventing a year and never includes training 26000', () => {
  const entries = Object.fromEntries(
    [3000, 26000, 26500].map(id => [id, exerciseMetadata(id)]),
  )
  const view = listHarness(25, entries)
  assert.deepEqual(
    view.rows.map(node => node.props.idNum),
    [26500],
  )
  assert.deepEqual(
    view.accordions.map(node => node.props.value),
    ['0'],
  )
  assert.match(view.html(), /Sonstige/)
  assert.ok(!entries[26500].source.includes('Training'))
  view.rows[0].type(view.rows[0].props).props.onClick()
  assert.deepEqual(view.opened, [26500])
  assert.deepEqual(view.routes, ['/exercise/26500'])
})

test('Liste still displays the existing BK physics, AV and TG13 exam collections', () => {
  const entries = Object.fromEntries(
    [400, 401, 3000, 9000, 21000, 26000, 26500].map(id => [
      id,
      exerciseMetadata(id),
    ]),
  )
  for (const [course, expected] of [
    [2, [400, 401]],
    [6, [9000]],
    [15, [21000]],
  ]) {
    const view = listHarness(course, entries)
    assert.deepEqual(
      view.rows.map(node => node.props.idNum),
      expected,
    )
    assert.ok(!view.html().includes('keine Prüfungsaufgaben hinterlegt'))
  }
  assert.equal(listHarness(999, entries).rows.length, 0)
})

test('onboarding plans stay within all registered courses and exercise IDs', () => {
  const { buildTutorialPlan } = loadContentModule(
    '../components/onboarding/tutorial-model.ts',
  )
  const entries = Object.fromEntries(registeredIds.map(id => [id, {}]))
  for (const [course, navigation] of Object.entries(navigationData)) {
    const id = Number(course)
    const plan = buildTutorialPlan(
      id,
      navigationData,
      entries,
      isExamExerciseInNavigation,
    )
    if (plan.exerciseId !== null) {
      assert.ok(registeredIds.includes(plan.exerciseId))
      assert.ok(
        navigation.topics[plan.topicIndex].skillGroups.some(group =>
          group.skillExercises.some(
            exercise => exercise.id === plan.exerciseId,
          ),
        ),
      )
    } else {
      assert.ok(!plan.steps.some(step => step.route.startsWith('/exercise/')))
    }
    assert.equal(
      plan.examYear !== null,
      registeredIds.some(exerciseId =>
        isExamExerciseInNavigation(id, exerciseId),
      ),
    )
    assert.equal(
      new Set(plan.steps.map(step => step.id)).size,
      plan.steps.length,
    )
  }
})
