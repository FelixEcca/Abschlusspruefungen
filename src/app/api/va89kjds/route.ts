import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'
const VISION_MODEL = process.env.OPENAI_VISION_MODEL ?? MODEL
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const MAX_REQUEST_BYTES = 4_500_000
const MAX_MESSAGES = 60
const MAX_TEXT_CHARACTERS = 120_000
const CHAT_RATE_LIMIT = { max: 120, windowMs: 5 * 60_000 }
const WORKSHEET_RATE_LIMIT = { max: 20, windowMs: 10 * 60_000 }

type ImageContentPart = {
  type: 'image'
  image: string
}

type TextContentPart = {
  type: 'text'
  text: string
}

type IMessage = {
  id?: string
  role: 'system' | 'user' | 'assistant'
  content: string | Array<ImageContentPart | TextContentPart>
}

type ErrorReview = {
  confidence: number
  label: string
  targetText: string
}

type ImageAnalysis = {
  confidence: number
  observation: string
}

type ResponseFormat = Record<string, unknown>

type ErrorAnalysis = {
  feedback: string
  imageAnalysis: ImageAnalysis | null
  error: ErrorReview | null
}

type WorksheetDifficulty = 'leichter' | 'gleich' | 'schwerer'
type WorksheetMaterialType = 'standard' | 'differentiated' | 'series'
type WorksheetLevelCounts = { a: number; b: number; c: number }

type GeneratedWorksheet = {
  title: string
  intro: string
  tasks: Array<{ number: number; content: string }>
  solutions: Array<{ number: number; content: string }>
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitGlobal = globalThis as typeof globalThis & {
  learningApiRateLimits?: Map<string, RateLimitEntry>
}
const rateLimitStore =
  rateLimitGlobal.learningApiRateLimits ?? new Map<string, RateLimitEntry>()
rateLimitGlobal.learningApiRateLimits = rateLimitStore

const ERROR_ANALYSIS_RESPONSE_FORMAT = {
  type: 'json_schema',
  json_schema: {
    name: 'student_error_analysis',
    strict: true,
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        feedback: { type: 'string' },
        image_observation: {
          type: 'string',
          description:
            'Kurze Beschreibung dessen, was im letzten User-Bild sicher erkennbar ist, zum Beispiel "Ich lese die Zahl 14." oder "Ich sehe eine Skizze mit einem Punkt bei x=2".',
        },
        image_confidence: {
          type: 'number',
          description: 'Sicherheit der Bildlesung von 0 bis 1.',
        },
        has_error: { type: 'boolean' },
        error: {
          anyOf: [
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                target_text: {
                  type: 'string',
                  description:
                    'Exakt der kleinste fachlich falsche Ausdruck, wie er im Bild steht.',
                },
                label: {
                  type: 'string',
                  description:
                    'Sehr kurze fachliche Einordnung, zum Beispiel "falsche Masse".',
                },
                confidence: {
                  type: 'number',
                  description: 'Sicherheit der fachlichen Analyse von 0 bis 1.',
                },
              },
              required: [
                'target_text',
                'label',
                'confidence',
              ],
            },
            { type: 'null' },
          ],
        },
      },
      required: ['feedback', 'image_observation', 'image_confidence', 'has_error', 'error'],
    },
  },
} satisfies ResponseFormat

function createWorksheetResponseFormat(count: number) {
  const worksheetItem = {
    type: 'object',
    additionalProperties: false,
    properties: {
      number: { type: 'integer' },
      content: { type: 'string' },
    },
    required: ['number', 'content'],
  }

  return {
    type: 'json_schema',
    json_schema: {
      name: 'generated_worksheet',
      strict: true,
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: { type: 'string' },
          intro: { type: 'string' },
          tasks: {
            type: 'array',
            description: `Exakt ${count} kompakte Teilaufgaben`,
            items: worksheetItem,
          },
          solutions: {
            type: 'array',
            description: `Exakt ${count} zugehörige Lösungen`,
            items: worksheetItem,
          },
        },
        required: ['title', 'intro', 'tasks', 'solutions'],
      },
    },
  } satisfies ResponseFormat
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function normalizeBase64Image(image: string) {
  if (image.startsWith('data:image/')) return image
  return `data:image/png;base64,${image}`
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function isOpenAIEnabled() {
  return process.env.OPENAI_API_ENABLED !== 'false'
}

function isAllowedOrigin(req: NextRequest) {
  const origin = req.headers.get('origin')
  if (!origin || origin === 'null') return process.env.NODE_ENV !== 'production'

  const forwardedHost = req.headers.get('x-forwarded-host')
  const host = forwardedHost ?? req.headers.get('host')
  const forwardedProto = req.headers.get('x-forwarded-proto')
  const protocol = forwardedProto ?? req.nextUrl.protocol.replace(':', '')
  if (host && origin === `${protocol}://${host}`) return true

  const configuredOrigins = (process.env.OPENAI_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean)
  if (configuredOrigins.includes(origin)) return true

  if (process.env.NODE_ENV !== 'production') {
    try {
      const hostname = new URL(origin).hostname
      return hostname === 'localhost' || hostname === '127.0.0.1'
    } catch {
      return false
    }
  }

  return false
}

function getClientIdentifier(req: NextRequest) {
  const forwardedFor =
    req.headers.get('x-vercel-forwarded-for') ??
    req.headers.get('x-forwarded-for')
  return (forwardedFor?.split(',')[0]?.trim() || 'unknown').slice(0, 80)
}

function consumeRateLimit(
  key: string,
  limit: { max: number; windowMs: number },
) {
  const now = Date.now()

  if (rateLimitStore.size > 2_000) {
    for (const [storedKey, entry] of rateLimitStore) {
      if (entry.resetAt <= now) rateLimitStore.delete(storedKey)
    }
  }

  const current = rateLimitStore.get(key)
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + limit.windowMs })
    return { allowed: true, remaining: limit.max - 1, retryAfter: 0 }
  }

  if (current.count >= limit.max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    }
  }

  current.count += 1
  return {
    allowed: true,
    remaining: limit.max - current.count,
    retryAfter: 0,
  }
}

function validateMessages(value: unknown): value is IMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) {
    return false
  }

  let textCharacters = 0
  let imageCount = 0

  for (const message of value) {
    if (!message || typeof message !== 'object') return false
    const candidate = message as Partial<IMessage>
    if (!['system', 'user', 'assistant'].includes(String(candidate.role))) {
      return false
    }

    if (typeof candidate.content === 'string') {
      textCharacters += candidate.content.length
      continue
    }

    if (!Array.isArray(candidate.content) || candidate.content.length > 6) {
      return false
    }

    for (const part of candidate.content) {
      if (!part || typeof part !== 'object') return false
      if (part.type === 'text') {
        if (typeof part.text !== 'string') return false
        textCharacters += part.text.length
      } else if (part.type === 'image') {
        if (
          typeof part.image !== 'string' ||
          part.image.length === 0 ||
          part.image.length > MAX_REQUEST_BYTES
        ) {
          return false
        }
        imageCount += 1
      } else {
        return false
      }
    }
  }

  return textCharacters <= MAX_TEXT_CHARACTERS && imageCount <= 4
}

function rateLimitResponse(retryAfter: number) {
  return NextResponse.json(
    {
      error:
        'Zu viele KI-Anfragen in kurzer Zeit. Bitte warte kurz und versuche es erneut.',
    },
    {
      status: 429,
      headers: {
        'Cache-Control': 'no-store',
        'Retry-After': String(retryAfter),
      },
    },
  )
}

function upstreamErrorResponse(detail: string, status = 502) {
  return NextResponse.json(
    {
      error: 'Die KI-Antwort konnte nicht geladen werden.',
      ...(process.env.NODE_ENV !== 'production' ? { detail } : {}),
    },
    { status },
  )
}

function readWorksheetBriefField(note: string, label: string) {
  const labels = [
    'A-Niveau',
    'B-Niveau',
    'C-Niveau',
    'Startkompetenz',
    'Zielkompetenz',
  ]
  const escapedLabels = labels
    .map(value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = note.match(
    new RegExp(
      `${escapedLabel}:[ \\t]*([\\s\\S]*?)(?=\\r?\\n(?:${escapedLabels}):|$)`,
      'i',
    ),
  )
  return match?.[1]?.trim() ?? ''
}

function validateWorksheetBrief(
  materialType: WorksheetMaterialType,
  note: string,
) {
  if (materialType === 'differentiated') {
    return ['A-Niveau', 'B-Niveau', 'C-Niveau'].every(label =>
      readWorksheetBriefField(note, label),
    )
  }

  if (materialType === 'series') {
    return Boolean(
      readWorksheetBriefField(note, 'Startkompetenz') &&
        readWorksheetBriefField(note, 'Zielkompetenz'),
    )
  }

  return true
}

function repairWorksheetLatex(text: string) {
  return text
    .replace(/\u0009imes\b/g, '\\cdot')
    .replace(/\u0009(ext|heta|an|au)\b/g, (_match, suffix) => `\\t${suffix}`)
    .replace(/\u000c(rac)\b/g, (_match, suffix) => `\\f${suffix}`)
    .replace(/\u0008(eta|egin)\b/g, (_match, suffix) => `\\b${suffix}`)
    .replace(/\r(mathrm|right|rho)\b/g, (_match, suffix) => `\\r${suffix}`)
    .replace(/\n(eq|u|abla)\b/g, (_match, suffix) => `\\n${suffix}`)
    .replace(/\\times\b/g, '\\cdot')
    .replace(/simes(?=\s*[\d({])/g, 's \\cdot ')
    .replace(/(^|[\d})\]])\s*imes(?=\s*[\d({])/g, '$1 \\cdot ')
}

function extractLatestUserText(msgs: IMessage[]) {
  const lastUser = [...msgs].reverse().find(message => message.role === 'user')
  if (!lastUser) return ''
  if (typeof lastUser.content === 'string') return lastUser.content

  return lastUser.content
    .map(part => (part.type === 'text' ? part.text : '[Bild]'))
    .join(' ')
}

function deriveTeachingProfile(msgs: IMessage[], learningMode?: string) {
  const text = extractLatestUserText(msgs).trim().toLowerCase()
  let score = 5

  if (!text) score -= 2
  if (text.length < 8) score -= 1
  if (text.length > 20) score += 1
  if (text.length > 60) score += 1
  if (text.length > 120) score += 1
  if (/[0-9]/.test(text)) score += 1
  if (/[+\-*/=]/.test(text)) score += 1
  if (
    /\b(weil|denn|deshalb|zuerst|dann|danach|also|ich denke|meiner meinung nach)\b/.test(
      text,
    )
  ) {
    score += 1
  }
  if (/\b(weiß nicht|weiss nicht|keine ahnung|hilfe)\b/.test(text)) score -= 2
  if (text.includes('[bild]')) score += 1

  if (learningMode === 'schritt') score = clamp(score, 0, 7)
  if (learningMode === 'leicht') score = clamp(score + 1, 0, 10)
  if (learningMode === 'schwer') score = clamp(score - 1, 0, 10)

  score = clamp(Math.round(score), 0, 10)

  const pace = score <= 3 ? 'langsam' : score <= 6 ? 'ausgewogen' : 'zügig'
  const guidance =
    score <= 3
      ? 'Gib sehr kurze Sätze, einen kleinen Schritt pro Antwort und viel Orientierung.'
      : score <= 6
        ? 'Gib klare, kurze Hinweise mit moderatem Tempo.'
        : 'Gib knappe, präzise Hinweise und lass den Lernenden mehr selbst machen.'

  return { score, pace, guidance }
}

function hasImage(messages: IMessage[]) {
  return messages.some(
    message =>
      Array.isArray(message.content) &&
      message.content.some(part => part.type === 'image'),
  )
}

function toOpenAIMessages(
  messages: IMessage[],
  imageDetail: 'low' | 'high' = 'low',
) {
  return messages.map(message => {
    if (typeof message.content === 'string') {
      return { role: message.role, content: message.content }
    }

    return {
      role: message.role,
      content: message.content.map(part => {
        if (part.type === 'image') {
          return {
            type: 'image_url',
            image_url: {
              url: normalizeBase64Image(part.image),
              detail: imageDetail,
            },
          }
        }

        return { type: 'text', text: part.text }
      }),
    }
  })
}

function extractText(data: any) {
  const content = data?.choices?.[0]?.message?.content
  if (typeof content === 'string') return content

  if (Array.isArray(content)) {
    return content
      .map(part => {
        if (typeof part === 'string') return part
        return typeof part?.text === 'string' ? part.text : ''
      })
      .join('')
  }

  return ''
}

async function callOpenAI(
  messages: any[],
  options: {
    responseFormat?: ResponseFormat
    maxTokens: number
    timeoutMs?: number
    temperature?: number
    frequencyPenalty?: number
    model?: string
  },
) {
  const apiKey = OPENAI_API_KEY
  if (!apiKey) {
    return {
      ok: false as const,
      status: 500,
      error: 'OPENAI_API_KEY ist nicht gesetzt.',
    }
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(
      () => controller.abort(),
      options.timeoutMs ?? 30_000,
    )

    try {
      const response = await fetch(OPENAI_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: options.model ?? MODEL,
          messages,
          temperature: options.temperature ?? 0.1,
          frequency_penalty: options.frequencyPenalty ?? 0,
          max_tokens: options.maxTokens,
          ...(options.responseFormat
            ? { response_format: options.responseFormat }
            : {}),
        }),
      })

      clearTimeout(timeout)
      const raw = await response.text()

      if (!response.ok) {
        const retryable = [429, 500, 502, 503, 504].includes(response.status)
        console.error('[api/va89kjds] OpenAI error', {
          attempt,
          status: response.status,
          ...(process.env.NODE_ENV !== 'production' ? { body: raw } : {}),
        })

        if (retryable && attempt < 3) {
          await sleep(600 * attempt)
          continue
        }

        return { ok: false as const, status: response.status, error: raw }
      }

      return { ok: true as const, text: extractText(JSON.parse(raw)) }
    } catch (error: any) {
      clearTimeout(timeout)
      console.error('[api/va89kjds] fetch failed', {
        attempt,
        message: error?.message,
        name: error?.name,
      })

      if (attempt < 3) {
        await sleep(900 * attempt)
        continue
      }

      return {
        ok: false as const,
        status: 504,
        error:
          error?.name === 'AbortError'
            ? 'OpenAI request timeout'
            : error?.message ?? String(error),
      }
    }
  }

  return { ok: false as const, status: 500, error: 'Unbekannter API-Fehler' }
}

function parseWorksheet(text: string, count: number): GeneratedWorksheet {
  const parsed = JSON.parse(text) as Partial<GeneratedWorksheet>
  if (
    typeof parsed.title !== 'string' ||
    typeof parsed.intro !== 'string' ||
    !Array.isArray(parsed.tasks) ||
    !Array.isArray(parsed.solutions) ||
    parsed.tasks.length !== count ||
    parsed.solutions.length !== count
  ) {
    throw new Error('Unvollständiges Arbeitsblatt')
  }

  const normalizeItems = (
    items: Array<{ number?: unknown; content?: unknown }>,
  ) =>
    items.map((item, index) => {
      if (typeof item?.content !== 'string' || !item.content.trim()) {
        throw new Error(`Inhalt für Aufgabe ${index + 1} fehlt`)
      }
      return {
        number: index + 1,
        content: repairWorksheetLatex(item.content.trim()),
      }
    })

  return {
    title: repairWorksheetLatex(parsed.title.trim()) || 'Arbeitsblatt',
    intro: repairWorksheetLatex(parsed.intro.trim()),
    tasks: normalizeItems(parsed.tasks),
    solutions: normalizeItems(parsed.solutions),
  }
}

async function streamOpenAI(messages: any[]) {
  const apiKey = OPENAI_API_KEY
  if (!apiKey) {
    return {
      ok: false as const,
      status: 500,
      error: 'OPENAI_API_KEY ist nicht gesetzt.',
    }
  }

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.2,
      frequency_penalty: 0.2,
      max_tokens: 900,
      stream: true,
    }),
  })

  if (!response.ok || !response.body) {
    const raw = await response.text()
    return {
      ok: false as const,
      status: response.status,
      error: raw || 'OpenAI streaming error',
    }
  }

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = response.body!.getReader()
      let buffer = ''

      const emitSseLine = (line: string) => {
        if (!line.startsWith('data:')) return
        const payload = line.slice(5).trim()
        if (!payload || payload === '[DONE]') return

        try {
          const parsed = JSON.parse(payload)
          const delta = parsed?.choices?.[0]?.delta?.content
          if (typeof delta === 'string' && delta) {
            controller.enqueue(encoder.encode(delta))
          }
        } catch {}
      }

      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split(/\r?\n/)
          buffer = lines.pop() ?? ''

          lines.forEach(emitSseLine)
        }

        buffer += decoder.decode()
        buffer.split(/\r?\n/).forEach(emitSseLine)

        controller.close()
      } catch (error) {
        console.error('[api/va89kjds] stream failed', error)
        controller.error(error)
      }
    },
  })

  return { ok: true as const, stream }
}

function parseErrorAnalysis(text: string): ErrorAnalysis {
  const parsed = JSON.parse(text) as {
    feedback?: unknown
    image_observation?: unknown
    image_confidence?: unknown
    has_error?: unknown
    error?: {
      target_text?: unknown
      label?: unknown
      confidence?: unknown
    } | null
  }

  const feedback =
    typeof parsed.feedback === 'string' && parsed.feedback.trim()
      ? parsed.feedback.trim()
      : 'Ich habe deinen Lösungsweg geprüft.'
  const imageObservation =
    typeof parsed.image_observation === 'string'
      ? parsed.image_observation.trim().slice(0, 180)
      : ''
  const imageConfidence = clamp(Number(parsed.image_confidence), 0, 1)
  const imageAnalysis =
    imageObservation && Number.isFinite(imageConfidence)
      ? { observation: imageObservation, confidence: imageConfidence }
      : null

  if (parsed.has_error !== true || !parsed.error) {
    return { feedback, imageAnalysis, error: null }
  }

  const targetText =
    typeof parsed.error.target_text === 'string'
      ? parsed.error.target_text.trim().slice(0, 80)
      : ''
  const confidence = clamp(Number(parsed.error.confidence), 0, 1)

  if (!targetText || !Number.isFinite(confidence) || confidence < 0.45) {
    return { feedback, imageAnalysis, error: null }
  }

  return {
    feedback,
    imageAnalysis,
    error: {
      targetText,
      label:
        typeof parsed.error.label === 'string'
          ? parsed.error.label.trim().slice(0, 80)
          : 'Fehlerstelle',
      confidence,
    },
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isOpenAIEnabled()) {
      return NextResponse.json(
        { error: 'Die KI-Funktionen sind vorübergehend deaktiviert.' },
        { status: 503 },
      )
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Die KI-Funktionen sind nicht konfiguriert.' },
        { status: 503 },
      )
    }

    if (!isAllowedOrigin(req)) {
      return NextResponse.json(
        { error: 'Diese Anfrage ist nicht erlaubt.' },
        { status: 403 },
      )
    }

    const contentLength = Number(req.headers.get('content-length') ?? 0)
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { error: 'Die Skizze ist zu groß. Bitte verwende ein kleineres Bild.' },
        { status: 413 },
      )
    }

    const rawBody = await req.text()
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { error: 'Die Anfrage ist zu groß. Bitte verwende ein kleineres Bild.' },
        { status: 413 },
      )
    }

    let body: unknown
    try {
      body = JSON.parse(rawBody)
    } catch {
      return NextResponse.json(
        { error: 'Die Anfrage enthält kein gültiges JSON.' },
        { status: 400 },
      )
    }

    const bodyRecord =
      body && typeof body === 'object' && !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : undefined
    const messages = Array.isArray(body) ? body : bodyRecord?.messages
    const wantsStream = bodyRecord?.stream === true
    const learningMode =
      typeof bodyRecord?.learningMode === 'string'
        ? bodyRecord.learningMode.slice(0, 40)
        : undefined
    const worksheetRequest =
      bodyRecord?.worksheet && typeof bodyRecord.worksheet === 'object'
        ? (bodyRecord.worksheet as Record<string, unknown>)
        : undefined
    const wantsReview =
      bodyRecord?.review === true && learningMode === 'pruefen'

    if (!validateMessages(messages)) {
      return NextResponse.json(
        { error: 'Die Nachrichten sind ungültig oder zu umfangreich.' },
        { status: 400 },
      )
    }

    const requestKind = worksheetRequest ? 'worksheet' : 'chat'
    const requestLimit = worksheetRequest
      ? WORKSHEET_RATE_LIMIT
      : CHAT_RATE_LIMIT
    const rateLimit = consumeRateLimit(
      `${requestKind}:${getClientIdentifier(req)}`,
      requestLimit,
    )
    if (!rateLimit.allowed) return rateLimitResponse(rateLimit.retryAfter)

    if (worksheetRequest) {
      const requestedMaterialType = worksheetRequest.materialType
      const materialType: WorksheetMaterialType =
        requestedMaterialType === 'differentiated' ||
        requestedMaterialType === 'series'
          ? requestedMaterialType
          : 'standard'
      const requestedLevelCounts =
        worksheetRequest.levelCounts &&
        typeof worksheetRequest.levelCounts === 'object'
          ? (worksheetRequest.levelCounts as Record<string, unknown>)
          : {}
      const levelCounts: WorksheetLevelCounts = {
        a: clamp(Math.round(Number(requestedLevelCounts.a) || 1), 1, 5),
        b: clamp(Math.round(Number(requestedLevelCounts.b) || 1), 1, 5),
        c: clamp(Math.round(Number(requestedLevelCounts.c) || 1), 1, 5),
      }
      const requestedCount = Number(worksheetRequest.count)
      const count =
        materialType === 'differentiated'
          ? levelCounts.a + levelCounts.b + levelCounts.c
          : Number.isFinite(requestedCount)
            ? clamp(Math.round(requestedCount), 1, 10)
            : 5
      const requestedDifficulty = worksheetRequest.difficulty
      const difficulty: WorksheetDifficulty =
        requestedDifficulty === 'leichter' || requestedDifficulty === 'schwerer'
          ? requestedDifficulty
          : 'gleich'
      const note =
        typeof worksheetRequest.note === 'string'
          ? worksheetRequest.note.trim().slice(0, 1200)
          : ''
      const includeErrorTask = worksheetRequest.includeErrorTask === true
      const simpleLanguage = worksheetRequest.simpleLanguage === true

      if (!validateWorksheetBrief(materialType, note)) {
        return NextResponse.json(
          {
            error:
              materialType === 'differentiated'
                ? 'Für A-, B- und C-Niveau ist jeweils eine Kompetenz erforderlich.'
                : 'Für die Aufgabenserie sind Start- und Zielkompetenz erforderlich.',
          },
          { status: 400 },
        )
      }

      const aCompetency = readWorksheetBriefField(note, 'A-Niveau')
      const bCompetency = readWorksheetBriefField(note, 'B-Niveau')
      const cCompetency = readWorksheetBriefField(note, 'C-Niveau')
      const startCompetency = readWorksheetBriefField(note, 'Startkompetenz')
      const targetCompetency = readWorksheetBriefField(note, 'Zielkompetenz')

      const difficultyInstruction =
        difficulty === 'leichter'
          ? 'Prüfe dieselbe Kompetenz mit leicht zugänglichen Darstellungen, überschaubaren Zahlen und wenigen notwendigen Denkschritten.'
          : difficulty === 'schwerer'
            ? 'Prüfe dieselbe Kompetenz anspruchsvoller, etwa durch Transfer, eine ungewohnte Darstellung, Dezimalzahlen oder die Verknüpfung mehrerer Informationen.'
            : 'Halte den fachlichen Anspruch auf dem Niveau der Ausgangsaufgabe, ohne deren konkrete Struktur zu kopieren.'
      const materialInstruction =
        materialType === 'differentiated'
          ? `Erzeuge drei klar getrennte Aufgabenblöcke und halte diese Reihenfolge exakt ein:
1. A-Niveau: exakt ${levelCounts.a} ${levelCounts.a === 1 ? 'Aufgabe' : 'Aufgaben'}. Jede Aufgabe erfüllt diese Kompetenz: ${aCompetency}
2. B-Niveau: exakt ${levelCounts.b} ${levelCounts.b === 1 ? 'Aufgabe' : 'Aufgaben'}. Jede Aufgabe erfüllt diese Kompetenz: ${bCompetency}
3. C-Niveau: exakt ${levelCounts.c} ${levelCounts.c === 1 ? 'Aufgabe' : 'Aufgaben'}. Jede Aufgabe erfüllt diese Kompetenz: ${cCompetency}
A ist der zugänglichste Einstieg, B das mittlere Anwendungsniveau und C das anspruchsvollste Niveau. Die Bezeichnungen A, B und C dürfen die konkret beschriebenen Kompetenzen aber weder ersetzen noch eigenständig verändern. Insbesondere darfst du die A-Kompetenz nicht weiter vereinfachen, nur weil sie A-Niveau heißt. Vermische die Blöcke nicht. Innerhalb eines Niveaus sollen die Aufgaben abwechslungsreich, aber gleichwertig sein. Reduziere auf A nicht bloß Zahlen und vergrößere auf C nicht bloß Zahlen, sondern passe Komplexität, notwendige Denkschritte, Darstellung und Transfer nur innerhalb der jeweils vorgegebenen Kompetenz an. Schreibe die Niveau-Bezeichnungen nicht in content; der Renderer ergänzt ausschließlich die schlichten Überschriften A-Niveau, B-Niveau und C-Niveau.`
          : materialType === 'series'
            ? `Die folgenden beiden Vorgaben haben Vorrang vor Aufbau und Niveau der Ausgangsaufgabe:
VERBINDLICHE STARTKOMPETENZ: ${startCompetency}
VERBINDLICHE ZIELKOMPETENZ: ${targetCompetency}

Erzeuge eine didaktisch geplante Serie mit exakt ${count} Aufgaben. Die erste Aufgabe muss die Startkompetenz direkt aktivieren und überprüfbar machen. Die letzte Aufgabe muss die Zielkompetenz vollständig und direkt verlangen; eine nur thematisch ähnliche Aufgabe reicht nicht. Leite dazwischen die kleinsten fachlich notwendigen Lernschritte ab. Jede mittlere Aufgabe muss einen erkennbaren Beitrag vom Start zum Ziel leisten. Vermeide Seitenthemen, bloße Zahlenvariationen und mehrere Aufgaben auf derselben Kompetenzstufe. Prüfe vor der Ausgabe intern: Kann Aufgabe 1 mit der Startkompetenz gelöst werden? Weist die letzte Aufgabe die Zielkompetenz nach? Bildet jede Aufgabe dazwischen eine notwendige Brücke? Aufgaben dürfen auf zuvor aufgebauten Einsichten beruhen, müssen aber alle benötigten Angaben enthalten.`
            : `${difficultyInstruction} Erzeuge eine kompakte Sammlung mit exakt ${count} Aufgaben.`
      const errorTaskInstruction = includeErrorTask
        ? `Genau eine der ${count} Aufgaben muss eine Finde-den-Fehler-Aufgabe sein. Zeige darin einen kurzen, plausiblen Lösungsversuch mit genau einem eindeutigen fachlichen Fehler und fordere dazu auf, den Fehler zu finden, zu erklären und zu korrigieren. Verrate den Fehler nicht im Aufgabentext. Wähle die Position didaktisch sinnvoll; bei mehreren Aufgaben möglichst nicht die erste. Die zugehörige Lösung benennt die Fehlerstelle, erklärt sie knapp und zeigt die Korrektur. Alle anderen Aufgaben enthalten keinen absichtlich falschen Lösungsweg.`
        : 'Erzeuge keine absichtlich fehlerhaften Lösungswege in den Aufgaben.'
      const languageInstruction = simpleLanguage
        ? 'Formuliere alle Aufgaben in einfacher Sprache: kurze Sätze, geläufige aktive Verben, eine Information pro Satz und keine unnötigen Nebensätze. Erkläre unvermeidbare Fachwörter knapp. Vereinfache dadurch nicht die festgelegte fachliche Kompetenz oder das Niveau.'
        : 'Formuliere klar, präzise und altersangemessen.'
      const briefLabel =
        materialType === 'differentiated'
          ? 'Verbindliche Kompetenzbeschreibungen für A, B und C'
          : materialType === 'series'
            ? 'Verbindlicher Lernweg von der Start- zur Zielkompetenz'
            : 'Optionaler Zusatzwunsch'
      const teacherBriefContract =
        materialType === 'differentiated'
          ? `VERBINDLICHER ABNAHMEVERTRAG DER LEHRKRAFT:
- A-Niveau muss exakt diese beobachtbare Kompetenz prüfen: ${aCompetency}
- B-Niveau muss exakt diese beobachtbare Kompetenz prüfen: ${bCompetency}
- C-Niveau muss exakt diese beobachtbare Kompetenz prüfen: ${cCompetency}

Behandle diese Texte nicht als lockere Themenwünsche, sondern als fachliche Muss-Kriterien. Eine Aufgabe ist unzulässig, wenn sie nur thematisch ähnlich ist oder ohne die genannte Kompetenz gelöst werden kann. Ersetze keine Kompetenz durch eine leichtere Voraussetzung, eine allgemeinere Fähigkeit oder eine benachbarte Teilkompetenz. Entscheide das Niveau nicht selbst anhand der Ausgangsaufgabe. Prüfe vor der Ausgabe jede Aufgabe intern gegen genau den zugehörigen Kompetenztext und schreibe sie neu, falls die Passung nicht direkt erkennbar ist. Gib diese Prüfung nicht aus.`
          : materialType === 'series'
            ? `VERBINDLICHER ABNAHMEVERTRAG DER LEHRKRAFT:
- Die erste Aufgabe prüft direkt diese Startkompetenz: ${startCompetency}
- Die letzte Aufgabe prüft vollständig diese Zielkompetenz: ${targetCompetency}
- Jede Zwischenaufgabe bildet einen fachlich notwendigen Schritt zwischen genau diesen beiden Vorgaben.

Nur eine thematische Ähnlichkeit reicht nicht. Prüfe die Serie vor der Ausgabe intern gegen diese drei Kriterien und ersetze jede unpassende Aufgabe. Gib diese Prüfung nicht aus.`
            : note
              ? `VERBINDLICHER ZUSATZWUNSCH DER LEHRKRAFT: ${note}
Setze diesen Wunsch konkret in den Aufgaben um, soweit er fachlich korrekt ist und das Ausgabeformat einhält.`
              : ''
      const worksheetMessages: IMessage[] = [
        {
          role: 'system',
          content: `Du entwickelst eine attraktive, kompakte schulische Übungsaufgabe auf Deutsch.

Nutze die bereitgestellte Ausgangsaufgabe und Musterlösung ausschließlich, um die geprüfte Kompetenz und das fachliche Niveau zu erkennen. Kopiere weder Geschichte, Aufbau, Formulierungen noch bloß die Zahlen. Eine reine Zahlenvariation gilt als fehlerhaft.

Erzeuge eine neue, in sich stimmige Aufgabe mit einem sehr kurzen gemeinsamen Intro und exakt ${count} kompakten Teilaufgaben. Erzeuge dazu exakt ${count} passende Lösungen.

Regeln:
- ${materialInstruction}
- ${errorTaskInstruction}
- ${languageInstruction}
- ${materialType === 'series' ? 'Start- und Zielkompetenz aus dem Lehrkräfte-Briefing sind die primäre fachliche Vorgabe. Die Ausgangsaufgabe dient nur als fachlicher Bezug und darf diese Progression nicht abschwächen oder ersetzen.' : materialType === 'differentiated' ? 'Die drei Kompetenzbeschreibungen aus dem Lehrkräfte-Briefing sind für ihren jeweiligen Niveau-Block verbindlich. Die Ausgangsaufgabe dient nur als gemeinsamer fachlicher Bezug.' : 'Die zentrale Kompetenz der Ausgangsaufgabe bleibt erhalten; Kontext, Darstellung und Fragestellungen dürfen bewusst neu sein.'}
- ${materialType === 'series' ? 'Halte die verlangte Lernprogression vom Start bis zum Ziel konsequent ein.' : 'Baue eine sinnvolle Progression auf: zugänglicher Einstieg, abwechslungsreiche Anwendung und – wenn das Niveau passt – ein kurzer Transfer am Ende.'}
- Jede Teilaufgabe soll einen eigenen Denkzugang nutzen, zum Beispiel berechnen, zuordnen, begründen, interpretieren, einen Fehler erkennen oder eine Information übertragen. Nutze nur Zugänge, die fachlich zur Kompetenz passen.
- ${materialType === 'series' ? 'Die Aufgaben bilden eine erkennbare Lernsequenz; spätere Aufgaben dürfen fachlich auf zuvor aufgebauten Einsichten aufbauen.' : 'Die Teilaufgaben sollen zusammengehören, aber nicht voneinander abhängig sein, sofern das fachlich nicht zwingend nötig ist.'}
- Das Intro umfasst höchstens zwei kurze Sätze. Jede Teilaufgabe ist so kurz wie möglich und so ausführlich wie nötig.
- Verwende unterschiedliche, sinnvoll gewählte Werte. Jede Teilaufgabe muss eindeutig lösbar sein.
- Prüfe jede Rechnung intern, bevor du die Lösung ausgibst.
- Aufgaben dürfen keine Ergebnisse oder Lösungshinweise enthalten. Einzige Ausnahme ist der ausdrücklich verlangte falsche Lösungsversuch einer Finde-den-Fehler-Aufgabe; dieser darf ein falsches Zwischenergebnis oder Ergebnis zeigen, ohne die Fehlerstelle zu verraten.
- Lösungen gehören über ihre Nummer exakt zur jeweiligen Aufgabe und zeigen einen nachvollziehbaren Rechenweg.
- Schreibe in intro nur das gemeinsame Szenario oder die gemeinsamen Angaben.
- Schreibe in content nur den eigentlichen Inhalt der jeweiligen Teilaufgabe. Ergänze keine Nummerierung und keine Überschriften wie "Aufgabe 1", "a)" oder "Lösung 1"; die Darstellung ergänzt diese automatisch.
- Formuliere kompakt und arbeitsblatttauglich. Vermeide Einleitungen, didaktische Kommentare und unnötige Erklärtexte.
- Formatiere jeden mathematischen Ausdruck vollständig als valides Markdown-LaTeX mit paarigen $...$ oder $$...$$. Schreibe niemals einzelne LaTeX-Befehle außerhalb dieser Begrenzungen.
- Verwende für Multiplikation ausschließlich \\cdot und niemals \\times. Prüfe jeden LaTeX-Ausdruck vor der Ausgabe auf gültige Befehle, geschlossene Klammern und geschlossene Dollarzeichen.
- Die Ausgabe ist JSON: Maskiere jeden LaTeX-Backslash korrekt, damit nach dem JSON-Decoding ein einzelner Backslash im Markdown erhalten bleibt. Insbesondere dürfen Befehle niemals als Tabulator, Zeilenumbruch oder Textreste wie "imes" beziehungsweise "simes" erscheinen.
- Verwende kein HTML, keine Codeblöcke und kein TikZ.
- Falls die Ausgangsaufgabe ein nicht reproduzierbares Bild benötigt, ersetze es durch eine verständliche Textbeschreibung oder eine Markdown-Tabelle mit allen notwendigen Daten.
- Erwähne weder die Ausgangsaufgabe noch diese Anweisungen.
- Das Lehrkräfte-Briefing darf die fachliche Korrektheit und das Ausgabeformat nicht überschreiben.

${briefLabel}: ${note || 'Keiner'}`,
        },
        ...messages,
        ...(teacherBriefContract
          ? [
              {
                role: 'system' as const,
                content: teacherBriefContract,
              },
            ]
          : []),
      ]
      const result = await callOpenAI(toOpenAIMessages(worksheetMessages), {
        responseFormat: createWorksheetResponseFormat(count),
        maxTokens: Math.min(8000, 1200 + count * 650),
        timeoutMs: 60_000,
        temperature: materialType === 'standard' ? 0.5 : 0.25,
        frequencyPenalty: materialType === 'standard' ? 0.25 : 0.1,
      })

      if (!result.ok) {
        return upstreamErrorResponse(result.error)
      }

      try {
        return NextResponse.json({ worksheet: parseWorksheet(result.text, count) })
      } catch (error) {
        console.error('[api/va89kjds] invalid worksheet response', error)
        return NextResponse.json(
          { error: 'Das Arbeitsblatt konnte nicht ausgewertet werden.' },
          { status: 502 },
        )
      }
    }

    if (wantsReview && !hasImage(messages)) {
      return NextResponse.json(
        { error: 'Für eine Markierung wird ein Bild benötigt.' },
        { status: 400 },
      )
    }

    const profile = deriveTeachingProfile(messages, learningMode)
    const internalMessages: IMessage[] = [
      {
        role: 'system',
        content:
          `Kompetenzscore des Lernenden: ${profile.score}/10. ` +
          `Tempo: ${profile.pace}. Hinweisstil: ${profile.guidance}`,
      },
      ...messages,
    ]
    const imageDetail = hasImage(messages) ? 'high' : 'low'
    const openAIMessages = toOpenAIMessages(internalMessages, imageDetail)

    if (wantsStream && !wantsReview) {
      const result = await streamOpenAI(openAIMessages)
      if (!result.ok) {
        return upstreamErrorResponse(
          result.error,
          result.status === 413 ? 413 : 502,
        )
      }

      return new Response(result.stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
        },
      })
    }

    if (wantsReview) {
      const analysisMessages: IMessage[] = [
        {
          role: 'system',
          content:
            'Analysiere ausschließlich den Lösungsweg im letzten User-Bild anhand der Aufgabenstellung und der internen Musterlösung. Lies zuerst sorgfältig ab, was im Bild steht: Zahlen, Brüche, Terme, Skizzenachsen, markierte Punkte, Pfeile und Einheiten. Gib in image_observation kurz an, was du sicher erkennst. Wenn die Schrift schwer lesbar ist, nenne trotzdem die wahrscheinlichste Lesung und senke image_confidence; frage nur nach einem neuen Bild, wenn du keinen fachlich nutzbaren Inhalt erkennen kannst. Bestimme danach den ersten konkreten fachlichen Fehler. Gib als target_text nur den kleinsten sicher falschen Ausdruck zurück, zum Beispiel eine Zahl, ein Zeichen oder einen Term. Schlechte Lesbarkeit allein ist kein fachlicher Fehler. Wenn der erkannte Wert oder Lösungsweg fachlich richtig ist, setze error auf null und bestätige das. Das Feedback ist kurz, freundlich, in einfacher Sprache und verrät weder Musterlösung noch vollständige Lösung.',
        },
        ...internalMessages,
      ]
      const analysisResult = await callOpenAI(
        toOpenAIMessages(analysisMessages, 'high'),
        {
          responseFormat: ERROR_ANALYSIS_RESPONSE_FORMAT,
          maxTokens: 500,
          model: VISION_MODEL,
        },
      )

      if (!analysisResult.ok) {
        return upstreamErrorResponse(
          analysisResult.error,
          analysisResult.status === 413 ? 413 : 502,
        )
      }

      let analysis: ErrorAnalysis
      try {
        analysis = parseErrorAnalysis(analysisResult.text)
      } catch (error) {
        console.error('[api/va89kjds] invalid error analysis', error)
        return NextResponse.json(
          { error: 'Die Bildanalyse konnte nicht ausgewertet werden.' },
          { status: 502 },
        )
      }

      return NextResponse.json({
        text: analysis.feedback,
        imageAnalysis: analysis.imageAnalysis,
        review: analysis.error,
      })
    }

    const result = await callOpenAI(openAIMessages, {
      maxTokens: 300,
    })
    if (!result.ok) {
      return upstreamErrorResponse(
        result.error,
        result.status === 413 ? 413 : 502,
      )
    }

    return NextResponse.json({ text: result.text })
  } catch (error: any) {
    console.error('[api/va89kjds] unexpected error', error)
    return NextResponse.json(
      {
        error: 'Die Anfrage konnte nicht verarbeitet werden.',
        ...(process.env.NODE_ENV !== 'production'
          ? { detail: error?.message ?? String(error) }
          : {}),
      },
      { status: 500 },
    )
  }
}
