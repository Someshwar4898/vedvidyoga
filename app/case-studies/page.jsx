import CaseStudies from "../../src/views/CaseStudies";
import { getCaseStudies } from "../../src/services/caseStudies";
import { buildStaticMetadata } from "../../src/services/site";

export const metadata = buildStaticMetadata({
  title: "Case Studies",
  description:
    "Read real VedVidYoga case studies on healing, recovery, and Vedic lifestyle practices applied to everyday health challenges.",
  path: "/case-studies",
});

export default async function Page() {
  const initialCaseStudies = await getCaseStudies().catch(() => []);
  return <CaseStudies initialCaseStudies={initialCaseStudies} />;
}
// export default function Page() {
//   return <CaseStudies />;
// }
