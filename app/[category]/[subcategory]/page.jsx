import CategoryPage from "../../../src/views/CategoryPage";
import { getCategoryPageMeta } from "../../../src/services/seo";

export async function generateMetadata({ params }) {
  const { subcategory } = await params;
  return await getCategoryPageMeta(subcategory);
}

export default function Page() {
  return <CategoryPage />;
}
