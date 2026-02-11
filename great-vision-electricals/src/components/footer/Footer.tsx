import React from 'react';
import './Footer.css';  // Import the corresponding CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDiscord, faReddit, faMastodon, faFacebook, faGoogle, faYoutube, } from '@fortawesome/free-brands-svg-icons';


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
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
</li></ul>

        </div>

        <div className="footer-section product">
  <div className="footer-section product">
          <h3>PRODUCT</h3>
          <ul>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
          </ul>
        </div> 
</div>


        <div className="footer-section community">
  <h3>COMMUNITY</h3>
  <ul>
    <li><a href="#"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
    <li><a href="#"><FontAwesomeIcon icon={faFacebook} />  Facebook</a></li>
    <li><a href="#"><FontAwesomeIcon icon={faGoogle} />   Google</a></li>
    <li><a href="#"><FontAwesomeIcon icon={faYoutube} /> Youtube</a></li>
    
  </ul>
</div>


        <div className="footer-section legal">
          <h3>LEGAL</h3>
          <ul>
            <li>
  <a href="/privacy">
    <i className="fa-solid fa-shield-halved"></i> Privacy Policy
  </a>
</li>
<li>
  <a href="#">
    <i className="fa-solid fa-file-contract"></i> Terms
  </a>
</li>
<li>
  <a href="#">
    <i className="fa-solid fa-phone"></i> Contact
  </a>
</li>

          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()}  SHIVAM ELECTRICALS PALIGANJ </p>
        <p>Website designed by <a href="https://instagram.com?=shi_vam__9">Shivam Kumar</a></p>
      </div>
      <section id="about">
  {/* Your About content */}
</section>

    </footer>
  );
};

export default Footer;
