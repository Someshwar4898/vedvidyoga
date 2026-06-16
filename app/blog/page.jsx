import Blog from "../../src/views/Blog";
import { getNavCategories, getPosts } from "../../src/services/api";
import { buildStaticMetadata } from "../../src/services/site";

export const metadata = buildStaticMetadata({
  title: "Blog",
  description:
    "Read VedVidYoga articles on Vedas, Upanishads, Ayurveda, and Yoga, organized for practical understanding and modern application.",
  path: "/blog",
});

export default async function Page() {
  const [initialPosts, initialCategories] = await Promise.all([
    getPosts().catch(() => []),
    getNavCategories().catch(() => []),
  ]);

  return <Blog initialPosts={initialPosts} initialCategories={initialCategories} />;
}
// export default function Page() {
//   return <Blog />;
// }
