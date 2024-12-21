import React, { createContext, useContext, useState } from 'react';
const GoogleSignInContext = createContext();
export const GoogleSignInProvider = ({ children }) => {
  const [googleData, setGoogleData] = useState(null);

  return (
    <GoogleSignInContext.Provider value={{ googleData, setGoogleData }}>
      {children}
    </GoogleSignInContext.Provider>
  );
};

export const useGoogleSignInContext = () => useContext(GoogleSignInContext);
