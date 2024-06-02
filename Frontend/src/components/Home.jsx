import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Link } from 'react-scroll';
import Car from '../../public/Car';
import NavBar from './NavBar';
import './Home.css';
import HomeCategory from './HomeCategory';
import SeeMore from './SeeMore';
import Slider from './Slider';
import Footer from './Footer';

function RotatingCar({ scale, ...props }) {
  const carRef = useRef();
  useFrame(() => {
    if (carRef.current) {
      carRef.current.rotation.y += 0.01;
    }
  });

  return <Car ref={carRef} scale={scale} {...props} />;
}

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const homeContainerRef = useRef(null);

  const handleNavClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        homeContainerRef.current.classList.add('scroll-transition');
      } else {
        homeContainerRef.current.classList.remove('scroll-transition');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate scale based on screen width
  const getCarScale = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      return 1.3; // Default scale for larger screens
    } else if (screenWidth >= 768) {
      return 1; // Scale for tablet view
    } else {
      return 0.7; // Scale for mobile view
    }
  };

  const carScale = getCarScale();

  return (
    <div className='flex flex-col'>
      <div ref={homeContainerRef} className="home-container">
        <div className="home flex h-screen bg-black overflow-hidden">
          <div className="bg-black w-1/2 text-white relative">
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
              className={`lucide lucide-menu fixed top-1 left-1 z-30 cursor-pointer ${showMenu ? 'rotate-180' : ''}`}
              onClick={handleNavClick}
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <h1 className="home-title ">
              We are a Creative<br />CGI Production<br />3D Visualisation <br />Studio
            </h1>
            <p className='absolute top-[650px] left-5 leading-none hidden lg:block'>
              <Link to="home-category" smooth={true} duration={500}>
                Scroll to know more
              </Link>
            </p>
          </div>
          <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center transition-transform duration-500 ${
              showMenu ? 'translate-y-0' : '-translate-y-full'
            } fixed-nav z-20`}
            onClick={handleNavClick}
          >
            <NavBar />
          </div>
          <div
            className={`car flex-1 flex justify-center items-end transition-opacity duration-500 ${
              showMenu ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="canvas-hidden w-full h-full">
              <Canvas>
                <ambientLight intensity={2} />
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
                <RotatingCar scale={carScale} position={[0, -0.7, 0]} rotation={[0, -(Math.PI / 2), 0]} />
                <Environment preset="studio" />
              </Canvas>
            </div>
          </div>
        </div>
        <div id="home-category">
          <HomeCategory />
        </div>
        <SeeMore />
        <Slider />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
