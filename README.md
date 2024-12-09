# Next Node Mongo LiveChat

## 📜 Description
**Next Node Mongo LiveChat** is a real-time chat application supporting both personal and group chats. The project is built using **Next.js**, **Node.js**, **MongoDB**, and **WebSocket**.

---

## 🚀 Features
- **User registration and authentication**: Users can sign up and log in securely.
- **Real-time chat**: WebSocket integration for instant messaging.
- **Message history**: Users can view their chat history.
- **Group chats**: Create and manage group conversations.
- **REST API**: Structured API for authentication, chat, and messaging.

---

## 🛠️ Technology Stack
- **Frontend**: [Next.js](https://nextjs.org/), TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **WebSocket**: Real-time functionality implemented via `ws`.
- **Docker**: Orchestration using Docker Compose.
- **CI/CD**: Configured using GitHub Actions.

---

## 📂 Project Structure

```plaintext
next-node-mongo-livechat/
├── client/                # Frontend (Next.js)
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   ├── pages/             # Next.js API routes
│   └── app/               # UI components
├── server/                # Backend
│   ├── auth/              # Authentication module
│   ├── chat/              # WebSocket chat
│   └── storage/           # Chat and message handling
├── infrastructure/        # Docker and CI/CD configuration
│   └── docker/ci-cd       # Docker Compose setup
├── .github/workflows/     # GitHub Actions configuration
└── README.md              # Project description


##  Manual Setup
Ensure MongoDB is running locally.
Install dependencies

# For the client
cd client
npm install
npm run dev

# For the server
cd server
npm install
npm run dev


Create .env files in the client and server directories:

client/.env.local

NEXT_PUBLIC_API_URL=http://localhost:3002/api/auth
NEXT_PUBLIC_STORAGE_API_URL=http://localhost:3004/api/storage
NEXT_PUBLIC_CHAT_API_URL=ws://localhost:3003


server/.env

JWT_SECRET=your-secret-key
MONGO_URI=your-MONGO-DB
AUTH_PORT=3002
CHAT_PORT=3003
STORAGE_PORT=3004

##  🧪 Testing

# In each server module
npm test



## 📜 Licence
This project is licensed under the MIT Licence. See the LICENSE file for details.