import { buildStaticMetadata } from "../../src/services/site";

export const metadata = buildStaticMetadata({
  title: "Sitemap",
  description: "Browse the VedVidYoga sitemap index.",
  path: "/sitemap",
  robots: {
    index: false,
    follow: false,
  },
});

export default function SitemapPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Sitemap</h1>
        <p className="text-gray-600 mb-4">
          View our XML sitemap for search engines:
        </p>
        <a 
          href="/sitemap.xml" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          View Sitemap XML
        </a>
      </div>
    </div>
  );
}