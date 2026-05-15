// src/helper/exercise-image-export.tsx
import * as React from 'react'
import { toPng } from 'html-to-image'
import { proseWrapper } from '@/helper/prose-wrapper'
import { exercisesData } from '@/content/exercises'

interface GenerateExerciseImageButtonProps {
  exerciseId: number
  count?: number
}

function createLocalRng() {
  return {
    randomIntBetween(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    randomItemFromArray<T>(arr: T[]) {
      return arr[Math.floor(Math.random() * arr.length)]
    },

    randomBoolean() {
      return Math.random() < 0.5
    },

    shuffleArray<T>(arr: T[]) {
      return [...arr].sort(() => Math.random() - 0.5)
    },
  }
}

function generateValidData(exercise: any) {
  for (let i = 0; i < 100; i++) {
    const rng = createLocalRng()
    const data = exercise.generator(rng)

    if (!exercise.constraint || exercise.constraint({ data })) {
      return data
    }
  }

  return exercise.originalData ?? exercise.generator(createLocalRng())
}

function renderExerciseParts(exercise: any, data: any) {
  const intro = exercise.intro ? exercise.intro({ data }) : null

  if ('tasks' in exercise && Array.isArray(exercise.tasks)) {
    return exercise.tasks.map((task: any, index: number) => {
      const letter = String.fromCharCode(97 + index)

      return {
        label: `${letter})`,
        intro:
          index === 0 ? (
            <>
              {intro}
              {task.intro ? task.intro({ data }) : null}
            </>
          ) : task.intro ? (
            task.intro({ data })
          ) : null,
        task: task.task ? task.task({ data }) : null,
        solution: task.solution ? task.solution({ data }) : null,
      }
    })
  }

  return [
    {
      label: '',
      intro,
      task: exercise.task ? exercise.task({ data }) : null,
      solution: exercise.solution ? exercise.solution({ data }) : null,
    },
  ]
}

export function GenerateExerciseImageButton({
  exerciseId,
  count = 5,
}: GenerateExerciseImageButtonProps) {
  const exercise = exercisesData[exerciseId]

  const exportRef = React.useRef<HTMLDivElement>(null)
  const [variants, setVariants] = React.useState<any[]>([])
  const [isExporting, setIsExporting] = React.useState(false)

  async function handleExport() {
    if (!exercise) return

    setIsExporting(true)

    const generated = Array.from({ length: count }, () =>
      generateValidData(exercise),
    )

    setVariants(generated)

    setTimeout(async () => {
      if (!exportRef.current) {
        setIsExporting(false)
        return
      }

      try {
        const dataUrl = await toPng(exportRef.current, {
          backgroundColor: 'white',
          pixelRatio: 2,
          cacheBust: true,
        })

        const safeTitle = String(exercise.title ?? 'aufgaben')
          .replaceAll(' ', '-')
          .replace(/[^\wäöüÄÖÜß-]/g, '')

        const link = document.createElement('a')
        link.download = `${safeTitle}-varianten.png`
        link.href = dataUrl
        link.click()
      } finally {
        setIsExporting(false)
      }
    }, 700)
  }

  if (!exercise) {
    return null
  }

  return (
    <>
      <button
        type="button"
        className="text-xs text-gray-500 underline"
        onClick={handleExport}
      >
        {isExporting
          ? 'Bild wird erstellt ...'
          : '5 Aufgaben + Lösungen als Bild'}
      </button>

      <div
        style={{
          position: 'fixed',
          left: '-10000px',
          top: 0,
          width: 900,
          background: 'white',
          color: 'black',
          padding: 32,
          fontFamily: 'Arial, sans-serif',
          fontSize: 16,
          lineHeight: 1.45,
          zIndex: -1,
          textAlign: 'left',
        }}
      >
        <div ref={exportRef}>
          <h1 style={{ fontSize: 26, marginBottom: 24, textAlign: 'left' }}>
            {exercise.title}
          </h1>

          <h2 style={{ fontSize: 22, marginBottom: 18, textAlign: 'left' }}>
            Aufgabenstellungen
          </h2>

          {variants.map((data, variantIndex) => {
            const parts = renderExerciseParts(exercise, data)

            return (
              <div
                key={`task-${variantIndex}`}
                style={{
                  borderBottom: '1px solid #ddd',
                  paddingBottom: 22,
                  marginBottom: 26,
                  textAlign: 'left',
                }}
              >
                <h3
                  style={{
                    fontSize: 19,
                    marginBottom: 12,
                    textAlign: 'left',
                  }}
                >
                  Aufgabe {variantIndex + 1}
                </h3>

                {parts.map((part: any, partIndex: number) => (
                  <div key={partIndex} style={{ marginBottom: 18 }}>
                    {part.label && (
                      <h4
                        style={{
                          fontSize: 17,
                          marginBottom: 8,
                          textAlign: 'left',
                        }}
                      >
                        {part.label}
                      </h4>
                    )}

                    {part.intro && (
                      <div style={{ marginBottom: 12, textAlign: 'left' }}>
                        {proseWrapper(<>{part.intro}</>)}
                      </div>
                    )}

                    <div style={{ marginBottom: 12, textAlign: 'left' }}>
                      {proseWrapper(<>{part.task}</>)}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}

          <h2
            style={{
              fontSize: 22,
              marginTop: 36,
              marginBottom: 18,
              textAlign: 'left',
            }}
          >
            Lösungen
          </h2>

          {variants.map((data, variantIndex) => {
            const parts = renderExerciseParts(exercise, data)

            return (
              <div
                key={`solution-${variantIndex}`}
                style={{
                  borderBottom: '1px solid #ddd',
                  paddingBottom: 22,
                  marginBottom: 26,
                  textAlign: 'left',
                }}
              >
                <h3
                  style={{
                    fontSize: 19,
                    marginBottom: 12,
                    textAlign: 'left',
                  }}
                >
                  Lösung {variantIndex + 1}
                </h3>

                {parts.map((part: any, partIndex: number) => (
                  <div key={partIndex} style={{ marginBottom: 18 }}>
                    {part.label && (
                      <h4
                        style={{
                          fontSize: 17,
                          marginBottom: 8,
                          textAlign: 'left',
                        }}
                      >
                        {part.label}
                      </h4>
                    )}

                    <div style={{ textAlign: 'left' }}>
                      {proseWrapper(<>{part.solution}</>)}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
