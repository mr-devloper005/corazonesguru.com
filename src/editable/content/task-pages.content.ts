import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Articles',
    headline: 'Long-form content built for deep reading.',
    description: 'Deploy articles, essays, guides, and editorial content with instant publishing and smart discovery built in.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Reading surfaces need space, hierarchy, and fewer distractions.',
    chips: ['Instant publishing', 'Topic filters', 'Smart discovery'],
  },
  classified: {
    eyebrow: 'Notices',
    headline: 'Short notices and timely updates.',
    description: 'Deploy quick announcements, contributor notes, and compact editorial updates with instant delivery.',
    filterLabel: 'Filter notice',
    secondaryNote: 'Keep notices brief, clear, and tied to a specific action.',
    chips: ['Updates', 'Announcements', 'Quick reads'],
  },
  sbm: {
    eyebrow: 'Resources',
    headline: 'Curated collections and saved resources.',
    description: 'Deploy bookmark collections, reference materials, and curated resource libraries with automatic organization.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Curated resources need grouping and clean metadata.',
    chips: ['Collections', 'Resources', 'Reference'],
  },
  profile: {
    eyebrow: 'Profiles',
    headline: 'People and organizations on the platform.',
    description: 'Deploy profile pages with identity, trust signals, and discovery features built for teams and individuals.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Make identity and credibility visible before the grid begins.',
    chips: ['Identity', 'Trust signals', 'Discovery'],
  },
  pdf: {
    eyebrow: 'Documents',
    headline: 'PDFs and documents as a useful library.',
    description: 'Deploy document pages with file context, download intent, and summary views for reports, guides, and reference material.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document surfaces need archive cues, file context, and clear browsing.',
    chips: ['Documents', 'Guides', 'Archive'],
  },
  listing: {
    eyebrow: 'Directory',
    headline: 'Business listings built for discovery.',
    description: 'Deploy directory pages with trust cues, metadata, and practical search for business discovery and comparison.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Prioritize comparison, location, and direct action paths.',
    chips: ['Directory', 'Compare', 'Discovery'],
  },
  image: {
    eyebrow: 'Gallery',
    headline: 'Visual content with gallery-first browsing.',
    description: 'Deploy image pages with strong visuals, portfolio-like rhythm, and gallery-first browsing experience.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let images carry the page before long text does.',
    chips: ['Gallery', 'Visual-first', 'Portfolio'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
