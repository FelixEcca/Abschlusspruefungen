'use client'

import { useId, useState } from 'react'
import styles from './Gisela.module.css'

type Props = {
  className?: string
  animated?: boolean
}

export function Gisela({ className = '', animated = true }: Props) {
  const id = useId()
  const [loaded, setLoaded] = useState(false)
  const [bodyLoaded, setBodyLoaded] = useState(false)
  const moving = animated && loaded && bodyLoaded

  return (
    <div className={`${styles.root} ${className}`}>
      <div
        className={`${styles.figure} ${moving ? styles.moving : ''}`}
        role="img"
        aria-label="Gisela, deine Lernbegleitung"
      >
        <img
          src="/img/gisela/gisela-idle-v1.png"
          width={1024}
          height={1536}
          alt=""
          draggable={false}
          className={styles.staticImage}
          onLoad={() => setLoaded(true)}
        />
        {animated && (
          <svg
            className={styles.rig}
            viewBox="0 0 1024 1536"
            aria-hidden="true"
            focusable="false"
          >
            {/* The body has three legs; the original fourth leg is added once. */}
            <defs>
              <clipPath id={`${id}-tail`}>
                <path d="M712 811 C755 853 760 945 773 1002 C787 1059 818 1094 851 1084 L826 1066 L819 1034 L837 997 L850 979 L843 952 L877 957 L916 997 L924 1041 L903 1076 L868 1100 L829 1111 C783 1107 752 1066 740 1013 C733 973 739 922 720 882Z" />
              </clipPath>
              <clipPath id={`${id}-upper-leg`}>
                <path d="M366 773 C340 794 317 837 321 867 C320 897 338 935 341 956 L372 1095 L362 1155 Q400 1174 441 1155 L455 1058 L462 970 C436 951 410 930 395 908 C382 878 384 833 377 798Z" />
              </clipPath>
              <clipPath id={`${id}-lower-leg`}>
                <path d="M369 1135 Q400 1125 446 1135 L424 1192 C416 1240 395 1292 395 1346 L414 1390 L386 1428 L305 1435 L266 1418 L276 1381 L329 1327 C352 1260 349 1190 365 1148Z" />
              </clipPath>
            </defs>
            <g className={styles.tail} data-gisela-layer="tail">
              <g clipPath={`url(#${id}-tail)`}>
                <image
                  href="/img/gisela/gisela-idle-v1.png"
                  width={1024}
                  height={1536}
                />
              </g>
            </g>
            <g className={styles.foreleg} data-gisela-layer="foreleg">
              <g clipPath={`url(#${id}-upper-leg)`}>
                <image
                  href="/img/gisela/gisela-idle-v1.png"
                  width={1024}
                  height={1536}
                />
              </g>
              <g className={styles.lowerLeg} data-gisela-layer="lower-leg">
                <g clipPath={`url(#${id}-lower-leg)`}>
                  <image
                    href="/img/gisela/gisela-idle-v1.png"
                    width={1024}
                    height={1536}
                  />
                </g>
              </g>
            </g>
            <image
              href="/img/gisela/gisela-body-v1.png"
              width={1024}
              height={1536}
              onLoad={() => setBodyLoaded(true)}
              data-gisela-layer="body"
            />
          </svg>
        )}
        <svg
          className={styles.eyes}
          viewBox="0 0 1024 1536"
          aria-hidden="true"
          focusable="false"
        >
          {/* Eye masks align with the fixed PNG; glasses and anatomy stay still. */}
          <defs>
            <clipPath id={`${id}-left-eye`}>
              <path d="M416 225 C432 210 468 217 474 245 C478 264 464 278 447 275 C429 274 418 257 416 225Z" />
            </clipPath>
            <clipPath id={`${id}-right-eye`}>
              <path d="M533 255 C545 241 563 250 565 269 C566 284 553 297 540 295 C526 291 527 270 533 255Z" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${id}-left-eye)`}>
            <g transform="translate(411 211)">
              <g className={styles.eyelid}>
                <path d="M0 0H70V72H0Z" fill="#f6ba50" />
                <path
                  d="M8 42 Q32 62 59 44"
                  fill="none"
                  stroke="#603318"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              </g>
            </g>
          </g>
          <g clipPath={`url(#${id}-right-eye)`}>
            <g transform="translate(522 240)">
              <g className={styles.eyelid}>
                <path d="M0 0H51V63H0Z" fill="#efb248" />
                <path
                  d="M8 40 Q22 57 41 43"
                  fill="none"
                  stroke="#603318"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
