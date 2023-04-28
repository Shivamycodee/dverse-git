// ChatBox.jsx
import React, { useState, useCallback } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
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
  TypingIndicator,
  MessageSeparator,
  InputToolbox,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";
import { useKeyContext } from "../../context/streamHandler";
import { useMatrixContext } from "../../context/matrix";
import { useGlobalContext } from "../../context/prime";


const StreamChatbox = () => {

  const { address, messages ,setMessage, sendMessage} = useMatrixContext();

  const {streamStatus } = useKeyContext();

   const { getPostTime, getPostDate, streamTime, isWatch } = useGlobalContext();


 const onChangeHandler = useCallback(
   (value) => {
     setMessage(address.slice(0, 5) + value);
   },
   [address, setMessage]
 );

 const sendHandler = useCallback(() => {
   sendMessage();
 }, [sendMessage]);

  // Other chat-related logic and JSX
  return (
    <ChatContainer>
      <MessageList style={{ marginTop: 20 }}>
        <MessageSeparator
          content={getPostDate(Date.now()) }
        />
        {(streamStatus && streamTime) || isWatch
          ? messages.map((elm, i) => {
              return streamTime <= elm.timeStamp ? (
                <Message
                  key={i + 1}
                  style={{ marginBottom: 15 }}
                  model={{
                    message: `${elm.msg.slice(0, 5)}: ${elm.msg.slice(5)}`,
                    sentTime: getPostTime(elm.timeStamp),
                    sender: "Zoe",
                    direction: "incoming",
                    position: "last",
                  }}
                ></Message>
              ) : null;
            })
          : null}
      </MessageList>
      <MessageInput
        placeholder="Type message here..."
        disabled={streamStatus || isWatch ? false : true}
        attachButton="false"
        onChange={(value) => onChangeHandler(value)}
        onSend={() => sendHandler()}
      />
    </ChatContainer>
  );
};

export default React.memo(StreamChatbox);
