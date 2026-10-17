import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/chat.routes.js";
import { chaveConfigurada } from "./config/openai.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json());
app.use("/api", router);

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "online",
    project: "ChatGPT Clone, Thayna Batista da Silva",
    versao: "1.0.0",
    openai: chaveConfigurada()
      ? "configurada"
      : "OPENAI_API_KEY nao configurada. A pagina esta no ar, mas o chat nao responde ate a chave existir no ambiente.",
  });
});

export default app;

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`);
  });
}
