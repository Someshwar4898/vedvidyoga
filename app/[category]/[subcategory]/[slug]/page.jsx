import PostPage from "../../../../src/views/PostPage";
import { getPostPageMeta } from "../../../../src/services/seo";
import { notFound } from "next/navigation";
import { getPostBySlug } from "../../../../src/services/api";

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   return await getPostPageMeta(slug);
// }

// export default function Page() {
//   return <PostPage />;
// }
export async function generateMetadata({ params }) {
  const { category, subcategory, slug } = await params;
  return await getPostPageMeta({ category, subcategory, slug });
}

export default async function Page({ params }) {
  const { category, subcategory, slug } = await params;
  const initialPost = await getPostBySlug(slug).catch(() => null);

  if (
    !initialPost ||
    initialPost.categorySlug !== category ||
    initialPost.subcategorySlug !== subcategory
  ) {
    notFound();
  }

  return <PostPage initialPost={initialPost} />;
}