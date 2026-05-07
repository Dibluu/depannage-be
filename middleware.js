import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // ── Subdomain: partenaire.dépannage.be → landing page /home ──
  if (hostname.startsWith('partenaire.')) {
    // Serve the partners landing page for any request on this subdomain
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/home', request.url))
    }
    // All other paths on the subdomain also land on /home
    return NextResponse.rewrite(new URL('/home', request.url))
  }

  // ── Protect all /admin routes except /admin/login ──
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get('admin_session')
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Run on all routes (needed for subdomain detection)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
