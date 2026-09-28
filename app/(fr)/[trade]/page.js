import { TradePage, tradeMetadata, tradeParams } from '../../../components/seo/pages'

export const dynamicParams = false
export const revalidate = 3600
export const generateStaticParams = () => tradeParams('fr')
export const generateMetadata = props => tradeMetadata(props, 'fr')

export default function Page({ params }) {
  return <TradePage params={params} lang="fr" />
}
