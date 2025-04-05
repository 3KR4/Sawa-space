"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";

export const MenusContext = createContext();

export const MenusProvider = ({ children }) => {
  const settingsMenuRef = useRef(null);
  const userInfoMenu = useRef(null);
  const closeImgHolderRef = useRef(null);
  const usersreactMenuRef = useRef(null);
  const usersSelectionRef = useRef(null);
  const [hideChats, setHideChats] = useState(false);

  const [imgFocus, setImgFocus] = useState(false);
  const [imgIndex, setImgIndex] = useState(false);
  const [openPostForm, setOpenPostForm] = useState(false);
  const [openStoryForm, setOpenStoryForm] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dataSwiperType, setDataSwiperType] = useState();
  const [dataForSwiper, setDataForSwiper] = useState([]);
  const [selectedUsersNames, setSelectedUsersNames] = useState([]);
  const [selectionMenuTitle, setSelectionMenuTitle] = useState("");
  const [usersSelectionSearch, setUsersSelectionSearch] = useState("");

  return (
    <MenusContext.Provider
      value={{
        settingsMenuRef,
        dataSwiperType,
        setDataSwiperType,
        dataForSwiper,
        setDataForSwiper,
        imgFocus,
        setImgFocus,
        imgIndex,
        setImgIndex,
        closeImgHolderRef,
        selectedUsers,
        setSelectedUsers,
        hideChats,
        setHideChats,
        selectedUsersNames,
        setSelectedUsersNames,
        selectionMenuTitle,
        setSelectionMenuTitle,
        usersSelectionSearch,
        openPostForm,
        setOpenPostForm,
        openStoryForm,
        setOpenStoryForm,
        setUsersSelectionSearch,
        usersSelectionRef,
        usersreactMenuRef,
        userInfoMenu,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};
