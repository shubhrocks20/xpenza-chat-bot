"use client";
import { Assistant } from "./assistant";

import { useEffect, useState } from "react";


export default function Home() {
  const [user, setUser] = useState(null);

  const parentUrl = process.env.NEXT_PUBLIC_XPENZA_FRONTEND_URI || "http://localhost:5173"; // 👈 Replace with your parent app's URL

  useEffect(() => {
    window.parent.postMessage({ type: "READY" }, parentUrl); // parent origin

    const handleMessage = (event: MessageEvent) => {

      if (event.origin !== parentUrl) return;

      if (event.data.type === "USER_INFO") {
        console.log("Received user data:", event.data.payload);
        setUser(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div>
      {user ? (
        <Assistant user={user} />
      ) : (
        <div className="w-24 h-24 border-8 border-t-8 border-gray-200 border-t-gray-500 rounded-full animate-spin mx-auto my-24"></div>
      )}
    </div>
  );
}
