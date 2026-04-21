import PostPage from "../../../../src/views/PostPage";
import { getPostPageMeta } from "../../../../src/services/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return await getPostPageMeta(slug);
}

export default function Page() {
  return <PostPage />;
}
