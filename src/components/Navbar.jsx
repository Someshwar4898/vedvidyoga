import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, ArrowRight, Search, Menu, X } from "lucide-react";
import SearchModal from "./SearchModal";
import CategoryName from "./CategoryName";
import logo from "../assets/vedvidyoga-logo.webp";
import { useCategories } from "../hooks/useCategories";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [desktopBlogOpen, setDesktopBlogOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const { categories, loading: categoriesLoading } = useCategories();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Reset mobile menu state when route changes (e.g. browser back button)
  useEffect(() => {
    setMobileOpen(false);
    setMobileBlogOpen(false);
    setMobileExpandedCat(null);
  }, [location.pathname]);

  // Close everything at once
  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileBlogOpen(false);
    setMobileExpandedCat(null);
  }

  const activeCatData = categories.find((c) => c.slug === hoveredCat) ?? null;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#eadbc7]/80 bg-cream/95 backdrop-blur-xl dark:border-stone-800 dark:bg-stone-950/95">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between py-2">

        {/* Logo */}
        <Link to="/" onClick={mobileOpen ? closeMobileMenu : undefined} className="flex items-center gap-3">
          <img src={logo} alt="VedVidYoga" className="h-12" />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#b96a1b] via-[#f28c28] to-[#e67d17] bg-clip-text text-transparent">VedVidYoga</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition ${isActive("/") ? "text-saffron" : "text-stone-700 dark:text-stone-100 hover:text-saffron"}`}>
            Home
          </Link>
          <Link to="/about" className={`text-sm font-medium transition ${isActive("/about") ? "text-saffron" : "text-stone-700 dark:text-stone-100 hover:text-saffron"}`}>About Us</Link>
          <Link to="/case-studies" className={`text-sm font-medium transition ${isActive("/case-studies") ? "text-saffron" : "text-stone-700 dark:text-stone-100 hover:text-saffron"}`}>Case Studies</Link>
          {/* Blog mega dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopBlogOpen(true)}
            onMouseLeave={() => { setDesktopBlogOpen(false); setHoveredCat(null); }}
            onFocus={() => setDesktopBlogOpen(true)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) { setDesktopBlogOpen(false); setHoveredCat(null); } }}
          >
            <button
              aria-expanded={desktopBlogOpen}
              className={`flex items-center gap-1 text-sm font-medium transition ${desktopBlogOpen ? "text-saffron" : "text-stone-700 dark:text-stone-100 hover:text-saffron"}`}
            >
              Blogs <ChevronDown size={16} />
            </button>

            {/* pt-4 bridges the gap between button and panel so hover doesn't break */}
            <div className={`transition-all duration-200 absolute top-full left-0 pt-4 ${desktopBlogOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
              <div className="flex rounded-[1.5rem] border border-[#eadbc7] dark:border-stone-700 bg-white dark:bg-stone-900 p-3 shadow-[0_20px_60px_rgba(102,74,44,0.12)] max-h-[420px]">

                {/* Left panel — category list */}
                <div className="w-56 border-r border-[#f3e7d8] dark:border-stone-700 pr-3 flex flex-col">
                  <Link
                    to="/blog"
                    onMouseEnter={() => setHoveredCat(null)}
                    className="mb-2 flex shrink-0 w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 dark:text-stone-100 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-800 transition"
                  >
                    All Blogs <ArrowRight size={16} />
                  </Link>

                  <div className="nav-scroll overflow-y-auto">
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
                        <CategoryName name={cat.name} slug={cat.slug} /> <ChevronRight size={16} />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right panel — subcategories or editorial info */}
                <div className="w-72 pl-4 flex flex-col">
                  {activeCatData ? (
                    <>
                      <p className="shrink-0 px-1 pb-2 text-xs font-semibold uppercase tracking-[0.24em] text-saffron-muted">
                        <CategoryName name={activeCatData.name} slug={activeCatData.slug} />
                      </p>
                      <div className="nav-scroll overflow-y-auto">
                        {activeCatData.subcategories.map((sub) => (
                          <Link
                            key={sub.slug}
                            to={`/${activeCatData.slug}/${sub.slug}`}
                            className="block rounded-2xl px-3 py-3 text-sm text-stone-700 dark:text-stone-100 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-800 transition"
                          >
                            <span className="block font-medium"><CategoryName name={sub.name} slug={sub.slug} /></span>
                            {sub.description && (
                              <span className="mt-1 block text-xs leading-5 text-stone-500 dark:text-stone-400">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
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


          <Link to="/contact" className={`text-sm font-medium transition ${isActive("/contact") ? "text-saffron" : "text-stone-700 dark:text-stone-100 hover:text-saffron"}`}>Contact Us</Link>
        </div>

        {/* Search + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 rounded-full border border-[#eadbc7] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm hover:border-saffron/40 hover:text-saffron transition"
          >
            <Search size={16} /> Search a blog
          </button>
          {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
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
        <div className="lg:hidden border-t border-[#eadbc7] dark:border-stone-800 px-5 py-4 space-y-2 overflow-y-auto max-h-[calc(100dvh-64px)]">
          <Link to="/" onClick={closeMobileMenu} className="block rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700">Home</Link>
          <Link to="/about" onClick={closeMobileMenu} className="block rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700">About Us</Link>
          <Link to="/case-studies" onClick={closeMobileMenu} className="block rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700">Case Studies</Link>

          <button
            onClick={() => setMobileBlogOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700"
          >
            Blogs <ChevronDown size={16} className={mobileBlogOpen ? "rotate-180 transition" : "transition"} />
          </button>

          {mobileBlogOpen && (
            <div className="space-y-2 rounded-[1.5rem] border border-[#f0e3d3] bg-[#fffdf9] dark:bg-stone-900 dark:border-stone-800 p-3">
              <Link to="/blog" onClick={closeMobileMenu} className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-600 dark:text-stone-200 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-800 transition">All Blogs</Link>
              {categoriesLoading ? (
                <p className="px-4 py-3 text-sm text-stone-400 dark:text-stone-500">Loading categories…</p>
              ) : categories.map((cat) => (
                <div key={cat.slug} className="rounded-2xl border border-[#f4eadf] bg-white dark:bg-stone-900 dark:border-stone-800 p-2">
                  {/* Row: tapping the name navigates; tapping the chevron expands */}
                  <div className="flex w-full items-center justify-between rounded-xl px-3 py-2">
                    <Link
                      to={`/${cat.slug}`}
                      onClick={closeMobileMenu}
                      className="flex-1 text-sm font-medium text-stone-700 dark:text-stone-100"
                    >
                      <CategoryName name={cat.name} slug={cat.slug} />
                    </Link>
                    <button
                      onClick={() => setMobileExpandedCat((p) => p === cat.slug ? null : cat.slug)}
                      className="p-1 text-stone-500 dark:text-stone-400"
                    >
                      <ChevronDown size={16} className={mobileExpandedCat === cat.slug ? "rotate-180 transition" : "transition"} />
                    </button>
                  </div>
                  {mobileExpandedCat === cat.slug && (
                    <div className="mt-2 space-y-1 border-t border-[#f4eadf] pt-2">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/${cat.slug}/${sub.slug}`}
                          onClick={closeMobileMenu}
                          className="block rounded-2xl px-4 py-2.5 text-sm text-stone-600 dark:text-stone-200 hover:bg-saffron-light hover:text-saffron dark:hover:bg-stone-800 transition"
                        >
                          {/* Description intentionally hidden on mobile — name only */}
                          <CategoryName name={sub.name} slug={sub.slug} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <Link to="/contact" onClick={closeMobileMenu} className="block rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700">Contact Us</Link>
          <Link to="/privacy" onClick={closeMobileMenu} className="block rounded-2xl border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 px-4 py-3 text-sm font-medium text-stone-700">Privacy Policy</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
