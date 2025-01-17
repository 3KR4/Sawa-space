'use client'
import React from 'react'
import dynamic from 'next/dynamic';

export default function ChatHomePage() {


  return (
    <div className='chat-page'>
      <img src={'/Svgs/Group Chat-pana.svg'} alt={`Group Chat-pana.svg`}/>
      <h1>Explore your chats and choose one to start.</h1>
    </div>
  )
}