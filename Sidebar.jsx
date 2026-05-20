import React from "react";
import styles from "./Sidebar.module.css";

export function Sidebar({ onNewChat, conversations = [] }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🤖</span>
        <span className={styles.logoText}>ChatGPT Clone</span>
      </div>

      <button className={styles.newChat} onClick={onNewChat}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Nova conversa
      </button>

      <div className={styles.history}>
        <p className={styles.historyLabel}>Conversas recentes</p>
        {conversations.length === 0 ? (
          <p className={styles.empty}>Nenhuma conversa ainda</p>
        ) : (
          conversations.map((c, i) => (
            <div key={i} className={styles.historyItem}>{c.title}</div>
          ))
        )}
      </div>

      <div className={styles.footer}>
        <p className={styles.footerName}>Thayná Batista da Silva</p>
        <p className={styles.footerSub}>ADS · Senac Recife</p>
      </div>
    </aside>
  );
}
