import About from "../../src/views/About";

import { buildStaticMetadata } from "../../src/services/site";

export const metadata = buildStaticMetadata({
  title: "About",
  description:
    "Learn about VedVidYoga's mission to explain Vedic knowledge, Ayurveda, and Yoga with clarity, logic, and scientific perspective.",
  path: "/about",
});

export default function Page() {
  return <About />;
}
