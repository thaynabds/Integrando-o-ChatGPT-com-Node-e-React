import React from "react";
import styles from "./Welcome.module.css";

const SUGGESTIONS = [
  { icon: "💡", text: "Explique como funciona a IA Generativa" },
  { icon: "🐍", text: "Crie um script Python para analisar dados CSV" },
  { icon: "📊", text: "O que é SQL e como usar JOINs?" },
  { icon: "🚀", text: "Me dê dicas para aprender programação do zero" },
];

export function Welcome({ onSuggest }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>🤖</div>
      <h1 className={styles.title}>Como posso te ajudar?</h1>
      <p className={styles.subtitle}>
        Assistente virtual com IA Generativa · Desafio DIO
      </p>
      <div className={styles.grid}>
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            className={styles.card}
            onClick={() => onSuggest(s.text)}
          >
            <span className={styles.cardIcon}>{s.icon}</span>
            <span className={styles.cardText}>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
