"use client";
import { Assistant } from "./assistant";


import { use, useEffect, useState } from "react";

export  default function Home() {
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
        <Assistant user={user}/>
      ) : (
        <p >Loading...</p>
      )}
    </div>
  );
}
