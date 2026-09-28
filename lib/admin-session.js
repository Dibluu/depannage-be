// Signed admin session cookie: "<expiry>.<HMAC-SHA256(expiry)>".
// Web Crypto only, so it runs in the middleware (edge) and in route handlers (node).
export const COOKIE = 'admin_session'
export const MAX_AGE = 60 * 60 * 12 // 12 h

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ''
}

const enc = new TextEncoder()

async function sign(value) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(value))
  return Array.from(new Uint8Array(sig), b => b.toString(16).padStart(2, '0')).join('')
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createSessionToken() {
  const exp = String(Date.now() + MAX_AGE * 1000)
  return `${exp}.${await sign(exp)}`
}

export async function verifySessionToken(token) {
  if (!secret() || !token || !token.includes('.')) return false
  const [exp, sig] = token.split('.')
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false
  return safeEqual(sig, await sign(exp))
}

// Constant-time password check (hash both sides so lengths match).
export async function passwordMatches(input) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || typeof input !== 'string') return false
  const [a, b] = await Promise.all([sign(`pwd:${input}`), sign(`pwd:${expected}`)])
  return safeEqual(a, b)
}

export async function isAdminRequest(request) {
  return verifySessionToken(request.cookies.get(COOKIE)?.value)
}
