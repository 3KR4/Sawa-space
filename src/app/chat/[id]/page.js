"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { maxLength } from "@/Methods";
import { messages, users } from "@/Data";
import EmojiPicker from "emoji-picker-react";
import { use } from "react";
import UsersSelection from "@/components/UsersSelection";

import PinHolder from "@/components/chat/PinHolder";
import ImagesSwiper from "@/components/ImagesSwiper";
import SettingMenu from "@/components/SettingMenu";

import { AllContext } from "@/app/Context";

//Icons
import { GoPin } from "react-icons/go";
import { HiReply } from "react-icons/hi";
import { RiLinksLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { IoClose, IoCopy } from "react-icons/io5";
import { TiMicrophoneOutline } from "react-icons/ti";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuSaveAll, LuFileSliders } from "react-icons/lu";

import {
  MdOutlinePermMedia,
  MdContentCopy,
  MdOutlineAddReaction,
} from "react-icons/md";
import {
  FaStar,
  FaShare,
  FaRegStar,
  FaAngleDown,
  FaRegUserCircle,
} from "react-icons/fa";
import {
  FaRegImages,
  FaRegTrashCan,
  FaRegSquareCheck,
  FaPlus,
  FaUserGroup,
} from "react-icons/fa6";

export default function Chat({ params }) {
  const {
    screenSize,
    setDataSwiperType,
    dataForSwiper,
    setDataForSwiper,
    imgFocus,
    setImgFocus,
    setImgIndex,
    closeImgHolderRef,
    handleEmojiClick,
    InputRef,
    messageText,
    setMessageText,
    openUsersSelection,
    handleMenus,
    setSelectionMenuTitle,
    settingMenu,
    setSettingMenu,
    selectedDev,
  } = useContext(AllContext);

  const [curentChat, setCurentChat] = useState({});
  const [selectMode, setSelectMode] = useState(false);
  const [reactsAction, setReactsAction] = useState(false);
  const [emojiHolder, setEmojiHolder] = useState(false);
  const [mentionHolder, setMentionHolder] = useState(false);
  const [isAddReact, setIsAddReact] = useState(false);
  const [overViewMenu, setOverViewMenu] = useState(false);
  const [selectedOverView, setSelectedOverView] = useState("Overview");
  const [replyingOnMsg, setReplyingOnMsg] = useState();

  const [filteredMentinUser, setFilteredMentinUser] = useState([]);

  const [selectedMsgs, setSelectedMsgs] = useState([]);

  console.log(selectedMsgs);

  const [mentionsPeople, setMentionsPeople] = useState([]);

  const [currentActionMsg, setCurrentActionMsg] = useState({});
  const [pinedMsgs, setPinedMsgs] = useState([]);

  const [menuPositions, setMenuPositions] = useState({ top: 0, left: 0 });

  const mediaMsgs = messages.filter((msg) => msg.img);

  const { id } = use(params); // Unwrap the Promise

  useEffect(() => {
    let currentChat = users.find((x) => x.id == id);
    setCurentChat(currentChat);
  }, [id]);

  const handleImageClick = (id, index) => {
    setDataSwiperType("msg");
    setImgFocus(id);
    setDataForSwiper(mediaMsgs);

    if (index === "") {
      const mediaIndex = dataForSwiper.findIndex((msg) => msg.id == id);
      setImgIndex(mediaIndex);
    } else {
      setImgIndex(index);
    }
  };

  const chatRef = useRef(null);
  const menuRef = useRef(null);
  const emojiRef = useRef(null);
  const reactsMenuRef = useRef(null);
  const mentionRef = useRef(null);
  const overviewRef = useRef(null);

  useEffect(() => {
    setDataForSwiper(mediaMsgs);
  }, [imgFocus, messages]);

  const currentReplyMsg = replyingOnMsg
    ? messages.find((msg) => msg.id === replyingOnMsg)
    : null;

  const currentUserReacts = currentActionMsg
    ? messages.find((msg) => msg.id === currentActionMsg)
    : null;
  const msgsEmojis = currentUserReacts?.emojis;

  const handlePinClick = (id) => {
    const element = document.getElementById(`message-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = `${
      textarea.value === "" ? "42px" : textarea.scrollHeight + 4
    }px`;
    setMessageText(textarea.value);

    const caretPosition = textarea.selectionStart;
    const textBeforeCaret = textarea.value.slice(0, caretPosition);
    const mentionMatch = textBeforeCaret.match(/@(\w*)$/);

    if (mentionMatch) {
      setMentionHolder(true);
      const searchTerm = mentionMatch[1].toLowerCase();

      setFilteredMentinUser(
        searchTerm
          ? users.filter((user) => user.name.toLowerCase().includes(searchTerm))
          : users
      );
    } else {
      setMentionHolder(false);
      setFilteredMentinUser(users);
    }

    const mentionedNames = [...textarea.value.matchAll(/@(\w+)/g)].map(
      (match) => match[1]
    );
    setMentionsPeople((prev) =>
      prev.filter((user) => mentionedNames.includes(user.name))
    );
  };

  const handleUserClick = (user) => {
    const textareaa = InputRef?.current;
    const caretPosition = textareaa.selectionStart;
    const textBeforeCaret = messageText.slice(0, caretPosition);
    const textAfterCaret = messageText.slice(caretPosition);

    const newText = /@\w*$/.test(textBeforeCaret)
      ? textBeforeCaret.replace(/@\w*$/, `@${user.name}`) + textAfterCaret
      : `${textBeforeCaret} @${user.name} ${textAfterCaret}`;

    setMessageText(newText.trim() + " ");

    setMentionsPeople((prev) => {
      if (!prev.some((mentioned) => mentioned.id === user.id)) {
        return [...prev, user];
      }
      return prev;
    });
    InputRef.focus();
    InputRef.setSelectionRange(newText.length + 1, newText.length + 1);
  };

  const filteredUsers = filteredMentinUser.filter(
    (user) => !mentionsPeople.some((mentioned) => mentioned.id === user.id)
  );

  const handleMessageActions = (event, type, msg) => {
    event.preventDefault();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const cursorY = event.clientY;
    const cursorX = event.clientX;

    const menuWidth = type == "emojis" ? 280 : type == "addReact" ? 400 : 255;
    const menuHeight =
      type === "emojis"
        ? reactsMenuRef.current?.offsetHeight > 297
          ? reactsMenuRef.current.offsetHeight
          : 300
        : type == "addReact"
        ? 450
        : 378;

    const top =
      cursorY + menuHeight > windowHeight
        ? Math.max(cursorY - menuHeight, 50)
        : cursorY;
    const left =
      cursorX + menuWidth > windowWidth
        ? Math.max(cursorX - menuWidth, 10)
        : cursorX;

    if (type == "emojis") {
      setReactsAction(true);
      setCurrentActionMsg(msg);
    } else if (type == "addReact") {
      setSettingMenu(false);
      setEmojiHolder(true);
      setIsAddReact(true);
    } else {
      null;
    }
    setMenuPositions({ top, left });
  };

  //! handleClickOutside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSettingMenu(false);
      }
      if (
        reactsMenuRef.current &&
        !reactsMenuRef.current.contains(event.target)
      ) {
        setReactsAction(false);
      }
      if (mentionRef.current && !mentionRef.current.contains(event.target)) {
        setMentionHolder(false);
      }
      if (
        !(
          (overviewRef.current && overviewRef.current.contains(event.target)) ||
          (closeImgHolderRef.current &&
            closeImgHolderRef.current.contains(event.target))
        )
      ) {
        setOverViewMenu(false);
      }
      if (
        !(
          (emojiRef.current && emojiRef.current.contains(event.target)) ||
          (InputRef.current && InputRef.current.contains(event.target))
        )
      ) {
        setEmojiHolder(false);
        setIsAddReact(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);

  //! setPinedMsgs
  useEffect(() => {
    const filteredMsgs = messages.filter((msg) => msg.pin);
    setPinedMsgs(filteredMsgs);
  }, [messages]);

  const historyRefs = useRef([]); // لتخزين عناصر div.history
  const [activeIndex, setActiveIndex] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null); // To track the scroll timeout

  useEffect(() => {
    const topElement = document.querySelector(".topUser"); // Reference to the top element
    const topElementRect = topElement.getBoundingClientRect(); // Get dimensions of `.topUser`

    const handleScroll = () => {
      setIsScrolling(true); // Set scrolling to true on every scroll event

      // Clear previous timeout and set a new one to detect scroll stop
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false); // Set scrolling to false after 1 second
      }, 1000);

      const messagesContainer = document.querySelector(".messages");

      historyRefs.current.forEach((ref, index) => {
        if (ref) {
          const refRect = ref.getBoundingClientRect(); // Get dimensions of the history element
          const containerRect = messagesContainer.getBoundingClientRect();

          // Check if the element is near the top of the messages container
          if (
            refRect.top >= containerRect.top && // It is at or below the container's top
            refRect.top <= containerRect.top + topElementRect.height // It is within the range
          ) {
            setActiveIndex(index); // Set the active index
          } else if (activeIndex === index) {
            setActiveIndex(null); // Reset if no longer in view
          }
        }
      });
    };

    const messagesContainer = document.querySelector(".messages");
    messagesContainer.addEventListener("scroll", handleScroll);

    return () => {
      messagesContainer.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current); // Clear timeout on unmount
    };
  }, [activeIndex]);

  return (
    <div className={`pirsonChat ${selectMode && "selectMode"}`}>
      <>
        <Image
          src={"/Screenshot 2025-01-03 040444.png"}
          alt={`Screenshot`}
          fill
        />
        <div className="top topUser">
          <div className="user" onClick={() => setOverViewMenu(true)}>
            {curentChat.img && (
              <Image
                src={curentChat.img}
                width={40}
                height={40}
                alt={curentChat?.name}
              />
            )}
            <h4>{curentChat?.name}</h4>
          </div>
          <div className="tools">
            {selectMode ? (
              <>
                <button>
                  <FaStar />
                </button>
                <button>
                  <IoCopy />
                </button>
                <button
                  onClick={(e) => {
                    selectedMsgs.length > 0 && handleMenus(e, "usersSelection");
                    selectedMsgs.length > 0 &&
                      setSelectionMenuTitle("Forword To...");
                  }}
                >
                  <FaShare />{" "}
                  {selectedMsgs.length > 0 && (
                    <small>{selectedMsgs.length}</small>
                  )}
                </button>
                <button
                  onClick={() => {
                    setSelectMode(false);
                    setSelectedMsgs([]);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setSelectMode(true)}>
                <BiDotsHorizontalRounded style={{ fontSize: "23px" }} />
              </button>
            )}
          </div>
          {overViewMenu && (
            <div
              ref={overviewRef}
              className={`overViewMenu sideMenu ${
                overViewMenu ? "active" : ""
              }`}
            >
              <ul className="left">
                <li
                  className={`${
                    selectedOverView === `Overview` ? "active" : ""
                  }`}
                  onClick={() => setSelectedOverView("Overview")}
                >
                  <FaRegUserCircle /> Overview
                </li>
                <li
                  className={`${selectedOverView === `Media` ? "active" : ""}`}
                  onClick={() => setSelectedOverView("Media")}
                >
                  <MdOutlinePermMedia /> Media
                </li>
                <li
                  className={`${selectedOverView === `Files` ? "active" : ""}`}
                  onClick={() => setSelectedOverView("Files")}
                >
                  <LuFileSliders /> Files
                </li>
                <li
                  className={`${selectedOverView === `Links` ? "active" : ""}`}
                  onClick={() => setSelectedOverView("Links")}
                >
                  <RiLinksLine /> Links
                </li>
                <li
                  className={`${selectedOverView === `Groups` ? "active" : ""}`}
                  onClick={() => setSelectedOverView("Groups")}
                >
                  <FaUserGroup /> Groups
                </li>
              </ul>
              <div className="right">
                <h1>{selectedOverView}</h1>

                {selectedOverView === `Overview` ? (
                  <div className="overview">
                    <div className="center">
                      <Image
                        src={curentChat?.img || null}
                        width={45}
                        height={45}
                        alt="user Image"
                      />
                      <h4>{curentChat?.name}</h4>
                      <p>{curentChat?.bio}</p>
                    </div>

                    <label>Phone Number</label>
                    <p>{curentChat?.number}</p>

                    <div className="btn-holder">
                      <button>archive chat</button>
                      <div className="row">
                        <button>Remove Friend</button>
                        <button>Block</button>
                      </div>
                    </div>
                  </div>
                ) : selectedOverView === `Media` ? (
                  <div className="media">
                    {dataForSwiper?.length > 1 ? (
                      dataForSwiper.map((x, index) => (
                        <div
                          className={`msg ${
                            selectedMsgs.includes(x.id) ? "selected" : ""
                          }`}
                          key={x.id}
                          onClick={() => {
                            if (selectMode) {
                              setSelectedMsgs((prev) =>
                                prev.includes(x.id)
                                  ? prev.filter((id) => id !== x.id)
                                  : [...prev, x.id]
                              );
                            }
                          }}
                        >
                          <img
                            src={x?.img || null}
                            onClick={() => {
                              if (!selectMode) {
                                handleImageClick(x.id, index);
                              }
                            }}
                            alt="xxxx"
                          />
                          <label className={`${selectMode ? "active" : ""}`}>
                            <input
                              type="checkbox"
                              className="input"
                              checked={selectedMsgs.includes(x.id)}
                              onChange={() => {
                                setSelectMode(true);
                                setSelectedMsgs((prev) => {
                                  const updatedMsgs = prev.includes(x.id)
                                    ? prev.filter((id) => id !== x.id)
                                    : [...prev, x.id];
                                  if (updatedMsgs.length === 0) {
                                    setSelectMode(false); // Turn off select mode if no items remain
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
                ) : (
                  <div></div>
                )}

                {/* No {selectedOverView} to display */}
              </div>
            </div>
          )}

          {pinedMsgs.length > 0 && <PinHolder data={pinedMsgs} />}
        </div>

        <ImagesSwiper />
        {settingMenu && (
          <SettingMenu type={"message-settingMenu"}>
            <div className="reacts">
              <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f44d.png" />
              <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/2764-fe0f.png" />
              <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f602.png" />
              <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f62e.png" />
              <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f625.png" />
              <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f64f.png" />
              <FaPlus
                onClick={(e) =>
                  !selectMode &&
                  handleMessageActions(e, "addReact", currentActionMsg)
                }
              />
            </div>
            <hr />
            <button
              onClick={() => {
                setReplyingOnMsg(selectedDev);
                setSettingMenu(false);
              }}
            >
              <HiReply /> Reply
            </button>
            {currentActionMsg?.message && (
              <button>
                <MdContentCopy /> Copy
              </button>
            )}
            {currentActionMsg?.img && (
              <button>
                <LuSaveAll /> Save as..
              </button>
            )}
            <hr />
            <button
              onClick={(e) => {
                handleMenus(e, "usersSelection", currentActionMsg.id);
                setSelectionMenuTitle("Forword To...");
              }}
            >
              <HiReply style={{ transform: "rotateY(180deg)" }} /> Forward
            </button>
            <button>
              <FaRegStar /> Star
            </button>
            <button>
              <GoPin /> Pin
            </button>
            <button
              onClick={() => {
                setSelectedMsgs([selectedDev]);
                setSelectMode(true);
                setSettingMenu(false);
              }}
            >
              <FaRegSquareCheck /> Select
            </button>
            <hr />
            <button className="danger">
              <FaRegTrashCan /> Delete for me
            </button>
          </SettingMenu>
        )}

        <div
          className="messages"
          ref={chatRef}
          style={{
            overflow:
              settingMenu || openUsersSelection || reactsAction || isAddReact
                ? "hidden"
                : "auto",
          }}
        >
          {reactsAction && (
            <div
              ref={reactsMenuRef}
              className={`reactsMenu MenuOfUsers sideMenu ${
                reactsAction ? "active" : ""
              }`}
              style={{
                top: `${menuPositions.top}px`,
                left: `${menuPositions.left}px`,
              }}
            >
              <h1>All Emojis</h1>
              <div className="holder">
                {msgsEmojis?.map((x) => (
                  <div key={x.id} className="user">
                    <div className="info">
                      <Image
                        src={x.user.img ? x.user.img : null}
                        width={40}
                        height={40}
                        alt={`user Image`}
                      />
                      <h4>{x.user.name}</h4>
                    </div>
                    <span>{x.emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {messages.map((x, i) => {
            const replyMsg = x.replyId
              ? messages.find((msg) => msg.id === x.replyId)
              : null;
            return (
              <div
                key={x.id}
                id={`message-${x.id}`}
                className={`msg ${x.history || x.action ? "middle" : ""} ${
                  x.history ? "history" : ""
                } ${x.user === "Bob" ? "me" : ""} ${
                  selectedMsgs.includes(x.id) && "selected"
                } ${activeIndex === i ? "sticky" : ""} ${
                  activeIndex === i && !isScrolling ? "hidden" : ""
                }`}
                ref={(el) => {
                  if (x.history) historyRefs.current[i] = el;
                }}
                data-index={i}
                onClick={() => {
                  if (selectMode && !x.history && !x.deleted && !x.action) {
                    setSelectedMsgs((prev) =>
                      prev.includes(x.id)
                        ? prev.filter((id) => id !== x.id)
                        : [...prev, x.id]
                    );
                  }
                }}
              >
                {selectMode && !x.history && !x.deleted && !x.action && (
                  <label>
                    <input
                      type="checkbox"
                      className="input"
                      checked={selectedMsgs.includes(x.id) ? true : false}
                      onChange={() => console.log("x")}
                    />
                    <span className="custom-checkbox"></span>
                  </label>
                )}

                <div
                  className={"body"}
                  onContextMenu={(e) =>
                    !selectMode &&
                    !x.history &&
                    !x.deleted &&
                    !x.action &&
                    handleMenus(e, "settingMenu-msg", x.id)
                  }
                >
                  {x.history ? (
                    <div>
                      {x.time}
                      <small>Tuseday, junary</small>
                    </div>
                  ) : x.deleted ? (
                    <div>This message has deleted</div>
                  ) : x.action === "left" ||
                    x.action === "join the group using via link" ? (
                    <div>
                      {x.actor} {x.action}
                    </div>
                  ) : x.action === "giveAadmin" ? (
                    <div>
                      {x.actor} make {x.targetPerson} an admin
                    </div>
                  ) : x.action === "removeAdmin" ? (
                    <div>
                      {x.actor} dismiss {x.targetPerson} from admin
                    </div>
                  ) : x.action ? (
                    <div>
                      {x.actor} {x.action} {x.targetPerson}
                    </div>
                  ) : (
                    <>
                      <div className="top">
                        {x.user !== "Bob" && <h5>{x.user}</h5>}{" "}
                        <small>{x.time}</small>
                      </div>
                      {replyMsg && (
                        <div
                          className="reply"
                          onClick={() => handlePinClick(replyMsg.id)}
                        >
                          {replyMsg.img ? (
                            <>
                              <div className="left">
                                <h5>
                                  {replyMsg.user === "Bob"
                                    ? "You"
                                    : replyMsg.user}
                                </h5>
                                <p>
                                  {replyMsg.message ? (
                                    maxLength(replyMsg.message, 37)
                                  ) : (
                                    <>
                                      <FaRegImages /> Image
                                    </>
                                  )}
                                </p>
                              </div>
                              <img src={replyMsg.img} alt="reply msg img" />
                            </>
                          ) : (
                            <>
                              <h5>
                                {replyMsg.user === "Bob"
                                  ? "You"
                                  : replyMsg.user}
                              </h5>
                              <p>{maxLength(replyMsg.message, 40)}</p>
                            </>
                          )}
                        </div>
                      )}
                      {x.img && (
                        <img
                          src={x?.img || null}
                          onClick={() => {
                            if (!selectMode) {
                              handleImageClick(x.id, "");
                            }
                          }}
                          alt="xxxx"
                        />
                      )}
                      {x.message != "" && <p>{x.message}</p>}

                      {x.emojis?.length > 0 && (
                        <div
                          className="reacts"
                          onClick={(e) =>
                            !selectMode &&
                            handleMessageActions(e, "emojis", x.id)
                          }
                        >
                          {(() => {
                            const uniqueEmojis = [
                              ...new Map(
                                x.emojis.map((emoji) => [emoji.emoji, emoji])
                              ).values(),
                            ];
                            const displayedEmojis = uniqueEmojis.slice(0, 5);
                            const remainingCount =
                              x.emojis.length - displayedEmojis.length;

                            return (
                              <>
                                {displayedEmojis.map((emoji, index) => (
                                  <span key={index}>{emoji.emoji}</span>
                                ))}

                                {/* Only show the counter if there are hidden emojis */}
                                {remainingCount > 0 && (
                                  <span className="counter">
                                    +{remainingCount}
                                  </span>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}

                      {screenSize !== "small" && (
                        <div className="interact">
                          <div
                            className="holder"
                            onClick={(e) =>
                              !selectMode &&
                              handleMenus(e, "settingMenu-msg", x.id)
                            }
                          >
                            <MdOutlineAddReaction />
                            <FaAngleDown />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="actions">
          <div
            ref={emojiRef}
            className={`emoji-holder ${emojiHolder ? "active" : ""}`}
            style={{
              position: !isAddReact ? "absolute" : `fixed`,
              top: !isAddReact ? "unset" : `${menuPositions.top}px`,
              left: !isAddReact ? "15px" : `${menuPositions.left}px`,
              bottom: !isAddReact ? "calc(100% + -4px)" : `unset`,
            }}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme="light"
              emojiStyle="facebook"
              previewConfig={{ showPreview: false }}
              width={350}
            />
          </div>
          <button>
            <MdOutlinePermMedia />
          </button>
          <button
            onClick={() => {
              setEmojiHolder(true);
              InputRef.current.focus();
            }}
          >
            <BsEmojiSmile />
          </button>
          <div className="big-holder">
            {mentionHolder && (
              <div
                ref={mentionRef}
                className={`mentionMenu MenuOfUsers sideMenu active`}
              >
                {filteredUsers.length > 0 && (
                  <>
                    <h1>Mentions</h1>
                    <div className="holder">
                      {filteredUsers.map((x) => (
                        <div
                          key={x.id}
                          className="user"
                          onClick={() => handleUserClick(x)}
                        >
                          <Image
                            src={x.img ? x.img : null}
                            width={40}
                            height={40}
                            alt={`user Image`}
                          />
                          <div className="info">
                            <h4>{x.name}</h4>
                            <span>{x.bio}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {filteredUsers.length > 0 && mentionsPeople.length > 0 && (
                  <hr style={{ marginTop: "7px" }} />
                )}
                {mentionsPeople.length > 0 && (
                  <>
                    <h1>Selected Users</h1>
                    <div className="holder-wrap">
                      {mentionsPeople.map((x) => (
                        <div
                          key={x.id}
                          className="user"
                          onClick={() => handleUserClick(x)}
                        >
                          {x.name}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            {currentReplyMsg && (
              <div className="reply">
                <IoClose
                  className="close"
                  onClick={() => setReplyingOnMsg(null)}
                />
                {currentReplyMsg.img ? (
                  <div onClick={() => handlePinClick(currentReplyMsg.id)}>
                    <div className="left">
                      <h5>
                        {currentReplyMsg.user === "Bob"
                          ? "You"
                          : currentReplyMsg.user}
                      </h5>
                      <p>
                        {currentReplyMsg.message ? (
                          maxLength(currentReplyMsg.message, 37)
                        ) : (
                          <>
                            <FaRegImages /> Image
                          </>
                        )}
                      </p>
                    </div>
                    <img src={currentReplyMsg.img} alt="reply msg img" />
                  </div>
                ) : (
                  <div onClick={() => handlePinClick(currentReplyMsg.id)}>
                    <h5>
                      {currentReplyMsg.user === "Bob"
                        ? "You"
                        : currentReplyMsg.user}
                    </h5>
                    <p>{maxLength(currentReplyMsg.message, 40)}</p>
                  </div>
                )}
              </div>
            )}
            <textarea
              ref={InputRef}
              value={messageText}
              onInput={handleInput}
              placeholder="Type a message..."
            />
          </div>

          {messageText ? (
            <button>
              <AiOutlineSend style={{ fontSize: "21px" }} />
            </button>
          ) : (
            <button>
              <TiMicrophoneOutline />
            </button>
          )}
        </div>
      </>
    </div>
  );
}
