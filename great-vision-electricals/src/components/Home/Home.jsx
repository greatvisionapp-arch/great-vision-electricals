import { useEffect, useState, useMemo } from "react";
import { getHomeSubtitles } from "../../api/homeSubtitles.js";
import "./Home.css";

const FALLBACK_SUBTITLES = [
  { id: "f1", text: "Quality Electrical Solutions" },
  { id: "f2", text: "Trusted Electrical Brand" },
  { id: "f3", text: "Powering Homes & Businesses" },
];

const Home = () => {
  const [subtitles, setSubtitles] = useState(FALLBACK_SUBTITLES);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await getHomeSubtitles();
        if (
          isMounted &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.every((x) => x.text)
        ) {
          setSubtitles(data);
        }
      } catch {
        // fallback stays
      }
    };

    load();
    const intervalId = setInterval(load, 15000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // prevent empty / glitchy render
  const safeSubtitles =
    subtitles.length > 0 ? subtitles : FALLBACK_SUBTITLES;

  // duplicate list safely (memoized)
  const loopList = useMemo(
    () => [...safeSubtitles, ...safeSubtitles],
    [safeSubtitles]
  );

  return (
    <section className="home" id="home">
      <div className="home-container">
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

        <button type="button" className="home-btn">
          Explore Products
        </button>
      </div>
    </section>
  );
};

export default Home;
