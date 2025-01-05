'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from "next/image";
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import { maxLength } from '@/Methods';

//Icons 
import { IoClose, IoCopy } from "react-icons/io5";
import { MdOutlinePermMedia, MdContentCopy } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { TiMicrophoneOutline } from "react-icons/ti";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { messages } from '@/Data';
import { FaStar, FaShare, FaRegStar } from "react-icons/fa";
import { FaRegImages, FaRegTrashCan, FaRegSquareCheck } from "react-icons/fa6";
import { GoPin } from "react-icons/go";
import { LuSaveAll } from "react-icons/lu";
import { HiReply } from "react-icons/hi";




export default function Chat() {
  const [text, setText] = useState("");
  const [imgFocus, setImgFocus] = useState();
  const [selectMode, setSelectMode] = useState(false);
  const [selectedMsgs, setSelectedMsgs] = useState([]);
  const chatRef = useRef(null);


  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "46px";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(textarea.value);
  };

  const currentfocusdMsg = messages.find((msg) => msg.id === imgFocus);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = (hours % 12) || 12;  // Convert to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className={`pirsonChat ${selectMode && 'selectMode'}`}>
      <div className='top'>
        <div className='user'>
          <Image src={'/avatar.png'} width={40} height={40} alt={`Screenshot`}/>
          <h4>Kilwa</h4>
        </div>
        <div className='tools'>

          {selectMode ? (
            <>
              <button><FaStar/></button>
              <button><IoCopy/></button>
              <button><FaShare/></button>
              <button onClick={() => {setSelectMode(false); setSelectedMsgs([])}}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setSelectMode(true)}><BiDotsHorizontalRounded style={{fontSize: '23px'}}/></button>
          )}
        </div>
      </div>
      <Image src={'/Screenshot 2025-01-03 040444.png'} alt={`Screenshot`} fill/>

      <div className={`focusedMsg ${imgFocus && 'active'}`}>
        {imgFocus && <IoClose className='closeMsg'         
          onClick={() => setImgFocus(null)}/>}
        {currentfocusdMsg?.user !== 'Bob' && <h5>{currentfocusdMsg?.user}</h5>}
        {currentfocusdMsg?.img && (
          <img 
            src={currentfocusdMsg.img} 
            alt={currentfocusdMsg.user ? `${currentfocusdMsg.user}'s image` : "User image"} 
          />
        )}
        {currentfocusdMsg?.message && <p>{currentfocusdMsg?.message}</p>}
      </div>

      <div className='messages' ref={chatRef}>

      <div className={`messageAction sideMenu`}>
        <div className='emojes'></div>
        <button><HiReply/> Reply</button>
        <button><MdContentCopy/> Copy</button>
        <button><LuSaveAll/> Save as..</button>
        <hr/>
        <button><HiReply/> Forward</button>
        <button><FaRegStar/> Star</button>
        <button><GoPin/> Pin</button>
        <button><FaRegTrashCan/> Delete for me</button>
        <hr/>
        <button><FaRegSquareCheck/> Select</button>
      </div>

        {messages.map((x) => {
        const replyMsg = x.replyId ? messages.find((msg) => msg.id === x.replyId) : null;
        return (
          <div key={x.id} className={`msg ${x.user === 'Bob' ? 'me' : ''} ${selectedMsgs.includes(x.id) && 'selected'}`}
            onClick={() => {
              if (selectMode) {
                setSelectedMsgs(prev => 
                  prev.includes(x.id)
                    ? prev.filter(id => id !== x.id)
                    : [...prev, x.id]
                )}
              }
            }>

            {selectMode && (
              <label>
                <input type="checkbox" class="input" checked={selectedMsgs.includes(x.id) ? true : false} />
                <span class="custom-checkbox"></span>
              </label>
            )}

            <div className={'body'}>
              <div className='top'>{x.user !== 'Bob' && <h5>{x.user}</h5>} <small>{formatTime(x.time)}</small></div>
              {replyMsg && (
                <div className="reply">
                  {replyMsg.img ? (
                    <>
                    <div className='left'>
                      <h5>{replyMsg.user === 'Bob' ? 'You' : replyMsg.user}</h5>
                      <p>{replyMsg.message ? maxLength(replyMsg.message, 37) : <><FaRegImages/> Image</>}</p>
                    </div>
                    <img src={replyMsg.img} alt='reply msg img'/>
                    </>
                  ) : (
                    <>
                      <h5>{replyMsg.user === 'Bob' ? 'You' : replyMsg.user}</h5>
                      <p>{maxLength(replyMsg.message, 40)}</p>
                    </>
                  )}

                </div>
              )}
              {x.img != "" && <img src={`${x.img}`} 
                onClick={()=> {
                  if (!selectMode) {
                    setImgFocus(x.id)
                  }
                }}
                alt='xxxx'/>
              }
              {x.message != "" && <p>{x.message}</p>}
            </div>
          </div>
        );
      })}
      </div>
      <div className='actions'>
        <button><MdOutlinePermMedia/></button>
        <button><BsEmojiSmile/></button>
        <textarea
          value={text}
          onInput={handleInput}
          placeholder="Type something..."
        />
        <button><TiMicrophoneOutline/></button>
        {/* <button><AiOutlineSend/></button> */}
      </div>
    </div>
  )
}


