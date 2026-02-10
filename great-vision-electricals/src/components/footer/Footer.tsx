import React from 'react';
import './Footer.css';  // Import the corresponding CSS file

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>GREAT VISION</h3>
          <p>GREAT VISION ELECTRICALS OWNED BY SHIVAM ELECTRICALS PALIGANJ</p>
        </div>

        <div className="footer-section product">
          <h3>PRODUCT</h3>
          <ul>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
          </ul>
        </div>

        <div className="footer-section community">
          <h3>COMMUNITY</h3>
          <ul>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Discord</a></li>
            <li><a href="#">Reddit</a></li>
            <li><a href="#">Mastodon</a></li>
            <li><a href="#">Merch</a></li>
          </ul>
        </div>

        <div className="footer-section legal">
          <h3>LEGAL</h3>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Imprint</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()}  SHIVAM ELECTRICALS PALIGANJ </p>
        <p>Website designed by <a href="https://instagram.com?=shi_vam__9">Shivam Kumar</a></p>
      </div>
    </footer>
  );
};

export default Footer;
