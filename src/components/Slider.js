import React from 'react';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';

const Slider = ({ options, onSelect, defaultActiveIndex = 0, children }) => {
  return (
    <Flickity options={{ ...options, 
      initialIndex: defaultActiveIndex,
    
    on: { select: onSelect } }}>
      {children}
    </Flickity>
  );
};

export default Slider;
