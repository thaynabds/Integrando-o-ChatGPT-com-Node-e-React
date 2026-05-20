import React, { useEffect, useRef } from "react";
import { useChat } from "./hooks/useChat.js";
import { Sidebar } from "./components/Sidebar.jsx";
import { Message } from "./components/Message.jsx";
import { ChatInput } from "./components/ChatInput.jsx";
import { Welcome } from "./components/Welcome.jsx";
import styles from "./App.module.css";

export default function App() {
  const { messages, loading, error, sendMessage, clearChat } = useChat();
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  return (
    <div className={styles.layout}>
      <Sidebar onNewChat={clearChat} />
      <main className={styles.main}>
        <div className={styles.chatArea}>
          {messages.length === 0 ? (
            <Welcome onSuggest={sendMessage} />
          ) : (
            <div className={styles.messages}>
              {messages.map((msg, i) => (
                <Message key={i} role={msg.role} content={msg.content}
                  isStreaming={loading && i === messages.length - 1 && msg.role === "assistant"} />
              ))}
              {error && <div className={styles.error}>❌ {error}</div>}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
        <div className={styles.inputArea}><ChatInput onSend={sendMessage} disabled={loading} /></div>
      </main>
    </div>
  );
}
