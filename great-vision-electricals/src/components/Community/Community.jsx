import React, { useEffect, useState } from "react";
import "./Community.css";
import { getCommunityBoxes } from "../../api/communityBoxes";

const FALLBACK_TOP = [
  { name: "Verma Electric", msg: "Building together,\npowering ideas ⚡" },
  { name: "Sharma Power", msg: "Reliable solutions\nfor modern needs" },
  { name: "Patna Grid", msg: "Smart energy\nstrong networks" },
  { name: "Singh Works", msg: "Crafting quality\nwith trust" },
];

const FALLBACK_BOTTOM = [
  { name: "Kumar Systems", msg: "Innovating daily\nfor tomorrow" },
  { name: "Apex Electric", msg: "Precision &\nperformance" },
  { name: "Nova Tech", msg: "Future-ready\ninfrastructure" },
  { name: "Unity Power", msg: "Connected minds,\nconnected grids" },
];

export default function Community() {
  const [isLight, setIsLight] = useState(false);
  const [topBoxes, setTopBoxes] = useState(FALLBACK_TOP);
  const [bottomBoxes, setBottomBoxes] = useState(FALLBACK_BOTTOM);
  const [isLoaded, setIsLoaded] = useState(false); // optional safety flag

  // === Theme listener (Header → Community sync) ===
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme");
      setIsLight(currentTheme === "light");
    };

    updateTheme(); // run once on mount

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // === Fetch from PocketBase (correct React way) ===
  useEffect(() => {
    let isMounted = true;

    getCommunityBoxes().then(({ top, bottom }) => {
      if (!isMounted) return;

      console.log("🔥 FINAL top:", top);
      console.log("🔥 FINAL bottom:", bottom);

      if (top.length) setTopBoxes(top);
      if (bottom.length) setBottomBoxes(bottom);

      setIsLoaded(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();

    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section
      className={`community ${isLight ? "light" : ""}`}
      id="community"
      style={{ scrollMarginTop: "90px" }}
    >
      <div className="community-card" onMouseMove={handleMove}>
        <h2 className="community-title">
          Built by the community,<br />
          for the community
        </h2>
      </div>

      {/* Optional: simple loading guard */}
      {!isLoaded && (
        <div style={{ opacity: 0.7, margin: "20px 0" }}>
          Loading community…
        </div>
      )}

      <div className="loop-wrapper">
        <div className="loop left">
          <div className="track">
            {[...topBoxes, ...topBoxes].map((b, i) => (
              <Box key={`top-${i}`} name={b.name} msg={b.msg} />
            ))}
          </div>
        </div>

        <div className="loop right">
          <div className="track">
            {[...bottomBoxes, ...bottomBoxes].map((b, i) => (
              <Box key={`bottom-${i}`} name={b.name} msg={b.msg} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Box({ name, msg }) {
  return (
    <div className="box">
      <strong>{name}</strong>
      <div>
        {msg.split("\n").map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </div>
    </div>
  );
}
