import pb from "../lib/pb";

/* ---------- CLIENT INFO ---------- */
const getClientInfo = () => {
  if (typeof window === "undefined") return {};

  const ua = navigator.userAgent;

  return {
    userAgent: ua,
    browser:
      ua.includes("Edg") ? "Edge" :
      ua.includes("Chrome") ? "Chrome" :
      ua.includes("Firefox") ? "Firefox" :
      ua.includes("Safari") ? "Safari" :
      "Other",
    os:
      ua.includes("Android") ? "Android" :
      ua.includes("iPhone") || ua.includes("iPad") ? "iOS" :
      ua.includes("Windows") ? "Windows" :
      ua.includes("Mac") ? "MacOS" :
      "Other",
    device: /Mobi|Android/i.test(ua) ? "Mobile" : "Desktop",
  };
};

/* ---------- TRACK FUNCTION ---------- */
export const trackPageView = async ({
  userId,
  page,
  visits = 1,
  timeSpentMinutes = 0,
}) => {
  if (!userId || !page) {
    console.warn("⚠ Missing userId or page", { userId, page });
    return;
  }

  const data = {
    userId: String(userId),
    page: String(page),
    visits: Number(visits) || 1,
    timeSpentMinutes: Number(timeSpentMinutes) || 0,
    lastActivity: new Date().toISOString(),
    ...getClientInfo(),
  };

  console.log("📤 Sending analytics:", data);

  try {
    const record = await pb.collection("analytics").create(data);
    console.log("✅ Analytics saved:", record);
  } catch (err) {
    console.error("❌ FULL ERROR:", err);
    if (err?.response) {
      console.error("❌ Response Data:", err.response);
    }
  }
};
