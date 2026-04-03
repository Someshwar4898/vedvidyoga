import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { getRelatedPosts } from "../services/api";

// Shows up to 3 posts that share the same category or subcategory as the current post.
// categoryIds — array of WP category IDs, postId — the current post to exclude
function RelatedPosts({ postId, categoryIds }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const ids = Array.isArray(categoryIds) ? categoryIds.filter(Boolean) : [];
        const data = ids.length > 0 ? await getRelatedPosts(ids, postId) : [];
        if (!cancelled) setPosts(data);
      } catch {
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [postId, categoryIds]);

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


export default RelatedPosts;
