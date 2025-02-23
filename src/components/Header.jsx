'use client'
import React, { useState, useEffect, useContext, useRef } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { IoSearch, IoClose, IoGrid, IoChatbubbleEllipsesOutline, IoCartOutline, IoMenu } from "react-icons/io5";
import { FaCaretDown, FaUser, FaSearch } from "react-icons/fa";
import { MdNotificationsActive, MdOutlineExplore } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { RiUserCommunityLine } from "react-icons/ri";
import { RiColorFilterAiFill,  } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { LiaPagerSolid } from "react-icons/lia";
import { AllContext } from '@/app/Context';


export default function Header() {
  const [userMenu, setUserMenu] = useState(false)
  const {screenSize} = useContext(AllContext)
  const [phoneMenu, setPhoneMenu] = useState(false)
  const [phoneSearch, setPhoneSearch] = useState(false)

  const phoneMenuRef = useRef(null);
  const phoneSearchRef = useRef(null);
  const menuBtnRef = useRef(null);
  const searchBtnRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        phoneMenuRef.current && phoneMenuRef.current.contains(event.target)
      ) return;
  
      if (
        menuBtnRef.current && menuBtnRef.current.contains(event.target)
      ) return;

      setPhoneMenu(false);

      if (
        phoneSearchRef.current && phoneSearchRef.current.contains(event.target)
      ) return;
  
      if (
        searchBtnRef.current && searchBtnRef.current.contains(event.target)
      ) return;
  
      setPhoneSearch(false);  // Close search when clicking outside
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (screenSize !== 'small') return; // Stop if not a small screen

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setIsVisible(false); // Hide header when scrolling down
      } else {
        setIsVisible(true); // Show header when scrolling up
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, screenSize]);
  
  

  return (
    <header className={`${screenSize === 'small' && !isVisible && "hidden"}`}>
      <div className="logo">
        <Image src={'/logo.png'} width={80} height={80} alt={`logo`}/>
        {screenSize === 'small' &&
        <div className='icons'>
          <FaSearch 
            ref={searchBtnRef} 
            className={`search-btn ${phoneSearch ? 'active' : ''}`} 
            onClick={() => {
              setPhoneMenu(false);  // Close menu first
              setPhoneSearch(prev => !prev); // Then toggle search
            }}
          />
          <IoMenu
            ref={menuBtnRef}
            className={phoneMenu ? 'active' : ''}
            onClick={() => {
              setPhoneSearch(false);  // Close search menu first
              setPhoneMenu(prev => !prev); // Then toggle menu
            }}
          />
        </div>
        }
        <div ref={phoneSearchRef} className={`search-holder ${phoneSearch && 'active'}`}>
          <div className='theInput'>
            <IoSearch/>
            <input type="text" placeholder='Search anything...'/>
            <IoClose className='delete'/>
          </div>
          <div className="result">
            <ul>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
            </ul>
          </div>
        </div>
      </div>
      <nav ref={phoneMenuRef} className={phoneMenu && 'active'}>
        <Link href='/' className='active'><MdOutlineExplore/> <span>Explore</span></Link>
        <Link href='/chat'><IoChatbubbleEllipsesOutline/> <span>Chat</span></Link>
        <Link href='/pages'><LiaPagerSolid/> <span>Pages</span></Link>
        <Link href='/communities'><RiUserCommunityLine/> <span>Communities</span></Link>
        <Link href='/marketplace'><IoCartOutline/> <span>Market Place</span></Link>
      </nav>

      <div className="events">
        {screenSize === 'small' ? (
          <>
            <li className='use-case'>
              <IoGrid />
            </li>
            <li className='user' onClick={() => setUserMenu(prev => !prev)}>
              <Image src={'/avatar.png'} width={45} height={45} alt={`user Image`} />
              <IoClose className='x' /> <FaCaretDown className='angle' />
              <div className={`menu userMenu ${userMenu && 'active'}`}>
                <Link href={`/`}><FaUser style={{ fontSize: '22px' }} /> Mahmoud Elshazly</Link>
                <ul>
                  <button><IoMdSettings /> Setting & Privacy</button>
                  <button><BiSupport /> Help & Support</button>
                  <button><RiColorFilterAiFill /> Display & Accessibility</button>
                  <button className='logOut'><TbLogout2 /> Log Out</button>
                </ul>
              </div>
            </li>
            <li className='notifications'>
              <MdNotificationsActive />
              <span className="length">20</span>
            </li>
          </>
        ) : (
          <>
            <li className='use-case'>
              <IoGrid />
            </li>
            <li className='notifications'>
              <MdNotificationsActive />
              <span className="length">20</span>
            </li>
            <li className='user' onClick={() => setUserMenu(prev => !prev)}>
              <Image src={'/avatar.png'} width={45} height={45} alt={`user Image`} />
              <IoClose className='x' /> <FaCaretDown className='angle' />
              <div className={`menu userMenu ${userMenu && 'active'}`}>
                <Link href={`/`}><FaUser style={{ fontSize: '22px' }} /> Mahmoud Elshazly</Link>
                <ul>
                  <button><IoMdSettings /> Setting & Privacy</button>
                  <button><BiSupport /> Help & Support</button>
                  <button><RiColorFilterAiFill /> Display & Accessibility</button>
                  <button className='logOut'><TbLogout2 /> Log Out</button>
                </ul>
              </div>
            </li>
          </>
        )}
      </div>
    </header>
  )
}


