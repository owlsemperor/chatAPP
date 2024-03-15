import React, { useEffect, useRef } from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessages from '../../hooks/useListenMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import Message from './Message'

const Messages = () => {
  const { loading, messages } = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef(null)
  useEffect(() => {
    if (!loading && messages.length > 0) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [loading, messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {messages.map((message, index) => (
        <div
          key={message._id}
          ref={index === messages.length - 1 ? lastMessageRef : null}>
          <Message message={message} />
        </div>
      ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages
