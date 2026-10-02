// Totals per listing over a period: impressions (Maps / Search), calls, website clicks,
// direction requests. Data lags ~3 days behind.
//   node scripts/gbp/performance.mjs                  last 28 days
//   node scripts/gbp/performance.mjs --days=90 --location=lockey --json
import { api, locations, parseArgs, filterLocations } from './lib.mjs'

const METRICS = {
  BUSINESS_IMPRESSIONS_MOBILE_MAPS: 'maps',
  BUSINESS_IMPRESSIONS_DESKTOP_MAPS: 'maps',
  BUSINESS_IMPRESSIONS_MOBILE_SEARCH: 'search',
  BUSINESS_IMPRESSIONS_DESKTOP_SEARCH: 'search',
  CALL_CLICKS: 'calls',
  WEBSITE_CLICKS: 'website',
  BUSINESS_DIRECTION_REQUESTS: 'directions',
}

const args = parseArgs()
const days = Number(args.days || 28)
const end = new Date()
const start = new Date(end.getTime() - days * 86_400_000)
const range = (prefix, d) => ({
  [`dailyRange.${prefix}.year`]: d.getFullYear(),
  [`dailyRange.${prefix}.month`]: d.getMonth() + 1,
  [`dailyRange.${prefix}.day`]: d.getDate(),
})

const results = []
for (const loc of filterLocations(await locations(), args.location)) {
  const params = new URLSearchParams({ ...range('startDate', start), ...range('endDate', end) })
  for (const m of Object.keys(METRICS)) params.append('dailyMetrics', m)
  const data = await api(
    `https://businessprofileperformance.googleapis.com/v1/${loc.location}:fetchMultiDailyMetricsTimeSeries?${params}`,
  )

  const totals = { maps: 0, search: 0, calls: 0, website: 0, directions: 0 }
  for (const group of data.multiDailyMetricTimeSeries || []) {
    for (const series of group.dailyMetricTimeSeries || []) {
      // Days with 0 are omitted; values come back as strings.
      const sum = (series.timeSeries?.datedValues || []).reduce((s, v) => s + Number(v.value || 0), 0)
      totals[METRICS[series.dailyMetric]] += sum
    }
  }
  results.push({ title: loc.title, city: loc.city, location: loc.location, days, ...totals })
}

if (args.json) console.log(JSON.stringify(results, null, 2))
else console.table(results.map(({ location, ...r }) => r))
