"use client";
import "./globals.css";
import Header from "@/components/Header";
import AllComponents from "@/components/AllComponents";
import Chats from "@/components/Chats";
import { AllProvider, AllContext } from "./Context";
import { useContext } from "react";

export default function RootLayout({ children }) {
  return (
    <AllProvider>
      <LayoutContent>{children}</LayoutContent>
    </AllProvider>
  );
}

function LayoutContent({ children }) {
  const {screenSize} = useContext(AllContext);
  
  return (
    <html lang="en">
      <body>
        {screenSize !== "small" ? <Chats /> : null}
        <main>
          <Header />
          <AllComponents/>
          <div className="holder">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
