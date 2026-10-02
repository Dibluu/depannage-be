// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver) about new or changed pages.
// Google does not use IndexNow. Runs after each production deploy (.github/workflows/indexnow.yml).
//   node scripts/indexnow.mjs             submit sitemap pages whose text changed since the last run
//   node scripts/indexnow.mjs --all       submit every sitemap page
//   node scripts/indexnow.mjs --dry-run   show what would be submitted, change nothing
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'

const HOST = 'www.xn--dpannage-b1a.be'
const SITE = `https://${HOST}`
// Public by design: engines check that /<key>.txt on the site returns this value.
const KEY = '55ee032c817a334539a21ebf7001776a'
const STATE_FILE = process.env.INDEXNOW_STATE || '.indexnow-state.json'

const args = new Set(process.argv.slice(2))
const dryRun = args.has('--dry-run')

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'depannage-indexnow' } })
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`)
  return res.text()
}

// Visible text plus <title>/<meta>, so a redeploy that only renames JS chunks isn't a change.
function fingerprint(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '')
    .replace(/<(?!title|\/title|meta)[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
  return createHash('sha1').update(text).digest('hex')
}

const sitemap = await get(`${SITE}/sitemap.xml`)
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])

const previous = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, 'utf8')) : {}
const current = {}
for (let i = 0; i < urls.length; i += 8) {
  const batch = urls.slice(i, i + 8)
  const prints = await Promise.all(batch.map(async u => fingerprint(await get(u))))
  batch.forEach((u, j) => { current[u] = prints[j] })
}

const toSubmit = args.has('--all') ? urls : urls.filter(u => previous[u] !== current[u])
console.log(`${urls.length} pages in sitemap, ${toSubmit.length} to submit`)
for (const u of toSubmit.slice(0, 10)) console.log(`  ${u}`)
if (toSubmit.length > 10) console.log(`  … and ${toSubmit.length - 10} more`)

if (dryRun) process.exit(0)

if (toSubmit.length) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: toSubmit }),
  })
  // 200 = accepted, 202 = accepted while the key is being checked; 403 = key file not found.
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow → ${res.status}: ${await res.text()}`)
  }
  console.log(`IndexNow accepted the submission (${res.status})`)
}

writeFileSync(STATE_FILE, JSON.stringify(current, null, 1))
