import { Schema, model, models } from "mongoose";

const chatSchema = new Schema(
  {
    name: { type: String, required: true },
    isGroupChat: { type: Boolean, default: false },
    lastMsg: { type: Schema.Types.ObjectId, ref: "ChatMessage" },
    members: { type: Schema.Types.ObjectId, ref: "User" },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat= models.Chat || model("Chat", chatSchema);

export default Chat