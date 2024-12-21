import { useState, useEffect } from 'react';

const useDetectDevice = () => {
  const [device, setDevice] = useState(null);
  const [orientation, setOrientation] = useState(null);

  const detectDevice = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Detecting the device type
    if (width <= 768) {
      setDevice('mobile');
      // Check if the mobile is in portrait or landscape mode
      setOrientation(width > height ? 'mobile-landscape' : 'mobile-portrait');
    } else if (width <= 1024) {
      setDevice('tablet');
      setOrientation(null); // Tablets generally don't need orientation tracking
    } else {
      setDevice('desktop');
      setOrientation(null); // Desktop doesn't require orientation
    }
  };

  useEffect(() => {
    detectDevice();

    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);

    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  return { device, orientation };
};

export default useDetectDevice;
