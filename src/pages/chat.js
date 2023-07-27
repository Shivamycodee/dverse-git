import React,{useEffect} from 'react'
import WithLazyLoader from "@/components/withLazyLoader";
import ChatComponent from '@/components/chatComponent'

function Chat() {
  
  // just checking...

  return (
    <div>
   <ChatComponent/>
    </div>
  )
}

export default WithLazyLoader(Chat);