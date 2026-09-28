import { NextResponse } from 'next/server'
import { COOKIE, MAX_AGE, createSessionToken, passwordMatches } from '../../../../lib/admin-session'

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}))

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD non configuré.' }, { status: 500 })
  }

  if (!(await passwordMatches(password))) {
    // Small delay to slow down guessing.
    await new Promise(r => setTimeout(r, 600))
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  })
  return response
}
