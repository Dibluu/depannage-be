import { SERRURIER_BXL } from './serrurier-bxl'
import { SERRURIER_BW } from './serrurier-bw'
import { PLOMBIER_BXL } from './plombier-bxl'
import { PLOMBIER_BW } from './plombier-bw'
import { ELECTRICIEN_BXL } from './electricien-bxl'
import { ELECTRICIEN_BW } from './electricien-bw'
import { CHAUFFAGISTE_BXL } from './chauffagiste-bxl'
import { CHAUFFAGISTE_BW } from './chauffagiste-bw'

// Trade-specific local copy per commune: { [tradeId]: { [communeId]: { fr: [..], nl: [..], police? } } }
export const LOCAL = {
  serrurier: { ...SERRURIER_BXL, ...SERRURIER_BW },
  plombier: { ...PLOMBIER_BXL, ...PLOMBIER_BW },
  electricien: { ...ELECTRICIEN_BXL, ...ELECTRICIEN_BW },
  chauffagiste: { ...CHAUFFAGISTE_BXL, ...CHAUFFAGISTE_BW },
}
