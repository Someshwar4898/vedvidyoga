import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-[#eadbc7] dark:border-stone-800 py-8 mt-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/vedvidyoga-logo.webp" alt="VedVidYoga" className="h-12" />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#b96a1b] via-[#f28c28] to-[#e67d17] bg-clip-text text-transparent">VedVidYoga</span>
        </Link>
        <div className="flex flex-wrap gap-5 text-sm text-stone-500">
          <Link href="/privacy" className="hover:text-saffron transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-saffron transition">Terms &amp; Conditions</Link>
          <Link href="/medical-disclaimer" className="hover:text-saffron transition">Medical Disclaimer</Link>
          <Link href="/about" className="hover:text-saffron transition">About Us</Link>
          <Link href="/contact" className="hover:text-saffron transition">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
