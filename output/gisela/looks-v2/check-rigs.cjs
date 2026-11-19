const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const sharp = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')

const root = path.resolve(__dirname, '../../..')
const source = fs.readFileSync(path.join(root, 'src/components/gisela/illustrated-looks.ts'), 'utf8')
const compiled = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText
const rigModule = {exports: {}}
new Function('exports', compiled)(rigModule.exports)

async function main() {
  for (const [look, rig] of Object.entries(rigModule.exports.illustratedLooks)) {
    const image = fs.readFileSync(path.join(root, `public/img/gisela/gisela-${look}-v2.webp`))
    const png = await sharp(image).png().toBuffer()
    const uri = `data:image/png;base64,${png.toString('base64')}`
    const raster = `<image xlink:href="${uri}" width="1024" height="1536"/>`
    const layers = {head:rig.head, tail:rig.tail, ...(rig.prop ? {prop:rig.prop} : {})}
    const defs = Object.entries(layers).map(([name,layer]) => `<clipPath id="${name}"><path d="${layer.clip}"/></clipPath>`).join('')
    const mask = `<mask id="body" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1536"><rect width="1024" height="1536" fill="white"/>${Object.values(layers).map(layer=>`<path d="${layer.cut}" fill="black"/>`).join('')}</mask>`
    const base = await sharp(image).ensureAlpha().raw().toBuffer()
    for (const raised of [false,true]) {
      const draw = name => {
        const layer = layers[name]
        if (!layer) return ''
        const angle = raised ? name === 'head' ? -0.55 : name === 'tail' ? 2 : rig.gesture : 0
        return `<g transform="rotate(${angle} ${layer.pivot.join(' ')})" clip-path="url(#${name})">${raster}</g>`
      }
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1024" height="1536"><defs>${defs}${mask}</defs>${draw('tail')}${draw('prop')}<g mask="url(#body)">${raster}</g>${draw('head')}</svg>`
      const result = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer()
      if (!raised) {
        let holes = 0
        for(let i=3;i<base.length;i+=4) if(base[i]>250 && result[i]<200) holes++
        console.log(look, 'opaque pixels lost at rest:', holes)
        if (holes > 100) process.exitCode = 1
      }
      await sharp(result,{raw:{width:1024,height:1536,channels:4}}).png().toFile(path.join(__dirname,`${look}-rig-${raised?'gesture':'rest'}.png`))
    }
  }
}
main().catch(error=>{console.error(error);process.exitCode=1})
