import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Article studio and reading desk',
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Join free', href: '/signup' },
      secondary: { label: 'Log in', href: '/login' },
    },
  },
  footer: {
    tagline: 'Articles worth finishing',
    description: 'A warm editorial home for essays, explainers, opinion pieces, research notes, and serialized articles that deserve a patient reader.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Latest articles', href: '/article' },
          { label: 'Search archive', href: '/search' },
          { label: 'Submit a pitch', href: '/contact' },
          { label: 'Writer access', href: '/signup' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for thoughtful publishing and clear article discovery.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
