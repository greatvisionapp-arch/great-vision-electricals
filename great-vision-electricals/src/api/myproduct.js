import pb from "../lib/pb";

// 🔹 My Products
export async function getMyProducts() {
  try {
    const records = await pb.collection("products").getFullList({
      filter: 'type = "mine" && active = true',
      sort: "-created",
    });

    return records; // ❗ original record return karo
  } catch (error) {
    console.error("My Products Error:", error);
    return [];
  }
}

// 🔹 Other Brand Products
export async function getOtherProducts() {
  try {
    const records = await pb.collection("products").getFullList({
      filter: 'type = "other" && active = true',
      sort: "-created",
    });

    return records; // ❗ original record return karo
  } catch (error) {
    console.error("Other Products Error:", error);
    return [];
  }
}

// 🔹 Image URL (Proper + Safe)
export function getProductImage(record) {
  try {
    if (!record || !record.image) return "";

    const filename = Array.isArray(record.image)
      ? record.image[0]
      : record.image;

    return pb.files.getURL(record, filename);
  } catch (err) {
    console.error("Image URL error:", err);
    return "";
  }
}
