import Home from "../src/views/Home";
import { getPosts } from "../src/services/api";
import { buildStaticMetadata } from "../src/services/site";

export const metadata = buildStaticMetadata({
  description:
    "Explore Vedas, Upanishads, Ayurveda, and Yoga through logic, scientific reasoning, and practical guidance for modern life.",
  path: "/",
});

export default async function Page() {
  const initialPosts = await getPosts().catch(() => []);
  return <Home initialPosts={initialPosts} />;
}

// import Home from "../src/views/Home";
// export default function Page() {
//   return <Home />;
// }
