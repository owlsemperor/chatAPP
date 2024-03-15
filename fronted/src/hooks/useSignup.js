import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useContext(AuthContext)
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    })
    if (!success) return
    setLoading(true)
    try {
      // Make a POST request to the server endpoint with user data
      const response = await axios.post('/api/auth/signup', {
        fullName,
        username,
        password,
        confirmPassword,
        gender,
      })
      const data = response.data
      // If the request is successful, handle the response data
      console.log(data)
      if (data.error) {
        throw new Error(data.error)
      }
      //localstorage
      localStorage.setItem('chat-user', JSON.stringify(data))
      //context
      setAuthUser(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { loading, signup }
}

export default useSignup

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill all the fields')
    return false
  }
  if (password !== confirmPassword) {
    toast.error('Password does not match')
    return false
  }
  if (password.length < 6) {
    toast.error('Password atleast 6 character long')
    return false
  }
  return true
}
