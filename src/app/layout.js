"use client";
import { useContext } from "react";
import Header from "@/components/Header";
import AllComponents from "@/components/providers/AllComponents";
import Chats from "@/components/chat/Chats";
import { ScreenProvider, ScreenContext } from "@/Contexts/ScreenContext";
import { MenuProvider } from "@/Contexts/DynamicMenus";
import { MenusProvider } from "@/Contexts/MenusContext";
import { InputActionsProvider } from "@/Contexts/InputActionsContext";
import { NotificationProvider } from "@/Contexts/NotificationContext";
import { LanguageProvider } from "@/Contexts/LanguageContext";
import "@/Styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <ScreenProvider>
        <MenuProvider>
          <MenusProvider>
            <InputActionsProvider>
              <NotificationProvider>
                <LayoutContent>{children}</LayoutContent>
              </NotificationProvider>
            </InputActionsProvider>
          </MenusProvider>
        </MenuProvider>
      </ScreenProvider>
    </LanguageProvider>
  );
}

function LayoutContent({ children }) {
  const { screenSize, pathname } = useContext(ScreenContext);

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
