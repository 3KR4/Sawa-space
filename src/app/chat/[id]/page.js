'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from "next/image";
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import { maxLength } from '@/Methods';
import EmojiPicker from 'emoji-picker-react';
import PinHolder from '@/components/chat/PinHolder';


//Icons 
import { IoClose, IoSearch, IoCopy } from "react-icons/io5";
import { MdOutlinePermMedia, MdContentCopy } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { TiMicrophoneOutline } from "react-icons/ti";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { messages, users } from '@/Data';
import { FaStar, FaShare, FaRegStar } from "react-icons/fa";
import { FaRegImages, FaRegTrashCan, FaRegSquareCheck } from "react-icons/fa6";
import { GoPin } from "react-icons/go";
import { LuSaveAll } from "react-icons/lu";
import { HiReply } from "react-icons/hi";
import { PiDropSlashDuotone } from 'react-icons/pi';

export default function Chat() {
  const [text, setText] = useState("");
  const [imgFocus, setImgFocus] = useState();
  const [selectMode, setSelectMode] = useState(false);
  const [messageAction, setMessageAction] = useState(false);
  const [forwordAction, setForwordAction] = useState(false);
  const [emojiHolder, setEmojiHolder] = useState(false);

  const [selectedMsgs, setSelectedMsgs] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersNames, setSelectedUsersNames] = useState([]);
  
  const [currentActionMsg, setCurrentActionMsg] = useState({});
  const [pinedMsgs, setPinedMsgs] = useState([]);
  
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const [forwordSearch, setForwordSearch] = useState('');

  const chatRef = useRef(null);
  const menuRef = useRef(null);
  const emojiRef = useRef(null);
  const forwordMenuRef = useRef(null);

  const curentSearchUser = forwordSearch
  ? users.filter(user => user.name.toLowerCase().includes(forwordSearch.toLowerCase()))
  : users;

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "46px";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(textarea.value);
  };

const handleMessageActions = (event, type, msg) => {
  event.preventDefault(); // Prevent default right-click behavior

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const cursorY = event.clientY;
  const cursorX = event.clientX;

  const menuHeight = type == 'forword' ? 570 : 378; // Adjust based on your menu size
  const menuWidth = type == 'forword' ? 340 : 255;

  // Check if there is enough space below the cursor for the menu
  const top = cursorY + menuHeight > windowHeight ? Math.max(cursorY - menuHeight, 50) : cursorY;
  const left = cursorX + menuWidth > windowWidth ? Math.max(cursorX - menuWidth, 10) : cursorX;
  

  if (type == 'forword') {
    msg && setSelectedMsgs([msg.id]);
    setMessageAction(false);
    setForwordAction(true)
  } else {
    setMessageAction(true);
    setCurrentActionMsg(msg)
  }

  setMenuPosition({ top, left });
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMessageAction(false); 
    }
    if (emojiRef.current && !emojiRef.current.contains(event.target)) {
      setEmojiHolder(false); 
    }
    if (forwordMenuRef.current && !forwordMenuRef.current.contains(event.target)) {
      setForwordAction(false); 
      setSelectedUsers([])
      setSelectedUsersNames([])
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  const currentfocusdMsg = messages.find((msg) => msg.id === imgFocus);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = (hours % 12) || 12;  // Convert to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    return `${formattedHours}:${minutes} ${period}`;
  };

  useEffect(() => {
    const filteredMsgs = messages.filter(msg => msg.pin);
    setPinedMsgs(filteredMsgs);
}, [messages]);
  
  return (

    <div className={`pirsonChat ${selectMode && 'selectMode'}`}>
      <div ref={emojiRef} className={`emoji-holder ${emojiHolder && 'active'}`}>
        <EmojiPicker onEmojiClick={() => {}} theme={'light'} emojiStyle={'facebook'} previewConfig={{showPreview: false}} width={400}/> 
      </div>
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
              <button onClick={(e) => handleMessageActions(e, 'forword' )}><FaShare/> {selectedMsgs.length > 0 && <small>{selectedMsgs.length}</small>}</button>
              <button onClick={() => {setSelectMode(false); setSelectedMsgs([])}}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setSelectMode(true)}><BiDotsHorizontalRounded style={{fontSize: '23px'}}/></button>
          )}
        </div>
        {pinedMsgs.length > 0 && <PinHolder data={pinedMsgs} />}
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

      <div className='messages' ref={chatRef} style={{overflow: messageAction || forwordAction ? 'hidden' : 'auto', paddingRight: messageAction || forwordAction ? '6px' : '0px'}}>

        <div ref={menuRef} className={`messageAction sideMenu ${messageAction && 'active'}`} style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px`}}>
          <div className='emojes'></div>
          <button><HiReply/> Reply</button>
          {currentActionMsg?.message && <button><MdContentCopy/> Copy</button>}
          {currentActionMsg?.img && <button><LuSaveAll/> Save as..</button>}
          <hr/>
          <button onClick={(e) => handleMessageActions(e, 'forword', currentActionMsg)}><HiReply/> Forward</button>
          <button><FaRegStar/> Star</button>
          <button><GoPin/> Pin</button>
          <button onClick={() => {setSelectedMsgs([currentActionMsg.id]); setSelectMode(true); setMessageAction(false)}}><FaRegSquareCheck/> Select</button>
          <hr/>
          <button className='danger'><FaRegTrashCan/> Delete for me</button>
        </div>

        <div ref={forwordMenuRef} className={`forwordMenu sideMenu ${forwordAction && 'active'}`} style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px`}}>
          <h1>Forward to...</h1>
          <div className="search-chosen">
            {selectedUsersNames.length > 0 && (
              <ul className='result'>
                {selectedUsersNames.map(x => <li key={x}>{x}</li>)}
              </ul>
            )}
            <input placeholder='Search by name' value={forwordSearch} onChange={(e) => setForwordSearch(e.target.value)}/>
          </div>
          {selectedUsersNames.length > 0 && <button className='mainbtn'>Forword</button>}
          <div className='holder'>
            {
              curentSearchUser?.map((x) => (
                <div key={x.id} className="chat" onClick={() => {
                    setSelectedUsers(prev =>
                      prev.includes(x.id)
                        ? prev.filter(id => id !== x.id)
                        : [...prev, x.id]
                    )
                    setSelectedUsersNames(prev =>
                      prev.includes(x.name)
                        ? prev.filter(name => name !== x.name)
                        : [...prev, x.name]
                    )
                }}>
                  <Image src={x.img} width={40} height={40} alt={`user Image`}/>
                  <div className="name-lastmessage">
                    <h4>{x.name}</h4>
                    <p>{maxLength(x.isGroup ? x.groupMembers.slice(0,5) : x.bio, 25)}</p>
                  </div>
                  <label>
                    <input type="checkbox" className="input" checked={selectedUsers.includes(x.id) ? true : false} onChange={()=> console.log('x')}/>
                    <span className="custom-checkbox"></span>
                  </label>
                </div>
              ))
            }
          </div>
        </div>

          {messages.map((x) => {
            const replyMsg = x.replyId ? messages.find((msg) => msg.id === x.replyId) : null;
            return (
              <div key={x.id} id={`message-${x.id}`} className={`msg ${x.user === 'Bob' ? 'me' : ''} ${selectedMsgs.includes(x.id) && 'selected'}`}
                onClick={() => {
                  if (selectMode) {
                    setSelectedMsgs(prev => 
                      prev.includes(x.id)
                        ? prev.filter(id => id !== x.id)
                        : [...prev, x.id]
                    )}
                }}>

                {selectMode && (
                  <label>
                    <input type="checkbox" className="input" checked={selectedMsgs.includes(x.id) ? true : false} onChange={()=> console.log('x')}/>
                    <span className="custom-checkbox"></span>
                  </label>
                )}

                
                <div className={'body'} onContextMenu={(e) => !selectMode && handleMessageActions(e, 'actions', x )}>
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
        <button onClick={()=> setEmojiHolder(prev => !prev)}><BsEmojiSmile/></button>
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


