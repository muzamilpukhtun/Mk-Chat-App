const Conversation = require('../models/conversation.Model');
const Message = require('../models/message.Model');
const { getReceiverSocketId, io } = require('../socket/socket');


exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(),newMessage.save()]);
        
        // SOCKET IO FUNCTIONALTITY
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
 exports.getMessage=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages")

        if(!conversation) return res.status(200).json([]);

        const messages=conversation.messages;
        
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
 }

