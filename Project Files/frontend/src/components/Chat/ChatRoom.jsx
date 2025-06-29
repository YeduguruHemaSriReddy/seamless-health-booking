import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./ChatRoom.css";

/* Single socket instance */
const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default function ChatRoom() {
  /* ─── Params & user ─── */
  const { otherId } = useParams();                  // /chat/:otherId
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  /* ─── State ─── */
  const [messages, setMessages] = useState([]);
  const [msg, setMsg]           = useState("");
  const bottomRef               = useRef(null);
  

  /* ─── Derived room key (may be empty string if data missing) ─── */
  const roomKey = [currentUser._id, otherId].sort().join("-");


  /* ─── Join + listeners (executes on every render but guarded inside) ─── */
  useEffect(() => {
    if (!roomKey) return;                // guard inside effect – hooks consistent

    /* join + rejoin */
    socket.emit("join-room", roomKey);
    const rejoin = () => socket.emit("join-room", roomKey);
    socket.on("connect", rejoin);

    /* incoming */
    const onReceive = (payload) => {
      if (payload.room !== roomKey) return;
      // avoid duplicate: ignore echo that matches last message timestamp & sender
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.sender === payload.sender && last.timestamp === payload.timestamp) {
          return prev; // duplicate
        }
        return [...prev, payload];
      });
    };
    socket.on("receive-message", onReceive);

    /* history */
    fetch(`http://localhost:5000/api/chat/${roomKey}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((hist) => setMessages(hist))
      .catch(() => {});

    return () => {
      socket.off("receive-message", onReceive);
      socket.off("connect", rejoin);
      socket.emit("leave-room", roomKey);
    };
  }, [roomKey]);

  /* ─── Auto‑scroll ─── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ─── Send ─── */
  const sendMessage = () => {
    const clean = msg.trim();
    if (!clean || !roomKey) return;

    const payload = {
      room:   roomKey,
      sender: currentUser._id,
      text:   clean,
      timestamp: Date.now(),
    };    socket.emit("send-message", payload);
    setMsg("");
  };

  /* ─── Render Guards ─── */
  if (!currentUser) return <p style={{ padding: 20 }}>⚠ Please login to chat.</p>;
  if (!otherId)      return <p style={{ padding: 20 }}>Loading chat…</p>;

  /* ─── UI ─── */
  return (
    <div className="chat-room">
      <header className="chat-header">Chat • Room&nbsp;<small>{roomKey}</small></header>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-bubble ${m.sender === currentUser._id ? "self" : "other"}`}
          >
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type message…"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}