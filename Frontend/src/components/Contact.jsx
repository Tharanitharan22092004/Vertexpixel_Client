import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const Contact = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleNavClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showMenu]);

  const navBarStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 50, // Higher z-index for the navbar
      transition: 'transform 0.5s',
      transform: showMenu ? 'translateY(0)' : 'translateY(-100%)',
    },
    menuIcon: {
      cursor: 'pointer',
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      zIndex: 60, // Higher z-index for the menu icon
      transition: 'transform 0.3s',
    },
    menuIconRotate: {
      transform: 'rotate(180deg)',
    },
  };

  return (
    <div className="page bg-black text-white min-h-screen flex flex-col items-center relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ ...navBarStyles.menuIcon, ...(showMenu ? navBarStyles.menuIconRotate : {}) }}
        onClick={handleNavClick}
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
      <div style={navBarStyles.container} onClick={handleNavClick}>
        <NavBar />
      </div>
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-5xl h-10/12">Contact Us</h1>
        <div className="contact flex flex-col lg:flex-row gap-11 lg:h-5/6 w-full mt-5 ">
          <div className="details w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-7 justify-center">
              <div className="phone flex  gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-3xl flex items-center" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <p className="text-3xl">Phone: +1 234 567 89</p>
              </div>
              <div className="mail flex  gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-3xl " viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <p className="text-3xl">examplemail@gmail.com</p>
              </div>
              <div className="address flex  gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-3xl " viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <p className="text-3xl">Example Address to be shown</p>
              </div>
            </div>
          </div>
          <form className="message w-full lg:w-1/2 flex flex-col gap-10 justify-center">
            <div className="info flex flex-col lg:flex-row gap-5 w-full">
              <input type="text" id="name" name="name" placeholder='Name' className="bg-gray-800 border border-white p-2 w-full lg:w-1/2"/>
              <input type="email" id="email" name="email" placeholder='Email' className="bg-gray-800 border border-white p-2 w-full lg:w-1/2"/>
            </div>
            <div>
              <textarea id="message" name="message" rows="4" placeholder='Message' className="bg-gray-800 border border-white p-2 w-full"/>
            </div>
            <button type="submit" className="bg-black border border-white text-white px-4 py-2 w-full lg:w-1/5">Send</button>
          </form>
        </div>
      </div>
      <Footer />

    </div>
  );
}

export default Contact;
