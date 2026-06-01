#!/usr/bin/env node
/**
 * Prerender script — gera HTML estático pra rota "/" usando o bundle SSR.
 * Roda depois do `vite build` (client) e `vite build --ssr` (server).
 *
 * Output: substitui dist/index.html injetando a árvore renderizada
 * no marcador <!--app-html--> deixado pelo template index.html.
 */
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')

const TEMPLATE_PATH = resolve(ROOT, 'dist', 'index.html')
const SERVER_ENTRY = resolve(ROOT, 'dist', 'server', 'entry-server.js')

const ROUTES_TO_PRERENDER = ['/']

async function main() {
  console.log('[prerender] starting')

  const template = readFileSync(TEMPLATE_PATH, 'utf-8')
  if (!template.includes('<!--app-html-->')) {
    throw new Error('[prerender] index.html nao tem o marcador <!--app-html-->')
  }

  const serverEntry = await import(pathToFileURL(SERVER_ENTRY).href)
  const render = serverEntry.render
  if (typeof render !== 'function') {
    throw new Error('[prerender] entry-server.js nao exporta uma funcao render()')
  }

  for (const route of ROUTES_TO_PRERENDER) {
    const appHtml = render(route)
    const html = template.replace('<!--app-html-->', appHtml)

    // Por enquanto so prerender pra `/`. Caso adicione mais rotas, criar
    // subdirs: dist/{route}/index.html.
    const outPath = route === '/' ? TEMPLATE_PATH : resolve(ROOT, 'dist', route.slice(1), 'index.html')
    writeFileSync(outPath, html, 'utf-8')
    console.log(`[prerender] ${route} -> ${outPath} (${appHtml.length} chars)`)
  }

  // Limpa o bundle SSR — nao deve ser deployado publicamente
  const serverDir = resolve(ROOT, 'dist', 'server')
  if (existsSync(serverDir)) {
    rmSync(serverDir, { recursive: true, force: true })
    console.log('[prerender] cleaned dist/server')
  }

  console.log('[prerender] done')
}

main().catch((err) => {
  console.error('[prerender] FAILED')
  console.error(err)
  process.exit(1)
})
