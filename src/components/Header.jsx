'use client'
import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { IoSearch, IoClose, IoGrid, IoChatbubbleEllipsesOutline, IoCartOutline } from "react-icons/io5";
import { FaCaretDown, FaUser, FaSearch } from "react-icons/fa";
import { MdNotificationsActive, MdOutlineExplore } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { RiUserCommunityLine } from "react-icons/ri";
import { RiColorFilterAiFill,  } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { LiaPagerSolid } from "react-icons/lia";

export default function Header() {
  const [userMenu, setUserMenu] = useState(false)
  return (
    <header>
      <div className="logo">
        <Image src={'/logo.png'} width={80} height={80} alt={`logo`}/>
        <FaSearch className='search-btn'/>
        <div className="search-holder">
          <IoSearch/>
          <input type="text" placeholder='Search anything...'/>
          <IoClose className='delete'/>
          <div className="result">
            <ul>
              <li>wwwwwwwwwww</li>
            </ul>
          </div>
        </div>
      </div>
      <nav>
        <Link href='/' className='active'><MdOutlineExplore/> <span>Explore</span></Link>
        <Link href='/chat'><IoChatbubbleEllipsesOutline/> <span>Chat</span></Link>
        <Link href='/pages'><LiaPagerSolid/> <span>Pages</span></Link>
        <Link href='/communities'><RiUserCommunityLine/> <span>Communities</span></Link>
        <Link href='/marketplace'><IoCartOutline/> <span>Market Place</span></Link>
      </nav>
      <div className="events">
        <li className='use-case'>
          <IoGrid/>
        </li>
        <li className='notifications'>
          <MdNotificationsActive />
          <span className="length">20</span>
        </li>
        <li className='user' onClick={()=> setUserMenu(prev => !prev)}>
          <Image src={'/avatar.png'} width={45} height={45} alt={`user Image`}/>
          <IoClose className='x'/> <FaCaretDown className='angle'/>
          <div className={`menu userMenu ${userMenu && 'active'}`}>
            <Link href={`/`}><FaUser style={{fontSize: '22px'}}/> Mahmoud Elshazly</Link>
            <ul>
              <button><IoMdSettings/> Setting & Privacy</button>
              <button><BiSupport/> Help & Support</button>
              <button><RiColorFilterAiFill/> Display & Accessibilty</button>
              <button className='logOut'><TbLogout2/> Log Out</button>
            </ul>
          </div>
        </li>

      </div>
    </header>
  )
}


