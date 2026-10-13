import { ImageResponse } from 'next/og'

// PNG icons for the admin app manifest (public/app-admin.webmanifest): same mark as app/icon.svg,
// with a safe margin so Android's maskable crop keeps the whole logo.
const SIZES = [192, 512]

export function generateStaticParams() {
  return SIZES.map(size => ({ size: String(size) }))
}

export function GET(_request, { params }) {
  const size = SIZES.includes(Number(params.size)) ? Number(params.size) : 192
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1A1A2E' }}>
        <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 64 64">
          <g transform="translate(1 3) scale(0.88)">
            <path fill="#FFFFFF" fillRule="evenodd" d="M14 14H28A18 18 0 0 1 28 50H14Z M22 22H28A10 10 0 0 1 28 42H22Z" />
            <circle cx="52" cy="47" r="5" fill="#FF6B35" />
          </g>
        </svg>
      </div>
    ),
    { width: size, height: size },
  )
}
