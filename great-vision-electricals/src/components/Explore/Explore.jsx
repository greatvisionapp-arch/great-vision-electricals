import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getExploreBanners } from "../../api/explorebanner";
import "./Explore.css";
import Product from "./Product/Product";

const Explore = () => {

  const navigate = useNavigate();

  /* ================= REDIRECT HANDLER ================= */

  const handleRedirect = (link) => {
    if (!link) return;

    if (link.startsWith("http")) {
      window.location.href = link; // full URL
    } else if (link.startsWith("/")) {
      navigate(link); // internal route
    } else {
      navigate(`/product/${link}`); // only slug
    }
  };

  /* ================= LOCAL FALLBACK ================= */

  const localLeft = [
    {
      id: "l1",
      imageUrl:
        "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "GAMING GEAR",
      subtitle: "Game Controller",
      buttonText: "SHOP NOW",
      productSlug: "game-controller",
    },
  ];

  const localRight = [
    {
      id: "r1",
      imageUrl:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "NEW ARRIVALS",
      buttonText: "Shop Now",
      productSlug: "bamboo-buds",
    },
  ];

  const localBottom = [
    {
      id: "b1",
      imageUrl:
        "https://images.pexels.com/photos/5082566/pexels-photo-5082566.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "NEW ARRIVALS",
      buttonText: "Shop Now",
      productSlug: "homepod-pro",
    },
  ];

  const [leftImages, setLeftImages] = useState(localLeft);
  const [rightImages, setRightImages] = useState(localRight);
  const [bottomImages, setBottomImages] = useState(localBottom);

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  /* ================= LOAD FROM POCKETBASE ================= */

  useEffect(() => {
    const loadBanners = async () => {
      const data = await getExploreBanners();

      if (data.left?.length) setLeftImages(data.left);
      if (data.rightTop?.length) setRightImages(data.rightTop);
      if (data.rightBottom?.length) setBottomImages(data.rightBottom);
    };

    loadBanners();
  }, []);

  /* ================= AUTO SLIDERS ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex(prev => (prev + 1) % leftImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [leftImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRightIndex(prev => (prev + 1) % rightImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [rightImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBottomIndex(prev => (prev + 1) % bottomImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bottomImages]);

  return (
    <>
      <section className="explore">
        <div className="explore-box">
          <div className="explore-container">
            <div className="explore-grid">

              {/* LEFT */}
              <div className="explore-card big slider">
                <div
                  className="slider-track"
                  style={{ transform: `translateX(-${leftIndex * 100}%)` }}
                >
                  {leftImages.map(item => (
                    <div key={item.id} className="slide">
                      <img src={item.imageUrl} alt="" />
                    </div>
                  ))}
                </div>

                <div className="gradient-layer"></div>

                <div className="overlay">
                  <span>{leftImages[leftIndex]?.title}</span>
                  <h2>{leftImages[leftIndex]?.subtitle}</h2>

                  <button
                    onClick={() =>
                      handleRedirect(leftImages[leftIndex]?.productSlug)
                    }
                  >
                    {leftImages[leftIndex]?.buttonText || "Shop Now"}
                  </button>
                </div>
              </div>

              {/* RIGHT TOP */}
              <div className="explore-card small vertical-slider">
                <div
                  className="vertical-track"
                  style={{ transform: `translateY(-${rightIndex * 100}%)` }}
                >
                  {rightImages.map(item => (
                    <div key={item.id} className="vertical-slide">
                      <img src={item.imageUrl} alt="" />
                    </div>
                  ))}
                </div>

                <div className="gradient-layer"></div>

                <div className="overlay">
                  <span>{rightImages[rightIndex]?.title}</span>

                  <button
                    onClick={() =>
                      handleRedirect(rightImages[rightIndex]?.productSlug)
                    }
                  >
                    {rightImages[rightIndex]?.buttonText || "Shop Now"}
                  </button>
                </div>
              </div>

              {/* RIGHT BOTTOM */}
              <div className="explore-card small slider">
                <div
                  className="slider-track"
                  style={{ transform: `translateX(-${bottomIndex * 100}%)` }}
                >
                  {bottomImages.map(item => (
                    <div key={item.id} className="slide">
                      <img src={item.imageUrl} alt="" />
                    </div>
                  ))}
                </div>

                <div className="gradient-layer"></div>

                <div className="overlay">
                  <span>{bottomImages[bottomIndex]?.title}</span>

                  <button
                    onClick={() =>
                      handleRedirect(bottomImages[bottomIndex]?.productSlug)
                    }
                  >
                    {bottomImages[bottomIndex]?.buttonText || "Shop Now"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="full-divider"></div>
      </section>

      <Product />
    </>
  );
};

export default Explore;
