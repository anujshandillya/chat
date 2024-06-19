import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import Message from "./Message"

const Messages = () => {
  const {loading, messages} = useGetMessages();
  const lastMsgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
    },100)
  },[messages])
  console.log(messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages!==undefined && messages.length>0 && messages.map((message: any) => (
        <div key={message._id} ref={lastMsgRef}>
          <Message message={message} />
        </div>
      ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && (messages === undefined || messages.length === 0) && (
        <p className="text-center">No messages yet</p>
      )}
        {/* <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /> */}
    </div>
  )
}

export default Messages