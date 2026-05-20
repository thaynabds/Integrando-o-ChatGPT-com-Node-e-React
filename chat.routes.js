import { Router } from "express";
import { chat, chatStream } from "../controllers/chat.controller.js";

export const router = Router();

// POST /api/chat        → resposta completa
// POST /api/chat/stream → resposta em tempo real (SSE)
router.post("/chat", chat);
router.post("/chat/stream", chatStream);
