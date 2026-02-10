import pb from "../lib/pb";

const getClientInfo = () => {
  if (typeof window === "undefined") return {};

  const ua = navigator.userAgent;

  // browser detect (order matters)
  const browser =
    ua.includes("Edg") ? "Edge" :
    ua.includes("Chrome") ? "Chrome" :
    ua.includes("Firefox") ? "Firefox" :
    ua.includes("Safari") ? "Safari" :
    "Other";

  // OS detect
  const os =
    ua.includes("Android") ? "Android" :
    ua.includes("iPhone") || ua.includes("iPad") ? "iOS" :
    ua.includes("Windows") ? "Windows" :
    ua.includes("Mac") ? "MacOS" :
    "Other";

  const device =
    /Mobi|Android/i.test(ua) ? "Mobile" : "Desktop";

  return {
    userAgent: ua,
    browser,
    os,
    device,
  };
};

export const trackPageView = async ({
  page,
  visits = 1,
  timeSpent = 0,
  lastActivity,
}) => {
  if (!page) return;

  // Ensure `visits` and `timeSpent` are numbers and fall back to default values
  visits = typeof visits === "number" ? visits : 1;
  timeSpent = typeof timeSpent === "number" ? timeSpent : 0;

  try {
    const data = {
      page,
      visits,
      timeSpent,
      lastActivity: lastActivity
        ? new Date(lastActivity).toISOString()
        : new Date().toISOString(),
      ...getClientInfo(),
    };

    // Logging to check data before sending
    console.log("Analytics data being sent:", data);

    await pb.collection("analytics").create(data);
  } catch (e) {
    console.error("❌ Analytics create failed:", e?.response?.data || e);
  }
};
