import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import "./Header.css";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

const Header = ({ openLoginModal }: { openLoginModal: () => void }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
          <div className="logo">
            <span className="logo-great">Great</span>
            <span className="logo-vision">Vision</span>
          </div>

          <nav className="nav">
            <Link to="home" smooth={true} duration={500}>
              <i className="fa-solid fa-house"></i> Home
            </Link>
            <Link to="store" smooth={true} duration={500}>
              <i className="fa-solid fa-store"></i> Store
            </Link>
            <Link to="about" smooth={true} duration={500}>
              <i className="fa-solid fa-circle-info"></i> About
            </Link>
            <Link to="/contact" smooth={true} duration={500}>
              <i className="fa-solid fa-envelope"></i> Contact
            </Link>
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
              <button
                className="user-profile-btn"
                onClick={openLoginModal}
              >
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
