        <div style={{ position: "relative", height: "500px"}}>
          <MainContainer style={{ fontSize: "1.1em" }}>
            <ChatContainer>

            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src='/images/user.png' name="Joe" />
              <ConversationHeader.Content
                userName="Joe"
                info="Active 10 mins ago"
              />
            </ConversationHeader>

              <MessageList>
                <Message
                  model={{
                    message: "Fuck 🫵",
                    sentTime: "just now",
                    sender: "Joe",
                  }}
                />
              </MessageList>
              <MessageInput placeholder="Type message here" />
            </ChatContainer>
          </MainContainer>
        </div>







# typingIndicator={<TypingIndicator content="Zoe is typing" />}


  {/* <VoiceCallButton />
                  <VideoCallButton /> */}