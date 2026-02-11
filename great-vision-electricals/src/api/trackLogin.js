import { auth } from "../lib/firebase";
import { getDatabase, ref, get, set, update } from "firebase/database";
import pb from "../lib/pb";

const db = getDatabase();

/* ---------- HELPER: wait for Firebase auth to actually be ready ---------- */
const waitForAuth = () =>
  new Promise((resolve) => {
    if (auth.currentUser) return resolve(auth.currentUser);
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      resolve(user);
    });
  });

const getClientInfo = () => {
  if (typeof window === "undefined") return {};

  const ua = navigator.userAgent || "";

  const browser =
    ua.includes("Edg") ? "Edge" :
    ua.includes("Chrome") ? "Chrome" :
    ua.includes("Firefox") ? "Firefox" :
    ua.includes("Safari") ? "Safari" :
    "Other";

  const os =
    ua.includes("Android") ? "Android" :
    ua.includes("iPhone") || ua.includes("iPad") ? "iOS" :
    ua.includes("Windows") ? "Windows" :
    ua.includes("Mac") ? "MacOS" :
    "Other";

  const device = /Mobi|Android/i.test(ua) ? "Mobile" : "Desktop";

  return { userAgent: ua, browser, os, device };
};

const escapeEmail = (email) =>
  email.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

export const trackLogin = async ({ email, name, photo } = {}) => {
  if (!email) {
    console.error("❌ trackLogin aborted: email missing");
    return null;
  }

  try {
    // 🔥 WAIT for Firebase auth
    const user = await waitForAuth();
    if (!user) {
      console.error("❌ No authenticated Firebase user found");
      return null;
    }

    const uid = user.uid;
    const now = new Date().toISOString();
    const clientInfo = getClientInfo();

    // =================== 1️⃣ FIREBASE WRITE ===================
    const userRef = ref(db, `auth_users/${uid}`);
    const snapshot = await get(userRef);
    const exists = snapshot.exists();

    let firebasePayload;

    if (!exists) {
      firebasePayload = {
        uid,
        email,
        name: name || email,
        photo: photo || null,
        first_login: now,
        last_login: now,
        login_count: 1,
        ...clientInfo,
      };

      await set(userRef, firebasePayload);
    } else {
      const prev = snapshot.val();

      firebasePayload = {
        ...prev,
        last_login: now,
        login_count: (prev.login_count || 0) + 1,
        ...clientInfo,
      };

      await update(userRef, firebasePayload);
    }

    // =================== 2️⃣ POCKETBASE MIRROR ===================

    console.log("👉 ABOUT TO SEND TO POCKETBASE", { uid, email });

    // 🔥 CRITICAL FIX FOR "1 = 1" RULE:
    // PocketBase requires: record.id == @request.auth.id
    const pbUser = pb.authStore.model;
    if (!pbUser) {
      throw new Error("❌ Not logged into PocketBase — cannot satisfy 1 = 1 rule");
    }

    const pbId = pbUser.id; // PocketBase authenticated user ID

    const safeEmail = escapeEmail(email);

    const existing = await pb
      .collection("auth_users")
      .getFirstListItem(`email="${safeEmail}"`)
      .catch(() => null);

    if (!existing) {
      // FIRST TIME → create record with SAME ID as PocketBase user
      await pb.collection("auth_users").create({
        id: pbId,          // 🔥 MUST MATCH @request.auth.id for "1 = 1"
        uid,               // Firebase UID (link)
        email,
        name: name || email,
        photo: photo || null,
        first_login: now,
        last_login: now,
        login_count: 1,
        ...clientInfo,
      });
    } else {
      // UPDATE existing record (passes 1 = 1 because owner matches)
      await pb.collection("auth_users").update(existing.id, {
        last_login: now,
        login_count: (existing.login_count || 0) + 1,
        ...clientInfo,
      });
    }

    console.log("✅ PocketBase write completed");
    return firebasePayload;

  } catch (e) {
    console.error("❌ Login tracking failed:", e?.response?.data || e);
    throw e;
  }
};
