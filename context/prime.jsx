import React, { useState, useContext } from "react";

export const primeContext = React.createContext();

export default function primeProviderContext({ children }) {
  const [isLazy, setIsLazy] = useState(true);

  return (
    <primeContext.Provider value={{ isLazy, setIsLazy }}>
      {children}
    </primeContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(primeContext);
};
