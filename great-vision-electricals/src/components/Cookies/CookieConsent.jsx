import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../../api/analytics";
import "./cookie.css";

const CONSENT_NAME = "cookie_consent";
const USER_ID = "site_user_id";

const setCookie = (name, value, days = 365) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name) => {
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? match[2] : null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

const generateUserId = () => "user-" + crypto.randomUUID();

const getCurrentPage = () => {
  const hashPath = window.location.hash.replace("#", "");
  if (hashPath && hashPath !== "/") return hashPath;
  return window.location.pathname || "/";
};

export default function CookieConsent() {
  const location = useLocation();
  const [consent, setConsent] = useState(
    () => getCookie(CONSENT_NAME) === "true"
  );
  const [show, setShow] = useState(false);

  const startTimeRef = useRef(null);
  const pageRef = useRef(null);
  const userIdRef = useRef(null);

  useEffect(() => {
    setShow(!consent);
  }, [consent]);

 useEffect(() => {
  if (!consent) return;

  let userId = getCookie(USER_ID);
  if (!userId) {
    userId = generateUserId();
    setCookie(USER_ID, userId);
  }

  userIdRef.current = userId;

  const currentPage =
    location.pathname +
    location.search +
    location.hash;

  // 🔥 Send visit immediately
  trackPageView({
    userId,
    page: currentPage,
    visits: 1,
    timeSpentMinutes: 0,
  });

  pageRef.current = currentPage;
  startTimeRef.current = Date.now();

  return () => {
    if (!startTimeRef.current || !pageRef.current) return;

    const seconds = Math.floor(
      (Date.now() - startTimeRef.current) / 1000
    );

    const minutes = Number((seconds / 60).toFixed(2));

    trackPageView({
      userId: userIdRef.current,
      page: pageRef.current,
      visits: 0,
      timeSpentMinutes: minutes,
    });
  };

}, [
  location.key,        // 🔥 important
  location.pathname,
  location.search,
  location.hash,
  consent
]);


  const acceptCookies = () => {
    setCookie(CONSENT_NAME, "true");
    setConsent(true);
  };

  const declineCookies = () => {
    deleteCookie(CONSENT_NAME);
    deleteCookie(USER_ID);
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
