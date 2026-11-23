// Single source of truth for brand, contact details and page copy.
// Edit here to change text across the whole site.

export const BRAND = {
  name: 'BizzTalks',
  tagline: 'Creative Digital Solutions for Growing Businesses.',
}

export const CONTACT = {
  whatsappNumber: '919748989711', // international format, no "+" or spaces (used in wa.me links)
  whatsappDisplay: '+91 97489 89711',
  email: 'managerialtalk@gmail.com',
  emailSubject: 'New Project Enquiry – BizzTalks',
  instagram: 'https://www.instagram.com/biz.talksofficial?bqrl=MW5zMHBrMTVsbXU3Mw==',
  instagramHandle: '@biz.talksofficial',
}

export const FOUNDER = {
  name: 'Arijit Banerjee',
  role: 'Founder, BizzTalks · Social Media Manager',
  initials: 'AB',
  bio: [
    'Arijit started BizzTalks to give growing businesses the same joined-up marketing that larger brands get: strategy, content, ads, websites and automation working together instead of in silos.',
    'He has around three years of hands-on experience in social media management and digital marketing, plus a year as a freelance video editor. Day to day, that means running Meta and Google Ads campaigns, planning content across brands, managing leads in CRM, and building WhatsApp and Instagram automation flows.',
  ],
  skills: ['Social media strategy', 'Meta Ads', 'Google Ads', 'Content planning', 'Video editing', 'Lead generation', 'CRM (LeadSquared)', 'AiSensy & ManyChat automation'],
  links: {
    portfolio: 'https://arijit-banerjee-portfolio.vercel.app/',
    instagram: 'https://www.instagram.com/arijit.banerjee_?cnvx=cWFyYWR4NG13dmxv',
    instagramHandle: '@arijit.banerjee_',
    linkedin: 'https://www.linkedin.com/in/arijit-banerjee-01012005jan',
    whatsapp: 'https://wa.me/919748989711',
  },
}

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Work' },
  { id: 'why', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
]

export type ServiceIcon =
  | 'megaphone' | 'users' | 'target' | 'search' | 'globe' | 'user' | 'film'
  | 'pen' | 'compass' | 'bot' | 'chart' | 'trending'

export interface Service {
  id: string
  letter: string
  title: string
  icon: ServiceIcon
  blurb: string
  items: string[]
}

export const SERVICES: Service[] = [
  {
    id: 'digital-marketing', letter: 'A', title: 'Digital Marketing', icon: 'trending',
    blurb: 'A complete plan for how your brand gets found, gets trusted and gets chosen online.',
    items: ['Complete Digital Marketing Strategy', 'Online Brand Promotion', 'Campaign Planning', 'Audience Research', 'Lead Generation', 'Conversion-focused Marketing'],
  },
  {
    id: 'social-media', letter: 'B', title: 'Social Media Management', icon: 'users',
    blurb: 'Consistent, on-brand accounts that post with purpose and talk back to their audience.',
    items: ['Instagram Management', 'Facebook Management', 'YouTube Management', 'Social Media Strategy', 'Content Calendar Planning', 'Community Management', 'Audience Engagement', 'Account Growth Strategy'],
  },
  {
    id: 'meta-ads', letter: 'C', title: 'Meta Ads', icon: 'target',
    blurb: 'Facebook and Instagram campaigns built around leads and sales, not just likes.',
    items: ['Facebook Ads', 'Instagram Ads', 'Lead Generation Campaigns', 'Traffic Campaigns', 'Engagement Campaigns', 'Retargeting', 'Campaign Optimisation', 'Performance Reporting'],
  },
  {
    id: 'google-ads', letter: 'D', title: 'Google Ads', icon: 'search',
    blurb: 'Show up at the exact moment people search for what you offer.',
    items: ['Google Search Ads', 'Google Display Ads', 'YouTube Ads', 'Search Campaign Management', 'Keyword Research', 'Lead Generation', 'Conversion Tracking', 'Campaign Optimisation'],
  },
  {
    id: 'web-dev', letter: 'E', title: 'Website Development', icon: 'globe',
    blurb: 'Fast, responsive websites and landing pages designed to turn visitors into enquiries.',
    items: ['Business Websites', 'Landing Pages', 'Portfolio Websites', 'Responsive Website Development', 'Website Redesign', 'UI/UX Design', 'Website Performance Optimisation'],
  },
  {
    id: 'portfolio-dev', letter: 'F', title: 'Portfolio Development', icon: 'user',
    blurb: 'Personal portfolios that make professionals and creators impossible to ignore.',
    items: ['Personal Portfolio Websites', 'Professional Digital Portfolios', 'Creative Portfolio Design', 'Resume and Portfolio Integration', 'Interactive 3D Portfolio Experiences', 'Professional Personal Branding'],
  },
  {
    id: 'video-editing', letter: 'G', title: 'Video Editing', icon: 'film',
    blurb: 'Scroll-stopping reels, shorts and brand videos edited for retention.',
    items: ['Instagram Reels', 'YouTube Videos', 'YouTube Shorts', 'Promotional Videos', 'Business Videos', 'Social Media Video Editing', 'Short-form Content'],
  },
  {
    id: 'content-creation', letter: 'H', title: 'Content Creation', icon: 'pen',
    blurb: 'Posts, carousels and creatives that look premium and say something useful.',
    items: ['Instagram Posts', 'Carousels', 'Reels Creatives', 'Promotional Designs', 'Social Media Graphics', 'Marketing Creatives', 'Brochures'],
  },
  {
    id: 'branding', letter: 'I', title: 'Social Media Strategy & Branding', icon: 'compass',
    blurb: 'A clear identity and voice, so every post feels unmistakably yours.',
    items: ['Brand Identity', 'Brand Positioning', 'Content Strategy', 'Creative Direction', 'Audience Research', 'Influencer Marketing'],
  },
  {
    id: 'automation', letter: 'J', title: 'Marketing Automation', icon: 'bot',
    blurb: 'Reply instantly and follow up every lead with WhatsApp and Instagram automation.',
    items: ['WhatsApp Automation', 'Instagram DM Automation', 'Automated Lead Capture', 'Customer Enquiry Workflows', 'CRM Integration', 'Follow-up Automation'],
  },
  {
    id: 'analytics', letter: 'K', title: 'Analytics & Performance', icon: 'chart',
    blurb: 'Clear reports on what is working, what is not and where to spend next.',
    items: ['Social Media Analytics', 'Campaign Reporting', 'Performance Tracking', 'Audience Insights', 'Lead Tracking', 'Data Analysis'],
  },
  {
    id: 'seo', letter: 'L', title: 'SEO & Online Presence', icon: 'megaphone',
    blurb: 'Get discovered on Google Search and Maps by customers near you.',
    items: ['Search Engine Optimisation', 'Google Business Profile Optimisation', 'Local SEO', 'Website SEO', 'Online Visibility Strategy'],
  },
]

export const WHY = [
  { title: 'Strategy-first approach', text: 'Every post, ad and page starts from your business goal, not from a template.' },
  { title: 'Creative execution', text: 'Design and video that feels premium and stops the scroll.' },
  { title: 'Data-driven decisions', text: 'We track results and move budget and effort to what is actually working.' },
  { title: 'Integrated marketing solutions', text: 'Social, ads, website, content and automation under one roof, so nothing falls through the gaps.' },
  { title: 'Modern technology', text: 'Automation, CRM and fast modern websites that save you time and capture every lead.' },
  { title: 'Business-focused execution', text: 'We measure success in enquiries and customers, not vanity metrics.' },
  { title: 'Tailored solutions for every brand', text: 'Plans shaped around your audience, budget and stage of growth.' },
]

export const PROCESS = [
  { step: '01', title: 'Discover', text: 'Understand the business, its audience and its requirements.' },
  { step: '02', title: 'Strategise', text: 'Develop a customised plan with clear goals and channels.' },
  { step: '03', title: 'Create', text: 'Execute the creative and technical work with care.' },
  { step: '04', title: 'Grow', text: 'Measure, optimise and improve, month after month.' },
]

export const WORK_CATEGORIES = [
  { id: 'social', title: 'Social Media Designs', text: 'Posts, carousels and campaign creatives for Instagram and Facebook.', service: 'Content Creation' },
  { id: 'campaigns', title: 'Digital Marketing Campaigns', text: 'Meta and Google campaigns planned around leads and bookings.', service: 'Digital Marketing' },
  { id: 'websites', title: 'Website Projects', text: 'Business websites and landing pages built to convert.', service: 'Website Development' },
  { id: 'portfolios', title: 'Portfolio Websites', text: 'Personal and creative portfolios, including interactive 3D experiences.', service: 'Portfolio Development' },
  { id: 'video', title: 'Video Editing', text: 'Reels, shorts, promos and business videos.', service: 'Video Editing' },
  { id: 'branding', title: 'Branding & Creative Work', text: 'Identity, positioning and creative direction.', service: 'Social Media Strategy & Branding' },
] as const

export type WorkCategoryId = (typeof WORK_CATEGORIES)[number]['id']

export interface WorkItem {
  category: WorkCategoryId
  title: string
  image: string // import the image in src/data/work.ts and pass it here
  alt: string
  description?: string
  link?: string
}
