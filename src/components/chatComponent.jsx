import { useState, useEffect,useRef } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Design from "@/styles/profile.module.css";
import { Button } from "react-bootstrap";
import { useMatrixContext } from "../../context/matrix";
import { useGlobalContext } from "../../context/prime";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  Sidebar,
  ConversationList,
  Search,
  SendButton,
  Conversation,
  VoiceCallButton,
  VideoCallButton,
  EllipsisButton,
  TypingIndicator,
  MessageSeparator,
  InputToolbox,
  // AttachmentButton,
} from "@chatscope/chat-ui-kit-react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from'sweetalert2'
import copy from "copy-to-clipboard";
import Spinner from "react-bootstrap/Spinner";






export default function ChatConmpnent(){

  const {
    address,
    message,
    messages,
    setMessage,
    sendMessage,
    createSpace,
    roomId,
    setRoomId,
    setMessages,
  } = useMatrixContext();

  const { userName, getPostTime, getPostDate } = useGlobalContext();


  const [currentActive,setCurrentActive] = useState(userName);
  const [roomList, setRoomList] = useState([
    {
      name: userName,
      roomId: "!YeHVKSqvWeKjYGrtub:matrix.org",
    },
  ]);

  const [loading, setLoading] = useState(true);

  const [timeLine, setTimeline] = useState([]);

  const [searchValue, setSearchValue] = useState("");





  const handleCreateRoom = async()=>{

    const response = await Swal.fire({
      title: "Create New Room 🏡",
      input: "text",
      inputLabel: "Enter Room Name (⚠️ No space in-between)",
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to write something!"
      }
    }).then((res) => {
      return res.value;
    });


    try{

      const rmId = await createSpace(response + address.slice(2, 7));

      toast("yeah! room created 🚀")
    
      setCurrentActive(response);
      setRoomId(rmId);
      
      const obj = {
      name: response,
      roomId: rmId
    };
    
    
   setRoomList([...roomList,obj])

   setMessages([]);
  
  }catch(e){

    console.error(e);
    toast.error("🙈 Name Already exist")
  }

  }
  

  const joinRoom = async()=>{

    const response = await Swal.fire({
      title: "Join Room 🏡",
      html:
        '<input id="swal-input1" placeHolder="Enter Room Name" class="swal2-input">' +
        '<input id="swal-input2" placeHolder="Enter Room ID" class="swal2-input">',
      focusConfirm: false,
      preConfirm: async() => {
      const roomName = document.getElementById("swal-input1").value;
      const roomId = document.getElementById("swal-input2").value;

      if (!roomName || !roomId) {
        Swal.showValidationMessage("Both fields are required!");
        return;
      }else{
      await Swal.fire({
     title: "Success!",
     text: "Room joined successfully.",
     icon: "success",
   });
    return [roomName,roomId]
      }
    }

    });

    const value = response.value;

    if(value){

      
      setCurrentActive(value[0]);
      setRoomId(value[1]);
      console.log(value)
      const obj = {
        name: value[0],
        roomId: value[1],
      };

      setRoomList([...roomList, obj]);
      setMessages([])
      toast("Room Joined... 🔥");
      
  
    }

  }

  const handleRoomSelected = (name, roomId)=>{

   setCurrentActive(name);
   setRoomId(roomId);
   setMessages(null)


  }

  
  const sendHandler = ()=>{
    if(address){
      sendMessage();
    }else{
      toast("Connect ur wallet");
    }
  }

 let optionObj = {}
 
 for(let i=0;i<roomList.length;i++){
  const word = roomList[i].name;
  optionObj[`${word}`] = word;
 }


  const handleDeleteRoom = async() => {

    const value = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: {
        Rooms: optionObj
      },
      inputPlaceholder: "Select Room",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== null) {
            resolve()
          }
        });
      },
    }).then((res) => {
      return res.value;
    });

if (value) {
  const updatedRoomList = roomList.filter((room) => room.name !== value);
  setRoomList(updatedRoomList);
  Swal.fire(`Room ${value} has been deleted`)
  // localStorage.removeItem(value);
  setMessages([]);
}
   
    // window.location.reload();

  };

  const showWarningMessage = async () => {
    await Swal.fire({
      title: "Warning!",
      text: "Connect Your Wallet",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  useEffect(()=>{
    const rmList = localStorage.getItem("userRoomList");

    if(roomList.length > 1){
      if (roomList !== JSON.parse(rmList)){
        localStorage.setItem("userRoomList", JSON.stringify(roomList));
      }
    }

  },[roomList])

  useEffect(()=>{
    const rmList = localStorage.getItem("userRoomList");

 if (rmList) {
   const prmList = JSON.parse(rmList);
   if (prmList !== roomList) {
     setRoomList(prmList);
   }
 }
  },[])


  //  chat scroller useEffect  

 const preScroller = () => {
   const messageListElement =
     document.getElementsByClassName("cs-message-list")[0];

   try{
     
     messageListElement.scrollTop = messageListElement.scrollHeight;
     
     messageListElement.scrollTo({
       top: messageListElement.scrollHeight,
       behavior: "smooth",
      });
    }catch(e){return}
 };

 useEffect(() => {
   if (messages) {
     preScroller();

     const arr = [];
     let previousDate = null;

     messages.forEach((elm) => {
       const postDate = getPostDate(elm.timeStamp);

       if (previousDate !== postDate) {
         arr.push(postDate);
         previousDate = postDate;
       } else {
         arr.push(null);
       }
     });

     setTimeline(arr);
   }
 }, [messages]);

 
 
 useEffect(()=>{

  if(!loading) setLoading(true);
    
},[roomId])

useEffect(()=>{

 setTimeout(()=>{
    setLoading(false);
 },2000)

},[loading])


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

        {address ? (
          <div>
            <MainContainer responsive>
              <Sidebar position="left" scrollable={true} style={{ padding: 6 }}>
                <Search
                  value={searchValue}
                  onChange={(value) => setSearchValue(value)}
                  placeholder="Search..."
                  onClearClick={()=>setSearchValue("")}
                />
                <ConversationList>

                  {/* {roomList.map((val, i) => {
                    return (
                      <Conversation
                        key={i + 1}
                        onClick={() => handleRoomSelected(val.name, val.roomId)}
                        name={val.name}
                        lastSenderName={val.name}
                        style={
                          val.name == currentActive
                            ? { backgroundColor: "#c6e3fa" }
                            : null
                        }
                      >
                        <Avatar
                          src="/images/avatar/deadpool.png"
                          name={val.name}
                          status="away"
                        />
                      </Conversation>
                    );
                  })} */}

                  {roomList
                    .filter((val) => {
                      if (val.name) {
                        return val.name
                          .toLowerCase()
                          .includes(searchValue.toLowerCase());
                      }
                      return false;
                    })
                    .map((val, i) => {
                      const isActive = val.name === currentActive;
                      const isMatched = val.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                      return (
                        <Conversation
                          key={i + 1}
                          onClick={() =>
                            handleRoomSelected(val.name, val.roomId)
                          }
                          name={val.name}
                          lastSenderName={val.name}
                          style={
                            isMatched
                              ? isActive
                                ? {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid white",
                                  }
                                : { border: "1px solid white" }
                              : isActive
                              ? { backgroundColor: "#ffffff" }
                              : null
                          }
                        >
                          <Avatar
                            src="/images/avatar/deadpool.png"
                            name={val.name}
                            status="away"
                          />
                        </Conversation>
                      );
                    })}
                </ConversationList>

                <button
                  onClick={() => handleCreateRoom()}
                  className="btn btn-outline-primary lg"
                  style={{ marginBottom: 10 }}
                >
                  Create Room
                </button>
                <button
                  onClick={() => joinRoom()}
                  className="btn btn-primary lg"
                  style={{ marginBottom: 10 }}
                >
                  Join Room
                </button>
                <button
                  style={{ marginBottom: 10 }}
                  onClick={() => handleDeleteRoom()}
                  className="btn btn-outline-danger lg"
                >
                  Delete Room
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-outline-info lg"
                >
                  Facing Issue? click here
                </button>
              </Sidebar>

              {/* chat main container begins */}
              <ChatContainer>
                <ConversationHeader>
                  <ConversationHeader.Back />
                  <Avatar
                    src="/images/avatar/deadpool.png"
                    name="Emily"
                    status="available"
                  />
                  <ConversationHeader.Content
                    userName={currentActive ? currentActive : userName}
                    info="Active a mins ago"
                  />

                  <ConversationHeader.Actions>
                    <Button
                      style={{ borderRadius: "12px", marginRight: 20 }}
                      variant="outline-primary"
                      onClick={() => {
                        copy(roomId);
                        toast("Room Id copied...🎉");
                        console.log(roomList);
                      }}
                    >
                      {roomId.slice(0, 12)}...
                    </Button>
                    {/* <EllipsisButton orientation="vertical" /> */}
                  </ConversationHeader.Actions>
                </ConversationHeader>

                <MessageList>
                  {loading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%", marginTop: "25%" }}
                    >
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : messages ? (
                    messages.map((elm, i) => {
                      const di =
                        elm.msg.slice(0, 5) == address.slice(2, 7)
                          ? "outgoing"
                          : "incoming";

                      const temp = timeLine[i];

                      if (roomId !== "!YeHVKSqvWeKjYGrtub:matrix.org") {
                        return (
                          <>
                            {temp ? (
                              <MessageSeparator
                                style={{ marginTop: 20 }}
                                content={temp}
                              />
                            ) : null}
                            <Message
                              key={i + 1}
                              style={
                                di == "outgoing"
                                  ? { marginRight: 20, marginTop: 18 }
                                  : { marginLeft: 20, marginTop: 18 }
                              }
                              model={{
                                message: "02:30 pm",
                                message: elm.msg.slice(5).toString(),
                                sentTime: "15 mins ago",
                                sender: "Zoe",
                                direction: di, // outgoing -- ur sending
                                position: "last",
                              }}
                            >
                            
                            </Message>
                            <span
                              style={
                                di == "outgoing"
                                  ? { fontSize: 10, marginLeft: "95.5%" }
                                  : { fontSize: 10 }
                              }
                            >
                              {getPostTime(elm.timeStamp)}
                            </span>
                          </>
                        );
                      } else {
                        if (di == "outgoing") {
                          return (
                            <>
                              {temp ? (
                                <MessageSeparator
                                  style={{ marginTop: 20 }}
                                  content={temp}
                                />
                              ) : null}

                              <Message
                                key={i + 1}
                                style={{ marginRight: 20, marginTop: 18 }}
                                model={{
                                  message: elm.msg.slice(5).toString(),
                                  sentTime: getPostTime(elm.timeStamp),
                                  sender: "Zoe",
                                  direction: di, // outgoing -- ur sending
                                  position: "last",
                                }}
                              >
                              
                              </Message>
                              <span style={{ fontSize: 9, marginLeft: "95%" }}>
                                {getPostTime(elm.timeStamp)}
                              </span>
                            </>
                          );
                        }
                      }
                    })
                  ) : null}
                </MessageList>

                <MessageInput
                  placeholder="Type message here..."
                  // sendDisabled="false"
                  attachButton="false"
                  // value={}
                  onChange={(value) => {
                    setMessage(
                      address
                        ? address.slice(2, 7) + value
                        : toast("Connect Wallet")
                    );
                  }}
                  onSend={() => sendHandler()}
                />
              </ChatContainer>
            </MainContainer>
            {/* chat main container ends */}
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
      </>
    );

}