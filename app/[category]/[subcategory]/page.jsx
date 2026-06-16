import CategoryPage from "../../../src/views/CategoryPage";
import { getCategoryPageMeta } from "../../../src/services/seo";
import { notFound } from "next/navigation";
import { getNavCategories, getPosts } from "../../../src/services/api";

// export async function generateMetadata({ params }) {
//   const { subcategory } = await params;
//   return await getCategoryPageMeta(subcategory);
// }

// export default function Page() {
//   return <CategoryPage />;
// }
export async function generateMetadata({ params }) {
  const { category, subcategory } = await params;
  return await getCategoryPageMeta({ category, subcategory });
}

export default async function Page({ params }) {
  const { category, subcategory } = await params;
  const [initialCategories, allPosts] = await Promise.all([
    getNavCategories().catch(() => []),
    getPosts().catch(() => []),
  ]);

  const categoryData = initialCategories.find((item) => item.slug === category);
  const subcategoryData = categoryData?.subcategories?.find((item) => item.slug === subcategory);
  if (!categoryData || !subcategoryData) notFound();

  const initialPosts = allPosts.filter(
    (post) => post.categorySlug === category && post.subcategorySlug === subcategory
  );

  return <CategoryPage initialPosts={initialPosts} initialCategories={initialCategories} />;
}