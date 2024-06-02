import React, { useEffect, useState } from "react";
import Footer from './Footer';
import NavBar from './NavBar';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const Capabilities = () => {
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleNavClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/api/images')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
    <div className="m-0 p-0">
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
      <div className="image-container" style={{ width: '100%', padding: '30px', backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop:'50px' }}>
        {data.map(item => (
          <div key={item._id} className="image-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
            <ReactCompareSlider
              style={{ width: '100%', height: '100%', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}
              itemOne={
                <ReactCompareSliderImage
                  src={`http://localhost:5000/${item.images[0].replace(/\\/g, '/')}`}
                  alt="Image one"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={`http://localhost:5000/${item.images[1].replace(/\\/g, '/')}`}
                  alt="Image two"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              }
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Capabilities;
