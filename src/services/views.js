const BASE = import.meta.env.VITE_WP_API_URL ?? "";

// Increment the Post Views Counter for a given post ID.
// Fires on every page load — no deduplication.
export async function incrementPostView(postId) {
  if (!postId || !BASE) return;
  try {
    await fetch(`${BASE}/wp-json/post-views-counter/v1/post/${postId}`, {
      method: "POST",
    });
  } catch {
    // View counting is non-critical — fail silently
  }
}
