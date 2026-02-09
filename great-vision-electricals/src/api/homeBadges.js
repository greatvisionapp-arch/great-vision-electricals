import pb from "../lib/pb";

export async function getHomeBadges() {
  const records = await pb.collection("home_badges").getFullList({
    filter: "active = true",
    sort: "order",
  });

  return records.map((r) => ({
    id: r.id,
    text: r.text,
    order: r.order,
  }));
}
