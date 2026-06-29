import { NextResponse } from "next/server";
import { fetchPaginatedContent, getCategoryMap, getPostUrl, escapeXML, wrapInUrlset } from "../utils";

export const revalidate = 43200; // 12 hours

export async function GET() {
  try {
    const [posts, categoryMap] = await Promise.all([
      fetchPaginatedContent("/posts", {
        query: { _fields: "slug,modified,status,categories", orderby: "modified", order: "desc" },
      }),
      getCategoryMap(),
    ]);

    const paths = posts
      .filter((post) => post.status === "publish")
      .map((post) => ({
        loc: getPostUrl(post, categoryMap),
        lastmod: new Date(post.modified).toISOString(),
        changefreq: "weekly",
        priority: "0.7",
      }));

    const urlEntries = paths
      .map(
        (page) => `  <url>
    <loc>${escapeXML(page.loc)}</loc>
    <lastmod>${escapeXML(page.lastmod)}</lastmod>
    <changefreq>${escapeXML(page.changefreq)}</changefreq>
    <priority>${escapeXML(page.priority)}</priority>
  </url>`
      )
      .join("\n");

    const xml = wrapInUrlset(urlEntries);

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=43200, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("Error generating posts sitemap:", err.message);
    return new NextResponse(wrapInUrlset(""), {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }
}
