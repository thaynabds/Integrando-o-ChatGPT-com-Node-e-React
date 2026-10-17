import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

let cliente;

export function chaveConfigurada() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export function getOpenAI() {
  if (!chaveConfigurada()) {
    const erro = new Error(
      "OPENAI_API_KEY nao configurada. A pagina inicial continua no ar, mas o chat so responde depois que a chave existir no ambiente."
    );
    erro.statusCode = 503;
    throw erro;
  }
  if (!cliente) {
    cliente = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return cliente;
}
