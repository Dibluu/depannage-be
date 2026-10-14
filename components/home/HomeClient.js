'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { FAQS } from './faqs'
import { PHONE, PHONE_HREF, LEGAL } from '../../lib/site'

const TRADES = ['Serrurier', 'Plombier', 'Électricien', 'Chauffagiste']



/* ── Inline SVG helpers ── */
function CheckSVG() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function ArrowRightSVG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  )
}
function CheckGreenSVG({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function ChevronDownSVG() {
  return (
    <svg className="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function HomeClient({ tradesSection, zonesSection }) {
  const [activeWord, setActiveWord] = useState(0)
  const [exitWord, setExitWord]   = useState(-1)
  const [openFaq, setOpenFaq]     = useState(-1)
  const [stickyVisible, setStickyVisible] = useState(false)
  const heroRef = useRef(null)

  /* Trade word rotation */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveWord(prev => {
        const next = (prev + 1) % TRADES.length
        setExitWord(prev)
        setTimeout(() => setExitWord(-1), 450)
        return next
      })
    }, 2500)
    return () => clearInterval(id)
  }, [])

  /* Sticky CTA observer */
  useEffect(() => {
    if (!heroRef.current) return
    const obs = new IntersectionObserver(
      ([e]) => setStickyVisible(!e.isIntersecting),
      { threshold: 0.1 },
    )
    obs.observe(heroRef.current)
    return () => obs.disconnect()
  }, [])

  function toggleFaq(i) {
    setOpenFaq(prev => (prev === i ? -1 : i))
  }

  return (
    <>
      {/* ── HERO ── */}
      <section id="hero" ref={heroRef}>
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />

        <nav className="hero-nav container">
          <div className="logo">
            <span className="logo-depannage">Dépannage</span><span className="logo-be">.be</span>
          </div>
          <a href="#how-it-works" className="hero-nav-link">Comment ça marche</a>
        </nav>

        <div className="hero-body container">
          <div className="hero-headline" aria-hidden="true">
            <span className="hero-headline-static">Votre</span>
            <span className="hero-trade-wrap">
              {TRADES.map((t, i) => (
                <span
                  key={t}
                  className={`hero-trade-word${i === activeWord ? ' active' : ''}${i === exitWord ? ' exiting' : ''}`}
                >
                  {t}
                </span>
              ))}
            </span>
            <span className="hero-headline-static">chez vous aujourd&apos;hui.</span>
          </div>
          <h1 className="hero-sub">
            Serrurier, plombier, électricien et chauffagiste à Bruxelles et dans le Brabant. Prix annoncé avant l&apos;intervention, sans surprise.
          </h1>
          <div className="hero-cta-wrap">
            <Link href="/booking" className="btn btn-primary">
              Obtenir mon prix gratuit <ArrowRightSVG />
            </Link>
          </div>
          <div className="hero-trust">
            {['Prix confirmé en 15 min', 'Artisan disponible aujourd\'hui', 'Aucun frais cachés'].map(label => (
              <div key={label} className="trust-item">
                <div className="check"><CheckSVG /></div>
                {label}
              </div>
            ))}
          </div>
        </div>

        <svg className="hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section id="proof-bar">
        <p className="proof-bar-label">Nos engagements, écrits noir sur blanc</p>
        <ul className="commitments">
          {[
            'Fourchette de prix annoncée avant le déplacement',
            'Majoration nuit et week-end affichée, jamais cumulée',
            'Paiement après l’intervention, facture détaillée',
            'Vous pouvez refuser un devis sur place',
          ].map(c => (
            <li key={c}><CheckGreenSVG /> {c}</li>
          ))}
        </ul>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="section-title">Simple comme bonjour</h2>
          <p className="section-sub">3 étapes, pas une de plus.</p>
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">01</span>
              <div className="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
              <div className="step-label">Étape 01</div>
              <div className="step-title">Décrivez votre problème</div>
              <div className="step-body">Choisissez votre intervention en 30 secondes.</div>
            </div>
            <div className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon"><div className="step-icon-euro">€</div></div>
              <div className="step-label">Étape 02</div>
              <div className="step-title">Votre prix s&apos;affiche</div>
              <div className="step-body">La fourchette de prix est annoncée avant le déplacement. Vous savez ce que vous paierez.</div>
            </div>
            <div className="step-card">
              <span className="step-number">03</span>
              <div className="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" /><polyline points="9 16 11 18 15 14" />
                </svg>
              </div>
              <div className="step-label">Étape 03</div>
              <div className="step-title">L&apos;artisan arrive</div>
              <div className="step-body">Même jour ou lendemain selon disponibilité.</div>
            </div>
          </div>
        </div>
      </section>

      {tradesSection}

      {/* ── TRUST ── */}
      <section id="trust" className="section">
        <div className="container">
          <div className="trust-blocks">
            {[
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:'Artisans vérifiés', body:'Chaque artisan est indépendant, inscrit à la BCE et assuré en responsabilité civile.' },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, title:'Prix annoncé', body:'La fourchette annoncée est respectée. Un travail en plus ? Devis sur place, que vous pouvez refuser.' },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title:'Intervention rapide', body:'Disponible le jour même en urgence. Parce que ça ne peut pas attendre.' },
            ].map((b, i) => (
              <div key={i} className="trust-block">
                <div className="trust-icon-wrap">{b.icon}</div>
                <div>
                  <div className="trust-block-title">{b.title}</div>
                  <div className="trust-block-body">{b.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {zonesSection}

      {/* ── FAQ ── */}
      <section id="faq" className="section">
        <div className="container">
          <h2 className="section-title">Questions fréquentes</h2>
          <p className="section-sub" style={{ marginBottom: 32 }}>Tout ce que vous devez savoir.</p>
          <div className="faq-list" style={{ maxWidth: 680, margin: '0 auto' }}>
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  {faq.q}
                  <ChevronDownSVG />
                </button>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="final-cta">
        <div className="final-cta-headline">Votre artisan vous attend.</div>
        <div className="final-cta-sub">
          Bruxelles, Brabant wallon et Brabant flamand — un artisan partenaire près de chez vous.
        </div>
        <div className="final-cta-wrap">
          <Link href="/booking" className="btn btn-white">
            Je réserve maintenant <ArrowRightSVG />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-logo logo">
            <span className="logo-depannage" style={{ color: '#fff' }}>Dépannage</span>
            <span className="logo-be">.be</span>
          </div>
          <div className="footer-links">
            <Link href="/prix">Nos prix</Link>
            <Link href="/partenaires">Nos partenaires</Link>
            <Link href="/nl">Nederlands</Link>
            <Link href="/mentions-legales">Mentions légales et vie privée</Link>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Dépannage.be · {LEGAL.owner} · BCE {LEGAL.bce}<br />
            {LEGAL.street}, {LEGAL.postcode} {LEGAL.city.fr}{PHONE && <> · <a href={PHONE_HREF}>{PHONE}</a></>}
          </div>
        </div>
      </footer>

      {/* ── STICKY CTA ── */}
      <div id="sticky-cta" className={stickyVisible ? 'visible' : ''}>
        <Link href="/booking" className="btn btn-primary">
          Obtenir mon prix <ArrowRightSVG />
        </Link>
      </div>
    </>
  )
}
