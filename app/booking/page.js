'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Droplets, Zap, Lock, Flame, Hammer,
  Droplet, Waves, Thermometer, Bath, AlertCircle,
  ZapOff, Plug, Cpu, Lightbulb, Shield, Key,
  DoorOpen, Settings, ArrowLeft, Check, Camera,
  Clock, Wrench, ChevronRight,
} from 'lucide-react'

/* ─── DATA ──────────────────────────────────────────────── */
const PRICES = {
  Plomberie: {
    "Fuite d'eau":       { min: 89,  max: 149, duration: '1h–2h'      },
    'Débouchage':        { min: 69,  max: 99,  duration: '45min–1h30' },
    'Chauffe-eau':       { min: 129, max: 249, duration: '2h–4h'      },
    'Robinetterie':      { min: 79,  max: 129, duration: '1h–2h'      },
    'WC / Chasse d\'eau':{ min: 69,  max: 109, duration: '45min–1h30' },
    'Urgence':           { min: 149, max: 249, duration: '1h–3h'      },
  },
  Électricité: {
    'Panne générale':       { min: 79,  max: 129, duration: '1h–2h'   },
    'Prise / Interrupteur': { min: 69,  max: 99,  duration: '45min–1h'},
    'Tableau électrique':   { min: 119, max: 199, duration: '2h–3h'   },
    'Éclairage':            { min: 89,  max: 139, duration: '1h–2h'   },
    'Mise aux normes':      { min: 149, max: 299, duration: '3h–5h'   },
    'Urgence électrique':   { min: 149, max: 229, duration: '1h–3h'   },
  },
  Serrurerie: {
    'Porte bloquée':        { min: 89,  max: 169, duration: '30min–1h30'},
    'Remplacement serrure': { min: 99,  max: 179, duration: '1h–2h'    },
    "Ouverture de porte":   { min: 79,  max: 149, duration: '30min–1h' },
    'Blindage de porte':    { min: 199, max: 399, duration: '3h–5h'    },
  },
  Chauffage: {
    'Chaudière en panne': { min: 99,  max: 199, duration: '1h30–3h' },
    'Radiateur froid':    { min: 79,  max: 129, duration: '1h–2h'   },
    'Fuite chaudière':    { min: 119, max: 199, duration: '1h30–3h' },
    'Entretien annuel':   { min: 89,  max: 139, duration: '1h–2h'   },
  },
}

const PROBLEMS = {
  Plomberie: [
    { Icon: Droplet,     label: "Fuite d'eau",      sub: 'Robinet, tuyau, joint'    },
    { Icon: Waves,       label: 'Débouchage',        sub: 'Évier, WC, canalisation'  },
    { Icon: Thermometer, label: 'Chauffe-eau',       sub: 'Panne, remplacement'      },
    { Icon: Bath,        label: 'Robinetterie',      sub: 'Remplacement, réparation' },
    { Icon: AlertCircle, label: "WC / Chasse d'eau", sub: 'Fuite, mécanisme'         },
    { Icon: AlertCircle, label: 'Urgence',           sub: 'Dégât des eaux imminent'  },
  ],
  Électricité: [
    { Icon: ZapOff,      label: 'Panne générale',       sub: 'Plus de courant'            },
    { Icon: Plug,        label: 'Prise / Interrupteur', sub: 'Remplacement, ajout'        },
    { Icon: Cpu,         label: 'Tableau électrique',   sub: 'Disjoncteur, mise aux normes'},
    { Icon: Lightbulb,   label: 'Éclairage',            sub: 'Installation, dépannage'    },
    { Icon: Shield,      label: 'Mise aux normes',      sub: 'Contrôle, certification'    },
    { Icon: AlertCircle, label: 'Urgence électrique',   sub: 'Risque immédiat'            },
  ],
  Serrurerie: [
    { Icon: Lock,     label: 'Porte bloquée',        sub: 'Clé cassée, serrure coincée'},
    { Icon: Key,      label: 'Remplacement serrure', sub: 'Upgrade sécurité'           },
    { Icon: DoorOpen, label: 'Ouverture de porte',   sub: 'Clé perdue'                 },
    { Icon: Shield,   label: 'Blindage de porte',    sub: 'Sécurisation'               },
  ],
  Chauffage: [
    { Icon: Flame,       label: 'Chaudière en panne', sub: 'Plus de chauffage'   },
    { Icon: Thermometer, label: 'Radiateur froid',    sub: 'Purge, remplacement' },
    { Icon: Droplets,    label: 'Fuite chaudière',    sub: 'Réparation urgente'  },
    { Icon: Settings,    label: 'Entretien annuel',   sub: 'Révision, nettoyage' },
  ],
}

const STEP_LABELS = ['Métier', 'Problème', 'Prix', 'Créneau', 'Coordonnées', 'Confirmation']
const DAY_SHORT   = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
const MONTH_SHORT = ['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc']
const TIME_LABELS = { matin: 'Matin (8h–12h)', 'apres-midi': 'Après-midi (12h–17h)', soir: 'Soir (17h–20h)' }

function getDays() {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return {
      key:   d.toISOString().split('T')[0],
      short: i === 0 ? 'Auj.' : i === 1 ? 'Dem.' : `${DAY_SHORT[d.getDay()]} ${d.getDate()}`,
      full:  `${DAY_SHORT[d.getDay()]} ${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`,
    }
  })
}

function generateRef() {
  return `DEP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`
}

/* ─── STYLES ─────────────────────────────────────────────── */
const css = `
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(36px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-36px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes drawCircle {
    from { stroke-dashoffset: 220; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes drawCheck {
    from { stroke-dashoffset: 60; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .bk-input:focus  { border-color: #FF6B35 !important; }
  .bk-date-pills::-webkit-scrollbar { display: none; }
  .bk-upload-zone:hover { border-color: #FF6B35 !important; background: #FFF4F0 !important; }
  .bk-btn-orange:hover { opacity: 0.9; }
  .bk-btn-green:hover  { opacity: 0.9; }
`

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
export default function BookingPage() {
  const [step,      setStep]      = useState(1)
  const [direction, setDirection] = useState('forward')
  const [trade,     setTrade]     = useState(null)
  const [problem,   setProblem]   = useState(null)
  const [otherText, setOtherText] = useState('')
  const [price,     setPrice]     = useState({ min: 89, max: 149, duration: '1h–2h' })
  const [slot,      setSlot]      = useState({ date: null, time: null, urgent: false })
  const [contact,   setContact]   = useState({ name:'', email:'', phone:'', address:'', floor:'', description:'' })
  const [photo,     setPhoto]     = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [bookingRef, setBookingRef]     = useState(null)
  const [loading,    setLoading]        = useState(false)

  const days    = getDays()
  const fileRef = useRef(null)

  function goTo(s, dir = 'forward') {
    setDirection(dir)
    setStep(s)
  }

  function selectTrade(t) {
    setTrade(t)
    setProblem(null)
    setTimeout(() => goTo(2), 300)
  }

  function selectProblem(p) {
    setProblem(p)
    setPrice(PRICES[trade]?.[p] ?? { min: 89, max: 149, duration: '1h–2h' })
    setTimeout(() => goTo(3), 300)
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert('La photo ne doit pas dépasser 5 Mo.'); return }
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  async function submitBooking() {
    setLoading(true)
    const ref = generateRef()
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        )
        await supabase.from('bookings').insert({
          ref,
          trade,
          problem: problem || otherText,
          price_min:  price.min,
          price_max:  price.max,
          slot_date:  slot.urgent ? 'urgent' : slot.date,
          slot_time:  slot.urgent ? 'urgent' : slot.time,
          urgent:     slot.urgent,
          name:       contact.name,
          email:      contact.email,
          phone:      contact.phone,
          address:    contact.address,
          floor:      contact.floor,
          description: contact.description,
          status:     'nouveau',
        })
      }
    } catch (err) {
      console.error('Booking error (non-blocking):', err)
    }
    setBookingRef(ref)
    setLoading(false)
    goTo(6)
  }

  const slotLabel = slot.urgent
    ? 'Urgence — dès que possible'
    : slot.date
      ? `${days.find(d => d.key === slot.date)?.full ?? slot.date}${slot.time ? ` — ${TIME_LABELS[slot.time]}` : ''}`
      : '—'

  const pct = ((step - 1) / 5) * 100

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: '#F7F7F8', fontFamily: "'Inter', system-ui, sans-serif", WebkitFontSmoothing: 'antialiased' }}>

        {/* ── Progress bar ── */}
        <div style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ height: 4, background: '#F0F0F0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${pct}%`, background: '#FF6B35', transition: 'width 0.4s ease', borderRadius: '0 4px 4px 0' }} />
          </div>

          {/* Desktop step dots */}
          <div style={{ display: 'none', padding: '8px 20px 0', gap: 0 }} className="step-dots-desktop" />

          <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#1A1A2E', opacity: 0.65, padding: '6px 0 8px' }}>
            Étape {step} sur 6 — {STEP_LABELS[step - 1]}
          </div>
        </div>

        {/* ── Back button ── */}
        {step > 1 && step < 6 && (
          <button
            onClick={() => goTo(step - 1, 'back')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#999', padding: '14px 20px 0', alignSelf: 'flex-start', fontFamily: 'inherit' }}
          >
            <ArrowLeft size={15} /> Retour
          </button>
        )}

        {/* ── Step content ── */}
        <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: `${direction === 'forward' ? 'slideInRight' : 'slideInLeft'} 0.26s ease-out` }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 20px 32px', maxWidth: 480, width: '100%', margin: '0 auto', overflowY: 'auto' }}>

            {step === 1 && <Step1 trade={trade} onSelect={selectTrade} />}
            {step === 2 && <Step2 trade={trade} problem={problem} otherText={otherText} setOtherText={setOtherText} onSelect={selectProblem} onContinue={() => { setProblem(otherText); setPrice({ min: 89, max: 149, duration: '1h–2h' }); goTo(3) }} />}
            {step === 3 && <Step3 trade={trade} problem={problem || otherText} price={price} onNext={() => goTo(4)} />}
            {step === 4 && <Step4 slot={slot} setSlot={setSlot} days={days} onNext={() => goTo(5)} />}
            {step === 5 && <Step5 contact={contact} setContact={setContact} photo={photo} photoPreview={photoPreview} fileRef={fileRef} onPhoto={handlePhoto} onClearPhoto={() => { setPhoto(null); setPhotoPreview(null) }} trade={trade} problem={problem || otherText} price={price} slotLabel={slotLabel} loading={loading} onSubmit={submitBooking} />}
            {step === 6 && <Step6 trade={trade} problem={problem || otherText} price={price} slotLabel={slotLabel} contact={contact} bookingRef={bookingRef} days={days} />}

          </div>
        </div>
      </div>
    </>
  )
}

/* ─── STEP 1 — Choix du métier ───────────────────────────── */
function Step1({ trade, onSelect }) {
  const items = [
    { id: 'Plomberie',   Icon: Droplets, sub: 'Fuites, WC, chauffe-eau'    },
    { id: 'Électricité', Icon: Zap,      sub: 'Pannes, tableau, installations'},
    { id: 'Serrurerie',  Icon: Lock,     sub: 'Portes bloquées, urgences'   },
    { id: 'Chauffage',   Icon: Flame,    sub: 'Chaudière, radiateur, sol'   },
    { id: 'Autre',       Icon: Hammer,   sub: 'Décrivez votre besoin'       },
  ]
  return (
    <>
      <StepHeader title="Quel type d'artisan cherchez-vous ?" sub="Sélectionnez votre besoin ci-dessous." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {items.map((item, i) => {
          const last = i === items.length - 1
          const odd  = items.length % 2 === 1
          const sel  = trade === item.id
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{
                gridColumn: last && odd ? 'span 2' : 'span 1',
                maxWidth:   last && odd ? '50%'    : '100%',
                justifySelf: last && odd ? 'center' : 'auto',
                width: '100%',
                background: sel ? '#FFF4F0' : '#fff',
                border: `2px solid ${sel ? '#FF6B35' : 'transparent'}`,
                borderRadius: 12,
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                padding: '22px 12px 18px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <div style={{ width: 52, height: 52, background: 'rgba(255,107,53,0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <item.Icon size={28} color="#FF6B35" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A2E', textAlign: 'center' }}>{item.id}</div>
              <div style={{ fontSize: 11, color: '#1A1A2E', opacity: 0.5, textAlign: 'center', lineHeight: 1.4 }}>{item.sub}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ─── STEP 2 — Type de problème ─────────────────────────── */
function Step2({ trade, problem, otherText, setOtherText, onSelect, onContinue }) {
  if (trade === 'Autre') {
    return (
      <>
        <StepHeader title="Décrivez votre besoin" sub="En quelques mots." />
        <textarea
          className="bk-input"
          rows={4}
          placeholder="Ex: Mon robinet de cuisine fuit depuis ce matin..."
          value={otherText}
          onChange={e => setOtherText(e.target.value)}
          style={{ width: '100%', border: '1.5px solid rgba(26,26,46,0.15)', borderRadius: 10, padding: '12px 14px', fontSize: 15, color: '#1A1A2E', background: '#fff', resize: 'none', fontFamily: 'inherit', lineHeight: 1.5, marginBottom: 16 }}
        />
        <OrangeBtn onClick={onContinue} disabled={!otherText.trim()}>Continuer <ChevronRight size={18} /></OrangeBtn>
      </>
    )
  }

  const problems = PROBLEMS[trade] || []
  return (
    <>
      <StepHeader title={`${trade} — Quel est votre problème ?`} sub="Choisissez l'intervention souhaitée." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {problems.map(p => {
          const sel = problem === p.label
          return (
            <div
              key={p.label}
              onClick={() => onSelect(p.label)}
              style={{ background: sel ? '#FFF4F0' : '#fff', border: `2px solid ${sel ? '#FF6B35' : 'transparent'}`, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '14px 10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s' }}
            >
              <div style={{ width: 40, height: 40, background: 'rgba(255,107,53,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p.Icon size={21} color="#FF6B35" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', textAlign: 'center' }}>{p.label}</div>
              <div style={{ fontSize: 10, color: '#1A1A2E', opacity: 0.5, textAlign: 'center', lineHeight: 1.3 }}>{p.sub}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ─── STEP 3 — Prix ─────────────────────────────────────── */
function Step3({ trade, problem, price, onNext }) {
  return (
    <>
      <StepHeader title="Votre prix estimé" sub="Tarif fixe. Ce que vous voyez est ce que vous payez." />
      <div style={{ maxWidth: 360, width: '100%', margin: '0 auto' }}>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 700, color: '#FF6B35', marginBottom: 16 }}>
          <Wrench size={13} /> {trade} — {problem}
        </div>

        {/* Price reveal */}
        <div style={{ border: '2px solid #22C55E', borderRadius: 16, background: '#F0FDF4', padding: '22px 20px', marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#1A1A2E', opacity: 0.55, marginBottom: 4 }}>Entre</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: '#1A1A2E', lineHeight: 1.1, letterSpacing: -1 }}>
            {price.min}€ — {price.max}€
            <span style={{ fontSize: 16, fontWeight: 600, opacity: 0.6, marginLeft: 6 }}>TTC</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, fontSize: 13, fontWeight: 700, color: '#22C55E' }}>
            <Check size={16} /> Prix fixe garanti
          </div>
        </div>

        {/* Duration */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 14, color: '#1A1A2E', fontWeight: 500 }}>
          <Clock size={16} color="#FF6B35" /> Durée estimée : {price.duration}
        </div>

        {/* Includes */}
        <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A2E', opacity: 0.5, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>Ce qui est inclus</div>
        {["Déplacement", "Diagnostic complet", "Main d'œuvre", "Pièces standard incluses"].map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#1A1A2E', fontWeight: 500, marginBottom: 10 }}>
            <div style={{ width: 20, height: 20, background: '#22C55E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={11} color="#fff" />
            </div>
            {item}
          </div>
        ))}

        {/* Warning */}
        <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#92400e', lineHeight: 1.5, marginBottom: 20, marginTop: 8 }}>
          ⚠️ Si des travaux supplémentaires sont nécessaires, un devis est établi sur place avec votre accord.
        </div>

        <OrangeBtn onClick={onNext}>Réserver ce créneau <ChevronRight size={18} /></OrangeBtn>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: '#1A1A2E', opacity: 0.45, marginTop: 6 }}>
          🔒 Paiement uniquement après l&apos;intervention
        </div>
      </div>
    </>
  )
}

/* ─── STEP 4 — Créneau ───────────────────────────────────── */
function Step4({ slot, setSlot, days, onNext }) {
  const canNext = slot.urgent || (slot.date && slot.time)

  return (
    <>
      <StepHeader title="Quand voulez-vous l'intervention ?" sub="Choisissez le moment qui vous convient." />

      {/* Urgence */}
      <div
        onClick={() => setSlot({ date: null, time: null, urgent: true })}
        style={{ background: slot.urgent ? '#FFF4F0' : '#fff', border: `2px solid #FF6B35`, borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: 18, boxShadow: slot.urgent ? '0 4px 20px rgba(255,107,53,0.18)' : '0 2px 10px rgba(0,0,0,0.06)', transition: 'background 0.15s, box-shadow 0.15s' }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#1A1A2E', marginBottom: 2 }}>⚡ Intervention urgente</div>
          <div style={{ fontSize: 13, color: '#1A1A2E', opacity: 0.6 }}>Aujourd&apos;hui — dès que possible</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#FF6B35', marginTop: 4 }}>+30€ frais d&apos;urgence</div>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: '50%', border: `2px solid ${slot.urgent ? '#FF6B35' : 'rgba(26,26,46,0.2)'}`, background: slot.urgent ? '#FF6B35' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {slot.urgent && <Check size={13} color="#fff" />}
        </div>
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,46,0.1)' }} />
        <span style={{ fontSize: 12, color: '#1A1A2E', opacity: 0.4, fontWeight: 600 }}>ou planifier</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,46,0.1)' }} />
      </div>

      {/* Date pills */}
      <div className="bk-date-pills" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none', marginBottom: 16 }}>
        {days.map(d => {
          const sel = slot.date === d.key && !slot.urgent
          return (
            <button
              key={d.key}
              onClick={() => setSlot(s => ({ ...s, date: d.key, urgent: false }))}
              style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 20, background: sel ? '#FF6B35' : '#fff', color: sel ? '#fff' : '#1A1A2E', border: `1.5px solid ${sel ? '#FF6B35' : 'rgba(26,26,46,0.15)'}`, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit' }}
            >
              {d.short}
            </button>
          )
        })}
      </div>

      {/* Time slots */}
      {slot.date && !slot.urgent && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { id: 'matin',      label: 'Matin',      hours: '8h–12h',  avail: 'Disponible', color: '#22C55E' },
            { id: 'apres-midi', label: 'Après-midi', hours: '12h–17h', avail: 'Disponible', color: '#22C55E' },
            { id: 'soir',       label: 'Soir',       hours: '17h–20h', avail: 'Limité',     color: '#f59e0b' },
          ].map(t => {
            const sel = slot.time === t.id
            return (
              <div
                key={t.id}
                onClick={() => setSlot(s => ({ ...s, time: t.id }))}
                style={{ background: sel ? '#FFF4F0' : '#fff', border: `2px solid ${sel ? '#FF6B35' : 'transparent'}`, borderRadius: 12, padding: '14px 8px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.15s' }}
              >
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A2E', marginBottom: 2 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: '#FF6B35', fontWeight: 700, marginBottom: 4 }}>{t.hours}</div>
                <div style={{ fontSize: 10, color: t.color, fontWeight: 600 }}>{t.avail}</div>
              </div>
            )
          })}
        </div>
      )}

      <OrangeBtn onClick={onNext} disabled={!canNext}>
        Confirmer ce créneau <ChevronRight size={18} />
      </OrangeBtn>
    </>
  )
}

/* ─── STEP 5 — Coordonnées ───────────────────────────────── */
function Step5({ contact, setContact, photo, photoPreview, fileRef, onPhoto, onClearPhoto, trade, problem, price, slotLabel, loading, onSubmit }) {
  function set(k, v) { setContact(p => ({ ...p, [k]: v })) }
  const canSubmit = contact.name.trim() && contact.email.trim() && contact.phone.trim() && contact.address.trim() && !loading

  return (
    <>
      <StepHeader title="Où et qui ?" sub="Ces informations restent confidentielles." />

      <FormField label="Prénom *">
        <BkInput placeholder="Votre prénom" value={contact.name} onChange={e => set('name', e.target.value)} />
      </FormField>
      <FormField label="Email *">
        <BkInput type="email" placeholder="votre@email.com" value={contact.email} onChange={e => set('email', e.target.value)} />
      </FormField>
      <FormField label="Téléphone *" hint="L'artisan vous contacte sur ce numéro">
        <BkInput type="tel" placeholder="+32 XXX XX XX XX" value={contact.phone} onChange={e => set('phone', e.target.value)} />
      </FormField>
      <FormField label="Adresse complète *">
        <BkInput placeholder="Rue, numéro, ville, code postal" value={contact.address} onChange={e => set('address', e.target.value)} />
      </FormField>
      <FormField label={<>Étage / Appartement <Opt /></>}>
        <BkInput placeholder="Ex: 2ème étage, sonnette Dupont" value={contact.floor} onChange={e => set('floor', e.target.value)} />
      </FormField>

      {/* Photo upload */}
      <FormField label={<>Photo du problème <Opt /></>}>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onPhoto} />
        {photoPreview ? (
          <div style={{ position: 'relative' }}>
            <img src={photoPreview} alt="aperçu" style={{ width: '100%', borderRadius: 10, maxHeight: 160, objectFit: 'cover' }} />
            <button onClick={onClearPhoto} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>
              ✕ Supprimer
            </button>
          </div>
        ) : (
          <div
            className="bk-upload-zone"
            onClick={() => fileRef.current?.click()}
            style={{ border: '2px dashed rgba(26,26,46,0.18)', borderRadius: 10, padding: '20px', textAlign: 'center', cursor: 'pointer', background: '#fff', transition: 'border-color 0.15s, background 0.15s' }}
          >
            <Camera size={24} color="#FF6B35" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: 13, color: '#1A1A2E', opacity: 0.6 }}>Ajoutez une photo pour aider l&apos;artisan</div>
            <div style={{ fontSize: 11, color: '#1A1A2E', opacity: 0.35, marginTop: 4 }}>JPG, PNG — max 5 Mo</div>
          </div>
        )}
      </FormField>

      <FormField label={<>Description complémentaire <Opt /></>}>
        <textarea
          className="bk-input"
          rows={3}
          placeholder="Précisez si nécessaire (depuis quand, symptômes, tentatives de réparation...)"
          value={contact.description}
          onChange={e => set('description', e.target.value)}
          style={{ width: '100%', border: '1.5px solid rgba(26,26,46,0.15)', borderRadius: 10, padding: '12px 14px', fontSize: 15, color: '#1A1A2E', background: '#fff', resize: 'none', fontFamily: 'inherit', lineHeight: 1.5 }}
        />
      </FormField>

      {/* Summary */}
      <SummaryCard trade={trade} problem={problem} slotLabel={slotLabel} price={price} />

      <OrangeBtn onClick={onSubmit} disabled={!canSubmit}>
        {loading ? 'Envoi en cours...' : 'Confirmer ma demande →'}
      </OrangeBtn>
      <p style={{ fontSize: 11, color: '#1A1A2E', opacity: 0.4, textAlign: 'center', lineHeight: 1.6, marginTop: 6 }}>
        🔒 Vos données ne sont jamais revendues.<br />Utilisées uniquement pour votre intervention.
      </p>
    </>
  )
}

/* ─── STEP 6 — Confirmation ─────────────────────────────── */
function Step6({ trade, problem, price, slotLabel, contact, bookingRef }) {
  const waMsg = encodeURIComponent(`Bonjour, ma référence de réservation Dépannage.be est #${bookingRef}`)
  const waUrl = `https://wa.me/3200000000?text=${waMsg}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 0 40px', maxWidth: 380, width: '100%', margin: '0 auto' }}>

      {/* Animated checkmark */}
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 20 }}>
        <circle cx="40" cy="40" r="34" fill="none" stroke="#22C55E" strokeWidth="4"
          strokeDasharray="220" strokeDashoffset="220"
          style={{ animation: 'drawCircle 0.65s ease-out forwards' }} />
        <polyline points="24,40 35,52 56,28" fill="none" stroke="#22C55E" strokeWidth="4.5"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="60" strokeDashoffset="60"
          style={{ animation: 'drawCheck 0.4s ease-out 0.55s forwards' }} />
      </svg>

      <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A2E', marginBottom: 8, animation: 'fadeUp 0.5s ease-out 0.3s both' }}>
        Demande envoyée&nbsp;! 🎉
      </h1>
      <p style={{ fontSize: 16, color: '#1A1A2E', opacity: 0.55, marginBottom: 24, animation: 'fadeUp 0.5s ease-out 0.4s both' }}>
        Nous confirmons votre créneau sous 15 minutes.
      </p>

      {/* Summary */}
      <div style={{ background: '#fff', border: '1.5px solid rgba(26,26,46,0.08)', borderRadius: 14, padding: '16px 18px', width: '100%', textAlign: 'left', marginBottom: 20, animation: 'fadeUp 0.5s ease-out 0.5s both' }}>
        {[`${trade} — ${problem}`, slotLabel, `${price.min}€ – ${price.max}€ TTC`, contact.address].map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#1A1A2E', fontWeight: 500, marginBottom: 8, alignItems: 'flex-start' }}>
            <Check size={15} color="#22C55E" style={{ flexShrink: 0, marginTop: 1 }} /> {line}
          </div>
        ))}
        <div style={{ marginTop: 8, background: '#F5F5F5', borderRadius: 7, padding: '5px 12px', fontSize: 13, fontWeight: 700, color: '#1A1A2E', opacity: 0.55, display: 'inline-block' }}>
          Référence : #{bookingRef}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '15px 24px', background: '#22C55E', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(34,197,94,0.28)', marginBottom: 10, textDecoration: 'none', animation: 'fadeUp 0.5s ease-out 0.6s both' }}
        className="bk-btn-green"
      >
        📱 Recevoir la confirmation sur WhatsApp
      </a>

      <Link
        href="/"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '13px 24px', background: 'transparent', color: '#1A1A2E', border: '2px solid #1A1A2E', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', marginBottom: 24, animation: 'fadeUp 0.5s ease-out 0.65s both' }}
      >
        Retour à l&apos;accueil
      </Link>

      {/* Next steps */}
      <div style={{ width: '100%', animation: 'fadeUp 0.5s ease-out 0.7s both' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1A2E', opacity: 0.35, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14, textAlign: 'center' }}>Ce qui se passe maintenant</div>
        {[
          { e: '📞', t: 'Appel de confirmation sous 15 min' },
          { e: '🔧', t: 'Artisan en route au créneau choisi' },
          { e: '💳', t: "Paiement après l'intervention" },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < 2 ? '1px solid rgba(26,26,46,0.06)' : 'none' }}>
            <div style={{ fontSize: 22 }}>{s.e}</div>
            <div style={{ fontSize: 13, color: '#1A1A2E', fontWeight: 500 }}>{s.t}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── SHARED UI COMPONENTS ───────────────────────────────── */
function StepHeader({ title, sub }) {
  return (
    <div style={{ padding: '24px 0 18px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E', lineHeight: 1.2, marginBottom: 6 }}>{title}</h1>
      {sub && <p style={{ fontSize: 15, color: '#1A1A2E', opacity: 0.5 }}>{sub}</p>}
    </div>
  )
}

function OrangeBtn({ children, onClick, disabled }) {
  return (
    <button
      className="bk-btn-orange"
      onClick={onClick}
      disabled={disabled}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '15px 24px', background: '#FF6B35', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: disabled ? 'default' : 'pointer', boxShadow: '0 4px 16px rgba(255,107,53,0.28)', opacity: disabled ? 0.45 : 1, marginBottom: 10, fontFamily: 'inherit', transition: 'opacity 0.15s' }}
    >
      {children}
    </button>
  )
}

function BkInput({ type = 'text', placeholder, value, onChange }) {
  return (
    <input
      className="bk-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ width: '100%', height: 48, border: '1.5px solid rgba(26,26,46,0.15)', borderRadius: 10, padding: '0 14px', fontSize: 15, color: '#1A1A2E', background: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
    />
  )
}

function FormField({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, color: '#1A1A2E', opacity: 0.4, marginTop: 4 }}>{hint}</div>}
    </div>
  )
}

function Opt() {
  return <span style={{ opacity: 0.4, fontWeight: 400 }}>(optionnel)</span>
}

function SummaryCard({ trade, problem, slotLabel, price }) {
  return (
    <div style={{ background: '#fff', border: '1.5px solid rgba(26,26,46,0.08)', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6B35', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>📋 Récapitulatif</div>
      <div style={{ fontSize: 13, color: '#1A1A2E', fontWeight: 600, lineHeight: 1.7 }}>
        {trade} — {problem}<br />
        {slotLabel}<br />
        <span style={{ color: '#22C55E', fontWeight: 700 }}>Prix estimé : {price.min}€ – {price.max}€ TTC ✓</span>
      </div>
    </div>
  )
}
