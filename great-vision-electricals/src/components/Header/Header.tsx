import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          {/* LOGO */}
          <div className="logo">
  <span className="logo-great">Great</span>
  <span className="logo-vision">Vision</span>
</div>

          {/* NAV */}
          <nav className="nav">
            <a href="#home"><i className="fa-solid fa-house"></i>Home</a>
            <a href="#store"><i className="fa-solid fa-store"></i>Store</a>
            <a href="#about"><i className="fa-solid fa-circle-info"></i>About</a>
            <a href="#contact"><i className="fa-solid fa-envelope"></i>Contact</a>
          </nav>

          {/* ACTIONS */}
          <div className="actions">
            {/* THEME BUTTON */}
            <button className="icon-btn" onClick={toggleTheme}>
              <i
                className={`fa-solid ${
                  theme === "dark" ? "fa-sun" : "fa-moon"
                }`}
              ></i>
            </button>

            <button className="admin">
              <i className="fa-solid fa-user-shield"></i>
              Admin
            </button>
          </div>
        </div>
      </header>

      <div className="header-divider"></div>
    </>
  );
};

export default Header;
