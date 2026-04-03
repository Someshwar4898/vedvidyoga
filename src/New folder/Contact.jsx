import { Mail, Phone } from "lucide-react";

const contactItems = [
  { icon: Mail, label: "Email", value: "editor@adishiv.com" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
];

function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14">
      <section className="grid gap-8 md:grid-cols-[1fr_0.9fr]">

        {/* Left */}
        <div className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">Contact Us</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            We would love to hear from thoughtful readers and collaborators.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-400">
            Reach out for editorial suggestions, partnerships, content direction, or feedback on the reading experience. The design keeps communication simple and uncluttered.
          </p>
        </div>

        {/* Right */}
        <div className="grid grid-cols-1 gap-5">
          {contactItems.map((item) => (
            <div key={item.label} className="rounded-[1.75rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-6 shadow-[0_18px_50px_rgba(102,74,44,0.08)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-saffron-pill dark:bg-stone-800 text-saffron flex-shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold text-stone-900 dark:text-stone-100">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}

export default Contact;
