
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