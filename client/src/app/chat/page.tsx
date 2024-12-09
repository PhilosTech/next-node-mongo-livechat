'use client';

import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { useState } from 'react'

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <ChatList onChatSelect={(chatId) => setSelectedChatId(chatId)} />
      {selectedChatId ? (
        <ChatWindow chatId={selectedChatId} />
      ) : (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}
