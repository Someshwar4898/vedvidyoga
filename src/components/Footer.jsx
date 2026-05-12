import Link from "next/link";
import { Flower } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-saffron dark:border-stone-800 py-8 mt-8">
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
       {/* Lotus divider */}
          <div className="flex items-center gap-4 my-4">

            <div className="h-px flex-1 bg-[#efcfaa] dark:bg-stone-800" />

            <div className="flex items-center gap-3 text-[#e67d17] dark:text-stone-500">

              <span className="h-1.5 w-1.5 rounded-full bg-[#f28c28] dark:bg-stone-800" />

              <Flower
                className="w-8 h-8"
                strokeWidth={1.8}
              />

              <span className="h-1.5 w-1.5 rounded-full bg-[#f28c28] dark:bg-stone-800" />
            </div>

            <div className="h-px flex-1 bg-[#efcfaa] dark:bg-stone-800" />
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-stone-500">
            &copy; {new Date().getFullYear()} VedVidYoga.
            All rights reserved, managed by{" "}

            <a
              href="https://www.hindiya.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-saffron transition"
            >
              Hindiya.net
            </a>
          </p>
    </footer>
  );
}

export default Footer;
