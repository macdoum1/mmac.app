export const profile = {
  name: 'Mike MacDougall',
  domain: 'mmac.app',
  description: 'Mike MacDougall makes apps and games, works on Etsy’s apps and website, and explores agentic development.',
  bio: [
    'An app project for a college bioinformatics class changed my plans for biomedical research. I followed it with two years of contract app work during college, and I’ve now spent more than 15 years building software professionally. Since joining Etsy in 2014, I’ve worked across its apps and website to connect our buyers and sellers.',
    'I’m also exploring agentic development by building agents and working with local models, so I can take on projects beyond my usual expertise.',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/macdoum1' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mjmacdougall/' },
  ],
};

export const apps = [
  {
    name: 'PLNK',
    subtitle: 'Pachinko Challenge',
    description: 'Thirty drops. One shot at 300. A small physics game about finding your line through the board.',
    category: 'GAME',
    year: '2015',
    icon: '/images/apps/plnk-icon.jpg',
    image: '/images/apps/plnk-screen.jpg',
    imageAlt: 'A live PLNK game board with colored balls and scoring bins',
    href: 'https://apps.apple.com/us/app/plnk-pachinko-challenge/id1047962614',
    privacyHref: '/privacy/plnk/',
    featured: true,
  },
  {
    name: 'Recipe Hound',
    subtitle: 'Keep the good parts',
    description: 'A clean place for recipes, whether they come from a webpage, a photo, or your own notes.',
    category: 'FOOD & DRINK',
    year: '2026',
    icon: '/images/apps/recipe-hound-icon.jpg',
    image: '/images/apps/recipe-hound-screen.jpg',
    imageAlt: 'Recipe Hound App Store preview screen',
    href: 'https://apps.apple.com/us/app/recipe-hound/id6760431706',
    privacyHref: '/privacy/recipe-hound/',
    featured: true,
  },
  {
    name: 'Verdant Ledger',
    subtitle: 'Plan your next Pokopia session',
    description: 'An unofficial, offline-first companion for Pokopia, with searchable catalogs, collection progress, and project planning.',
    category: 'GAME COMPANION',
    year: '2026',
    icon: '/images/apps/verdant-ledger-icon.jpg',
    image: '/images/apps/verdant-ledger-screen.jpg',
    imageAlt: 'Verdant Ledger App Store preview screen',
    href: 'https://apps.apple.com/us/app/verdant-ledger/id6759935576',
    privacyHref: '/privacy/field-guide/',
    featured: false,
  },
  {
    name: 'TapTapCount',
    subtitle: 'A counter that stays out of the way',
    description: 'A handy tally counter with multiple counters, adjustable steps, and Apple Watch support.',
    category: 'UTILITY',
    year: '2015',
    icon: '/images/apps/taptapcount-icon.jpg',
    image: '/images/apps/taptapcount-screen.jpg',
    imageAlt: 'TapTapCount App Store preview screen',
    href: 'https://apps.apple.com/us/app/taptapcount/id981734553',
    featured: false,
  },
];

export const openSource = {
  name: 'howsigned',
  description: 'A Ruby gem for inspecting the code signatures inside an iOS app package.',
  downloadsApi: 'https://rubygems.org/api/v1/gems/howsigned.json',
  links: [
    { label: 'GitHub', href: 'https://github.com/macdoum1/howsigned' },
    { label: 'RubyGems', href: 'https://rubygems.org/gems/howsigned' },
  ],
};

export const outsideTheAppStore = [
  { label: '3D prints', note: 'Objects made for the real world', href: 'https://makerworld.com/en/@Applemilk', mark: '3D' },
  { label: 'Photography', note: 'A collection of photographs', href: 'https://michaelmacdougallphotography.mypixieset.com', mark: 'P' },
];
