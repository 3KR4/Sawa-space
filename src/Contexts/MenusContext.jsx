"use client";
import { createContext, useRef, useState } from "react";

export const MenusContext = createContext();

export const MenusProvider = ({ children }) => {
  const Refs = {
    settings: useRef(null),
    info: useRef(null),
    closeImgHolder: useRef(null),
    usersReact: useRef(null),
    usersSelection: useRef(null),
    dangerEvent: useRef(null),
    shareForm: useRef(null),
  };

  const [openForm, setOpenForm] = useState(null);
  const [shareLink, setShareLink] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [someThingHappen, setSomeThingHappen] = useState("");
  
  const [singleProvider, setSingleProvider] = useState({
    type: null,
    sharing_data: null,
    focused_id: null,
  });
  const [dangerEvent, setDangerEvent] = useState({
    id: null,
    type: null,
    message: null,
    for: null,
  });

  return (
    <MenusContext.Provider
      value={{
        Refs,
        singleProvider,
        setSingleProvider,
        selectedUsers,
        setSelectedUsers,
        openForm,
        setOpenForm,
        dangerEvent,
        setDangerEvent,
        someThingHappen,
        setSomeThingHappen,
        shareLink,
        setShareLink,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};
