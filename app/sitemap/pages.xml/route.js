import { NextResponse } from "next/server";
import { SITE_URL, wrapInUrlset } from "../utils";

export const revalidate = 43200; // 12 hours

export async function GET() {
  const now = new Date().toISOString();
  const staticPages = [
    { loc: SITE_URL, priority: "1.0", changefreq: "daily" },
    { loc: `${SITE_URL}/about`, priority: "0.7", changefreq: "monthly" },
    { loc: `${SITE_URL}/contact`, priority: "0.7", changefreq: "monthly" },
    { loc: `${SITE_URL}/case-studies`, priority: "0.9", changefreq: "weekly" },
    { loc: `${SITE_URL}/privacy`, priority: "0.4", changefreq: "yearly" },
    { loc: `${SITE_URL}/terms`, priority: "0.4", changefreq: "yearly" },
    { loc: `${SITE_URL}/medical-disclaimer`, priority: "0.4", changefreq: "yearly" },
  ];

  const urlEntries = staticPages
    .map(
      (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
}
