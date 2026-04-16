import { Mail, MessageCircle, Linkedin, GraduationCap, ArrowUpRight } from "lucide-react";

const contactItems = [
  { icon: Mail, label: "Email", value: "vedvidyoga@gmail.com", href: "mailto:info@vedvidyoga.com" },
  { icon: MessageCircle, label: "WhatsApp Business", value: "+91 7976066236", href: "https://wa.me/917976066236" },
  { icon: Linkedin, label: "LinkedIn", value: "Kaptan Singh Choudhary", href: "https://www.linkedin.com/in/kaptan-singh-choudhary-75a649180" },
  { icon: GraduationCap, label: "Urban Pro", value: "Kaptan Singh Choudhary", href: "https://kapilvedvidyoga.urbanpro.com/" },
];

function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-6">
      <section className="grid gap-8 md:grid-cols-[1fr_0.9fr]">

        {/* Left */}
        <div className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">Contact Us</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Connect for Healing & Vedic Wisdom.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-400">
            Book a consultation for the natural management of chronic ailments, musculoskeletal issues, and mental stress. Explore the depth of Vedic Wisdom through our methodical approach to Vedic Meditation and the science of Hawan. We offer a research-based path to wellness using Yoga Therapy, Naturopathy, and Ayurvedic Lifestyle principles.
          </p>
          <a
            href="https://wa.me/917976066236"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:opacity-90 transition"
          >
            Start Consultation
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Right */}
        <div className="grid grid-cols-1 gap-5">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[1.75rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-6 shadow-[0_18px_50px_rgba(102,74,44,0.08)] hover:border-saffron/40 transition block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-saffron-pill dark:bg-stone-800 text-saffron flex-shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold text-stone-900 dark:text-stone-100">{item.value}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

      </section>
    </div>
  );
}

export default Contact;
