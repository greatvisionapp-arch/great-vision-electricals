import React, { useState, useEffect, useCallback } from "react";
import { getGalleryImages } from "../../api/gallery";
import "./Gallery.css";

const galleryImages = [
  { src: "/image/img1.jpg", title: "Great Vision Owner" },
  { src: "/image/img2.jpg", title: "Gift Distrubing to electrician" },
  { src: "/image/img3.jpg", title: "Great Vision Shop" },
  { src: "/image/great-vision-new-logo.png", title: "great vision new logo" },
  { src: "/image/img5.jpg", title: "Great Vision Owner Image" },
  { src: "/image/img6.jpg", title: "Great Vision Owner ka photo" },
  { src: "/image/img7.jpg", title: "Great Vision Electrician" },
  { src: "/image/godamimg1.jpg", title: "Great Vision Godam photo" },
  { src: "/image/godamimg2.jpg", title: "Great Vision Godam photo 2" },
  { src: "/image/godamimg3.jpg", title: "Great Vision Godam photo 3" },
  { src: "/image/godamimg4.jpg", title: "Great Vision Godam photo 4" },
  { src: "/image/great-vision-new-logo-basic.png", title: "great vision new logo basic" },
  { src: "/image/great-vision-new-logo-metallic.png", title: "great vision new logo metallic" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [pbImages, setPbImages] = useState([]);

  // ✅ Proper PocketBase Fetch
  useEffect(() => {
    const fetchImages = async () => {
      const data = await getGalleryImages();

      // API returns { image, title }
      const formatted = data.map((item) => ({
        src: item.image,
        title: item.title,
      }));

      setPbImages(formatted);
    };

    fetchImages();
  }, []);

  const openImage = useCallback((item) => {
    document.body.style.overflow = "hidden";
    setSelectedImage(item);
  }, []);

  const closeImage = useCallback(() => {
    document.body.style.overflow = "auto";
    setSelectedImage(null);
  }, []);

  const allImages = [...galleryImages, ...pbImages];

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="gallery-title">Our Gallery</h2>

      <div className="gallery-grid">
        {allImages.map((item, index) => (
          <div
            key={index}
            className="gallery-card"
            onClick={() => openImage(item)}
          >
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              decoding="async"
            />
            <div className="gallery-overlay">{item.title}</div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={closeImage}>
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            loading="eager"
            decoding="async"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
