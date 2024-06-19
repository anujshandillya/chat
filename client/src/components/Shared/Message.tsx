import { useAuthContext } from "../../context/authContext";
import useConversation from "../../store/useConversation";
import extractTime from "../../utils/extractTime";

const Message = ({ message }: any) => {
  const { authUser } = useAuthContext();
  // const { selectedConversation } = useConversation() as any;
  const Me = authUser?._id === message.senderId;
  const chatClassName = Me ? "chat-end" : "chat-start";
  // const pfp = (Me
  //   ? authUser?.profilePicture
  //   : selectedConversation?.profilePicture);
    const bubbleBgColor = Me ? "bg-blue-500" : "bg-gray-500";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src=""
            alt=""
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
