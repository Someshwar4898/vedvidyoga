// const BASE = process.env.NEXT_PUBLIC_WP_API_URL ?? "";

// // Increment the Post Views Counter for a given post ID.
// // Fires on every page load — no deduplication.
// export async function incrementPostView(postId) {
//   if (!postId || !BASE) return;
//   try {
//     await fetch(`${BASE}/wp-json/post-views-counter/v1/post/${postId}`, {
//       method: "POST",
//     });
//   } catch {
//     // View counting is non-critical — fail silently
//   }
// }
const BASE = process.env.NEXT_PUBLIC_WP_API_URL ?? "";

export async function incrementPostView(postId) {
  if (!postId || !BASE) return;

  try {
    await fetch(`${BASE}/wp-json/post-views-counter/v1/post/${postId}`, {
      method: "GET",
      cache: "no-store",
    });
  } catch {
    // View counting is non-critical
  }
}