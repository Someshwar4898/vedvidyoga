import { NextResponse } from "next/server";
import { fetchPaginatedContent, SITE_URL, escapeXML, wrapInUrlset } from "../utils";

export const revalidate = 43200; // 12 hours

export async function GET() {
  try {
    const caseStudies = await fetchPaginatedContent("/case-studies", {
      query: { _fields: "slug,modified,status", orderby: "modified", order: "desc" },
    });

    const paths = caseStudies
      .filter((item) => item.status === "publish")
      .map((item) => ({
        loc: `${SITE_URL}/case-studies/${item.slug}`,
        lastmod: new Date(item.modified).toISOString(),
        changefreq: "weekly",
        priority: "0.75",
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
    console.error("Error generating case studies sitemap:", err.message);
    return new NextResponse(wrapInUrlset(""), {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }
}
