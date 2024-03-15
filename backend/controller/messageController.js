import Conversation from '../models/conversationModel.js'
import Message from '../models/messageModel.js'
import { getReceiverSocketId, io } from '../socket/socket.js'

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })
    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }
    await Promise.all([conversation.save(), newMessage.save()])

    //SOCKET IO FUNCTIONALITY

    const receiverSocketId = getReceiverSocketId(receiverId)
    // console.log('hello', receiverSocketId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error) {
    console.log('Error in sendMessage controller: ', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getMessage = async (req, res) => {
  // res.status(200).send('inside getMessage controller')
  try {
    const { id: receiverId } = req.params
    const senderId = req.user._id
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('messages')
    if (!conversation) return res.status(200).json([])
    const messages = conversation.messages
    res.status(200).json(messages)
  } catch (error) {
    console.log('Error in getMessage controller', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
