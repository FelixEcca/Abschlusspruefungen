export function normalizeMathForMarkdown(text: string): string {
  // Ordinary square brackets belong to the formula; never turn them into delimiters.
  return text
    .replace(/\\\(([\s\S]*?)\\\)/g, (_match, math) => `$${math}$`)
    .replace(/\\\[([\s\S]*?)\\\]/g, (_match, math) => `$$${math}$$`)
}
