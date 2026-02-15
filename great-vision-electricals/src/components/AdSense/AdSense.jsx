import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AdSense() {
  const location = useLocation();

  useEffect(() => {
    const loadAd = () => {
      try {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };

    // Slight delay so content renders first (important for policy)
    const timer = setTimeout(loadAd, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      style={{
        margin: "40px auto",
        maxWidth: "900px",
        minHeight: "100px",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6454755736181446"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
