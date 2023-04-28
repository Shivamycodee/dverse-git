import React, { useState, useContext, useEffect } from "react";
import { useContract, useSigner } from "wagmi";

const Contract_ABI = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "User",
            type: "address",
          },
          {
            indexed: true,
            internalType: "string",
            name: "CID",
            type: "string",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "TimeStamp",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "FileName",
            type: "string",
          },
        ],
        name: "CidGenerate",
        type: "event",
      },
      {
        inputs: [],
        name: "getUploadFile",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "CID",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "timeStamp",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "fileName",
                type: "string",
              },
            ],
            internalType: "struct Dcube.uploadedFile[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_cid",
            type: "string",
          },
          {
            internalType: "string",
            name: "_fileName",
            type: "string",
          },
        ],
        name: "uploadfile",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ]

const Contract_Address = "0x25f2235597e731bF17977E7837646f241971ea52"

export const primeContext = React.createContext();



export default function primeProviderContext({ children }) {

  const [isLazy, setIsLazy] = useState(true);
  const [profileFlag,setProfileFlag] = useState(true);
  const [avatarConfig,setAvatarConfig] = useState()
  const [userName, setUserName] = useState();

  const [streamTime,setStreamTime] = useState();

  const [isWatch,setIsWatch] = useState(false);

  const [contractData,setContractData] = useState([]);

  const [conFlag,setConFlag] = useState(false);

  // contract creator

   const { data: signer, isError, isLoading } = useSigner();

   const contract = useContract({
     address: Contract_Address,
     abi: Contract_ABI,
     signerOrProvider: signer,
   });

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

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
};



 // SMART CONTRACT CODE 


  const uploadOnContract = async (url, name) => {
    // Create an instance of the contract with the signer
    const contractWithSigner = contract.connect(signer);

    // Call the wimo function with an argument
    const response = await contractWithSigner.uploadfile(url, name);
    // console.log("wimo transaction:", response);

    // Wait for the transaction to be mined
    const receipt = await response.wait();
    console.log("wimo transaction receipt:", receipt);

  };

  
  
    const getUploadData = async () => {

     if (!contract) {
       console.error("Contract not loaded yet");
       return;
     }

     try{

       
       const data = await contract.getUploadFile();

       const filterData = data.filter(([cid]) => cid.slice(0,5) === "https");

    const dataObj = filterData.map(([cid, time, userName]) => {
      cid = cid.toString();
      time = time.toString();
      userName = userName.toString();
      console.log(cid.slice(0, 5));
      return { cid, time, userName };
    });

       console.log("🚀🚀", dataObj);
       setContractData(dataObj);

      }catch(e){console.info(e)}

      };
      
   useEffect(() => {
     getUploadData();
   }, [contract,conFlag]);


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
        setIsWatch,
        uploadOnContract,
        contractData,
        setConFlag
      }}
    >
      {children}
    </primeContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(primeContext);
};
