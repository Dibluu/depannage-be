// Lists reviews of every managed listing.
//   node scripts/gbp/reviews.mjs                      all listings, all reviews
//   node scripts/gbp/reviews.mjs --unanswered         only reviews without a reply
//   node scripts/gbp/reviews.mjs --since=2026-09-01 --location=kiverrou
//   node scripts/gbp/reviews.mjs --json               raw output for analysis
import { api, locations, parseArgs, filterLocations } from './lib.mjs'

const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }
const args = parseArgs()
const since = args.since ? new Date(args.since) : null

const results = []
for (const loc of filterLocations(await locations(), args.location)) {
  // Reviews are still served by the v4 API only.
  const base = `https://mybusiness.googleapis.com/v4/${loc.account}/${loc.location}/reviews?pageSize=50&orderBy=updateTime desc`
  const reviews = []
  let summary = {}
  let pageToken
  do {
    const data = await api(pageToken ? `${base}&pageToken=${encodeURIComponent(pageToken)}` : base)
    summary = { averageRating: data.averageRating, totalReviewCount: data.totalReviewCount }
    reviews.push(...(data.reviews || []))
    pageToken = data.nextPageToken
    // Sorted newest first: stop paging once we're past --since.
    if (since && reviews.length && new Date(reviews.at(-1).updateTime) < since) break
  } while (pageToken)

  const kept = reviews
    .filter(r => !since || new Date(r.updateTime) >= since)
    .filter(r => !args.unanswered || !r.reviewReply)
    .map(r => ({
      name: r.name, // pass this to reply.mjs
      stars: STARS[r.starRating] ?? null,
      author: r.reviewer?.displayName,
      date: r.createTime?.slice(0, 10),
      comment: r.comment || '',
      reply: r.reviewReply?.comment || null,
    }))
  results.push({ ...loc, ...summary, reviews: kept })
}

if (args.json) {
  console.log(JSON.stringify(results, null, 2))
} else {
  for (const loc of results) {
    console.log(`\n=== ${loc.title} (${loc.city}) — ${loc.averageRating ?? '–'}★, ${loc.totalReviewCount ?? 0} avis`)
    if (!loc.reviews.length) console.log('  (aucun avis correspondant)')
    for (const r of loc.reviews) {
      console.log(`\n  ${'★'.repeat(r.stars || 0)} ${r.date} — ${r.author}`)
      if (r.comment) console.log(`  « ${r.comment.replace(/\n+/g, ' ')} »`)
      console.log(r.reply ? `  ↳ Réponse : ${r.reply.replace(/\n+/g, ' ')}` : '  ↳ SANS RÉPONSE')
      console.log(`  id: ${r.name}`)
    }
  }
}
