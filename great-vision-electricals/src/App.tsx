import React from 'react';

// Import your components
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import BelowHome from './components/BelowHome/BelowHome';
import CookieConsent from './components/Cookies/CookieConsent';
import Community from './components/Community/Community';  // Add the Community component
import Footer from './components/Footer/Footer';  // Import the Footer component

const App: React.FC = () => {
  return (
    <>
      {/* Header section */}
      <Header />

      {/* Main content sections */}
      <Home />
      <BelowHome />
      <Community />  {/* Include the Community component */}

      {/* Cookie consent at the bottom */}
      <CookieConsent />

      {/* Footer section */}
      <Footer />  {/* Render the Footer component here */}
    </>
  );
}

export default App;
