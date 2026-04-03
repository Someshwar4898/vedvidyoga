import { useState, useEffect } from "react";
import { posts as mockPosts } from "../data/mockPosts";
import { getPosts, isWPConnected } from "../services/api";

// Returns { posts, loading, error }
// Automatically uses WordPress when VITE_WP_API_URL is set, mock data otherwise
export function usePosts({ categorySlug, subcategorySlug } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        let data;

        if (isWPConnected()) {
          data = await getPosts();
          // If WP returned nothing, fall back to mock so the UI isn't empty during development
          if (data.length === 0) data = mockPosts;
        } else {
          data = mockPosts;
        }

      // Filter client-side
        if (subcategorySlug) {
          // Subcategory page: only posts from that specific subcategory
          data = data.filter((p) => p.subcategorySlug === subcategorySlug);
        } else if (categorySlug) {
          // Category page: all posts across all subcategories of this category
          data = data.filter((p) => p.categorySlug === categorySlug);
        }
        // No filter = All Blogs page, show everything
        if (!cancelled) setPosts(data);
      } catch (err) {
        if (!cancelled) {
          console.warn("WordPress fetch failed, falling back to mock data:", err.message);
          // Fallback to mock on error
          let data = mockPosts;
          if (subcategorySlug) data = data.filter((p) => p.subcategorySlug === subcategorySlug);
          else if (categorySlug) data = data.filter((p) => p.categorySlug === categorySlug);
          setPosts(data);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [categorySlug, subcategorySlug]);

  return { posts, loading, error };
}
