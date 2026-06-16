import CaseStudyDetail from "../../../src/views/CaseStudyDetail";
import { notFound } from "next/navigation";
import { getCaseStudies } from "../../../src/services/caseStudies";
import { getCaseStudyPageMeta } from "../../../src/services/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return await getCaseStudyPageMeta(slug);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const initialCaseStudies = await getCaseStudies().catch(() => []);
  const initialCaseStudy = initialCaseStudies.find((item) => item.slug === slug);
  if (!initialCaseStudy) notFound();

  return (
    <CaseStudyDetail
      initialCaseStudies={initialCaseStudies}
      initialCaseStudy={initialCaseStudy}
    />
  );
}
// export default function Page() {
//   return <CaseStudyDetail />;
// }
