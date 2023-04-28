import { useCreateStream, useStream } from "@livepeer/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { useMatrixContext } from "../../context/matrix";

import React, { useMemo, useState, useEffect } from "react";
import { useKeyContext } from "context/streamHandler";
import { useGlobalContext } from "../../context/prime";

import Swal from "sweetalert2";


export default function AccessControl() {

  const { address,
    createSpace,
    roomId,
    setRoomId} = useMatrixContext();


  const { setStreamKey, setPlaybackId, setName, setStreamStatus } =
    useKeyContext();

  const { setStreamTime, isWatch, setIsWatch } = useGlobalContext();

  const [url, setUrl] = useState();
  const [streamId, setStreamId] = useState();
  const [streamName, setStreamName] = useState();

  const {
    mutate: createStream,
    data: createdStream,
    status,
  } = useCreateStream(
    streamName
      ? {
          name: streamName,
        }
      : null
  );


  const handleCreateStream = async()=>{

    
    const response = await Swal.fire({
      title: "Create New Stream 🎥",
      input: "text",
      inputLabel: "Enter Stream Name",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to write something!"
      }
    }).then((res) => {
      return res.value;
    });

      // try {

      setStreamName(response);
      const streamNameNoSpace = response.replace(/\s+/g, "");
      let rmId = await createSpace(streamNameNoSpace + address.slice(2, 7));
        
      toast.success("Stream Starting soon...");
      
      console.log("🤖"+rmId);
      setRoomId(rmId);

      const currentTimestamp = Date.now();
      setStreamTime(currentTimestamp);


      // } catch (e) {
      //   toast.error("failed to create stream");
      // }
    
  }

  useEffect(() => {
    if(streamName){
   createStream();
    }
  }, [streamName]);




const handleWatchStream = async()=>{

  const response = await Swal.fire({
    title: "Enter Stream Link 🎥",
    input: "text",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) return "You need to write something!";
    },
  }).then((res) => {
    return res.value;
  });

  if (response) {
    try{

      const dataArray = response.split("+");
      const id = dataArray[0];
      const link = dataArray[1];

      setIsWatch(true);

      setRoomId(id)
      setUrl(link);

       const currentTimestamp = Date.now();
       setStreamTime(currentTimestamp);

    }catch(e){
      console.log("🎥🎥🎥")
      console.log(e);
      alert("something went wrong joining stream")
    }

  }

}


useEffect(()=>{

  if(url){

       try {

       let final = url.slice(31, 47);
       setPlaybackId(final);
       alert(roomId)
       toast.success("stream starting soon...")
      } catch (e) {
        toast.error("failed to get stream");
      }

      }
},[url])



  useEffect(() => {

    if (createdStream) {
      setName(createdStream.name);
      setStreamId(createdStream.id);
      setStreamKey(createdStream.streamKey);
      setPlaybackId(createdStream.playbackId);
    }
  }, [createdStream]);

  const { data: stream } = useStream({
    streamId: createdStream?.id,
    refetchInterval: (stream) => (!stream?.isActive ? 4000 : false),
  });

  if (stream) setStreamStatus(stream.isActive);

  const isLoading = useMemo(() => status === "loading", [status]);

  const deleteStream = () => {
    window.location.reload();
  };

  const handleCopy = () => {
    copy(
      `${roomId}+https://livepeercdn.studio/hls/${createdStream.playbackId}/index.m3u8`
    );
    toast(`Playback Link Copied 🙆‍♀️ ${createdStream.playbackId}`);
  };


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
e.returnValue =
  "Are you sure you want to reload? You may 💀 lose unsaved changes.";
    };

    // Add the event listener
    window.onbeforeunload = handleBeforeUnload;

    // Remove the event listener on unmount
    return () => {
      window.onbeforeunload = null;
    };
  }, []);


  return (
    <>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        theme="light"
        draggable
      />
      <div className="livestream-accessControl">

      {!stream ?  <button
          data-label="Register"
          className="rainbow-hover"
          onClick={() => handleCreateStream()}
        >
          <span className="sp">GO LIVE 🎥</span>
        </button>:null
}
        {createdStream ? (
          <button

            data-label="Register"
            className="rainbow-hover"
            onClick={() => handleCopy()}
          >
            <span className="sp"> Share 📁</span>
          </button>
        ) : null}
        {createdStream ? (
          <button

            data-label="Register"
            className="rainbow-hover"
            onClick={() => deleteStream()}
          >
            <span className="sp">Delete</span>
          </button>
        ) : null}

      {!createdStream ? <button
          data-label="Register"
          className="rainbow-hover"
          onClick={() => handleWatchStream()}
        >
          <span className="sp">Watch Stream</span>
        </button>:null}
      </div>
    </>
  );
}
