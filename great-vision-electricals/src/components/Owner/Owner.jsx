import { useRef, useState, useEffect } from "react";
import "./Owner.css";

const IMAGES = [
  "/image/img1.jpg",
  "/image/img2.jpg",
  "/image/img3.jpg",
  "/image/img4.png",
  "/image/img5.jpg",
  "/image/img6.jpg",
];

export default function Owner() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  // Update active dot based on scroll position
  useEffect(() => {
  const track = trackRef.current;
  let scrollTimeout;

  const handleScroll = () => {
    // 1) PAUSE animation while user is scrolling
    track.classList.add("is-paused");

    // 2) Clear previous timer
    clearTimeout(scrollTimeout);

    // 3) After user stops scrolling for 600ms → RESUME animation
    scrollTimeout = setTimeout(() => {
      track.classList.remove("is-paused");
    }, 600);

    // ---- Your existing dot logic (keep this) ----
    const width = track.scrollWidth / 2;
    const progress = track.scrollLeft / (width / IMAGES.length);
    setActive(Math.round(progress) % IMAGES.length);
  };

  track.addEventListener("scroll", handleScroll);

  return () => {
    track.removeEventListener("scroll", handleScroll);
    clearTimeout(scrollTimeout);
  };
}, []);


  return (
  <>
    <section className="owner-page">
      <h2 className="company-title">
        <span className="great">Great</span>
        <span className="vision"> Vision</span>
      </h2>
      <div className="full-divider"></div>
    </section>

    <div className="scroller" ref={trackRef}>
      <div className="track">
        {IMAGES.map((src, i) => (
          <img key={"a" + i} src={src} alt={`owner ${i + 1}`} />
        ))}

        {/* EXACT DUPLICATE SET (mandatory) */}
        {IMAGES.map((src, i) => (
          <img key={"b" + i} src={src} alt={`owner ${i + 1} dup`} />
        ))}
      </div>
    </div>

    {/* DOTS */}
    <div className="dots">
      {IMAGES.map((_, i) => (
        <button
          key={i}
          className={`dot ${active === i ? "active" : ""}`}
          onClick={() => scrollToIndex(i)}
        />
      ))}
      
    </div>
    <div className="full-divider"></div>
  </>
);

}
