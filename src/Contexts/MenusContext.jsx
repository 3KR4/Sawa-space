"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";

export const MenusContext = createContext();

export const MenusProvider = ({ children }) => {
  const settingsMenuRef = useRef(null);
  const infoMenuRef = useRef(null);
  const closeImgHolderRef = useRef(null);
  const usersreactMenuRef = useRef(null);
  const usersSelectionRef = useRef(null);

  const [imgFocus, setImgFocus] = useState(false);
  const [imgIndex, setImgIndex] = useState(false);
  const [openPostForm, setOpenPostForm] = useState(false);
  const [openStoryForm, setOpenStoryForm] = useState(false);
  const [dangerEvent, setDangerEvent] = useState();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dataSwiperType, setDataSwiperType] = useState();
  const [dataForSwiper, setDataForSwiper] = useState([]);
  const [selectedUsersNames, setSelectedUsersNames] = useState([]);
  const [selectionMenuTitle, setSelectionMenuTitle] = useState("");
  const [usersSelectionSearch, setUsersSelectionSearch] = useState("");

  const [someThingHappen, setSomeThingHappen] = useState("");

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
        infoMenuRef,
        dangerEvent,
        setDangerEvent,
        someThingHappen,
        setSomeThingHappen,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};
