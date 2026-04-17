import { useState, useEffect } from "react";
import { MessageSquareQuote, X, Send, ImagePlus } from "lucide-react";
import mockTestimonials from "../data/mockTestimonials";

const EMPTY_FORM = { name: "", occupation: "", location: "", content: "", photoName: "" };

function Testimonials() {
  const [testimonials] = useState(mockTestimonials);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [photoFile, setPhotoFile] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setForm((prev) => ({ ...prev, photoName: file.name }));
    }
  }

  useEffect(() => {
    if (!showModal) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [showModal]);

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.occupation.trim()) newErrors.occupation = "Occupation is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";
    if (!form.content.trim()) newErrors.content = "Testimonial content is required.";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const subject = encodeURIComponent("Testimonial Submission – " + form.name.trim());
    const bodyLines = [
      "Hello,",
      "",
      "I would like to submit my testimonial for VedVidYoga.",
      "",
      "Name: " + form.name.trim(),
      "Occupation: " + form.occupation.trim(),
      "Location: " + form.location.trim(),
      "",
      "Testimonial:",
      form.content.trim(),
      "",
      photoFile
        ? "Note: I have attached my photo (" + form.photoName + ") to this email."
        : "No photo attached.",
      "",
      "Thank you.",
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    const a = document.createElement("a");
    a.href = "mailto:info@vedvidyoga.com?subject=" + subject + "&body=" + body;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setShowModal(false);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
    setErrors({});
  }

  function handleClose() {
    setShowModal(false);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
    setErrors({});
  }

  if (testimonials.length === 0) return null;

  return (
    <section>
      {/* ── Section header ── */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
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

        <button
          onClick={() => setShowModal(true)}
          className="shrink-0 inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-white dark:bg-stone-900 px-5 py-2.5 text-sm font-semibold text-saffron hover:bg-saffron hover:text-white transition self-center"
        >
          <Send size={14} />
          Submit Your Story
        </button>
      </div>

      {/* ── Testimonial cards ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => {
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

      {/* ── Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-lg rounded-[2rem] border border-[#f0e3d3] dark:border-stone-700 bg-white dark:bg-stone-900 p-8 shadow-[0_30px_80px_rgba(102,74,44,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition"
            >
              <X size={20} />
            </button>

            {/* Modal heading */}
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 text-saffron-muted">
                <MessageSquareQuote size={16} />
                <p className="text-xs font-semibold uppercase tracking-[0.24em]">Share Your Experience</p>
              </div>
              <h4 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                Submit Your Story
              </h4>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Fill in your details below. 
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-xl border border-[#e8d5c0] dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-saffron/60 transition"
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              {/* Occupation + Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Occupation <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Teacher, Engineer…"
                    className="w-full rounded-xl border border-[#e8d5c0] dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-saffron/60 transition"
                  />
                  {errors.occupation && <p className="mt-1 text-xs text-red-400">{errors.occupation}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Jaipur, Delhi…"
                    className="w-full rounded-xl border border-[#e8d5c0] dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-saffron/60 transition"
                  />
                  {errors.location && <p className="mt-1 text-xs text-red-400">{errors.location}</p>}
                </div>
              </div>

              {/* Testimonial content */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Your Testimonial <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share how VedVidYoga has impacted your life…"
                  className="w-full rounded-xl border border-[#e8d5c0] dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-saffron/60 transition resize-none"
                />
                {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content}</p>}
              </div>

              {/* Photo (optional) */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Photo <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer w-full rounded-xl border border-dashed border-[#e8d5c0] dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-4 py-2.5 text-sm text-stone-500 hover:border-saffron/50 transition">
                  <ImagePlus size={16} className="shrink-0 text-saffron/70" />
                  <span className="truncate">
                    {photoFile ? photoFile.name : "Click to choose a photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
                <p className="mt-1 text-xs text-stone-400">
                  Your email app will open — please attach this photo there before sending.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(242,140,40,0.28)] hover:-translate-y-0.5 hover:opacity-90 transition"
                >
                  <Send size={14} />
                  Open Email & Send
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Testimonials;
