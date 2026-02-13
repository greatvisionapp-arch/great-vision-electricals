import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Owner from "./components/Owner/Owner";
import BelowHome from "./components/BelowHome/BelowHome";
import CookieConsent from "./components/Cookies/CookieConsent";
import Community from "./components/Community/Community";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";

import Guides from "./components/Guides/Guides.jsx";
import AdSense from "./components/AdSense/AdSense.jsx";

import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const PrivacyPolicy = lazy(() =>
  import("./components/Privacy/PrivacyPolicy")
);

const TermsConditions = lazy(() =>
  import("./components/TermsConditions/TermsConditions")
);

const Contact = lazy(() =>
  import("./components/Contact/Contact.jsx")
);

const Explore = lazy(() =>
  import("./components/Explore/Explore.jsx")
);

const ViewDetails = lazy(() =>
  import("./components/Explore/Product/ViewDetails/ViewDetails.jsx")
);


// Layout
const Layout = ({ children }) => {
  const location = useLocation();

  const hideFooterRoutes = ["/explore"];
  const isProductRoute = location.pathname.startsWith("/product");

  return (
    <>
      {children}
      {!hideFooterRoutes.includes(location.pathname) &&
        !isProductRoute && <Footer />}
    </>
  );
};




const App = () => {

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [theme, setTheme] = useState("dark");


  useEffect(() => {

    document.documentElement.setAttribute("data-theme", theme);

  }, [theme]);


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

    if (!lastShown || now - Number(lastShown) > 120000) {

      const timer = setTimeout(() => {

        setLoginModalOpen(true);

        localStorage.setItem(
          "loginModalLastShown",
          Date.now().toString()
        );

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

      <Header
        theme={theme}
        setTheme={setTheme}
        openLoginModal={() => setLoginModalOpen(true)}
      />

      <Suspense fallback={LoadingFallback}>

        <Layout>

          <Routes>

            <Route
              path="/"
              element={
                <>
                  <Home />

                  <Owner />

                  <BelowHome />

                  <Guides />

                  <AdSense />

                  <Community />

                  <CookieConsent />
                </>
              }
            />

            <Route path="/privacy" element={<PrivacyPolicy />} />

            <Route path="/terms" element={<TermsConditions />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/explore" element={<Explore />} />
            <Route path="/product/:id" element={<ViewDetails />} />



          </Routes>

        </Layout>

      </Suspense>

      {isLoginModalOpen && (
        <Login closeModal={() => setLoginModalOpen(false)} />
      )}

    </Router>
  );

};

export default App;
