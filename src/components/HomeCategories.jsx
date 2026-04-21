"use client";
import Link from "next/link";
import {
  ScrollText,
  Library,
  Lightbulb,
  Brain,
  BookMarked,
  Leaf,
  Activity,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { useCategories } from "../hooks/useCategories";

const iconMap = {
  vedas: ScrollText,
  vedanga: Library,
  upanishads: Lightbulb,
  darshans: Brain,
  scriptures: BookMarked,
  "ayurvedic-lifestyle": Leaf,
  "yoga-naturopathy": Activity,
  "vedic-education": GraduationCap,
};

function HomeCategories() {
  const { categories, loading } = useCategories();

  return (
    <section className="rounded-[2rem] border border-[#f0e3d3] bg-white/80 dark:bg-stone-900/80 dark:border-stone-700 p-6 sm:p-8 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">
            What We Cover
          </p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            The system and dimensions of Vedic Knowledge.
          </h3>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-[1.5rem] border border-[#f0e3d3] dark:border-stone-700 bg-[#fffdf9] dark:bg-stone-800 p-5 shadow-sm h-48"
              >
                <div className="mb-3 h-5 w-5 rounded bg-stone-200 dark:bg-stone-700" />
                <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-700 mb-3" />
                <div className="h-3 w-full rounded bg-stone-100 dark:bg-stone-700/60 mb-2" />
                <div className="h-3 w-5/6 rounded bg-stone-100 dark:bg-stone-700/60 mb-2" />
                <div className="h-3 w-4/6 rounded bg-stone-100 dark:bg-stone-700/60" />
              </div>
            ))
          : categories.map((cat) => {
              const Icon = iconMap[cat.slug] ?? BookOpen;
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="rounded-[1.5rem] border border-[#f0e3d3] bg-[#ffffff] dark:bg-stone-800 dark:border-stone-700 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#f6d7b3] hover:shadow-[0_18px_40px_rgba(102,74,44,0.08)] block"
                >
                  <Icon className="mb-3 text-saffron" size={20} />
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 leading-6">
                    {cat.name}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400 line-clamp-3">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
      </div>
    </section>
  );
}

export default HomeCategories;
