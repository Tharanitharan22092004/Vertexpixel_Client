import React, { useEffect, useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { Button } from "react-scroll";

const Slider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/api/images')
      .then(response => response.json())
      .then(data => {
        // Extract image URLs from the response
        const imageUrls = data.map(obj => obj.images.map(path => `http://localhost:5000/${path.replace(/\\/g, '/')}`));
        // Flatten the array of arrays into a single array
        const flattenedUrls = imageUrls.flat();
        setImages(flattenedUrls);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="m-0 p-0">
      <div style={{ width: '100%', padding: '30px', backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {images.length >= 2 ? (
          <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: 'auto' }}>
            <ReactCompareSlider
              style={{ width: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}
              itemOne={
                <ReactCompareSliderImage
                  src={images[0]} // First image from the fetched data
                  alt="Image one"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={images[1]} // Second image from the fetched data
                  alt="Image two"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              }
            />
          </div>
        ) : (
          <p style={{ color: 'white' }}>Loading images...</p>
        )}
      </div>
    </div>
  );
};

export default Slider;
