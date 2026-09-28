import { TradePage, tradeMetadata, tradeParams } from '../../../../components/seo/pages'

export const dynamicParams = false
export const revalidate = 3600
export const generateStaticParams = () => tradeParams('nl')
export const generateMetadata = props => tradeMetadata(props, 'nl')

export default function Page({ params }) {
  return <TradePage params={params} lang="nl" />
}
