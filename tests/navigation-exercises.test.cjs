const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
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
const { isExerciseForNavigation, isExamExerciseInNavigation } =
  loadContentModule('navigation-exercises.ts', { './navigations': navigations })

const catalogFile = resolve(root, 'src/content/exercises.tsx')
const catalog = ts.createSourceFile(
  catalogFile,
  readFileSync(catalogFile, 'utf8'),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
)
let registeredIds
for (const statement of catalog.statements) {
  if (!ts.isVariableStatement(statement)) continue
  for (const declaration of statement.declarationList.declarations) {
    if (declaration.name.getText(catalog) !== 'exercisesData') continue
    assert.ok(ts.isObjectLiteralExpression(declaration.initializer))
    registeredIds = declaration.initializer.properties.map(property =>
      Number(property.name.getText(catalog)),
    )
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
  const examRanges = { 1: [3000, 3999], 2: [400, 401], 6: [9000, 9075] }
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
  ]) {
    assert.equal(isExamExerciseInNavigation(id, first), true)
    assert.equal(isExamExerciseInNavigation(id, last), true)
    assert.equal(isExamExerciseInNavigation(id, first - 1), false)
    assert.equal(isExamExerciseInNavigation(id, last + 1), false)
  }
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
