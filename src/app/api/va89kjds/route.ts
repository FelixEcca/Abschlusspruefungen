// src/app/api/va89kjds/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs' // sicherstellen, dass wir im Node-Runtime laufen
export const dynamic = 'force-dynamic'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

type ImageContentPart = {
  type: 'image'
  image: string
}

type IMessage = {
  id?: string
  role: 'system' | 'user' | 'assistant'
  content: string | ImageContentPart[]
}

// Hilfsfunktion: unsere eigene Messages-Struktur -> OpenAI-Format
function toOpenAIMessages(msgs: IMessage[]) {
  return msgs.map(m => {
    // 1) Einfacher Text
    if (typeof m.content === 'string') {
      return { role: m.role, content: m.content }
    }

    // 2) Bild aus ScribbleOverlay: [{ type: 'image', image: <base64> }]
    if (Array.isArray(m.content)) {
      const first = m.content[0] as ImageContentPart | undefined
      if (first && first.type === 'image' && first.image) {
        return {
          role: m.role,
          content: [
            {
              type: 'image_url',
              image_url: {
                // inline Base64-PNG
                url: `data:image/png;base64,${first.image}`,
              },
            },
          ],
        }
      }
    }

    // 3) Fallback: alles andere in String casten
    return { role: m.role, content: String(m.content) }
  })
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    // Debug-Logs für Vercel
    console.log('[api/va89kjds] hit – key present?', !!apiKey)
    console.log(
      '[api/va89kjds] ENV OPENAI_API_KEY set?',
      !!process.env.OPENAI_API_KEY,
    )
    console.log(
      '[api/va89kjds] ENV keys containing "OPENAI":',
      Object.keys(process.env).filter(k => k.toLowerCase().includes('openai')),
    )

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY ist nicht gesetzt (Backend)' },
        { status: 500 },
      )
    }

    const body = (await req.json()) as IMessage[] | unknown
    if (!Array.isArray(body)) {
      console.error('[api/va89kjds] body is not an array:', body)
      return NextResponse.json(
        { error: 'Invalid request body – expected array of messages' },
        { status: 400 },
      )
    }

    const oaiMessages = toOpenAIMessages(body)
    console.log(
      '[api/va89kjds] sending messages to OpenAI:',
      oaiMessages.length,
    )

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        messages: oaiMessages,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error(
        '[api/va89kjds] OpenAI HTTP error:',
        response.status,
        errText,
      )
      return NextResponse.json(
        {
          error: 'OpenAI API error',
          status: response.status,
          detail: errText,
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    const text =
      data.choices?.[0]?.message?.content ??
      data.choices?.[0]?.message?.[0]?.text ??
      ''

    console.log('[api/va89kjds] success – text length:', String(text).length)

    return NextResponse.json({ text })
  } catch (e: any) {
    console.error('[api/va89kjds] unexpected error:', e)
    return NextResponse.json(
      { error: 'Server error', detail: e?.message ?? String(e) },
      { status: 500 },
    )
  }
}
