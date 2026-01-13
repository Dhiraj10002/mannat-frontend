import { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import API from "../services/api";



Modal.setAppElement("#root");

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);


    <>
    <SEO
      title="Gallery"
      description="Explore photos from Mannat Foundation's community programs, education drives, and welfare initiatives."
      image="/gallery-og.jpg"
      url="https://mannatfoundation.org/gallery"
    />

    <h1>Gallery</h1>
  </>




  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
       const res = await API.get("/gallery");
        setGallery(res.data);
    } catch (err) {
      console.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Cloudinary Optimized URL */
  const optimize = (url, type) => {
    if (type === "image") {
      return url.replace(
        "/upload/",
        "/upload/q_auto,f_auto,w_600/"
      );
    }
    return url; // video streaming optimized by CDN automatically
  };

  if (loading) {
    return <p className="text-center mt-20">Loading gallery...</p>;
  }

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Our <span className="text-green-700">Gallery</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            A glimpse of our activities and community work.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {gallery.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelected(item)}
              className="cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg"
            >
              {item.type === "image" ? (
                <img
                  src={optimize(item.url, "image")}
                  alt="gallery"
                  loading="lazy"
                  className="w-full h-56 object-cover hover:scale-105 transition"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-full h-56 object-cover"
                  muted
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <Modal
        isOpen={!!selected}
        onRequestClose={() => setSelected(null)}
        className="max-w-3xl mx-auto mt-4 bg-white rounded-xl outline-none p-3"
        overlayClassName="fixed inset-0 bg-black/70 flex items-start justify-center z-50"
      >
        {selected && (
          <>
            {selected.type === "image" ? (
              <img
                src={selected.url.replace("/upload/", "/upload/q_auto,f_auto/")}
                alt="preview"
                className="w-full rounded-lg"
              />
            ) : (
              <video
                src={selected.url}
                controls
                autoPlay
                className="w-full rounded-lg"
              />
            )}

            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Gallery;
