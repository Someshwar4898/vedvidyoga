// useWPStyles — harvests WordPress's generated <style> tags and injects them
// into the React app's <head> so blocks render exactly as they do on WordPress.
//
// Why this exists:
//   WordPress generates CSS on the server for each page — things like
//   CSS variables (colours, font sizes, spacing) from theme.json, and
//   per-block style overrides. None of this is available via the REST API.
//   We fetch the actual WordPress page HTML, pull out those <style> tags,
//   and inject them once so any post renders correctly.
//
// CORS requirement:
//   This only works if your WordPress server sends
//     Access-Control-Allow-Origin: *
//   for normal page requests (not just /wp-json). Add this to your
//   WordPress theme's functions.php:
//     add_action('send_headers', fn() => header('Access-Control-Allow-Origin: *'));

import { useEffect } from "react";

const BASE = process.env.NEXT_PUBLIC_WP_API_URL ?? "";

// Style IDs we want to harvest from WordPress's HTML output.
// WordPress outputs these as <style id="..."> in the <head>.
const HARVEST_PREFIXES = [
  "global-styles",          // theme.json → CSS variables for colours, fonts, spacing
  "wp-block-",              // per-block generated styles
  "classic-theme-styles",   // classic theme baseline
];

// Track what we've already injected so we never double-inject
const injected = new Set();

// Harvest once per WordPress post URL — cached in module scope
const fetchCache = new Map();

async function harvestStylesFromURL(wpPageURL) {
  if (fetchCache.has(wpPageURL)) return fetchCache.get(wpPageURL);

  const promise = fetch(wpPageURL, { mode: "cors" })
    .then((r) => {
      if (!r.ok) throw new Error(`${r.status}`);
      return r.text();
    })
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const styles = [];

      doc.querySelectorAll("style[id]").forEach((el) => {
        const matches = HARVEST_PREFIXES.some((p) => el.id.startsWith(p));
        if (matches) styles.push({ id: el.id, css: el.textContent });
      });

      return styles;
    })
    .catch(() => []); // CORS blocked or network error — silent fallback

  fetchCache.set(wpPageURL, promise);
  return promise;
}

// WordPress's global-styles CSS contains rules like:
//   body { background-color: #fff; color: #000; }
//   html { font-size: 18px; }
//   :root { --wp--...: ...; }
//
// If injected as-is, those body/html rules would overwrite our React app's
// background and typography everywhere. We re-scope them to .entry-content
// so they only apply inside the post content wrapper, not the whole app.
// CSS custom properties (variables) are preserved at :root level because
// they don't affect visual output on their own — blocks read them internally.
function scopeGlobalSelectors(css) {
  // Match selectors that are exactly body, html, or :root (not e.g. .body-text)
  // and replace them with .entry-content so they're scoped to post content.
  return css.replace(
    /(?<![a-zA-Z0-9_-])(body|html)(?![a-zA-Z0-9_-])/g,
    ".entry-content"
  );
}

function injectStyles(styles) {
  styles.forEach(({ id, css }) => {
    const tagId = `wp-harvested-${id}`;
    if (injected.has(tagId) || document.getElementById(tagId)) return;

    const el = document.createElement("style");
    el.id = tagId;
    // 1. Scope body/html selectors to .entry-content (prevents shell bleed).
    // 2. Wrap in @layer wp-imported — unlayered styles in index.css always
    //    win over layered styles by CSS spec, no !important needed.
    //    Client-chosen inline style="background-color:..." on blocks still
    //    wins because inline styles are outside the cascade entirely.
    el.textContent = `@layer wp-imported { ${scopeGlobalSelectors(css)} }`;
    document.head.appendChild(el);
    injected.add(tagId);
  });
}

// postId  — WordPress post ID (integer). Uses WP REST API endpoint.
// Avoids frontend page routes (`/` and `/?p=`) that can redirect and break CORS.
export function useWPStyles(postId) {
  useEffect(() => {
    if (!BASE || !postId) return;

    const url = `${BASE}/?p=${postId}`;
    harvestStylesFromURL(url).then(injectStyles);
  }, [postId]);
}
