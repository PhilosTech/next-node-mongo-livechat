import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import dotenv from 'dotenv';
import jwt, {JwtPayload} from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Message } from './models/message';

dotenv.config({ path: '.env' });

const PORT = process.env.CHAT_PORT || 3003;

const server = http.createServer();
const wss = new WebSocketServer({ server });

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// WebSocket Connection
wss.on('connection', (ws, req) => {
  const token = req.url?.split('token=')[1]?.split('&')[0];
  const chatId = req.url?.split('chatId=')[1];

  if (!token || !chatId) {
    console.log('No token or chatId provided');
    ws.close(1008, 'Authorization and chatId required');
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey') as CustomJwtPayload;
    if (!decoded.id) {
      ws.close(1008, 'Invalid token payload');
      return;
    }

    (ws as any).user = decoded;
    (ws as any).chatId = chatId;

    console.log(`User ${decoded.id} connected to chat ${chatId}`);
  } catch (error) {
    ws.close(1008, 'Invalid token');
    return;
  }

  ws.on('message', async (messageData) => {
    try {
      const user = (ws as any).user;
      const chatId = (ws as any).chatId;
      console.log('yes');
      

      let parsedMessage;
      try {
        parsedMessage = JSON.parse(messageData.toString());
      } catch (err) {
        ws.send(JSON.stringify({ error: 'Invalid message format. Please send JSON.' }));
        return;
      }

      if (!parsedMessage.content) {
        ws.send(JSON.stringify({ error: 'Message content is required.' }));
        return;
      }

      const message = new Message({
        chatId,
        senderId: user.id,
        content: parsedMessage.content,
      });

      await message.save();

      console.log(`Message saved: ${message.content} in chat ${chatId}`);

      wss.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          (client as any).chatId === chatId
        ) {
          client.send(
            JSON.stringify({
              senderId: user.id,
              chatId,
              content: parsedMessage.content,
              timestamp: message.timestamp,
            })
          );
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Chat Service running on port ${PORT}`);
});
