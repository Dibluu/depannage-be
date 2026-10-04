import { BRAND, PHONE, PHONE_HREF, EMAIL, LEGAL } from '../../lib/site'
import { absolute, legalUrl, homeUrl } from '../../lib/seo/routes'
import { organization, breadcrumb, jsonLd } from '../../lib/seo/schema'
import { JsonLd, SiteHeader, SiteFooter, Breadcrumbs, Container } from './ui'

// Legal notice (Code de droit économique art. XII.6) and privacy policy (GDPR art. 13) on one page.
// The site sets no tracking or advertising cookies; update the cookie section if that changes.
const COPY = {
  fr: {
    title: 'Mentions légales et vie privée | Dépannage.be',
    description: `Éditeur du site Dépannage.be (${LEGAL.owner}, BCE ${LEGAL.bce}), hébergement, données personnelles et cookies.`,
    h1: 'Mentions légales et vie privée',
    home: 'Accueil',
    crumb: 'Mentions légales',
    updated: 'Dernière mise à jour : 4 octobre 2026',
    sections: [
      ['Éditeur du site', [
        `${BRAND} est un nom commercial de ${LEGAL.owner}, entreprise en personne physique.`,
        `Numéro d’entreprise (BCE) : ${LEGAL.bce} — TVA : ${LEGAL.vat}`,
        `Adresse : ${LEGAL.street}, ${LEGAL.postcode} ${LEGAL.city.fr}, Belgique`,
      ]],
      ['Hébergement', [
        'Site hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis (vercel.com).',
      ]],
      ['Les interventions', [
        `${BRAND} met en relation ses clients avec des artisans indépendants partenaires. Chaque intervention est réalisée par l’artisan, sous sa propre entreprise, aux prix annoncés sur le site pour la prestation choisie.`,
      ]],
      ['Propriété intellectuelle', [
        `Les textes, la grille de prix et la présentation du site appartiennent à ${LEGAL.owner}. Toute reproduction sans autorisation écrite est interdite.`,
      ]],
    ],
    privacyTitle: 'Protection des données personnelles',
    privacy: [
      ['Responsable du traitement', [`${LEGAL.owner} (${BRAND}), ${LEGAL.street}, ${LEGAL.postcode} ${LEGAL.city.fr}. Contact ci-dessous.`]],
      ['Données collectées', ['Lors d’une réservation : nom, téléphone, adresse d’intervention, étage, e-mail (facultatif), description du problème et photo (facultative), prestation, créneau et prix annoncé.']],
      ['Pourquoi', ['Uniquement pour organiser et suivre votre intervention : vous rappeler, transmettre la demande à l’artisan qui intervient et traiter une éventuelle réclamation. Base légale : l’exécution de votre demande (art. 6.1.b du RGPD). Vos données ne sont jamais revendues ni utilisées pour de la publicité.']],
      ['Qui les reçoit', ['L’artisan partenaire chargé de votre intervention, et nos prestataires techniques : Vercel (hébergement), Supabase (base de données) et Resend (envoi des e-mails). Le récapitulatif de votre demande vous est envoyé par WhatsApp (Meta). Certains sont établis aux États-Unis ; ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne ou le Data Privacy Framework.']],
      ['Durée de conservation', ['3 ans après votre dernière demande, sauf obligation légale de conservation plus longue (par exemple comptable).']],
      ['Vos droits', ['Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, leur portabilité, ou vous opposer à leur traitement, en nous contactant. Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une plainte auprès de l’Autorité de protection des données (rue de la Presse 35, 1000 Bruxelles, autoriteprotectiondonnees.be).']],
      ['Cookies', ['Le site n’utilise aucun cookie publicitaire ni de mesure d’audience. Seul l’espace d’administration dépose un cookie technique, indispensable à la connexion.']],
    ],
    contactTitle: 'Contact',
    phone: 'Téléphone',
    email: 'E-mail',
    post: 'Courrier',
  },
  nl: {
    title: 'Wettelijke vermeldingen en privacy | Dépannage.be',
    description: `Uitgever van Dépannage.be (${LEGAL.owner}, KBO ${LEGAL.bce}), hosting, persoonsgegevens en cookies.`,
    h1: 'Wettelijke vermeldingen en privacy',
    home: 'Home',
    crumb: 'Wettelijke vermeldingen',
    updated: 'Laatst bijgewerkt: 4 oktober 2026',
    sections: [
      ['Uitgever van de website', [
        `${BRAND} is een handelsnaam van ${LEGAL.owner}, eenmanszaak.`,
        `Ondernemingsnummer (KBO): ${LEGAL.bce} — btw: ${LEGAL.vat}`,
        `Adres: ${LEGAL.street}, ${LEGAL.postcode} ${LEGAL.city.nl}, België`,
      ]],
      ['Hosting', [
        'Website gehost door Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, Verenigde Staten (vercel.com).',
      ]],
      ['De interventies', [
        `${BRAND} brengt klanten in contact met zelfstandige partnervakmensen. Elke interventie wordt uitgevoerd door de vakman, onder zijn eigen onderneming, aan de prijzen die op de website voor de gekozen prestatie worden vermeld.`,
      ]],
      ['Intellectuele eigendom', [
        `De teksten, de prijslijst en de vormgeving van de website behoren toe aan ${LEGAL.owner}. Elke overname zonder schriftelijke toestemming is verboden.`,
      ]],
    ],
    privacyTitle: 'Bescherming van persoonsgegevens',
    privacy: [
      ['Verwerkingsverantwoordelijke', [`${LEGAL.owner} (${BRAND}), ${LEGAL.street}, ${LEGAL.postcode} ${LEGAL.city.nl}. Contactgegevens hieronder.`]],
      ['Welke gegevens', ['Bij een reservering: naam, telefoon, adres van de interventie, verdieping, e-mail (optioneel), beschrijving van het probleem en foto (optioneel), prestatie, tijdslot en aangekondigde prijs.']],
      ['Waarom', ['Uitsluitend om uw interventie te organiseren en op te volgen: u terugbellen, de aanvraag doorgeven aan de vakman die komt en een eventuele klacht behandelen. Rechtsgrond: de uitvoering van uw aanvraag (art. 6.1.b AVG). Uw gegevens worden nooit doorverkocht of voor reclame gebruikt.']],
      ['Wie ontvangt ze', ['De partnervakman die uw interventie uitvoert, en onze technische dienstverleners: Vercel (hosting), Supabase (database) en Resend (verzending van e-mails). Het overzicht van uw aanvraag wordt u via WhatsApp (Meta) bezorgd. Sommigen zijn gevestigd in de Verenigde Staten; die doorgiften vallen onder de standaardcontractbepalingen van de Europese Commissie of het Data Privacy Framework.']],
      ['Bewaartermijn', ['3 jaar na uw laatste aanvraag, tenzij een wettelijke verplichting een langere bewaring oplegt (bijvoorbeeld boekhoudkundig).']],
      ['Uw rechten', ['U kunt inzage, verbetering, wissing of overdracht van uw gegevens vragen, of bezwaar maken tegen de verwerking, door contact met ons op te nemen. Meent u dat uw rechten niet worden gerespecteerd, dan kunt u klacht indienen bij de Gegevensbeschermingsautoriteit (Drukpersstraat 35, 1000 Brussel, gegevensbeschermingsautoriteit.be).']],
      ['Cookies', ['De website gebruikt geen reclame- of analysecookies. Alleen de beheeromgeving plaatst een technische cookie die nodig is om in te loggen.']],
    ],
    contactTitle: 'Contact',
    phone: 'Telefoon',
    email: 'E-mail',
    post: 'Post',
  },
}

export function legalMetadata(lang) {
  const c = COPY[lang]
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: absolute(legalUrl(lang)), languages: { 'fr-BE': absolute(legalUrl('fr')), 'nl-BE': absolute(legalUrl('nl')) } },
  }
}

function Block({ title, paragraphs }) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-navy">{title}</h3>
      {paragraphs.map(p => <p key={p} className="text-sm leading-relaxed text-navy/75">{p}</p>)}
    </div>
  )
}

export default function LegalPage({ lang }) {
  const c = COPY[lang]
  const crumbs = [{ name: c.home, path: homeUrl(lang) }, { name: c.crumb, path: legalUrl(lang) }]
  return (
    <>
      <JsonLd data={jsonLd(organization(), breadcrumb(crumbs))} />
      <SiteHeader lang={lang} altHref={legalUrl(lang === 'nl' ? 'fr' : 'nl')} />
      <main>
        <Container className="max-w-3xl pb-12">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-3xl font-black text-navy">{c.h1}</h1>
          <p className="mt-1 text-xs text-navy/50">{c.updated}</p>
          <div className="mt-8 space-y-6">
            {c.sections.map(([title, paragraphs]) => <Block key={title} title={title} paragraphs={paragraphs} />)}
          </div>
          <h2 id={lang === 'nl' ? 'privacy' : 'confidentialite'} className="mt-12 scroll-mt-20 text-2xl font-extrabold text-navy">{c.privacyTitle}</h2>
          <div className="mt-6 space-y-6">
            {c.privacy.map(([title, paragraphs]) => <Block key={title} title={title} paragraphs={paragraphs} />)}
          </div>
          <h2 id="contact" className="mt-12 scroll-mt-20 text-2xl font-extrabold text-navy">{c.contactTitle}</h2>
          <ul className="mt-4 list-none space-y-1 text-sm text-navy/75">
            {PHONE && <li>{c.phone} : <a href={PHONE_HREF} className="font-semibold text-orange">{PHONE}</a></li>}
            {EMAIL && <li>{c.email} : <a href={`mailto:${EMAIL}`} className="font-semibold text-orange">{EMAIL}</a></li>}
            <li>{c.post} : {LEGAL.owner}, {LEGAL.street}, {LEGAL.postcode} {LEGAL.city[lang]}</li>
          </ul>
        </Container>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
