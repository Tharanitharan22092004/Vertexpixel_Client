import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Footer from './Footer';
import NavBar from './NavBar';

const Work = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleNavClick = () => {
    setShowMenu(!showMenu);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    filterCars(selectedOption ? selectedOption.value : '');
  };

  const filterCars = (category) => {
    if (!category) {
      setFilteredCars(cars);
      return;
    }

    const filtered = cars.filter(car => car.category.toLowerCase().includes(category.toLowerCase()));
    setFilteredCars(filtered);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars/categories');
        if (response.ok) {
          const data = await response.json();
          const categoriesOptions = data.map(category => ({
            value: category,
            label: category
          }));
          setOptions(categoriesOptions);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars');
        if (response.ok) {
          const data = await response.json();
          setCars(data);
          setFilteredCars(data);
        } else {
          console.error('Failed to fetch cars');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
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
      zIndex: 20,
      transition: 'transform 0.5s',
      transform: showMenu ? 'translateY(0)' : 'translateY(-100%)'
    },
    menuIcon: {
      cursor: 'pointer',
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      zIndex: 30,
      transition: 'transform 0.3s'
    },
    menuIconRotate: {
      transform: 'rotate(180deg)'
    }
  };

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: selectedOption ? '#3a3a3a' : 'initial',
      border: state.isFocused ? '1px solid white' : 'none',
      borderRadius: '10px',
      color: 'white',
      '&:hover': {
        border: '1px solid white',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
      borderColor: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#3a3a3a',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#292929' : '#3a3a3a',
      color: 'white',
      border: 'none',
      '&:active': {
        backgroundColor: '#292929',
        border: '1px solid white',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center gap-8">
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
      {showMenu && (
        <div style={navBarStyles.container} onClick={handleNavClick}>
          <NavBar />
        </div>
      )}
      <div className="flex flex-col gap-7 mt-28 items-center w-full px-4">
        <Select
          className="w-full max-w-md"
          styles={selectStyles}
          value={selectedOption}
          onChange={handleChange}
          options={options}
          isSearchable
          placeholder="Type or select the car"
        />
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars.map((car, index) => (
              <Link to={`/work/workdes/${car._id}`} key={index}>
                <div className="relative mb-4">
                  {car.images && car.images.length > 0 && (
                    <img
                      className="w-full h-40 sm:h-32 md:h-40 lg:h-64 object-cover rounded-lg transition duration-300 ease-in-out hover:grayscale hover:scale-105"
                      src={`http://localhost:5000/${car.images[0].replace(/\\/g, '/')}`}
                      alt={car.title}
                    />
                  )}
                  <h3 className="absolute inset-0 flex justify-center items-center text-lg font-semibold text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                    {car.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Work;
