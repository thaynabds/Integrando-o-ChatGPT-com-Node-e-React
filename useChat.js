import { useState, useCallback } from "react";
import { sendMessageStream } from "../services/api.js";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || loading) return;

    setError(null);

    // Adiciona mensagem do usuário
    const userMsg = { role: "user", content };
    const history = [...messages, userMsg];
    setMessages(history);

    // Placeholder da resposta do assistente
    const assistantMsg = { role: "assistant", content: "" };
    setMessages([...history, assistantMsg]);
    setLoading(true);

    try {
      await sendMessageStream(
        history.map(({ role, content }) => ({ role, content })),
        (chunk) => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: updated[updated.length - 1].content + chunk,
            };
            return updated;
          });
        }
      );
    } catch (err) {
      setError(err.message);
      setMessages((prev) => prev.slice(0, -1)); // remove placeholder
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, loading, error, sendMessage, clearChat };
}
