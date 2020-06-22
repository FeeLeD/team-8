import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    chatRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatroom'
    },
    login: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('message', MessageSchema);

export default Message;