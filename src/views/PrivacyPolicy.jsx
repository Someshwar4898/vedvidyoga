import { Shield } from "lucide-react";

const points = [
  "We do not store personal data unless you choose to contact us via email or WhatsApp.",
  "Basic analytics like page views and clicks are tracked only to understand content performance and improve the website.",
  "All testimonials and case studies are shared with proper consent and respect for individual privacy.",
];

function PrivacyPolicy() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14">
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">Privacy Policy</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          A simple and respectful approach to your privacy.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
          This website follows a minimal and privacy-first approach to handling user information. We do not collect or store personal data unnecessarily. Any information shared by users is handled responsibly, with a focus on transparency, security, and maintaining a trustworthy browsing experience.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {points.map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-[#f3e7d8] bg-[#fffdf9] dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400 p-5 text-sm leading-7 text-stone-600">
              <Shield className="mb-3 text-saffron" size={18} />
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
