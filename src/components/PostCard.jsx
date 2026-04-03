import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";

function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} ${n === 1 ? "view" : "views"}`;
}

function PostCard({ post, onPostClick }) {
  const navigate = useNavigate();
  const url = post.subcategorySlug
    ? `/${post.categorySlug}/${post.subcategorySlug}/${post.slug}`
    : `/post/${post.slug}`;

  function handleCardClick() {
    onPostClick(post.slug);
    navigate(url);
  }

  return (
    <div
      onClick={handleCardClick}
      className="group overflow-hidden rounded-[1.75rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 shadow-[0_18px_50px_rgba(102,74,44,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(102,74,44,0.13)] flex flex-col cursor-pointer"
    >

      {/* Image — uses WordPress featured image; shows branded placeholder if none set */}
      <div className="overflow-hidden bg-[#f5ede0] flex items-center justify-center h-56">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/logo.png";
              e.currentTarget.className = "h-32 w-32 object-contain opacity-20";
            }}
          />
        ) : (
          <img src="/logo.png" alt="VedVidYoga" className="h-24 w-24 object-contain opacity-20" />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">

        {/* Category + subcategory pills */}
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
          <Link
            to={`/${post.categorySlug}`}
            onClick={(e) => e.stopPropagation()}
            className="rounded-full bg-saffron-pill dark:bg-stone-800 dark:text-saffron px-3 py-1.5 text-saffron-muted hover:bg-saffron hover:text-white transition"
          >
            {post.categoryName}
          </Link>
          <Link
            to={`/${post.categorySlug}/${post.subcategorySlug}`}
            onClick={(e) => e.stopPropagation()}
            className="rounded-full bg-sub-pill dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-200 px-3 py-1.5 text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            {post.subcategoryName}
          </Link>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold leading-8 text-stone-900 dark:text-stone-100 group-hover:text-saffron transition line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Author + views (falls back to read time for mock data) */}
        <div className="mt-5 flex items-center justify-between text-sm text-stone-500 dark:text-stone-500">
          <span>{post.author}</span>
          <span className="inline-flex items-center gap-1.5">
            <Eye size={13} />
            {post.views != null ? formatViews(post.views) : post.readTime}
          </span>
        </div>

        {/* Date + Read more */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">{post.date}</span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-saffron-medium group-hover:text-saffron transition">
            Read more <ArrowRight size={16} />
          </span>
        </div>

      </div>
    </div>
  );
}

export default PostCard;
