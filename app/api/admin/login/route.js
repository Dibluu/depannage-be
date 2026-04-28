import { NextResponse } from 'next/server'

export async function POST(request) {
  const { password } = await request.json()

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD non configuré.' }, { status: 500 })
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 h
    path: '/',
  })
  return response
}
