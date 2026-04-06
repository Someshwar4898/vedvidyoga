import { Sparkles, FlaskConical, BookOpen } from "lucide-react";
import authorImg from "../assets/author_image.jpg";
import SanskritTerm from "../components/SanskritTerm";

const differentiators = [
  {
    id: "vedangas",
    icon: BookOpen,
    title: <>Vedic Linguistics & Physics (<SanskritTerm term="Vedāngas" devanagari="वेदाङ्ग" meaning="Vedic auxiliary sciences" />)</>,
    points: [
      <><SanskritTerm term="Śikṣā" devanagari="शिक्षा" meaning="Phonetics & Pronunciation" /> & <SanskritTerm term="Chanda" devanagari="छन्द" meaning="Metre / Prosody" />: The precision of sound and rhythmic intonation.</>,
      <><SanskritTerm term="Nirukta" devanagari="निरुक्त" meaning="Etymology & Semantics" /> & <SanskritTerm term="Vyākaraṇa" devanagari="व्याकरण" meaning="Grammar" />: The etymological DNA of Vedic wisdom.</>,
      <><SanskritTerm term="Jyotiṣa" devanagari="ज्योतिष" meaning="Astronomy / Astrology" /> & <SanskritTerm term="Kalpa" devanagari="कल्प" meaning="Ritual Procedures" />: The astronomical and ceremonial logic of life.</>,
    ],
  },
  {
    id: "darshans",
    icon: Sparkles,
    title: <>The Six <SanskritTerm term="Darshans" devanagari="दर्शन" meaning="Spectacles / Philosophy" />: Rational Philosophy</>,
    points: [
      <><SanskritTerm term="Nyāya" devanagari="न्याय" meaning="Logic & Reasoning" />, <SanskritTerm term="Vaiśeṣika" devanagari="वैशेषिक" meaning="Atomic Theory" />, <SanskritTerm term="Sāṅkhya" devanagari="सांख्य" meaning="Enumeration / Cosmology" />, Yoga, <SanskritTerm term="Mīmāṃsā" devanagari="मीमांसा" meaning="Ritual Inquiry" />, and <SanskritTerm term="Vedānta" devanagari="वेदान्त" meaning="End of the Vedas" /> as logical spectacles.</>,
      "Not religions — rational systems of inquiry.",
      "They reject idol worship and embrace the one, personal Supreme Truth.",
    ],
  },
  {
    id: "healing",
    icon: FlaskConical,
    title: "The Healing Bio-Tech: Ayurveda & Naturopathy",
    points: [
      "Therapeutic Yoga: Targeting musculoskeletal and respiratory disorders.",
      "Sound Healing: Using frequencies of Indian Classical Ragas and Vedic Chants.",
      <>Vedic Value Education: Reforming the modern mind through the <SanskritTerm term="Upanishads" devanagari="उपनिषद्" meaning="Vedic philosophical texts" />.</>,
    ],
  },
];

function About() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-6">

      {/* Hero */}
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">About Us</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          Decoding the Rishi-Science: Logic, Nature & The Vedic Cult
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
          Welcome to VedVidYoga. We don't just teach rituals; we decode the technical methodology of the Universe.
        </p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
          Founded by Kaptan Singh Choudhary (Kapil), this platform is a bold step toward reclaiming the Vedic Cult — a system so scientific and methodical that it transcends blind faith and meets the rigorous standards of modern logic.
        </p>
      </section>

      {/* Kapil bio */}
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start">
          {/* Author photo */}
          <div className="overflow-hidden rounded-[1.5rem] w-full md:w-[260px] h-[300px] shrink-0 border-2 border-saffron/30 dark:border-saffron/20">
            <img
              src={authorImg}
              alt="Kaptan Singh Choudhary (Kapil)"
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">The Architect Behind the Vision</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">Kaptan Singh Choudhary</h2>
            <p className="mt-4 text-sm font-medium text-stone-500 dark:text-stone-400 leading-7">
              M.A. (Yoga) · B.P.Ed. · Consultant Yoga Therapist (IIAS) · Certified Naturopath · Ayurveda Wellness Coach · Vedic Meditation Expert · Visharad (Indian Classical Vocal) · Prathama (Bamboo Flute) · Black Belt 1st Dan (Taekwondo) · National Referee & Licensed Coach · Writer, Poet & Researcher
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
          With over 15 years of clinical experience, Kapil has dedicated his life to proving that our Sages (<SanskritTerm term="Rishis" devanagari="ऋषि" meaning="Vedic seers" />) were the world's first scientists.
        </p>

        {/* Experience card */}
        <div className="mt-6 rounded-[1.5rem] border border-[#f6d7b3] bg-[#fffaf4] dark:bg-stone-800 dark:border-stone-700 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-muted mb-4">
            Clinical Experience — Yoga Therapist &amp; Naturopath
          </p>
          <ul className="space-y-3">
            {[
              "VEDVIDYOGA Institute of Yoga Therapy & Wellness",
              "Baba Balwant Singh Panchgavya Chikitsa and Anusandhan Kendra",
              "AMBAA Yoga and Naturopathy Centre",
              "Inaya Foundation, Jaipur",
              "Lions Club, Jaipur",
            ].map((place, i) => (
              <li key={i} className="flex items-start gap-3 text-stone-700 dark:text-stone-300 leading-7">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron/60" />
                <span className="text-base font-medium">{place}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
          His career is built on Case-Based Studies. He has successfully treated patients with Slip Disc, Asthma, Sinusitis, and Depression using only Nature Cure and Ayurvedic principles. As a Visharad in Classical Music, he also integrates Raga-Chikitsa and the precise Physics of Sanskrit Sound to heal the human nervous system.
        </p>
      </section>

      {/* What Makes Us Different */}
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">What Makes Us Different</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          Unlike typical spiritual blogs
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
          VedVidYoga stands on the <SanskritTerm term="Vedas" devanagari="वेद" meaning="Sacred scriptures" /> (Rig, Yajur, Sama, Atharva) as blueprints for human excellence. We filter out superstition to bring you the core:
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {differentiators.map((item) => (
            <div key={item.id} className="rounded-[1.5rem] border border-[#f3e7d8] bg-[#fffdf9] dark:bg-stone-800 dark:border-stone-700 p-5">
              <item.icon className="mb-3 text-saffron" size={18} />
              <p className="font-semibold text-sm text-stone-800 dark:text-stone-100 leading-6">{item.title}</p>
              <ul className="mt-3 space-y-2">
                {item.points.map((point, i) => (
                  <li key={i} className="text-sm leading-6 text-stone-600 dark:text-stone-400">· {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Ultimate Aim */}
      <section className="rounded-[2rem] border border-[#f0e3d3] bg-white dark:bg-stone-900 dark:border-stone-700 p-8 sm:p-10 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">Our Ultimate Aim</p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
          To replace myth with Vedic Discovery. From the <SanskritTerm term="Īśa Upaniṣad" devanagari="ईश उपनिषद्" meaning="Isha Upanishad — on selfless action" />'s selfless living to Patanjali's practical union, VedVidYoga is a portal for the modern atheist and the seeker alike.
        </p>
        <blockquote className="mt-6 border-l-4 border-saffron pl-6 italic text-xl font-medium text-stone-700 dark:text-stone-300">
          "Vedic knowledge is not a belief; it is a technology for the Soul."
        </blockquote>
      </section>

    </div>
  );
}

export default About;
