import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import "./Header.css";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

interface HeaderProps {
  openLoginModal: () => void;
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

const Header = ({ openLoginModal, theme, setTheme }: HeaderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">

          <RouterLink to="/" className="logo">
            <span className="logo-great">Great</span>
            <span className="logo-vision">Vision</span>
          </RouterLink>

          <nav className="nav">

            {location.pathname === "/" ? (
              <>
                <ScrollLink to="home" smooth duration={500}>
                  <i className="fa-solid fa-house"></i> Home
                </ScrollLink>

                <ScrollLink to="about" smooth duration={500}>
                  <i className="fa-solid fa-circle-info"></i> About
                </ScrollLink>
              </>
            ) : (
              <RouterLink to="/">
                <i className="fa-solid fa-house"></i> Home
              </RouterLink>
            )}

            <RouterLink to="/explore">
              <i className="fa-solid fa-store"></i> Explore
            </RouterLink>

            <RouterLink to="/contact">
              <i className="fa-solid fa-envelope"></i> Contact
            </RouterLink>

          </nav>

          <div className="actions">
            <button className="icon-btn" onClick={toggleTheme}>
              <i
                className={`fa-solid ${
                  theme === "dark" ? "fa-sun" : "fa-moon"
                }`}
              ></i>
            </button>

            {user ? (
              <button className="user-profile-btn" onClick={openLoginModal}>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="user-avatar"
                  referrerPolicy="no-referrer"
                />
                <span className="user-email">
                  {user.displayName || user.email}
                </span>
              </button>
            ) : (
              <button className="admin" onClick={openLoginModal}>
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </button>
            )}
          </div>

        </div>
      </header>

      <div className="header-divider"></div>
    </>
  );
};

export default Header;
