import { useState, useEffect } from "react";
import { MessageSquareQuote } from "lucide-react";
import { getTestimonials, isWPConnected } from "../services/api";
import mockTestimonials from "../data/mockTestimonials";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        let data = [];
        if (isWPConnected()) {
          data = await getTestimonials();
          if (!data || data.length === 0) data = mockTestimonials;
        } else {
          data = mockTestimonials;
        }
        if (!cancelled) setTestimonials(data);
      } catch {
        if (!cancelled) setTestimonials(mockTestimonials);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section>
      <div className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 text-saffron-muted">
          <MessageSquareQuote size={18} />
          <p className="text-sm font-semibold uppercase tracking-[0.24em]">Testimonials</p>
        </div>
        <h3 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          What our readers say
        </h3>
        <p className="mt-1 text-sm leading-7 text-stone-500 dark:text-stone-400">
          Insights from seekers, practitioners, and educators across India.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-6 h-52"
              />
            ))
          : testimonials.map((t) => {
              const initials = t.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <div
                  key={t.id}
                  className="rounded-[1.75rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-6 shadow-[0_18px_50px_rgba(102,74,44,0.07)] flex flex-col gap-4"
                >
                  <div className="text-6xl font-serif text-saffron/30 leading-none -mb-4">"</div>
                  <p className="text-sm leading-7 text-stone-600 dark:text-stone-400 flex-1">
                    {t.content}
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-2 border-t border-[#f0e3d3] dark:border-stone-700">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-saffron/15 text-saffron flex items-center justify-center text-sm font-semibold shrink-0">
                        {initials}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm text-stone-900 dark:text-stone-100 leading-5">
                        {t.name}
                      </p>
                      <p className="text-xs text-stone-400">{t.designation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
}

export default Testimonials;
