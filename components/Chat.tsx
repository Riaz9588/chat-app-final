import { useChatAdd } from '@/hooks/useChatAdd'
import { useGetChatByGroupId } from '@/hooks/useGetChatByGroupId'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { BsSendFill } from 'react-icons/bs'




function Chat({ groupId }: any) {

  const session: any = useSession()

  const [message, setMessage] = useState("")

  const { isLoading, isError, isSuccess, data, error, mutate } = useChatAdd()

  const { isLoading: getChatsLoading, isError: getChatsIsError, error: getChatsError, data: getChatsData, isFetching: getChatsIsFetching }: any = useGetChatByGroupId(groupId)


  console.log("chatGetQuery", getChatsLoading, getChatsIsError, getChatsError, getChatsData, getChatsIsFetching)

  const submitMessage = async (e: any) => {
    e.preventDefault()
    if (message === null) {
      alert("Enter message")
    } else {
      const chatInfo = {
        groupId,
        message
      }
      mutate(chatInfo)
      e.target.reset()
    }
  }

  if(groupId) {
    if (getChatsLoading) return <div>"Loading..."</div>
  }

  if (!getChatsData) {
    return <div className="h-96">Click on the group to see chats!</div>
  }


  if (isError || getChatsError) return <div>Error: "Something went wrong!"</div>


  return (
    <div>
      <div className='h-96 overflow-scroll' >
        <ul>
          {getChatsData.length !== 0 ?
            getChatsData.map((chat: any) => (
              chat.user.name === session.data.user.name ?
                <li key={chat.id} className='flex justify-end'>
                  <span className='text-right bg-blue-500 rounded-lg mt-1 text-white py-1 px-2'><span className='font-medium'>{chat.user.name}</span>: {chat.message}</span>
                </li>
                :
                <li key={chat.id} className='my-2'>
                  <span className='text-left bg-slate-500 rounded-lg text-white py-1 px-2'><span className='font-medium'>{chat.user.name}</span>: {chat.message}</span>
                </li>
            ))
            :
            <div className="h-96">No chats created yet!</div>
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





