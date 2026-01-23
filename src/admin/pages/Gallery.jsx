import { useEffect, useState } from "react";
         // public fetch
import adminApi from "../services/api";        // admin actions
import "./Gallery.css";

export default function Gallery() {
  const [file, setFile] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGallery = async () => {
    const res = await adminApi.get("/gallery");

    setGallery(res.data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ✅ FIXED (ONLY ONE FUNCTION)
  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await adminApi.post("/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Upload successful");
      setFile(null);
      fetchGallery();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this media?")) return;

    try {
      await adminApi.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="gallery-page">
      <h2 className="page-title">Gallery Management</h2>

      <div className="upload-box">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

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
