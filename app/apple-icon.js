import { ImageResponse } from 'next/og'

// Home-screen icon for iOS: same mark as app/icon.svg, on a full square (iOS rounds the corners itself).
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#1A1A2E' }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <g transform="translate(1 3) scale(0.88)">
            <path fill="#FFFFFF" fillRule="evenodd" d="M14 14H28A18 18 0 0 1 28 50H14Z M22 22H28A10 10 0 0 1 28 42H22Z" />
            <circle cx="52" cy="47" r="5" fill="#FF6B35" />
          </g>
        </svg>
      </div>
    ),
    size,
  )
}
