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

      {/* Map Section */}
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

      {/* Trademark Details */}
      <div className="contact-card" style={{ marginTop: "30px" }}>
        <h2>Trademark Registration Details</h2>

        {/* Class 9 */}
        <h3>Class 9 (Registered)</h3>

        <div className="contact-row">
          <span className="contact-label">Word Mark</span>
          <span className="contact-value">
            GREAT VISION WITH THE DEVICE OF GV
          </span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Application No.</span>
          <span className="contact-value">6317582</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Application Date</span>
          <span className="contact-value">23/02/2024</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Proprietor</span>
          <span className="contact-value">Nirbhay Kumar</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Valid Upto</span>
          <span className="contact-value">23/02/2034</span>
        </div>

        <hr style={{ margin: "20px 0" }} />

        {/* Class 11 */}
        <h3>Class 11 (Formalities Chk Pass)</h3>

        <div className="contact-row">
          <span className="contact-label">Word Mark</span>
          <span className="contact-value">
            GREAT VISION along with logo GV (Color Label)
          </span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Application No.</span>
          <span className="contact-value">6718900</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Application Date</span>
          <span className="contact-value">21/11/2024</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Used Since</span>
          <span className="contact-value">01/04/2021</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Status</span>
          <span className="contact-value">Formalities Check Pass</span>
        </div>

        <div className="contact-row">
          <span className="contact-label">Proprietor</span>
          <span className="contact-value">Nirbhay Kumar</span>
        </div>

      </div>

    </div>
  );
}
