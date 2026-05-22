const BASE = "https://api.vedvidyoga.com";

export async function incrementPostView(postId) {
  if (!postId || !BASE) return null;

  try {
    const res = await fetch(`${BASE}/wp-json/vedvidyoga/v1/count-view/${postId}`, {
      method: "POST",
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("View count failed:", error);
    return null;
  }
}