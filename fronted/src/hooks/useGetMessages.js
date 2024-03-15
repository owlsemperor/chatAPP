import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useConversation from '../zustand/useConversation'

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `/api/messages/${selectedConversation._id}`
        )
        const data = await response.data
        if (data.error) throw new Error(data.error)
        setMessages(data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    if (selectedConversation?._id) getMessages()
  }, [selectedConversation?._id, setMessages])
  return { messages, loading }
}

export default useGetMessages
