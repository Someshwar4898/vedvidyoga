'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { usePosts } from '../../src/hooks/usePosts';
import { useCategories } from '../../src/hooks/useCategories';
import { useCaseStudies } from '../../src/hooks/useCaseStudies';

export default function SitemapPage() {
  const [expandedSections, setExpandedSections] = useState({
    pages: true,
    posts: true,
    categories: true,
    caseStudies: true,
    images: true,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading: postsLoading } = usePosts();
  const { categories, loading: categoriesLoading } = useCategories();
  const { caseStudies, loading: caseStudiesLoading } = useCaseStudies();

  const staticPages = [
    { title: 'Home', href: '/', lastmod: new Date().toISOString().split('T')[0] },
    { title: 'Blog', href: '/blog', lastmod: new Date().toISOString().split('T')[0] },
    { title: 'About', href: '/about', lastmod: new Date().toISOString().split('T')[0] },
    { title: 'Case Studies', href: '/case-studies', lastmod: new Date().toISOString().split('T')[0] },
    { title: 'Contact', href: '/contact', lastmod: new Date().toISOString().split('T')[0] },
    { title: 'Medical Disclaimer', href: '/medical-disclaimer', lastmod: new Date().toISOString().split('T')[0] },
    { title: 'Privacy Policy', href: '/privacy', lastmod: new Date().toISOString().split('T')[0] },
    { title: 'Terms & Conditions', href: '/terms', lastmod: new Date().toISOString().split('T')[0] },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const filteredPages = staticPages.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCaseStudies = caseStudies.filter(cs => cs.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = filteredPages.length + filteredPosts.length + filteredCategories.length + filteredCaseStudies.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Sitemap</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Browse all pages, posts, categories, and case studies
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          Showing {totalPages} results
        </div>

        {/* Static Pages Section */}
        <SitemapSection
          title="Pages"
          icon="📄"
          items={filteredPages.map(p => ({ title: p.title, href: p.href }))}
          expanded={expandedSections.pages}
          onToggle={() => toggleSection('pages')}
          isEmpty={filteredPages.length === 0 && searchQuery !== ''}
        />

        {/* Posts Section */}
        <SitemapSection
          title="Blog Posts"
          icon="📝"
          items={filteredPosts.map(p => ({ title: p.title, href: `/post/${p.slug}` }))}
          expanded={expandedSections.posts}
          onToggle={() => toggleSection('posts')}
          loading={postsLoading}
          isEmpty={filteredPosts.length === 0 && searchQuery !== '' && !postsLoading}
        />

        {/* Categories Section */}
        <SitemapSection
          title="Categories"
          icon="🏷️"
          items={filteredCategories.map(c => ({ title: c.name, href: `/category/${c.slug}` }))}
          expanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
          loading={categoriesLoading}
          isEmpty={filteredCategories.length === 0 && searchQuery !== '' && !categoriesLoading}
        />

        {/* Case Studies Section */}
        <SitemapSection
          title="Case Studies"
          icon="💼"
          items={filteredCaseStudies.map(cs => ({ title: cs.title, href: `/case-studies/${cs.slug}` }))}
          expanded={expandedSections.caseStudies}
          onToggle={() => toggleSection('caseStudies')}
          loading={caseStudiesLoading}
          isEmpty={filteredCaseStudies.length === 0 && searchQuery !== '' && !caseStudiesLoading}
        />

        {/* Image Sitemaps Section */}
        <SitemapSection
          title="Image Sitemaps"
          icon="🖼️"
          items={[
            { title: 'Blog Post Images', href: '/sitemap/posts-images.xml', external: true },
            { title: 'Case Study Images', href: '/sitemap/case-studies-images.xml', external: true },
          ]}
          expanded={expandedSections.images}
          onToggle={() => toggleSection('images')}
          isExternal={true}
        />

        {/* XML Sitemaps Section */}
        <div className="mt-12 pt-8 border-t border-slate-300 dark:border-slate-600">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">XML Sitemaps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SitemapLink
              href="/sitemap.xml"
              title="Main Sitemap Index"
              description="Master index of all sitemaps"
            />
            <SitemapLink
              href="/sitemap/pages.xml"
              title="Pages Sitemap"
              description="Static pages and main sections"
            />
            <SitemapLink
              href="/sitemap/posts.xml"
              title="Posts Sitemap"
              description="All blog posts and articles"
            />
            <SitemapLink
              href="/sitemap/categories.xml"
              title="Categories Sitemap"
              description="All category pages"
            />
            <SitemapLink
              href="/sitemap/case-studies.xml"
              title="Case Studies Sitemap"
              description="All case study pages"
            />
            <SitemapLink
              href="/sitemap/posts-images.xml"
              title="Post Images Sitemap"
              description="Images in blog posts"
            />
          </div>
        </div>

        {/* SEO Info */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">About This Sitemap</h3>
          <p className="text-blue-800 dark:text-blue-200">
            This page helps search engines and visitors navigate all content on vedvidyoga.com. 
            The XML sitemaps below are automatically submitted to search engines and updated with every content change. 
            Use the search feature above to quickly find what you're looking for.
          </p>
        </div>
      </div>
    </main>
  );
}

function SitemapSection({
  title,
  icon,
  items,
  expanded,
  onToggle,
  loading = false,
  isEmpty = false,
  isExternal = false,
}) {
  if (isEmpty && !isExternal) {
    return null;
  }

  return (
    <div className="mb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Section Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
            <span className="ml-2 text-sm font-normal text-slate-600 dark:text-slate-400">
              ({items.length})
            </span>
          </h2>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-600 dark:text-slate-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Section Content */}
      {expanded && (
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 py-4">No items found</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {items.map((item, idx) => (
                <li key={idx}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline py-2 px-2 rounded hover:bg-white dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-sm">{item.title}</span>
                      <span className="text-xs">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-blue-600 dark:text-blue-400 hover:underline py-2 px-2 block rounded hover:bg-white dark:hover:bg-slate-800 transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function SitemapLink({ href, title, description }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
    >
      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-mono">{href}</p>
    </a>
  );
}
