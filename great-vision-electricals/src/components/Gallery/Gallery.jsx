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

  const allImages = useMemo(() => {
    return [...staticImages, ...pbImages];
  }, [pbImages]);

  const openImage = useCallback((item) => {
    document.body.style.overflow = "hidden";
    setSelectedImage(item);
  }, []);

  const closeImage = useCallback(() => {
    document.body.style.overflow = "auto";
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") closeImage();
    };
    window.addEventListener("keydown", escClose);
    return () => window.removeEventListener("keydown", escClose);
  }, [closeImage]);

  return (
    <>
      <Helmet>
        <title>Gallery | Great Vision Electricals Paliganj</title>

        <meta
          name="description"
          content="Official gallery of Great Vision Electricals Paliganj featuring shop photos, warehouse infrastructure, electrician events, product displays and brand visuals."
        />

        <link rel="canonical" href="https://greatvision.shop/gallery" />

        <meta property="og:title" content="Gallery | Great Vision Electricals" />
        <meta
          property="og:description"
          content="Explore store photos, warehouse images, electrician events and official brand visuals."
        />
        <meta property="og:url" content="https://greatvision.shop/gallery" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Great Vision Electricals Gallery",
            url: "https://greatvision.shop/gallery",
            image: allImages.map((img) => ({
              "@type": "ImageObject",
              contentUrl: `https://greatvision.shop${img.src}`,
              name: img.title,
            })),
          })}
        </script>
      </Helmet>

      <main className="gallery-section">
        <header>
          <h1 className="gallery-title">
            Great Vision Electricals Gallery
          </h1>
        </header>

        {/* Strong SEO Content (Important for Indexing) */}
        <section className="gallery-description">
          <h2>Electrical Shop & Warehouse in Paliganj</h2>
          <p>
            Great Vision Electricals Paliganj is a trusted electrical supplier
            providing LED panels, ceiling fans, MCB distribution boxes, smart
            switches, wiring materials and complete electrical solutions for
            homes, businesses and contractors.
          </p>
          <p>
            Our gallery highlights our retail shop setup, warehouse
            infrastructure, electrician support programs, promotional events
            and official brand identity visuals. We continuously work to
            support electricians and customers with reliable electrical
            products and modern solutions.
          </p>
          <p>
            As a growing electrical brand in Paliganj, Great Vision
            Electricals focuses on quality assurance, product availability and
            long-term customer trust. This gallery provides a visual overview
            of our operations and commitment to excellence.
          </p>
        </section>

        <section className="gallery-grid">
          {allImages.map((item) => (
            <figure
              key={item.id}
              className="gallery-card"
              onClick={() => openImage(item)}
            >
              <img
                src={item.src}
                alt={`${item.title} - Great Vision Electricals Paliganj`}
                loading="lazy"
                decoding="async"
                width="400"
                height="300"
              />
              <figcaption className="gallery-overlay">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </section>

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
      </main>
    </>
  );
};

export default Gallery;
