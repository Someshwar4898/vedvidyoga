const images = Array.from({ length: 16 }, (_, i) => ({
  src: `/assets/gallery_${i + 1}.webp`,
  alt: `Gallery image ${i + 1}`,
}));

function Gallery() {
  return (
    <section className="rounded-[2rem] border border-[#f0e3d3] bg-white/80 dark:bg-stone-900/80 dark:border-stone-700 p-6 sm:p-8 shadow-[0_20px_60px_rgba(102,74,44,0.08)]">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-saffron-muted">
          Gallery
        </p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          Moments from the journey
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="aspect-square overflow-hidden rounded-[1.5rem] border-2 border-saffron/30 dark:border-saffron/20"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
