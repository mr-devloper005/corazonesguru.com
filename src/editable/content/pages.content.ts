import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Read, publish, and discover thoughtful articles',
      description: 'Explore essays, explainers, research notes, and article series through a warm editorial reading experience.',
      openGraphTitle: 'Read, publish, and discover thoughtful articles',
      openGraphDescription: 'A refined article-first platform for readers, writers, essays, guides, and serialized ideas.',
      keywords: ['article platform', 'essay publishing', 'article discovery', 'reading platform'],
    },
    hero: {
      badge: 'Writer desk and reading archive',
      title: ['Write with craft.', 'Read with intent.'],
      description: 'One focused place for articles, essays, explainers, and serialized ideas. Browse sharp writing, search by topic, and return to the pieces that stay with you.',
      primaryCta: { label: 'Read latest articles', href: '/article' },
      secondaryCta: { label: 'Start writing free', href: '/signup' },
      searchPlaceholder: 'Search articles, essays, authors, and topics',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and connecting different kinds of content.',
      paragraphs: [
        'This site brings together article-style reading, visual browsing, and structured discovery so visitors can move naturally between different content types.',
        'Instead of separating stories, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a story, an image-led post, a listing, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, visuals, listings, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore articles, visuals, and resources through one connected experience.',
      description: 'Move between articles, image-led posts, listings, and resources through one clearer and more connected visual system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Sales', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our editorial promise',
    title: 'A calmer, clearer home for article discovery.',
    description: `${slot4BrandConfig.siteName} is shaped for readers who want useful writing and writers who want their work presented with care.`,
    paragraphs: [
      'We treat articles as finished rooms, not disposable feed items. Every page is arranged around headline clarity, body readability, and a natural path to the next good read.',
      'The platform supports practical articles, essays, tutorials, editorials, and serialized writing while keeping the experience simple for readers and contributors.',
      'Our goal is to help a visitor understand what a piece is about, why it matters, and where to go next without fighting the interface.',
    ],
    values: [
      {
        title: 'Reader-first pacing',
        description: 'Warm typography, clear summaries, and spacious article pages make reading feel deliberate instead of rushed.',
      },
      {
        title: 'Useful discovery',
        description: 'Search, related articles, archive filters, and topic cues help readers move from one piece to the next with context.',
      },
      {
        title: 'Writer confidence',
        description: 'Contributor access, pitch-friendly contact copy, and article-focused flows make the site feel ready for publishing work.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Pitch an article, ask about publishing, or reach the editorial desk.',
    description: 'Tell us what you want to write, improve, syndicate, or clarify. We route article ideas, contributor questions, corrections, and partnership notes to the right place.',
    formTitle: 'Write to the editors',
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
