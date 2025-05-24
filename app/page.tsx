"use client";
import { Assistant } from "./assistant";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    window.parent.postMessage({ type: "READY" }, "http://localhost:5173"); // parent origin

    const handleMessage = (event: MessageEvent) => {
      // 👇 Replace with your outer React app's origin
      if (event.origin !== "http://localhost:5173") return;

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
