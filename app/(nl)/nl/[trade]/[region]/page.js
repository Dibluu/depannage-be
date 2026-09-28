import { RegionPage, regionMetadata, regionParams } from '../../../../../components/seo/pages'

export const dynamicParams = false
export const revalidate = 3600
export const generateStaticParams = () => regionParams('nl')
export const generateMetadata = props => regionMetadata(props, 'nl')

export default function Page({ params }) {
  return <RegionPage params={params} lang="nl" />
}
