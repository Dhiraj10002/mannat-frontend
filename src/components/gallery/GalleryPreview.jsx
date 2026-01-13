import { useEffect, useRef, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

const GalleryPreview = () => {
  const [items, setItems] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    API
  .get("/api/gallery")
  .then((res) => setItems(res.data))
  .catch(console.error);

  }, []);

  // AUTO SCROLL (RIGHT → LEFT)
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !items.length) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      scrollAmount += 1;

      if (scrollAmount >= track.scrollWidth / 2) {
        scrollAmount = 0;
      }

      track.style.transform = `translateX(-${scrollAmount}px)`;
    }, 20); // smooth speed

    return () => clearInterval(interval);
  }, [items]);

  if (!items.length) return null;

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center">
          Our <span className="text-green-600">Gallery</span>
        </h2>
        <p className="mt-4 text-gray-600 text-center">
          Moments from our work, volunteers, and community initiatives.
        </p>

        {/* SCROLLER */}
        <div className="relative mt-12 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 w-max transition-transform duration-0"
          >
            {[...items, ...items].map((item, idx) => (
              <div
                key={idx}
                className="w-74 h-52 flex-shrink-0 rounded-xl overflow-hidden shadow-md"
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={item.url}
                    muted
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            to="/gallery"
            className="inline-block border border-green-700 text-green-700 px-8 py-3 rounded-lg hover:bg-green-700 hover:text-white transition"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
