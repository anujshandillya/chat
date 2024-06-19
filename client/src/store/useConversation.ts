import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: any) => set({ selectedConversation: selectedConversation }),
    messages: [],
    setMessages: (messages: any) => set({ messages: messages })
}));

export default useConversation;


