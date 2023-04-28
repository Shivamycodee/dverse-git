import React, { useState, useEffect } from "react";
import { Client, isSupported } from "@livepeer/webrtmp-sdk";
import { Player } from "@livepeer/react";
import { useKeyContext } from "context/streamHandler";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WebPlayer() {
  const client = new Client();

  const { streamKey, playbackId, name, streamStatus } = useKeyContext();

  const [playerKey, setPlayerKey] = useState(0);


  useEffect(() => {
    async function start() {
      const StreamKey = streamKey ? streamKey : null;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const session = client.cast(stream, StreamKey);

      session.on("open", () => {
        toast("Stream started.");
      });

      session.on("close", () => {
        toast("Stream stopped.");
      });

      session.on("error", (err) => {
        console.log("Stream error.", err.message);
      });
    }

    if (isSupported) {

      if (playbackId && streamKey) {
        start();
      } 

    } else alert("your browser doesn't support webrtmp-sdk");
  }, [playbackId]);


  const reloadPlayer = () => {
    setPlayerKey((prevKey) => prevKey + 1);
  };

  return (
    <div
     style={{ width: "100%" }}
     >
      <Player
        title={name}
        key={playerKey}
        playbackId={playbackId ? playbackId : null}
        showPipButton
        showTitle={true}
        poster={streamStatus ? "/images/stream.png" : "/images/cat.png"}
        aspectRatio="16to9"
        controls={{
          autohide: 4000,
        }}
        theme={{
          borderStyles: { containerBorderStyle: "hidden" },
          radii: { containerBorderRadius: "10px" },
        }}
      />
    </div>
  );
}

export default React.memo(WebPlayer);
