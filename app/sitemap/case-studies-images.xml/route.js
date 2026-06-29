import { NextResponse } from "next/server";
import { fetchPaginatedContent, SITE_URL, escapeXML } from "../utils";

export const revalidate = 43200; // 12 hours

export async function GET() {
  try {
    const caseStudies = await fetchPaginatedContent("/case-studies", {
      query: { _embed: "true" },
    });

    const caseStudiesWithImages = caseStudies
      .filter((item) => item.status === "publish")
      .map((item) => {
        const imageUrl = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        return {
          url: `${SITE_URL}/case-studies/${item.slug}`,
          lastmod: new Date(item.modified).toISOString(),
          images: imageUrl ? [imageUrl] : [],
        };
      })
      .filter((item) => item.images.length > 0);

    const timestamp = new Date().toISOString();
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    caseStudiesWithImages.forEach((pageData) => {
      xml += '  <url>\n';
      xml += `    <loc>${escapeXML(pageData.url)}</loc>\n`;
      xml += `    <lastmod>${escapeXML(pageData.lastmod || timestamp)}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';

      pageData.images.forEach((imgUrl) => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${escapeXML(imgUrl)}</image:loc>\n`;
        xml += '    </image:image>\n';
      });

      xml += '  </url>\n';
    });

    xml += '</urlset>';

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=43200, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("Error generating case-studies-images sitemap:", err.message);
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }
}
