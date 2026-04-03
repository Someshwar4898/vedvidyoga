import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import PostCard from "./PostCard";
import { getTrendingPosts, isWPConnected } from "../services/api";
import { posts as mockPosts } from "../data/mockPosts";

function TrendingPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        let data;
        if (isWPConnected()) {
          data = await getTrendingPosts();
          // If WP returns nothing, fall back to mock trending posts
          if (data.length === 0) {
            data = mockPosts.filter(p => p.trending).slice(0, 4);
          }
        } else {
          data = mockPosts.filter(p => p.trending).slice(0, 4);
        }
        if (!cancelled) setPosts(data);
      } catch {
        if (!cancelled) setPosts(mockPosts.filter(p => p.trending).slice(0, 4));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <section>
      <div className="mb-8 flex items-center gap-3">
        <Flame size={22} className="text-saffron" />
        <div>
          <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">Trending blogs</h2>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Most-read posts across the site.</p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onPostClick={() => {}} />
        ))}
      </div>
    </section>
  );
}

export default TrendingPosts;
