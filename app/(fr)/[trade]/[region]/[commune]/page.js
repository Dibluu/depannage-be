import { CommunePage, communeMetadata, communeParams } from '../../../../../components/seo/pages'

export const dynamicParams = false
export const revalidate = 3600
export const generateStaticParams = () => communeParams('fr')
export const generateMetadata = props => communeMetadata(props, 'fr')

export default function Page({ params }) {
  return <CommunePage params={params} lang="fr" />
}
