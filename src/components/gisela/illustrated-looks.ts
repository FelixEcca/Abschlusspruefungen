import type { GiselaLook } from './gisela-looks'

export type IllustratedLook = Exclude<GiselaLook, 'classic'>

type Layer = {
  clip: string
  cut: string
  pivot: [number, number]
}

type Eye = { x: number; y: number; width: number; height: number; fill: string }

type LookRig = {
  head: Layer
  tail: Layer
  prop?: Layer
  gesture: number
  eyes: [Eye, Eye]
}

const standardHead: Layer = {
  clip: 'M275 0H735V295L605 360L553 395L559 568L369 568L342 522L332 328L331 210L278 163Z',
  cut: 'M275 0H735V295L605 360L550 395L537 533L373 533L342 501L332 328L331 210L278 163Z',
  pivot: [455, 534],
}

const standardEyes: [Eye, Eye] = [
  { x: 426, y: 184, width: 50, height: 54, fill: '#f4b84c' },
  { x: 535, y: 208, width: 34, height: 46, fill: '#efae47' },
]

export const illustratedLooks: Record<IllustratedLook, LookRig> = {
  workshop: {
    head: standardHead,
    tail: {
      clip: 'M633 886L692 936L749 1011L807 973L869 971L915 1030L910 1118L823 1137L757 1096L705 1035L671 986Z',
      cut: 'M671 931L709 967L749 1011L807 973L869 971L915 1030L910 1118L823 1137L757 1096L705 1035L677 982Z',
      pivot: [673, 959],
    },
    prop: {
      clip: 'M141 322H255L336 632L351 683L329 750L297 794L234 800L208 748L206 524L161 438Z',
      cut: 'M141 322H255L335 632L316 669L299 728L287 777L236 800L208 748L206 524L161 438Z',
      pivot: [307, 713],
    },
    gesture: 2,
    eyes: standardEyes,
  },
  chemistry: {
    head: {
      ...standardHead,
      clip: 'M275 0H735V295L605 360L553 395L559 568L369 568L342 522L332 328L331 210L278 163Z',
    },
    tail: {
      clip: 'M348 934L370 952L350 1006L321 1061L286 1080L237 1095L197 1071L174 1022L182 974L206 937L242 943L272 989L299 1011L329 978Z',
      cut: 'M329 975L345 988L321 1061L286 1080L237 1095L197 1071L174 1022L182 974L206 937L242 943L272 989L299 1011Z',
      pivot: [342, 982],
    },
    prop: {
      clip: 'M611 383H810L815 557L781 609L747 686L707 734L659 737L636 700L648 620L680 550Z',
      cut: 'M611 383H810L815 557L781 609L747 686L707 716L675 708L660 680L675 619L680 550Z',
      pivot: [682, 683],
    },
    gesture: 0.65,
    eyes: [
      { x: 430, y: 181, width: 49, height: 53, fill: '#f5ba4e' },
      { x: 539, y: 208, width: 34, height: 45, fill: '#efb048' },
    ],
  },
  technical: {
    head: {
      clip: 'M230 0H658V294L524 349L451 388L485 566L331 562L295 493L277 330L279 200L230 152Z',
      cut: 'M230 0H658V294L524 349L451 388L465 531L330 531L295 493L277 330L279 200L230 152Z',
      pivot: [395, 533],
    },
    tail: {
      clip: 'M252 842L264 874L235 936L203 997L148 1049L104 1060L53 1044L40 993L48 898L93 903L132 935L141 983L177 960L217 897Z',
      cut: 'M228 891L242 908L235 936L203 997L148 1049L104 1060L53 1044L40 993L48 898L93 903L132 935L141 983L177 960L217 897Z',
      pivot: [241, 882],
    },
    gesture: 0,
    eyes: [
      { x: 369, y: 174, width: 49, height: 50, fill: '#f4b84c' },
      { x: 470, y: 197, width: 32, height: 47, fill: '#edac44' },
    ],
  },
  design: {
    head: standardHead,
    tail: {
      clip: 'M633 848L700 900L754 972L803 941L862 949L914 1010L918 1082L855 1108L790 1105L737 1061L687 996L657 929Z',
      cut: 'M667 896L700 924L754 972L803 941L862 949L914 1010L918 1082L855 1108L790 1105L737 1061L687 996L677 932Z',
      pivot: [677, 925],
    },
    prop: {
      clip: 'M110 220H242L296 533L337 608L321 704L272 752L215 733L184 655L175 418L150 362Z',
      cut: 'M110 220H242L296 533L292 607L293 656L282 708L257 733L215 733L184 655L175 418L150 362Z',
      pivot: [289, 673],
    },
    gesture: 2.5,
    eyes: standardEyes,
  },
  research: {
    head: standardHead,
    tail: {
      clip: 'M644 922L691 969L742 1036L810 987L885 991L923 1037L920 1128L859 1150L797 1142L737 1090L692 1029L664 972Z',
      cut: 'M676 967L699 999L742 1036L810 987L885 991L923 1037L920 1128L859 1150L797 1142L737 1090L692 1029L681 995Z',
      pivot: [678, 989],
    },
    prop: {
      clip: 'M96 220H335V480L279 529L317 647L329 718L303 748L253 763L218 717L172 579L141 542V479L98 382Z',
      cut: 'M96 220H335V480L279 529L295 636L301 699L280 725L251 730L218 717L172 579L141 542V479L98 382Z',
      pivot: [280, 716],
    },
    gesture: 1.1,
    eyes: standardEyes,
  },
  master: {
    head: standardHead,
    tail: {
      clip: 'M634 900L695 950L748 1031L821 962L890 984L917 1025L917 1112L852 1139L789 1129L735 1083L692 1020L665 966Z',
      cut: 'M671 952L698 984L748 1031L821 962L890 984L917 1025L917 1112L852 1139L789 1129L735 1083L692 1020L679 983Z',
      pivot: [676, 969],
    },
    prop: {
      clip: 'M108 260H277L349 602L353 678L331 742L295 789L231 785L208 735L207 483L166 407Z',
      cut: 'M108 260H277L349 602L322 650L304 709L289 762L267 784L231 785L208 735L207 483L166 407Z',
      pivot: [312, 707],
    },
    gesture: 1.5,
    eyes: [
      { x: 427, y: 180, width: 49, height: 52, fill: '#f4b84c' },
      { x: 535, y: 205, width: 34, height: 45, fill: '#efae47' },
    ],
  },
}
