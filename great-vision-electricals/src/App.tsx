import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Owner from "./components/Owner/Owner";
import BelowHome from "./components/BelowHome/BelowHome";
import CookieConsent from "./components/Cookies/CookieConsent";
import Community from "./components/Community/Community";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";

import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// ✅ Lazy loaded pages
const PrivacyPolicy = lazy(() =>
  import("./components/Privacy/PrivacyPolicy")
);

const TermsConditions = lazy(() =>
  import("./components/TermsConditions/TermsConditions")
);

const Contact = lazy(() =>
  import("./components/Contact/Contact.jsx")
);


const App = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Track auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // Login modal logic
  useEffect(() => {
    if (user) return;

    const lastShown = localStorage.getItem("loginModalLastShown");
    const now = Date.now();

    if (!lastShown || now - Number(lastShown) > 2 * 60 * 1000) {
      const timer = setTimeout(() => {
        setLoginModalOpen(true);
        localStorage.setItem("loginModalLastShown", Date.now().toString());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  const LoadingFallback = (
    <div style={{ padding: "24px", textAlign: "center" }}>
      Loading...
    </div>
  );

  return (
    <Router>

      <Header openLoginModal={() => setLoginModalOpen(true)} />

      <Suspense fallback={LoadingFallback}>
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Owner />
                <BelowHome />
                <Community />
                <CookieConsent />
              </>
            }
          />

          {/* Privacy Policy */}
          <Route
            path="/privacy"
            element={<PrivacyPolicy />}
          />

          {/* Terms and Conditions */}
          <Route
            path="/terms"
            element={<TermsConditions />}
          />

            {/* FIXED CONTACT ROUTE */}
    <Route
      path="/contact"
      element={<Contact />}
    />

        </Routes>
      </Suspense>

      <Footer />

      {/* Login Modal */}
      {isLoginModalOpen && (
        <Login closeModal={() => setLoginModalOpen(false)} />
      )}

    </Router>
  );
};

export default App;
