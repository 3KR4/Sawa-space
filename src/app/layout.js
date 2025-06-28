"use client";

import { useContext } from "react";

import Header from "@/components/Header";
import AllComponents from "@/components/providers/AllComponents";
import Chats from "@/components/chat/Chats";
import { FetchProvider, fetchingContext } from "@/Contexts/fetchingContext";
import { MenuProvider } from "@/Contexts/DynamicMenus";
import { MenusProvider } from "@/Contexts/MenusContext";
import { InputActionsProvider } from "@/Contexts/InputActionsContext";
import { NotificationProvider } from "@/Contexts/NotificationContext";
import { LanguageProvider } from "@/Contexts/LanguageContext";
import "@/Styles/globals.css";
import "@/Styles/components/side-chats.css";

export default function RootLayout({ children }) {
  return (
    <NotificationProvider>
      <InputActionsProvider>
        <MenuProvider>
          <MenusProvider>
            <FetchProvider>
              <LanguageProvider>
                <LayoutContent>{children}</LayoutContent>
              </LanguageProvider>
            </FetchProvider>
          </MenusProvider>
        </MenuProvider>
      </InputActionsProvider>
    </NotificationProvider>
  );
}

function LayoutContent({ children }) {
  const { screenSize, pathname } = useContext(fetchingContext);

  return (
    <html lang="en">
      <body>
        {(pathname.includes("chat") || pathname === "/") &&
          screenSize !== "small" && <Chats />}
        <main>
          {!pathname.includes("auth") && <Header />}
          <AllComponents />
          <div className="holder">{children}</div>
        </main>
      </body>
    </html>
  );
}
