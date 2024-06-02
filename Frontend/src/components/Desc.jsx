import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import Footer from './Footer';
import NavBar from './NavBar';

// Kick off the polyfill!
smoothscroll.polyfill();

const Desc = () => {
  const [mainImage, setMainImage] = useState("");
  const [carImages, setCarImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const scrollContainerRef = useRef(null);
  let { id } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cars/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
          setCategory(data.category);
          setCarImages(data.images);
          if (data.images.length > 0) {
            setMainImage(`http://localhost:5000/${data.images[0].replace(/\\/g, '/')}`);
          }
        } else {
          console.error('Failed to fetch car details');
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const newScrollLeft = scrollLeft - 200;
      const maxScrollLeft = 0;

      if (newScrollLeft <= maxScrollLeft) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        scrollContainerRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const newScrollLeft = scrollLeft + 200;

      if (newScrollLeft >= maxScrollLeft) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }
  };

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

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
    <div className='flex flex-col w-full bg-black min-h-screen h-full gap-10 p-5 md:gap-20 md:p-10'>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Micro+5&family=Overpass:ital,wght@0,100..900;1,100..900&display=swap');
        
        *{
          font-family: "Overpass", sans-serif;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 1rem;
          cursor: pointer;
          z-index: 10;
          border-radius: 50%;
        }
        .arrow-left {
          left: 0;
        }
        .arrow-right {
          right: 0;
        }
        .arrow svg {
          width: 24px;
          height: 24px;
          stroke: currentColor;
        }
      `}</style>
      
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
      
      <div className='flex flex-col items-center gap-6 md:gap-11'>
        <h1 className='text-3xl md:text-5xl text-white font-semibold text-center'>{title}</h1>
        <h2 className='text-xl md:text-3xl text-white font-semibold text-center'>{category}</h2>
        <p className="text-white text-center md:w-8/12">{description}</p>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          mainImage && <img src={mainImage} alt="Main" className="w-full md:w-8/12" onError={(e) => { e.target.src = 'fallback-image-url'; }} />
        )}
        <div className='relative w-full md:w-8/12 flex items-center'>
          <button className='arrow arrow-left' onClick={scrollLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-left"><path d="M18 15H12v4l-7-7 7-7v4h6v6z" /></svg>
          </button>
          <div ref={scrollContainerRef} className='flex overflow-x-auto hide-scrollbar gap-5 w-full'>
            {carImages.map((image, index) => (
              <img
                key={index}
                className="h-32 md:h-48 w-auto hover:scale-105 cursor-pointer transition-transform"
                src={`http://localhost:5000/${image.replace(/\\/g, '/')}`}
                alt={`Car image ${index}`}
                onClick={() => handleImageClick(`http://localhost:5000/${image.replace(/\\/g, '/')}`)}
                onError={(e) => { e.target.src = 'fallback-image-url'; }}
              />
            ))}
          </div>
          <button className='arrow arrow-right' onClick={scrollRight}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-right"><path d="M6 9h6V5l7 7-7 7v-4H6V9z"/></svg>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desc;
