import React, { useEffect, useState } from "react";
import "./Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { signInWithGoogle, auth } from "../../lib/firebase";
import { trackLogin } from "../../api/trackLogin";
import { onAuthStateChanged, signOut } from "firebase/auth";

const waitForAuth = () =>
  new Promise((resolve) => {
    if (auth.currentUser) return resolve(auth.currentUser);
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      resolve(user);
    });
  });

const Login = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // 🔥 Listen to auth state (so Login modal knows if user is logged in)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await signInWithGoogle();
      if (!result?.user) {
        throw new Error("No Firebase user returned from Google login");
      }

      const user = await waitForAuth();
      if (!user) throw new Error("Firebase auth not ready");

      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email,
        photo: user.photoURL || null,
      };

      console.log("Firebase user:", userData);

      await trackLogin(userData);

      if (closeModal) closeModal();
    } catch (error) {
      console.error("❌ Google login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="login-backdrop">
      <div className="login-container">

        {/* ===== HEADER ===== */}
        <div className="login-header">
          <span className="login-title">Login</span>

          <div className="header-actions">
            <span className="theme-icon" aria-label="Toggle theme">☀️</span>
            <button
              className="close-btn"
              onClick={closeModal}
              aria-label="Close login modal"
            >
              ×
            </button>
          </div>
        </div>

        <div className="divider" />

        {/* ===== BODY ===== */}
        <div className="login-body">

          <div className="text-group">
            <h3 className="main-text">
              CONTINUE WITH{" "}
              <span className="highlight-text great">GREAT</span>{" "}
              <span className="highlight-text vision">VISION</span>
            </h3>

            <h4 className="second-text">Electricals</h4>
          </div>

          {!user ? (
            <button
              className="google-btn"
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <i className="fab fa-google" aria-hidden="true"></i>
              {loading ? "Signing in..." : "Continue with Google"}
            </button>
          ) : (
            <div className="logged-in-box">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="login-avatar"
                referrerPolicy="no-referrer"
              />
              <p className="login-email">{user.email}</p>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

        </div>

        <div className="divider divider-footer" />

        <div className="login-footer">
          2008 Shivam Electricals
        </div>

      </div>
    </div>
  );
};

export default Login;
