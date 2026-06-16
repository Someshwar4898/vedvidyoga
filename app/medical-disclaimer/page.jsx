import MedicalDisclaimer from "../../src/views/MedicalDisclaimer";

import { buildStaticMetadata } from "../../src/services/site";

export const metadata = buildStaticMetadata({
  title: "Medical Disclaimer",
  description:
    "Read the VedVidYoga medical disclaimer for guidance on educational content, wellness information, and professional medical advice limitations.",
  path: "/medical-disclaimer",
});

export default function Page() {
  return <MedicalDisclaimer />;
}
