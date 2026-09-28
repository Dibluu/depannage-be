// Public business details. Set NEXT_PUBLIC_PHONE (e.g. "+32 2 000 00 00") to show call buttons
// everywhere; leave it empty and the pages only offer online booking.
export const BRAND = 'Dépannage.be'
export const PHONE = process.env.NEXT_PUBLIC_PHONE || ''
export const PHONE_HREF = PHONE ? `tel:${PHONE.replace(/[^\d+]/g, '')}` : ''
export const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP || '').replace(/[^\d]/g, '')
