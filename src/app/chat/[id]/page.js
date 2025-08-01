"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import CutText from "@/utils/CutText";
import { messages, users } from "@/utils/Data";
import EmojiPicker from "emoji-picker-react";
import { use } from "react";
import UsersSelection from "@/components/UsersSelection";
import ConvertTime from "@/utils/ConvertTime";
import { useLanguage } from "@/Contexts/LanguageContext";

import PinHolder from "@/components/chat/PinHolder";
import SingleDetails from "@/components/SingleDetails";
import SettingMenu from "@/components/providers/SettingMenu";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { fetchingContext } from "@/Contexts/fetchingContext";
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
  const { translations, locale } = useLanguage();

  const {
    setDataSwiperType,
    dataForSwiper,
    setDataForSwiper,
    imgFocus,
    setImgFocus,
    setImgIndex,
    Refs,
  } = useContext(MenusContext);

  const {
    handleMenus,
    selectedDev,
    emojiHolder,
    setEmojiHolder,
    openUsersSelection,
    settingMenu,
    setSettingMenu,
    openUsersReact,
    setOpenUsersReact,
  } = useContext(DynamicMenusContext);
  const { messageText, setMessageText, InputRef, handleEmojiClick } =
    useContext(InputActionsContext);
  const { screenSize } = useContext(fetchingContext);

  const [curentChat, setCurentChat] = useState({});
  const [selectMode, setSelectMode] = useState(false);
  const [mentionHolder, setMentionHolder] = useState(false);
  const [isAddReact, setIsAddReact] = useState(false);
  const [overViewMenu, setOverViewMenu] = useState(false);
  const [selectedOverView, setSelectedOverView] = useState("overview");
  const [replyingOnMsg, setReplyingOnMsg] = useState();
  const [filteredMentinUser, setFilteredMentinUser] = useState([]);
  const [selectedMsgs, setSelectedMsgs] = useState([]);
  const [mentionsPeople, setMentionsPeople] = useState([]);
  const [pinedMsgs, setPinedMsgs] = useState([]);

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
  const emojiRef = useRef(null);
  const mentionRef = useRef(null);
  const overviewRef = useRef(null);

  const currentReplyMsg = replyingOnMsg
    ? messages.find((msg) => msg.id === replyingOnMsg)
    : null;

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

  //! handleClickOutside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mentionRef.current && !mentionRef.current.contains(event.target)) {
        setMentionHolder(false);
      }
      if (
        !(
          (overviewRef.current && overviewRef.current.contains(event.target)) ||
          (Refs.closeImgHolder.current &&
            Refs.closeImgHolder.current.contains(event.target))
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
    <div className={`personChat ${selectMode && "selectMode"}`}>
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
                className="rounded"
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
                    selectedMsgs.length > 0 &&
                      handleMenus(e, "usersSelection", null, {
                        type: "Forword To...",
                      });
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
                  {translations?.actions?.cancel}
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
                    selectedOverView === `overview` ? "active" : ""
                  }`}
                  onClick={() => setSelectedOverView("overview")}
                >
                  <FaRegUserCircle /> {translations?.chats?.overview}
                </li>
                <li
                  className={`${selectedOverView === `media` ? "active" : ""}`}
                  onClick={() => setSelectedOverView("media")}
                >
                  <MdOutlinePermMedia /> {translations?.chats?.media}
                </li>
                <li
                  className={`${selectedOverView === `files` ? "active" : ""}`}
                  onClick={() => setSelectedOverView("files")}
                >
                  <LuFileSliders /> {translations?.chats?.files}
                </li>
                <li
                  className={`${selectedOverView === `links` ? "active" : ""}`}
                  onClick={() => setSelectedOverView("links")}
                >
                  <RiLinksLine /> {translations?.chats?.links}
                </li>
                <li
                  className={`${selectedOverView === `groups` ? "active" : ""}`}
                  onClick={() => setSelectedOverView("groups")}
                >
                  <FaUserGroup /> {translations?.chats?.groups}
                </li>
              </ul>
              <div className="right">
                <h1>{translations?.chats[selectedOverView]}</h1>

                {selectedOverView === `overview` ? (
                  <div className="overview">
                    <div className="center">
                      <Image
                        className="rounded"
                        src={curentChat?.img || null}
                        width={45}
                        height={45}
                        alt="user Image"
                      />
                      <h4>{curentChat?.name}</h4>
                      <p>{curentChat?.bio}</p>
                    </div>

                    <label>{translations?.chats?.phonenumber}</label>
                    <p>{curentChat?.number}</p>

                    <div className="btn-holder">
                      <button>{translations?.actions?.archivechat}</button>
                      <div className="row">
                        <button>{translations?.actions?.remove_friend}</button>
                        <button>{translations?.actions?.block}</button>
                      </div>
                    </div>
                  </div>
                ) : selectedOverView === `media` ? (
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
                      <div>
                        {locale === "en"
                          ? `No ${selectedOverView} to display`
                          : `ليس هناك ${selectedOverView} للعرض`}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {locale === "en"
                      ? `No ${
                          translations?.chats[selectedOverView + "S"]
                        } to display yet`
                      : `ليس هناك ${
                          translations?.chats[selectedOverView + "S"]
                        }  للعرض بعد`}
                  </div>
                )}
              </div>
            </div>
          )}

          {pinedMsgs.length > 0 && <PinHolder data={pinedMsgs} />}
        </div>

        <SingleDetails />

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
                onClick={(e) => !selectMode && handleMenus(e, "emojiHolder")}
              />
            </div>
            <hr />
            <button
              onClick={() => {
                setReplyingOnMsg(selectedDev);
                setSettingMenu(false);
              }}
            >
              <HiReply /> {translations?.actions?.reply}
            </button>
            {curentChat?.message && (
              <button>
                <MdContentCopy /> {translations?.actions?.copy}
              </button>
            )}
            {curentChat?.img && (
              <button>
                <LuSaveAll /> {translations?.actions?.save_photo}
              </button>
            )}
            <hr />
            <button
              onClick={(e) => {
                handleMenus(e, "usersSelection", curentChat.id, {
                  type: "Forword To...",
                });
              }}
            >
              <HiReply style={{ transform: "rotateY(180deg)" }} />
              {translations?.actions?.forward}
            </button>
            <button>
              <FaRegStar /> {translations?.chats?.make_star}
            </button>
            <button>
              <GoPin /> {translations?.chats?.pin_message}
            </button>
            <button
              onClick={() => {
                setSelectedMsgs([selectedDev]);
                setSelectMode(true);
                setSettingMenu(false);
              }}
            >
              <FaRegSquareCheck /> {translations?.actions?.select}
            </button>
            <hr />
            <button className="danger">
              <FaRegTrashCan />
              {translations?.chats?.delete_for_me}
            </button>
          </SettingMenu>
        )}

        <div
          className="messages"
          ref={chatRef}
          style={{
            overflow:
              settingMenu || openUsersSelection || isAddReact || openUsersReact
                ? "hidden"
                : "auto",
            paddingRight: settingMenu ? "6px" : "unset",
          }}
        >
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
                      {ConvertTime(x?.time, locale, "singleChat")}
                      <small>Tuseday, junary</small>
                    </div>
                  ) : x.deleted ? (
                    <div>{translations?.chats?.this_message_has_deleted}</div>
                  ) : x.action === "left" ||
                    x.action === "join the group using via link" ? (
                    (() => {
                      const currentAction =
                        x.action === "join the group using via link"
                          ? "join_the_group_using_via_link"
                          : "left";
                      return (
                        <div>
                          {x.actor} {translations?.chats?.[currentAction]}
                        </div>
                      );
                    })()
                  ) : x.action === "giveAadmin" ? (
                    <div>
                      {x.actor} {translations?.chats?.make} {x.targetPerson}{" "}
                      {``}
                      {translations?.chats?.an_admin}
                    </div>
                  ) : x.action === "removeAdmin" ? (
                    <div>
                      {x.actor} {translations?.chats?.dismiss} {x.targetPerson}{" "}
                      {``}
                      {translations?.chats?.from_admin}
                    </div>
                  ) : x.action ? (
                    <div>
                      {x.actor} {translations?.chats?.[x.action]}{" "}
                      {x.targetPerson}
                    </div>
                  ) : (
                    <>
                      <div className="top">
                        {x.user !== "Bob" && <h5>{x.user}</h5>}{" "}
                        <small>
                          {ConvertTime(x?.time, locale, "singleChat")}
                        </small>
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
                                    CutText(replyMsg.message, 37)
                                  ) : (
                                    <>
                                      <FaRegImages />{" "}
                                      {translations?.chats?.image}
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
                              <p>{CutText(replyMsg.message, 40)}</p>
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
                          onClick={(e) => {
                            if (!selectMode) {
                              setOpenUsersReact("message");
                              handleMenus(e, "usersReact", x.id);
                            }
                          }}
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
          {screenSize === "large" && (
            <div
              ref={emojiRef}
              className={`emoji-holder ${isAddReact ? "active" : ""}`}
              style={{
                position: "absolute",
                top: "unset",
                left: "15px",
                bottom: "calc(100% + -4px)",
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
          )}

          <button>
            <MdOutlinePermMedia />
          </button>
          {screenSize === "large" && (
            <button
              onClick={() => {
                setIsAddReact(true);
                InputRef.current.focus();
              }}
            >
              <BsEmojiSmile />
            </button>
          )}

          <div className="big-holder">
            {mentionHolder && (
              <div
                ref={mentionRef}
                className={`mentionMenu MenuOfUsers sideMenu active`}
              >
                {filteredUsers.length > 0 && (
                  <>
                    <h1>{translations?.chats?.mentions}</h1>
                    <div className="holder">
                      {filteredUsers.map((x) => (
                        <div
                          key={x.id}
                          className="user"
                          onClick={() => handleUserClick(x)}
                        >
                          <Image
                            className="rounded"
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
                    <h1>{translations?.chats?.selected_users}</h1>
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
                          CutText(currentReplyMsg.message, 37)
                        ) : (
                          <>
                            <FaRegImages /> {translations?.chats?.image}
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
                    <p>{CutText(currentReplyMsg.message, 40)}</p>
                  </div>
                )}
              </div>
            )}
            <textarea
              ref={InputRef}
              value={messageText}
              onInput={handleInput}
              placeholder={translations?.placeHolders?.type_a_message}
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
