import { useEffect, useState } from "react";
import API from "../services/api";
import "./Gallery.css";

export default function Gallery() {
  const [file, setFile] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGallery = async () => {
    const res = await API.get("/gallery");
    setGallery(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await API.get("/gallery");
      setGallery(res.data);
    })();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    await API.post("/gallery/upload", formData);
    setFile(null);
    setLoading(false);
    fetchGallery();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this media?")) return;
    await API.delete(`/gallery/${id}`);
    fetchGallery();
  };

  return (
    <div className="gallery-page">
      <h2 className="page-title">Gallery Management</h2>

      {/* Upload Box */}
      <div className="upload-box">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {gallery.map((item) => (
          <div className="gallery-card" key={item._id}>
            {item.type === "image" ? (
              <img src={item.url} alt="gallery" />
            ) : (
              <video src={item.url} controls />
            )}

            <button
              className="delete-btn"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
