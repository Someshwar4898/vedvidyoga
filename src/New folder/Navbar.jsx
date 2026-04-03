import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronRight, ArrowRight, Search, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useCategories } from "../hooks/useCategories";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null);
  const [hoveredCat, setHoveredCat] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const { categories } = useCategories();

  const activeCatData = categories.find((c) => c.slug === hoveredCat) ?? null;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#eadbc7]/80 bg-cream/95 backdrop-blur-xl dark:border-stone-800 dark:bg-stone-950/95">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between py-2">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Saffron Stories" className="h-20 logo-img" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition ${isActive("/") ? "text-saffron" : "text-stone-700 dark:text-stone-100 hover:text-saffron"}`}>
            Home
          </Link>

          {/* Blog mega dropdown */}
          <div
            className="group relative"
            onMouseLeave={() => setHoveredCat(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-stone-700 dark:text-stone-100 hover:text-saffron transition">
              Blog <ChevronDown size={16} />
            </button>

            {/* pt-4 bridges the gap between button and panel so hover doesn't break */}
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 pt-4">
              <div className="flex rounded-[1.5rem] border border-[#eadbc7] dark:border-stone-700 bg-white dark:bg-stone-900 p-3 shadow-[0_20px_60px_rgba(102,74,44,0.12)]">

                {/* Left panel — category list */}
                <div className="w-56 border-r border-[#f3e7d8] dark:border-stone-700 pr-3">
                  <Link
                    to="/blog"
                    onMouseEnter={() => setHoveredCat(null)}
                    className="mb-2 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 dark:text-stone-100 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-800 transition"
                  >
                    All Blogs <ArrowRight size={16} />
                  </Link>

                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/${cat.slug}`}
                      onMouseEnter={() => setHoveredCat(cat.slug)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        hoveredCat === cat.slug
                          ? "bg-saffron-light text-saffron dark:bg-stone-800"
                          : "text-stone-700 dark:text-stone-100 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-800"
                      }`}
                    >
                      {cat.name} <ChevronRight size={16} />
                    </Link>
                  ))}
                </div>

                {/* Right panel — subcategories or editorial info */}
                <div className="w-72 pl-4">
                  {activeCatData ? (
                    <>
                      <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-[0.24em] text-saffron-muted">
                        {activeCatData.name}
                      </p>
                      {activeCatData.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/${activeCatData.slug}/${sub.slug}`}
                          className="block rounded-2xl px-3 py-3 text-sm text-stone-700 dark:text-stone-100 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-800 transition"
                        >
                          <span className="block font-medium">{sub.name}</span>
                          {sub.description && (
                            <span className="mt-1 block text-xs leading-5 text-stone-500 dark:text-stone-400">
                              {sub.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-saffron-muted">Editorial Structure</p>
                      <h3 className="mt-3 text-xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">Every blog view keeps the same clean flow</h3>
                      <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">
                        Hover a category to explore its subcategories and navigate directly to the content you want.
                      </p>
                    </>
                  )}
                </div>

              </div>
            </div>
          </div>

          <Link to="/about" className={`text-sm font-medium transition ${isActive("/about") ? "text-saffron" : "text-stone-700 dark:text-stone-100 hover:text-saffron"}`}>About Us</Link>
          <Link to="/contact" className={`text-sm font-medium transition ${isActive("/contact") ? "text-saffron" : "text-stone-700 dark:text-stone-100 hover:text-saffron"}`}>Contact Us</Link>
          <Link to="/privacy" className={`text-sm font-medium transition ${isActive("/privacy") ? "text-saffron" : "text-stone-700 dark:text-stone-100 hover:text-saffron"}`}>Privacy Policy</Link>
        </div>

        {/* Search + hamburger */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 rounded-full border border-[#eadbc7] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm hover:border-saffron/40 hover:text-saffron transition">
            <Search size={16} /> Search articles
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full border border-[#eadbc7] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-200 text-stone-700 shadow-sm"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#eadbc7] dark:border-stone-800 px-5 py-4 space-y-2">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700">Home</Link>

          <button
            onClick={() => setMobileBlogOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700"
          >
            Blog <ChevronDown size={16} className={mobileBlogOpen ? "rotate-180 transition" : "transition"} />
          </button>

          {mobileBlogOpen && (
            <div className="space-y-2 rounded-[1.5rem] border border-[#f0e3d3] bg-[#fffdf9] dark:bg-stone-900 dark:border-stone-800 p-3">
              <Link to="/blog" onClick={() => setMobileOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-600 dark:text-stone-200 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-800 transition">All Blogs</Link>
              {categories.map((cat) => (
                <div key={cat.slug} className="rounded-2xl border border-[#f4eadf] bg-white dark:bg-stone-900 dark:border-stone-800 p-2">
                  <button
                    onClick={() => setMobileExpandedCat((p) => p === cat.slug ? null : cat.slug)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-stone-700 dark:text-stone-100"
                  >
                    {cat.name}
                    <ChevronDown size={16} className={mobileExpandedCat === cat.slug ? "rotate-180 transition" : "transition"} />
                  </button>
                  {mobileExpandedCat === cat.slug && (
                    <div className="mt-2 space-y-1 border-t border-[#f4eadf] pt-2">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/${cat.slug}/${sub.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-2xl px-4 py-2.5 text-sm text-stone-600 dark:text-stone-200 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-800 transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <Link to="/about" onClick={() => setMobileOpen(false)} className="block rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700">About Us</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="block rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700">Contact Us</Link>
          <Link to="/privacy" onClick={() => setMobileOpen(false)} className="block rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700">Privacy Policy</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
