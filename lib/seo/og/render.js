import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

// Social preview card (WhatsApp, Facebook, LinkedIn…), drawn from the page's own data.
// Visitors of the page never download it, so it costs nothing in page speed.
const size = { width: 1200, height: 630 }

const NAVY = '#1A1A2E'
const ORANGE = '#FF6B35'

const COPY = {
  fr: { from: 'Dès', note: 'Prix annoncé avant le déplacement', trust: 'Artisans vérifiés · Paiement après l’intervention' },
  nl: { from: 'Vanaf', note: 'Prijs gekend vóór de verplaatsing', trust: 'Gecontroleerde vakmensen · Betaling na de interventie' },
}

const font = weight => readFile(join(process.cwd(), `lib/seo/og/inter-${weight}.ttf`))

// Same mark as app/icon.svg.
function Mark({ px }) {
  return (
    <svg width={px} height={px} viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#FFFFFF" fillOpacity="0.08" />
      <g transform="translate(-3 0)">
        <path fill="#FFFFFF" fillRule="evenodd" d="M14 14H28A18 18 0 0 1 28 50H14Z M22 22H28A10 10 0 0 1 28 42H22Z" />
        <circle cx="52" cy="47" r="5" fill={ORANGE} />
      </g>
    </svg>
  )
}

export async function ogImage({ lang = 'fr', kicker, title, from }) {
  const c = COPY[lang]
  const [semi, black] = await Promise.all([font(600), font(800)])
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: NAVY, fontFamily: 'Inter', position: 'relative' }}>
        <div style={{ position: 'absolute', right: -140, bottom: -140, width: 420, height: 420, borderRadius: 420, background: ORANGE, opacity: 0.9, display: 'flex' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Mark px={64} />
          <div style={{ display: 'flex', fontSize: 36, fontWeight: 800, color: '#FFFFFF' }}>
            Dépannage<span style={{ color: ORANGE }}>.be</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
          {kicker && <div style={{ display: 'flex', fontSize: 28, fontWeight: 600, color: ORANGE, marginBottom: 16 }}>{kicker}</div>}
          <div style={{ display: 'flex', fontSize: title.length > 42 ? 60 : 76, fontWeight: 800, lineHeight: 1.08, color: '#FFFFFF', letterSpacing: -1.5 }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '14px 26px', borderRadius: 16, background: '#FFFFFF', color: NAVY }}>
              {from && <span style={{ fontSize: 34, fontWeight: 800 }}>{`${c.from} ${from}`}</span>}
              <span style={{ fontSize: 24, fontWeight: 600, opacity: 0.75 }}>{from ? `· ${c.note.toLowerCase()}` : c.note}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>{c.trust}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: semi, weight: 600, style: 'normal' },
        { name: 'Inter', data: black, weight: 800, style: 'normal' },
      ],
    },
  )
}
