import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="rounded-[2rem] bg-gradient-to-br from-[#fff6ea] via-white to-[#fef5d4] dark:from-stone-900 dark:via-stone-900 dark:to-stone-900 border border-[#f6d7b3] dark:border-stone-700 p-8 sm:p-12 text-center shadow-[0_20px_60px_rgba(102,74,44,0.08)]">

      {/* Badge */}
      <span className="inline-block rounded-full border border-[#f6d7b3] dark:border-stone-700 bg-white dark:bg-stone-800 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-muted mb-6">
        Weekly Vedic Wisdom
      </span>

      <h3 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
        Stay rooted in knowledge
      </h3>
      <p className="mt-3 text-sm leading-7 text-stone-500 dark:text-stone-400 max-w-md mx-auto">
        Get one thoughtfully written article delivered to your inbox every week — no noise, no spam.
      </p>

      {submitted ? (
        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-saffron/10 border border-saffron/30 px-6 py-3 text-sm font-semibold text-saffron">
          You&apos;re subscribed! Welcome aboard.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="rounded-full border border-[#eadbc7] dark:border-stone-700 bg-white dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500 px-5 py-3 text-sm flex-1 outline-none focus:border-saffron/50 transition"
          />
          <button
            type="submit"
            className="rounded-full bg-saffron text-white px-6 py-3 text-sm font-semibold hover:bg-saffron-dark transition shrink-0"
          >
            Subscribe
          </button>
        </form>
      )}

      <p className="text-xs text-stone-400 mt-4">
        Unsubscribe anytime. Your email stays private — always.
      </p>

    </section>
  );
}

export default Newsletter;
