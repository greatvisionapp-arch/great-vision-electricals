import pb from "../lib/pb";

// 🔹 My Products
export async function getMyProducts() {
  try {
    const records = await pb.collection("products").getFullList(500, {
      filter: 'type = "mine"',
      sort: "-created",
    });

    return records;
  } catch (error) {
    console.error("My Products Error:", error);
    return [];
  }
}

// 🔹 Other Brand Products
export async function getOtherProducts() {
  try {
    const records = await pb.collection("products").getFullList(500, {
      filter: 'type = "other"',
      sort: "-created",
    });

    return records;
  } catch (error) {
    console.error("Other Products Error:", error);
    return [];
  }
}
