import gallery1 from "../assets/gallery_1.jpg";
import gallery2 from "../assets/gallery_2.jpg";
import gallery3 from "../assets/gallery_3.jpg";
import gallery4 from "../assets/gallery_4.jpg";
import gallery5 from "../assets/gallery_5.png";
import gallery6 from "../assets/gallery_6.png";
import gallery7 from "../assets/gallery_7.png";
import gallery8 from "../assets/gallery_8.jpg";

const images = [
  { src: gallery1, alt: "Gallery image 1" },
  { src: gallery2, alt: "Gallery image 2" },
  { src: gallery3, alt: "Gallery image 3" },
  { src: gallery4, alt: "Gallery image 4" },
  { src: gallery5, alt: "Gallery image 5" },
  { src: gallery6, alt: "Gallery image 6" },
  { src: gallery7, alt: "Gallery image 7" },
  { src: gallery8, alt: "Gallery image 8" },
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
