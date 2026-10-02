// One-time sign-in: opens Google consent in the browser, catches the redirect on a
// loopback port and stores the refresh token in ~/.config/depannage/gbp-token.json.
//   node scripts/gbp/auth.mjs
import { createServer } from 'node:http'
import { randomBytes, createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { loadEnv, saveToken, SCOPE } from './lib.mjs'

const env = loadEnv()
const verifier = randomBytes(32).toString('base64url')
const challenge = createHash('sha256').update(verifier).digest('base64url')
const state = randomBytes(16).toString('hex')
let redirectUri

const server = createServer(async (req, res) => {
  const url = new URL(req.url, redirectUri)
  if (url.pathname !== '/') return res.writeHead(404).end()
  const done = (status, msg) => {
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }).end(msg)
    server.close()
  }

  if (url.searchParams.get('state') !== state) return done(400, 'State mismatch, relancez auth.mjs.')
  if (url.searchParams.get('error')) return done(400, `Refusé : ${url.searchParams.get('error')}`)

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      code: url.searchParams.get('code'),
      client_id: env.GBP_CLIENT_ID,
      client_secret: env.GBP_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code_verifier: verifier,
    }),
  })
  const data = await tokenRes.json()
  if (!tokenRes.ok || !data.refresh_token) {
    console.error('Token exchange failed:', data)
    return done(500, 'Échec, voir le terminal.')
  }
  const file = saveToken({ refresh_token: data.refresh_token, scope: data.scope, created: new Date().toISOString() })
  console.log(`Refresh token saved to ${file}`)
  done(200, 'Connecté. Vous pouvez fermer cet onglet.')
})

server.listen(0, '127.0.0.1', () => {
  redirectUri = `http://127.0.0.1:${server.address().port}`
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authUrl.search = new URLSearchParams({
    client_id: env.GBP_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline',
    prompt: 'consent', // forces a refresh token even if consent was already given
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  })
  console.log(`Opening Google sign-in… If nothing opens, visit:\n${authUrl}\n`)
  execFile('open', [authUrl.toString()], () => {})
})
