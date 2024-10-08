import Conversation from "../models/convo.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socketIO/socket.js";

export const sendMessages = async (req, res) => {
    // res.send(`message sent! ${req.params.id}`)
    try {
        const {message} = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let convo = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if(!convo) {
            convo = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage) {
            convo.messages.push(newMessage._id);
        }

        
        // await convo.save(); // save convo
        // await newMessage.save(); // save message
        
        await Promise.all([convo.save(), newMessage.save()]); // save both convo and message
        
        // SOCKET IO CONFIGURATION
        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({ 
            message: "Message sent successfully",
            data: newMessage
        });
    } catch (error) {
        console.log("Error in send message controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const convo = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); // not reference but actual messages

        if(!convo) return res.status(200).json([]);

        const messages = convo.messages;
        res.status(200).json({
            message: "Messages fetched successfully",
            data: convo.messages
        });
    } catch (error) {
        console.log("Error in get message controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};