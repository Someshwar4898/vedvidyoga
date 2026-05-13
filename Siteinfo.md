# VedVidYoga - Website Documentation

## 🎯 Project Overview

**Site Name**: VedVidYoga  
**Tagline**: Understanding Vedic Cult: A Scientific Perspective  
**Purpose**: A comprehensive knowledge platform dedicated to exploring Vedas, Upanishads, Ayurveda, and Yoga through logical and scientific reasoning.

**Core Mission**: Decode ancient Vedic wisdom with scientific logic, methodology, philosophy, lifestyle practices, healing systems, and value-based education — explained with clarity and reason.

---

## 🛠 Technology Stack

### Frontend Framework
- **Framework**: Next.js 16.2.4
- **React Version**: 19.2.5
- **Styling**: Tailwind CSS 4.2.4 with PostCSS
- **UI Icons**: Lucide React 1.9.0
- **Build Tool**: Vite (originally), now Next.js

### Backend Integration
- **CMS**: WordPress with REST API
- **API Base**: `NEXT_PUBLIC_WP_API_URL` (environment variable)
- **SEO Plugin**: RankMath (for headless SEO optimization)
- **Analytics**: Post Views Counter plugin

### Development Tools
- **Linting**: ESLint 9.39.4 with Next.js config
- **Font Loading**: Google Fonts (Inter family)
- **CSS Libraries**: Block library styles from WordPress

---

## 📁 Project Structure

```
NEXT.Blog/
├── app/                          # Next.js app directory (routing)
│   ├── layout.jsx               # Root layout with metadata
│   ├── page.jsx                 # Home page
│   ├── [category]/              # Dynamic category routes
│   │   ├── page.jsx
│   │   └── [subcategory]/
│   │       ├── page.jsx
│   │       └── [slug]/
│   │           └── page.jsx
│   ├── about/                   # Static pages
│   ├── blog/
│   ├── case-studies/
│   ├── contact/
│   ├── medical-disclaimer/
│   ├── post/[slug]/
│   ├── privacy/
│   └── terms/
├── src/
│   ├── components/              # Reusable React components
│   ├── views/                   # Page-level view components
│   ├── services/                # API & external services
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Utility functions
│   ├── data/                    # Static/mock data
│   ├── assets/                  # Images, fonts, etc.
│   ├── App.jsx & main.jsx       # Legacy entries
│   ├── index.css & App.css      # Global styles
├── public/                       # Static assets
├── Dockerfile                    # Container configuration
├── next.config.mjs              # Next.js configuration
├── nginx.conf                   # Nginx reverse proxy config
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # Tailwind configuration
└── eslint.config.js             # ESLint rules

```

---

## 📄 Core Pages & Routes

### Static Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Home.jsx` | Landing page with hero, featured posts, trending content |
| `/blog` | `Blog.jsx` | All posts with category filtering |
| `/about` | `About.jsx` | About VedVidYoga mission and differentiators |
| `/case-studies` | `CaseStudies.jsx` | Case study showcase |
| `/case-studies/[slug]` | `CaseStudyDetail.jsx` | Individual case study |
| `/contact` | `Contact.jsx` | Contact form and inquiry |
| `/privacy` | `PrivacyPolicy.jsx` | Privacy policy |
| `/terms` | `TermsAndConditions.jsx` | Terms of service |
| `/medical-disclaimer` | `MedicalDisclaimer.jsx` | Medical disclaimer |

### Dynamic Routes

| Route Pattern | Component | Purpose |
|---|---|---|
| `/post/[slug]` | `PostPage.jsx` | Individual blog post with full content |
| `/[category]` | `CategoryPage.jsx` | Posts filtered by main category (Vedas, Upanishads, etc.) |
| `/[category]/[subcategory]` | `CategoryPage.jsx` | Posts filtered by subcategory |
| `/[category]/[subcategory]/[slug]` | `PostPage.jsx` | Individual post within category hierarchy |

---

## 📚 Content Categories

### Main Categories (with Subcategories)

#### 1. **Vedas** - Ancient foundational scriptures
   - **Rigveda**: Sacred hymns and poetic invocations rooted in cosmic order
   - **Yajurveda**: Ritual formulas and ceremonial knowledge for sacred practice
   - **Samveda**: Melodic chants and liturgical recitations shaped through sound
   - **Atharvaveda**: Everyday wisdom, healing traditions, and spiritual reflections

#### 2. **Upanishads** - Reflective texts on consciousness and reality
   - **Isha Upanishad**: Meditation on renunciation, action, and unity
   - **Kena Upanishad**: Inquiry into the source behind mind, speech, and perception
   - **Katha Upanishad**: Philosophical dialogue on death, soul, and liberation
   - **Mundaka Upanishad**: Distinction between higher knowledge and worldly learning

#### 3. **Ayurveda** - Holistic well-being and healing systems
   - **Dinacharya**: Daily routines for steadiness, clarity, and natural health
   - **Aahara**: Food wisdom, digestion, and intentional nourishment
   - **Ritucharya**: Seasonal living practices aligned with nature's cycles
   - **Dravyaguna**: Herbs, materials, and their qualities in traditional healing

#### 4. **Yoga** - Balanced path of movement, breath, and awareness
   - **Asana**: Postural practice for stability, strength, and ease
   - **Pranayama**: Breath-based techniques for focus, energy, and calm
   - **Meditation**: Stillness practices that cultivate presence and insight
   - **Yoga Sutras**: Foundational philosophy on mind, discipline, and liberation

---

## 🧩 Component Library

### Layout Components
- **Navbar.jsx**: Sticky navigation with category mega-menu, search, and mobile menu
- **Footer.jsx**: Site footer with links and information
- **ThemeToggle.jsx**: Dark/Light theme switcher
- **ScrollToTop.jsx**: Floating button to scroll to top
- **LogoLoader.jsx**: Loading animation with branded logo

### Content Components
- **PostCard.jsx**: Card component for displaying blog posts in lists
- **PostPage Display**:
  - **TableOfContents.jsx**: Auto-generated table of contents from post headings
  - **PostAuthorCard.jsx**: Author bio and profile section
  - **PostFAQ.jsx**: Frequently asked questions section in posts
  - **PostDisclaimer.jsx**: Medical/legal disclaimers
  - **SanskritTerm.jsx**: Interactive Sanskrit term definitions with Devanagari script

### Home Page Sections
- **KnowledgePillars.jsx**: Displays the six Darshans and core philosophical concepts
- **HomeCategories.jsx**: Featured category cards linking to category pages
- **FeaturedPosts.jsx**: Posts tagged as "featured"
- **TrendingPosts.jsx**: Top 4 posts by view count
- **LatestPosts.jsx**: Most recent posts
- **AboutAuthor.jsx**: Author introduction section
- **Gallery.jsx**: Image gallery showcasing content
- **Testimonials.jsx**: User testimonials and reviews
- **HomeFAQ.jsx**: Frequently asked questions
- **Newsletter.jsx**: Email subscription form

### Utility Components
- **BlogSections.jsx**: Renders blog post list with filtering
- **CategoryName.jsx**: Displays category name with styling
- **RelatedPosts.jsx**: Shows 3 related posts based on category
- **SearchModal.jsx**: Full-text search interface

---

## 🪝 Custom Hooks

### `usePosts()`
**Purpose**: Fetch and manage blog posts with caching  
**Features**:
- Module-level caching (fetches once, reused everywhere)
- Filters by category and subcategory
- Returns: `{ posts, loading, error }`
- Falls back to mock data if WordPress unavailable

### `useCategories()`
**Purpose**: Fetch and manage content categories  
**Features**:
- Returns hierarchical category structure with subcategories
- Shared module-level cache
- Falls back to static categories if API unreachable
- Returns: `{ categories, loading }`

### `useCaseStudies()`
**Purpose**: Fetch case study content  
**Features**:
- Manages case study data retrieval
- Integration with WordPress CPT (Custom Post Type)

### `useTestimonials()`
**Purpose**: Fetch user testimonials  
**Features**:
- Retrieves testimonial data from WordPress
- Custom Testimonials CPT integration

### `useWPStyles()`
**Purpose**: Load WordPress block library styles  
**Features**:
- Ensures WordPress-generated content is properly styled
- Handles CSS for block editor output

---

## 🔌 Services & APIs

### `api.js` - WordPress REST API Integration
**Base URL**: `NEXT_PUBLIC_WP_API_URL` environment variable

**Key Functions**:
- **`getNavCategories()`**: Fetches hierarchical categories for navbar mega-menu
- **`getCategoryMap()`**: Internal function mapping category slugs to data
- **`getPosts()`**: Fetches all posts with metadata and categories
- **`getTrendingPosts()`**: Returns top 4 posts by view count
- **`getRelatedPosts(categoryIds, excludePostId)`**: Fetches related posts for current post
- **`mapPost(wp, catMap)`**: Transforms WordPress post data into app format

**Data Transformations**:
- Decodes HTML entities (`&amp;` → `&`, etc.)
- Strips HTML tags from excerpts
- Maps WordPress taxonomy to custom structures
- Calculates read time (words ÷ 200 per minute)

### `seo.js` - SEO & Meta Tags
**Features**:
- **RankMath Integration**: Fetches SEO meta tags from RankMath plugin
- **Fallback Data**: Uses WordPress post/category data if RankMath unavailable
- **Functions**:
  - `getPostMeta(slug)`: Retrieves post title, excerpt, link, image
  - `getCategoryMeta(slug)`: Retrieves category metadata
  - `getPostPageMeta(slug)`: Complete meta for post pages (RankMath + WP fallback)
  - `getCategoryPageMeta(slug)`: Complete meta for category pages

### `views.js` - Analytics
**Features**:
- **`incrementPostView(postId)`**: Fires on every page load
- Integrates with WordPress "Post Views Counter" plugin
- Non-critical (fails silently if API unavailable)
- API Endpoint: `/wp-json/post-views-counter/v1/post/{postId}`

---

## 💾 Data Structure

### Post Object
```javascript
{
  id: number,
  slug: string,
  title: string,
  excerpt: string,
  content: string (HTML),
  image: string (URL),
  imageAlt: string,
  author: string,
  date: string (formatted),
  readTime: string (e.g. "5 min read"),
  views: number,
  featured: boolean,
  categorySlug: string,
  categoryName: string,
  subcategorySlug: string,
  subcategoryName: string,
  faqs: array (ACF custom field),
  disclaimer: string (ACF custom field),
  categoryIds: array (WP category IDs)
}
```

### Category Object
```javascript
{
  id: number,
  name: string,
  slug: string,
  description: string,
  subcategories: [
    {
      name: string,
      slug: string,
      description: string
    }
  ]
}
```

### Static Categories (Fallback)
Located in `src/data/categories.js` - provides offline-first content for the 4 main categories when WordPress is unavailable.

---

## 🎨 Styling & Design

### Design System
- **Framework**: Tailwind CSS v4.2.4
- **Color Palette**:
  - **Primary**: Saffron (orange-gold) `#F28C28` (Vedic symbol color)
  - **Background**: Cream `#F9F5F0` (light mode)
  - **Dark Mode**: Stone grays with high contrast
  - **Accent**: Gold/tan for borders and highlights

- **Typography**:
  - **Font**: Inter (variable weight from Google Fonts)
  - **Weights**: 400, 500, 600, 700
  - **Line Heights**: Optimized for readability

### Layout Patterns
- **Max Width**: 7xl container (80rem)
- **Responsive Padding**: 5px → 8px → 10px on mobile, tablet, desktop
- **Gap Spacing**: Consistent 10-14 units between sections
- **Cards**: Rounded corners (2rem), subtle shadows, border accents

### Dark Mode
- Automatically enabled if `localStorage.theme === 'dark'`
- Applied via `<html class="dark">` root element
- All components use dark-aware Tailwind classes

---

## ⚙️ Key Features & Functionality

### 1. **Blog Management**
- Dynamic post creation from WordPress
- Category and subcategory filtering
- "Featured" and "Latest" post tags
- Related posts suggestions
- Read time calculation

### 2. **Search Capability**
- SearchModal component for full-text search
- Queries posts and categories
- Real-time filtering

### 3. **Analytics**
- Post view counting (integrated with WordPress plugin)
- Trending posts (ranked by view count)
- Author tracking

### 4. **SEO Optimization**
- RankMath integration for meta tags
- WordPress native SEO fallback
- Structured data (OpenGraph, canonicals)
- Dynamic metadata per route

### 5. **Navigation**
- Mega-menu with category hierarchy
- Mobile-responsive hamburger menu
- Active route highlighting
- Search icon access

### 6. **Responsive Design**
- Mobile-first approach
- Tablet breakpoints
- Desktop optimization
- Touch-friendly navigation

### 7. **Dark Mode**
- System preference detection
- Manual toggle
- Persistent via localStorage

### 8. **Sanskrit Terms**
- Interactive definitions with Devanagari script
- Tooltips with English translations
- Used throughout content for cultural authenticity

### 9. **Newsletter Signup**
- Email subscription form
- Call-to-action on home and blog pages

### 10. **Social Features**
- Testimonial showcase
- Author bios
- Gallery component

---

## 🔐 Security & Performance

### Environment Variables
```
NEXT_PUBLIC_WP_API_URL    # WordPress REST API endpoint
NEXT_PUBLIC_SITE_URL      # Canonical site URL for SEO
```

### Caching Strategy
- **Module-level Caching**: Posts and categories cached at fetch-time
- **Next.js ISR**: Images and API responses revalidated (3600s default)
- **Browser Cache**: Static assets cached via HTTP headers

### Performance Optimizations
- Image optimization (via Next.js Image component, when used)
- Code splitting per route
- Lazy loading of below-fold components
- Minimal external dependencies

---

## 📦 Deployment

### Containerization
- **Dockerfile** included for Docker deployment
- **nginx.conf** for production reverse proxy setup
- Environment variable configuration for API endpoints

### Build Commands
```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

### Environment Setup
1. Set `NEXT_PUBLIC_WP_API_URL` to WordPress API endpoint
2. Set `NEXT_PUBLIC_SITE_URL` for SEO canonicals
3. Ensure WordPress REST API is accessible
4. Enable RankMath plugin on WordPress for enhanced SEO

---

## 🎯 Key Differentiators (Content Themes)

### 1. **Vedangas** (Vedic Auxiliary Sciences)
- Phonetics & Pronunciation (Śikṣā)
- Metre/Prosody (Chanda)
- Etymology & Semantics (Nirukta)
- Grammar (Vyākaraṇa)
- Astronomy/Astrology (Jyotiṣa)
- Ritual Procedures (Kalpa)

### 2. **Six Darshans** (Rational Philosophy)
- Nyāya (Logic & Reasoning)
- Vaiśeṣika (Atomic Theory)
- Sāṅkhya (Enumeration/Cosmology)
- Yoga (Practice & Discipline)
- Mīmāṃsā (Ritual Inquiry)
- Vedānta (End of Vedas/Non-dualism)

### 3. **Healing Systems**
- Therapeutic Yoga for musculoskeletal issues
- Sound healing with Indian Classical Ragas
- Vedic value education through Upanishads

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: > 1024px (lg+)

---

## 🔄 Content Workflow

1. **Content Creation**: Created in WordPress admin
2. **REST API**: Served via WordPress REST API endpoints
3. **Caching**: Fetched and cached in memory on app startup
4. **Display**: Rendered via Next.js components with Tailwind styling
5. **Analytics**: View counts tracked via Post Views Counter plugin
6. **SEO**: Optimized with RankMath or fallback WP meta

---

## 📋 Future Considerations

- **Internationalization**: Multi-language support (Hindi, Sanskrit, etc.)
- **Advanced Search**: Full-text search with filters
- **Community**: User comments and discussions
- **Memberships**: Premium content tiers
- **Mobile App**: Native iOS/Android apps
- **Podcast Integration**: Audio versions of posts
- **Certification**: Learning paths and certificates

---

## 📞 Contact & Support

For technical questions or content updates, refer to:
- **Contact Form**: `/contact`
- **Privacy**: `/privacy`
- **Terms**: `/terms`
- **Medical Disclaimer**: `/medical-disclaimer`

---

**Last Updated**: May 2026  
**Version**: 1.0  
**Status**: Active Development
