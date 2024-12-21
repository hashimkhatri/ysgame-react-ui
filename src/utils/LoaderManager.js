import React, { createContext, useContext, useState } from 'react';
import LoaderComponent from '../components/LoaderComponent';


const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      <LoaderComponent visible={loading} onHide={hideLoader} />
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
