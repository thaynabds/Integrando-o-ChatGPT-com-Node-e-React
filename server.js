/**
 * 🤖 ChatGPT Clone — Back-end (Node.js + Express)
 * Desafio de Projeto DIO · Bootcamp Bradesco GenAI & Dados
 * Autora: Thayná Batista da Silva — Senac Recife-PE
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/chat.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middlewares ────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────
app.use("/api", router);

// ── Health check ───────────────────────────────────────────
app.get("/", (_, res) =>
  res.json({
    status: "✅ Online",
    project: "ChatGPT Clone — Thayná Batista da Silva",
    version: "1.0.0",
  })
);

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`   Projeto: ChatGPT Clone — DIO Bootcamp Bradesco`);
  console.log(`   Autora : Thayná Batista da Silva\n`);
});
