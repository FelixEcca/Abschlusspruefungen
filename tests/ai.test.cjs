const { describe } = require('node:test')

describe('Prompts and assessment', { concurrency: false }, () => {
  const assert = require('node:assert/strict')
  const { readFileSync } = require('node:fs')
  const { resolve } = require('node:path')
  const { test } = require('node:test')
  const ts = require('typescript')

  function load(file) {
    const module = { exports: {} }
    const { outputText } = ts.transpileModule(
      readFileSync(resolve(__dirname, '..', file), 'utf8'),
      { compilerOptions: { module: ts.ModuleKind.CommonJS } },
    )
    new Function('module', 'exports', outputText)(module, module.exports)
    return module.exports
  }
  const prompts = load('src/helper/ai-prompts.ts')
  const {
    parseImageReview,
    parseTextReview,
    ERROR_ANALYSIS_RESPONSE_FORMAT,
    TEXT_REVIEW_RESPONSE_FORMAT,
  } = load('src/helper/ai-review.ts')

  test('audience profiles cover actual courses without inferring individual ability', () => {
    for (const [course, expected] of [
      ['AV - BFK - Metall', /AV: kurze/],
      ['2BFS2 - Mathe', /2BFS:/],
      ['1BK1T - Grundlagen der Technik', /Berufskolleg:/],
      ['3BKGD3 - Mathematik I', /Berufskolleg:/],
      ['TG11 - Physik', /Eingangsklasse/],
      ['TG12 - Mathematik eAN', /Erhöhtes Anforderungsniveau/],
      ['TG13 - Mathematik gAN', /Grundlegendes Anforderungsniveau/],
      ['Vorbereitungskurs Meister - Mathematik', /Erwachsenenansprache/],
      ['FTM - Technische Mathematik', /Fachschule Technik/],
      ['', /nicht eindeutig bekannt/],
    ]) {
      assert.match(
        prompts.getAudienceProfile(course).guidance,
        expected,
        course,
      )
      assert.match(
        prompts.audienceInstruction(course),
        /keine Diagnose der Person/,
      )
      assert.match(
        prompts.audienceInstruction(course),
        /niemals die fachliche Wahrheit/,
      )
    }
    assert.match(
      prompts.getAudienceProfile('TG13 - Mathematik gAN').guidance,
      /Abiturbezug/,
    )
  })

  test('support preference is based on explicit wishes, not length or mathematical punctuation', () => {
    const standard = prompts.teachingPreference('2')
    assert.equal(
      prompts.teachingPreference('Daher gilt: 2 + 3 = 5. '.repeat(100)),
      standard,
    )
    assert.equal(prompts.teachingPreference('[Bild]'), standard)
    assert.match(standard, /keine Kompetenzmessung/)
    assert.match(
      prompts.teachingPreference('Ich verstehe das nicht'),
      /Mehr Orientierung/,
    )
    assert.match(prompts.teachingPreference('Bitte kürzer'), /kurze Antwort/)
    assert.match(prompts.teachingPreference('4', 'schritt'), /Antwort abwarten/)
  })

  test('mode rules preserve task identity and avoid fragmented or premature solutions', () => {
    assert.deepEqual(
      Object.keys(prompts.MODE_INSTRUCTIONS).sort(),
      [
        'leicht',
        'schwer',
        'schritt',
        'tipp',
        'humor',
        'pruefen',
        'erklaeren',
      ].sort(),
    )
    assert.match(
      prompts.getModeInstruction('pruefen'),
      /Ohne eigene Einreichung/,
    )
    assert.match(prompts.getModeInstruction('tipp'), /ersten noch offenen/)
    assert.match(
      prompts.getModeInstruction('schritt'),
      /nicht jede kleine Rechenoperation/,
    )
    assert.match(
      prompts.getModeInstruction('erklaeren'),
      /einschließlich Ergebnis/,
    )
    assert.match(
      prompts.EXERCISE_ASSISTANT_PROMPT,
      /bezieht sich die folgende Antwort auf diese Variante/,
    )
    for (const invalid of ['__proto__', 'constructor', null, {}]) {
      assert.equal(typeof prompts.getModeInstruction(invalid), 'string')
      assert.match(prompts.getModeInstruction(invalid), /konkrete Anliegen/)
    }
  })

  test('server math examples survive JSON, KaTeX and the actual Markdown renderer', async () => {
    const { default: ReactMarkdown } = await import('react-markdown')
    const { default: remarkMath } = await import('remark-math')
    const { default: rehypeKatex } = await import('rehype-katex')
    const React = require('react')
    const { renderToStaticMarkup } = require('react-dom/server')
    const katex = require('katex')
    const instruction = JSON.parse(JSON.stringify(prompts.MATH_FORMAT_RULES))
    const line = instruction
      .split('\n')
      .find(line => line.startsWith('Gültige Beispiele:'))
    const examples = Array.from(
      line.matchAll(/\$([^$]+)\$/g),
      match => match[1],
    )
    assert.equal(examples.length, 5)
    for (const example of examples) {
      assert.doesNotThrow(() =>
        katex.renderToString(example, { throwOnError: true, strict: 'error' }),
      )
    }
    const markup = renderToStaticMarkup(
      React.createElement(ReactMarkdown, {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        children: line,
      }),
    )
    assert.equal((markup.match(/class="katex"/g) ?? []).length, 5)
    assert.ok(!markup.includes('katex-error'))
  })

  function review(overrides = {}) {
    return parseImageReview(
      JSON.stringify({
        feedback: 'Dein Ergebnis stimmt. 200 cm und 2 m sind gleich lang.',
        verdict: 'correct',
        result_status: 'correct',
        work_status: 'not_provided',
        image_observation: 'Das Ergebnis lautet 200 cm.',
        image_confidence: 0.99,
        assessment_confidence: 0.99,
        student_work: '200 cm',
        reference_check: 'Die gesuchte Länge beträgt 2 m = 200 cm.',
        uncertainty_question: null,
        error: null,
        ...overrides,
      }),
    )
  }

  test('review accepts a correct result without demanding unrequested working', () => {
    const result = review()
    assert.match(result.feedback, /Ergebnis stimmt/)
    assert.equal(result.error, null)
    assert.deepEqual(Object.keys(result).sort(), [
      'error',
      'feedback',
      'imageAnalysis',
    ])
  })

  test('review can confirm a correct partial solution without a false error', () => {
    const result = review({
      verdict: 'partial',
      feedback:
        'x = 2 ist eine richtige Lösung. Welche weitere Lösung erfüllt x² = 4?',
      student_work: 'x = 2',
    })
    assert.match(result.feedback, /richtige Lösung/)
    assert.equal(result.error, null)
  })

  test('review rejects contradictory verdicts and unsupported error locations', () => {
    for (const changes of [
      { verdict: 'correct', work_status: 'incorrect' },
      { verdict: 'partial', result_status: 'incorrect' },
      { verdict: 'incorrect' },
      { verdict: 'correct', result_status: 'not_provided' },
      { student_work: '' },
      { reference_check: '' },
      { error: { target_text: '200 cm', label: 'Einheit', confidence: 0.99 } },
      { verdict: 'incorrect', result_status: 'incorrect', error: null },
      {
        verdict: 'incorrect',
        result_status: 'incorrect',
        error: {
          target_text: 'nicht im Bild',
          label: 'Fehler',
          confidence: 0.99,
        },
      },
      {
        verdict: 'incorrect',
        result_status: 'incorrect',
        error: { target_text: '200 cm', label: 'Fehler', confidence: 0.5 },
      },
    ]) {
      const result = review(changes)
      assert.match(
        result.feedback,
        /nicht sicher beurteilen/,
        JSON.stringify(changes),
      )
      assert.equal(result.error, null)
    }
  })

  test('correct result and incorrect work remain explicitly distinct', () => {
    const result = review({
      verdict: 'incorrect',
      work_status: 'incorrect',
      student_work: '2 + 2 = 5; Ergebnis: 200 cm',
      feedback:
        'Das Endergebnis stimmt. Im Rechenweg ist 2 + 2 = 5 jedoch falsch.',
      error: {
        target_text: '2 + 2 = 5',
        label: 'Addition prüfen',
        confidence: 0.99,
      },
    })
    assert.match(result.feedback, /Endergebnis stimmt/)
    assert.equal(result.error.targetText, '2 + 2 = 5')
    const partial = review({
      verdict: 'partial',
      work_status: 'incorrect',
      student_work: '2 + 2 = 5; Ergebnis: 200 cm',
      feedback:
        'Das Endergebnis stimmt. Im Rechenweg ist 2 + 2 = 5 jedoch falsch.',
      error: {
        target_text: '2 + 2 = 5',
        label: 'Addition prüfen',
        confidence: 0.99,
      },
    })
    assert.match(partial.feedback, /Endergebnis stimmt/)
    assert.equal(partial.error.targetText, '2 + 2 = 5')
  })

  test('low or invalid confidence never produces a certain grading', () => {
    for (const changes of [
      { image_confidence: 0.4 },
      { assessment_confidence: 0.79 },
      { image_confidence: 99 },
      { assessment_confidence: '0.99' },
      { work_status: 'uncertain' },
      { verdict: 'invalid' },
      { verdict: 'no_submission', image_confidence: 0.2 },
    ]) {
      const result = review(changes)
      assert.match(result.feedback, /nicht sicher beurteilen/)
      assert.equal(result.error, null)
    }
    assert.equal(
      review({ image_confidence: 0.4 }).imageAnalysis.observation,
      'Die entscheidende Stelle ist nicht sicher lesbar.',
    )
  })

  test('review asks one specific clarification or requests an actual submission', () => {
    assert.match(
      review({
        verdict: 'uncertain',
        uncertainty_question: 'Steht dort 2 oder 7?',
      }).feedback,
      /Steht dort 2 oder 7/,
    )
    assert.match(
      review({ verdict: 'no_submission', student_work: '' }).feedback,
      /noch keine eigene Antwort/,
    )
    assert.throws(() => parseImageReview('null'))
    assert.throws(() => parseImageReview('[]'))
    assert.throws(() => parseImageReview('invalid json'))
    const schema = ERROR_ANALYSIS_RESPONSE_FORMAT.json_schema.schema
    assert.deepEqual(
      schema.required.sort(),
      Object.keys(schema.properties).sort(),
    )
    assert.equal(schema.additionalProperties, false)
    assert.equal(Object.keys(schema.properties)[0], 'student_work')
    assert.equal(Object.keys(schema.properties).at(-1), 'feedback')
  })

  test('text assessment uses the same consistency guards without trusting image fields', () => {
    const result = parseTextReview(
      JSON.stringify({
        verdict: 'correct',
        result_status: 'correct',
        work_status: 'not_provided',
        student_work: '200 cm',
        reference_check: 'Entspricht 2 m.',
        assessment_confidence: 0.99,
        feedback: 'Dein Ergebnis stimmt.',
        uncertainty_question: null,
        error: null,
        image_confidence: 0,
        image_observation: 'May not turn into visible image metadata',
      }),
    )
    assert.equal(result.feedback, 'Dein Ergebnis stimmt.')
    assert.equal(result.imageAnalysis, null)
    assert.equal(result.error, null)
    const schema = TEXT_REVIEW_RESPONSE_FORMAT.json_schema.schema
    assert.deepEqual(
      schema.required.sort(),
      Object.keys(schema.properties).sort(),
    )
    assert.equal(schema.properties.image_confidence, undefined)
    assert.equal(schema.properties.image_observation, undefined)
    assert.equal(Object.keys(schema.properties).at(-1), 'feedback')
    assert.throws(() => parseTextReview('null'))
  })
})

describe('AI API and context', { concurrency: false }, () => {
  const assert = require('node:assert/strict')
  const { readFileSync } = require('node:fs')
  const { resolve } = require('node:path')
  const { test } = require('node:test')
  const ts = require('typescript')

  function load(file, dependencies = {}, fetch = global.fetch) {
    const module = { exports: {} }
    const fileName = resolve(__dirname, '..', file)
    const { outputText } = ts.transpileModule(readFileSync(fileName, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
      fileName,
    })
    new Function(
      'require',
      'module',
      'exports',
      'fetch',
      'process',
      outputText,
    )(
      name => {
        assert.ok(Object.hasOwn(dependencies, name), name)
        return dependencies[name]
      },
      module,
      module.exports,
      fetch,
      {
        env: {
          OPENAI_API_KEY: 'test-only-not-a-key',
          OPENAI_MODEL: 'test-model',
          NODE_ENV: 'test',
        },
      },
    )
    return module.exports
  }
  const prompts = load('src/helper/ai-prompts.ts')
  const review = load('src/helper/ai-review.ts')
  const coach = load('src/components/gisela/learning-coach.ts')
  const coachChat = load('src/helper/learning-coach-chat.ts', {
    '@/components/gisela/learning-coach': coach,
  })

  function createApi(
    reply = JSON.stringify({
      feedback: 'Dein Ergebnis stimmt.',
      verdict: 'correct',
      result_status: 'correct',
      work_status: 'not_provided',
      assessment_confidence: 0.99,
      student_work: '200 cm',
      reference_check: '2 m = 200 cm',
      uncertainty_question: null,
      error: null,
    }),
  ) {
    const calls = []
    const route = load(
      'src/app/api/va89kjds/route.ts',
      {
        'next/server': { NextResponse: Response },
        '@/content/navigations': {
          navigationData: {
            6: { longTitle: 'AV - Mathe', shortTitle: 'AV', topics: [] },
            15: {
              longTitle: 'TG13 - Mathematik gAN',
              shortTitle: 'TG13',
              topics: [],
            },
          },
        },
        '@/content/exercises': {
          exercisesData: {
            11: { title: 'Längen', duration: 3 },
            21: { title: 'Analysis', duration: 4 },
          },
        },
        '@/content/navigation-exercises': {
          isExerciseForNavigation: (course, id) =>
            (course === 6 && id === 11) || (course === 15 && id === 21),
          isExamExerciseInNavigation: (course, id) =>
            course === 15 && id === 21,
        },
        '@/components/gisela/learning-coach': coach,
        '@/helper/learning-coach-chat': coachChat,
        '@/helper/ai-prompts': prompts,
        '@/helper/ai-review': review,
      },
      async (_url, options) => {
        calls.push(JSON.parse(options.body))
        return Response.json({ choices: [{ message: { content: reply } }] })
      },
    )
    return {
      calls,
      post: body =>
        route.POST(
          new Request('http://localhost/api/va89kjds', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }),
        ),
    }
  }
  const context = [
    {
      role: 'system',
      content: JSON.stringify({
        type: 'Aufgabenstellung',
        statement: 'Wandle 2 m in cm um.',
      }),
    },
    {
      role: 'system',
      content: JSON.stringify({
        type: 'Interne fachliche Referenz',
        notStudentWork: true,
        reference: '200 cm',
      }),
    },
    { role: 'user', content: '200 cm' },
  ]

  test('exercise API sends centralized assessment rules and validated audience context', async () => {
    const api = createApi()
    const response = await api.post({
      courseId: 6,
      exerciseId: 11,
      learningMode: 'pruefen',
      messages: context,
    })
    assert.equal(response.status, 200)
    const messages = api.calls[0].messages
    assert.equal(messages[0].content, prompts.TEXT_REVIEW_PROMPT)
    assert.equal(messages[1].content, prompts.EXERCISE_ASSISTANT_PROMPT)
    assert.match(messages[2].content, /AV: kurze/)
    assert.equal(messages[4].content, prompts.MODE_INSTRUCTIONS.pruefen)
    assert.equal(messages.at(-1).role, 'user')
    assert.equal(messages.at(-1).content, '200 cm')
    assert.match(messages.at(-2).content, /keine Lernendenantwort/)
    assert.match(messages.at(-2).content, /notStudentWork/)
    assert.ok(!JSON.stringify(messages).includes('Kompetenzscore'))
  })

  test('text review validates before returning plain text to a streaming client', async () => {
    const api = createApi()
    const response = await api.post({
      courseId: 6,
      exerciseId: 11,
      learningMode: 'pruefen',
      stream: true,
      messages: context,
    })
    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type'), /text\/plain/)
    assert.equal(await response.text(), 'Dein Ergebnis stimmt.')
    assert.equal(api.calls[0].response_format.json_schema.strict, true)
    assert.equal(api.calls[0].stream, undefined)
  })

  test('a contradictory text assessment never reaches the conversation as a certain verdict', async () => {
    const api = createApi(
      JSON.stringify({
        feedback: 'Alles richtig!',
        verdict: 'correct',
        result_status: 'incorrect',
        work_status: 'not_provided',
        assessment_confidence: 0.99,
        student_work: '2 cm',
        reference_check: 'Erwartet werden 200 cm.',
        uncertainty_question: null,
        error: { target_text: '2 cm', label: 'Umrechnung', confidence: 0.99 },
      }),
    )
    const response = await api.post({
      courseId: 6,
      learningMode: 'pruefen',
      messages: context,
    })
    const result = await response.json()
    assert.match(result.text, /nicht sicher beurteilen/)
    assert.ok(!result.text.includes('Alles richtig'))
    assert.deepEqual(Object.keys(result), ['text'])
  })

  test('a follow-up question in review mode receives an explanation, not another submission request', async () => {
    const api = createApi(
      JSON.stringify({
        feedback:
          'Subtrahiere auf beiden Seiten 3, damit links nur x übrig bleibt.',
        verdict: 'not_assessed',
        result_status: 'not_provided',
        work_status: 'not_provided',
        student_work: '',
        reference_check:
          'Eine Verständnisfrage zum bereits besprochenen Umformen.',
        assessment_confidence: 0.99,
        uncertainty_question: null,
        error: null,
      }),
    )
    const response = await api.post({
      courseId: 6,
      learningMode: 'pruefen',
      messages: [
        ...context,
        { role: 'assistant', content: 'Subtrahiere 3.' },
        { role: 'user', content: 'Warum muss ich 3 subtrahieren?' },
      ],
    })
    assert.match((await response.json()).text, /damit links nur x übrig bleibt/)
  })

  test('invalid course assignments fall back to the actual exercise audience', async () => {
    const api = createApi()
    await api.post({
      courseId: 6,
      exerciseId: 21,
      learningMode: 'schritt',
      messages: context,
    })
    assert.match(api.calls[0].messages[1].content, /TG13 - Mathematik gAN/)
    assert.match(
      api.calls[0].messages[1].content,
      /keine zusätzlichen eAN-Anforderungen/,
    )
    assert.equal(
      api.calls[0].messages[3].content,
      prompts.MODE_INSTRUCTIONS.schritt,
    )
    const unknown = createApi()
    await unknown.post({ courseId: 999, exerciseId: 999, messages: context })
    assert.match(
      unknown.calls[0].messages[1].content,
      /nicht eindeutig bekannt/,
    )
  })

  test('image review cannot silently reuse a previous image as the new submission', async () => {
    const api = createApi()
    const response = await api.post({
      learningMode: 'pruefen',
      review: true,
      messages: [
        {
          role: 'user',
          content: [{ type: 'image', image: 'data:image/png;base64,OLD' }],
        },
        { role: 'assistant', content: 'Bitte noch einmal.' },
        { role: 'user', content: 'Und jetzt?' },
      ],
    })
    assert.equal(response.status, 400)
    assert.equal(api.calls.length, 0)
  })

  test('image API enforces safe uncertainty and does not expose internal assessment data', async () => {
    const api = createApi(
      JSON.stringify({
        verdict: 'correct',
        result_status: 'correct',
        work_status: 'not_provided',
        feedback: 'Das ist richtig!',
        image_observation: 'Vielleicht 200 cm',
        image_confidence: 0.4,
        assessment_confidence: 0.99,
        student_work: '200 cm',
        reference_check: 'Interne Prüfnotiz',
        uncertainty_question: null,
        error: null,
      }),
    )
    const response = await api.post({
      courseId: 6,
      exerciseId: 11,
      learningMode: 'pruefen',
      review: true,
      messages: [
        ...context.slice(0, 2),
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Mein Lösungsweg.' },
            { type: 'image', image: 'data:image/png;base64,NEW' },
          ],
        },
      ],
    })
    const payload = await response.json()
    assert.equal(response.status, 200)
    assert.match(payload.text, /nicht sicher beurteilen/)
    assert.equal(payload.review, null)
    assert.ok(!JSON.stringify(payload).includes('Interne Prüfnotiz'))
    assert.ok(!JSON.stringify(payload).includes('assessment_confidence'))
    const request = api.calls[0]
    assert.equal(request.response_format.json_schema.strict, true)
    assert.equal(request.messages[0].content, prompts.IMAGE_REVIEW_PROMPT)
    assert.equal(request.messages.at(-1).content[1].image_url.detail, 'high')
  })

  test('learning assistant receives long course title, planning rules and real catalog only', async () => {
    const api = createApi(
      JSON.stringify({
        reply: 'Wir üben einen sinnvollen Abschnitt.',
        exerciseId: 21,
      }),
    )
    const response = await api.post({
      learningCoach: { courseId: 15, progress: {} },
      messages: [
        { role: 'user', content: 'Ich habe 15 Minuten Zeit für Analysis.' },
      ],
    })
    assert.equal(response.status, 200)
    assert.equal((await response.json()).exerciseId, 21)
    const messages = api.calls[0].messages
    assert.match(messages[0].content, /Zeitbudget passen/)
    assert.match(messages[1].content, /TG13 - Mathematik gAN/)
    assert.match(messages[2].content, /Analysis/)
    assert.match(messages[2].content, /TG13 - Mathematik gAN/)
  })

  test('worksheet generation keeps teacher competencies and audience in the prompt', async () => {
    const items = [1, 2, 3].map(number => ({ number, content: 'Inhalt' }))
    const api = createApi(
      JSON.stringify({
        title: 'Aufgabe',
        intro: 'Intro',
        tasks: items,
        solutions: items,
      }),
    )
    const response = await api.post({
      courseId: 6,
      exerciseId: 11,
      messages: context,
      worksheet: {
        materialType: 'differentiated',
        levelCounts: { a: 1, b: 1, c: 1 },
        note: 'A-Niveau: Längen umrechnen\nB-Niveau: Maßketten berechnen\nC-Niveau: Verschnitt berechnen',
        simpleLanguage: true,
        includeErrorTask: true,
      },
    })
    assert.equal(response.status, 200)
    const prompt = api.calls[0].messages[0].content
    assert.match(prompt, /AV: kurze/)
    assert.ok(prompt.includes(prompts.WORKSHEET_QUALITY_PROMPT))
    assert.match(prompt, /Längen umrechnen/)
    assert.match(prompt, /Maßketten berechnen/)
    assert.match(prompt, /Verschnitt berechnen/)
    assert.match(prompt, /genau einem eindeutigen fachlichen Fehler/)
    assert.match(prompt, /nicht die festgelegte fachliche Kompetenz/)
  })
})
