'use client'
import { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Phone, MessageCircle, MapPin, Bell, BellOff, LogOut, RefreshCw, Zap, Euro, ChevronDown, Share, PlusSquare } from 'lucide-react'

// Admin app: live list of booking requests, installable on the phone's home screen
// (public/app-admin.webmanifest) with push notifications (public/sw-admin.js, lib/push.js).

const STATUSES = {
  nouveau:  { label: 'À traiter',  bg: '#FFF4EF', text: '#C2410C' },
  confirme: { label: 'Confirmée',  bg: '#EFF6FF', text: '#1D4ED8' },
  termine:  { label: 'Terminée',   bg: '#ECFDF5', text: '#047857' },
  annule:   { label: 'Annulée',    bg: '#F3F4F6', text: '#6B7280' },
}
const TABS = [['nouveau', 'À traiter'], ['confirme', 'Confirmées'], ['termine', 'Terminées'], ['annule', 'Annulées'], ['all', 'Toutes']]
const SLOTS = { matin: 'Matin 8h–12h', 'apres-midi': 'Après-midi 12h–17h', soir: 'Soir 17h–20h' }
const REFRESH_MS = 30_000
const VAPID = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''

function timeAgo(ts) {
  const m = Math.floor((Date.now() - new Date(ts).getTime()) / 60000)
  if (m < 1) return 'à l’instant'
  if (m < 60) return `il y a ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `il y a ${h} h`
  return new Date(ts).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short' })
}

function slotLabel(b) {
  if (b.urgent) return 'Dès que possible'
  const day = new Date(`${b.slot_date}T12:00:00`).toLocaleDateString('fr-BE', { weekday: 'short', day: 'numeric', month: 'short' })
  return `${day} · ${SLOTS[b.slot_time] || b.slot_time}`
}

function base64ToBytes(base64) {
  const b64 = (base64 + '='.repeat((4 - (base64.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/')
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}

/* ─── Install + notifications ─────────────────────────────── */
function useAppSetup() {
  const [state, setState] = useState({ standalone: true, ios: false, push: 'loading' })
  const [installPrompt, setInstallPrompt] = useState(null)

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent)
    const onPrompt = e => { e.preventDefault(); setInstallPrompt(e) }
    window.addEventListener('beforeinstallprompt', onPrompt)

    ;(async () => {
      if (!('serviceWorker' in navigator) || !('PushManager' in window) || !VAPID) {
        // iOS only exposes push to the app once it is on the home screen.
        return setState({ standalone, ios, push: ios && !standalone ? 'install-first' : 'unsupported' })
      }
      const reg = await navigator.serviceWorker.register('/sw-admin.js', { scope: '/admin/' })
      const sub = await reg.pushManager.getSubscription()
      const push = Notification.permission === 'denied' ? 'denied' : sub ? 'on' : 'off'
      setState({ standalone, ios, push })
    })().catch(() => setState(s => ({ ...s, standalone, ios, push: 'unsupported' })))

    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  const enable = useCallback(async () => {
    setState(s => ({ ...s, push: 'loading' }))
    try {
      if ((await Notification.requestPermission()) !== 'granted') return setState(s => ({ ...s, push: 'denied' }))
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: base64ToBytes(VAPID) })
      const res = await fetch('/api/admin/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscription: sub.toJSON() }) })
      if (!res.ok) throw new Error('save')
      await fetch('/api/admin/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ test: true }) })
      setState(s => ({ ...s, push: 'on' }))
    } catch {
      setState(s => ({ ...s, push: 'error' }))
    }
  }, [])

  const disable = useCallback(async () => {
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    if (sub) {
      await fetch('/api/admin/push', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) })
      await sub.unsubscribe()
    }
    setState(s => ({ ...s, push: 'off' }))
  }, [])

  const install = useCallback(async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }, [installPrompt])

  return { ...state, canInstall: !!installPrompt, install, enable, disable }
}

function SetupBanner({ app }) {
  if (!app.standalone && app.ios) {
    return (
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-gray-700">
        <div className="mb-1 font-bold text-gray-900">Installer l’app sur l’iPhone</div>
        Dans Safari, touchez <Share size={14} className="inline -mt-1" /> <b>Partager</b>, puis <PlusSquare size={14} className="inline -mt-1" /> <b>Sur l’écran d’accueil</b>.
        Ouvrez ensuite l’app depuis l’icône pour activer les notifications.
      </div>
    )
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      {!app.standalone && app.canInstall && (
        <button onClick={app.install} className="rounded-lg bg-[#1A1A2E] px-3 py-2 text-xs font-bold text-white">Installer l’app</button>
      )}
      {app.push === 'off' && (
        <div className="w-full rounded-2xl bg-[#FF6B35] p-4 text-white shadow-lg shadow-[#FF6B35]/25">
          <div className="flex items-center gap-2 font-bold"><Bell size={18} /> Notifications désactivées sur cet appareil</div>
          <p className="mt-1 text-sm text-white/90">Activez-les pour être prévenu à chaque nouvelle demande, même app fermée.</p>
          <button onClick={app.enable} className="mt-3 w-full rounded-xl bg-white py-3 text-sm font-black text-[#FF6B35]">Activer les notifications</button>
        </div>
      )}
      {app.push === 'unsupported' && <span className="text-xs text-gray-500">Ce navigateur ne reçoit pas les notifications. Installez l’app sur l’écran d’accueil du téléphone.</span>}
      {app.push === 'on' && (
        <button onClick={app.disable} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-500"><BellOff size={14} /> Couper les notifications</button>
      )}
      {app.push === 'denied' && <span className="text-xs text-red-600">Notifications bloquées : autorisez-les dans les réglages du téléphone pour ce site.</span>}
      {app.push === 'error' && <span className="text-xs text-red-600">Impossible d’activer les notifications. Réessayez.</span>}
    </div>
  )
}

/* ─── Booking card ────────────────────────────────────────── */
function BookingCard({ b, open, onToggle, onStatus, highlight }) {
  const st = STATUSES[b.status] || STATUSES.nouveau
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address}, ${b.postcode} ${b.commune}, Belgique`)}`
  const ref = useRef(null)
  useEffect(() => { if (highlight) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, [highlight])

  return (
    <li ref={ref} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${highlight ? 'border-[#FF6B35] ring-2 ring-[#FF6B35]/30' : 'border-gray-100'}`}>
      <button onClick={onToggle} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
              {b.urgent && <span className="flex items-center gap-0.5 rounded-full bg-red-600 px-2 py-0.5 text-white"><Zap size={11} /> URGENT</span>}
              <span className="rounded-full px-2 py-0.5" style={{ background: st.bg, color: st.text }}>{st.label}</span>
              <span className="font-medium text-gray-400">{timeAgo(b.created_at)}</span>
            </div>
            <div className="mt-1.5 font-bold text-gray-900">{b.trade} · {b.problem}</div>
            <div className="mt-0.5 text-sm text-gray-500">{b.postcode} {b.commune} · {slotLabel(b)}</div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="flex items-center text-sm font-black text-gray-900"><Euro size={13} />{b.price_min ? `${b.price_min}–${b.price_max}` : 'devis'}</span>
            <ChevronDown size={16} className={`text-gray-300 transition ${open ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </button>

      {open && (
        <div className="space-y-3 border-t border-gray-100 p-4 text-sm">
          <div>
            <div className="font-semibold text-gray-900">{b.name}</div>
            <div className="text-gray-600">{b.address}{b.floor ? ` (${b.floor})` : ''}, {b.postcode} {b.commune}</div>
            <div className="text-gray-600">{b.phone}{b.email ? ` · ${b.email}` : ''}</div>
            {b.description && <p className="mt-2 rounded-lg bg-gray-50 p-2 text-gray-700">{b.description}</p>}
            {b.photo && <a href={b.photo} target="_blank" rel="noopener noreferrer"><img src={b.photo} alt="Photo du problème" className="mt-2 max-h-48 rounded-lg" /></a>}
            <div className="mt-2 text-xs text-gray-400">{b.ref}{b.lang === 'nl' ? ' · NL' : ''}{b.surcharge ? ` · majoration ${b.surcharge} € incluse` : ''}</div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <a href={`tel:${b.phone.replace(/[^\d+]/g, '')}`} className="flex flex-col items-center gap-1 rounded-xl bg-[#1A1A2E] py-2.5 text-xs font-bold text-white"><Phone size={16} />Appeler</a>
            <a href={b.whatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 rounded-xl bg-[#25D366] py-2.5 text-xs font-bold text-white"><MessageCircle size={16} />WhatsApp</a>
            <a href={maps} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-700"><MapPin size={16} />Itinéraire</a>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {Object.entries(STATUSES).filter(([k]) => k !== b.status).map(([k, s]) => (
              <button key={k} onClick={() => onStatus(b.ref, k)} className="rounded-lg px-3 py-1.5 text-xs font-bold" style={{ background: s.bg, color: s.text }}>
                → {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </li>
  )
}

/* ─── Page ────────────────────────────────────────────────── */
function Demandes() {
  const router = useRouter()
  const focusRef = useSearchParams().get('ref')
  const app = useAppSetup()
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('nouveau')
  const [openRef, setOpenRef] = useState(focusRef)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/bookings', { cache: 'no-store' }).catch(() => null)
    setLoading(false)
    if (res?.status === 401) return router.push('/admin/login')
    if (!res?.ok) return setError('Impossible de charger les demandes.')
    setError('')
    setRows(await res.json())
  }, [router])

  // Live: poll while visible, reload on return to the app and when a push arrives.
  useEffect(() => {
    load()
    const timer = setInterval(() => { if (document.visibilityState === 'visible') load() }, REFRESH_MS)
    const onVisible = () => { if (document.visibilityState === 'visible') load() }
    const onMessage = e => { if (e.data?.type === 'new-booking') load() }
    document.addEventListener('visibilitychange', onVisible)
    navigator.serviceWorker?.addEventListener('message', onMessage)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
      navigator.serviceWorker?.removeEventListener('message', onMessage)
    }
  }, [load])

  useEffect(() => { if (focusRef) { setOpenRef(focusRef); setTab('all') } }, [focusRef])

  async function setStatus(ref, status) {
    setRows(rs => rs.map(r => (r.ref === ref ? { ...r, status } : r)))
    const res = await fetch('/api/admin/bookings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref, status }) }).catch(() => null)
    if (!res?.ok) { setError('Le statut n’a pas été enregistré.'); load() }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const count = k => (rows || []).filter(r => (r.status || 'nouveau') === k).length
  const shown = (rows || []).filter(r => tab === 'all' || (r.status || 'nouveau') === tab)

  return (
    <div className="min-h-screen bg-gray-50 pb-10" style={{ fontFamily: 'Inter, system-ui, sans-serif', paddingTop: 'env(safe-area-inset-top)' }}>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <span className="text-lg font-black text-[#1A1A2E]">Dépannage<span className="text-[#FF6B35]">.be</span></span>
          <div className="flex items-center gap-1">
            <a href="/admin/pricing" className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50">Tarifs</a>
            <button onClick={load} aria-label="Actualiser" className="rounded-lg p-2 text-gray-500 hover:bg-gray-50"><RefreshCw size={16} className={loading ? 'animate-spin' : ''} /></button>
            <button onClick={logout} aria-label="Déconnexion" className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-500"><LogOut size={16} /></button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-2xl gap-1 overflow-x-auto px-4 pb-2">
          {TABS.map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${tab === k ? 'bg-[#1A1A2E] text-white' : 'bg-gray-100 text-gray-600'}`}>
              {label}{k !== 'all' && rows ? ` ${count(k)}` : ''}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-2xl space-y-3 px-4 pt-4">
        <SetupBanner app={app} />
        {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {!rows && !error && <div className="py-16 text-center text-sm text-gray-400">Chargement…</div>}
        {rows && !shown.length && <div className="py-16 text-center text-sm text-gray-400">Aucune demande ici.</div>}
        <ul className="list-none space-y-3">
          {shown.map(b => (
            <BookingCard key={b.ref} b={b} open={openRef === b.ref} highlight={focusRef === b.ref}
              onToggle={() => setOpenRef(o => (o === b.ref ? null : b.ref))} onStatus={setStatus} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default function Page() {
  return <Suspense><Demandes /></Suspense>
}
