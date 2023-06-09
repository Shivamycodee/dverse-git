import React,{useContext,useState,useEffect,useRef} from 'react'
import { MatrixClient, MatrixEvent, Room } from "matrix-js-sdk";


export const matrixContext = React.createContext();

const MATRIX_HOMESERVER_URL = "https://matrix.org";
const MATRIX_ACCESS_TOKEN = "syt_ZHZlcnNl_IaknukcQuzrQMNhYULPf_3FRmJO";
const MATRIX_USER_ID = "@dverse:matrix.org";
const UNIVERSAL_ROOM_ID = "!YeHVKSqvWeKjYGrtub:matrix.org";

export default function MatrixContextProvider({children}) {

  // Matrix handle variables...
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [histroyFlag, setHistoryFlag] = useState(true);
  const historyFlagRef = useRef(histroyFlag);

  const [messageHistory, setMessageHistory] = useState([]);

  // Room changer
  const [roomId, setRoomId] = useState(UNIVERSAL_ROOM_ID);


  // wallet handle variables...
  const [address, setAddress] = useState();


  

  useEffect(() => {

    // alert(histroyFlag);
    // historyFlagRef.current = false;

    async function initializeMatrix() {
      const matrixClient = new MatrixClient({
        baseUrl: MATRIX_HOMESERVER_URL,
        accessToken: MATRIX_ACCESS_TOKEN,
        userId: MATRIX_USER_ID,
        timelineSupport: true,
      });

      matrixClient.startClient({ initialSyncLimit: 10000 });

      //  matrixClient.on("sync", async(state, prevState, data) => {
      //    if (state === "SYNCING" && prevState === "PREPARED") {
      //      const matrixRoom = matrixClient.getRoom(MATRIX_ROOM_ID);
      //      updateMessages(matrixRoom);

      //    }
      //  });

      matrixClient.on(
        "Room.timeline",
        async (event, matrixRoom, toStartOfTimeline) => {
          if (
            matrixRoom.roomId === roomId &&
            event.getType() === "m.room.message"
          ) {
            try {
              const timeline = await matrixClient.getEventTimeline(
                matrixRoom.getUnfilteredTimelineSet(),
                event.getId(),
                { limit: 100 }
              );
              const textMessages = timeline.events.filter(
                (event) =>
                  event.getType() === "m.room.message" &&
                  event.getContent().msgtype === "m.text"
              );

        
            } catch (err) {
              console.log("Error paginating the event timeline:", err);
            }
            updateMessages(matrixRoom);
          }
        }
      );

      setClient(matrixClient);
    }

    initializeMatrix();

    const updateMessages = (matrixRoom) => {
     console.log(histroyFlag)
      if (!matrixRoom) return;
      const newMessages = matrixRoom
        .getLiveTimeline()
        .getEvents()
        .filter((event) => event.getType() === "m.room.message");

      const arr = [];

      newMessages.map((elm) =>{
        const obj = {
          msg: elm.getContent().body,
          timeStamp:elm.localTimestamp,
        };
         arr.push(obj)
        });

      if (historyFlagRef.current) {
        setMessageHistory((pre) => {
          return arr;
        });
      } else {
        setMessages((prevMessages) => {
          if (!prevMessages || prevMessages.length === 0) {            
            return arr;
          }
          const lastMessage = prevMessages[prevMessages.length - 1].msg;
          if (arr[0].msg !== lastMessage) {
            return [...prevMessages, arr[0]];
          } else {
            return prevMessages;
          }
        });
      }
    };

    return () => {
      if (client) {
        client.stopClient();
      }
    };
  }, [roomId]);




  useEffect(() => {
    setMessages(messageHistory);
  }, [messageHistory]);

  const sendMessage = async () => {
    if (client && message.trim() !== "") {
      setHistoryFlag(false);
      historyFlagRef.current = false;
      await client.sendTextMessage(roomId, message.trim());
      setMessage("");
    }
  };

  async function createSpace(spaceName, spaceTopic = "") {
    const spaceCreationContent = {
      room_alias_name: spaceName,
      visibility: "public",
      preset: "public_chat",
      name: spaceName,
      topic: spaceTopic,
      initial_state: [
        {
          type: "m.room.history_visibility",
          content: {
            history_visibility: "invited",
          },
        },
        {
          type: "m.room.join_rules",
          content: {
            join_rule: "public",
          },
        },
        {
          type: "m.room.guest_access",
          content: {
            guest_access: "can_join",
          },
        },
        {
          type: "m.room.power_levels",
          content: {
            users_default: 50,
            state_default: 50,
            events_default: 0,
            ban: 50,
            kick: 50,
            redact: 50,
            invite: 50,
          },
        },
        {
          type: "m.room.encryption",
          content: {
            algorithm: "m.megolm.v1.aes-sha2",
          },
        },
      ],
    };

    const response = await client.createRoom(spaceCreationContent);
    const spaceRoomId = response.room_id;
    console.log(`➡️ : ${spaceRoomId}`);
    try {
      // Enable encryption in the room
      await client.sendStateEvent(spaceRoomId, "m.room.encryption", "", {
        algorithm: "m.megolm.v1.aes-sha2",
      });
    } catch (e) {
      console.log(e);
    }

    return spaceRoomId;
  }

  return (
    <matrixContext.Provider
      value={{
        address,
        setAddress,
        messages,
        setMessages,
        message,
        setMessage,
        sendMessage,
        createSpace,
        roomId,
        setRoomId,
      }}
    >
      {children}
    </matrixContext.Provider>
  );
}


export const useMatrixContext = ()=>{
    return useContext(matrixContext);
}

