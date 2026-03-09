import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">

      <h1>Privacy Policy</h1>

      <p className="effective-date">
        Effective Date: 12 February 2026
      </p>

      <p>
        This Privacy Policy explains how Great Vision Electricals (“we,” “us,” or “our”) collects,
        uses, stores, and protects your information when you use the Great Vision website
        or mobile application.
      </p>

      <p>
        By using the platform, users agree to the terms of this Privacy Policy.
      </p>

      <div className="privacy-section">
        <h2>1. Who We Are</h2>

        <div className="contact-box">
          <p><strong>Business Name:</strong> Great Vision Electricals</p>
          <p><strong>Location:</strong> Kushwaha Market, Paliganj, Patna, Bihar, India</p>
          <p><strong>Email:</strong> greatvisionapp@gmail.com</p>
        </div>
      </div>

      <div className="privacy-section">
        <h2>2. About the Great Vision Application</h2>

        <p>
          Great Vision is a <span className="highlight">private reward platform</span>
          developed for electricians associated with our store.
        </p>

        <p>
          The application is <span className="highlight">not intended for public use</span>.
          Only electricians who are verified and approved by the store administrator
          can access the platform.
        </p>

        <p>
          The platform works using a
          <span className="feature"> QR Coupon Reward System </span>
          where electricians earn reward points for eligible product sales.
        </p>
      </div>

      <div className="privacy-section">
        <h2>3. Personal Information We Collect</h2>

        <p>
          To verify electricians and operate the reward system we may collect:
        </p>

        <ul>
          <li>Name</li>
          <li>Phone number and email address</li>
          <li>Residential address</li>
          <li><span className="sensitive">Aadhaar number and Aadhaar card images</span></li>
          <li><span className="sensitive">PAN number and PAN card image</span></li>
          <li>Profile photo (if provided)</li>
          <li>QR code scan activity</li>
          <li>Reward points and redemption history</li>
        </ul>

        <p>
          This information is collected strictly for
          <span className="highlight"> identity verification and fraud prevention</span>.
        </p>
      </div>

      <div className="privacy-section">
        <h2>4. Reward Point System</h2>

        <p>
          Store administrators generate QR coupons for electrical products.
        </p>

        <p>
          Approved electricians can scan these coupons after selling eligible products.
        </p>

        <p>
          When a valid coupon is scanned,
          <span className="feature"> reward points </span>
          are credited to the electrician's account.
        </p>

        <p>
          Points may later be redeemed for rewards or monetary payments
          through the application or at the physical store.
        </p>
      </div>

      <div className="privacy-section">
        <h2>5. Sensitive Information</h2>

        <p>
          Information such as
          <span className="sensitive"> Aadhaar and PAN documents </span>
          are considered sensitive personal data and are collected only for
          account verification purposes.
        </p>

        <p>
          Access to this information is restricted only to authorized administrators.
        </p>
      </div>

      <div className="privacy-section">
        <h2>6. User Consent</h2>

        <p>
          Users <span className="consent">voluntarily provide their personal information</span>
          when registering in the Great Vision application.
        </p>

        <p>
          This information is provided by the user with their own consent
          for identity verification and platform access.
        </p>

        <p>
          Users who do not wish to provide the required information
          should not register or use the application.
        </p>
      </div>

      <div className="privacy-section">
        <h2>7. Data Usage</h2>

        <p>
          User information is used only for:
        </p>

        <ul>
          <li>Identity verification</li>
          <li>Account approval</li>
          <li>Providing access to the platform</li>
          <li>Operating the reward system</li>
          <li>Preventing fraud or misuse</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2>8. Data Sharing</h2>

        <p>
          We <span className="no-sell">do not sell, rent, or trade user personal data</span>
          to any third party.
        </p>

        <p>
          Data may only be processed by trusted infrastructure providers required
          for the operation of the platform such as:
        </p>

        <ul>
          <li>Firebase Authentication</li>
          <li>Firebase Realtime Database</li>
          <li>PocketBase backend database</li>
          <li>Cloudflare security infrastructure</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2>9. Data Security</h2>

        <p>
          We implement technical and organizational security measures
          to protect user data from unauthorized access or misuse.
        </p>
      </div>

      <div className="privacy-section">
        <h2>10. Data Retention</h2>

        <p>
          User data is retained only as long as necessary to operate
          the Great Vision platform.
        </p>
      </div>

      <div className="privacy-section">
        <h2>11. User Rights</h2>

        <ul>
          <li>Request access to personal data</li>
          <li>Request correction of incorrect data</li>
          <li>Request deletion of personal data</li>
        </ul>

        <p>
          For deletion requests contact: greatvisionapp@gmail.com
        </p>
      </div>

      <div className="privacy-section">
        <h2>12. Children's Privacy</h2>

        <p>
          The platform is not intended for children under 13 years of age.
        </p>
      </div>

      <div className="privacy-section">
        <h2>13. Changes to This Policy</h2>

        <p>
          We may update this Privacy Policy from time to time.
        </p>
      </div>

      <div className="privacy-section">
        <h2>14. Contact</h2>

        <div className="contact-box">
          <p>Great Vision Electricals</p>
          <p>Kushwaha Market, Paliganj, Patna, Bihar, India</p>
          <p>Email: greatvisionapp@gmail.com</p>
        </div>
      </div>

    </div>
  );
}