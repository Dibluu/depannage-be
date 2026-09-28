import { PricesTradePage, pricesTradeMetadata, pricesTradeParams } from '../../../../components/seo/pages'

export const dynamicParams = false
export const revalidate = 3600
export const generateStaticParams = () => pricesTradeParams('fr')
export const generateMetadata = props => pricesTradeMetadata(props, 'fr')

export default function Page({ params }) {
  return <PricesTradePage params={params} lang="fr" />
}
