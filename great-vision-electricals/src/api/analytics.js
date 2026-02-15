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
  if (!userId || !page) return;

  try {
    // 🔥 Check existing record
    const existing = await pb
      .collection("analytics")
      .getFirstListItem(
        `userId="${userId}" && page="${page}"`,
        { requestKey: null }
      )
      .catch(() => null);

    if (existing) {
      // 🔥 Update existing record
      await pb.collection("analytics").update(existing.id, {
        visits: (existing.visits || 0) + Number(visits),
        timeSpentMinutes:
          (existing.timeSpentMinutes || 0) + Number(timeSpentMinutes),
        lastActivity: new Date().toISOString(),
        ...getClientInfo(),
      });

    } else {
      // 🔥 Create new record
      await pb.collection("analytics").create({
        userId: String(userId),
        page: String(page),
        visits: Number(visits),
        timeSpentMinutes: Number(timeSpentMinutes),
        lastActivity: new Date().toISOString(),
        ...getClientInfo(),
      });
    }

  } catch (err) {
    console.error("❌ Analytics Error:", err);
  }
};
