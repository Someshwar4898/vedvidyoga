import { Shield, AlertCircle, User } from "lucide-react";

const points = [
  {
    icon: AlertCircle,
    title: "Not Medical Advice",
    body: "This content is not a substitute for professional medical advice, diagnosis, or treatment.",
  },
  {
    icon: Shield,
    title: "Individual Results",
    body: "Therapeutic outcomes for ailments (such as Asthma, Slip Disc, or Anxiety) vary based on an individual's constitution; results are not guaranteed.",
  },
  {
    icon: User,
    title: "Personal Responsibility",
    body: "Before implementing any yogic practices, herbal remedies, or lifestyle changes mentioned here, please consult with your physician or a qualified health provider.",
  },
];

function MedicalDisclaimer() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14">
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">Medical Disclaimer</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          For educational purposes only.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
          The information provided on VedVidYoga.com regarding Yoga Therapy, Naturopathy, Ayurvedic herbs, and Vedic lifestyle is for educational and informational purposes only.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {points.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-[#f3e7d8] bg-[#fffdf9] dark:bg-stone-800 dark:border-stone-700 p-5">
              <item.icon className="mb-3 text-saffron" size={18} />
              <p className="font-semibold text-sm text-stone-800 dark:text-stone-100">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-400">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm leading-7 text-stone-500 dark:text-stone-400">
          Kaptan Singh Choudhary (Kapil) and VedVidYoga.com shall not be held liable for any damages or injuries resulting from the use or misuse of the information provided on this platform.
        </p>
      </section>
    </div>
  );
}

export default MedicalDisclaimer;
