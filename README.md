
mongo cluster with 8758




    {messages ? (
                  messages.map((elm, i) => {
                    const di =
                    elm.msg.slice(0, 5) == address.slice(2, 7)
                    ? "outgoing"
                    : "incoming";

                  //   const postDate = getPostDate(elm.timeStamp);
                  //  {console.log("👻"+postDate)}

                    if (roomId !== "!YeHVKSqvWeKjYGrtub:matrix.org") {
                      return (
                        <>
                          <Message
                            key={i + 1}
                            model={{
                              message: "02:30 pm",
                              message: elm.msg.slice(5).toString(),
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: di, // outgoing -- ur sending
                              position: "last",
                            }}
                          ></Message>
                          {/* <span style={{ fontSize: 10 }}>
                            {getPostTime(elm.timeStamp)}
                          </span> */}
                        </>
                      );
                    } else {
                      if (di == "outgoing") {
                        
                        return (
                          <>
                            {/* {console.log(getPostDate(elm.timeStamp))} */}
                            {/* <MessageSeparator content={

                            getPostDate(elm.timeStamp) ? "Saturday, 30 November 2019":null

                            } /> */}
                            <Message
                              key={i + 1}
                              style={{marginRight:20,marginTop:16}}
                              model={{
                                message: elm.msg.slice(5).toString(),
                                sentTime: "15 mins ago",
                                sender: "Zoe",
                                direction: di, // outgoing -- ur sending
                                position: "last",
                              }}
                            ></Message>
                            <span style={{ fontSize: 10,marginLeft:"96%"}}>
                              {getPostTime(elm.timeStamp)}
                            </span>
                          </>
                        );
                      }
                    }
                  })
                ) :null
                 }




                 #simple conversation


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



                  <!-- stream reloader  -->

                   {streamKey && playbackId ? (
        <button
          style={{ marginLeft: "44%", marginTop: "2%" }}
          onClick={() => reloadPlayer()}
          className="btn btn-outline-dark"
        >
          Reload
        </button>
      ) : null}



        <!-- live chat  -->

// const getChat = (chat)=>{

  //   const regex = /^(.+)\?@\*!\%#(\d+)(.*)$/;
  //   const match = chat.match(regex);

  //   if (match) {
  //     const name = match[1];
  //     const walletAddress = match[2];
  //     const chat = match[3];

  //    alert(`${name}(${walletAddress}): ${chat}`)
  //    return `${name}(${walletAddress}): ${chat}`;
  //   } else {
  //     toast.error("Chat check issue")
  //     console.log("⚠️⚠️⚠️")
  //     console.log(match);

  //   }
  // }





   {/* <ChatContainer>
                <MessageList style={{ marginTop: 20 }}>
                  <MessageSeparator content="30 March 2023" />

                  {streamStatus && streamTime
                    ? (

                      messages.map((elm, i) => {
                
                        return streamTime <= elm.timeStamp ? (
                          <Message
                            key={i + 1}
                            style={{ marginBottom: 15 }}
                            model={{
                              message: "02:30 pm",
                              message: `${elm.msg.slice(0, 5)}: ${elm.msg.slice(5,)}`,
                              sentTime: getPostTime(elm.timeStamp),
                              sender: "Zoe",
                              direction: "incoming",
                              position: "last",
                            }}
                          ></Message>
                        ) : null;


                      }))
                    : null}
                </MessageList>

                <MessageInput
                  ref={inputRef}
                  placeholder="Type message here..."
                  disabled={streamStatus ? false : true}
                  attachButton="false"
                  onChange={(value) => {
                          setMessage(address.slice(0, 5) + value);
                  }}
                  onSend={() => sendHandler()}
                />
              </ChatContainer> */}
