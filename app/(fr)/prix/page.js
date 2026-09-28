import { PricesIndexPage, pricesIndexMetadata } from '../../../components/seo/pages'

export const revalidate = 3600
export const metadata = pricesIndexMetadata('fr')

export default function Page() {
  return <PricesIndexPage lang="fr" />
}
