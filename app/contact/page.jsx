import Contact from "../../src/views/Contact";

import { buildStaticMetadata } from "../../src/services/site";

export const metadata = buildStaticMetadata({
  title: "Contact",
  description:
    "Contact VedVidYoga for consultations, questions, collaborations, and guidance related to Vedic knowledge, Yoga, and Ayurveda.",
  path: "/contact",
});

export default function Page() {
  return <Contact />;
}
