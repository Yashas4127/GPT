# AI Chat Application

A full-stack AI chat application built with **React, Node.js, Express, MongoDB, and OpenRouter**.

The application allows users to create conversations, send messages to an AI model, view previous conversations, and continue existing chats.

---

## 🚀 Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Protected API routes
- Logout functionality

### AI Chat
- Send messages to an AI model
- Receive AI-generated responses
- Conversation-based chat system
- Continue previous conversations
- Chat history persistence

### Chat History
- View recent conversations
- Open previous conversations
- Load previous messages
- Create new conversations
- Delete conversations
- Automatically navigate to newly created chats

### Frontend
- React
- Vite
- Responsive UI
- Chat sidebar
- Markdown support
- Code block rendering
- Loading states
- Error handling
- Axios API integration

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Zod validation
- OpenRouter AI integration
- REST APIs

---

# 🏗️ Project Structure

```text
AI-Chat-Application/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── controllers/
│   ├── chatController.js
│   ├── msgController.js
│   └── ...
│
├── models/
│   ├── chatModel.js
│   ├── messageModel.js
│   └── userModel.js
│
├── routes/
│   ├── chatRoutes.js
│   ├── msgRoutes.js
│   └── userRoutes.js
│
├── services/
│   ├── openRouterService.js
│   └── ...
│
├── utils/
│   └── ...
│
├── index.js
├── package.json
├── .gitignore
└── README.md