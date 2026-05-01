"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import { usePosts } from "../hooks/usePosts";
import { useWPStyles } from "../hooks/useWPStyles";
import LogoLoader from "../components/LogoLoader";
import RelatedPosts from "../components/RelatedPosts";
import TableOfContents, { injectHeadingIds } from "../components/TableOfContents";
import PostFAQ from "../components/PostFAQ";
import PostDisclaimer from "../components/PostDisclaimer";
import PostAuthorCard from "../components/PostAuthorCard";
import { incrementPostView } from "../services/views";

function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} ${n === 1 ? "view" : "views"}`;
}

function PostPage() {
  const { slug } = useParams();
  const { posts, loading } = usePosts();

  const post = posts.find((p) => p.slug === slug);

  // Harvest WordPress's generated <style> tags (global styles CSS variables,
  // per-block styles, etc.) and inject them into the React <head>.
  // Falls back silently if WordPress CORS isn't enabled for page requests.
  useWPStyles(post?.id);

  // Increment view count once per browser session per post
  useEffect(() => {
    if (post?.id) incrementPostView(post.id);
  }, [post?.id]);

  if (loading) {
    return <LogoLoader />;
  }

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-24 text-center">
        <p className="text-stone-400 text-lg mb-4">Post not found.</p>
        <Link href="/blog" className="text-saffron hover:text-saffron-dark font-medium transition">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-stone-400 dark:text-stone-500 mb-10">
          <Link href="/blog" className="hover:text-saffron dark:text-stone-400 transition">Blog</Link>
          <span>›</span>
          <Link href={`/${post.categorySlug}`} className="hover:text-saffron dark:text-stone-400 transition">{post.categoryName}</Link>
          {post.subcategorySlug && (
            <>
              <span>›</span>
              <Link href={`/${post.categorySlug}/${post.subcategorySlug}`} className="hover:text-saffron dark:text-stone-400 transition">{post.subcategoryName}</Link>
            </>
          )}
        </nav>

        {/* Pills */}
        <div className="flex gap-2 mb-6 text-xs font-semibold uppercase tracking-[0.16em]">
          <span className="rounded-full bg-saffron-pill px-3 py-1.5 text-saffron-muted">{post.categoryName}</span>
          {post.subcategoryName && (
            <span className="rounded-full bg-sub-pill dark:bg-stone-800 dark:text-stone-400 px-3 py-1.5 text-stone-500">{post.subcategoryName}</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-stone-400 dark:text-stone-500 mb-10 pb-10 border-b border-[#f0e3d3] dark:border-stone-700">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <Eye size={13} />
            {post.views != null ? formatViews(post.views) : "—"}
          </span>
        </div>

        {/* Hero image — WordPress featured image */}
        {post.image && (
          <div className="rounded-[1.75rem] overflow-hidden mb-12">
            <img src={post.image} alt={post.imageAlt || post.title} className="w-full" />
          </div>
        )}

        {/* Table of Contents — auto-parsed from post headings */}
        {post.content && <TableOfContents content={post.content} />}

        {/* Body — WP HTML content or placeholder */}
        {post.content ? (
          <div
            className="wp-content post-content entry-content"
            dangerouslySetInnerHTML={{ __html: injectHeadingIds(post.content) }}
          />
        ) : (
          <div className="space-y-6 text-stone-700 dark:text-stone-300 leading-8">
            <p className="text-xl font-medium text-stone-800 dark:text-stone-200">{post.excerpt}</p>
            <p className="text-stone-600 dark:text-stone-400">
              This is where the full article content will appear once connected to the WordPress backend. WordPress will serve the complete post body through its REST API, and this page will render it here automatically.
            </p>
            <p className="text-stone-600 dark:text-stone-400">
              Each post will include rich text, images, pull quotes, and any other content the author has written in the WordPress editor — all flowing into this clean reading layout.
            </p>
          </div>
        )}

        {/* About the Author — static, shown on every post */}
        <PostAuthorCard />

        {/* Disclaimer — from ACF textarea on the blog post */}
        <PostDisclaimer content={post.disclaimer} />

        {/* FAQs — parsed from ACF textarea on the blog post */}
        <PostFAQ raw={post.faqs} />

        {/* Related posts — passes all WP category IDs so both category and subcategory matches are included */}
        <RelatedPosts
          postId={post.id}
          categoryIds={post.categoryIds}
        />

        {/* Back link */}
        <div className="mt-16 pt-10 border-t border-[#f0e3d3] dark:border-stone-700">
          <Link
            href={post.subcategorySlug ? `/${post.categorySlug}/${post.subcategorySlug}` : `/${post.categorySlug}`}
            className="inline-flex items-center gap-2 text-saffron font-medium hover:text-saffron-dark transition"
          >
            <ArrowLeft size={16} /> Back to {post.subcategoryName || post.categoryName}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default PostPage;
