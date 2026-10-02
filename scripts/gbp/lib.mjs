// Google Business Profile API helpers. Credentials live outside the repo, in
// ~/.config/depannage/ (override with GBP_CONFIG_DIR):
//   gbp.env         GBP_CLIENT_ID=... / GBP_CLIENT_SECRET=...  (OAuth "Desktop app" client)
//   gbp-token.json  refresh token, written by auth.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

export const CONFIG_DIR = process.env.GBP_CONFIG_DIR || join(homedir(), '.config', 'depannage')
const ENV_FILE = join(CONFIG_DIR, 'gbp.env')
const TOKEN_FILE = join(CONFIG_DIR, 'gbp-token.json')

export const SCOPE = 'https://www.googleapis.com/auth/business.manage'

export function loadEnv() {
  if (!existsSync(ENV_FILE)) {
    throw new Error(`Missing ${ENV_FILE} — add GBP_CLIENT_ID=... and GBP_CLIENT_SECRET=...`)
  }
  const env = {}
  for (const line of readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  if (!env.GBP_CLIENT_ID || !env.GBP_CLIENT_SECRET) {
    throw new Error(`${ENV_FILE} must define GBP_CLIENT_ID and GBP_CLIENT_SECRET`)
  }
  return env
}

export function saveToken(token) {
  mkdirSync(CONFIG_DIR, { recursive: true })
  writeFileSync(TOKEN_FILE, JSON.stringify(token, null, 2), { mode: 0o600 })
  return TOKEN_FILE
}

let cached
async function accessToken() {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token
  if (!existsSync(TOKEN_FILE)) throw new Error('No token yet — run: node scripts/gbp/auth.mjs')
  const { refresh_token } = JSON.parse(readFileSync(TOKEN_FILE, 'utf8'))
  const env = loadEnv()
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: env.GBP_CLIENT_ID,
      client_secret: env.GBP_CLIENT_SECRET,
      refresh_token,
      grant_type: 'refresh_token',
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    // invalid_grant usually means the consent screen is still in "Testing" (7-day tokens).
    throw new Error(`Token refresh failed: ${data.error} ${data.error_description || ''} — rerun auth.mjs`)
  }
  cached = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 }
  return cached.token
}

export async function api(url, { method = 'GET', body } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      ...(body && { 'Content-Type': 'application/json' }),
    },
    body: body && JSON.stringify(body),
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : {}
  if (!res.ok) {
    const msg = data.error?.message || text
    const hint = res.status === 429 ? ' (quota 0 = API access request not approved yet)' : ''
    throw new Error(`${method} ${url} → ${res.status}: ${msg}${hint}`)
  }
  return data
}

// Follows nextPageToken and concatenates the `key` array of every page.
export async function listAll(url, key) {
  const out = []
  let pageToken
  do {
    const u = new URL(url)
    if (pageToken) u.searchParams.set('pageToken', pageToken)
    const data = await api(u.toString())
    out.push(...(data[key] || []))
    pageToken = data.nextPageToken
  } while (pageToken)
  return out
}

// Every listing the signed-in user can manage, own or as manager (Lockey, Kiverrou…).
// A listing can show up under several accounts (personal + location group): deduped.
export async function locations() {
  const accounts = await listAll('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', 'accounts')
  const byName = new Map()
  for (const a of accounts) {
    const locs = await listAll(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${a.name}/locations?readMask=name,title,storefrontAddress&pageSize=100`,
      'locations',
    )
    for (const l of locs) {
      if (byName.has(l.name)) continue
      byName.set(l.name, {
        account: a.name, // accounts/123
        location: l.name, // locations/456
        title: l.title,
        city: l.storefrontAddress?.locality || '',
      })
    }
  }
  return [...byName.values()]
}

export function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) { args._.push(a); continue }
    const [k, v] = a.slice(2).split('=')
    args[k] = v ?? (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true)
  }
  return args
}

// Case-insensitive match on title or city, for --location=lockey
export function filterLocations(locs, q) {
  if (!q || q === true) return locs
  const needle = String(q).toLowerCase()
  return locs.filter(l => `${l.title} ${l.city}`.toLowerCase().includes(needle))
}
