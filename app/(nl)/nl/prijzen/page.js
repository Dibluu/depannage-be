import { PricesIndexPage, pricesIndexMetadata } from '../../../../components/seo/pages'

export const revalidate = 3600
export const metadata = pricesIndexMetadata('nl')

export default function Page() {
  return <PricesIndexPage lang="nl" />
}
