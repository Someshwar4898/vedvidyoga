import PrivacyPolicy from "../../src/views/PrivacyPolicy";

import { buildStaticMetadata } from "../../src/services/site";

export const metadata = buildStaticMetadata({
  title: "Privacy Policy",
  description:
    "Review the VedVidYoga privacy policy covering data usage, cookies, communications, and visitor protection practices.",
  path: "/privacy",
});

export default function Page() {
  return <PrivacyPolicy />;
}
