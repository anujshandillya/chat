import toast from "react-hot-toast";
import useConversation from "../store/useConversation";
import { useState } from "react";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const {selectedConversation, messages, setMessages} = useConversation() as any;
  // console.log(selectedConversation);

  const sendMessage = async (message: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({message}),
      });
      const data=await res.json();
      if(data.error) throw new Error(data.error);
      setMessages([...messages,data.data]);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
        setLoading(false);
    }
  }

  return {loading, sendMessage}
}

export default useSendMessage