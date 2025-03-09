"use client";
import { usePathname } from "next/navigation"; // Import usePathname
import { useContext } from "react";
import Header from "@/components/Header";
import AllComponents from "@/components/AllComponents";
import Chats from "@/components/Chats";
import { AllProvider, AllContext } from "./Context";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <AllProvider>
      <LayoutContent>{children}</LayoutContent>
    </AllProvider>
  );
}

function LayoutContent({ children }) {
  const { screenSize } = useContext(AllContext);
  const pathname = usePathname(); // Get the current URL path

console.log(screenSize);
console.log(pathname);

  return (
    <html lang="en">
      <body>
        {!pathname.includes("auth") && screenSize === "large" && <Chats />}

        <main>
          {!pathname.includes("auth") && <Header />}

          <AllComponents />
          <div className="holder">{children}</div>
        </main>
      </body>
    </html>
  );
}
