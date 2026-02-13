import pb from "../lib/pb";

export const getExploreBanners = async () => {
  try {
    const records = await pb.collection("explore_banners").getFullList({
      filter: "active = true",
      sort: "created",
    });

    const formatted = records.map((item) => ({
      id: item.id,
      position: item.position || "",
      title: item.title || "",
      subtitle: item.subtitle || "",
      bottomText: item.bottom_text || "",
      buttonText:
        item.button_text && item.button_text.trim() !== ""
          ? item.button_text
          : "Shop Now",   // 👈 default fallback
      productSlug: item.product_slug || "",
      imageUrl: item.image
        ? pb.files.getUrl(item, item.image)
        : "",
    }));

    return {
      left: formatted.filter(b => b.position === "left"),
      rightTop: formatted.filter(b => b.position === "right_top"),
      rightBottom: formatted.filter(b => b.position === "right_bottom"),
    };

  } catch (error) {
    console.error("Explore banner fetch error:", error);
    return {
      left: [],
      rightTop: [],
      rightBottom: [],
    };
  }
};
