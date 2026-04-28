'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const TRADES = ['Plombier', 'Électricien', 'Serrurier', 'Chauffagiste', 'Menuisier']

const REVIEWS = [
  { name: 'Marc D.',     text: 'Plombier arrivé en 1h30. Problème réglé, prix respecté.' },
  { name: 'Isabelle V.', text: 'Enfin un service transparent ! Je recommande à 100%.' },
  { name: 'Kevin L.',    text: 'Électricien pro, rapide et le prix annoncé était exact.' },
  { name: 'Nathalie B.', text: 'Fuite réparée le soir même. Merci Dépannage.be !' },
  { name: 'Thomas R.',   text: 'Service impeccable, aucune mauvaise surprise sur la facture.' },
  { name: 'Amina K.',    text: 'Réactif, sérieux, honnête. Que demander de plus ?' },
  { name: 'Pierre G.',   text: 'Tableau électrique remis aux normes en 2h. Top !' },
  { name: 'Laura M.',    text: 'Prix annoncé, prix payé. Enfin un artisan de confiance.' },
]

const FAQS = [
  {
    q: 'Comment le prix est-il calculé ?',
    a: 'Notre tarif est basé sur le type d\'intervention et la durée estimée. Il vous est communiqué avant toute confirmation — vous n\'avez aucune mauvaise surprise à l\'arrivée de l\'artisan.',
  },
  {
    q: 'Que se passe-t-il si le problème est plus complexe ?',
    a: 'L\'artisan vous prévient sur place avant d\'aller plus loin. Vous restez décisionnaire à chaque étape. Pas de travaux supplémentaires sans votre accord explicite.',
  },
  {
    q: 'Quelles zones couvrez-vous ?',
    a: 'Dépannage.be couvre l\'ensemble du territoire belge. Que vous soyez à Bruxelles, Liège, Namur, Gand, Anvers ou dans n\'importe quelle commune — nous avons un artisan partenaire près de chez vous.',
  },
  {
    q: 'Puis-je annuler ma réservation ?',
    a: 'Oui, gratuitement jusqu\'à 2h avant l\'intervention. Au-delà, des frais d\'annulation peuvent s\'appliquer pour couvrir le déplacement de l\'artisan.',
  },
]

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

/* ── Google logo ── */
function GLogo() {
  return (
    <div className="review-g-logo">
      <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
    </div>
  )
}

/* ── Review card ── */
function ReviewCard({ name, text }) {
  return (
    <div className="review-card">
      <div className="review-card-top">
        <GLogo />
        <div className="review-stars">★★★★★</div>
      </div>
      <div className="review-name">{name}</div>
      <div className="review-text">{text}</div>
    </div>
  )
}

export default function HomePage() {
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
          <h1 className="hero-headline">
            <span className="hero-headline-static">Votre</span>
            <span className="hero-trade-wrap" aria-live="polite">
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
          </h1>
          <p className="hero-sub">
            Prix fixe annoncé avant l&apos;intervention.<br />Sans surprise.
          </p>
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

      {/* ── PROOF BAR ── */}
      <section id="proof-bar">
        <p className="proof-bar-label">⭐ Avis Google vérifiés — 4.9/5 sur 140+ avis</p>
        <div className="reviews-track-wrap">
          <div className="reviews-track">
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <ReviewCard key={i} name={r.name} text={r.text} />
            ))}
          </div>
        </div>
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
              <div className="step-title">Décris ton problème</div>
              <div className="step-body">Sélectionne ton type d&apos;intervention en 30 secondes.</div>
            </div>
            <div className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon"><div className="step-icon-euro">€</div></div>
              <div className="step-label">Étape 02</div>
              <div className="step-title">Ton prix s&apos;affiche</div>
              <div className="step-body">Prix fixe garanti. Tu sais exactement ce que tu paieras.</div>
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

      {/* ── BEFORE/AFTER ── */}
      <section id="before-after" className="section">
        <div className="container">
          <h2 className="section-title">Des résultats concrets</h2>
          <p className="section-sub">Photos prises par nos artisans lors des interventions</p>
          <div className="ba-grid">
            {[
              { cls: ['ba-before-plumb','ba-after-plumb'], trade:'Plomberie', desc:'Fuite sous évier réparée — Liège', price:'109€ TTC' },
              { cls: ['ba-before-elec','ba-after-elec'],   trade:'Électricité', desc:'Tableau remis aux normes — Namur', price:'149€ TTC' },
              { cls: ['ba-before-drain','ba-after-drain'], trade:'Plomberie', desc:'Débouchage canalisations — Bruxelles', price:'69€ TTC' },
              { cls: ['ba-before-hw','ba-after-hw'],       trade:'Plomberie', desc:'Chauffe-eau remplacé — Liège', price:'179€ TTC' },
            ].map((card, i) => (
              <div key={i} className="ba-card">
                <div className="ba-images">
                  <div className="ba-before">
                    <div className={`ba-before-bg ${card.cls[0]}`} />
                    <span className="ba-label ba-label-before">Avant</span>
                  </div>
                  <div className="ba-after">
                    <div className={`ba-after-bg ${card.cls[1]}`} />
                    <span className="ba-label ba-label-after">Après</span>
                  </div>
                  <div className="ba-divider" />
                </div>
                <div className="ba-info">
                  <div className="ba-trade">{card.trade}</div>
                  <div className="ba-desc">{card.desc}</div>
                  <div className="ba-price"><CheckGreenSVG /> {card.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section">
        <div className="container">
          <h2 className="section-title">Nos interventions</h2>
          <p className="section-sub">Tarifs fixes, annoncés à l&apos;avance.</p>
          <div className="services-grid">
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>, name:"Fuite d'eau", price:"Dès 89€" },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>, name:"Débouchage", price:"Dès 69€" },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>, name:"Chauffe-eau", price:"Dès 129€" },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, name:"Panne électrique", price:"Dès 79€" },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><rect x="5" y="9" width="14" height="6" rx="1"/></svg>, name:"Tableau électrique", price:"Dès 119€" },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, name:"Serrurerie", price:"Dès 89€" },
            ].map((s, i) => (
              <Link key={i} href="/booking" className="service-card">
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-price"><CheckGreenSVG /> {s.price}</div>
                <div className="service-link">Voir le détail <ArrowRightSVG size={14} /></div>
              </Link>
            ))}
          </div>
          <Link href="/booking" className="btn btn-primary" style={{ maxWidth: 400, margin: '0 auto', display: 'flex' }}>
            Tous nos tarifs sont fixes <ArrowRightSVG />
          </Link>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section id="trust" className="section">
        <div className="container">
          <div className="trust-blocks">
            {[
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:'Artisans certifiés', body:'Chaque artisan est vérifié, assuré et évalué par nos clients.' },
              { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, title:'Prix garanti', body:'Le prix affiché est le prix payé. Zéro surprise, zéro négociation.' },
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
          Nous couvrons toute la Belgique — de Bruxelles à Liège, Namur, Gand, Anvers et au-delà.
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
            <a href="#">Mentions légales</a>
            <a href="#">CGU</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-copy">© 2025 Dépannage.be — Tous droits réservés</div>
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
