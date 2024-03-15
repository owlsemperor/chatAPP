import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const useGetConversations = () => {
  const [loading, setLaoding] = useState(false)
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const GetConversations = async () => {
      setLaoding(true)
      try {
        const response = await axios.get('/api/user/')
        const data = await response.data
        if (data.error) {
          throw new Error(data.error)
        }
        setConversations(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLaoding(false)
      }
    }
    GetConversations()
  }, [])
  return { loading, conversations }
}
export default useGetConversations
