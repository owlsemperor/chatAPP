import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import axios from 'axios'
import toast from 'react-hot-toast'
function useSendMessage() {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        { message }
      )
      const data = await response.data
      if (data.error) {
        throw new Error(data.error)
      }
      setMessages([...messages, data])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { sendMessage, loading }
}

export default useSendMessage
