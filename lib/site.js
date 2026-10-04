// Public business details. Set NEXT_PUBLIC_PHONE (e.g. "+32 2 000 00 00") to show call buttons
// everywhere; leave it empty and the pages only offer online booking.
export const BRAND = 'Dépannage.be'
export const PHONE = process.env.NEXT_PUBLIC_PHONE || ''
export const PHONE_HREF = PHONE ? `tel:${PHONE.replace(/[^\d+]/g, '')}` : ''
export const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP || '').replace(/[^\d]/g, '')

// Legal identity (Code de droit économique art. XII.6), shown on the legal page, in the footer
// and in the Organization schema. Keep it identical to the business directory listings.
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL || ''
export const LEGAL = {
  owner: 'Mehdi Haik',
  vat: 'BE0737736369',
  bce: '0737.736.369',
  street: 'Avenue de la Liberté 208',
  postcode: '1081',
  city: { fr: 'Koekelberg', nl: 'Koekelberg' },
}
