import { openai } from "../config/openai.js";

const SYSTEM_PROMPT = `Você é um assistente virtual inteligente, útil e amigável.
Responda de forma clara, objetiva e em português brasileiro quando não especificado outro idioma.
Mantenha o contexto da conversa e seja preciso nas informações que fornecer.`;

/**
 * Envia mensagens ao ChatGPT e retorna a resposta.
 * @param {Array<{role: string, content: string}>} messages - Histórico da conversa
 * @param {string} model - Modelo a usar (default: gpt-3.5-turbo)
 * @returns {Promise<string>} Resposta do modelo
 */
export async function getChatResponse(messages, model = "gpt-3.5-turbo") {
  const response = await openai.chat.completions.create({
    model,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 1000,
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

/**
 * Stream de resposta para exibição em tempo real.
 */
export async function getChatStream(messages, model = "gpt-3.5-turbo") {
  return openai.chat.completions.create({
    model,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 1000,
    temperature: 0.7,
    stream: true,
  });
}
