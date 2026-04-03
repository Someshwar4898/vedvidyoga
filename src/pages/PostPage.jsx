import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { usePosts } from "../hooks/usePosts";
import { useWPStyles } from "../hooks/useWPStyles";
import LogoLoader from "../components/LogoLoader";
import RelatedPosts from "../components/RelatedPosts";
import { incrementPostView } from "../services/views";

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
        <Link to="/blog" className="text-saffron hover:text-saffron-dark font-medium transition">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-stone-400 dark:text-stone-500 mb-10">
          <Link to="/blog" className="hover:text-saffron dark:text-stone-400 transition">Blog</Link>
          <span>›</span>
          <Link to={`/${post.categorySlug}`} className="hover:text-saffron dark:text-stone-400 transition">{post.categoryName}</Link>
          <span>›</span>
          <Link to={
            post.subcategorySlug
              ? `/${post.categorySlug}/${post.subcategorySlug}`
              : `/${post.categorySlug}`
            } className="hover:text-saffron dark:text-stone-400 transition">{post.subcategoryName}</Link>
        </nav>

        {/* Pills */}
        <div className="flex gap-2 mb-6 text-xs font-semibold uppercase tracking-[0.16em]">
          <span className="rounded-full bg-saffron-pill px-3 py-1.5 text-saffron-muted">{post.categoryName}</span>
          <span className="rounded-full bg-sub-pill dark:bg-stone-800 dark:text-stone-400 px-3 py-1.5 text-stone-500">{post.subcategoryName}</span>
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
          <span>{post.readTime}</span>
        </div>

        {/* Hero image — WordPress featured image */}
        {post.image && (
          <div className="rounded-[1.75rem] overflow-hidden mb-12">
            <img src={post.image} alt={post.title} className="w-full" />
          </div>
        )}

        {/* Body — WP HTML content or placeholder */}
        {post.content ? (
          <div
            className="wp-content post-content entry-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
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

        {/* Related posts — passes all WP category IDs so both category and subcategory matches are included */}
        <RelatedPosts
          postId={post.id}
          categoryIds={post.categoryIds}
        />

        {/* Back link */}
        <div className="mt-16 pt-10 border-t border-[#f0e3d3] dark:border-stone-700">
          <Link
            to={post.subcategorySlug ? `/${post.categorySlug}/${post.subcategorySlug}` : `/${post.categorySlug}`}
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
