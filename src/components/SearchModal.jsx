import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { usePosts } from "../hooks/usePosts";
import { useCategories } from "../hooks/useCategories";

function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { posts } = usePosts();
  const { categories } = useCategories();

  // Focus input when modal opens
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const q = query.trim().toLowerCase();

  const matchedPosts = q.length < 2 ? [] : posts.filter((p) =>
    p.title.toLowerCase().includes(q)
  ).slice(0, 5);

  const matchedCategories = q.length < 2 ? [] : categories.filter((c) =>
    c.name.toLowerCase().includes(q)
  );

  const matchedSubcategories = q.length < 2 ? [] : categories.flatMap((c) =>
    (c.subcategories ?? [])
      .filter((s) => s.name.toLowerCase().includes(q))
      .map((s) => ({ ...s, parentSlug: c.slug, parentName: c.name }))
  ).slice(0, 5);

  const hasResults = matchedPosts.length > 0 || matchedCategories.length > 0 || matchedSubcategories.length > 0;

  function go(path) {
    navigate(path);
    onClose();
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-xl rounded-[1.75rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 shadow-[0_30px_80px_rgba(102,74,44,0.18)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0e3d3] dark:border-stone-700">
          <Search size={18} className="text-saffron flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a blog, category, or topic..."
            className="flex-1 bg-transparent text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400 outline-none"
          />
          <button onClick={onClose} className="text-stone-400 hover:text-saffron transition">
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        {q.length >= 2 && (
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">

            {!hasResults && (
              <p className="py-6 text-center text-sm text-stone-400 dark:text-stone-500">No results for "{query}"</p>
            )}

            {matchedCategories.length > 0 && (
              <div>
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-saffron-muted">Categories</p>
                {matchedCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => go(`/${cat.slug}`)}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-saffron-light dark:hover:bg-stone-800 transition"
                  >
                    <span className="text-sm font-semibold text-stone-800 dark:text-stone-100">{cat.name}</span>
                    {cat.description && (
                      <span className="text-xs text-stone-400 dark:text-stone-500 truncate">{cat.description}</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {matchedSubcategories.length > 0 && (
              <div>
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-saffron-muted">Subcategories</p>
                {matchedSubcategories.map((sub) => (
                  <button
                    key={sub.slug}
                    onClick={() => go(`/${sub.parentSlug}/${sub.slug}`)}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-saffron-light dark:hover:bg-stone-800 transition"
                  >
                    <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{sub.name}</span>
                    <span className="text-xs text-stone-400 dark:text-stone-500">in {sub.parentName}</span>
                  </button>
                ))}
              </div>
            )}

            {matchedPosts.length > 0 && (
              <div>
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-saffron-muted">Blogs</p>
                {matchedPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => go(post.subcategorySlug ? `/${post.categorySlug}/${post.subcategorySlug}/${post.slug}` : `/post/${post.slug}`)}
                    className="flex w-full flex-col rounded-2xl px-3 py-3 text-left hover:bg-saffron-light dark:hover:bg-stone-800 transition"
                  >
                    <span className="text-sm font-medium text-stone-800 dark:text-stone-100 leading-5">{post.title}</span>
                    {post.categoryName && (
                      <span className="mt-1 text-xs text-stone-400 dark:text-stone-500">{post.categoryName}</span>
                    )}
                  </button>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Hint when empty */}
        {q.length < 2 && (
          <p className="py-5 text-center text-xs text-stone-400 dark:text-stone-500">
            Type at least 2 characters to search
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchModal;
