import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useContext(AuthContext)

  const logout = async () => {
    setLoading(true)
    try {
      // Make a POST request to the server endpoint with user data
      const response = await axios.post(
        '/api/auth/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.data
      if (data.error) {
        throw new Error(data.error)
      }
      localStorage.removeItem('chat-user')
      setAuthUser(null)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { loading, logout }
}
export default useLogout
