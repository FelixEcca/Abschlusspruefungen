'use client'

import { IonApp, IonContent, setupIonicReact } from '@ionic/react'
import { useEffect, useRef, useState } from 'react'
import { faExpand, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@/components/ui/FaIcon'
import { Gisela } from '@/components/gisela/Gisela'
import { giselaLooks } from '@/components/gisela/gisela-looks'
import styles from './page.module.css'

setupIonicReact({})

export default function GiselaLooks() {
  const [selected, setSelected] = useState<(typeof giselaLooks)[number] | null>(
    null,
  )
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal()
    if (!selected && dialog.current?.open) dialog.current.close()
  }, [selected])

  return (
    <IonApp>
      <IonContent>
        <div className={styles.page}>
          <header className={styles.header}>
            <h1>Giselas Looks</h1>
            <a href="/app/start">Zur App</a>
          </header>
          <div className={styles.gallery}>
            {giselaLooks.map(({ look, title, courses }) => (
              <section className={styles.look} key={look}>
                <button
                  type="button"
                  className={styles.stage}
                  aria-label={`${title} vergrößern`}
                  title={`${title} vergrößern`}
                  onClick={() =>
                    setSelected(
                      giselaLooks.find(item => item.look === look) ?? null,
                    )
                  }
                >
                  <Gisela look={look} className={styles.figure} />
                  <span className={styles.expand}>
                    <FaIcon icon={faExpand} />
                  </span>
                </button>
                <h2>{title}</h2>
                <p>{courses}</p>
              </section>
            ))}
          </div>
        </div>
        <dialog
          ref={dialog}
          className={styles.detail}
          aria-labelledby="gisela-detail-title"
          onClose={() => setSelected(null)}
          onClick={event => {
            if (event.target === event.currentTarget) setSelected(null)
          }}
        >
          {selected && (
            <>
              <header className={styles.detailHeader}>
                <h2 id="gisela-detail-title">{selected.title}</h2>
                <button
                  type="button"
                  aria-label="Schließen"
                  title="Schließen"
                  onClick={() => setSelected(null)}
                >
                  <FaIcon icon={faXmark} />
                </button>
              </header>
              <div className={styles.detailBody}>
                <Gisela look={selected.look} className={styles.detailFigure} />
              </div>
              <p className={styles.detailCaption}>{selected.courses}</p>
            </>
          )}
        </dialog>
      </IonContent>
    </IonApp>
  )
}
