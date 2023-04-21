import React,{useContext,useState,useEffect} from 'react'
import { MatrixClient, MatrixEvent, Room } from "matrix-js-sdk";

export const matrixContext = React.createContext();

const MATRIX_HOMESERVER_URL = "https://matrix.org";
const MATRIX_ACCESS_TOKEN = "syt_ZHZlcnNl_IaknukcQuzrQMNhYULPf_3FRmJO";
const MATRIX_USER_ID = "@dverse:matrix.org";
const MATRIX_ROOM_ID = "!hgqKQJogzkVQUhWIcq:matrix.org";

export default function MatrixContextProvider({children}) {

 // Matrix handle variables...
  const [client, setClient] = useState(null);
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


 // wallet handle variables...
  const [address,setAddress] = useState();


 useEffect(() => {
   async function initializeMatrix() {
     const matrixClient = new MatrixClient({
       baseUrl: MATRIX_HOMESERVER_URL,
       accessToken: MATRIX_ACCESS_TOKEN,
       userId: MATRIX_USER_ID,
     });

     matrixClient.startClient({ initialSyncLimit: 10000 });

     matrixClient.on("sync", (state, prevState, data) => {
       if (state === "SYNCING" && prevState === "PREPARED") {
         const matrixRoom = matrixClient.getRoom(MATRIX_ROOM_ID);
         updateMessages(matrixRoom);

       }
     });

     matrixClient.on(
       "Room.timeline",
       (event, matrixRoom, toStartOfTimeline) => {
         if (
           matrixRoom.roomId === MATRIX_ROOM_ID &&
           event.getType() === "m.room.message"
         ) {
           updateMessages(matrixRoom);
         }
       }
     );

     setClient(matrixClient);
   }

   initializeMatrix();

   const updateMessages = (matrixRoom) => {
     if (!matrixRoom) return;
     const newMessages = matrixRoom
       .getLiveTimeline()
       .getEvents()
       .filter((event) => event.getType() === "m.room.message");
     const arr = [];
     newMessages.map(elm =>arr.push(elm.getContent().body))
     setMessages(arr);
   };

   return () => {
     if (client) {
       client.stopClient();
     }
   };
 }, []);

 const sendMessage = async () => {
   if (client && message.trim() !== "") {
     await client.sendTextMessage(MATRIX_ROOM_ID, message.trim());
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
     // Set the room type to m.space
     await client.sendStateEvent(
       spaceRoomId,
       "m.room.type",
       "org.matrix.msc1772.space",
       {
         type: "m.space",
       }
     );
   } catch (e) {
     console.log(e);
   }

   return spaceRoomId;
 }


  return (
    <matrixContext.Provider
      value={{ address, setAddress, messages, message ,setMessage,sendMessage }}
    >
      {children}
    </matrixContext.Provider>
  );
}


export const useMatrixContext = ()=>{
    return useContext(matrixContext);
}

