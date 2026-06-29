import { NextResponse } from "next/server";
import { fetchPaginatedContent, getCategoryMap, getPostUrl, escapeXML } from "../utils";

export const revalidate = 43200; // 12 hours

export async function GET() {
  try {
    const [posts, categoryMap] = await Promise.all([
      fetchPaginatedContent("/posts", {
        query: { _embed: "true" },
      }),
      getCategoryMap(),
    ]);

    const postsWithImages = posts
      .filter((post) => post.status === "publish")
      .map((post) => {
        const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        return {
          url: getPostUrl(post, categoryMap),
          lastmod: new Date(post.modified).toISOString(),
          images: imageUrl ? [imageUrl] : [],
        };
      })
      .filter((item) => item.images.length > 0);

    const timestamp = new Date().toISOString();
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    postsWithImages.forEach((pageData) => {
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
    console.error("Error generating posts-images sitemap:", err.message);
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }
}
