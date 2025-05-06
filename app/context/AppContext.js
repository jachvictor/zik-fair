import React, { createContext, useRef, useState, useContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const loadingRef = useRef(false); // Prevent unnecessary re-renders
  const [forceRender, setForceRender] = useState(false); // Used for UI updates

  const setLoading = (value) => {
    loadingRef.current = value;
    setForceRender((prev) => !prev); // Toggle to trigger UI update
  };

  return (
    <AppContext.Provider value={{ loading: loadingRef.current, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
