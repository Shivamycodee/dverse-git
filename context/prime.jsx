import React, { useState, useContext } from "react";

export const primeContext = React.createContext();

export default function primeProviderContext({ children }) {

  const [isLazy, setIsLazy] = useState(true);
  const [profileFlag,setProfileFlag] = useState(true);
  const [avatarConfig,setAvatarConfig] = useState()
const [userName, setUserName] = useState();


  return (
    <primeContext.Provider
      value={{
        isLazy,
        setIsLazy,
        profileFlag,
        setProfileFlag,
        avatarConfig,
        setAvatarConfig,
        userName,
        setUserName,
      }}
    >
      {children}
    </primeContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(primeContext);
};
