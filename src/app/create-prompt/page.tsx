'use client'
import Form from '@/_components/Form'
import React, { useState } from 'react'

const pageCreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })
  const createPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
  }

  return (
    <div className='w-full flex-start flex-col item-center bg-gray-100 '>
      <Form
        type= "Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}/>
    </div>
  )
}

export default pageCreatePrompt
