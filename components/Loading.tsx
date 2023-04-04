import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

function Loading() {
  return (
    <div className='w-full h-full flex justify-center'>
        <AiOutlineLoading className='animate-spin'/>
    </div>
  )
}

export default Loading