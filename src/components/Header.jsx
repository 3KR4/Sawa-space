'use client'
import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { IoSearch, IoClose, IoGrid } from "react-icons/io5";
import { FaCaretDown, FaUser } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { RiColorFilterAiFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

export default function Header() {
  const [userMenu, setUserMenu] = useState(false)
  return (
    <header>
      <div className="logo">
          <Image src={'/logo.png'} width={80} height={80} alt={`logo`}/>
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
        <Link href='/' className='active'>Explore</Link>
        <Link href='/'>Pages</Link>
        <Link href='/'>Communities</Link>
        <Link href='/'>Market Place</Link>
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


