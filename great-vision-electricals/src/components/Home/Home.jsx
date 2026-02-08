import { useEffect, useState } from "react";
import { getHomeSubtitles } from "../../api/homeSubtitles.js";
import "./Home.css";

const FALLBACK_SUBTITLES = [
  { text: "Quality Electrical Solutions" },
  { text: "Trusted Electrical Brand" },
  { text: "Powering Homes & Businesses" },
];

const Home = () => {
  const [subtitles, setSubtitles] = useState(FALLBACK_SUBTITLES);

  useEffect(() => {
    const load = () => {
      getHomeSubtitles()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setSubtitles(data);
          }
        })
        .catch(() => {
          // DB down → keep fallback / last data
        });
    };

    load(); // first load
    const intervalId = setInterval(load, 15000); // auto update every 15s

    return () => clearInterval(intervalId);
  }, []);

  const loopList = subtitles.concat(subtitles);

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
              <p key={i} className="home-subtitle">
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
