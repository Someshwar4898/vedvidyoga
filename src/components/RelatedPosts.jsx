import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { getRelatedPosts, isWPConnected } from "../services/api";
import { posts as mockPosts } from "../data/mockPosts";

// Shows up to 3 posts that share the same category or subcategory as the current post.
// categoryIds   — array of WP category IDs (parent + subcategory), used when WP is connected
// categorySlug  — parent category slug, used for mock data fallback
// subcategorySlug — subcategory slug, used to broaden mock data fallback
// postId        — the current post to exclude
function RelatedPosts({ postId, categoryIds, categorySlug, subcategorySlug }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        let data;
        const ids = Array.isArray(categoryIds) ? categoryIds.filter(Boolean) : [];

        if (isWPConnected() && ids.length > 0) {
          data = await getRelatedPosts(ids, postId);
          // If WP returns nothing, fall through to mock
          if (data.length === 0) {
            data = mockFallback(postId, categorySlug, subcategorySlug);
          }
        } else {
          data = mockFallback(postId, categorySlug, subcategorySlug);
        }

        if (!cancelled) setPosts(data);
      } catch {
        if (!cancelled) setPosts(mockFallback(postId, categorySlug, subcategorySlug));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [postId, categoryIds, categorySlug, subcategorySlug]);

  if (loading || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-[#f0e3d3] dark:border-stone-700">
      <h2 className="mb-6 text-xl font-semibold text-stone-900 dark:text-stone-100">Related posts</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onPostClick={() => {}} />
        ))}
      </div>
    </section>
  );
}

// Matches posts in the same category OR subcategory, excludes the current post
function mockFallback(postId, categorySlug, subcategorySlug) {
  return mockPosts
    .filter(p =>
      p.id !== postId &&
      (p.categorySlug === categorySlug || (subcategorySlug && p.subcategorySlug === subcategorySlug))
    )
    .slice(0, 3);
}

export default RelatedPosts;
