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
      featureCardTitle: 'Headlines, summaries, and sections shaped for serious readers.',
      featureCardDescription: 'Recent articles stay at the center of the experience, with a calmer layout that makes the next read obvious.',
    },
    intro: {
      badge: 'About the publication',
      title: 'Built for articles that need more than a quick skim.',
      paragraphs: [
        'This site brings together long-form essays, practical explainers, opinion pieces, and research notes in one reading-first environment.',
        'The layout is designed for discovery without noise: clear sections, readable cards, useful search, and article pages that give the writing room to breathe.',
        'Whether someone starts with a headline, a topic, or a saved link, the experience keeps them close to related writing instead of sending them into a maze.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Editorial homepage with strong headline rhythm and article-led sections.',
        'Focused archive pages for essays, guides, updates, and opinion writing.',
        'Readable detail pages with side context, related articles, and comments.',
        'Lightweight local access for testing login and writer onboarding.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Publish something readers can actually finish.',
      description: 'Create a free account, browse the archive, or send a pitch for the next article series.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Editors', href: '/contact' },
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

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
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
