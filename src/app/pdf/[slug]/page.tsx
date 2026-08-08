import PdfDetailPage, { generateMetadata as generatePdfMetadata } from '@/editable/pages/PdfDetailPage'

export const dynamic = 'force-dynamic'
export const revalidate = 3
export const generateMetadata = generatePdfMetadata
export default PdfDetailPage
