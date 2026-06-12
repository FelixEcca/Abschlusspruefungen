// src/app/api/va89kjds/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'

type ImageContentPart = {
  type: 'image'
  image: string
}

type IMessage = {
  id?: string
  role: 'system' | 'user' | 'assistant'
  content: string | ImageContentPart[]
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function normalizeBase64Image(image: string) {
  if (image.startsWith('data:image/')) return image
  return `data:image/png;base64,${image}`
}

function toOpenAIMessages(msgs: IMessage[]) {
  return msgs.map(m => {
    if (typeof m.content === 'string') {
      return {
        role: m.role,
        content: m.content,
      }
    }

    if (Array.isArray(m.content)) {
      return {
        role: m.role,
        content: m.content.map(part => {
          if (part.type === 'image') {
            return {
              type: 'image_url',
              image_url: {
                url: normalizeBase64Image(part.image),
                detail: 'low',
              },
            }
          }

          return {
            type: 'text',
            text: String(part),
          }
        }),
      }
    }

    return {
      role: m.role,
      content: String(m.content),
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
        if (typeof part?.text === 'string') return part.text
        return ''
      })
      .join('')
  }

  return ''
}

async function callOpenAI(oaiMessages: any[]) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: 'OPENAI_API_KEY ist nicht gesetzt.',
    }
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 25_000)

    try {
      const response = await fetch(OPENAI_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: oaiMessages,
          temperature: 0.2,
          max_tokens: 300,
        }),
      })

      clearTimeout(timeout)

      const raw = await response.text()

      if (!response.ok) {
        const retryable = [429, 500, 502, 503, 504].includes(response.status)

        console.error('[api/va89kjds] OpenAI error', {
          attempt,
          status: response.status,
          raw,
        })

        if (retryable && attempt < 3) {
          await sleep(600 * attempt)
          continue
        }

        return {
          ok: false,
          status: response.status,
          error: raw,
        }
      }

      const data = JSON.parse(raw)
      return {
        ok: true,
        text: extractText(data),
      }
    } catch (error: any) {
      clearTimeout(timeout)

      console.error('[api/va89kjds] fetch failed', {
        attempt,
        message: error?.message,
        name: error?.name,
      })

      if (attempt < 3) {
        await sleep(600 * attempt)
        continue
      }

      return {
        ok: false,
        status: 504,
        error:
          error?.name === 'AbortError'
            ? 'OpenAI request timeout'
            : error?.message ?? String(error),
      }
    }
  }

  return {
    ok: false,
    status: 500,
    error: 'Unbekannter API-Fehler',
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get('content-length') ?? 0)

    console.log('[api/va89kjds] request size KB:', Math.round(contentLength / 1024))

    if (contentLength > 4_500_000) {
      return NextResponse.json(
        {
          error:
            'Die Skizze ist zu groß. Bitte kleiner exportieren oder weniger zeichnen.',
        },
        { status: 413 },
      )
    }

    const body = (await req.json()) as IMessage[] | unknown

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Invalid request body – expected array of messages' },
        { status: 400 },
      )
    }

    const oaiMessages = toOpenAIMessages(body)

    const imageMessage = body.find(
      m =>
        typeof m === 'object' &&
        m !== null &&
        Array.isArray((m as IMessage).content),
    ) as IMessage | undefined

    if (imageMessage && Array.isArray(imageMessage.content)) {
      const firstImage = imageMessage.content[0] as ImageContentPart | undefined
      console.log(
        '[api/va89kjds] image base64 KB:',
        firstImage?.image ? Math.round(firstImage.image.length / 1024) : 0,
      )
    }

    const result = await callOpenAI(oaiMessages)

    if (!result.ok) {
      return NextResponse.json(
        {
          error: 'OpenAI API error',
          detail: result.error,
          status: result.status,
        },
        { status: result.status === 413 ? 413 : 502 },
      )
    }

    return NextResponse.json({ text: result.text })
  } catch (error: any) {
    console.error('[api/va89kjds] unexpected error:', error)

    return NextResponse.json(
      {
        error: 'Server error',
        detail: error?.message ?? String(error),
      },
      { status: 500 },
    )
  }
}