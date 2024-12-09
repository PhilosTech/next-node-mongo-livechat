import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface Message {
  _id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export function useChat(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STORAGE_API_URL}/history/${chatId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    if (!chatId) return;

    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_CHAT_API_URL}?token=${localStorage.getItem('token')}&chatId=${chatId}`
    );

    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);

      if (newMessage && newMessage.content && newMessage._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [chatId]);

  const sendMessage = async () => {
    if (inputValue.trim() === '' || !socketRef.current) return;

    const newMessage = {
      chatId,
      content: inputValue,
    };

    socketRef.current.send(JSON.stringify(newMessage));

    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        senderId: userId as string,
        content: inputValue,
        timestamp: new Date().toISOString(),
      },
    ]);
    setInputValue('');
  };

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
  };
}
