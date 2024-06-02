import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SeeMore() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/api/cars')
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array of cars
        setCars(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='p-4 flex flex-col justify-center items-center gap-5 bg-black'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cars.map((car, index) => (
          <Link to={`/work/workdes/${car._id}`} key={index} className="w-full">
            <div className='relative group'>
              <img
                src={`http://localhost:5000/${car.images[0]}`} // Assuming only the first image is displayed
                alt={`Image ${index + 1}`}
                className='w-full h-auto object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-75'
                style={{ height: '300px' }} // Set a fixed height for the images
              />
              <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <div className='text-center'>
                  <h3 className='text-white font-bold text-xl'>{car.title}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/work"><button className='bg-[#000000] text-white border border-white w-28 h-10 text-center'>SEE MORE</button></Link>
    </div>
  );
}
