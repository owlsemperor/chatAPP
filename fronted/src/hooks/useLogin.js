import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useContext(AuthContext)

  const login = async (username, password) => {
    setLoading(true)
    try {
      // Make a POST request to the server endpoint with user data
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      })
      const data = await response.data
      if (data.error) {
        throw new error(data.error)
      }
      localStorage.setItem('chat-user', JSON.stringify(data))
      setAuthUser(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { loading, login }
}

export default useLogin
