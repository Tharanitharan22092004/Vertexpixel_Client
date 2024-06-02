import React, { useState, useEffect } from "react";
import "./HomeCategory.css"; // Custom styles for slider

const HomeCategory = () => {
  const [cars, setCars] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Initially, the first image is active

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5000/api/cars/first-cars")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        setActiveIndex(Math.floor(data.length / 2)); // Set activeIndex to the middle index
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="slider-container bg-black">
      <div className="flex items-center gap-5">
        {cars.map((car, index) => (
          <div
            key={index}
            className={`relative cursor-pointer transition-all duration-700 ${
              activeIndex === index ? "active" : "inactive"
            }`}
            onClick={() => handleClick(index)}
          >
            {/* Display the first image of the current car */}
            <img
              src={`http://localhost:5000/${car.images[0]}`} // Adjust index if necessary
              alt={car.title}
              className="w-full h-full object-cover rounded-md"
            />
            {activeIndex === index && (
              <div className="absolute bottom-10 left-10 text-white details">
                <h2 className="text-3xl font-bold uppercase">{car.category}</h2>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeCategory;
