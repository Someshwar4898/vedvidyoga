import { Link } from "react-router-dom";
import { BookmarkCheck } from "lucide-react";
import PostCard from "./PostCard";

function FeaturedPosts({ posts, loading }) {
  const featured = posts.filter((p) => p.featured).slice(0, 4);

  if (!loading && featured.length === 0) return null;

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 text-saffron-muted">
            <BookmarkCheck size={18} />
            <p className="text-sm font-semibold uppercase tracking-[0.24em]">Featured</p>
          </div>
          <h3 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Featured blogs
          </h3>
          <p className="mt-1 text-sm leading-7 text-stone-500 dark:text-stone-400">
            Thoughtfully selected pieces that define the depth of this site
          </p>
        </div>
        <Link
          to="/blog"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-saffron hover:text-saffron-muted transition shrink-0"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-[#fffdf9] dark:bg-stone-800 h-80"
              />
            ))
          : featured.map((post) => (
              <PostCard key={post.id} post={post} onPostClick={() => {}} />
            ))}
      </div>
    </section>
  );
}

export default FeaturedPosts;
