import { NextResponse } from "next/server";
import { fetchPaginatedContent, SITE_URL, RESERVED_FRONTEND_SLUGS, escapeXML, wrapInUrlset } from "../utils";

export const revalidate = 43200; // 12 hours

export async function GET() {
  try {
    const categories = await fetchPaginatedContent("/categories", {
      query: { hide_empty: "false", _fields: "id,slug,parent,count" },
    });
    const categoryMap = Object.fromEntries(categories.map((cat) => [cat.id, cat]));

    const paths = categories.flatMap((cat) => {
      if (cat.slug === "uncategorized" || RESERVED_FRONTEND_SLUGS.has(cat.slug)) return [];

      if (cat.parent === 0) {
        return [
          {
            loc: `${SITE_URL}/${cat.slug}`,
            lastmod: new Date().toISOString(),
            changefreq: "weekly",
            priority: "0.85",
          },
        ];
      }

      const parent = categoryMap[cat.parent];
      if (!parent || cat.count <= 0 || RESERVED_FRONTEND_SLUGS.has(parent.slug)) return [];

      return [
        {
          loc: `${SITE_URL}/${parent.slug}/${cat.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: "0.8",
        },
      ];
    });

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
    console.error("Error generating categories sitemap:", err.message);
    return new NextResponse(wrapInUrlset(""), {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }
}
