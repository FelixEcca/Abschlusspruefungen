export type ErrorReview = {
  confidence: number
  label: string
  targetText: string
}
export type ImageAnalysis = { confidence: number; observation: string }
export type ErrorAnalysis = {
  feedback: string
  imageAnalysis: ImageAnalysis | null
  error: ErrorReview | null
}

const statuses = ['correct', 'incorrect', 'not_provided', 'uncertain']
export const ERROR_ANALYSIS_RESPONSE_FORMAT = {
  type: 'json_schema',
  json_schema: {
    name: 'student_error_analysis',
    strict: true,
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        student_work: {
          type: 'string',
          description:
            'Nur tatsächlich eingereichte und erkennbare Lernendenarbeit.',
        },
        image_observation: {
          type: 'string',
          description:
            'Sichere Beobachtung bzw. konkret benannte Leseunsicherheit. Klartext ohne LaTeX.',
        },
        image_confidence: { type: 'number' },
        reference_check: {
          type: 'string',
          description:
            'Knappes fachliches Prüfergebnis, kein bloßer Zeichenkettenvergleich und keine ausführliche Denkspur.',
        },
        verdict: {
          type: 'string',
          enum: [
            'correct',
            'incorrect',
            'partial',
            'uncertain',
            'no_submission',
            'not_assessed',
          ],
        },
        result_status: { type: 'string', enum: statuses },
        work_status: { type: 'string', enum: statuses },
        assessment_confidence: { type: 'number' },
        uncertainty_question: {
          type: ['string', 'null'],
          description:
            'Bei nicht sicher lesbarer oder mehrdeutiger Einreichung genau eine gezielte Rückfrage, sonst null.',
        },
        error: {
          anyOf: [
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                target_text: {
                  type: 'string',
                  description:
                    'Kleinster sicher fachlich falscher Ausdruck wortgetreu aus der Einreichung.',
                },
                label: { type: 'string' },
                confidence: { type: 'number' },
              },
              required: ['target_text', 'label', 'confidence'],
            },
            { type: 'null' },
          ],
        },
        feedback: {
          type: 'string',
          description:
            'Kurzes Feedback nach der fachlichen Prüfung, ohne interne Prüfnotizen. Muss mit dem Urteil und den Statusfeldern übereinstimmen.',
        },
      },
      required: [
        'feedback',
        'verdict',
        'result_status',
        'work_status',
        'image_observation',
        'image_confidence',
        'assessment_confidence',
        'student_work',
        'reference_check',
        'uncertainty_question',
        'error',
      ],
    },
  },
}

const imageFields = new Set(['image_observation', 'image_confidence'])
export const TEXT_REVIEW_RESPONSE_FORMAT = {
  type: 'json_schema',
  json_schema: {
    name: 'student_text_review',
    strict: true,
    schema: {
      ...ERROR_ANALYSIS_RESPONSE_FORMAT.json_schema.schema,
      properties: Object.fromEntries(
        Object.entries(
          ERROR_ANALYSIS_RESPONSE_FORMAT.json_schema.schema.properties,
        ).filter(([key]) => !imageFields.has(key)),
      ),
      required:
        ERROR_ANALYSIS_RESPONSE_FORMAT.json_schema.schema.required.filter(
          key => !imageFields.has(key),
        ),
    },
  },
}

function confidence(value: unknown) {
  // Model-reported confidence is only a consistency guard, not an accuracy guarantee.
  return typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
    ? value
    : 0
}
function text(value: unknown, limit: number) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : ''
}

export function parseImageReview(raw: string): ErrorAnalysis {
  const value: unknown = JSON.parse(raw)
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('Ungültige Bildanalyse')
  const data = value as Record<string, unknown>
  const imageConfidence = confidence(data.image_confidence)
  const assessmentConfidence = confidence(data.assessment_confidence)
  const observation = text(data.image_observation, 180)
  const imageAnalysis = observation
    ? {
        confidence: imageConfidence,
        observation:
          imageConfidence < 0.8
            ? 'Die entscheidende Stelle ist nicht sicher lesbar.'
            : observation,
      }
    : null
  const uncertain = (): ErrorAnalysis => ({
    feedback: imageAnalysis
      ? 'Ich kann deine Eingabe noch nicht sicher beurteilen. Bitte schreibe die entscheidende Zahl oder den Ausdruck noch einmal oder sende ein deutlicheres Bild.'
      : 'Ich kann deine Eingabe noch nicht sicher beurteilen. Bitte ergänze die unklare Stelle oder die fehlenden Angaben.',
    imageAnalysis,
    error: null,
  })
  if (
    data.verdict === 'no_submission' &&
    imageConfidence >= 0.8 &&
    assessmentConfidence >= 0.8
  )
    return {
      feedback:
        'Ich erkenne noch keine eigene Antwort. Schicke mir bitte dein Ergebnis oder deinen Lösungsweg.',
      imageAnalysis,
      error: null,
    }
  if (data.verdict === 'not_assessed') {
    const feedback = text(data.feedback, 5000)
    return feedback &&
      imageConfidence >= 0.8 &&
      assessmentConfidence >= 0.8 &&
      data.result_status === 'not_provided' &&
      data.work_status === 'not_provided' &&
      data.error === null
      ? { feedback, imageAnalysis, error: null }
      : uncertain()
  }
  if (
    !statuses.includes(String(data.result_status)) ||
    !statuses.includes(String(data.work_status))
  )
    return uncertain()
  if (data.verdict === 'uncertain') {
    const question = text(data.uncertainty_question, 300)
    return question
      ? {
          feedback: `Ich kann das noch nicht sicher beurteilen. ${question}`,
          imageAnalysis,
          error: null,
        }
      : uncertain()
  }
  if (
    imageConfidence < 0.8 ||
    assessmentConfidence < 0.8 ||
    data.result_status === 'uncertain' ||
    data.work_status === 'uncertain'
  )
    return uncertain()
  const studentWork = text(data.student_work, 20000)
  if (!studentWork || !text(data.reference_check, 2000)) return uncertain()
  const wrong =
    data.result_status === 'incorrect' || data.work_status === 'incorrect'
  const hasCorrectPart =
    data.result_status === 'correct' || data.work_status === 'correct'
  if (!['correct', 'incorrect', 'partial'].includes(String(data.verdict)))
    return uncertain()
  if (
    // A mixed result may be called "partial", but needs evidence for both parts.
    (data.verdict === 'correct' && wrong) ||
    (data.verdict === 'partial' && wrong && !hasCorrectPart) ||
    (data.verdict === 'incorrect' && !wrong)
  )
    return uncertain()
  if (
    data.verdict === 'correct' &&
    data.result_status === 'not_provided' &&
    data.work_status === 'not_provided'
  )
    return uncertain()
  if (!wrong && data.error !== null) return uncertain()
  const feedback = text(data.feedback, 5000)
  if (!feedback) return uncertain()
  if (!wrong) return { feedback, imageAnalysis, error: null }
  if (
    !data.error ||
    typeof data.error !== 'object' ||
    Array.isArray(data.error)
  )
    return uncertain()
  const error = data.error as Record<string, unknown>
  const targetText = text(error.target_text, 100),
    label = text(error.label, 100),
    certainty = confidence(error.confidence)
  if (
    !targetText ||
    !label ||
    certainty < 0.85 ||
    !studentWork.replace(/\s+/g, ' ').includes(targetText.replace(/\s+/g, ' '))
  )
    return uncertain()
  return {
    feedback,
    imageAnalysis,
    error: { targetText, label, confidence: certainty },
  }
}

export function parseTextReview(raw: string): ErrorAnalysis {
  const value: unknown = JSON.parse(raw)
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Ungültige Antwortprüfung')
  }
  return parseImageReview(
    JSON.stringify({
      ...value,
      image_confidence: 1,
      image_observation: '',
    }),
  )
}
