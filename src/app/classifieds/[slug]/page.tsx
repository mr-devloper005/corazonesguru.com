import ClassifiedDetailPage, { generateMetadata as generateClassifiedMetadata } from '@/editable/pages/ClassifiedDetailPage'

export const dynamic = 'force-dynamic'
export const revalidate = 3
export const generateMetadata = generateClassifiedMetadata
export default ClassifiedDetailPage
