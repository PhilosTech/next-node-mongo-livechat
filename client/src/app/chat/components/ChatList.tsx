'use client';

import { useEffect, useState } from 'react';
import { getChats } from '../services/chatService';

interface Chat {
  _id: string;
  participants: string[];
  type: 'personal' | 'group';
  createdAt: string;
}

export default function ChatList({ onChatSelect }: { onChatSelect: (chatId: string) => void }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const data = await getChats(token);
        setChats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  

  

  return (
    <div className="w-80 bg-gray-100 p-4 space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {loading &&<div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

{!loading && !error && <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Chats</h2>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat._id}
              className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer border-2 hover:border-indigo-500"
              onClick={() => onChatSelect(chat._id)}
            >
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {chat.type === 'group' ? 'Group Chat' : 'Personal Chat'}
                </p>
                <p className="text-xs text-gray-500">
                  {chat.participants.join(', ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {new Date(chat.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
}
