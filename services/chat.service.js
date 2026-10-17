import { exigirChave } from "../config/gemini.js";

const MODELO = "gemini-3.8-flash";
const SYSTEM_PROMPT = `Você é um assistente virtual inteligente, útil e amigável.
Responda de forma clara, objetiva e em português brasileiro quando não especificado outro idioma.
Mantenha o contexto da conversa e seja preciso nas informações que fornecer.`;

function conteudos(messages) {
  const itens = [];
  for (const mensagem of messages) {
    if (!mensagem || typeof mensagem.content !== "string" || !mensagem.content.trim()) {
      continue;
    }
    const role = mensagem.role === "assistant" || mensagem.role === "model" ? "model" : "user";
    const ultimo = itens[itens.length - 1];
    if (ultimo && ultimo.role === role) {
      ultimo.parts[0].text += `\n${mensagem.content}`;
      continue;
    }
    itens.push({ role, parts: [{ text: mensagem.content }] });
  }
  if (itens.length > 0 && itens[0].role === "model") {
    itens.shift();
  }
  return itens;
}

function corpo(messages) {
  return {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: conteudos(messages),
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7,
    },
  };
}

async function solicitar(messages, stream) {
  const chave = exigirChave();
  const contents = conteudos(messages);
  if (contents.length === 0) {
    const erro = new Error("Campo 'messages' precisa ter ao menos uma mensagem de usuario.");
    erro.statusCode = 400;
    throw erro;
  }

  const acao = stream ? "streamGenerateContent?alt=sse" : "generateContent";
  const resposta = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:${acao}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": chave,
      },
      body: JSON.stringify(corpo(messages)),
    }
  );

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    const erro = new Error(`Gemini recusou a conversa (${resposta.status}). ${detalhe}`.slice(0, 800));
    erro.statusCode = resposta.status === 429 ? 429 : 502;
    throw erro;
  }

  return resposta;
}

function textoDaResposta(data) {
  const partes = data?.candidates?.[0]?.content?.parts || [];
  return partes.map((parte) => parte.text || "").join("");
}

export async function getChatResponse(messages) {
  const resposta = await solicitar(messages, false);
  const data = await resposta.json();
  const texto = textoDaResposta(data);
  if (!texto) {
    const erro = new Error("Gemini nao devolveu texto.");
    erro.statusCode = 502;
    throw erro;
  }
  return texto;
}

function textoDoEvento(linha) {
  const limpa = linha.trim();
  if (!limpa.startsWith("data:")) return "";
  const payload = limpa.slice(5).trim();
  if (!payload || payload === "[DONE]") return "";
  try {
    return textoDaResposta(JSON.parse(payload));
  } catch {
    return "";
  }
}

export async function* getChatStream(messages) {
  const resposta = await solicitar(messages, true);
  const leitor = resposta.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await leitor.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const linhas = buffer.split("\n");
    buffer = linhas.pop() || "";
    for (const linha of linhas) {
      const texto = textoDoEvento(linha);
      if (texto) yield texto;
    }
  }

  const resto = textoDoEvento(buffer);
  if (resto) yield resto;
}
