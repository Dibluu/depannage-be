import { SERRURIER_BXL } from './serrurier-bxl'
import { SERRURIER_BW } from './serrurier-bw'

// Trade-specific local copy per commune: { [tradeId]: { [communeId]: { fr: [..], nl: [..], police? } } }
export const LOCAL = {
  serrurier: { ...SERRURIER_BXL, ...SERRURIER_BW },
}
