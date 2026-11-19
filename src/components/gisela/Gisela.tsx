'use client'

import { useId, useState } from 'react'
import styles from './Gisela.module.css'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { getGiselaLook, type GiselaLook } from './gisela-looks'
import { IllustratedGisela } from './IllustratedGisela'

type Props = {
  className?: string
  animated?: boolean
  look?: GiselaLook
}

export function Gisela({ className = '', animated = true, look }: Props) {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const activeLook = look ?? getGiselaLook(exam)
  const id = useId()
  const [loaded, setLoaded] = useState(false)
  const [bodyLoaded, setBodyLoaded] = useState(false)
  const moving = animated && loaded && bodyLoaded

  if (activeLook !== 'classic') {
    return (
      <IllustratedGisela
        key={activeLook}
        look={activeLook}
        animated={animated}
        className={className}
      />
    )
  }

  return (
    <div className={`${styles.root} ${className}`}>
      <div
        className={`${styles.figure} ${moving ? styles.moving : ''}`}
        role="img"
        aria-label="Gisela, deine Lernbegleitung"
        data-gisela-look={activeLook}
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
            {/* The fixed body has three legs; the moving foreleg is added once. */}
            <defs>
              <linearGradient
                id={`${id}-leg-fur`}
                x1={330}
                y1={950}
                x2={490}
                y2={980}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#ffd994" />
                <stop offset="0.3" stopColor="#ffc46b" />
                <stop offset="0.7" stopColor="#fdb34b" />
                <stop offset="1" stopColor="#eaa13f" />
              </linearGradient>
              <linearGradient
                id={`${id}-leg-spots`}
                x1={340}
                y1={940}
                x2={480}
                y2={970}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#bf752e" />
                <stop offset="0.55" stopColor="#b66827" />
                <stop offset="1" stopColor="#a65b20" />
              </linearGradient>
              <clipPath id={`${id}-tail`}>
                <path d="M712 811 C755 853 760 945 773 1002 C787 1059 818 1094 851 1084 L826 1066 L819 1034 L837 997 L850 979 L843 952 L877 957 L916 997 L924 1041 L903 1076 L868 1100 L829 1111 C783 1107 752 1066 740 1013 C733 973 739 922 720 882Z" />
              </clipPath>
              <path
                id={`${id}-upper-leg-shape`}
                d="M366 773 C340 794 317 837 321 867 C320 897 338 935 341 956 L372 1095 L362 1155 Q400 1174 441 1155 C457 1057 477 913 485 846 C492 810 465 779 427 769 C405 762 384 762 366 773Z"
              />
              <clipPath id={`${id}-upper-leg`}>
                <use href={`#${id}-upper-leg-shape`} />
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
              {/* The opaque thigh extends behind the body; its inner edge has no PNG cutout. */}
              <g data-gisela-layer="upper-leg">
                <use
                  href={`#${id}-upper-leg-shape`}
                  fill={`url(#${id}-leg-fur)`}
                />
                <g clipPath={`url(#${id}-upper-leg)`}>
                  <path
                    d="M344 794 C332 850 349 902 363 948 L398 1102 L388 1167 L357 1167 L359 1095 L329 952 C312 894 306 834 344 794Z"
                    fill="#ffd58b"
                    opacity={0.35}
                  />
                  <path
                    d="M474 790 C486 830 456 943 438 1031 L418 1167 L451 1167 L485 988 L509 811Z"
                    fill="#dc943b"
                    opacity={0.2}
                  />
                  <path
                    d="M348 857 Q350 843 365 832 L392 818 Q407 823 421 844 L417 883 Q409 900 393 905 L365 890 Q353 877 348 857Z"
                    fill={`url(#${id}-leg-spots)`}
                  />
                  <path
                    d="M435 867 Q439 856 453 850 L476 865 L470 902 Q466 922 452 932 L432 918 L425 888Z"
                    fill={`url(#${id}-leg-spots)`}
                  />
                  <path
                    d="M367 966 Q364 959 371 951 L385 940 Q393 935 400 942 L425 972 Q431 980 426 990 L417 1013 Q411 1028 401 1030 Q394 1032 387 1025 L374 1008 Q369 1002 369 991Z"
                    fill={`url(#${id}-leg-spots)`}
                  />
                  <path
                    d="M390 1067 Q395 1055 406 1048 Q414 1041 422 1050 L432 1062 Q438 1068 435 1079 L428 1100 Q424 1112 413 1122 Q407 1128 400 1122 Q390 1116 389 1105Z"
                    fill={`url(#${id}-leg-spots)`}
                  />
                </g>
                <use
                  href={`#${id}-upper-leg-shape`}
                  fill="none"
                  stroke="#42200c"
                  strokeWidth={6}
                  strokeLinejoin="round"
                  data-gisela-layer="upper-leg-outline"
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
