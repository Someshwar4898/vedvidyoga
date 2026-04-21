"use client";

function LogoLoader() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream dark:bg-stone-950">

      {/* Flipping logo */}
      <img
        src="/vedvidyoga-logo.webp"
        alt="Loading…"
        className="logo-loader h-20 w-20 object-contain"
      />

      {/* Site name */}
      <span className="mt-5 text-lg font-bold tracking-tight bg-gradient-to-r from-[#b96a1b] via-[#f28c28] to-[#e67d17] bg-clip-text text-transparent">
        VedVidYoga
      </span>

      {/* Bouncing dots */}
      <div className="mt-4 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-saffron"
            style={{ animation: `loader-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>

    </div>
  );
}

export default LogoLoader;
