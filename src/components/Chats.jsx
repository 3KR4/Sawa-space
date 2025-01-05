'use client'
import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import {maxLength} from '../Methods'

import { FaUnlink, FaUsers, FaEyeSlash, FaRegHeart, FaUserFriends  } from "react-icons/fa";
import { MdMarkUnreadChatAlt, MdFavorite, MdBlockFlipped, MdOutlinePushPin } from "react-icons/md";
import { IoSearch, IoClose } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { TbLogout2, TbArchiveOff } from "react-icons/tb";
import { RiColorFilterAiFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";


export default function Chats() {
  const [hideChats, setHideChats] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  return (
    <div className={`chats ${hideChats && 'hide'}`}>
      <div className="open-close" onClick={()=> {
        setHideChats(prev => !prev)
      }}>
        <FaAngleLeft/>
      </div>
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
        <div className={`menu userMenu ${userMenu && 'active'}`}>
          <div className='top'>Actions  <IoClose onClick={()=> setUserMenu(false)}/></div>
          <ul>
            <li><MdOutlinePushPin/> pin to top</li>
            <li><FaRegHeart style={{fontSize: '16px'}}/> add to favorite</li>
            <li className='logOut'><TbArchiveOff/> archive chat</li>
            <li className='danger'><MdBlockFlipped/> block</li>
            <li className='danger'><TbLogout2/> Exit Group</li>
          </ul>
        </div>
        <div className="holder">
          <Link href={`/chat/5`} className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </Link>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
          <div className="chat" onContextMenu={(e) => {
            e.preventDefault();
            setUserMenu(true);
            console.log('xxxxxx');
          }}>
            <Image src={'/avatar.png'} width={45} height={45}/>
            <div className="name-lastmessage">
              <h4>Scraket</h4>
              <p>{maxLength('A lot of bad reviews on it', 25)}</p>
            </div>
            <div className="details">
              <span>5:34 PM</span>
              <span className='count'>10</span>
            </div>
          </div>
        </div>
    </div>
  )
}