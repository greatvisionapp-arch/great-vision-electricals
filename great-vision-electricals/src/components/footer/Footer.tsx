import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faGoogle,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* About Section */}
        <div className="footer-section">
          <h3>GREAT VISION ELECTRICALS</h3>
          <ul>
            <li>
              <i className="fa-solid fa-location-dot"></i>
              Chandhosh Road, Kushwaha Market, Paliganj, Patna-801110, Bihar
            </li>
            <li>
              <i className="fa-solid fa-file-invoice"></i>
              GSTIN: 10BYNPK8058A1ZN
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              Contact: 8002225022
            </li>
          </ul>
        </div>

        {/* Product Section */}
        <div className="footer-section">
          <h3>PRODUCT</h3>
          <ul>
            <li><Link to="/explore">Explore Products</Link></li>
            <li><Link to="/contact">Bulk Orders</Link></li>
          </ul>
        </div>

        {/* Community Section */}
        <div className="footer-section">
          <h3>COMMUNITY</h3>
          <ul>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGoogle} /> Google
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} /> Youtube
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="footer-section">
          <h3>LEGAL</h3>
          <ul>
            <li>
              <Link to="/privacy">
                <i className="fa-solid fa-shield-halved"></i> Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms">
                <i className="fa-solid fa-file-contract"></i> Terms
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <i className="fa-solid fa-phone"></i> Contact
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} SHIVAM ELECTRICALS PALIGANJ
        </p>
        <p>
          Website designed by{" "}
          <a
            href="https://instagram.com/shi_vam__9"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shivam Kumar
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
