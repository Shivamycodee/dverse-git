import { useState, useEffect,useRef } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Design from "@/styles/index.module.css";
import { Button } from "react-bootstrap";
import { useMatrixContext } from "../../context/matrix";
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
  } = useMatrixContext();

  const [currentActive,setCurrentActive] = useState("somi");
  const [roomList, setRoomList] = useState([
    {
      name: "madara",
      info: "universal god",
    },
  ]);



  const handleCreateRoom = async()=>{

    const response = await Swal.fire({
      title: "Create New Room 🏡",
      input: "text",
      inputLabel: "Enter Room Name",
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to write something!"
      }
    }).then((res) => {
      return res.value;
    });


    try{

      
      
      
      const rmId = await createSpace(response);

      toast("yeah! room created 🚀")
    
      setCurrentActive(response);
      setRoomId(rmId);
      
      const obj = {
      name: response,
      info:"new user added",
      roomId: rmId
    };
    
    
    setRoomList([...roomList,obj])

  }catch(e){

    console.error(e);
    toast.error("Failed to create room")
  }

  }
  
  

  const handleDeleteRoom = ()=>{
     localStorage.clear();
     window.location.reload();
  }

  const joinRoom = async()=>{

    const response = await Swal.fire({
      title: "Join Room 🏡",
      input: "text",
      inputLabel: "Enter Room ID",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to write something!";
      },
    }).then((res) => {
      return res.value;
    });

    toast("Room Joined... 🔥");

  }

  const handleRoomSelected = (name, roomId)=>{

   setCurrentActive(name);
   setRoomId(roomId);


  }

  
  const sendHandler = ()=>{
    if(address){
      sendMessage();
    }else{
      toast("Connect ur wallet");
    }
  }


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
        return{" "}
        <div
          style={{
            height: "86vh",
            position: "relative",
          }}
        >
          <MainContainer
            responsive
            className={`${Design.blackBackground} ${Design.chatBox}`}
          >
            <Sidebar position="left" scrollable={true} style={{ padding: 6 }}>
              <Search placeholder="Search..." />
              <ConversationList>
                {roomList.map((val,i) => {
                  return (
                    <Conversation
                    key={i+1}
                      onClick={() => handleRoomSelected(val.name, val.roomId)}
                      name={val.name}
                      lastSenderName={val.name}
                      info={val.info}
                    >
                      <Avatar
                        src="/images/avatar/deadpool.png"
                        name={val.name}
                        status="available"
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
                onClick={() => handleDeleteRoom()}
                className="btn btn-outline-primary lg"
              >
                Delete Room
              </button>
            </Sidebar>

            {/* chat main container begins */}
            <ChatContainer className={Design.blackBackground}>
              <ConversationHeader>
                <ConversationHeader.Back />
                <Avatar
                  src="/images/avatar/deadpool.png"
                  name="Emily"
                  status="available"
                />
                <ConversationHeader.Content
                  userName={currentActive}
                  info="Active a mins ago"
                />

                <ConversationHeader.Actions>
                  <Button
                    style={{ borderRadius: "12px", marginRight: 20 }}
                    variant="outline-dark"
                    onClick={() => {
                      copy(roomId);
                      toast("Room Id copied...🎉");
                      console.log(roomList);
                    }}
                  >
                    {roomId}
                  </Button>
                  <EllipsisButton orientation="vertical" />
                </ConversationHeader.Actions>
              </ConversationHeader>

              <MessageList>
                <MessageSeparator content="Saturday, 30 November 2019" />

                {messages.map((elm, i) => {
                  return (
                    <Message
                      key={i + 1}
                      model={{
                        message: elm.slice(5).toString(),
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "outgoing", // outgoing -- ur sending
                        position: "last",
                      }}
                    ></Message>
                  );
                })}
              </MessageList>

              <MessageInput
                placeholder="Type message here..."
                // sendDisabled="false"
                attachButton="false"
                // value={}
                onChange={(value) => setMessage(address.slice(2, 7) + value)}
                onSend={() => sendHandler()}
              />
            </ChatContainer>
          </MainContainer>
          {/* chat main container ends */}
        </div>
        ;
      </>
    );

}