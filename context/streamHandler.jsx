import React, { useState, useContext } from "react";

export const keyContext = React.createContext();

export default function keyHandlerProvider({ children }) {
  const [streamKey, setStreamKey] = useState();
  const [playbackId, setPlaybackId] = useState();
  const [name, setName] = useState();
  const [streamStatus, setStreamStatus] = useState(false);


  return (
    <keyContext.Provider
      value={{
        streamKey,
        setStreamKey,
        playbackId,
        setPlaybackId,
        name,
        setName,
        streamStatus,
        setStreamStatus,
      }}
    >
      {children}
    </keyContext.Provider>
  );
}

export const useKeyContext = () => {
  return useContext(keyContext);
};
