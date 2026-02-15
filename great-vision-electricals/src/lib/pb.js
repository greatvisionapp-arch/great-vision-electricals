import PocketBase from "pocketbase";

const pb = new PocketBase("https://api.shivamelectricals.shop");

// 🔥 Disable auto request cancellation
pb.autoCancellation(false);

export default pb;
