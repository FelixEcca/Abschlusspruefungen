'use client'

import { useId, useState, type CSSProperties } from 'react'
import { illustratedLooks, type IllustratedLook } from './illustrated-looks'
import baseStyles from './Gisela.module.css'
import styles from './IllustratedGisela.module.css'

export function IllustratedGisela({
  look,
  animated,
  className,
}: {
  look: IllustratedLook
  animated: boolean
  className: string
}) {
  const id = useId()
  const [loaded, setLoaded] = useState(false)
  const rig = illustratedLooks[look]
  const asset = `/img/gisela/gisela-${look}-v2.webp`
  const moving = animated && loaded
  const origin = ([x, y]: [number, number]) => `${x}px ${y}px`

  return (
    <div className={`${baseStyles.root} ${className}`}>
      <div
        className={`${styles.figure} ${moving ? styles.moving : ''}`}
        role="img"
        aria-label="Gisela, deine Lernbegleitung"
        data-gisela-look={look}
        data-gisela-version="2"
        style={
          {
            '--head-origin': origin(rig.head.pivot),
            '--tail-origin': origin(rig.tail.pivot),
            '--prop-origin': origin(rig.prop?.pivot ?? [0, 0]),
            '--gesture-angle': `${rig.gesture}deg`,
          } as CSSProperties
        }
      >
        <img
          className={styles.still}
          src={asset}
          width={1024}
          height={1536}
          alt=""
          draggable={false}
          onLoad={() => setLoaded(true)}
        />
        {animated && (
          <svg
            className={styles.rig}
            viewBox="0 0 1024 1536"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <clipPath id={`${id}-head`}>
                <path d={rig.head.clip} />
              </clipPath>
              <clipPath id={`${id}-tail`}>
                <path d={rig.tail.clip} />
              </clipPath>
              {rig.prop && (
                <clipPath id={`${id}-prop`}>
                  <path d={rig.prop.clip} />
                </clipPath>
              )}
              {rig.eyes.map((eye, index) => (
                <clipPath id={`${id}-eye-${index}`} key={index}>
                  <ellipse
                    cx={eye.x + eye.width / 2}
                    cy={eye.y + eye.height / 2}
                    rx={eye.width / 2}
                    ry={eye.height / 2}
                  />
                </clipPath>
              ))}
              {/* Keep extra pixels at each joint under the fixed cuff/collar. */}
              <mask
                id={`${id}-body`}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={1024}
                height={1536}
                style={{ maskType: 'luminance' }}
              >
                <rect width={1024} height={1536} fill="white" />
                <path d={rig.head.cut} fill="black" />
                <path d={rig.tail.cut} fill="black" />
                {rig.prop && <path d={rig.prop.cut} fill="black" />}
              </mask>
            </defs>
            <g
              className={styles.tail}
              data-gisela-layer="tail"
              clipPath={`url(#${id}-tail)`}
            >
              <image href={asset} width={1024} height={1536} />
            </g>
            {rig.prop && (
              <g
                className={styles.gesture}
                data-gisela-layer="prop"
                clipPath={`url(#${id}-prop)`}
              >
                <image href={asset} width={1024} height={1536} />
              </g>
            )}
            <image
              href={asset}
              width={1024}
              height={1536}
              mask={`url(#${id}-body)`}
              data-gisela-layer="body"
            />
            <g
              className={styles.head}
              data-gisela-layer="head"
              clipPath={`url(#${id}-head)`}
            >
              <image href={asset} width={1024} height={1536} />
              {rig.eyes.map((eye, index) => (
                <g clipPath={`url(#${id}-eye-${index})`} key={index}>
                  <g transform={`translate(${eye.x} ${eye.y})`}>
                    <g className={styles.eyelid}>
                      <rect
                        width={eye.width}
                        height={eye.height}
                        fill={eye.fill}
                      />
                      <path
                        d={`M3 ${eye.height * 0.55} Q${eye.width / 2} ${eye.height * 0.9} ${eye.width - 3} ${eye.height * 0.6}`}
                        fill="none"
                        stroke="#603318"
                        strokeWidth={3.5}
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                </g>
              ))}
            </g>
          </svg>
        )}
      </div>
    </div>
  )
}
