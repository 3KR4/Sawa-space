"use client";
import { createContext, useRef, useState } from "react";

export const MenusContext = createContext();

export const MenusProvider = ({ children }) => {
  const settingsMenuRef = useRef(null);
  const infoMenuRef = useRef(null);
  const closeImgHolderRef = useRef(null);
  const usersreactMenuRef = useRef(null);
  const usersSelectionRef = useRef(null);
  const dangerEventRef = useRef(null);
  const shareFomrRef = useRef(null);

  const [openPostForm, setOpenPostForm] = useState(false);
  const [openStoryForm, setOpenStoryForm] = useState(false);
  const [openImgForm, setOpenImgForm] = useState(false);
  const [openProductForm, setOpenProductForm] = useState(false);
  const [openGroupForm, setOpenGroupForm] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [dangerEvent, setDangerEvent] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersNames, setSelectedUsersNames] = useState([]);
  const [selectionMenuTitle, setSelectionMenuTitle] = useState("");
  const [usersSelectionSearch, setUsersSelectionSearch] = useState("");
  const [someThingHappen, setSomeThingHappen] = useState("");

  const [singleProvider, setSingleProvider] = useState({
    type: "",
    sharing_data: {},
    focused_id: null,
  });

  return (
    <MenusContext.Provider
      value={{
        singleProvider,
        setSingleProvider,
        settingsMenuRef,
        dangerEventRef,
        closeImgHolderRef,
        shareFomrRef,
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
        openImgForm,
        setOpenImgForm,
        openProductForm,
        setOpenProductForm,
        setUsersSelectionSearch,
        usersSelectionRef,
        usersreactMenuRef,
        infoMenuRef,
        dangerEvent,
        setDangerEvent,
        someThingHappen,
        setSomeThingHappen,
        openShare,
        setOpenShare,
        openGroupForm,
        setOpenGroupForm,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};
