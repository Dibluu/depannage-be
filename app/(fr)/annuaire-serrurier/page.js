import AnnuairePage, { annuaireMetadata } from '../../../components/seo/AnnuairePage'

export const revalidate = 3600
export const metadata = annuaireMetadata()

export default function Page() {
  return <AnnuairePage />
}
