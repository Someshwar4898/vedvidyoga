import { useState, useEffect } from "react";
import { getPosts } from "../services/api";

// Returns { posts, loading, error }
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
        let data = await getPosts();

        // Filter client-side
        if (subcategorySlug) {
          data = data.filter((p) => p.subcategorySlug === subcategorySlug);
        } else if (categorySlug) {
          data = data.filter((p) => p.categorySlug === categorySlug);
        }

        if (!cancelled) setPosts(data);
      } catch (err) {
        if (!cancelled) {
          console.error("WordPress fetch failed:", err.message);
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
