import TermsAndConditions from "../../src/views/TermsAndConditions";

import { buildStaticMetadata } from "../../src/services/site";

export const metadata = buildStaticMetadata({
  title: "Terms and Conditions",
  description:
    "Read the VedVidYoga terms and conditions for site usage, content guidelines, limitations, and service expectations.",
  path: "/terms",
});

export default function Page() {
  return <TermsAndConditions />;
}
