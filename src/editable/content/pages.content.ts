import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Content infrastructure that scales with you',
      description: 'Publish articles, deploy resources, and scale your content with sub-second delivery and instant discovery.',
      openGraphTitle: 'Content infrastructure that scales with you',
      openGraphDescription: 'A modern content platform built for teams that need reliability at scale.',
      keywords: ['content platform', 'article publishing', 'content infrastructure', 'scalable publishing'],
    },
    hero: {
      badge: 'Now available',
      title: ['Real-time content', 'infrastructure that', 'scales with you'],
      description: 'Deploy articles, resources, and any content workload with sub-second publishing and instant discovery. Built for teams that need reliability at scale.',
      primaryCta: { label: 'Try it now', href: '/article' },
      secondaryCta: { label: 'Book a demo', href: '/contact' },
      searchPlaceholder: 'Search articles, topics, resources...',
      focusLabel: 'Focus',
      featureCardBadge: 'instant publishing',
      featureCardTitle: 'Content goes live the moment you publish.',
      featureCardDescription: 'Zero cold starts, instant indexing, and automatic scaling across every content type on the platform.',
    },
    intro: {
      badge: 'How it works',
      title: 'Production speed without the production complexity.',
      paragraphs: [
        'This platform brings together article publishing, resource management, and content discovery so teams can move faster without compromising quality.',
        'Instead of managing separate tools for different content types, everything works together in one streamlined system with consistent navigation and instant delivery.',
        'Whether you start with an article, a document, or a resource page, the platform handles scaling, discovery, and delivery automatically.',
      ],
      sideBadge: 'Key features',
      sidePoints: [
        'Sub-second publishing with zero cold starts.',
        'Automatic content discovery and smart recommendations.',
        'Built-in search, filtering, and archive management.',
        'Scales from zero to millions of readers without configuration.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'View resources', href: '/search' },
    },
    cta: {
      badge: 'Get started',
      title: 'Start publishing at scale today.',
      description: 'Join teams already using the platform to deploy content faster, reach more readers, and scale without infrastructure headaches.',
      primaryCta: { label: 'Try it now', href: '/article' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About us',
    title: 'Built for teams that publish at scale.',
    description: `${slot4BrandConfig.siteName} is a content infrastructure platform designed for teams that need speed, reliability, and scale without the complexity.`,
    paragraphs: [
      'We built this platform because publishing content at scale shouldn\'t require a dedicated infrastructure team. Every feature is designed around speed and simplicity.',
      'The platform supports articles, documents, visual content, and structured resources while keeping the publishing and reading experience fast and focused.',
      'Our goal is to make content infrastructure invisible so teams can focus on what they publish, not how they publish it.',
    ],
    values: [
      {
        title: 'Sub-second delivery',
        description: 'Content goes live instantly with zero cold starts, automatic indexing, and global distribution built in.',
      },
      {
        title: 'Smart discovery',
        description: 'Readers find relevant content through intelligent search, topic filtering, and contextual recommendations.',
      },
      {
        title: 'Scale without limits',
        description: 'The platform handles traffic spikes, content volume growth, and multi-region delivery without configuration.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Get in touch with our team.',
    description: 'Whether you have questions about the platform, need help getting started, or want to discuss enterprise features, we\'re here to help.',
    formTitle: 'Send us a message',
  },
  create: {
    metadata: {
      title: 'Create a post',
      description: 'Create a new post, listing, visual, profile, bookmark, or resource from this site interface.',
    },
    hero: {
      badge: 'Create workspace',
      title: 'Create content with a clean guided flow.',
      description: 'Use this editable create page as the front-end workspace for drafting posts, adding media, and preparing structured content across enabled site tasks.',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
