'use client'
import React, { useState, useEffect, useContext, useRef } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { AllContext } from '@/app/Context';
import { posts } from '@/Data';

import { IoLink } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineAddReaction } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";


export default function Home() {

  const [postMenu, setPostMenu] = useState()
  const [curentUserId, setCurentUserId] = useState()
  const [menuPosition, setMenuPosition] = useState(0);

  const handleMessageActions = (event) => {
    event.preventDefault(); 
    const windowHeight = window.innerHeight;
    const cursorY = event.clientY;

    const menuHeight = 270;
    const top = cursorY + menuHeight > windowHeight ? Math.max(cursorY - menuHeight, 10) : cursorY;
    setPostMenu(true)
    setMenuPosition(top - 10);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenu.current && !actionMenu.current.contains(event.target)) {
        setPostMenu(false); 
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className='posts-holder'>
        {posts.map((x) => {

          return (
            <div className={`post`}>
              {false ?
              (
                <>
                  <div className='top'>
                    <div className='left'>
                      <Image src={x.user.img || '/users/default.png'} alt={x.user.name} width={40} height={40}/>
                      <div className='info'>
                        <h5>{x.user.name}</h5>
                        <span>July 19 2018, 19:42pm</span>
                      </div>
                    </div>
                    <HiDotsVertical onClick={(e) => {
                      handleMessageActions(e)
                      setCurentUserId(x.id)
                    }}/>
                  </div>
                  <div className='middle'>
                    {x.link && <Link href={x.link}>{x.link}</Link>}

                    {x.paragraph && <p>{x.paragraph}</p>}

                    {x.img && Array.isArray(x.img) && x.img.length > 0 ? (
                      x.img.length === 1 ? (
                        <div className='image'>
                          <Image src={x.img[0]} alt="Post Image" fill />
                        </div>
                      ) : (
                        <div className={`images ${x.img.length >= 4 ? 'big' : x.img.length === 3 ? 'mid' : 'small'}`}>
                          {x.img.map((img, index) => (
                            <Image key={index} src={img} alt={`Post Image ${index + 1}`} fill />
                          ))}
                        </div>
                      )
                    ) : null}
                  </div>
                  <div className='bottom'>
                    <div className='left'>
                      {x.reacts.topUseage.map(x => <p>{x}</p>)}
                      <p>{x.reacts.count}</p>
                    </div>
                    <div className='actions'>
                      <MdOutlineAddReaction/>
                      <FaRegComment/>
                      <IoLink/>
                      <PiShareFat/>
                    </div>
                    <div className='right'>
                      <div>
                        <PiShareFat/>
                        {x.shareCount}
                      </div>
                      <div>
                        <FaRegComment/>
                        {x.comments.count}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className='comments'>
                  <div className='top'>
                    <h3>Comments ({x.comments.count})</h3>
                    <IoIosClose/>
                  </div>
                  <div className='holder'>
                    {x.comments.allComments.length > 0 ? (
                      x.comments.allComments.map((comment, index) => (
                        <div key={index} className='comment'> 
                          <Image src={comment.image} alt="Comment Image" width={50} height={50} />
                          <div className='content'>
                            <div className='top'>
                              <div className='right'>
                                <h5></h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='noCommentsYet'> 
                        <FaRegComments />
                        <h4>Nothing in here yet</h4> 
                        <p>Be the first to post a comment.</p>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )
        })}
      </div>
    </>
  );
}
