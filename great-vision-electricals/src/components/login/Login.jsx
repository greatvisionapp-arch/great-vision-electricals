import React, { useEffect, useState } from "react";
import "./Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { signInWithGoogle, auth } from "../../lib/firebase";
import { trackLogin } from "../../api/trackLogin";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const waitForAuth = () =>
  new Promise((resolve) => {
    if (auth.currentUser) return resolve(auth.currentUser);
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      resolve(user);
    });
  });

const Login = ({ closeModal }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    if (loading || !agreeTerms || !agreePrivacy) return;

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
      setAgreeTerms(false);
      setAgreePrivacy(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleNavigate = (path, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (closeModal) closeModal(); // ✅ modal close
    navigate(path);               // ✅ navigate
  };

  const isDisabled = loading || !agreeTerms || !agreePrivacy;

  return (
    <div className="login-backdrop">
      <div className="login-container">

        <div className="login-header">
          <span className="login-title">Login</span>
          <div className="header-actions">
            <span className="theme-icon">☀️</span>
            <button className="close-btn" onClick={closeModal}>×</button>
          </div>
        </div>

        <div className="divider" />

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
            <>
              {/* Terms */}
              <div className="terms-box">
                <label>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  I agree to the{" "}
                  <span
                    className="terms-link"
                    onClick={(e) => handleNavigate("/terms", e)}
                  >
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {/* Privacy */}
              <div className="terms-box">
                <label>
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                  />
                  I agree to the{" "}
                  <span
                    className="terms-link"
                    onClick={(e) => handleNavigate("/privacy", e)}
                  >
                    Privacy Policy
                  </span>
                </label>
              </div>

              <button
                className="google-btn"
                type="button"
                onClick={handleGoogleLogin}
                disabled={isDisabled}
              >
                <i className="fab fa-google"></i>
                {loading ? "Signing in..." : "Continue with Google"}
              </button>
            </>
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
