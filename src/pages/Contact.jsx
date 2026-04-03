import { Mail, MessageCircle, Linkedin, ExternalLink } from "lucide-react";

const contactItems = [
  { icon: Mail, label: "Email", value: "vedvidyoga@gmail.com", href: "mailto:vedvidyoga@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp Business", value: "+91 7976066236", href: "https://wa.me/917976066236" },
  { icon: Linkedin, label: "LinkedIn", value: "Kaptan Singh Choudhary", href: "https://www.linkedin.com/in/kaptan-singh-choudhary-75a649180" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kaptan-singh-choudhary-75a649180" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "UrbanPro", href: "#" },
  { label: "Superprof", href: "#" },
];

function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-6">
      <section className="grid gap-8 md:grid-cols-[1fr_0.9fr]">

        {/* Left */}
        <div className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">Contact Us</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            We would love to hear from you.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-400">
            Discover Kapil's research, case studies, and certifications on LinkedIn, Facebook, Instagram, UrbanPro, and Superprof.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#eadbc7] bg-[#fffdf9] dark:bg-stone-800 dark:border-stone-700 dark:text-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-saffron/40 hover:text-saffron transition"
              >
                {s.label} <ExternalLink size={13} />
              </a>
            ))}
          </div>
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
