import { useEffect, useState, useMemo } from "react";
import { getHomeSubtitles } from "../../api/homeSubtitles.js";
import { getHomeBadges } from "../../api/homeBadges.js";
import "./Home.css";

const FALLBACK_SUBTITLES = [
  { id: "f1", text: "Quality Electrical Solutions" },
  { id: "f2", text: "Trusted Electrical Brand" },
  { id: "f3", text: "Powering Homes & Businesses" },
];

const FALLBACK_BADGES = [
  { id: "b1", text: "AUTHORIZED DEALER" },
];

const Home = () => {
  const [subtitles, setSubtitles] = useState(FALLBACK_SUBTITLES);
  const [badges, setBadges] = useState(FALLBACK_BADGES);
  const [badgeIndex, setBadgeIndex] = useState(0);

  // 🔹 Load subtitles (PocketBase)
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await getHomeSubtitles();
        if (
          mounted &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.every((x) => x.text)
        ) {
          setSubtitles(data);
        }
      } catch {}
    };

    load();
    const refresh = setInterval(load, 15000);

    return () => {
      mounted = false;
      clearInterval(refresh);
    };
  }, []);

  // 🔹 Load badges (SEPARATE collection, ordered)
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await getHomeBadges(); // sorted by order in API
        if (
          mounted &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.every((x) => x.text)
        ) {
          setBadges(data);
        }
      } catch {}
    };

    load();
    return () => (mounted = false);
  }, []);

  const safeSubtitles =
    subtitles.length > 0 ? subtitles : FALLBACK_SUBTITLES;

  const safeBadges = badges.length > 0 ? badges : FALLBACK_BADGES;

  // 🔹 Badge auto-rotate
  useEffect(() => {
    if (safeBadges.length <= 1) return;

    const badgeTimer = setInterval(() => {
      setBadgeIndex((i) => (i + 1) % safeBadges.length);
    }, 2500);

    return () => clearInterval(badgeTimer);
  }, [safeBadges]);

  // 🔹 Subtitle scroll loop
  const loopList = useMemo(
    () => [...safeSubtitles, ...safeSubtitles],
    [safeSubtitles]
  );

  return (
    <section className="home" id="home">
      <div className="home-container">
        {/* BADGE (PocketBase → home_badges) */}
        <span className="home-badge">
          <span key={badgeIndex} className="badge-text">
            {safeBadges[badgeIndex]?.text}
          </span>
        </span>

        <h1 className="home-title">
          Welcome to{" "}
          <span className="brand">
            <span className="great">Great</span>{" "}
            <span className="vision">Vision</span>
          </span>
        </h1>

        <div className="home-subtitle-box">
          <div className="home-subtitle-track">
            {loopList.map((item, i) => (
              <p
                key={`${item.id ?? item.text}-${i}`}
                className="home-subtitle"
              >
                {item.text}
              </p>
            ))}
          </div>
        </div>

        <button 
  type="button" 
  className="home-btn" 
  onClick={() => window.location.href = "https://shivamelectricals.shop/"}
>
  Explore Products
</button>
<section id="home">
  {/* Your home section content */}
</section>


      </div>
    </section>
    
  );
};

export default Home;
