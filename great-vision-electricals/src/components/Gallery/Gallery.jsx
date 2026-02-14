import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { getGalleryImages } from "../../api/gallery";
import "./Gallery.css";

const staticImages = [
  { id: "s1", src: "/image/img1.jpg", title: "Great Vision Owner" },
  { id: "s2", src: "/image/img2.jpg", title: "Gift Distributing to Electrician" },
  { id: "s3", src: "/image/img3.jpg", title: "Great Vision Shop" },
  { id: "s4", src: "/image/great-vision-new-logo.png", title: "Great Vision Logo" },
  { id: "s5", src: "/image/img5.jpg", title: "Great Vision Owner Image" },
  { id: "s6", src: "/image/img6.jpg", title: "Great Vision Owner Photo" },
  { id: "s7", src: "/image/img7.jpg", title: "Great Vision Electrician" },
  { id: "s8", src: "/image/godamimg1.jpg", title: "Great Vision Godown Photo" },
  { id: "s9", src: "/image/godamimg2.jpg", title: "Great Vision Godown Photo 2" },
  { id: "s10", src: "/image/godamimg3.jpg", title: "Great Vision Godown Photo 3" },
  { id: "s11", src: "/image/godamimg4.jpg", title: "Great Vision Godown Photo 4" },
  { id: "s12", src: "/image/great-vision-new-logo-basic.png", title: "Great Vision Basic Logo" },
  { id: "s13", src: "/image/great-vision-new-logo-metallic.png", title: "Great Vision Metallic Logo" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [pbImages, setPbImages] = useState([]);

  /* ================= FETCH FROM POCKETBASE ================= */

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGalleryImages();

        const formatted = data.map((item) => ({
          id: item.id,
          src: item.image,
          title: item.title,
        }));

        setPbImages(formatted);
      } catch (err) {
        console.error("Gallery Fetch Error:", err);
      }
    };

    fetchImages();
  }, []);

  /* ================= IMAGE MERGE ================= */

  const allImages = useMemo(() => {
    return [...staticImages, ...pbImages];
  }, [pbImages]);

  /* ================= LIGHTBOX ================= */

  const openImage = useCallback((item) => {
    document.body.style.overflow = "hidden";
    setSelectedImage(item);
  }, []);

  const closeImage = useCallback(() => {
    document.body.style.overflow = "auto";
    setSelectedImage(null);
  }, []);

  return (
    <>
      {/* ✅ Proper SEO Fix */}
      <Helmet>
        <title>Gallery | Great Vision Electricals</title>
        <meta
          name="description"
          content="Explore Great Vision Electricals gallery featuring events, shop images, electricians, and official brand logos."
        />
        <link
          rel="canonical"
          href="https://greatvision.shop/gallery"
        />
      </Helmet>

      <section className="gallery-section">
        <h1 className="gallery-title">Our Gallery</h1>

        <div className="gallery-grid">
          {allImages.map((item) => (
            <div
              key={item.id}
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
    </>
  );
};

export default Gallery;
