import { useState, useEffect } from "react";
import { categories as staticCategories } from "../data/categories";
import { getNavCategories, isWPConnected } from "../services/api";

// Module-level cache — fetches once, shared across all components
let _cache = null;
let _promise = null;

async function loadCategories() {
  if (_cache) return _cache;
  if (_promise) return _promise;

  if (!isWPConnected()) {
    _cache = staticCategories;
    return _cache;
  }

  _promise = getNavCategories()
    .then((cats) => { _cache = cats; return _cache; })
    .catch(() => {
      console.warn("WP categories unavailable, using static fallback");
      _cache = staticCategories;
      return _cache;
    });

  return _promise;
}

export function useCategories() {
  const [categories, setCategories] = useState(_cache ?? []);
  const [loading, setLoading] = useState(!_cache);

  useEffect(() => {
    if (_cache) { setCategories(_cache); setLoading(false); return; }
    loadCategories().then((cats) => { setCategories(cats); setLoading(false); });
  }, []);

  return { categories, loading };
}
