import pb from "../lib/pb";

export const getHomeSubtitles = async () => {
  return await pb.collection("home_subtitles").getFullList({
    filter: "active = true",
    sort: "order",
  });
};
