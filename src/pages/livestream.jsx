import React,{useState,useEffect,useRef} from "react";
import AccessControl from "../components/accessControl";
import WebPlayer from "../components/webPlayer";
import WithLazyLoader from "@/components/withLazyLoader";
import { Button } from "react-bootstrap";

import StreamChatbox from "@/components/streamChatbox";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";


function Streamming() {

  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: "60a04979-a9da-46c7-b181-d5f6363c65d2",
    }),
  });
  
  return (
    <>
      <LivepeerConfig client={livepeerClient}>
        {true ? (
          <div className="streamPlayer-controler">
            <div className="livestream-all-accessControl">
              <WebPlayer />
              <AccessControl />
            </div>

            <div className="livestream-chat">

              <StreamChatbox />
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{ margin: "15% 20% 0 20%", background: "green" }}
              className="d-grid gap-2"
            >
              <Button
                style={{ padding: "7%", fontSize: "35px", fontWeight: "90" }}
                variant="light"
                size="lg"
              >
                Connect Your Wallet 👆
              </Button>
            </div>
          </div>
        )}
      </LivepeerConfig>
    </>
  );
}

export default WithLazyLoader(Streamming);
