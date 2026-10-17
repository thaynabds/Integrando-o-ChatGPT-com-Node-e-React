import dotenv from "dotenv";

dotenv.config();

const MENSAGEM_SEM_CHAVE =
  "GEMINI_API_KEY nao configurada. A pagina inicial continua no ar, mas o chat so responde depois que a chave existir no ambiente.";

export function chaveConfigurada() {
  return Boolean(process.env.GEMINI_API_KEY);
}

export function exigirChave() {
  const chave = process.env.GEMINI_API_KEY;
  if (!chave) {
    const erro = new Error(MENSAGEM_SEM_CHAVE);
    erro.statusCode = 503;
    throw erro;
  }
  return chave;
}

export const MENSAGEM_CHAVE_AUSENTE = MENSAGEM_SEM_CHAVE;
