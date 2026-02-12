import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>

      <p><strong>Effective Date:</strong> 12 February 2026</p>

      <p>
        This Privacy Policy explains how Great Vision Electricals (“we,” “us,” or “our”) collects,
        uses, stores, and protects your information when you visit our website or use our digital services.
      </p>

      <p>
        By using our website, you agree to the terms of this Privacy Policy.
      </p>

      <h2>1. Who We Are</h2>
      <p>
        <strong>Website Name:</strong> Great Vision Electricals <br />
        <strong>Business Location:</strong> Kushwaha Market, Paliganj, Patna, Bihar, India <br />
        <strong>Contact Email:</strong> greatvisionapp@gmail.com
      </p>

      <h2>2. Information We Collect</h2>

      <p>We collect the following information from users:</p>

      <ul>
        <li>Email address</li>
        <li>Name associated with the email</li>
        <li>Profile photo associated with the email</li>
        <li>User ID (UID)</li>
        <li>Device name and type</li>
        <li>Browser type and operating system</li>
        <li>User agent information</li>
        <li>Login timestamps and login count</li>
        <li>Usage activity such as visit time and interaction</li>
        <li>IP address (automatically collected for security)</li>
      </ul>

      <h2>3. Authentication and Backend Services</h2>

      <p>
        We use Firebase Authentication to securely authenticate users and manage login sessions.
      </p>

      <p>
        We use Firebase Realtime Database to store login activity including login timestamps,
        login count, and device information.
      </p>

      <p>
        We use PocketBase as our backend database to store necessary account and service-related data.
      </p>

      <p>
        Our website is hosted and protected using Cloudflare, which provides security,
        performance optimization, and protection against malicious activity.
      </p>

      <h2>4. Cookies and Tracking Technologies</h2>

      <p>
        We use cookies and similar technologies to maintain secure login sessions,
        ensure website functionality, and improve user experience.
      </p>

      <p>
        Cookies may be created by Firebase Authentication, Cloudflare, and our backend systems.
      </p>

      <h2>5. How We Use Your Information</h2>

      <ul>
        <li>To authenticate and identify users</li>
        <li>To provide website functionality and services</li>
        <li>To improve website performance and user experience</li>
        <li>To monitor security and prevent unauthorized access</li>
        <li>To analyze website usage and improve services</li>
      </ul>

      <h2>6. Third-Party Advertising</h2>

      <p>
        Our website may use third-party advertising services such as Google Ads or AdSense.
      </p>

      <p>
        These services may collect device information, cookies, and interaction data
        to display relevant advertisements.
      </p>

      <h2>7. Data Sharing and Disclosure</h2>

      <p>
        We do not sell, rent, or trade your personal information.
      </p>

      <p>
        Your data may be processed by trusted services including Firebase, PocketBase,
        Cloudflare, and advertising providers, only for website functionality and improvement.
      </p>

      <h2>8. Data Security</h2>

      <p>
        We use secure infrastructure and reasonable technical measures to protect your data.
        However, no system can guarantee complete security.
      </p>

      <h2>9. Data Retention</h2>

      <p>
        We retain user data as long as necessary to provide services,
        maintain security, and improve website performance.
      </p>

      <h2>10. Your Rights</h2>

      <ul>
        <li>Request access to your data</li>
        <li>Request correction of incorrect data</li>
        <li>Request deletion of your data</li>
      </ul>

      <p>
        To request deletion, contact: greatvisionapp@gmail.com
      </p>

      <h2>11. Children's Privacy</h2>

      <p>
        This website is not intended for children under 13 years of age.
      </p>

      <h2>12. Changes to This Privacy Policy</h2>

      <p>
        We may update this Privacy Policy at any time.
      </p>

      <h2>13. Contact Us</h2>

      <p>
        Great Vision Electricals <br />
        Kushwaha Market, Paliganj, Patna, Bihar, India <br />
        Email: greatvisionapp@gmail.com
      </p>

    </div>
  );
}
