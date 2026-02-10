import { useEffect, useRef, useState } from "react";
import { trackPageView } from "../../api/analytics";
import "./cookie.css";

const COOKIE_ACTIVITY = "user_activity";
const CONSENT_NAME = "cookie_consent";

/* ---------- helpers ---------- */
const setCookie = (name, value, days = 30) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    JSON.stringify(value)
  )};expires=${d.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name) => {
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[2]));
  } catch {
    return null;
  }
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/* ---------- component ---------- */
export default function CookieConsent() {
  const [consent, setConsent] = useState(() => getCookie(CONSENT_NAME));
  const [show, setShow] = useState(false);
  const startTimeRef = useRef(null);

  /* show banner */
  useEffect(() => {
    setShow(consent !== true);
  }, [consent]);

  /* analytics tracking */
  useEffect(() => {
    if (consent !== true) return;

    const page = window.location.pathname;
    const stored = getCookie(COOKIE_ACTIVITY) || {};

    if (!stored[page]) {
      stored[page] = { visits: 0, timeSpent: 0 };
    }

    stored[page].visits += 1;
    stored.lastActivity = new Date().toISOString();
    setCookie(COOKIE_ACTIVITY, stored);

    startTimeRef.current = Date.now();

    const updateActivity = () => {
      stored.lastActivity = new Date().toISOString();
      setCookie(COOKIE_ACTIVITY, stored);
    };

    const events = ["click", "scroll", "keydown", "mousemove"];
    events.forEach((e) => window.addEventListener(e, updateActivity));

    const flush = () => {
      if (!startTimeRef.current) return;

      const duration = Math.max(
        0,
        Math.floor((Date.now() - startTimeRef.current) / 1000)
      );

      stored[page].timeSpent += duration;
      stored.lastActivity = new Date().toISOString();
      setCookie(COOKIE_ACTIVITY, stored);

      // Now pass data correctly to trackPageView
      trackPageView({
        page: page,
        visits: stored[page].visits,
        timeSpent: stored[page].timeSpent,
        lastActivity: stored.lastActivity,
      });

      startTimeRef.current = null;
    };

    window.addEventListener("beforeunload", flush);

    return () => {
      flush();
      events.forEach((e) =>
        window.removeEventListener(e, updateActivity)
      );
      window.removeEventListener("beforeunload", flush);
    };
  }, [consent]);

  /* actions */
  const acceptCookies = () => {
    setCookie(CONSENT_NAME, true);
    setConsent(true);
  };

  const declineCookies = () => {
    deleteCookie(CONSENT_NAME);
    deleteCookie(COOKIE_ACTIVITY);
    setConsent(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-bar">
      <p>We use cookies to track visits and time spent.</p>
      <div className="cookie-actions">
        <button className="cookie-decline" onClick={declineCookies}>
          Decline
        </button>
        <button className="cookie-accept" onClick={acceptCookies}>
          Accept
        </button>
      </div>
    </div>
  );
}
