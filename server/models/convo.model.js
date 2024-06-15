import mongoose from "mongoose";

const convoSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
    }],
},
{ 
    timestamps: true // createdAt, updatedAt
});

const Conversation = mongoose.model('Conversation', convoSchema);

export default Conversation;