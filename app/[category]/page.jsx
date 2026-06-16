import CategoryPage from "../../src/views/CategoryPage";
import { getCategoryPageMeta } from "../../src/services/seo";
import { notFound } from "next/navigation";
import { getNavCategories, getPosts } from "../../src/services/api";

// export async function generateMetadata({ params }) {
//   const { category } = await params;
//   return await getCategoryPageMeta(category);
// }

// export default function Page() {
//   return <CategoryPage />;
// }
export async function generateMetadata({ params }) {
  const { category } = await params;
  return await getCategoryPageMeta({ category });
}

export default async function Page({ params }) {
  const { category } = await params;
  const [initialCategories, allPosts] = await Promise.all([
    getNavCategories().catch(() => []),
    getPosts().catch(() => []),
  ]);

  const categoryData = initialCategories.find((item) => item.slug === category);
  if (!categoryData) notFound();

  const initialPosts = allPosts.filter((post) => post.categorySlug === category);
  return <CategoryPage initialPosts={initialPosts} initialCategories={initialCategories} />;
}