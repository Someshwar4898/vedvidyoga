import { NextResponse } from "next/server";
import { SITE_URL, wrapInUrlset } from "../utils";

export const revalidate = 43200; // 12 hours

export async function GET() {
  const now = new Date().toISOString();
  const urlEntries = `  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

  const xml = wrapInUrlset(urlEntries);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=43200, stale-while-revalidate=600",
    },
  });
}
