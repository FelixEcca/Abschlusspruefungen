export function htmlToPromptText(html: string): string {
  if (typeof document === 'undefined')
    return html.replace(/<[^>]+>/g, ' ').trim()
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html
  // KaTeX contains both MathML and visual HTML; keep the original TeX only once.
  wrapper.querySelectorAll('.katex').forEach(element => {
    const tex = element.querySelector(
      'annotation[encoding="application/x-tex"]',
    )?.textContent
    if (tex) element.replaceWith(document.createTextNode(` $${tex}$ `))
  })
  wrapper.querySelectorAll('img').forEach(element => {
    element.replaceWith(
      document.createTextNode(
        ` [Abbildung: ${element.getAttribute('alt') || 'ohne Textbeschreibung'}] `,
      ),
    )
  })
  wrapper
    .querySelectorAll('br')
    .forEach(element => element.replaceWith(document.createTextNode('\n')))
  wrapper
    .querySelectorAll('p,li,tr,h1,h2,h3')
    .forEach(element => element.appendChild(document.createTextNode('\n')))
  return (wrapper.innerText || wrapper.textContent || '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
