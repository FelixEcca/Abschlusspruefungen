import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@/components/ui/FaIcon'
import { Gisela } from '@/components/gisela/Gisela'
import type { TutorialPlan, TutorialStep } from './tutorial-model'
import { guideWidth, positionGuide, type TourRect } from './tutorial-position'
import styles from './TutorialOverlay.module.css'

type Props = {
  step: TutorialStep
  plan: TutorialPlan
  name: string
  wrongRoute: boolean
  onNext: () => void
  onSkip: () => void
  onRecover: () => void
}

function visibleTarget(key: string) {
  return (
    Array.from(
      document.querySelectorAll<HTMLElement>(`[data-tutorial="${key}"]`),
    ).find(element => {
      const rect = element.getBoundingClientRect()
      return (
        !element.closest('.ion-page-hidden') &&
        rect.width > 0 &&
        rect.height > 0 &&
        getComputedStyle(element).visibility !== 'hidden'
      )
    }) ?? null
  )
}

export function TutorialOverlay({
  step,
  plan,
  name,
  wrongRoute,
  onNext,
  onSkip,
  onRecover,
}: Props) {
  const maskId = useId()
  const guideRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLElement | null>(null)
  const [target, setTarget] = useState<TourRect | null>(null)
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [guideHeight, setGuideHeight] = useState(220)
  const [settled, setSettled] = useState(false)

  useLayoutEffect(() => {
    setTarget(null)
    setSettled(false)
    let frame = 0
    let observed: HTMLElement | null = null
    let scrolled: HTMLElement | null = null
    let scrollElement: HTMLElement | null = null
    let disposed = false
    const resize = new ResizeObserver(() => schedule())
    const measure = () => {
      frame = 0
      const element = wrongRoute ? null : visibleTarget(step.target)
      targetRef.current = element
      if (element !== observed) {
        resize.disconnect()
        if (element) resize.observe(element)
        observed = element
        scrollElement?.removeEventListener('scroll', schedule)
        scrollElement = null
        // Ionic scrolls inside a shadow root; document scroll events do not reach it.
        const content = element?.closest('ion-content')
        if (content)
          void content.getScrollElement().then(inner => {
            if (disposed || observed !== element) return
            scrollElement = inner
            inner.addEventListener('scroll', schedule)
            if (element && element !== scrolled) {
              scrolled = element
              const top =
                inner.scrollTop +
                element.getBoundingClientRect().top -
                content.getBoundingClientRect().top -
                12
              void content.scrollToPoint(0, Math.max(0, top), 0).then(schedule)
            }
            schedule()
          })
      }
      if (element && element !== scrolled && !element.closest('ion-content')) {
        element.scrollIntoView({
          behavior: 'auto',
          block: 'start',
          inline: 'nearest',
        })
        scrolled = element
      }
      const width = window.visualViewport?.width ?? window.innerWidth
      const height = window.visualViewport?.height ?? window.innerHeight
      setViewport(previous =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height },
      )
      const rect = element?.getBoundingClientRect()
      const contentRect = element
        ?.closest('ion-content')
        ?.getBoundingClientRect()
      const topEdge = Math.max(contentRect?.top ?? 0, 0, (rect?.top ?? 0) - 6)
      const bottomEdge = Math.min(
        contentRect?.bottom ?? height,
        height,
        (rect?.bottom ?? 0) + 6,
      )
      const next = rect
        ? {
            left: Math.max(0, rect.left - 6),
            top: topEdge,
            width: Math.max(
              0,
              Math.min(width, rect.right + 6) - Math.max(0, rect.left - 6),
            ),
            height: Math.max(0, bottomEdge - topEdge),
          }
        : null
      setTarget(previous =>
        previous &&
        next &&
        Object.keys(next).every(
          key =>
            previous[key as keyof TourRect] === next[key as keyof TourRect],
        )
          ? previous
          : next,
      )
    }
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(measure)
    }
    const mutations = new MutationObserver(schedule)
    mutations.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'hidden', 'aria-expanded'],
    })
    window.addEventListener('resize', schedule)
    document.addEventListener('scroll', schedule, true)
    document.addEventListener('transitionend', schedule, true)
    window.visualViewport?.addEventListener('resize', schedule)
    window.visualViewport?.addEventListener('scroll', schedule)
    const timeout = window.setTimeout(() => setSettled(true), 1200)
    schedule()
    return () => {
      disposed = true
      scrollElement?.removeEventListener('scroll', schedule)
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
      resize.disconnect()
      mutations.disconnect()
      window.removeEventListener('resize', schedule)
      document.removeEventListener('scroll', schedule, true)
      document.removeEventListener('transitionend', schedule, true)
      window.visualViewport?.removeEventListener('resize', schedule)
      window.visualViewport?.removeEventListener('scroll', schedule)
    }
  }, [step.id, step.target, wrongRoute])

  useLayoutEffect(() => {
    if (!guideRef.current) return
    const observer = new ResizeObserver(() =>
      setGuideHeight(guideRef.current?.getBoundingClientRect().height ?? 220),
    )
    observer.observe(guideRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    guideRef.current?.focus({ preventScroll: true })
  }, [step.id])

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onSkip()
        return
      }
      if (event.key !== 'Tab') return
      // Include Ionic's shadow-root controls in the guided keyboard cycle.
      const candidates: HTMLElement[] = []
      const collect = (root: Element | ShadowRoot) => {
        if (
          root instanceof HTMLElement &&
          root.matches('button,input,select,textarea,[tabindex]') &&
          root.tabIndex >= 0 &&
          !root.matches(':disabled') &&
          root.getBoundingClientRect().height > 0
        )
          candidates.push(root)
        for (const child of Array.from(root.children)) collect(child)
        if (root instanceof HTMLElement && root.shadowRoot)
          collect(root.shadowRoot)
      }
      if (targetRef.current) collect(targetRef.current)
      if (guideRef.current) collect(guideRef.current)
      if (!candidates.length) return
      const current = event
        .composedPath()
        .find(item => candidates.includes(item as HTMLElement))
      const index = candidates.indexOf(current as HTMLElement)
      const nextIndex =
        index < 0
          ? event.shiftKey
            ? candidates.length - 1
            : 0
          : (index + (event.shiftKey ? -1 : 1) + candidates.length) %
            candidates.length
      const next = candidates[nextIndex]
      event.preventDefault()
      next.focus()
    }
    document.addEventListener('keydown', keyboard, true)
    return () => document.removeEventListener('keydown', keyboard, true)
  }, [onSkip])

  const width = guideWidth(target, viewport.width, viewport.height)
  const position = target
    ? positionGuide(target, width, guideHeight, viewport)
    : {
        left: Math.max(12, (viewport.width - width) / 2),
        top: Math.max(12, (viewport.height - guideHeight) / 2),
      }
  const sections = Array.from(new Set(plan.steps.map(item => item.section)))
  const sectionIndex = sections.indexOf(step.section)
  const blocks = target
    ? [
        { left: 0, top: 0, width: viewport.width, height: target.top },
        {
          left: 0,
          top: target.top + target.height,
          width: viewport.width,
          height: Math.max(0, viewport.height - target.top - target.height),
        },
        { left: 0, top: target.top, width: target.left, height: target.height },
        {
          left: target.left + target.width,
          top: target.top,
          width: Math.max(0, viewport.width - target.left - target.width),
          height: target.height,
        },
      ]
    : [{ left: 0, top: 0, width: viewport.width, height: viewport.height }]
  const unavailable = wrongRoute || (!target && settled)

  return createPortal(
    <div
      className={styles.layer}
      data-tutorial-layer="true"
      // Keep outside-click handlers from removing the highlighted menu before click.
      onPointerDown={event => event.stopPropagation()}
    >
      <svg className={styles.shade} aria-hidden="true">
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="white" />
            {target && (
              <rect
                {...{
                  x: target.left,
                  y: target.top,
                  width: target.width,
                  height: target.height,
                }}
                rx={8}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgb(12 24 32 / 55%)"
          mask={`url(#${maskId})`}
        />
        {target && (
          <rect
            x={target.left}
            y={target.top}
            width={target.width}
            height={target.height}
            rx={8}
            fill="none"
            stroke="#7ad7e6"
            strokeWidth={3}
          />
        )}
      </svg>
      {blocks.map((block, index) => (
        <div key={index} className={styles.blocker} style={block} />
      ))}
      <div
        ref={guideRef}
        tabIndex={-1}
        role="region"
        aria-label="Giselas Rundgang"
        className={styles.guide}
        style={{ width, left: position.left, top: position.top }}
      >
        <div className={styles.bubble}>
          <div className={styles.eyebrow}>
            Giselas Rundgang · {sectionIndex + 1} von {sections.length}
          </div>
          <div className={styles.progress} aria-hidden="true">
            {sections.map((section, index) => (
              <span
                key={section}
                className={`${styles.segment} ${index <= sectionIndex ? styles.visited : ''}`}
              />
            ))}
          </div>
          <div aria-live="polite" aria-atomic="true">
            <h2>{step.title}</h2>
            <p>
              {step.id === 'dashboard' && name
                ? `${name}, hier starten wir! ${step.text.replace('Hier starten wir! ', '')}`
                : step.text}
            </p>
            {step.hint && !unavailable && (
              <p className={styles.hint}>{step.hint}</p>
            )}
          </div>
          {unavailable ? (
            <>
              <p className={styles.hint}>
                {wrongRoute
                  ? 'Für diesen Schritt gehen wir zur passenden Ansicht zurück.'
                  : 'Öffne das Element erneut, dann setzen wir den Rundgang fort.'}
              </p>
              <button type="button" className={styles.next} onClick={onRecover}>
                Hier fortsetzen <FaIcon icon={faArrowRight} />
              </button>
            </>
          ) : (
            step.event === 'next' &&
            target && (
              <button type="button" className={styles.next} onClick={onNext}>
                {step.id === 'finish' ? 'Zur Startseite' : 'Weiter'}{' '}
                <FaIcon icon={faArrowRight} />
              </button>
            )
          )}
          {!target && !settled && !wrongRoute && (
            <p className={styles.hint}>
              Einen Moment, die Ansicht wird geladen.
            </p>
          )}
          <button type="button" className={styles.skip} onClick={onSkip}>
            Tutorial überspringen
          </button>
        </div>
        <Gisela className={styles.mascot} />
      </div>
    </div>,
    document.body,
  )
}
