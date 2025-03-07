'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image";
import Link from 'next/link';
import {maxLength} from '../Methods'
import {users} from '@/Data';

import { FaUnlink, FaUsers, FaEyeSlash, FaRegHeart, FaUserFriends, FaImage  } from "react-icons/fa";
import { MdMarkUnreadChatAlt, MdFavorite, MdBlockFlipped, MdOutlinePushPin } from "react-icons/md";
import { IoSearch, IoClose, IoImageOutline  } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { TbLogout2, TbArchiveOff } from "react-icons/tb";
import { PiStickerDuotone } from "react-icons/pi";

export default function Chats() {

  const [hasChatInUrl, setHasChatInUrl] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.href.includes('chat')) {
      setHasChatInUrl(true);
    }
  }, []);

  const [hideChats, setHideChats] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [curentUserId, setCurentUserId] = useState()

  const [menuPosition, setMenuPosition] = useState(0);

  const actionMenu = useRef(null);

  useEffect(() => {
    const path = window.location.pathname; // Example: "/chat/1"
    const extractedId = path.split('/').pop(); // Extracts "1"
    setCurentUserId(extractedId);
  }, []);


  const handleMessageActions = (event) => {
    event.preventDefault(); 
    const windowHeight = window.innerHeight;
    const cursorY = event.clientY;

    const menuHeight = 270;
    const top = cursorY + menuHeight > windowHeight ? Math.max(cursorY - menuHeight, 10) : cursorY;
    setUserMenu(true)
    setMenuPosition(top - 10);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenu.current && !actionMenu.current.contains(event.target)) {
        setUserMenu(false); 
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`chats ${hideChats && !hasChatInUrl ? 'hide': 'active'}`}>
      {!hasChatInUrl && (
        <div className="open-close" onClick={()=> {
          setHideChats(prev => !prev)
        }}>
          <FaAngleLeft/>
        </div>
      )}
      <div className="top">
        <h4>Friends</h4>
        <FaUserFriends className='chatico'/>
        <div className="search-holder">
          <IoSearch/>
          <input type="text" placeholder='Search Here...'/>
          <IoClose className='delete'/>
        </div>
      </div>
        <hr />
        <ul className="filters">
          <li className='active'><MdMarkUnreadChatAlt/> AllChat</li>
          <li><FaUsers/> groups</li>
          <li><MdFavorite/> favorites</li>
          <li><FaEyeSlash/> unread</li>
          <li><FaUnlink/> drafts</li>
        </ul>
        <div ref={actionMenu} className={`menu userMenu ${userMenu && 'active'}`} style={{ top: `${menuPosition}px`}}>
          <div className='top'>Actions</div>
          <ul>
            <li><MdOutlinePushPin/> pin to top</li>
            <li><FaRegHeart style={{fontSize: '16px'}}/> add to favorite</li>
            <li className='logOut'><TbArchiveOff/> archive chat</li>
            <li className='danger'><MdBlockFlipped/> block</li>
            <li className='danger'><TbLogout2/> Exit Group</li>
          </ul>
        </div>
        <div className="holder">
          {users?.map((x) => (
            <Link key={x.id} href={`/chat/${x.id}`} className={`chat ${curentUserId == x.id && 'active'}`} onClick={() => setCurentUserId(x.id)} onContextMenu={(e) => {
              handleMessageActions(e)
              setCurentUserId(x.id)
            }}>
              <Image className={`${x.newStatus && 'status'}`} src={x.img} width={45} height={45} alt={`user Image`}/>
              <div className="name-lastmessage">
                <h4>{x.name}</h4>
                <p>
                  {x.lastMessage.type == 'img' ? <><IoImageOutline/> Image</> : x.lastMessage.type == 'sticker' ? <><PiStickerDuotone/> sticker</> : maxLength(x.lastMessage.content, 25)}
                </p>
              </div>
              <div className="details">
                <span>{x.lastMsgTime}</span>
                {x.unReadCounter > 0 && <span className='count'>{x.unReadCounter}</span>}
              </div>
            </Link>
            ))}
        </div>
    </div>
  )
}

