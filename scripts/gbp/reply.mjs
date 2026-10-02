// Posts (or replaces) the public owner reply to one review. Only run after the reply
// text has been approved — it's published on Google Maps under the business name.
//   node scripts/gbp/reply.mjs accounts/1/locations/2/reviews/3 "Merci pour votre avis…"
import { api, parseArgs } from './lib.mjs'

const [name, comment] = parseArgs()._
if (!/^accounts\/[^/]+\/locations\/[^/]+\/reviews\/[^/]+$/.test(name || '') || !comment) {
  console.error('Usage: node scripts/gbp/reply.mjs <review id from reviews.mjs> "<reply text>"')
  process.exit(1)
}

const res = await api(`https://mybusiness.googleapis.com/v4/${name}/reply`, { method: 'PUT', body: { comment } })
console.log(`Reply published (${res.updateTime}).`)
