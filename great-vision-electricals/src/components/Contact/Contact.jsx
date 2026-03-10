import "./Contact.css";
import logo from "../../assets/logo.png";

export default function Contact() {

  const mapQuery =
    "Chandhosh Road Kushwaha Market Paliganj Patna Bihar India";

  const mapEmbed =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(mapQuery) +
    "&output=embed";

  const mapLink =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(mapQuery);

  return (
    <div className="contact-container">

      {/* ACCOUNT DELETION HERO */}
      <div className="delete-hero">
        <div className="delete-hero-icon">⚠️</div>

        <div className="delete-hero-content">
          <h2>Delete Your Account</h2>

          <p>
            If you want to permanently delete your Great Vision account
            and all associated personal data, send a request using your
            registered mobile number to:
          </p>

          <a
            className="delete-email-btn"
            href="mailto:greatvisionapp@gmail.com"
          >
            greatvisionapp@gmail.com
          </a>

          <p className="delete-small">
            Your account and personal data will be deleted within
            7 days after verification. Some transaction records
            may be retained for fraud-prevention or legal compliance.
          </p>
        </div>
      </div>


      {/* Logo */}
      <div className="contact-logo">
        <img
          src={logo}
          alt="Great Vision Electricals Logo"
          className="contact-logo-img"
          loading="eager"
        />
      </div>

      <h1>Contact Great Vision</h1>

      <p className="contact-subtitle">
        Reach us online or visit our physical store for electrical products and services.
      </p>

      {/* Business Info */}
      <div className="contact-card">

        <div className="contact-row">
          <span className="contact-label">Business</span>
          <span className="contact-value">Great Vision</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Owner</span>
          <span className="contact-value">Nirbhay Kumar</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Operated By</span>
          <span className="contact-value">Shivam Electricals</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Website Manager</span>
          <span className="contact-value">Shivam Kumar</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">GSTIN</span>
          <span className="contact-value">10BYNPK8058A1ZN</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Phone</span>
          <span className="contact-value">
            <a href="tel:+918002225022">
              +91 8002225022
            </a>
          </span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Email</span>
          <span className="contact-value">
            <a href="mailto:greatvisionapp@gmail.com">
              greatvisionapp@gmail.com
            </a>
          </span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Address</span>
          <span className="contact-value">
            Chandhosh Road, Kushwaha Market<br />
            Paliganj, Patna - 801110<br />
            Bihar, India
          </span>
        </div>

      </div>

      {/* Map */}
      <div className="contact-map">

        <h2>Visit Our Shop</h2>

        <iframe
          title="Great Vision Shop Location"
          src={mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="contact-map-frame"
        />

        <div className="map-button-container">

          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="map-button"
          >
            Open in Google Maps
          </a>

          <a
            href="tel:+918002225022"
            className="map-button call-button"
          >
            Call Now
          </a>

        </div>

      </div>

    </div>
  );
}