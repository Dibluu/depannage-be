import { PricesTradePage, pricesTradeMetadata, pricesTradeParams } from '../../../../../components/seo/pages'

export const dynamicParams = false
export const revalidate = 3600
export const generateStaticParams = () => pricesTradeParams('nl')
export const generateMetadata = props => pricesTradeMetadata(props, 'nl')

export default function Page({ params }) {
  return <PricesTradePage params={params} lang="nl" />
}
