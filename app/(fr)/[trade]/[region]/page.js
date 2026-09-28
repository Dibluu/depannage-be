import { RegionPage, regionMetadata, regionParams } from '../../../../components/seo/pages'

export const dynamicParams = false
export const revalidate = 3600
export const generateStaticParams = () => regionParams('fr')
export const generateMetadata = props => regionMetadata(props, 'fr')

export default function Page({ params }) {
  return <RegionPage params={params} lang="fr" />
}
