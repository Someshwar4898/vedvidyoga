import gallery1 from "../assets/gallery_1.webp";
import gallery2 from "../assets/gallery_2.webp";
import gallery3 from "../assets/gallery_3.webp";
import gallery4 from "../assets/gallery_4.webp";
import gallery5 from "../assets/gallery_5.webp";
import gallery6 from "../assets/gallery_6.webp";
import gallery7 from "../assets/gallery_7.webp";
import gallery8 from "../assets/gallery_8.webp";
import gallery9 from "../assets/gallery_9.webp";
import gallery10 from "../assets/gallery_10.webp";
import gallery11 from "../assets/gallery_11.webp";
import gallery12 from "../assets/gallery_12.webp";
import gallery13 from "../assets/gallery_13.webp";
import gallery14 from "../assets/gallery_14.webp";
import gallery15 from "../assets/gallery_15.webp";
import gallery16 from "../assets/gallery_16.webp";

const images = [
  { src: gallery1, alt: "Gallery image 1" },
  { src: gallery2, alt: "Gallery image 2" },
  { src: gallery3, alt: "Gallery image 3" },
  { src: gallery4, alt: "Gallery image 4" },
  { src: gallery5, alt: "Gallery image 5" },
  { src: gallery6, alt: "Gallery image 6" },
  { src: gallery7, alt: "Gallery image 7" },
  { src: gallery8, alt: "Gallery image 8" },
  { src: gallery9, alt: "Gallery image 9" },
  { src: gallery10, alt: "Gallery image 10" },
  { src: gallery11, alt: "Gallery image 11" },
  { src: gallery12, alt: "Gallery image 12" },
  { src: gallery13, alt: "Gallery image 13" },
  { src: gallery14, alt: "Gallery image 14" },
  { src: gallery15, alt: "Gallery image 15" },
  { src: gallery16, alt: "Gallery image 16" },
];

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
