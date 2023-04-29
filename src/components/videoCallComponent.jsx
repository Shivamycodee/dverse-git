import { useRef, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import copy from "copy-to-clipboard";


import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7THiYoQqddpl_NRTRizh3Xg9ox6hUcc8",
  authDomain: "nimo-7a52f.firebaseapp.com",
  databaseURL: "https://nimo-7a52f-default-rtdb.firebaseio.com",
  projectId: "nimo-7a52f",
  storageBucket: "nimo-7a52f.appspot.com",
  messagingSenderId: "932110078099",
  appId: "1:932110078099:web:ae67041d4bc27ee1b5fd66",
  measurementId: "G-NZ5M5N4HMP",
};

function VideoCallComponent() {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const [isClient, setIsClient] = useState(false);
  const [pc, setPc] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [tempFlag,setTempFlag] = useState(false);
  const [startFlag,setStartFlag] = useState(true);
  const [inputFlag,setInputFlag] = useState(false);

  const webcamVideo = useRef(null);
  const remoteVideo = useRef(null);
  const callInput = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const servers = {
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        },
      ],
      iceCandidatePoolSize: 10,
    };

    const pcInstance = new RTCPeerConnection(servers);
    setPc(pcInstance);
  }, [isClient]);

  // stream web cam starts...

  const startWebcam = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    setRemoteStream(new MediaStream());

    
    if (!localStream || !remoteStream) {
      console.log(`local ${localStream} and remote ${remoteStream}`);
      console.warn("Local or remote stream is not set.");
      toast.info("Click start again... 😉");
      return;
    }
    // console.log(`out loop local ${localStream} and remote ${remoteStream}`);

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    webcamVideo.current.srcObject = stream;
    remoteVideo.current.srcObject = remoteStream;

    setStartFlag(false);

  };

  // stream web cam ends...

  // creating call starts...

  const createCall = async () => {

    setTempFlag(true);
    setInputFlag(true);

    const callsCollection = collection(firestore, "calls");
    const callDoc = doc(callsCollection);
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");


    if(!callInput.current){
      alert("fucked up...")
      return
    }

      callInput.current.value = callDoc.id;

    pc.onicecandidate = (event) => {
      console.log("onicecandidtae event ran 👑");
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  // creating call ends...

  //  answer call starts...

  const answerCall = async () => {

    setTempFlag(false);


    const callId = callInput.current.value;
    console.log(callId);
    const callDoc = doc(firestore, "calls", callId);
    const answerCandidates = collection(callDoc, "answerCandidates");
    const offerCandidates = collection(callDoc, "offerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      console.log("snapshot run in answer");
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  //  answer call ends...

  const hangUp = () => {
    pc.close();
    localStream.getTracks().forEach((track) => {
      track.stop();
    });
    setLocalStream(null);
    setRemoteStream(null);
    webcamVideo.current.srcObject = null;
    remoteVideo.current.srcObject = null;
  };
  


  return (
    <>
      <ToastContainer
        autoClose={600}
        hideProgressBar={false}
        closeButton={false}
        newestOnTop={false}
        rtl={false}
        draggable
      />
      <div className="videoCall-holder">
        <div className="videos">
          <span>
            <div className="gradient-border">
              <video id="webcamVideo" ref={webcamVideo} autoPlay playsInline />
            </div>
          </span>
          <span>
            <div className="gradient-border">
              <video id="remoteVideo" ref={remoteVideo} autoPlay playsInline />
            </div>
          </span>
        </div>

        <div className="video-controls">
          <button
            onClick={startWebcam}
            data-label="Register"
            className="rainbow-hover"
          >
            <span className="sp">START</span>
          </button>

          {localStream && !startFlag ? (
            <>
              <button
                onClick={() => {
                  createCall();
                }}
                data-label="Register"
                className="rainbow-hover"
                disabled={!localStream}
              >
                <span className="sp">GET CODE</span>
              </button>

              <button
                onClick={() => {
                  setInputFlag(true);
                }}
                data-label="Register"
                className="rainbow-hover"
                disabled={!localStream}
              >
                <span className="sp">JOIN CALL</span>
              </button>

              <InputGroup
                style={inputFlag ? { width: "30%" } : { display: "none" }}
                className="mb-3"
              >
                <Form.Control
                  ref={callInput}
                  placeholder="Call ID..."
                  aria-label="Call ID"
                  aria-describedby="basic-addon2"
                />

                {inputFlag ? (
                  tempFlag ? (
                    <button
                      onClick={() => {
                        copy(callInput.current.value);
                        toast("CALL ID COPIED...");
                      }}
                      data-label="Register"
                      className="rainbow-hover"
                      disabled={!localStream}
                    >
                      <span className="sp">Copy</span>
                    </button>
                  ) : (
                    <button
                      onClick={answerCall}
                      data-label="Register"
                      className="rainbow-hover"
                      disabled={!localStream}
                    >
                      <span className="sp">Answer</span>
                    </button>
                  )
                ) : null}
              </InputGroup>

              <button
                onClick={hangUp}
                data-label="Register"
                className="rainbow-hover"
                disabled={!localStream}
              >
                <span className="sp">Hangup</span>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default VideoCallComponent;
