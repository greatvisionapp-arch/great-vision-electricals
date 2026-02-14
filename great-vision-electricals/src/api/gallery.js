import pb from "../lib/pb";

/**
 * Fetch all gallery images from PocketBase
 */
export const getGalleryImages = async () => {
  try {
    const records = await pb.collection("gallery").getFullList({
      sort: "-created",
    });

    const formatted = [];

    records.forEach((record) => {
      if (!record.image) return;

      // If file field is multiple
      const files = Array.isArray(record.image)
        ? record.image
        : [record.image];

      files.forEach((file) => {
        formatted.push({
          id: record.id,
          title: record.title || "Great Vision Image",
          image: pb.files.getUrl(record, file),
          created: record.created,
        });
      });
    });

    return formatted;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
};
