import { useState, useEffect } from "react";
import { getPosts } from "../services/api";

// Module-level cache — fetches once on first call, reused by every component.
// Same pattern as useCategories. Eliminates duplicate WP API calls across pages.
let _cache = null;
let _promise = null;

async function loadPosts() {
  if (_cache) return _cache;
  if (_promise) return _promise;

  _promise = getPosts()
    .then((posts) => { _cache = posts; return _cache; })
    .catch((err) => {
      _promise = null; // allow retry on next call
      throw err;
    });

  return _promise;
}

// Returns { posts, loading, error }
export function usePosts({ categorySlug, subcategorySlug } = {}) {
  const [posts, setPosts] = useState(() => {
    if (!_cache) return [];
    if (subcategorySlug) return _cache.filter((p) => p.subcategorySlug === subcategorySlug);
    if (categorySlug) return _cache.filter((p) => p.categorySlug === categorySlug);
    return _cache;
  });
  const [loading, setLoading] = useState(!_cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (_cache) {
      let data = _cache;
      if (subcategorySlug) data = data.filter((p) => p.subcategorySlug === subcategorySlug);
      else if (categorySlug) data = data.filter((p) => p.categorySlug === categorySlug);
      setPosts(data);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    loadPosts()
      .then((all) => {
        if (cancelled) return;
        let data = all;
        if (subcategorySlug) data = data.filter((p) => p.subcategorySlug === subcategorySlug);
        else if (categorySlug) data = data.filter((p) => p.categorySlug === categorySlug);
        setPosts(data);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("WordPress fetch failed:", err.message);
          setError(err.message);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [categorySlug, subcategorySlug]);

  return { posts, loading, error };
}
