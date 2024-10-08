import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuthContext } from './authContext';

const SocketContext = createContext<any>(null);

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({children}: any) => {
    const [socket,setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState ([]);
    const {authUser} = useAuthContext();
    useEffect(() => {
        if(authUser) {
            const socketIO = io('http://localhost:8000', {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socketIO);

            socketIO.on("getOnlineUsers", (users: any) => {
                setOnlineUsers(users);
            })
        } else {
            socket?.close();
            setSocket(null);
        }
        return () => socket?.close();
    },[])
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}