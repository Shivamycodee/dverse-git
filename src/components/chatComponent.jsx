import { useState, useEffect,useRef } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
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


export default function ChatConmpnent(){

  const { address,message,messages, setMessage, sendMessage } = useMatrixContext();

  
  const sendHandler = ()=>{
    if(address){
      sendMessage();
    }else{
      toast("Connect ur wallet");
    }
  }

     

    return (
      <>
        <ToastContainer
          autoClose={1200}
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
          <MainContainer responsive>
            <Sidebar position="left" scrollable={false}>
              <Search placeholder="Search..." />
              <ConversationList>
                <Conversation
                  name="Lilly"
                  lastSenderName="Lilly"
                  info="Yes i can do it for you"
                >
                  <Avatar
                    src="/images/avatar/deadpool.png"
                    name="Emily"
                    status="available"
                  />
                </Conversation>

                <Conversation
                  name="Zoe"
                  lastSenderName="Zoe"
                  info="Yes i can do it for you"
                >
                  <Avatar
                    src="/images/avatar/deadpool.png"
                    name="Emily"
                    status="available"
                  />
                </Conversation>
              </ConversationList>
            </Sidebar>

            {/* chat main container begins */}
            <ChatContainer>
              <ConversationHeader>
                <ConversationHeader.Back />
                <Avatar
                  src="/images/avatar/deadpool.png"
                  // name="Emily"
                  status="available"
                />
                <ConversationHeader.Content
                  // userName="Zoe"
                  info="Active a mins ago"
                />

                <ConversationHeader.Actions>
                  <EllipsisButton orientation="vertical" />
                </ConversationHeader.Actions>
              </ConversationHeader>

              <MessageList>
                <MessageSeparator content="Saturday, 30 November 2019" />

                {messages.map((elm,i) => {
                  return (
                    <Message
                    key = {i+1}
                      model={{
                        message: elm.slice(5,).toString(),
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
                onChange={(value) => setMessage(address.slice(2,7)+value)}
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