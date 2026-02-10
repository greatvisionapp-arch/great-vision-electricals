import pb from "../lib/pb";

export async function getCommunityBoxes() {
  try {
    const records = await pb.collection("community_boxes").getFullList({
      sort: "created",
    });

    console.log("🔥 PocketBase records:", records); // ← ADD THIS

    const top = records
      .filter(r => r.position === "top")
      .map(r => ({ id: r.id, name: r.name, msg: r.msg }));

    const bottom = records
      .filter(r => r.position === "bottom")
      .map(r => ({ id: r.id, name: r.name, msg: r.msg }));

    console.log("🔥 Parsed top:", top);
    console.log("🔥 Parsed bottom:", bottom);

    return { top, bottom };
  } catch (err) {
    console.error("❌ getCommunityBoxes failed:", err?.response?.data || err);
    return { top: [], bottom: [] };
  }
}
