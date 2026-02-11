import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import BelowHome from "./components/BelowHome/BelowHome";
import CookieConsent from "./components/Cookies/CookieConsent";
import Community from "./components/Community/Community";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import { auth } from "./lib/firebase";              // 🔥 IMPORTANT
import { onAuthStateChanged } from "firebase/auth"; // 🔥 IMPORTANT

const App = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // 🔥 Track auth state once
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // अगर user already logged in है → कुछ मत दिखाओ
    if (user) return;

    const lastShown = localStorage.getItem("loginModalLastShown");
    const now = Date.now();

    if (!lastShown || now - Number(lastShown) > 2 * 60 * 1000) {
      const timer = setTimeout(() => {
        setLoginModalOpen(true);
        localStorage.setItem("loginModalLastShown", Date.now().toString());
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [user]); // 🔥 IMPORTANT dependency

  return (
    <>
      <Header openLoginModal={() => setLoginModalOpen(true)} />

      <Home />
      <BelowHome />
      <Community />
      <CookieConsent />
      <Footer />

      {isLoginModalOpen && (
        <Login closeModal={() => setLoginModalOpen(false)} />
      )}
    </>
  );
};

export default App;
