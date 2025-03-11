"use client";
import { useContext } from "react";
import Header from "@/components/Header";
import AllComponents from "@/components/AllComponents";
import Chats from "@/components/Chats";
import { ScreenProvider, ScreenContext } from "./contexts/ScreenContext";
import { MenuProvider } from "./contexts/DynamicMenus";
import { MenusProvider } from "./contexts/MenusContext";
import { InputActionsProvider } from "./contexts/InputActionsContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <ScreenProvider>
        <MenuProvider>
          <MenusProvider>
            <InputActionsProvider>
              <LayoutContent>{children}</LayoutContent>
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
