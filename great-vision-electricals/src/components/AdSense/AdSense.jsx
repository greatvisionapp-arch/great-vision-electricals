import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AdSense({ show }) {
  const location = useLocation();

  useEffect(() => {
    if (!show) return;

    try {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [location.pathname, show]);

  if (!show) return null;

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
