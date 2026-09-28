import { CommunePage, communeMetadata, communeParams } from '../../../../../../components/seo/pages'

export const dynamicParams = false
export const revalidate = 3600
export const generateStaticParams = () => communeParams('nl')
export const generateMetadata = props => communeMetadata(props, 'nl')

export default function Page({ params }) {
  return <CommunePage params={params} lang="nl" />
}
