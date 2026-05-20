import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./Message.module.css";

export function Message({ role, content, isStreaming }) {
  const isUser = role === "user";

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.user : styles.bot} fade-up`}>
      <div className={styles.avatar}>
        {isUser ? "👤" : "🤖"}
      </div>
      <div className={styles.bubble}>
        <span className={styles.roleName}>{isUser ? "Você" : "Assistente"}</span>
        <div className={`${styles.content} message-content`}>
          {isUser ? (
            <p>{content}</p>
          ) : (
            <>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              {isStreaming && <span className={styles.cursor} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
