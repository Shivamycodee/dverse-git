import React,{useEffect} from 'react'
import WithLazyLoader from "@/components/withLazyLoader";
import ChatComponent from '@/components/chatComponent'

function Chat() {

  return (
    <div>
   <ChatComponent/>
    </div>
  )
}

export default WithLazyLoader(Chat);