import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing and using VedVidYoga, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use this website.",
  },
  {
    title: "2. Content & Educational Purpose",
    body: "All content published on VedVidYoga — including articles on Vedic Science, Yoga Therapy, Naturopathy, Ayurveda, and Vedic Logic — is strictly for educational and informational purposes. It does not constitute professional medical, therapeutic, or legal advice.",
  },
  {
    title: "3. No Medical Advice",
    body: "Nothing on this website should be interpreted as a substitute for qualified medical diagnosis or treatment. Always consult a certified healthcare professional before beginning any therapy, dietary change, or wellness practice described on this site.",
  },
  {
    title: "4. Intellectual Property",
    body: "All written content, graphics, logos, and design elements on VedVidYoga are the intellectual property of Kaptan Singh Choudhary (Kapil) unless otherwise stated. Reproduction or redistribution without prior written permission is strictly prohibited.",
  },
  {
    title: "5. User Conduct",
    body: "You agree to use this website lawfully and respectfully. You may not use this site to spread misinformation, engage in harassment, or violate the rights of others. VedVidYoga reserves the right to restrict access to users who violate these conditions.",
  },
  {
    title: "6. Third-Party Links",
    body: "This website may contain links to external websites for reference purposes. VedVidYoga does not endorse or take responsibility for the content, accuracy, or practices of any third-party sites.",
  },
  {
    title: "7. Limitation of Liability",
    body: "VedVidYoga and its author shall not be held liable for any loss, injury, or damage arising from the use or misuse of information published on this site. Use of this website is entirely at your own risk.",
  },
  {
    title: "8. Changes to Terms",
    body: "VedVidYoga reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of the website after changes are posted constitutes acceptance of the revised terms.",
  },
  {
    title: "9. Governing Law",
    body: "These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from the use of this website shall be subject to the jurisdiction of the courts of Jaipur, Rajasthan.",
  },
  {
    title: "10. Contact",
    body: "For any questions regarding these Terms and Conditions, you may reach us at vedvidyoga@gmail.com or via WhatsApp at +91 7976066236.",
  },
];

function TermsAndConditions() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14">
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">

        {/* Header */}
        <div className="mb-2 inline-flex items-center gap-2 text-saffron-muted">
          <FileText size={18} />
          <p className="text-sm font-semibold uppercase tracking-[0.24em]">Legal</p>
        </div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          Terms & Conditions
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
          Please read these terms carefully before using VedVidYoga. By continuing to browse this website, you agree to the following conditions.
        </p>
        <p className="mt-2 text-sm text-stone-400 dark:text-stone-500">Last updated: April 2026</p>

        {/* Sections */}
        <div className="mt-10 space-y-6">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-[1.5rem] border border-[#f3e7d8] dark:border-stone-700 bg-[#fffdf9] dark:bg-stone-800 p-6"
            >
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-2">
                {s.title}
              </h2>
              <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">{s.body}</p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}

export default TermsAndConditions;
