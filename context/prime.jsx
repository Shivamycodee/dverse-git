import React, { useState, useContext } from "react";

export const primeContext = React.createContext();

export default function primeProviderContext({ children }) {

  const [isLazy, setIsLazy] = useState(true);
  const [profileFlag,setProfileFlag] = useState(true);
  const [avatarConfig,setAvatarConfig] = useState()
  const [userName, setUserName] = useState();

  const [streamTime,setStreamTime] = useState();

  const [isWatch,setIsWatch] = useState(false);



const getPostTime = (epoc) => {
  const date = new Date(epoc);
  let hour = date.getHours();
  const ampm = hour >= 12 ? "PM" : "AM"; // determine AM/PM
  hour = hour % 12 || 12; // convert hour to 12-hour format
  let min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return `${hour}:${min} ${ampm}`;
};


const getPostDate = (epoc) => {
  const date = new Date(epoc);

  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
  const dayOfMonth = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();
  const time = getPostTime(epoc);

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
};


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
        getPostTime,
        getPostDate,
        streamTime,
        setStreamTime,
        isWatch,
        setIsWatch
      }}
    >
      {children}
    </primeContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(primeContext);
};
