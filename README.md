# Integrando-o-ChatGPT-com-Node-e-React
<div align="center">

# 🤖 ChatGPT Clone
### Aplicação Full Stack com Node.js, React e OpenAI API

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5%20Turbo-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![DIO](https://img.shields.io/badge/DIO-Desafio%20de%20Projeto-E91E63?style=for-the-badge&logo=dio&logoColor=white)](https://dio.me/)

<br/>

> Projeto desenvolvido como **Desafio de Projeto DIO** no Bootcamp **Bradesco — GenAI & Dados 2026.1**  
> Clone funcional do ChatGPT com back-end Node.js + Express, front-end React e integração real com a API da OpenAI.  
> Baseado no repositório do Expert **Felipe Aguiar** — com melhorias e identidade própria.

</div>

---

## 📌 Sobre o Projeto

Este projeto replica a experiência do ChatGPT com uma arquitetura moderna:

| Camada | Tecnologia | Função |
|---|---|---|
| **Back-end** | Node.js + Express | API REST que se comunica com a OpenAI |
| **Front-end** | React + Vite | Interface visual fiel ao ChatGPT |
| **IA** | OpenAI GPT-3.5 Turbo | Processamento de linguagem natural |
| **Stream** | Server-Sent Events (SSE) | Resposta em tempo real, letra a letra |

---

## 🏗️ Arquitetura

```
  👤 Usuário (Browser)
        │
        ▼  HTTP / SSE
  ┌─────────────────────┐
  │  React Front-end    │  (porta 5173)
  │  Vite + CSS Modules │
  └──────────┬──────────┘
             │  POST /api/chat/stream
             ▼
  ┌─────────────────────┐
  │  Express Back-end   │  (porta 3001)
  │  Node.js + CORS     │
  └──────────┬──────────┘
             │  OpenAI SDK
             ▼
  ┌─────────────────────┐
  │  OpenAI API         │
  │  GPT-3.5 Turbo      │
  └─────────────────────┘
```

---

## ✨ Funcionalidades

- 💬 **Chat em tempo real** com streaming de respostas (Server-Sent Events)
- 🧠 **Persistência de contexto** — o modelo lembra o histórico da conversa
- 📝 **Renderização de Markdown** — código, tabelas, listas e formatação
- 🎨 **Interface fiel ao ChatGPT** — tema escuro, sidebar, tela de boas-vindas
- ⚡ **Sugestões rápidas** para iniciar uma conversa
- 🗑️ **Nova conversa** com um clique
- 🔐 **API Key protegida** no back-end (nunca exposta ao front-end)

---

## 📁 Estrutura do Projeto

```
chatgpt-clone/
│
├── 📂 backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── openai.js          # Configuração do cliente OpenAI
│   │   ├── controllers/
│   │   │   └── chat.controller.js # Lógica das rotas
│   │   ├── routes/
│   │   │   └── chat.routes.js     # Definição de endpoints
│   │   ├── services/
│   │   │   └── chat.service.js    # Comunicação com a OpenAI API
│   │   └── server.js              # Entrada do servidor Express
│   ├── .env.example
│   └── package.json
│
├── 📂 frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx        # Menu lateral com histórico
│   │   │   ├── Message.jsx        # Bolha de mensagem com Markdown
│   │   │   ├── ChatInput.jsx      # Campo de entrada com auto-resize
│   │   │   └── Welcome.jsx        # Tela inicial com sugestões
│   │   ├── hooks/
│   │   │   └── useChat.js         # Hook de gerenciamento do chat
│   │   ├── services/
│   │   │   └── api.js             # Comunicação com o back-end
│   │   ├── styles/
│   │   │   └── global.css         # Variáveis, tipografia e reset
│   │   ├── App.jsx                # Componente raiz
│   │   └── main.jsx               # Entry point React
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js 18+** — [download](https://nodejs.org/)
- **Chave de API OpenAI** — [platform.openai.com](https://platform.openai.com/)

---

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/thaynabds/chatgpt-clone.git
cd chatgpt-clone
```

---

### 2️⃣ Configure e rode o Back-end

```bash
cd backend

# Instale as dependências
npm install

# Configure o .env
cp .env.example .env
# Edite .env e adicione sua OPENAI_API_KEY

# Inicie o servidor
npm run dev
# → Rodando em http://localhost:3001
```

---

### 3️⃣ Configure e rode o Front-end

```bash
# Em outro terminal
cd frontend

# Instale as dependências
npm install

# Configure o .env (opcional)
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
# → Acesse http://localhost:5173
```

---

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Health check do servidor |
| `POST` | `/api/chat` | Resposta completa (JSON) |
| `POST` | `/api/chat/stream` | Resposta em stream (SSE) |

**Exemplo de requisição:**

```json
POST /api/chat
{
  "messages": [
    { "role": "user", "content": "O que é Node.js?" }
  ]
}
```

---

## 🔑 Configurando a API Key

1. Acesse [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Clique em **Create new secret key**
3. Copie a chave e adicione ao `backend/.env`:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=3001
FRONTEND_URL=http://localhost:5173
```

> ⚠️ **A chave fica apenas no back-end.** O front-end nunca acessa a OpenAI diretamente.

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js | 18+ | Runtime do servidor |
| Express | 4.x | Framework HTTP |
| OpenAI SDK | 4.x | Integração com a API |
| React | 18 | Interface do usuário |
| Vite | 5 | Bundler e dev server |
| React Markdown | 9 | Renderização de Markdown |
| CSS Modules | — | Estilos encapsulados |

---

## 🧠 Engenharia de Prompt

O back-end usa um **System Prompt estruturado** para definir o comportamento do assistente:

```
Você é um assistente virtual inteligente, útil e amigável.
Responda de forma clara, objetiva e em português brasileiro.
Mantenha o contexto da conversa e seja preciso nas informações.
```

Este padrão garante respostas consistentes, independente da pergunta do usuário.

---

## 📚 Referências

| Recurso | Link |
|---|---|
| 🔗 Repositório original (Expert Felipe Aguiar) | [github.com/felipeAguiarCode/node-react-chatgpt-clone](https://github.com/felipeAguiarCode/node-react-chatgpt-clone) |
| 📖 Documentação OpenAI | [platform.openai.com/docs](https://platform.openai.com/docs/) |
| 🌐 Plataforma DIO | [dio.me](https://dio.me/) |

---

## 👩‍💻 Autora

<div align="center">

**Thayná Batista da Silva**  
Aluna de Análise e Desenvolvimento de Sistemas  
Faculdade Senac Recife-PE · Turma 2025 · Formação prevista: 2027

</div>

---

## 📬 Contato

<div align="center">
  <a href="https://br.linkedin.com/in/thaynabds" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://www.instagram.com/thaynabdstec/" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" />
  </a>
</div>

📧 Email: [thaynabdstec@gmail.com](mailto:thaynabdstec@gmail.com)  
📱 Telefone: +55 (81) 97912-6121

<div align="center">

![Cartão TEC Thayná](https://raw.githubusercontent.com/thaynabds/AppMedSmart/refs/heads/main/Cart%C3%A3o%20TEC%20Thayn%C3%A1%20Batista%20da%20Silva.png)

</div>

---

<div align="center">

Feito com 💜 por **Thayná Batista da Silva** durante o Bootcamp da **DIO**

</div>
