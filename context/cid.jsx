import React, { useState, useContext, useEffect } from "react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

import Swal from "sweetalert2";

export const cidContext = React.createContext();

export const CidContextProvider = ({ children }) => {


  const fileProps = {};
  const [data, setData] = useState(null);
  const [logs, setLogs] = useState([]);


  async function fetchFile(event) {
    setData(event.target.files[0]);
    Swal.fire({
      title: `Selected file : ${event.target.files[0].name}`,
    });
  }

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {}, [data]);

  async function uploadData() {
    if (data !== null) {
      try {
        const Storage = new ThirdwebStorage();
        const upload = await Storage.upload(data);

        var url = Storage.resolveScheme(upload);
        fileProps["name"] = data.name;
        fileProps["size"] = data.size / 1000 + " kb";
        fileProps["type"] = data.type;
        fileProps["url"] = url;
        console.log("🚀🚀🚀")
        console.log(url);
      } catch (e) {}
    } else {
      throw new Error("select file");
    }

    // set logs for history page.
    if (!logs) setLogs(fileProps);
    else {
      const arr = [...logs, fileProps];
      setLogs(arr);
    }

    return fileProps;
  }

  return (
    <cidContext.Provider value={{ uploadData, fetchFile, logs }}>
      {children}
    </cidContext.Provider>
  );
};

export const UsedGlobalContext = () => {
  return useContext(cidContext);
};

export default CidContextProvider;
