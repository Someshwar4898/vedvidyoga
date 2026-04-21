import CategoryPage from "../../src/views/CategoryPage";
import { getCategoryPageMeta } from "../../src/services/seo";

export async function generateMetadata({ params }) {
  const { category } = await params;
  return await getCategoryPageMeta(category);
}

export default function Page() {
  return <CategoryPage />;
}
