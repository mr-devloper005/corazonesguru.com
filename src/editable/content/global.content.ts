import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Real-time content infrastructure',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Content platform for modern teams',
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Sign up', href: '/signup' },
      secondary: { label: 'Log in', href: '/login' },
    },
  },
  footer: {
    tagline: 'Built for scale',
    description: 'A modern content platform with instant publishing, smart discovery, and infrastructure that scales with your team.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Latest articles', href: '/article' },
          { label: 'Search archive', href: '/search' },
          { label: 'Get in touch', href: '/contact' },
          { label: 'Join the platform', href: '/signup' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for performance at scale.',
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
