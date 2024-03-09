import { Schema, model, models } from "mongoose";

const msgSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    attachments: { type: [{ url: String, localPath: String }], default: [] },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const ChatMessage = models.ChatMessage || model("ChatMessage", msgSchema);

export default ChatMessage
