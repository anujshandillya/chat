import { useSocketContext } from "../../context/socketContext";
import useConversation from "../../store/useConversation";

const Conversation = ({conversation, lastIdx, emoji}: any) => {
    const {selectedConversation, setSelectedConversation} = useConversation() as any;
    // console.log(selectedConversation);
    const isSelected = (selectedConversation?._id === conversation._id);
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
    <div 
    className={`flex gap-2 items-center hover:bg-sky-200 rounded p-2 py-1 cursor-pointer 
    ${isSelected ? "bg-sky-500" : ""}`}
    onClick={() => setSelectedConversation(conversation)}
    >
        <div className={`avatar ${isOnline ? "online" : null}`}>
            <div className="w-12 rounded-full">
                <img 
                    src={conversation.profilePicture}
                    alt="user avatar" 
                    />
            </div>
        </div>
        <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">
                    {conversation.firstName} {conversation.lastName}
                </p>
                <span className="text-xl">{emoji}</span>
            </div>
        </div>
    </div>
    {!lastIdx && <div className="divider my-0 py-0 h-1"/>}
    {/* <div className="divider my-0 py-0 h-1"/> */}
    </>
  )
}

export default Conversation