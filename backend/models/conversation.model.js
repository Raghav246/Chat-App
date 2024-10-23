import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    participants: [
        {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    }
    ],
    messages: [
        {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default:[]
    }
    ],
   
}, { timestamps: true })

const Message=mongoose.model("Message",messageSchema)
export default Message;