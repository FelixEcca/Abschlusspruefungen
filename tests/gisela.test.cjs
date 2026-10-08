const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { test } = require('node:test')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const ts = require('typescript')
const postcss = require('postcss')

const fileName = resolve(__dirname, '../src/components/gisela/Gisela.tsx')
const { outputText } = ts.transpileModule(readFileSync(fileName, 'utf8'), {
  fileName,
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
})
const componentModule = { exports: {} }
const dependencies = {
  react: React,
  'react/jsx-runtime': require('react/jsx-runtime'),
  './Gisela.module.css': {
    default: {
      root: 'root',
      figure: 'figure',
      staticImage: 'staticImage',
      rig: 'rig',
      moving: 'moving',
      tail: 'tail',
      foreleg: 'foreleg',
      lowerLeg: 'lowerLeg',
      eyes: 'eyes',
      eyelid: 'eyelid',
    },
    __esModule: true,
  },
}
new Function('require', 'module', 'exports', outputText)(
  name => {
    assert.ok(Object.hasOwn(dependencies, name), `Unexpected import: ${name}`)
    return dependencies[name]
  },
  componentModule,
  componentModule.exports,
)
const { Gisela } = componentModule.exports

test('the first blink is fully visible within one second and respects reduced motion', () => {
  const css = postcss.parse(
    readFileSync(
      resolve(__dirname, '../src/components/gisela/Gisela.module.css'),
      'utf8',
    ),
  )
  const animation = css.nodes.find(
    node => node.type === 'rule' && node.selector === '.moving .eyelid',
  )
  const duration = Number.parseFloat(
    animation.nodes.find(node => node.prop === 'animation').value.split(' ')[1],
  )
  const blink = css.nodes.find(
    node =>
      node.type === 'atrule' &&
      node.name === 'keyframes' &&
      node.params === 'blink',
  )
  const closed = blink.nodes.find(node =>
    node.nodes.some(
      declaration =>
        declaration.prop === 'opacity' && declaration.value === '1',
    ),
  )
  const firstClosedPercent = Number.parseFloat(closed.selector.split(',')[0])
  assert.equal(duration, 5)
  assert.ok((firstClosedPercent / 100) * duration < 1)
  const reducedMotion = css.nodes.find(
    node =>
      node.type === 'atrule' &&
      node.name === 'media' &&
      node.params === '(prefers-reduced-motion: reduce)',
  )
  assert.ok(
    reducedMotion.nodes.some(
      node =>
        node.selector.includes('.moving .eyelid') &&
        node.selector.includes('.moving .tail') &&
        node.selector.includes('.moving .foreleg') &&
        node.selector.includes('.moving .lowerLeg') &&
        node.nodes.some(
          declaration =>
            declaration.prop === 'animation' && declaration.value === 'none',
        ),
    ),
  )
})

test('Gisela provides a labelled fixed-size figure with one moving foreleg and no controls', () => {
  const markup = renderToStaticMarkup(React.createElement(Gisela))
  assert.match(markup, /role="img" aria-label="Gisela, deine Lernbegleitung"/)
  assert.match(markup, /width="1024" height="1536" alt=""/)
  assert.doesNotMatch(markup, /<button/)
  for (const layer of ['tail', 'foreleg', 'lower-leg', 'body']) {
    assert.equal(
      [...markup.matchAll(new RegExp(`data-gisela-layer="${layer}"`, 'g'))]
        .length,
      1,
    )
  }
  for (const asset of ['gisela-idle-v1.png', 'gisela-body-v1.png']) {
    const png = readFileSync(resolve(__dirname, '../public/img/gisela', asset))
    assert.equal(png.readUInt32BE(16), 1024)
    assert.equal(png.readUInt32BE(20), 1536)
    assert.equal(png[25], 6, 'PNG must retain RGBA transparency')
  }
})

test('a static Gisela has no animation control', () => {
  const markup = renderToStaticMarkup(
    React.createElement(Gisela, { animated: false }),
  )
  assert.doesNotMatch(markup, /<button/)
  assert.doesNotMatch(markup, /class="figure moving"/)
  assert.doesNotMatch(markup, /data-gisela-layer/)
})

test('multiple Gisela instances have independent eye and limb masks', () => {
  const markup = renderToStaticMarkup(
    React.createElement(
      React.Fragment,
      null,
      React.createElement(Gisela),
      React.createElement(Gisela),
    ),
  )
  const ids = [...markup.matchAll(/<clipPath id="([^"]+)"/g)].map(
    match => match[1],
  )
  const references = [...markup.matchAll(/clip-path="url\(#([^)]+)\)"/g)].map(
    match => match[1],
  )
  assert.equal(ids.length, 10)
  assert.equal(new Set(ids).size, 10)
  assert.deepEqual(references, ids)
})

test('tail movement and the immediate greeting repeat indefinitely without timers', () => {
  const css = postcss.parse(
    readFileSync(
      resolve(__dirname, '../src/components/gisela/Gisela.module.css'),
      'utf8',
    ),
  )
  for (const [selector, expected] of [
    ['.moving .tail', 'swish 3.2s ease-in-out infinite'],
    ['.moving .foreleg', 'lift 30s ease-in-out infinite'],
    ['.moving .lowerLeg', 'wave 30s ease-in-out infinite'],
  ]) {
    const rule = css.nodes.find(
      node => node.type === 'rule' && node.selector === selector,
    )
    assert.equal(
      rule.nodes.find(node => node.prop === 'animation').value,
      expected,
    )
  }
  const wave = css.nodes.find(
    node => node.type === 'atrule' && node.params === 'wave',
  )
  const rest = wave.nodes.find(node => node.selector.includes('0%'))
  assert.equal(
    rest.nodes.find(node => node.prop === 'transform').value,
    'rotate(0deg)',
  )
  const raised = wave.nodes.find(node =>
    node.selector
      .split(',')
      .map(value => value.trim())
      .includes('3%'),
  )
  assert.equal(
    raised.nodes.find(node => node.prop === 'transform').value,
    'rotate(110deg)',
  )
  const lift = css.nodes.find(
    node => node.type === 'atrule' && node.params === 'lift',
  )
  assert.equal(
    lift.nodes
      .find(node => node.selector.includes('3%'))
      .nodes.find(node => node.prop === 'transform').value,
    'rotate(55deg)',
  )
  const markup = renderToStaticMarkup(React.createElement(Gisela))
  assert.match(
    markup,
    /data-gisela-layer="foreleg"[\s\S]*data-gisela-layer="lower-leg"[\s\S]*data-gisela-layer="body"/,
  )
  assert.doesNotMatch(readFileSync(fileName, 'utf8'), /setInterval|setTimeout/)
})
