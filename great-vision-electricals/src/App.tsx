import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Owner from "./components/Owner/Owner";
import BelowHome from "./components/BelowHome/BelowHome";
import CookieConsent from "./components/Cookies/CookieConsent";
import Community from "./components/Community/Community";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import PrivacyPolicy from "./components/Privacy/PrivacyPolicy";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

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

  return (
    <Router>
      <Header openLoginModal={() => setLoginModalOpen(true)} />

      <Routes>
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

        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />

      {isLoginModalOpen && (
        <Login closeModal={() => setLoginModalOpen(false)} />
      )}
    </Router>
  );
};

export default App;
