const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

/**
 * Envia mensagens à API e retorna a resposta completa.
 * @param {Array} messages - Histórico de mensagens
 */
export async function sendMessage(messages) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Erro na requisição");
  }

  const data = await res.json();
  return data.reply;
}

/**
 * Envia mensagens e retorna um ReadableStream para exibição em tempo real.
 * @param {Array} messages
 * @param {function} onChunk - Callback chamado a cada fragmento recebido
 */
export async function sendMessageStream(messages, onChunk) {
  const res = await fetch(`${API_URL}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) throw new Error("Erro no stream");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const lines = decoder.decode(value).split("\n");
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6);
      if (payload === "[DONE]") return;
      try {
        const { content } = JSON.parse(payload);
        if (content) onChunk(content);
      } catch {}
    }
  }
}
