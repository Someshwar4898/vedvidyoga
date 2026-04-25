import { UserCircle } from "lucide-react";

function PostAuthorCard() {
  return (
    <section className="rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 p-6 sm:p-8 shadow-[0_20px_60px_rgba(102,74,44,0.08)] mt-16">
      <div className="mb-5 inline-flex items-center gap-2 text-saffron-muted">
        <UserCircle size={18} />
        <p className="text-sm font-semibold uppercase tracking-[0.24em]">About the Author</p>
      </div>

      <div className="flex items-center gap-6">
        <img
          src="/assets/author_image.webp"
          alt="Kaptan Singh Choudhary (Kapil)"
          className="shrink-0 w-20 h-20 rounded-full object-cover object-top border-2 border-saffron/30 dark:border-saffron/20"
        />
        <div>
          <p className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Kaptan Singh Choudhary (Kapil)
          </p>
          <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
            Kaptan Singh Choudhary (Kapil) is a Consultant Yoga Therapist and a practitioner of the Vedic Cult based in Jaipur. With an M.A. in Yoga and a specialization in Vedic Meditation, he has dedicated his life to exposing spiritual misinformation and curing ailments through the logical systems of Naturopathy and Ayurveda. He teaches a form of the Almighty that is scientific, technical, and accessible even to the atheist mind.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PostAuthorCard;
