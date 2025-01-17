'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { maxLength } from '@/Methods';
import EmojiPicker from 'emoji-picker-react';
import PinHolder from '@/components/chat/PinHolder';
import { messages, users } from '@/Data';

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

//Icons 
import { IoClose, IoCopy } from "react-icons/io5";
import { MdOutlinePermMedia, MdContentCopy, MdOutlineAddReaction } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { TiMicrophoneOutline } from "react-icons/ti";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaStar, FaShare, FaRegStar, FaAngleDown, FaRegUserCircle } from "react-icons/fa";
import { FaRegImages, FaRegTrashCan, FaRegSquareCheck, FaPlus, FaUserGroup } from "react-icons/fa6";
import { GoPin } from "react-icons/go";
import { LuSaveAll, LuFileSliders } from "react-icons/lu";
import { HiReply } from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";
import { RiLinksLine } from "react-icons/ri";


export default function Chat({ params }) {
  const [text, setText] = useState("");
  const [imgFocus, setImgFocus] = useState();
  const [selectMode, setSelectMode] = useState(false);
  const [messageAction, setMessageAction] = useState(false);
  const [forwordAction, setForwordAction] = useState(false);
  const [reactsAction, setReactsAction] = useState(false);
  const [emojiHolder, setEmojiHolder] = useState(false);
  const [mentionHolder, setMentionHolder] = useState(false);
  const [isAddReact, setIsAddReact] = useState(false);
  const [overViewMenu, setOverViewMenu] = useState(false);
  const [selectedOverView, setSelectedOverView] = useState('Overview');
  const [replyingOnMsg, setReplyingOnMsg] = useState();

  const [filteredMentinUser, setFilteredMentinUser] = useState([]);

  const [selectedMsgs, setSelectedMsgs] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersNames, setSelectedUsersNames] = useState([]);
  const [mentionsPeople, setMentionsPeople] = useState([]);
  
  const [currentActionMsg, setCurrentActionMsg] = useState({});
  const [pinedMsgs, setPinedMsgs] = useState([]);
  
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const [forwordSearch, setForwordSearch] = useState('');

  const [swiperRef, setSwiperRef] = useState(null);

  const handleImageClick = (id, index) => {
    setImgFocus(id)
    swiperRef.slideTo(index, 500);
  };

  const chatRef = useRef(null);
  const menuRef = useRef(null);
  const emojiRef = useRef(null);
  const textarea = useRef(null);
  const forwordMenuRef = useRef(null);
  const reactsMenuRef = useRef(null);
  const mentionRef = useRef(null);
  const overviewRef = useRef(null);
  const closeImgHolderRef = useRef(null);

  const curentSearchUser = forwordSearch
  ? users.filter(user => user.name.toLowerCase().includes(forwordSearch.toLowerCase()))
  : users;

  const currentfocusdMsg = messages.find((msg) => msg.id === imgFocus);

  const mediaMsgs = (selectedOverView === 'Media' || imgFocus) && messages.filter((msg) => msg.img !== '');

  const currentReplyMsg = replyingOnMsg ? messages.find((msg) => msg.id === replyingOnMsg) : null;

  const currentUserReacts = currentActionMsg ? messages.find((msg) => msg.id === currentActionMsg) : null;
  const msgsEmojis = currentUserReacts?.emojis

  const handlePinClick = (id) => {
    const element = document.getElementById(`message-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "43px"; 
    textarea.style.height = `${textarea.value === '' ? '42px' : textarea.scrollHeight + 4}px`;
    setText(textarea.value);

    // Detect mentions in the text
    const caretPosition = textarea.selectionStart;
    const textBeforeCaret = textarea.value.slice(0, caretPosition);
    const mentionMatch = textBeforeCaret.match(/@(\w*)$/);

    // Show mention suggestions if typing @
    if (mentionMatch) {
        setMentionHolder(true);
        const searchTerm = mentionMatch[1].toLowerCase();
        setFilteredMentinUser(
            users.filter(user => user.name.toLowerCase().startsWith(searchTerm))
        );
    } else {
        setMentionHolder(false);
    }

    // ✅ Keep mentionsPeople array in sync with text content
    const mentionedNames = [...textarea.value.matchAll(/@(\w+)/g)].map(match => match[1]);
    setMentionsPeople((prev) =>
        prev.filter((user) => mentionedNames.includes(user.name))
    );
};


const handleUserClick = (user) => {
  const textareaa = textarea?.current;
  const caretPosition = textareaa.selectionStart;
  const textBeforeCaret = text.slice(0, caretPosition);
  const textAfterCaret = text.slice(caretPosition);

  // Replace @mention only if the user had typed @
  const newText = /@\w*$/.test(textBeforeCaret) 
      ? textBeforeCaret.replace(/@\w*$/, `@${user.name}`) + textAfterCaret
      : `${textBeforeCaret} @${user.name} ${textAfterCaret}`;

  setText(newText.trim() + ' ');

  setMentionsPeople((prev) => {
    if (!prev.some(mentioned => mentioned.id === user.id)) {
      return [...prev, user];
    }
    return prev; // If user already exists, return the same array without adding
  });
  
  // Keep the mention menu open and focus on textarea
  setTimeout(() => {
    textareaa.focus();
    textareaa.setSelectionRange(newText.length + 1, newText.length + 1);
  }, 0);
};

// Filter out already mentioned users
const filteredUsers = filteredMentinUser.filter(
  (user) => !mentionsPeople.some(mentioned => mentioned.id === user.id)
);

const handleMessageActions = (event, type, msg) => {
  event.preventDefault();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const cursorY = event.clientY;
  const cursorX = event.clientX;

  const menuWidth = type == 'forword' ? 340 : type == 'emojis' ? 280 : type == 'addReact' ? 400 : 255;
  const menuHeight = type === 'forword' ? 570 : type === 'emojis' ? (reactsMenuRef.current?.offsetHeight > 297 ? reactsMenuRef.current.offsetHeight : 300) : type == 'addReact' ? 450 : 378;
  const top = cursorY + menuHeight > windowHeight ? Math.max(cursorY - menuHeight, 50) : cursorY;
  const left = cursorX + menuWidth > windowWidth ? Math.max(cursorX - menuWidth, 10) : cursorX;
  
  if (type == 'forword') {
    msg && setSelectedMsgs([msg.id]);
    setMessageAction(false);
    setForwordAction(true)
  } else if (type == 'emojis') {
    setReactsAction(true);
    setCurrentActionMsg(msg)
  } else if (type == 'addReact') {
    setMessageAction(false);
    setEmojiHolder(true)
    setIsAddReact(true)
  } else {
    setMessageAction(true);
    setCurrentActionMsg(msg)
  }
  setMenuPosition({ top, left });
};

//! handleClickOutside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMessageAction(false); 
      }
      if (reactsMenuRef.current && !reactsMenuRef.current.contains(event.target)) {
        setReactsAction(false); 
      }
      if (mentionRef.current && !mentionRef.current.contains(event.target)) {
        setMentionHolder(false); 
      }
      if (
        !((overviewRef.current && overviewRef.current.contains(event.target)) || 
          (closeImgHolderRef.current && closeImgHolderRef.current.contains(event.target))
        )) {
          setOverViewMenu(false); 
      }
      if (
        !((emojiRef.current && emojiRef.current.contains(event.target)) || 
          (textarea.current && textarea.current.contains(event.target))
        )) {
        setEmojiHolder(false);
        setIsAddReact(false)
      }
      if (forwordMenuRef.current && !forwordMenuRef.current.contains(event.target)) {
        setForwordAction(false); 
        setSelectedUsers([]) 
        setSelectedUsersNames([]) 
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, []); 

  const formatTime = (time) => {
    if (typeof window !== 'undefined') {
      const [hours, minutes] = time.split(":");
      const formattedHours = (hours % 12) || 12;  // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${formattedHours}:${minutes} ${period}`;
    }
    return time; // return raw time during SSR
  };

  //! setPinedMsgs 
  useEffect(() => {
    const filteredMsgs = messages.filter(msg => msg.pin);
    setPinedMsgs(filteredMsgs);
}, [messages]);
  
const handleEmojiClick = (event) => {
  console.log(event);
  const emoji = String.fromCodePoint(
    ...event.unified.split('-').map((code) => parseInt(code, 16))
  );

  const { selectionStart, selectionEnd } = textarea.current;
  const currentValue = textarea.current.value;
  const newText = 
    currentValue.slice(0, selectionStart) + 
    emoji + 
    currentValue.slice(selectionEnd);
  setText(newText);

  setTimeout(() => {
    textarea.current.focus();
    textarea.current.selectionStart = textarea.current.selectionEnd = selectionStart + emoji.length;
  }, 0);
};

  return (
    <div className={`pirsonChat ${selectMode && 'selectMode'}`}>
        <>
          <Image src={'/Screenshot 2025-01-03 040444.png'} alt={`Screenshot`} fill/>
          <div className='top'>
            <div className='user' onClick={()=> setOverViewMenu(true)}>
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
            {overViewMenu && (
            <div ref={overviewRef} className={`overViewMenu sideMenu ${overViewMenu && 'active'}`}>
              <ul className='left'>
                <li className={`${selectedOverView === `Overview` && 'active'}`} onClick={()=> setSelectedOverView('Overview')}><FaRegUserCircle/> Overview</li>
                <li className={`${selectedOverView === `Media` && 'active'}`} onClick={()=> setSelectedOverView('Media')}><MdOutlinePermMedia/> Media</li>
                <li className={`${selectedOverView === `Files` && 'active'}`} onClick={()=> setSelectedOverView('Files')}><LuFileSliders/> Files</li>
                <li className={`${selectedOverView === `Links` && 'active'}`} onClick={()=> setSelectedOverView('Links')}><RiLinksLine/> Links</li>
                <li className={`${selectedOverView === `Groups` && 'active'}`} onClick={()=> setSelectedOverView('Groups')}><FaUserGroup/> Groups</li>
              </ul>
              <div className='right'>
                <h1>{selectedOverView}</h1>

                  {selectedOverView === `Overview` ? 
                  (<div className='overview'>
                    <div className='center'>
                      <Image src={'/avatar.png'} width={45} height={45} alt={`user Image`}/>
                      <h4>{users[0].name}</h4>
                      <p>{users[0].bio}</p>
                    </div>

                    <label>Phone Number</label>
                    <p>{users[0].number}</p>

                    <div className='btn-holder'>
                      <button>archive chat</button>
                      <div className='row'>
                        <button>Remove Friend</button>
                        <button>Block</button>
                      </div>
                    </div>
                  </div>
                  ) : selectedOverView === `Media` ?  (
                    <div className='media'>
                      {mediaMsgs.length > 1 ? (
                          mediaMsgs.map(x => (
                              <div 
                                  className={`msg ${selectedMsgs.includes(x.id) ? 'selected' : ''}`} 
                                  key={x.id} 
                                  onClick={() => {
                                      if (selectMode) {
                                          setSelectedMsgs(prev => 
                                              prev.includes(x.id)
                                                  ? prev.filter(id => id !== x.id)
                                                  : [...prev, x.id]
                                          );
                                      }
                                  }}
                              >
                                  <img 
                                      src={`${x.img}`} 
                                      onClick={() => {
                                          if (!selectMode) {
                                              setImgFocus(x.id);
                                          }
                                      }} 
                                      alt='xxxx'
                                  />
                                  <label className={`${selectMode && 'active'}`}>
                                      <input 
                                          type="checkbox" 
                                          className="input" 
                                          checked={selectedMsgs.includes(x.id)} 
                                          onChange={() => {
                                            setSelectMode(true);
                                            setSelectedMsgs(prev => {
                                              const updatedMsgs = prev.includes(x.id)
                                                ? prev.filter(id => id !== x.id) 
                                                : [...prev, x.id];
                                              if (updatedMsgs.length === 0) {
                                                setSelectMode(false);  // Turn off select mode if no items remain
                                              }
                                              return updatedMsgs;
                                            });
                                        }}
                                      />
                                      <span className="custom-checkbox"></span>
                                  </label>
                              </div>
                          ))
                      ) : (
                          <div>No {selectedOverView} to display</div>
                      )}
                  </div>
                ): (<div></div>)}

                  {/* No {selectedOverView} to display */}
              </div>
            </div>
          )}
            {pinedMsgs.length > 0 && <PinHolder data={pinedMsgs} />}
          </div>

          {imgFocus && (
            <div ref={closeImgHolderRef} className={`focusedMsg ${imgFocus && 'active'}`}>
              <div className='hold'>
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
              {mediaMsgs.length > 1 && (
                <Swiper
                onSwiper={setSwiperRef}
                spaceBetween={5}
                slidesPerView={'auto'}
                centeredSlides={true}
                loop={false}
              >
                {mediaMsgs.map((x, index) => (
                  <SwiperSlide 
                      key={index}
                      onClick={() => handleImageClick(x.id ,index)}
                      style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <img 
                        src={x.img} 
                        alt={`Slide ${index}`}
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}
                    />
                </SwiperSlide>
                ))}
              </Swiper> 
              )}

            </div>
          )}

          <div className='messages' ref={chatRef} style={{overflow: messageAction || forwordAction || reactsAction || isAddReact ? 'hidden' : 'auto', paddingRight: messageAction || forwordAction || reactsAction || isAddReact ? '6px' : '0px'}}>

            {messageAction && (
              <div ref={menuRef} className={`messageAction sideMenu ${messageAction && 'active'}`} style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px`}}>
                <div className='emojes'>
                  <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f44d.png"/>
                  <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/2764-fe0f.png"/>
                  <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f602.png"/>
                  <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f62e.png"/>
                  <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f625.png"/>
                  <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f64f.png"/>
                  <FaPlus onClick={(e) => !selectMode && handleMessageActions(e, 'addReact', currentActionMsg)}/>
                </div>
                <hr/>
                <button onClick={() => {setReplyingOnMsg(currentActionMsg.id); setMessageAction(false)}}><HiReply/> Reply</button>
                {currentActionMsg?.message && <button><MdContentCopy/> Copy</button>}
                {currentActionMsg?.img && <button><LuSaveAll/> Save as..</button>}
                <hr/>
                <button onClick={(e) => handleMessageActions(e, 'forword', currentActionMsg)}><HiReply style={{ transform: 'rotateY(180deg)'}}/> Forward</button>
                <button><FaRegStar/> Star</button>
                <button><GoPin/> Pin</button>
                <button onClick={() => {setSelectedMsgs([currentActionMsg.id]); setSelectMode(true); setMessageAction(false)}}><FaRegSquareCheck/> Select</button>
                <hr/>
                <button className='danger'><FaRegTrashCan/> Delete for me</button>
              </div>
            )}
            {forwordAction && (
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
            )}
            {reactsAction && (
              <div ref={reactsMenuRef} className={`reactsMenu MenuOfUsers sideMenu ${reactsAction && 'active'}`} style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px`}}>
                <h1>All Emojis</h1>
                <div className='holder'>
                  {
                    msgsEmojis?.map((x) => (
                      <div key={x.id} className="user">
                        <div className="info">
                          <Image src={x.user.img} width={40} height={40} alt={`user Image`}/>
                          <h4>{x.user.name}</h4>
                        </div>
                        <span>{x.emoji}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

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
                        <div className="reply" onClick={()=> handlePinClick(replyMsg.id)}>
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

                      {x.emojis?.length > 0 && (
                        <div className='reacts' onClick={(e) => !selectMode && handleMessageActions(e, 'emojis', x.id)}>
                            {(() => {
                                const uniqueEmojis = [...new Map(x.emojis.map(emoji => [emoji.emoji, emoji])).values()];
                                const displayedEmojis = uniqueEmojis.slice(0, 5);
                                const remainingCount = x.emojis.length - displayedEmojis.length;

                                return (
                                    <>
                                        {displayedEmojis.map((emoji, index) => (
                                            <span key={index}>{emoji.emoji}</span>
                                        ))}

                                        {/* Only show the counter if there are hidden emojis */}
                                        {remainingCount > 0 && (
                                            <span className='counter'>+{remainingCount}</span>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    )}

                    <div className='interact'>
                      <div className='holder' onClick={(e) => !selectMode && handleMessageActions(e, 'actions', x )}>
                        <MdOutlineAddReaction/>
                        <FaAngleDown/>
                      </div>
                    </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className='actions'>
            <div ref={emojiRef} className={`emoji-holder ${emojiHolder && 'active'}`} style={{ position: !isAddReact ? 'absolute' : `fixed`, top: !isAddReact ? 'unset' : `${menuPosition.top}px`, left: !isAddReact ? '15px' : `${menuPosition.left}px`, bottom: !isAddReact ? 'calc(100% + -4px)' : `unset`}}>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme="light"
                emojiStyle="facebook"
                previewConfig={{ showPreview: false }}
                width={400}
              />
            </div>
            <button><MdOutlinePermMedia/></button>
            <button onClick={()=> {setEmojiHolder(true); textarea.current.focus()}}><BsEmojiSmile/></button>
            <div className='big-holder'>
              {mentionHolder && (
                  <div ref={mentionRef} className={`mentionMenu MenuOfUsers sideMenu active`}>

                        {filteredUsers.length > 0 && (
                          <>
                            <h1>Mentions</h1>
                            <div className='holder'>
                              {
                                filteredUsers.map((x) => (
                                  <div key={x.id} className="user" onClick={() => handleUserClick(x)}>
                                    <Image src={x.img} width={40} height={40} alt={`user Image`} />
                                    <div className="info">
                                      <h4>{x.name}</h4>
                                      <span>{x.bio}</span>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </>
                        )}
                        {(filteredUsers.length > 0 && mentionsPeople.length > 0 ) && <hr style={{marginTop: '7px'}}/>}
                      {mentionsPeople.length > 0 && (
                        <>
                          <h1>Selected Users</h1>
                          <div className='holder-wrap'>
                            {mentionsPeople.map((x) => (
                              <div key={x.id} className="user" onClick={() => handleUserClick(x)}>
                                {x.name}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                  </div>
                )}
              {currentReplyMsg && (
                <div className="reply" >
                  <IoClose className='close' onClick={()=> setReplyingOnMsg(null)}/>
                  {currentReplyMsg.img ? (
                    <div onClick={()=> handlePinClick(currentReplyMsg.id)}>
                    <div className='left'>
                      <h5>{currentReplyMsg.user === 'Bob' ? 'You' : currentReplyMsg.user}</h5>
                      <p>{currentReplyMsg.message ? maxLength(currentReplyMsg.message, 37) : <><FaRegImages/> Image</>}</p>
                    </div>
                    <img src={currentReplyMsg.img} alt='reply msg img'/>
                    </div>
                  ) : (
                    <div onClick={()=> handlePinClick(currentReplyMsg.id)}>
                      <h5>{currentReplyMsg.user === 'Bob' ? 'You' : currentReplyMsg.user}</h5>
                      <p>{maxLength(currentReplyMsg.message, 40)}</p>
                    </div>
                  )}
                </div>
              )} 
              <textarea
                ref={textarea}
                value={text}
                onInput={handleInput}
                placeholder="Type a message..."
              />
            </div>

            {text ? 
              <button><AiOutlineSend style={{fontSize: '21px'}}/></button>
            : 
              <button><TiMicrophoneOutline/></button>
            }
          </div>
        </>
    </div>
  )
}