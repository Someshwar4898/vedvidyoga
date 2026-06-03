import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-20 text-center">
      <h1 className="text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-100 mb-4">404</h1>
      <p className="text-xl sm:text-2xl text-stone-600 dark:text-stone-400 mb-8">Page Not Found</p>
      <p className="text-lg text-stone-500 dark:text-stone-500 mb-12 max-w-2xl mx-auto">
        The page you're looking for doesn't exist. It may have been removed or the URL might be incorrect.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-saffron text-white font-semibold rounded-lg hover:bg-saffron/90 transition"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="inline-block px-6 py-3 border border-saffron text-saffron font-semibold rounded-lg hover:bg-saffron/10 transition"
        >
          Browse Blog
        </Link>
      </div>
    </div>
  );
}