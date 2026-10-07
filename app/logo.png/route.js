import { ImageResponse } from 'next/og'

// Square brand logo for the Organization structured data (Google wants a raster image of
// at least 112×112 px). Same mark as app/icon.svg.
export const dynamic = 'force-static'

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#1A1A2E' }}>
        <svg width="512" height="512" viewBox="0 0 64 64">
          <g transform="translate(1 3) scale(0.88)">
            <path fill="#FFFFFF" fillRule="evenodd" d="M14 14H28A18 18 0 0 1 28 50H14Z M22 22H28A10 10 0 0 1 28 42H22Z" />
            <circle cx="52" cy="47" r="5" fill="#FF6B35" />
          </g>
        </svg>
      </div>
    ),
    { width: 512, height: 512 },
  )
}
