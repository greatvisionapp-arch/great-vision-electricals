import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faGoogle,
  faYoutube,
  faWhatsapp,
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
              📍 Chandhosh Road, Kushwaha Market, Paliganj, Patna-801110, Bihar
            </li>
            <li>
              🧾 GSTIN: 10BYNPK8058A1ZN{" "}
              <a
                href="https://services.gst.gov.in/services/searchtp?gstin=10BYNPK8058A1ZN"
                target="_blank"
                rel="noopener noreferrer"
              >
                (Verify)
              </a>
            </li>
            <li>
              📞 <a href="tel:+918002225022">+91 8002225022</a>
            </li>
            <li>
              📧 <a href="mailto:support@greatvision.shop">support@greatvision.shop</a>
            </li>
            <li>
              👤 Owner: Nirbhay Kumar
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
          <h3>CONNECT</h3>
          <ul>
            <li>
              <a
                href="https://wa.me/918002225022"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/iGjYX4UQmvzYKzLg9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGoogle} /> Google Maps
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/great_vision_electricals/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/GreatVisionElectricals/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} /> YouTube
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="footer-section">
          <h3>LEGAL</h3>
          <ul>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Great Vision Electricals (Shivam Electricals)
        </p>
        <p>
          Website managed by{" "}
          <a
            href="https://www.instagram.com/great_vision_electricals/"
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