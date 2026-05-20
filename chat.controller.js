import { getChatResponse, getChatStream } from "../services/chat.service.js";

/**
 * POST /api/chat
 * Recebe histórico de mensagens e retorna resposta da IA.
 */
export async function chat(req, res) {
  try {
    const { messages, model } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Campo 'messages' é obrigatório e deve ser um array." });
    }

    const reply = await getChatResponse(messages, model);
    return res.json({ reply });
  } catch (err) {
    console.error("❌ Erro no chat:", err.message);
    return res.status(500).json({ error: "Erro ao processar a requisição.", details: err.message });
  }
}

/**
 * POST /api/chat/stream
 * Resposta em tempo real via Server-Sent Events (SSE).
 */
export async function chatStream(req, res) {
  try {
    const { messages, model } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Campo 'messages' é obrigatório." });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await getChatStream(messages, model);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("❌ Erro no stream:", err.message);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
}
