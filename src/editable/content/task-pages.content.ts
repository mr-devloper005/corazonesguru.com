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
    eyebrow: 'Reading desk',
    headline: 'Long-form articles with a calmer editorial rhythm.',
    description: 'Use this page for essays, guides, explainers, and story-led posts. The layout should feel like a publication, not a directory.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Reading surfaces need space, hierarchy, and fewer distractions.',
    chips: ['Editorial pacing', 'Topic filters', 'Long-read friendly'],
  },
  classified: {
    eyebrow: 'Article notice board',
    headline: 'Short editorial notices and timely article updates.',
    description: 'Use this view for quick calls, announcements, contributor notes, and compact editorial posts.',
    filterLabel: 'Filter article notice',
    secondaryNote: 'Keep the note brief, clear, and tied to a reading or publishing action.',
    chips: ['Updates', 'Calls for pitches', 'Editorial notes'],
  },
  sbm: {
    eyebrow: 'Reading bookmarks',
    headline: 'Saved references that support better articles.',
    description: 'Bookmark pages collect sources, reading lists, references, and links that help writers build stronger pieces.',
    filterLabel: 'Filter reading list',
    secondaryNote: 'Curated references need context, not just a link.',
    chips: ['Sources', 'Reading lists', 'Research flow'],
  },
  profile: {
    eyebrow: 'Writer profiles',
    headline: 'Contributor profiles with voice, bylines, and article context.',
    description: 'Profile pages help readers understand who wrote a piece, what they cover, and where to read more.',
    filterLabel: 'Filter writers',
    secondaryNote: 'Make byline identity and article credibility visible before the grid begins.',
    chips: ['Bylines', 'Expertise', 'More articles'],
  },
  pdf: {
    eyebrow: 'Article resources',
    headline: 'Downloadable reports and source documents for deeper reading.',
    description: 'PDF pages support article research with reports, guides, transcripts, and reference material.',
    filterLabel: 'Filter article resource',
    secondaryNote: 'Document surfaces need archive cues, file context, and clear reading intent.',
    chips: ['Reports', 'Sources', 'Deep dives'],
  },
  listing: {
    eyebrow: 'Publication index',
    headline: 'Indexed article hubs, columns, and publication resources.',
    description: 'Listing pages can organize recurring article hubs, editorial collections, and useful publication references.',
    filterLabel: 'Filter article hub',
    secondaryNote: 'Prioritize context, topic fit, and direct reading paths.',
    chips: ['Hubs', 'Columns', 'Collections'],
  },
  image: {
    eyebrow: 'Article visuals',
    headline: 'Images that frame essays, features, and explainers.',
    description: 'Image pages support the article experience with covers, visual notes, charts, and editorial photography.',
    filterLabel: 'Filter article visuals',
    secondaryNote: 'Let the image establish context before the reader enters the text.',
    chips: ['Covers', 'Charts', 'Visual notes'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
