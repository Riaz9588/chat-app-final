import { useChatAdd } from '@/hooks/useChatAdd'
import { useGetChatByGroupId } from '@/hooks/useGetChatByGroupId'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { BsSendFill } from 'react-icons/bs'
import Loading from './Loading'
import Image from 'next/image'
import chatImage from '@/public/chat.png'
import chatQueryImage from '@/public/chatQuery.png'



function Chat({ groupId }: any) {

  const session: any = useSession()

  const [message, setMessage] = useState("")

  const chatContainerRef: any = useRef(null)

  const { isLoading, isError, isSuccess, data, error, mutate } = useChatAdd()

  const { isLoading: getChatsLoading, isError: getChatsIsError, error: getChatsError, data: getChatsData, isFetching: getChatsIsFetching }: any = useGetChatByGroupId(groupId)

  // console.log("chatGetQuery", getChatsLoading, getChatsIsError, getChatsError, getChatsData, getChatsIsFetching)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "auto",
      })
    }
  }, [groupId, getChatsData]);

  const submitMessage = async (e: any) => {
    e.preventDefault()
    if (message) {
      const chatInfo = {
        groupId,
        message
      }
      mutate(chatInfo)
      setMessage("")
      e.target.reset()
    } else {
      alert("Enter message")
    }
  }

  if (groupId) {
    if (getChatsLoading) return <Loading />
  }

  if (isError || getChatsError) return <div className="h-96 font-semibold text-center">Error: "Something went wrong!"</div>

  if (!getChatsData) {
    return (
    <div className="h-96 font-semibold text-center flex flex-col justify-center items-center">
      <Image
        src={chatQueryImage}
        alt="click on the group to see chat"
        width={250}
        height={250}
      />
      <p className="font-semibold text-center">Click on the group to see chat!</p>
    </div>
    )
  }

  return (
    <div>
      <div className='h-96 overflow-y-auto py-2 scrollbar-hide' ref={chatContainerRef}>
        <ul>
          {getChatsData.length !== 0 ?
            getChatsData.map((chat: any) => (
              chat.user.name === session.data.user.name ?
                <li key={chat.id} className='flex justify-end'>
                  <span className='text-right bg-blue-500 rounded-lg mt-1 text-white py-1 px-2'><span className='font-bold'>{chat.user.name}</span>: {chat.message}<sub className='text-[10px] ml-1'>{new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</sub></span>
                </li>
                :
                <li key={chat.id} className='flex justify-start'>
                  <span className='text-left bg-slate-500 rounded-lg mt-1 text-white py-1 px-2'><span className='font-bold'>{chat.user.name}</span>: {chat.message}<sub className='text-[10px] ml-1'>{new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</sub></span>
                </li>
            ))
            :
            <div className="h-96 font-semibold text-center flex flex-col justify-center items-center">
              <Image
                src={chatImage}
                alt="Empty chat"
                width={250}
                height={250}
              />
              <p>No chats created yet!</p>
            </div>
          }
        </ul>
      </div>
      <form onSubmit={submitMessage} className='flex'>
        <input onChange={(e: any) => setMessage(e.target.value)} className='appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder='Enter messages' />
        <button className='p-3 bg-slate-200 rounded-r-md' type='submit'>{(isLoading || getChatsLoading) ? <AiOutlineLoading className='animate-spin' /> : <BsSendFill />}</button>
      </form>
    </div>
  )
}

export default Chat





