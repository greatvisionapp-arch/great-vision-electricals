import "./TermsConditions.css";

export default function TermsConditions() {
  return (
    <div className="terms-container">

      <h1>Terms and Conditions</h1>

      <p className="effective-date">
        Effective Date: 12 February 2026
      </p>

      <p>
        By accessing or using the Great Vision website or mobile application,
        you agree to comply with these Terms and Conditions.
        If you do not agree with these terms, please discontinue use of our services.
      </p>

      <div className="terms-section">
        <h2>1. Company Identity and Ownership</h2>

        <p>
          <strong>Great Vision</strong> is operated under
          <strong> Shivam Electricals, Paliganj, Patna, Bihar, India</strong>.
        </p>

        <p>
          Shivam Electricals has been operating as a physical electrical business since <strong>2008</strong>.
        </p>

        <p>
          The website and digital services are owned by Shivam Electricals
          and managed by <strong>Shivam Kumar</strong>.
        </p>
      </div>

      <div className="terms-section">
        <h2>2. Business Location and Contact</h2>

        <div className="contact-box">
          <p>Kushwaha Market, Paliganj, Patna, Bihar, India</p>
          <p>Email: greatvisionapp@gmail.com</p>
        </div>

        <p>
          Customers may visit our physical store during working hours for
          business inquiries.
        </p>
      </div>

      <div className="terms-section">
        <h2>3. Website Access and User Login</h2>

        <p>
          Users may securely log in using <strong>Firebase Authentication</strong>.
        </p>

        <p>
          Users are responsible for maintaining the confidentiality of their login credentials.
        </p>

        <p>
          Unauthorized access or misuse of accounts is strictly prohibited.
        </p>
      </div>

      <div className="terms-section">
        <h2>4. User Data and Data Deletion Rights</h2>

        <p>
          Users may request deletion of their personal data at any time.
        </p>

        <p>
          Data is stored securely using Firebase and PocketBase backend systems.
        </p>
      </div>

      <div className="terms-section">
        <h2>5. Acceptable Use</h2>

        <p>Users must NOT attempt to:</p>

        <ul>
          <li>Hack or exploit the website or backend systems</li>
          <li>Perform DDoS or denial-of-service attacks</li>
          <li>Access unauthorized systems or restricted data</li>
          <li>Disrupt website functionality</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>6. Fraud Prevention and Legal Action</h2>

        <p>
          Users must not attempt to manipulate or exploit the Great Vision platform.
        </p>

        <p>Prohibited activities include:</p>

        <ul>
          <li>Attempting to manipulate the reward system</li>
          <li>Scanning unauthorized or duplicate QR coupons</li>
          <li>Generating fake reward points</li>
          <li>Using automated tools to exploit the platform</li>
        </ul>

        <p>
          If such activities are detected, Great Vision reserves the right to:
        </p>

        <ul>
          <li>Suspend or permanently terminate the user account</li>
          <li>Cancel accumulated reward points</li>
          <li>Block access to the platform</li>
          <li>Take legal action under applicable Indian laws</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>7. Intellectual Property</h2>

        <p>
          The <strong>Great Vision</strong> name, branding, logo, and website content
          are the intellectual property of Shivam Electricals.
        </p>

        <p>
          Unauthorized copying, distribution, or reproduction is prohibited.
        </p>
      </div>

      <div className="terms-section">
        <h2>8. Backend Services and Infrastructure</h2>

        <p>
          Our services use the following infrastructure:
        </p>

        <ul>
          <li>Firebase Authentication for login</li>
          <li>PocketBase for backend database management</li>
          <li>Cloudflare for security and performance optimization</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>9. Service Availability</h2>

        <p>
          We strive to maintain continuous service availability.
        </p>

        <p>
          However, services may occasionally be unavailable due to maintenance,
          updates, or technical issues.
        </p>

        <p>
          We are not responsible for losses caused by temporary service interruptions.
        </p>
      </div>

      <div className="terms-section">
        <h2>10. Governing Law</h2>

        <p>
          These Terms are governed by the laws of India.
        </p>

        <p>
          Any disputes will fall under Indian legal jurisdiction.
        </p>
      </div>

      <div className="terms-section">
        <h2>11. Changes to Terms</h2>

        <p>
          We may update these Terms and Conditions at any time.
          Continued use of the service indicates acceptance of updated terms.
        </p>
      </div>

      <div className="terms-section">
        <h2>12. Contact Information</h2>

        <div className="contact-box">
          <p><strong>Great Vision</strong></p>
          <p>Owned by: Shivam Electricals</p>
          <p>Manager: Shivam Kumar</p>
          <p>Kushwaha Market, Paliganj, Patna, Bihar, India</p>
          <p>Email: greatvisionapp@gmail.com</p>
        </div>
      </div>

    </div>
  );
}