import { useEffect } from 'react'
import { useSocketContext } from '../context/socketContext';
import useConversation from '../store/useConversation';

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation() as any;

    useEffect(() => {
        socket?.on("newMessage", (data: any) => {
            setMessages([...messages,data])
        });

        return () => socket?.off("newMessage")
    },[socket, messages, setMessages])
}

export default useListenMessages