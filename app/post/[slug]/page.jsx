import PostPage from "../../../src/views/PostPage";
import { getPostPageMeta } from "../../../src/services/seo";
import { notFound } from "next/navigation";
import { getPostBySlug } from "../../../src/services/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return await getPostPageMeta({ slug });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const initialPost = await getPostBySlug(slug).catch(() => null);
  if (!initialPost) notFound();

  return <PostPage initialPost={initialPost} />;
}
// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   return await getPostPageMeta(slug);
  
// }

// export default function Page() {
//   return <PostPage />;
// }
